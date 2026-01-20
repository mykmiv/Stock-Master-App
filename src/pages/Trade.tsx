import { useState, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { PortfolioSummary } from '@/components/trade/PortfolioSummary';
import { TradeForm } from '@/components/trade/TradeForm';
import { HoldingsTable } from '@/components/trade/HoldingsTable';
import { TradeHistory } from '@/components/trade/TradeHistory';
import { WatchlistPanel } from '@/components/trade/WatchlistPanel';
import { TradePerformanceChart } from '@/components/trade/TradePerformanceChart';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Wallet, History, Eye, TrendingUp } from 'lucide-react';

export default function Trade() {
  const { portfolio, isLoading, executeTrade, trades } = usePortfolio();
  const { watchlists, removeFromWatchlist } = useWatchlist();
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [selectedSide, setSelectedSide] = useState<'buy' | 'sell'>('buy');
  const [activeTab, setActiveTab] = useState('portfolio');
  const [tradeFormKey, setTradeFormKey] = useState(0);
  const tradeFormRef = useRef<HTMLDivElement>(null);

  const handleSell = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSelectedSide('sell');
    setTradeFormKey(prev => prev + 1); // Force re-render of TradeForm
    
    // Scroll to trade form
    setTimeout(() => {
      tradeFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTrade = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSelectedSide('buy');
    setTradeFormKey(prev => prev + 1); // Force re-render of TradeForm
    
    // Scroll to trade form
    setTimeout(() => {
      tradeFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const defaultWatchlist = watchlists[0];
  const investedValue = portfolio?.holdings.reduce((sum, h) => sum + h.totalValue, 0) || 0;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        {/* Portfolio Summary */}
        <PortfolioSummary
          totalValue={portfolio?.totalValue || 100000}
          cashBalance={portfolio?.cashBalance || 100000}
          investedValue={investedValue}
          totalPnl={portfolio?.totalPnl || 0}
          totalPnlPercent={portfolio?.totalPnlPercent || 0}
          isLoading={isLoading}
        />

        {/* Performance Chart */}
        <TradePerformanceChart />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Trade Form */}
          <div className="lg:col-span-1 space-y-6" ref={tradeFormRef}>
            <TradeForm
              key={tradeFormKey}
              cashBalance={portfolio?.cashBalance || 0}
              holdings={portfolio?.holdings.map(h => ({ symbol: h.symbol, shares: h.shares })) || []}
              onTrade={executeTrade}
              preselectedSymbol={selectedSymbol}
              preselectedSide={selectedSide}
            />
          </div>

          {/* Right: Portfolio/History/Watchlist */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="portfolio" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">Holdings</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Watchlist</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-4">
                {isLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : (
                  <HoldingsTable 
                    holdings={portfolio?.holdings || []} 
                    onSell={handleSell}
                  />
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <TradeHistory trades={trades} />
              </TabsContent>

              <TabsContent value="watchlist" className="mt-4">
                <WatchlistPanel
                  items={defaultWatchlist?.items || []}
                  onRemove={removeFromWatchlist}
                  onTrade={handleTrade}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
