import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  Lightbulb,
  DollarSign,
  BarChart3,
  Newspaper,
  Share2,
  BookmarkPlus,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChartAnalysisResult, TrendDirection, RecommendationAction } from '@/types/scanner';
import { toast } from 'sonner';

interface AnalysisResultProps {
  analysis: ChartAnalysisResult;
  onAddToWatchlist?: () => void;
}

export function AnalysisResult({ analysis, onAddToWatchlist }: AnalysisResultProps) {
  const {
    ticker,
    currentPrice,
    priceChange,
    priceChangePercent,
    trend,
    patterns,
    supportLevels,
    resistanceLevels,
    volumeAnalysis,
    recommendation,
    educationalNotes,
    fundamentals
  } = analysis;

  const getTrendIcon = (t: TrendDirection) => {
    switch (t) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5" />;
      case 'bearish':
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <Minus className="h-5 w-5" />;
    }
  };

  const getTrendBadgeClass = (t: TrendDirection) => {
    switch (t) {
      case 'bullish':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'bearish':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getActionBadgeClass = (action: RecommendationAction) => {
    switch (action) {
      case 'buy':
        return 'bg-emerald-500 text-white';
      case 'sell':
        return 'bg-red-500 text-white';
      case 'hold':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-emerald-600 dark:text-emerald-400';
    if (confidence >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const handleShare = async () => {
    const shareText = `${ticker || 'Chart'} Analysis: ${trend.toUpperCase()} - ${recommendation.action.toUpperCase()} (${recommendation.confidence}% confidence)`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Analysis copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4 fade-in">
      {/* Header with Ticker and Trend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {ticker ? (
                  <h2 className="text-3xl font-bold font-mono">{ticker}</h2>
                ) : (
                  <h2 className="text-2xl font-semibold text-muted-foreground">Unknown Ticker</h2>
                )}
                <Badge className={cn("text-sm px-3 py-1 gap-1", getTrendBadgeClass(trend))}>
                  {getTrendIcon(trend)}
                  {trend.toUpperCase()}
                </Badge>
              </div>
              
              {currentPrice !== undefined && currentPrice !== null && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold">${currentPrice.toFixed(2)}</span>
                  {priceChange !== undefined && priceChangePercent !== undefined && (
                    <span className={cn(
                      "text-lg font-medium",
                      priceChange >= 0 ? "text-emerald-600" : "text-red-600"
                    )}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className={cn("text-2xl font-bold", getConfidenceColor(recommendation.confidence))}>
                  {recommendation.confidence}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fundamentals (if available) */}
      {fundamentals && (fundamentals.marketCap || fundamentals.sector || (fundamentals.recentNews && fundamentals.recentNews.length > 0)) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Fundamental Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fundamentals.marketCap && (
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="font-semibold">{fundamentals.marketCap}</p>
                </div>
              )}
              {fundamentals.peRatio && (
                <div>
                  <p className="text-sm text-muted-foreground">P/E Ratio</p>
                  <p className="font-semibold">{fundamentals.peRatio.toFixed(2)}</p>
                </div>
              )}
              {fundamentals.sector && (
                <div>
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p className="font-semibold">{fundamentals.sector}</p>
                </div>
              )}
            </div>

            {fundamentals.recentNews && fundamentals.recentNews.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Newspaper className="h-4 w-4" />
                    Recent News
                  </p>
                  <div className="space-y-2">
                    {fundamentals.recentNews.map((news, idx) => (
                      <a
                        key={idx}
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                            {news.headline}
                          </p>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground">{news.source}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Technical Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Patterns Found */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Patterns Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patterns.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patterns.map((pattern, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {pattern}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No clear patterns identified</p>
            )}
          </CardContent>
        </Card>

        {/* Volume Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Volume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {volumeAnalysis || 'Volume analysis not available for this chart'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Support & Resistance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Support Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            {supportLevels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {supportLevels.map((level, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="border-emerald-500/50 text-emerald-700 dark:text-emerald-400 font-mono"
                  >
                    ${typeof level === 'number' ? level.toFixed(2) : level}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No clear support levels identified</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Resistance Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resistanceLevels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resistanceLevels.map((level, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="border-red-500/50 text-red-700 dark:text-red-400 font-mono"
                  >
                    ${typeof level === 'number' ? level.toFixed(2) : level}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No clear resistance levels identified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AI Recommendation</CardTitle>
            <Badge className={cn("text-lg px-4 py-1", getActionBadgeClass(recommendation.action))}>
              {recommendation.action.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground whitespace-pre-line">
            {recommendation.reasoning}
          </p>

          {/* Key Levels */}
          {(recommendation.keyLevels.entry || recommendation.keyLevels.stopLoss || recommendation.keyLevels.target) && (
            <>
              <Separator />
              <div className="grid grid-cols-3 gap-4">
                {recommendation.keyLevels.entry && (
                  <div className="text-center p-3 rounded-lg bg-blue-500/10">
                    <DollarSign className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                    <p className="text-xs text-muted-foreground">Entry</p>
                    <p className="font-semibold font-mono">${recommendation.keyLevels.entry.toFixed(2)}</p>
                  </div>
                )}
                {recommendation.keyLevels.stopLoss && (
                  <div className="text-center p-3 rounded-lg bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 mx-auto text-red-600 mb-1" />
                    <p className="text-xs text-muted-foreground">Stop Loss</p>
                    <p className="font-semibold font-mono">${recommendation.keyLevels.stopLoss.toFixed(2)}</p>
                  </div>
                )}
                {recommendation.keyLevels.target && (
                  <div className="text-center p-3 rounded-lg bg-emerald-500/10">
                    <Target className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="font-semibold font-mono">${recommendation.keyLevels.target.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Educational Notes */}
      {educationalNotes.length > 0 && (
        <Alert className="border-amber-500/30 bg-amber-500/5">
          <Lightbulb className="h-5 w-5 text-amber-600" />
          <AlertDescription className="ml-2">
            <p className="font-medium text-amber-800 dark:text-amber-400 mb-2">Learning Points</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {educationalNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="flex gap-3">
        {ticker && onAddToWatchlist && (
          <Button variant="outline" className="flex-1 gap-2" onClick={onAddToWatchlist}>
            <BookmarkPlus className="h-4 w-4" />
            Add to Watchlist
          </Button>
        )}
        <Button variant="outline" className="flex-1 gap-2" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share Analysis
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center italic">
        ⚠️ This analysis is for educational purposes only. Always conduct your own research and consult with a financial advisor before making investment decisions.
      </p>
    </div>
  );
}
