import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ExternalLink, Star, Check, AlertTriangle, User, TrendingUp, PiggyBank, Info } from 'lucide-react';
import { type Broker } from '@/data/brokers';
import { cn } from '@/lib/utils';

interface PersonalInputs {
  ageRange: '18-30' | '30-50' | '50+';
  employment: 'employed' | 'self-employed' | 'student' | 'retired';
  primaryGoal: 'retirement' | 'active-trading' | 'savings' | 'wealth-building';
  incomeLevel: 'low' | 'moderate' | 'high';
  country: 'usa' | 'other';
}

interface TradingInputs {
  budget: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  tradingFrequency: 'rare' | 'monthly' | 'weekly' | 'daily';
  priorities: string[];
}

interface AccountRecommendation {
  type: 'roth-ira' | 'traditional-ira' | 'taxable' | '401k-first';
  name: string;
  emoji: string;
  reason: string;
  taxBenefit: string;
  bestFor: string;
  warning?: string;
}

interface BrokerRecommenderProps {
  brokers: Broker[];
}

export function BrokerRecommender({ brokers }: BrokerRecommenderProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [personalInputs, setPersonalInputs] = useState<PersonalInputs>({
    ageRange: '18-30',
    employment: 'employed',
    primaryGoal: 'wealth-building',
    incomeLevel: 'moderate',
    country: 'usa'
  });
  
  const [tradingInputs, setTradingInputs] = useState<TradingInputs>({
    budget: 100,
    experience: 'beginner',
    tradingFrequency: 'monthly',
    priorities: []
  });

  const priorityOptions = [
    { id: 'ease', label: 'Facilité d\'utilisation' },
    { id: 'research', label: 'Outils de recherche' },
    { id: 'support', label: 'Support client' },
    { id: 'mobile', label: 'App mobile' },
    { id: 'crypto', label: 'Trading crypto' },
    { id: 'international', label: 'Marchés internationaux' },
    { id: 'lowCost', label: 'Coûts minimums' }
  ];

  const getAccountRecommendation = (): AccountRecommendation => {
    const { ageRange, employment, primaryGoal, incomeLevel, country } = personalInputs;
    
    // Non-USA: Only taxable accounts
    if (country === 'other') {
      return {
        type: 'taxable',
        name: 'Compte Standard (Taxable)',
        emoji: '💼',
        reason: 'Les comptes IRA sont réservés aux résidents fiscaux US. Un compte standard te donne accès à tous les marchés.',
        taxBenefit: 'Impôts selon les règles de ton pays de résidence',
        bestFor: 'Investisseurs hors USA'
      };
    }
    
    // Retired: Traditional IRA or taxable
    if (employment === 'retired') {
      return {
        type: 'traditional-ira',
        name: 'Traditional IRA',
        emoji: '🏖️',
        reason: 'Tu peux déduire tes contributions de tes impôts cette année et les retraits seront taxés plus tard.',
        taxBenefit: 'Déduction fiscale immédiate, impôts différés',
        bestFor: 'Retraités avec revenus imposables'
      };
    }
    
    // High income + retirement goal: Check Roth IRA limits
    if (incomeLevel === 'high') {
      if (primaryGoal === 'retirement') {
        return {
          type: 'traditional-ira',
          name: 'Traditional IRA',
          emoji: '🏦',
          reason: 'Avec des revenus élevés, tu peux dépasser les limites Roth IRA. Le Traditional IRA te donne une déduction fiscale maintenant.',
          taxBenefit: 'Réduction d\'impôt immédiate (jusqu\'à $7,000/an)',
          bestFor: 'Hauts revenus cherchant réduction fiscale',
          warning: 'Vérifie les plafonds de revenus pour la déductibilité'
        };
      }
      return {
        type: 'taxable',
        name: 'Compte Standard (Taxable)',
        emoji: '💼',
        reason: 'Pour du trading actif ou de l\'épargne flexible, un compte taxable te donne un accès sans restrictions.',
        taxBenefit: 'Plus-values taxées à 15-20% (long-terme) ou revenus (court-terme)',
        bestFor: 'Flexibilité et accès immédiat aux fonds'
      };
    }
    
    // Young (18-30) + employed + any goal: Roth IRA first
    if (ageRange === '18-30' && (employment === 'employed' || employment === 'self-employed')) {
      if (primaryGoal === 'active-trading') {
        return {
          type: 'taxable',
          name: 'Compte Standard (Taxable)',
          emoji: '📈',
          reason: 'Pour du trading actif, tu auras besoin d\'accès flexible à tes fonds. Un compte taxable est idéal.',
          taxBenefit: 'Gains taxés, mais pertes déductibles (jusqu\'à $3,000/an)',
          bestFor: 'Traders actifs voulant flexibilité'
        };
      }
      return {
        type: 'roth-ira',
        name: 'Roth IRA',
        emoji: '🚀',
        reason: 'Jeune avec des décennies de croissance devant toi! Le Roth IRA fait croître ton argent 100% sans impôts.',
        taxBenefit: 'AUCUN impôt sur les gains, JAMAIS (après 59½ ans)',
        bestFor: 'Jeunes investisseurs avec horizon long',
        warning: 'Limite de $7,000/an (2024). Retrait principal possible sans pénalité.'
      };
    }
    
    // Middle age (30-50): depends on goal
    if (ageRange === '30-50') {
      if (primaryGoal === 'retirement') {
        // Check if employer offers 401k
        if (employment === 'employed') {
          return {
            type: '401k-first',
            name: '401(k) puis Roth/Traditional IRA',
            emoji: '🎯',
            reason: 'Si ton employeur offre un match 401(k), c\'est de l\'argent GRATUIT! Contribue d\'abord jusqu\'au match.',
            taxBenefit: 'Match employeur = 50-100% de retour instantané',
            bestFor: 'Employés avec 401(k) disponible',
            warning: 'Ensuite, ouvre un IRA pour investir au-delà du 401(k)'
          };
        }
        return {
          type: 'traditional-ira',
          name: 'Traditional ou Roth IRA',
          emoji: '⚖️',
          reason: 'Tu as encore 15-35 ans avant la retraite. Le choix dépend de si tu penses payer plus d\'impôts maintenant ou à la retraite.',
          taxBenefit: 'Traditional = déduction maintenant | Roth = croissance non-taxée',
          bestFor: 'Préparation retraite à moyen-terme'
        };
      }
      return {
        type: 'taxable',
        name: 'Compte Standard (Taxable)',
        emoji: '💼',
        reason: 'Pour des objectifs avant la retraite (maison, voyages, etc.), tu voudras accès à tes fonds sans pénalités.',
        taxBenefit: 'Flexibilité totale, impôts sur gains réalisés',
        bestFor: 'Objectifs moyen-terme et flexibilité'
      };
    }
    
    // 50+: Traditional IRA for tax deduction
    if (ageRange === '50+') {
      if (primaryGoal === 'retirement' || primaryGoal === 'savings') {
        return {
          type: 'traditional-ira',
          name: 'Traditional IRA',
          emoji: '🏦',
          reason: 'À ce stade, la déduction fiscale immédiate est souvent plus avantageuse. Tu peux contribuer jusqu\'à $8,000/an (50+).',
          taxBenefit: 'Réduction d\'impôt immédiate + catch-up contributions',
          bestFor: 'Rattraper l\'épargne retraite',
          warning: 'Contribution "catch-up" supplémentaire de $1,000/an disponible'
        };
      }
    }
    
    // Default: taxable for flexibility
    return {
      type: 'taxable',
      name: 'Compte Standard (Taxable)',
      emoji: '💼',
      reason: 'Un compte standard te donne la plus grande flexibilité pour commencer.',
      taxBenefit: 'Impôts sur gains, mais accès libre aux fonds',
      bestFor: 'Débuter avec flexibilité'
    };
  };

  const accountRecommendation = getAccountRecommendation();

  const calculateMatch = (broker: Broker) => {
    let score = 50;
    const reasons: string[] = [];
    const { budget, experience, tradingFrequency, priorities } = tradingInputs;
    const accountType = accountRecommendation.type;

    // Budget fit
    if (broker.minDeposit <= budget) {
      score += 20;
      if (broker.minDeposit === 0) {
        reasons.push('Aucun dépôt minimum requis');
      }
    } else {
      score -= 50;
      reasons.push(`⚠️ Nécessite $${broker.minDeposit} minimum`);
    }

    // Experience match
    if (experience === 'beginner' && broker.platformComplexity === 'beginner') {
      score += 30;
      reasons.push('Interface parfaite pour débutants');
    } else if (experience === broker.platformComplexity) {
      score += 20;
      reasons.push('Niveau de complexité adapté');
    } else if (experience === 'beginner' && broker.platformComplexity === 'advanced') {
      score -= 20;
      reasons.push('⚠️ Peut être trop complexe au début');
    }

    // Trading frequency
    if (tradingFrequency === 'daily' && broker.id === 'ibkr') {
      score += 25;
      reasons.push('Excellent pour traders actifs');
    } else if (tradingFrequency === 'rare' && ['fidelity', 'schwab'].includes(broker.id)) {
      score += 15;
      reasons.push('Parfait pour investissement long-terme');
    }

    // Priorities
    priorities.forEach(priority => {
      switch (priority) {
        case 'ease':
          score += broker.easeOfUse * 5;
          if (broker.easeOfUse >= 4) reasons.push('Très facile à utiliser');
          break;
        case 'research':
          score += broker.researchTools * 4;
          if (broker.researchTools >= 4) reasons.push('Excellents outils de recherche');
          break;
        case 'mobile':
          score += broker.mobileApp * 4;
          if (broker.mobileApp >= 4) reasons.push('Application mobile top');
          break;
        case 'crypto':
          if (['robinhood', 'webull'].includes(broker.id)) {
            score += 20;
            reasons.push('Trading crypto disponible');
          }
          break;
        case 'international':
          if (broker.id === 'ibkr') {
            score += 30;
            reasons.push('Accès 150+ marchés internationaux');
          }
          break;
        case 'support':
          if (broker.customerSupport.includes('24/7')) {
            score += 15;
            reasons.push('Support 24/7 disponible');
          }
          break;
        case 'lowCost':
          if (broker.minDeposit === 0) {
            score += 10;
            reasons.push('Aucun frais minimum');
          }
          break;
      }
    });

    // Account type compatibility (IRA support)
    if ((accountType === 'roth-ira' || accountType === 'traditional-ira' || accountType === '401k-first') && 
        ['robinhood', 'webull'].includes(broker.id)) {
      score -= 40;
      reasons.push('⚠️ Ne supporte PAS les comptes IRA');
    } else if ((accountType === 'roth-ira' || accountType === 'traditional-ira') && 
               ['fidelity', 'schwab', 'etrade'].includes(broker.id)) {
      score += 20;
      reasons.push('Excellent support IRA/Roth');
    }

    return {
      broker,
      score: Math.max(0, Math.min(100, score)),
      reasons: reasons.slice(0, 4)
    };
  };

  const recommendations = brokers
    .map(calculateMatch)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "h-3.5 w-3.5",
              i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
            )} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
              step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {s}
            </div>
            {s < 3 && <div className={cn(
              "w-8 h-0.5 transition-all",
              step > s ? "bg-primary" : "bg-muted"
            )} />}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {step === 1 && "Étape 1/3 - Ta situation"}
        {step === 2 && "Étape 2/3 - Tes préférences de trading"}
        {step === 3 && "Résultats personnalisés"}
      </div>

      {/* Step 1: Personal Situation */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Ta situation personnelle
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Ces infos nous aident à recommander le meilleur type de compte pour toi
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Age Range */}
            <div className="space-y-3">
              <Label className="text-base">Tranche d'âge</Label>
              <RadioGroup
                value={personalInputs.ageRange}
                onValueChange={(val) => setPersonalInputs({ ...personalInputs, ageRange: val as PersonalInputs['ageRange'] })}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="18-30" id="age-18-30" />
                  <Label htmlFor="age-18-30" className="font-normal cursor-pointer text-sm">
                    18-30 ans
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="30-50" id="age-30-50" />
                  <Label htmlFor="age-30-50" className="font-normal cursor-pointer text-sm">
                    30-50 ans
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="50+" id="age-50+" />
                  <Label htmlFor="age-50+" className="font-normal cursor-pointer text-sm">
                    50+ ans
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Employment */}
            <div className="space-y-3">
              <Label className="text-base">Situation professionnelle</Label>
              <RadioGroup
                value={personalInputs.employment}
                onValueChange={(val) => setPersonalInputs({ ...personalInputs, employment: val as PersonalInputs['employment'] })}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="employed" id="employed" />
                  <Label htmlFor="employed" className="font-normal cursor-pointer text-sm">
                    👔 Employé(e)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="self-employed" id="self-employed" />
                  <Label htmlFor="self-employed" className="font-normal cursor-pointer text-sm">
                    🏠 Indépendant(e)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="font-normal cursor-pointer text-sm">
                    🎓 Étudiant(e)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="retired" id="retired" />
                  <Label htmlFor="retired" className="font-normal cursor-pointer text-sm">
                    🏖️ Retraité(e)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Primary Goal */}
            <div className="space-y-3">
              <Label className="text-base">Objectif principal d'investissement</Label>
              <RadioGroup
                value={personalInputs.primaryGoal}
                onValueChange={(val) => setPersonalInputs({ ...personalInputs, primaryGoal: val as PersonalInputs['primaryGoal'] })}
                className="grid gap-2"
              >
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="retirement" id="retirement" />
                  <Label htmlFor="retirement" className="font-normal cursor-pointer flex-1">
                    <span className="font-medium">🏦 Préparation retraite</span>
                    <span className="block text-xs text-muted-foreground">Épargne long-terme (15+ ans)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="wealth-building" id="wealth-building" />
                  <Label htmlFor="wealth-building" className="font-normal cursor-pointer flex-1">
                    <span className="font-medium">📈 Construire patrimoine</span>
                    <span className="block text-xs text-muted-foreground">Investir régulièrement pour grandir</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="active-trading" id="active-trading" />
                  <Label htmlFor="active-trading" className="font-normal cursor-pointer flex-1">
                    <span className="font-medium">⚡ Trading actif</span>
                    <span className="block text-xs text-muted-foreground">Acheter/vendre fréquemment</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="savings" id="savings" />
                  <Label htmlFor="savings" className="font-normal cursor-pointer flex-1">
                    <span className="font-medium">💰 Épargne moyen-terme</span>
                    <span className="block text-xs text-muted-foreground">Projet dans 3-10 ans (maison, etc.)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Income Level */}
            <div className="space-y-3">
              <Label className="text-base">Niveau de revenus annuels (approximatif)</Label>
              <RadioGroup
                value={personalInputs.incomeLevel}
                onValueChange={(val) => setPersonalInputs({ ...personalInputs, incomeLevel: val as PersonalInputs['incomeLevel'] })}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="low" id="income-low" />
                  <Label htmlFor="income-low" className="font-normal cursor-pointer text-sm">
                    &lt; $50K
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="moderate" id="income-moderate" />
                  <Label htmlFor="income-moderate" className="font-normal cursor-pointer text-sm">
                    $50K - $150K
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="high" id="income-high" />
                  <Label htmlFor="income-high" className="font-normal cursor-pointer text-sm">
                    &gt; $150K
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Country */}
            <div className="space-y-3">
              <Label className="text-base">Résidence fiscale</Label>
              <RadioGroup
                value={personalInputs.country}
                onValueChange={(val) => setPersonalInputs({ ...personalInputs, country: val as PersonalInputs['country'] })}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="usa" id="country-usa" />
                  <Label htmlFor="country-usa" className="font-normal cursor-pointer text-sm">
                    🇺🇸 États-Unis
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="other" id="country-other" />
                  <Label htmlFor="country-other" className="font-normal cursor-pointer text-sm">
                    🌍 Autre pays
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={() => setStep(2)} className="w-full" size="lg">
              Continuer
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Trading Preferences */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tes préférences de trading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Budget */}
            <div className="space-y-3">
              <Label className="text-base">Budget de départ: <span className="font-bold text-primary">${tradingInputs.budget}</span></Label>
              <Slider
                value={[tradingInputs.budget]}
                onValueChange={(val) => setTradingInputs({ ...tradingInputs, budget: val[0] })}
                min={10}
                max={5000}
                step={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Combien peux-tu investir pour commencer?
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <Label className="text-base">Ton niveau</Label>
              <RadioGroup
                value={tradingInputs.experience}
                onValueChange={(val) => setTradingInputs({ ...tradingInputs, experience: val as TradingInputs['experience'] })}
                className="grid gap-2"
              >
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="font-normal cursor-pointer flex-1">
                    🌱 Débutant - Je commence tout juste
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="font-normal cursor-pointer flex-1">
                    📈 Intermédiaire - J'ai pratiqué sur simulateur
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="font-normal cursor-pointer flex-1">
                    🚀 Avancé - Je veux outils professionnels
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Trading Frequency */}
            <div className="space-y-3">
              <Label className="text-base">Fréquence de trading prévue</Label>
              <RadioGroup
                value={tradingInputs.tradingFrequency}
                onValueChange={(val) => setTradingInputs({ ...tradingInputs, tradingFrequency: val as TradingInputs['tradingFrequency'] })}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="rare" id="rare" />
                  <Label htmlFor="rare" className="font-normal cursor-pointer text-sm">
                    Rare (quelques/an)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="font-normal cursor-pointer text-sm">
                    Mensuel (1-5/mois)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="font-normal cursor-pointer text-sm">
                    Hebdo (5-20/mois)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="font-normal cursor-pointer text-sm">
                    Quotidien (20+/mois)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Priorities */}
            <div className="space-y-3">
              <Label className="text-base">Tes priorités (sélectionne 2-3)</Label>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map(opt => (
                  <Button
                    key={opt.id}
                    variant={tradingInputs.priorities.includes(opt.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      const newPriorities = tradingInputs.priorities.includes(opt.id)
                        ? tradingInputs.priorities.filter(p => p !== opt.id)
                        : [...tradingInputs.priorities, opt.id];
                      setTradingInputs({ ...tradingInputs, priorities: newPriorities });
                    }}
                    className="gap-1.5"
                  >
                    {tradingInputs.priorities.includes(opt.id) && <Check className="h-3.5 w-3.5" />}
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Retour
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Voir Mes Résultats
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Account Recommendation */}
          <Card className="border-primary ring-2 ring-primary/20 overflow-hidden">
            <div className="bg-primary/10 px-6 py-3 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Type de compte recommandé</span>
              </div>
            </div>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{accountRecommendation.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{accountRecommendation.name}</h3>
                  <p className="text-muted-foreground mt-1">{accountRecommendation.reason}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">💰 Avantage fiscal</p>
                  <p className="text-sm">{accountRecommendation.taxBenefit}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">🎯 Idéal pour</p>
                  <p className="text-sm">{accountRecommendation.bestFor}</p>
                </div>
              </div>
              
              {accountRecommendation.warning && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                  <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">{accountRecommendation.warning}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Broker Recommendations */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Tes Meilleurs Courtiers
            </h3>
            <p className="text-muted-foreground">
              Filtrés pour supporter ton type de compte recommandé
            </p>
            
            {recommendations.map((rec, index) => (
              <Card 
                key={rec.broker.id} 
                className={cn(
                  "transition-all",
                  index === 0 && 'border-primary ring-2 ring-primary/20'
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {index === 0 && (
                        <Badge className="bg-primary shrink-0">
                          🏆 Meilleur Match
                        </Badge>
                      )}
                      <div className="h-10 w-24 shrink-0">
                        <img 
                          src={rec.broker.logo} 
                          alt={rec.broker.name}
                          className="h-full w-full object-contain object-left"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-lg font-bold">${rec.broker.name}</span>`;
                            }
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-lg truncate">{rec.broker.name}</CardTitle>
                        <p className="text-sm text-muted-foreground truncate">
                          {rec.broker.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className={cn(
                        "flex items-center justify-center h-12 w-12 rounded-full text-xl font-bold",
                        index === 0 && "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
                        index === 1 && "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                        index === 2 && "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      )}>
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Reasons */}
                  <div>
                    <Label className="text-sm font-semibold">Pourquoi ce choix:</Label>
                    <ul className="mt-2 space-y-1">
                      {rec.reasons.map((reason, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          {reason.startsWith('⚠️') ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                          ) : (
                            <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          )}
                          <span>{reason.replace('⚠️ ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Dépôt minimum</p>
                      <p className="font-semibold">
                        {rec.broker.minDeposit === 0 ? 'Aucun' : `$${rec.broker.minDeposit}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Facilité</p>
                      {renderStars(rec.broker.easeOfUse)}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Commissions</p>
                      <p className="font-semibold text-emerald-600">{rec.broker.commission.split(' ')[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">App mobile</p>
                      {renderStars(rec.broker.mobileApp)}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={rec.broker.url} target="_blank" rel="noopener noreferrer">
                      Visiter {rec.broker.name}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" onClick={() => setStep(1)} className="w-full">
            Recommencer le questionnaire
          </Button>
        </div>
      )}
    </div>
  );
}
