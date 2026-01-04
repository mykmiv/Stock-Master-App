import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown, Minus, History, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrendDirection } from '@/types/scanner';
import { formatDistanceToNow } from 'date-fns';

export interface RecentScanItem {
  id: string;
  ticker?: string;
  trend: TrendDirection;
  confidence: number;
  createdAt: string;
  patternsCount: number;
}

interface RecentScansProps {
  scans: RecentScanItem[];
  onViewScan?: (id: string) => void;
  isLoading?: boolean;
}

export function RecentScans({ scans, onViewScan, isLoading }: RecentScansProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recent Scans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[200px] flex-shrink-0 animate-pulse">
                <div className="h-24 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (scans.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recent Scans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            No scans yet. Upload a chart to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendClass = (trend: TrendDirection) => {
    switch (trend) {
      case 'bullish':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'bearish':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-2 px-2">
            {scans.map((scan) => (
              <Card 
                key={scan.id} 
                className="w-[200px] flex-shrink-0 hover:border-primary/50 transition-colors cursor-pointer group"
                onClick={() => onViewScan?.(scan.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-lg">
                      {scan.ticker || '???'}
                    </span>
                    <Badge className={cn("text-xs gap-1", getTrendClass(scan.trend))}>
                      {getTrendIcon(scan.trend)}
                      {scan.trend}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{scan.confidence}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Patterns</span>
                    <span className="font-medium">{scan.patternsCount}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(scan.createdAt), { addSuffix: true })}
                    </span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
