import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChartUploader } from '@/components/scanner/ChartUploader';
import { AnalysisResult } from '@/components/scanner/AnalysisResult';
import { RecentScans, RecentScanItem } from '@/components/scanner/RecentScans';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { ChartAnalysisResult, TrendDirection } from '@/types/scanner';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ScanLine, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function Scanner() {
  const { user } = useAuth();
  const { tier, subscribed } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ChartAnalysisResult | null>(null);
  const [recentScans, setRecentScans] = useState<RecentScanItem[]>([]);
  const [loadingScans, setLoadingScans] = useState(true);
  const [scansRemaining, setScansRemaining] = useState(5);

  const scanLimits = { free: 5, starter: 25, pro: 100, elite: Infinity };
  const scansLimit = scanLimits[tier] || 5;
  const isPremium = tier !== 'free';

  useEffect(() => {
    async function fetchRecentScans() {
      if (!user) { setLoadingScans(false); return; }
      try {
        const { data, error } = await supabase
          .from('chart_analyses')
          .select('id, trend, recommendation, patterns_found, created_at, analysis_result')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        const scans: RecentScanItem[] = (data || []).map((scan) => {
          const analysisResult = scan.analysis_result as Record<string, unknown> | null;
          const ticker = analysisResult?.ticker as string | undefined;
          const confidence = (analysisResult?.recommendation as Record<string, unknown>)?.confidence as number ?? 50;
          return {
            id: scan.id,
            ticker: ticker || undefined,
            trend: (scan.trend as TrendDirection) || 'neutral',
            confidence: confidence,
            createdAt: scan.created_at,
            patternsCount: (scan.patterns_found || []).length,
          };
        });

        setRecentScans(scans);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const thisMonthScans = (data || []).filter((scan) => new Date(scan.created_at) >= startOfMonth).length;
        const limit = tier === 'elite' ? Infinity : scanLimits[tier] || 5;
        setScansRemaining(Math.max(0, limit - thisMonthScans));
      } catch (error) {
        console.error('Error fetching recent scans:', error);
      } finally {
        setLoadingScans(false);
      }
    }
    fetchRecentScans();
  }, [user]);

  const handleAnalyze = async (imageBase64: string, ticker?: string) => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const response = await supabase.functions.invoke('analyze-chart', {
        body: { imageBase64, ticker, userId: user?.id }
      });
      if (response.error) throw new Error(response.error.message || 'Analysis failed');
      const result = response.data;
      if (result?.error) throw new Error(result.error as string);
      setAnalysis(result as ChartAnalysisResult);
      if (user) {
        const newScan: RecentScanItem = {
          id: crypto.randomUUID(),
          ticker: result.ticker,
          trend: result.trend,
          confidence: result.recommendation?.confidence || 50,
          createdAt: new Date().toISOString(),
          patternsCount: result.patterns?.length || 0
        };
        setRecentScans(prev => [newScan, ...prev.slice(0, 9)]);
        setScansRemaining(prev => Math.max(0, prev - 1));
      }
      toast.success('Chart analyzed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      const message = error instanceof Error ? error.message : 'Failed to analyze chart';
      if (message.includes('Rate limit')) toast.error('Rate limit exceeded. Please try again in a moment.');
      else if (message.includes('credits')) toast.error('AI credits exhausted. Please try again later.');
      else toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!analysis?.ticker || !user) { toast.error('Please sign in to add to watchlist'); return; }
    try {
      const { data: watchlists, error: watchlistError } = await supabase
        .from('watchlists').select('id').eq('user_id', user.id).limit(1).single();
      if (watchlistError) throw watchlistError;
      const { data: existing } = await supabase
        .from('watchlist_items').select('id').eq('watchlist_id', watchlists.id).eq('symbol', analysis.ticker).single();
      if (existing) { toast.info(`${analysis.ticker} is already in your watchlist`); return; }
      const { error: insertError } = await supabase
        .from('watchlist_items').insert({ watchlist_id: watchlists.id, symbol: analysis.ticker });
      if (insertError) throw insertError;
      toast.success(`${analysis.ticker} added to watchlist!`);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast.error('Failed to add to watchlist');
    }
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartUploader
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            scansRemaining={scansRemaining}
            scansLimit={scansLimit}
            isPremium={isPremium}
          />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {analysis ? (
              <AnalysisResult analysis={analysis} onAddToWatchlist={handleAddToWatchlist} />
            ) : (
              <div className="card-elevated h-full flex items-center justify-center min-h-[400px] bg-gradient-purple">
                <div className="text-center space-y-4 p-8">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="icon-circle bg-purple-500 mx-auto"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-black text-xl">No Analysis Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Upload a stock chart image to get detailed AI-powered technical analysis
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Scans */}
        <RecentScans 
          scans={recentScans} 
          isLoading={loadingScans}
          onViewScan={(id) => toast.info('Viewing past scans coming soon!')}
        />
      </motion.div>
    </MainLayout>
  );
}
