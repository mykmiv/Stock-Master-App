import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const mockIndices: MarketIndex[] = [
  { symbol: 'SPY', name: 'S&P 500', value: 5892.45, change: 23.67, changePercent: 0.40 },
  { symbol: 'DIA', name: 'Dow Jones', value: 43847.18, change: -45.23, changePercent: -0.10 },
  { symbol: 'QQQ', name: 'NASDAQ', value: 21234.67, change: 156.89, changePercent: 0.74 },
  { symbol: 'IWM', name: 'Russell 2000', value: 2287.34, change: 12.45, changePercent: 0.55 },
];

export function MarketOverview() {
  const [indices, setIndices] = useState<MarketIndex[]>(mockIndices);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => {
        const randomChange = (Math.random() - 0.5) * 2;
        const newChange = index.change + randomChange;
        const newValue = index.value + randomChange;
        const newChangePercent = (newChange / newValue) * 100;
        
        return {
          ...index,
          value: newValue,
          change: newChange,
          changePercent: newChangePercent,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {indices.map((index) => {
        const isPositive = index.change >= 0;
        
        return (
          <Card key={index.symbol} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{index.symbol}</span>
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
              </div>
              <p className="font-display text-lg font-bold truncate">
                {index.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? '+' : ''}{index.change.toFixed(2)}
                </span>
                <span className={`text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  ({isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%)
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 truncate">{index.name}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
