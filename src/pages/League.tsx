import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LeagueView } from '@/components/league/LeagueView';
import { LeagueResultModal } from '@/components/league/LeagueResultModal';
import { useLeague } from '@/hooks/useLeague';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function League() {
  const { userLeague } = useLeague();
  const [showResultModal, setShowResultModal] = useState(false);
  const [demoType, setDemoType] = useState<'promotion' | 'demotion' | 'top1' | 'top3' | 'top10' | 'monthly_result'>('promotion');

  // Demo button to show animations (can be removed in production)
  const showDemo = (type: typeof demoType) => {
    setDemoType(type);
    setShowResultModal(true);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Demo buttons - remove in production */}
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
          <p className="w-full text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Prévisualiser les animations:
          </p>
          <Button size="sm" variant="outline" onClick={() => showDemo('top1')}>
            🏆 Champion
          </Button>
          <Button size="sm" variant="outline" onClick={() => showDemo('top3')}>
            🥇 Podium
          </Button>
          <Button size="sm" variant="outline" onClick={() => showDemo('promotion')}>
            🚀 Promotion
          </Button>
          <Button size="sm" variant="outline" onClick={() => showDemo('demotion')}>
            📉 Relégation
          </Button>
          <Button size="sm" variant="outline" onClick={() => showDemo('monthly_result')}>
            📊 Résultat
          </Button>
        </div>

        <LeagueView />

        {/* Result Modal */}
        <LeagueResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          type={demoType}
          finalRank={demoType === 'top1' ? 1 : demoType === 'top3' ? 2 : demoType === 'demotion' ? 48 : 5}
          league={userLeague?.current_league || 'Bronze'}
          newLeague={
            demoType === 'promotion' || demoType === 'top10'
              ? 'Silver'
              : demoType === 'demotion'
              ? 'Bronze'
              : undefined
          }
        />
      </div>
    </MainLayout>
  );
}
