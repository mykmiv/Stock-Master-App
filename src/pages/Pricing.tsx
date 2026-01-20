import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Zap, Star, Loader2, Settings, Heart, Sparkles, TrendingUp } from 'lucide-react';
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
  iconBg?: string;
  popular?: boolean;
  features: PlanFeature[];
  priceId?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Accès limité',
    price: 0,
    priceYearly: 0,
    icon: Star,
    iconBg: 'bg-gray-100',
    iconColor: 'text-muted-foreground',
    features: [
      { text: 'Vies limitées (5/jour)', included: true },
      { text: '3 premiers chapitres de chaque path', included: true },
      { text: 'Scanner IA limité', included: true },
      { text: 'Coach IA limité', included: true },
      { text: 'Support standard', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Accès illimité',
    price: 19.99,
    priceYearly: 16.58, // $199/an = $16.58/mois (économise $40 = 17%)
    icon: Zap,
    iconBg: 'bg-gradient-to-br from-blue-500 to-green-400',
    iconColor: 'text-primary',
    popular: true,
    priceId: SUBSCRIPTION_TIERS.pro.price_id,
    features: [
      { text: 'Vies illimitées ∞', included: true },
      { text: 'Accès à toutes les leçons', included: true },
      { text: 'Scanner IA illimité', included: true },
      { text: 'Coach IA illimité', included: true },
      { text: 'Simulateur illimité', included: true },
      { text: 'Tous les indicateurs', included: true },
      { text: 'Backtesting', included: true },
      { text: 'Support prioritaire', included: true },
    ],
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { tier, subscribed, isLoading, createCheckout, openCustomerPortal } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const pricing = {
    pro: {
      monthly: 19.99,
      yearly: 159,
      monthlyEquivalent: 12.99, // When paying yearly
      discount: 34, // Percentage discount
      savings: 81 // Dollar amount saved
    }
  };

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
      return tier === 'free' ? '✓ Ton plan actuel' : 'Revenir à Free';
    }
    if (tier === plan.id) return '✓ Ton plan actuel';
    if (subscribed) return 'Changer de plan';
    return plan.id === 'pro' ? 'Choisir Pro' : 'Commencer gratuitement';
  };

  const isCurrentPlan = (planId: string) => tier === planId;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Choisis ton plan
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Commence gratuitement avec des vies limitées, ou passe à Pro pour un accès illimité
            </p>

            {/* Billing Toggle - PROMINENT */}
            <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-xl border-2 border-gray-100 relative">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`
                  relative px-8 py-3 rounded-xl font-bold text-base transition-all duration-300
                  ${billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                Mensuel
              </button>
              
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`
                  relative px-8 py-3 rounded-xl font-bold text-base transition-all duration-300
                  ${billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                Annuel
                {/* 34% Savings Badge */}
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg transform rotate-12 animate-pulse">
                  -{pricing.pro.discount}%
                </span>
              </button>
            </div>

            {/* Savings Message - Extra Visibility */}
            {billingPeriod === 'yearly' && (
              <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-6 py-3 rounded-full font-semibold shadow-md animate-fadeIn">
                <TrendingUp className="w-5 h-5" />
                <span>
                  Économise <span className="font-black text-green-900">{pricing.pro.discount}%</span> avec le plan annuel!
                </span>
              </div>
            )}

            {/* Manage Subscription Button */}
            {subscribed && (
              <Button
                variant="outline"
                onClick={handleManageSubscription}
                disabled={loadingPlan === 'manage'}
                className="mt-6"
              >
                {loadingPlan === 'manage' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Settings className="h-4 w-4 mr-2" />
                )}
                Gérer l'abonnement
              </Button>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            
            {/* FREE Plan */}
            <div className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
              isCurrentPlan('free') ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
            }`}>
              {isCurrentPlan('free') && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                  ✓ Ton plan
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                    <p className="text-gray-600 text-sm">Commence gratuitement</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/mois</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Gratuit pour toujours</p>
                </div>

                <button
                  onClick={() => {}}
                  disabled={isCurrentPlan('free')}
                  className={`w-full py-4 px-6 font-bold rounded-xl transition-all mb-6 ${
                    isCurrentPlan('free')
                      ? 'bg-green-500 text-white border-2 border-green-600 shadow-green-500/50 hover:bg-green-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {isCurrentPlan('free') ? '✓ Ton plan actuel' : 'Commencer gratuitement'}
                </button>

                {/* INCLUDED FEATURES */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Inclus
                  </p>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium">Vies limitées</span>
                      <p className="text-sm text-gray-600">5 vies/jour, recharge 4h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium">3 premiers chapitres</span>
                      <p className="text-sm text-gray-600">De chaque path disponible</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-900">Scanner IA limité</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-900">Coach IA limité</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium">Support standard</span>
                      <p className="text-sm text-gray-600">Réponse selon disponibilité</p>
                    </div>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* NOT INCLUDED FEATURES (GRAYED OUT) */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                    Non inclus
                  </p>

                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-400">Vies illimitées</span>
                  </div>

                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-400">Tous les chapitres (4+)</span>
                  </div>

                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-400">Scanner IA illimité</span>
                  </div>

                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-400">Coach IA illimité</span>
                  </div>

                  <div className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-400">Support prioritaire</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PRO Plan - Featured */}
            <div className={`relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 transform md:scale-105 ${
              isCurrentPlan('pro') ? 'border-green-500 ring-2 ring-green-200' : 'border-blue-500'
            }`}>
              {/* Most Popular Badge */}
              {!isCurrentPlan('pro') && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center py-2 font-bold text-sm">
                  🔥 PLUS POPULAIRE - ÉCONOMISE {pricing.pro.discount}%
                </div>
              )}
              
              {isCurrentPlan('pro') && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                  ✓ Ton plan
                </div>
              )}

              <div className={`p-8 ${!isCurrentPlan('pro') ? 'pt-16' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                    <p className="text-gray-600 text-sm">Tout illimité</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${billingPeriod === 'monthly' 
                        ? pricing.pro.monthly.toFixed(2)
                        : pricing.pro.monthlyEquivalent.toFixed(2)
                      }
                    </span>
                    <span className="text-gray-600">/mois</span>
                  </div>
                  
                  {/* Pricing Details */}
                  {billingPeriod === 'yearly' ? (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        ${pricing.pro.yearly}/an facturé annuellement
                      </p>
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-bold mt-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Économise {pricing.pro.discount}%</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      Ou ${pricing.pro.yearly}/an (économise {pricing.pro.discount}%)
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (subscribed && plans.find(p => p.id === 'pro')?.priceId) {
                      handleManageSubscription();
                    } else if (!isCurrentPlan('pro')) {
                      const proPlan = plans.find(p => p.id === 'pro');
                      if (proPlan) handleSubscribe(proPlan);
                    }
                  }}
                  disabled={isCurrentPlan('pro') || isLoading || loadingPlan === 'pro'}
                  className={`w-full py-4 px-6 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl mb-6 transform hover:scale-105 ${
                    isCurrentPlan('pro')
                      ? 'bg-green-500 text-white border-2 border-green-600 shadow-green-500/50 hover:bg-green-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === 'pro' ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : (
                    getButtonText(plans.find(p => p.id === 'pro')!)
                  )}
                </button>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-bold">Vies illimitées ∞</span>
                      <p className="text-sm text-gray-600">Plus jamais de limite!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-bold">Tous les chapitres</span>
                      <p className="text-sm text-gray-600">De tous les paths, sans limite</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-semibold">Scanner IA illimité</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-semibold">Coach IA illimité</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-900 font-semibold">Support prioritaire</span>
                      <p className="text-sm text-gray-600">Réponse rapide garantie</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-900 font-semibold">Backtesting avancé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Comparaison détaillée
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-900 font-bold text-lg">Fonctionnalité</th>
                    <th className="text-center py-4 px-4 text-gray-600 font-bold">FREE</th>
                    <th className="text-center py-4 px-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                        PRO
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">💰 Prix</td>
                    <td className="text-center py-4 px-4 text-gray-600">$0</td>
                    <td className="text-center py-4 px-4">
                      <div>
                        <span className="text-blue-600 font-bold text-lg">${pricing.pro.monthly}/mois</span>
                        <p className="text-xs text-gray-500 mt-1">
                          ou ${pricing.pro.monthlyEquivalent}/mois (annuel)
                        </p>
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold mt-1">
                          <span>-{pricing.pro.discount}% annuel</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">💚 Vies</td>
                    <td className="text-center py-4 px-4 text-gray-600">5 par jour</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-green-600 font-bold">∞ Illimitées</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">📚 Chapitres</td>
                    <td className="text-center py-4 px-4 text-gray-600">3 premiers par path</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-blue-600 font-bold">Tous</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">🔍 Scanner IA</td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <X className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Limité</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-blue-600 font-bold">Illimité</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">🤖 Coach IA</td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <X className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Limité</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center gap-1">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-xs text-blue-600 font-bold">Illimité</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900 font-medium">💬 Support</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-gray-600">Standard</span>
                      <p className="text-xs text-gray-500 mt-1">Selon disponibilité</p>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="inline-flex flex-col items-center">
                        <span className="text-blue-600 font-bold">Prioritaire</span>
                        <p className="text-xs text-blue-600 mt-1">Réponse rapide</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              *Avec FREE, tu as accès aux 3 premiers chapitres de chaque path
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
              Questions fréquentes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">💚</span>
                  C'est quoi les vies?
                </h3>
                <p className="text-gray-600">
                  Comme Duolingo! FREE = 5 vies/jour. Chaque erreur = -1 vie. PRO = vies illimitées!
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Combien j'économise avec l'annuel?
                </h3>
                <p className="text-gray-600">
                  <span className="font-bold text-green-600">{pricing.pro.discount}% de rabais!</span> Tu payes ${pricing.pro.yearly}/an au lieu de ${(pricing.pro.monthly * 12).toFixed(2)}. 
                  Ça fait ${pricing.pro.monthlyEquivalent}/mois au lieu de ${pricing.pro.monthly}/mois. Économise ~${pricing.pro.savings}/an! 🎉
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  Puis-je annuler?
                </h3>
                <p className="text-gray-600">
                  Oui! Annule à tout moment. Tu gardes l'accès jusqu'à la fin de ta période payée.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎁</span>
                  Y a-t-il un essai gratuit?
                </h3>
                <p className="text-gray-600">
                  Le plan FREE est gratuit à vie! Essaye avant de payer.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  Quelle est la différence de support?
                </h3>
                <p className="text-gray-600">
                  FREE = Support standard (réponse selon disponibilité). PRO = Support prioritaire (réponse rapide garantie).
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Pourquoi passer à Pro?
                </h3>
                <p className="text-gray-600">
                  Vies illimitées + IA illimitée = Apprends 5× plus vite sans frustration!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à trader comme un pro?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Rejoins des milliers d'étudiants qui apprennent le trading avec StockMaster AI
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    Commencer gratuitement
                  </button>
                  <button
                    onClick={() => {
                      if (user && SUBSCRIPTION_TIERS.pro.price_id) {
                        handleSubscribe({ id: 'pro', priceId: SUBSCRIPTION_TIERS.pro.price_id } as Plan);
                      } else {
                        navigate('/auth');
                      }
                    }}
                    className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
                  >
                    Choisir Pro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
