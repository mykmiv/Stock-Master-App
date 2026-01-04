import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/data/mockStocks';

interface Holding {
  symbol: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
}

interface HoldingsListProps {
  holdings: Holding[];
  onSell: (symbol: string) => void;
}

export function HoldingsList({ holdings, onSell }: HoldingsListProps) {
  if (holdings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No holdings yet. Start trading to build your portfolio!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {holdings.map((holding) => {
            const marketValue = holding.shares * holding.currentPrice;
            const costBasis = holding.shares * holding.averageCost;
            const pnl = marketValue - costBasis;
            const pnlPercent = (pnl / costBasis) * 100;
            const isProfit = pnl >= 0;

            return (
              <div
                key={holding.symbol}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold">
                    {holding.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold">{holding.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {holding.shares} shares @ {formatCurrency(holding.averageCost)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(marketValue)}</p>
                    <div className={`flex items-center gap-1 text-sm ${isProfit ? 'text-success' : 'text-destructive'}`}>
                      {isProfit ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{isProfit ? '+' : ''}{formatCurrency(pnl)} ({formatPercent(pnlPercent)})</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onSell(holding.symbol)}>
                    Sell
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
