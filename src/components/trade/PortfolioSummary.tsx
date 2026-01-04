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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Portfolio Value */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              <p className="text-sm text-muted-foreground">Total Portfolio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Balance */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-400" />
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <Wallet className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(cashBalance)}</p>
              <p className="text-sm text-muted-foreground">Cash Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invested Value */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(investedValue)}</p>
              <p className="text-sm text-muted-foreground">Invested</p>
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
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              isProfit ? "bg-emerald-500/10" : "bg-red-500/10"
            )}>
              {isProfit ? (
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div>
              <p className={cn(
                "text-2xl font-bold",
                isProfit ? "text-emerald-600" : "text-red-600"
              )}>
                {isProfit ? '+' : ''}{formatCurrency(totalPnl)}
              </p>
              <p className="text-sm text-muted-foreground">
                P&L ({isProfit ? '+' : ''}{formatPercent(totalPnlPercent)})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
