import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioSnapshots } from '@/hooks/usePortfolioSnapshots';
import { usePortfolio } from '@/hooks/usePortfolio';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string; totalValue: number; cashBalance: number; investedValue: number } }>;
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  
  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">
        {format(parseISO(data.date), 'd MMM yyyy', { locale: fr })}
      </p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">{formatCurrency(data.totalValue)}</span>
        </div>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Cash</span>
          <span>{formatCurrency(data.cashBalance)}</span>
        </div>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Invested</span>
          <span>{formatCurrency(data.investedValue)}</span>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPerformanceChart() {
  const { snapshots, isLoading } = usePortfolioSnapshots();
  const { portfolio, isLoading: portfolioLoading } = usePortfolio();

  const chartData = useMemo(() => {
    // If we have snapshots, use them
    if (snapshots.length > 0) {
      return snapshots.map(s => ({
        date: s.snapshot_date,
        totalValue: Number(s.total_value),
        cashBalance: Number(s.cash_balance),
        investedValue: Number(s.invested_value),
      }));
    }

    // Otherwise, generate demo data for the last 30 days
    const today = new Date();
    const demoData = [];
    let value = 100000;

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Add some random variation
      const change = (Math.random() - 0.48) * 2000;
      value = Math.max(85000, Math.min(120000, value + change));
      
      const investedRatio = 0.3 + Math.random() * 0.4;
      const invested = value * investedRatio;
      const cash = value - invested;

      demoData.push({
        date: date.toISOString().split('T')[0],
        totalValue: Math.round(value),
        cashBalance: Math.round(cash),
        investedValue: Math.round(invested),
      });
    }

    return demoData;
  }, [snapshots]);

  const performance = useMemo(() => {
    if (chartData.length < 2) return { value: 0, percent: 0 };
    
    const first = chartData[0].totalValue;
    const last = chartData[chartData.length - 1].totalValue;
    const value = last - first;
    const percent = ((last - first) / first) * 100;
    
    return { value, percent };
  }, [chartData]);

  const isPositive = performance.value >= 0;

  if (isLoading || portfolioLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Portfolio Performance</CardTitle>
          <div className={cn(
            "flex items-center gap-1.5 text-sm font-medium",
            isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
          )}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{isPositive ? '+' : ''}{formatCurrency(performance.value)}</span>
            <span className="text-muted-foreground">
              ({isPositive ? '+' : ''}{performance.percent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Last 30 days</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => format(parseISO(value), 'd MMM', { locale: fr })}
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
                axisLine={false}
                tickLine={false}
                width={50}
                domain={['dataMin - 5000', 'dataMax + 5000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalValue"
                stroke={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
