import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Rocket, Star, Loader2, Settings } from 'lucide-react';
import { useState } from 'react';
import { useSubscription, SUBSCRIPTION_TIERS } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceYearly: number;
  icon: React.ElementType;
  iconColor: string;
  popular?: boolean;
  features: PlanFeature[];
  priceId?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Parfait pour découvrir',
    price: 0,
    priceYearly: 0,
    icon: Star,
    iconColor: 'text-muted-foreground',
    features: [
      { text: 'Toutes les leçons Beginner (15 leçons)', included: true },
      { text: '5 scans AI par mois', included: true },
      { text: 'Simulateur $100K', included: true },
      { text: 'Watchlist basique (10 stocks max)', included: true },
      { text: 'Communauté Discord', included: true },
      { text: 'Leçons Intermediate & Advanced', included: false },
      { text: 'Scans illimités', included: false },
      { text: 'Données en temps réel', included: false },
      { text: 'Support prioritaire', included: false },
      { text: 'Guides Bridge to Real Trading', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Formation complète pour traders sérieux',
    price: 14.99,
    priceYearly: 11.99,
    icon: Rocket,
    iconColor: 'text-primary',
    popular: true,
    priceId: SUBSCRIPTION_TIERS.pro.price_id,
    features: [
      { text: 'TOUTES les leçons (Beginner → Advanced)', included: true },
      { text: 'Scans AI ILLIMITÉS', included: true },
      { text: 'Simulateur $500K', included: true },
      { text: 'Données live en temps réel', included: true },
      { text: 'Watchlists illimitées avec alertes', included: true },
      { text: 'Guides Bridge to Real Trading', included: true },
      { text: 'Analytics avancés (backtesting, P&L)', included: true },
      { text: 'Support prioritaire (email 24h)', included: true },
      { text: 'Market insights hebdomadaires', included: true },
      { text: 'Leçons vidéo premium', included: true },
      { text: 'Accès Trading Room Discord', included: false },
      { text: 'Coaching 1-on-1', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Accompagnement personnalisé + communauté VIP',
    price: 49.99,
    priceYearly: 39.99,
    icon: Crown,
    iconColor: 'text-warning',
    priceId: SUBSCRIPTION_TIERS.elite.price_id,
    features: [
      { text: 'TOUT du plan Pro', included: true },
      { text: 'Simulateur $1M', included: true },
      { text: 'Trading Room Discord VIP 24/7', included: true },
      { text: 'Coaching 1-on-1 HEBDOMADAIRE (4x/mois)', included: true },
      { text: 'Revue personnalisée de portfolio', included: true },
      { text: 'Stratégies de trading personnalisées', included: true },
      { text: 'Alertes AI custom sur mesure', included: true },
      { text: 'Accès API pour développeurs', included: true },
      { text: 'Accès anticipé nouvelles features', included: true },
      { text: 'Support prioritaire (chat live)', included: true },
      { text: 'Leçons Options & Futures (avancé)', included: true },
      { text: 'Certificat StockMaster à la fin', included: true },
    ],
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { tier, subscribed, isLoading, createCheckout, openCustomerPortal } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (plan: Plan) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!plan.priceId) return;

    setLoadingPlan(plan.id);
    try {
      await createCheckout(plan.priceId);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    setLoadingPlan('manage');
    try {
      await openCustomerPortal();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to open subscription management. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const getButtonText = (plan: Plan) => {
    if (plan.id === 'free') {
      return tier === 'free' ? 'Current Plan' : 'Downgrade';
    }
    if (tier === plan.id) return 'Current Plan';
    if (subscribed) return 'Change Plan';
    return 'Start Free Trial';
  };

  const isCurrentPlan = (planId: string) => tier === planId;

  return (
    <MainLayout>
      <div className="space-y-8 fade-in max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Choose Your Trading Journey
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From beginner to elite trader. Pick the plan that matches your goals.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Save 20%
              </Badge>
            )}
          </div>

          {/* Manage Subscription Button */}
          {subscribed && (
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              disabled={loadingPlan === 'manage'}
              className="mt-4"
            >
              {loadingPlan === 'manage' ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Settings className="h-4 w-4 mr-2" />
              )}
              Manage Subscription
            </Button>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.priceYearly : plan.price;
            const isCurrent = isCurrentPlan(plan.id);
            
            return (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col ${
                  plan.popular 
                    ? 'border-primary shadow-lg ring-1 ring-primary/20' 
                    : ''
                } ${isCurrent ? 'border-success ring-1 ring-success/20' : ''}`}
              >
                {plan.popular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-success text-success-foreground">
                      Your Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-2`}>
                    <Icon className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold">${price}</span>
                    {price > 0 && (
                      <span className="text-muted-foreground text-sm">/month</span>
                    )}
                    {isYearly && price > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed ${price * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                        )}
                        <span className={`text-sm ${!feature.included ? 'text-muted-foreground/50' : ''}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full" 
                    variant={plan.popular && !isCurrent ? 'default' : plan.id === 'free' || isCurrent ? 'outline' : 'secondary'}
                    disabled={isCurrent || (plan.id === 'free' && tier === 'free') || isLoading || loadingPlan === plan.id}
                    onClick={() => {
                      if (subscribed && plan.priceId) {
                        handleManageSubscription();
                      } else {
                        handleSubscribe(plan);
                      }
                    }}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      getButtonText(plan)
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                All paid plans come with a 7-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What's paper trading?</h4>
              <p className="text-sm text-muted-foreground">
                Paper trading lets you practice with virtual money. It's risk-free and uses real market data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I upgrade or downgrade?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! You can change your plan at any time. Changes take effect immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
