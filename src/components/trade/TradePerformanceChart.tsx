import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioSnapshots } from '@/hooks/usePortfolioSnapshots';
import { usePortfolio } from '@/hooks/usePortfolio';
import { cn } from '@/lib/utils';
import { format, parseISO, subDays, subMonths, subYears, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { fr } from 'date-fns/locale';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

type TimeFilter = '1d' | '7d' | '30d' | '1m' | '1y' | 'all';

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

export function TradePerformanceChart() {
  const { snapshots, isLoading } = usePortfolioSnapshots();
  const { portfolio, isLoading: portfolioLoading } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('30d');

  // Get all snapshots (not filtered by date)
  const allSnapshots = useMemo(() => {
    return snapshots.map(s => ({
      date: s.snapshot_date,
      totalValue: Number(s.total_value),
      cashBalance: Number(s.cash_balance),
      investedValue: Number(s.invested_value),
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [snapshots]);

  // Calculate date ranges and availability
  const dateRanges = useMemo(() => {
    if (allSnapshots.length === 0) {
      return {
        has1Month: false,
        has1Year: false,
        firstDate: null,
        daysAvailable: 0,
        monthsAvailable: 0,
        yearsAvailable: 0,
      };
    }

    const firstDate = new Date(allSnapshots[0].date);
    const lastDate = new Date(allSnapshots[allSnapshots.length - 1].date);
    const today = new Date();

    const daysAvailable = differenceInDays(today, firstDate);
    const monthsAvailable = differenceInMonths(today, firstDate);
    const yearsAvailable = differenceInYears(today, firstDate);

    return {
      has1Month: daysAvailable >= 30,
      has1Year: daysAvailable >= 365,
      firstDate,
      daysAvailable,
      monthsAvailable,
      yearsAvailable,
    };
  }, [allSnapshots]);

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (allSnapshots.length === 0) return [];

    const today = new Date();
    let cutoffDate: Date;

    switch (selectedFilter) {
      case '1d':
        cutoffDate = subDays(today, 1);
        break;
      case '7d':
        cutoffDate = subDays(today, 7);
        break;
      case '30d':
        cutoffDate = subDays(today, 30);
        break;
      case '1m':
        cutoffDate = subMonths(today, 1);
        break;
      case '1y':
        cutoffDate = subYears(today, 1);
        break;
      case 'all':
        return allSnapshots;
      default:
        cutoffDate = subDays(today, 30);
    }

    return allSnapshots.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [allSnapshots, selectedFilter]);

  // Calculate performance
  const performance = useMemo(() => {
    if (filteredData.length < 2) return { value: 0, percent: 0 };
    
    const first = filteredData[0].totalValue;
    const last = filteredData[filteredData.length - 1].totalValue;
    const value = last - first;
    const percent = first > 0 ? ((last - first) / first) * 100 : 0;
    
    return { value, percent };
  }, [filteredData]);

  const isPositive = performance.value >= 0;

  // Available filters based on data
  const availableFilters: { value: TimeFilter; label: string }[] = [
    { value: '1d', label: '1 jour' },
    { value: '7d', label: 'Semaine' },
    { value: '30d', label: '30 jours' },
  ];

  if (dateRanges.has1Month) {
    availableFilters.push({ value: '1m', label: '1 mois' });
  }

  if (dateRanges.has1Year) {
    availableFilters.push({ value: '1y', label: '1 an' });
  }

  availableFilters.push({ value: 'all', label: 'Complet' });

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

  // If no data, show empty state
  if (allSnapshots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance du Portfolio</CardTitle>
          <p className="text-xs text-muted-foreground">Aucune donnée disponible</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Les données de performance apparaîtront après vos premières transactions
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-base">Performance du Portfolio</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedFilter === 'all' 
                ? 'Toutes les données' 
                : selectedFilter === '1d' 
                  ? 'Dernières 24 heures'
                  : selectedFilter === '7d'
                    ? '7 derniers jours'
                    : selectedFilter === '30d'
                      ? '30 derniers jours'
                      : selectedFilter === '1m'
                        ? 'Dernier mois'
                        : 'Dernière année'}
            </p>
          </div>
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
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={selectedFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.value)}
              className={cn(
                'h-8 text-xs',
                selectedFilter === filter.value && 'font-semibold'
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                tickFormatter={(value) => {
                  const date = parseISO(value);
                  if (selectedFilter === '1d') {
                    return format(date, 'HH:mm', { locale: fr });
                  }
                  if (selectedFilter === '7d' || selectedFilter === '30d') {
                    return format(date, 'd MMM', { locale: fr });
                  }
                  return format(date, 'MMM yyyy', { locale: fr });
                }}
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
