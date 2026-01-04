import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercent } from '@/data/mockStocks';
import { PortfolioHolding } from '@/hooks/usePortfolio';

interface HoldingsTableProps {
  holdings: PortfolioHolding[];
  onSell: (symbol: string) => void;
}

export function HoldingsTable({ holdings, onSell }: HoldingsTableProps) {
  if (holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            You have no holdings yet. Start by buying some stocks!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Avg Cost</TableHead>
              <TableHead className="text-right">Current</TableHead>
              <TableHead className="text-right">P&L</TableHead>
              <TableHead className="text-right">% Change</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding) => {
              const isPositive = holding.pnl >= 0;
              
              return (
                <TableRow key={holding.id}>
                  <TableCell className="font-mono font-semibold">
                    {holding.symbol}
                  </TableCell>
                  <TableCell className="text-right">{holding.shares}</TableCell>
                  <TableCell className="text-right">{formatCurrency(holding.averageCost)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(holding.currentPrice)}</TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    isPositive ? "text-emerald-600" : "text-red-600"
                  )}>
                    {isPositive ? '+' : ''}{formatCurrency(holding.pnl)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "gap-1",
                        isPositive 
                          ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400" 
                          : "border-red-500/50 text-red-700 dark:text-red-400"
                      )}
                    >
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {formatPercent(holding.pnlPercent)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onSell(holding.symbol)}
                    >
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
