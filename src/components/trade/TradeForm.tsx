import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StockCombobox } from './StockCombobox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { mockStocks, formatCurrency } from '@/data/mockStocks';
import { TrendingUp, TrendingDown, AlertCircle, Calculator, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TradeData } from '@/hooks/usePortfolio';
import { useMarketHours } from '@/hooks/useMarketHours';
import { useToast } from '@/hooks/use-toast';
import { useSettings } from '@/hooks/useSettings';

interface TradeFormProps {
  cashBalance: number;
  holdings: { symbol: string; shares: number }[];
  onTrade: (trade: TradeData) => Promise<boolean>;
  preselectedSymbol?: string;
  preselectedSide?: 'buy' | 'sell';
}

export function TradeForm({ 
  cashBalance, 
  holdings, 
  onTrade, 
  preselectedSymbol = '', 
  preselectedSide = 'buy' 
}: TradeFormProps) {
  const [side, setSide] = useState<'buy' | 'sell'>(preselectedSide);
  const [symbol, setSymbol] = useState(preselectedSymbol);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop_loss'>('market');
  const [shares, setShares] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Sync with preselected props when they change (e.g., clicking "Sell" from holdings table)
  useEffect(() => {
    if (preselectedSymbol) {
      setSymbol(preselectedSymbol);
    }
  }, [preselectedSymbol]);

  useEffect(() => {
    setSide(preselectedSide);
  }, [preselectedSide]);

  const selectedStock = mockStocks.find(s => s.symbol === symbol);
  const currentPrice = selectedStock?.price || 0;
  const priceChange = selectedStock?.change || 0;
  const priceChangePercent = selectedStock?.changePercent || 0;
  const executionPrice = orderType === 'market' ? currentPrice : parseFloat(limitPrice) || 0;
  const totalValue = (parseFloat(shares) || 0) * executionPrice;

  const holding = holdings.find(h => h.symbol === symbol);
  const maxBuyShares = currentPrice > 0 ? Math.floor(cashBalance / currentPrice) : 0;
  const maxSellShares = holding?.shares || 0;
  const maxShares = side === 'sell' ? maxSellShares : maxBuyShares;

  const isValidTrade = symbol && 
    parseFloat(shares) > 0 && 
    (orderType === 'market' || parseFloat(limitPrice) > 0) &&
    (side === 'buy' ? totalValue <= cashBalance : parseFloat(shares) <= maxSellShares);

  const { isMarketOpen, marketStatus, statusText } = useMarketHours();
  const { toast } = useToast();
  const { settings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidTrade) return;
    
    // If confirmation is disabled, execute trade directly
    if (!settings.confirm_before_trade) {
      executeConfirmedTrade();
      return;
    }
    
    setShowConfirmDialog(true);
  };

  const executeConfirmedTrade = async () => {
    setShowConfirmDialog(false);
    
    // Show market status notification
    if (marketStatus === 'closed') {
      toast({
        title: "⚠️ Marché fermé",
        description: `Dans le vrai marché, cette transaction ne pourrait pas être exécutée au prix indiqué. ${statusText}. (Paper trading : transaction exécutée quand même)`,
        variant: "destructive",
      });
    } else if (marketStatus === 'extended') {
      toast({
        title: "📊 Heures prolongées",
        description: "En heures prolongées (pre-market/after-hours), le prix réel pourrait différer significativement du prix affiché.",
      });
    }

    setIsSubmitting(true);
    
    const success = await onTrade({
      symbol,
      side,
      orderType,
      shares: parseFloat(shares),
      price: executionPrice,
    });

    if (success) {
      setShares('');
      setLimitPrice('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Place Order
          </CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              marketStatus === 'open' 
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                : marketStatus === 'extended'
                ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-muted-foreground/30 bg-muted/50 text-muted-foreground"
            )}
          >
            <span className={cn(
              "h-2 w-2 rounded-full",
              marketStatus === 'open' && "bg-emerald-500 animate-pulse",
              marketStatus === 'extended' && "bg-amber-500 animate-pulse",
              marketStatus === 'closed' && "bg-gray-400"
            )} />
            {marketStatus === 'open' ? 'Market Open' : marketStatus === 'extended' ? 'Extended Hours' : 'Market Closed'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {statusText} • Paper trading available 24/7
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Buy/Sell Toggle */}
          <Tabs value={side} onValueChange={(v) => setSide(v as 'buy' | 'sell')}>
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger 
                value="buy" 
                className="text-base data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger 
                value="sell" 
                className="text-base data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Stock Selection */}
          <div className="space-y-2">
            <Label>Stock</Label>
            <StockCombobox value={symbol} onValueChange={setSymbol} />
          </div>

          {/* Live Price Display */}
          {symbol && selectedStock && (
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Price</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{formatCurrency(currentPrice)}</span>
                  <span className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    priceChange >= 0 ? "text-emerald-600" : "text-red-600"
                  )}>
                    {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              {side === 'sell' && holding && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Position</span>
                  <span className="font-medium">{holding.shares} shares</span>
                </div>
              )}
            </div>
          )}

          {/* Order Type */}
          <div className="space-y-2">
            <Label>Order Type</Label>
            <Select value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market Order (Execute Now)</SelectItem>
                <SelectItem value="limit">Limit Order (Set Price)</SelectItem>
                <SelectItem value="stop_loss">Stop Loss</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Limit/Stop Price */}
          {orderType !== 'market' && (
            <div className="space-y-2">
              <Label>{orderType === 'limit' ? 'Limit Price' : 'Stop Price'}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder={currentPrice.toFixed(2)}
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
          )}

          {/* Shares */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Number of Shares</Label>
              {symbol && (
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => setShares(maxShares.toString())}
                >
                  Max: {maxShares.toLocaleString()}
                </button>
              )}
            </div>
            <Input
              type="number"
              min="1"
              step="1"
              placeholder="0"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Order Summary */}
          {symbol && shares && executionPrice > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per Share</span>
                  <span>{formatCurrency(executionPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shares</span>
                  <span>×{parseFloat(shares).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Estimated Total</span>
                  <span>{formatCurrency(totalValue)}</span>
                </div>
                {side === 'buy' && (
                  <p className="text-xs text-muted-foreground">
                    Cash after trade: {formatCurrency(cashBalance - totalValue)}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Warnings */}
          {side === 'buy' && totalValue > cashBalance && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Insufficient funds. You need {formatCurrency(totalValue - cashBalance)} more.
              </AlertDescription>
            </Alert>
          )}

          {side === 'sell' && parseFloat(shares) > maxSellShares && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You only have {maxSellShares} shares of {symbol} to sell.
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!isValidTrade || isSubmitting}
            className={cn(
              "w-full h-12 text-lg font-semibold",
              side === 'buy' 
                ? "bg-emerald-500 hover:bg-emerald-600" 
                : "bg-red-500 hover:bg-red-600"
            )}
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {side === 'buy' ? 'Buy' : 'Sell'} {symbol || 'Stock'}
              </>
            )}
          </Button>
        </form>
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Confirmer la transaction
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4 pt-2">
                <p>Vous êtes sur le point d'exécuter la transaction suivante :</p>
                
                <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Action</span>
                    <span className={cn(
                      "font-semibold",
                      side === 'buy' ? "text-emerald-500" : "text-red-500"
                    )}>
                      {side === 'buy' ? 'Acheter' : 'Vendre'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Symbole</span>
                    <span className="font-semibold">{symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantité</span>
                    <span className="font-semibold">{shares} actions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix unitaire</span>
                    <span className="font-semibold">{formatCurrency(executionPrice)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span className="font-medium">Total</span>
                    <span className={cn(
                      "font-bold",
                      side === 'buy' ? "text-emerald-500" : "text-red-500"
                    )}>
                      {formatCurrency(totalValue)}
                    </span>
                  </div>
                </div>

                {marketStatus !== 'open' && (
                  <p className="text-sm text-amber-500">
                    ⚠️ Le marché est actuellement {marketStatus === 'closed' ? 'fermé' : 'en heures prolongées'}. 
                    Les prix réels pourraient différer.
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeConfirmedTrade}
              className={cn(
                side === 'buy' 
                  ? "bg-emerald-500 hover:bg-emerald-600" 
                  : "bg-red-500 hover:bg-red-600"
              )}
            >
              Confirmer {side === 'buy' ? "l'achat" : 'la vente'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
