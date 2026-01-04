import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  CreditCard, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  TrendingUp,
  Users,
  Landmark,
  PiggyBank,
  Wallet,
  FileText,
  Lightbulb,
  Target,
  Sparkles,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { brokers } from '@/data/brokers';
import { BrokerRecommender } from '@/components/bridge/BrokerRecommender';
import { BrokerComparison } from '@/components/bridge/BrokerComparison';
import { BrokerCard } from '@/components/bridge/BrokerCard';

// Account types
const accountTypes = [
  {
    id: 'individual',
    name: 'Individual Taxable',
    icon: Wallet,
    description: 'Standard brokerage account',
    features: ['No contribution limits', 'Withdraw anytime', 'Capital gains taxes apply'],
    taxInfo: 'Short-term gains taxed as income, long-term gains at lower rates (0-20%)',
    bestFor: 'General investing, trading, short-term goals'
  },
  {
    id: 'traditional-ira',
    name: 'Traditional IRA',
    icon: PiggyBank,
    description: 'Tax-deferred retirement account',
    features: ['Tax-deductible contributions', '$7,000/year limit (2024)', 'Taxes on withdrawal'],
    taxInfo: 'Contributions may be tax-deductible, growth tax-deferred, withdrawals taxed as income',
    bestFor: 'Retirement savings with current tax benefits'
  },
  {
    id: 'roth-ira',
    name: 'Roth IRA',
    icon: TrendingUp,
    description: 'Tax-free growth retirement account',
    features: ['After-tax contributions', '$7,000/year limit (2024)', 'Tax-free withdrawals'],
    taxInfo: 'No tax deduction now, but all future growth and withdrawals are tax-free',
    bestFor: 'Young investors expecting higher future income'
  },
  {
    id: 'joint',
    name: 'Joint Account',
    icon: Users,
    description: 'Shared account with partner',
    features: ['Two account holders', 'Rights of survivorship', 'Shared responsibility'],
    taxInfo: 'Both parties report income/gains, inheritance benefits',
    bestFor: 'Couples investing together'
  }
];

// Readiness quiz questions
const readinessQuestions = [
  { id: 1, text: 'I understand support and resistance levels' },
  { id: 2, text: 'I know the difference between market and limit orders' },
  { id: 3, text: 'I have practiced 30+ days on the simulator' },
  { id: 4, text: 'I can handle a 10% loss without panicking' },
  { id: 5, text: 'I have an emergency fund (3-6 months expenses)' },
  { id: 6, text: 'I understand the risks of trading' },
  { id: 7, text: 'I know how to calculate position size' },
  { id: 8, text: 'I have a defined trading strategy' },
  { id: 9, text: 'I know my financial goals' },
  { id: 10, text: 'I am emotionally prepared for real trading' }
];

// First trade steps
const firstTradeSteps = [
  {
    step: 1,
    title: 'Fund Your Account',
    description: 'Transfer money from your bank via ACH (2-5 business days) or wire transfer (same day).',
    tips: ['Start small - you can always add more', 'Most brokers offer instant deposits up to a limit']
  },
  {
    step: 2,
    title: 'Find a Stock',
    description: 'Use the search bar to find stocks by name or ticker symbol (e.g., AAPL for Apple).',
    tips: ['Start with companies you know', 'Check the chart and recent news']
  },
  {
    step: 3,
    title: 'Analyze the Price',
    description: 'Look at the current price, daily range, and recent trend before deciding.',
    tips: ['Use what you learned in the simulator', 'Check support and resistance levels']
  },
  {
    step: 4,
    title: 'Choose Order Type',
    description: 'Market order for immediate execution, limit order for a specific price.',
    tips: ['Limit orders give you price control', 'Market orders guarantee execution']
  },
  {
    step: 5,
    title: 'Review & Submit',
    description: 'Double-check the ticker, quantity, order type, and estimated total.',
    tips: ['Verify everything before clicking submit', 'Screenshot your order for records']
  },
  {
    step: 6,
    title: 'Monitor & Manage',
    description: 'Track your position, set alerts, and know your exit strategy.',
    tips: ['Set a stop loss to limit downside', 'Have a profit target in mind']
  }
];

export default function Bridge() {
  const [activeTab, setActiveTab] = useState('recommender');
  const [quizAnswers, setQuizAnswers] = useState<Set<number>>(new Set());

  const readinessScore = quizAnswers.size;
  const readinessPercent = (readinessScore / readinessQuestions.length) * 100;
  
  const getReadinessStatus = () => {
    if (readinessScore >= 8) return { label: 'Ready!', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (readinessScore >= 5) return { label: 'Almost There', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { label: 'Keep Practicing', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const readinessStatus = getReadinessStatus();

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-bold">Bridge to Real Trading</h1>
          <p className="text-muted-foreground">
            Your complete guide to transitioning from paper trading to real markets
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
            <TabsTrigger value="recommender" className="gap-2 py-3">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Find Broker</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2 py-3">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="brokers" className="gap-2 py-3">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">All Brokers</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="gap-2 py-3">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="first-trade" className="gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">First Trade</span>
            </TabsTrigger>
            <TabsTrigger value="readiness" className="gap-2 py-3">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Ready?</span>
            </TabsTrigger>
          </TabsList>

          {/* Recommender Tab */}
          <TabsContent value="recommender" className="mt-6">
            <BrokerRecommender brokers={brokers} />
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="compare" className="mt-6">
            <BrokerComparison brokers={brokers} />
          </TabsContent>

          {/* All Brokers Tab */}
          <TabsContent value="brokers" className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {brokers.map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                All brokers listed are regulated by FINRA and SIPC insured up to $500,000. 
                This is not financial advice - do your own research before opening an account.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Account Types Tab */}
          <TabsContent value="accounts" className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {accountTypes.map((account) => {
                const Icon = account.icon;
                return (
                  <Card key={account.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <CardDescription>{account.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {account.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm">
                          <strong>Tax info:</strong> {account.taxInfo}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Best for:</strong> {account.bestFor}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* First Trade Tab */}
          <TabsContent value="first-trade" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Your First Real Trade - Step by Step
                </CardTitle>
                <CardDescription>
                  Follow these steps when you are ready to place your first real trade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {firstTradeSteps.map((step, idx) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                          {step.step}
                        </div>
                        {idx < firstTradeSteps.length - 1 && (
                          <div className="w-px h-full bg-border ml-5 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-muted-foreground mt-1">{step.description}</p>
                        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4" />
                            Tips
                          </p>
                          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                            {step.tips.map((tip, tidx) => (
                              <li key={tidx}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Readiness Quiz Tab */}
          <TabsContent value="readiness" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Trading Readiness Assessment
                </CardTitle>
                <CardDescription>
                  Honestly assess your preparedness for real trading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Your Readiness Score</span>
                    <Badge className={cn(readinessStatus.bg, readinessStatus.color, "border-0")}>
                      {readinessStatus.label}
                    </Badge>
                  </div>
                  <Progress value={readinessPercent} className="h-3" />
                  <p className="text-sm text-muted-foreground text-center">
                    {readinessScore} / {readinessQuestions.length} criteria met
                  </p>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {readinessQuestions.map((q) => (
                    <div 
                      key={q.id}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border transition-colors cursor-pointer",
                        quizAnswers.has(q.id) 
                          ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800" 
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => {
                        const newAnswers = new Set(quizAnswers);
                        if (newAnswers.has(q.id)) {
                          newAnswers.delete(q.id);
                        } else {
                          newAnswers.add(q.id);
                        }
                        setQuizAnswers(newAnswers);
                      }}
                    >
                      <Checkbox 
                        checked={quizAnswers.has(q.id)} 
                        className="pointer-events-none"
                      />
                      <span className={cn(
                        "text-sm",
                        quizAnswers.has(q.id) && "text-emerald-700 dark:text-emerald-400"
                      )}>
                        {q.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Result */}
                {readinessScore >= 8 && (
                  <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-700 dark:text-emerald-400">
                      Congratulations! You appear ready for real trading. Start small, stay disciplined, and continue learning.
                    </AlertDescription>
                  </Alert>
                )}
                {readinessScore >= 5 && readinessScore < 8 && (
                  <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-700 dark:text-amber-400">
                      You are getting close! Focus on the unchecked items and practice more on the simulator before going live.
                    </AlertDescription>
                  </Alert>
                )}
                {readinessScore < 5 && (
                  <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 dark:text-red-400">
                      You should continue practicing on the paper trading simulator. Real trading with real money requires more preparation.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Tax Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Tax Basics for Traders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="capital-gains">
                    <AccordionTrigger>Capital Gains Tax</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Short-term</strong> (held &lt;1 year): Taxed as ordinary income (10-37%)</li>
                        <li><strong>Long-term</strong> (held &gt;1 year): Lower rates (0%, 15%, or 20%)</li>
                        <li>Tip: Hold winning positions for over a year when possible</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="wash-sale">
                    <AccordionTrigger>Wash Sale Rule</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        If you sell a stock at a loss and buy it back within 30 days, you cannot claim the loss for tax purposes. 
                        This prevents investors from artificially creating losses while maintaining their position.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="1099">
                    <AccordionTrigger>Form 1099-B</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        Your broker will send you a 1099-B form each year showing all your trades. 
                        You will use this to report capital gains/losses on your tax return (Schedule D).
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
