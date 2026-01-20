import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Wallet, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/data/mockStocks';
import { cn } from '@/lib/utils';

interface PortfolioSummaryProps {
  totalValue: number;
  cashBalance: number;
  investedValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  isLoading?: boolean;
}

export function PortfolioSummary({ 
  totalValue, 
  cashBalance, 
  investedValue, 
  totalPnl, 
  totalPnlPercent,
  isLoading 
}: PortfolioSummaryProps) {
  const isProfit = totalPnl >= 0;

  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4">
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Portfolio Value */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold">{formatCurrency(totalValue)}</p>
              <p className="text-xs text-muted-foreground">Total Portfolio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Balance */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400" />
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{formatCurrency(cashBalance)}</p>
              <p className="text-xs text-muted-foreground">Cash Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invested Value */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{formatCurrency(investedValue)}</p>
              <p className="text-xs text-muted-foreground">Invested</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total P&L */}
      <Card className="overflow-hidden">
        <div className={cn(
          "h-1 bg-gradient-to-r",
          isProfit ? "from-emerald-500 to-emerald-400" : "from-red-500 to-red-400"
        )} />
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              isProfit ? "bg-emerald-500/10" : "bg-red-500/10"
            )}>
              {isProfit ? (
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div>
              <p className={cn(
                "text-xl font-bold",
                isProfit ? "text-emerald-600" : "text-red-600"
              )}>
                {isProfit ? '+' : ''}{formatCurrency(totalPnl)}
              </p>
              <p className="text-xs text-muted-foreground">
                P&L ({isProfit ? '+' : ''}{formatPercent(totalPnlPercent)})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
