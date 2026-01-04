import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Calculator, DollarSign, TrendingUp, Percent } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type ExampleType = 'stock-calculator' | 'risk-reward' | 'compound-interest' | 'position-size';

interface InteractiveExampleProps {
  type: ExampleType;
  title?: string;
  index?: number;
}

export function InteractiveExample({
  type,
  title,
  index = 0,
}: InteractiveExampleProps) {
  const renderExample = () => {
    switch (type) {
      case 'stock-calculator':
        return <StockCalculator />;
      case 'risk-reward':
        return <RiskRewardCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'position-size':
        return <PositionSizeCalculator />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'stock-calculator':
        return 'Calculateur de Profit';
      case 'risk-reward':
        return 'Ratio Risque/Récompense';
      case 'compound-interest':
        return 'Intérêts Composés';
      case 'position-size':
        return 'Taille de Position';
      default:
        return 'Outil Interactif';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'rounded-2xl border-2 border-secondary/30 overflow-hidden',
        'bg-gradient-to-br from-secondary/5 via-blue-50/50 to-indigo-50/30',
        'dark:from-secondary/10 dark:via-blue-950/20 dark:to-indigo-950/10'
      )}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-secondary/20 bg-secondary/10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Outil interactif
          </span>
          <h3 className="font-bold text-foreground">{getTitle()}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderExample()}
      </div>
    </motion.div>
  );
}

// Stock Calculator Component
function StockCalculator() {
  const [shares, setShares] = useState(10);
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(120);

  const investment = shares * buyPrice;
  const currentValue = shares * sellPrice;
  const profit = currentValue - investment;
  const profitPercent = ((profit / investment) * 100).toFixed(2);
  const isProfit = profit >= 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">Nombre d'actions</Label>
          <Input
            type="number"
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            min={1}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Prix d'achat (€)</Label>
          <Input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
            min={0}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Prix de vente (€)</Label>
          <Input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
            min={0}
            className="mt-1"
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${shares}-${buyPrice}-${sellPrice}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <ResultCard
          label="Investissement"
          value={`${investment.toLocaleString()}€`}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <ResultCard
          label="Valeur finale"
          value={`${currentValue.toLocaleString()}€`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <ResultCard
          label="Profit/Perte"
          value={`${isProfit ? '+' : ''}${profit.toLocaleString()}€`}
          icon={<DollarSign className="h-4 w-4" />}
          variant={isProfit ? 'success' : 'danger'}
        />
        <ResultCard
          label="Rendement"
          value={`${isProfit ? '+' : ''}${profitPercent}%`}
          icon={<Percent className="h-4 w-4" />}
          variant={isProfit ? 'success' : 'danger'}
        />
      </motion.div>
    </div>
  );
}

// Risk Reward Calculator
function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(95);
  const [takeProfit, setTakeProfit] = useState(115);

  const risk = entryPrice - stopLoss;
  const reward = takeProfit - entryPrice;
  const ratio = risk > 0 ? (reward / risk).toFixed(2) : '0';
  const isGoodRatio = Number(ratio) >= 2;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">Prix d'entrée (€)</Label>
          <Input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Stop Loss (€)</Label>
          <Input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Take Profit (€)</Label>
          <Input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>

      <motion.div
        key={`${entryPrice}-${stopLoss}-${takeProfit}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-3 gap-3"
      >
        <ResultCard
          label="Risque"
          value={`${risk.toFixed(2)}€`}
          variant="danger"
        />
        <ResultCard
          label="Récompense"
          value={`${reward.toFixed(2)}€`}
          variant="success"
        />
        <ResultCard
          label="Ratio R:R"
          value={`1:${ratio}`}
          variant={isGoodRatio ? 'success' : 'warning'}
        />
      </motion.div>

      <p className={cn(
        'text-sm text-center font-medium',
        isGoodRatio ? 'text-success' : 'text-warning'
      )}>
        {isGoodRatio
          ? '✓ Bon ratio! La récompense potentielle justifie le risque.'
          : '⚠ Ratio faible. Visez un ratio d\'au moins 1:2.'}
      </p>
    </div>
  );
}

// Compound Interest Calculator
function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState([7]);
  const [years, setYears] = useState([10]);

  const finalAmount = principal * Math.pow(1 + rate[0] / 100, years[0]);
  const totalGain = finalAmount - principal;

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Capital initial (€)</Label>
        <Input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          min={0}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-sm font-medium">Rendement annuel</Label>
          <span className="text-sm font-bold text-primary">{rate[0]}%</span>
        </div>
        <Slider
          value={rate}
          onValueChange={setRate}
          min={1}
          max={20}
          step={0.5}
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-sm font-medium">Durée</Label>
          <span className="text-sm font-bold text-primary">{years[0]} ans</span>
        </div>
        <Slider
          value={years}
          onValueChange={setYears}
          min={1}
          max={30}
          step={1}
        />
      </div>

      <motion.div
        key={`${principal}-${rate[0]}-${years[0]}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-2 gap-3"
      >
        <ResultCard
          label="Montant final"
          value={`${finalAmount.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€`}
          variant="success"
        />
        <ResultCard
          label="Gains totaux"
          value={`+${totalGain.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€`}
          variant="success"
        />
      </motion.div>
    </div>
  );
}

// Position Size Calculator
function PositionSizeCalculator() {
  const [capital, setCapital] = useState(10000);
  const [riskPercent, setRiskPercent] = useState([2]);
  const [stopLossPercent, setStopLossPercent] = useState([5]);

  const riskAmount = capital * (riskPercent[0] / 100);
  const positionSize = riskAmount / (stopLossPercent[0] / 100);
  const sharesAtPrice100 = Math.floor(positionSize / 100);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Capital total (€)</Label>
        <Input
          type="number"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
          min={0}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-sm font-medium">Risque par trade</Label>
          <span className="text-sm font-bold text-destructive">{riskPercent[0]}%</span>
        </div>
        <Slider
          value={riskPercent}
          onValueChange={setRiskPercent}
          min={0.5}
          max={5}
          step={0.5}
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-sm font-medium">Stop Loss</Label>
          <span className="text-sm font-bold text-warning">{stopLossPercent[0]}%</span>
        </div>
        <Slider
          value={stopLossPercent}
          onValueChange={setStopLossPercent}
          min={1}
          max={15}
          step={0.5}
        />
      </div>

      <motion.div
        key={`${capital}-${riskPercent[0]}-${stopLossPercent[0]}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-3 gap-3"
      >
        <ResultCard
          label="Risque max"
          value={`${riskAmount.toLocaleString()}€`}
          variant="danger"
        />
        <ResultCard
          label="Position max"
          value={`${positionSize.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€`}
        />
        <ResultCard
          label="Actions @100€"
          value={sharesAtPrice100.toString()}
          variant="success"
        />
      </motion.div>
    </div>
  );
}

// Result Card Component
function ResultCard({
  label,
  value,
  icon,
  variant = 'default',
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning';
}) {
  const variantStyles = {
    default: 'bg-muted/50 text-foreground',
    success: 'bg-success/10 text-success',
    danger: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className={cn('rounded-xl p-3 text-center', variantStyles[variant])}>
      {icon && <div className="flex justify-center mb-1">{icon}</div>}
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
