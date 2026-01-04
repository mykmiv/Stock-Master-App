import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { mockStocks, formatCurrency, formatPercent, formatNumber } from '@/data/mockStocks';
import { cn } from '@/lib/utils';

interface StockListProps {
  watchlist: string[];
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  onSelectStock: (symbol: string) => void;
}

export function StockList({ watchlist, onAddToWatchlist, onRemoveFromWatchlist, onSelectStock }: StockListProps) {
  const [search, setSearch] = useState('');
  const [showWatchlist, setShowWatchlist] = useState(false);

  const filteredStocks = mockStocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase());
    const inWatchlist = watchlist.includes(stock.symbol);
    return matchesSearch && (!showWatchlist || inWatchlist);
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Market</CardTitle>
          <Button
            variant={showWatchlist ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowWatchlist(!showWatchlist)}
          >
            <Star className={cn("h-4 w-4 mr-1", showWatchlist && "fill-current")} />
            Watchlist
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredStocks.map((stock) => {
            const isPositive = stock.change >= 0;
            const isInWatchlist = watchlist.includes(stock.symbol);

            return (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onSelectStock(stock.symbol)}
              >
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInWatchlist) {
                        onRemoveFromWatchlist(stock.symbol);
                      } else {
                        onAddToWatchlist(stock.symbol);
                      }
                    }}
                  >
                    <Star className={cn("h-4 w-4", isInWatchlist && "fill-warning text-warning")} />
                  </Button>
                  <div>
                    <p className="font-semibold">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(stock.price)}</p>
                  <div className={cn(
                    "flex items-center gap-1 text-sm justify-end",
                    isPositive ? "text-success" : "text-destructive"
                  )}>
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>
                      {isPositive ? '+' : ''}{formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredStocks.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {showWatchlist ? 'No stocks in watchlist' : 'No stocks found'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
