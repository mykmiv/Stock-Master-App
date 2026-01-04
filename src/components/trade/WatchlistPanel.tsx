import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  TrendingUp, 
  TrendingDown, 
  Trash2, 
  ScanLine,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercent } from '@/data/mockStocks';
import { WatchlistItem } from '@/hooks/useWatchlist';

interface WatchlistPanelProps {
  items: WatchlistItem[];
  onRemove: (itemId: string) => void;
  onTrade: (symbol: string) => void;
  onScan?: (symbol: string) => void;
}

export function WatchlistPanel({ items, onRemove, onTrade, onScan }: WatchlistPanelProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Your watchlist is empty. Add stocks from the scanner or search.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {items.map((item) => {
              const isPositive = item.change >= 0;
              
              return (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{item.symbol}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs gap-1",
                          isPositive 
                            ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400" 
                            : "border-red-500/50 text-red-700 dark:text-red-400"
                        )}
                      >
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {formatPercent(item.changePercent)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.name}</p>
                  </div>
                  
                  <div className="text-right mr-3">
                    <p className="font-semibold">{formatCurrency(item.price)}</p>
                    <p className={cn(
                      "text-sm",
                      isPositive ? "text-emerald-600" : "text-red-600"
                    )}>
                      {isPositive ? '+' : ''}{formatCurrency(item.change)}
                    </p>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onScan && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => onScan(item.symbol)}
                      >
                        <ScanLine className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
                      onClick={() => onTrade(item.symbol)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
