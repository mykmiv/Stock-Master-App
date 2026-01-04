import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/data/mockStocks';
import { TradeRecord } from '@/hooks/usePortfolio';
import { formatDistanceToNow } from 'date-fns';

interface TradeHistoryProps {
  trades: TradeRecord[];
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  if (trades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No trades yet. Place your first order!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Trade History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="divide-y">
            {trades.map((trade) => {
              const isBuy = trade.side === 'buy';
              
              return (
                <div key={trade.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isBuy ? "bg-emerald-500/10" : "bg-red-500/10"
                    )}>
                      {isBuy ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">{trade.symbol}</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            isBuy 
                              ? "border-emerald-500/50 text-emerald-700" 
                              : "border-red-500/50 text-red-700"
                          )}
                        >
                          {isBuy ? 'BUY' : 'SELL'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {trade.shares} shares @ {formatCurrency(trade.price)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(trade.totalValue)}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(trade.executedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
