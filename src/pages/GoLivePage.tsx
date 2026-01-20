import { useState } from 'react';
import { 
  Sparkles, TrendingUp, Shield, Target, Briefcase, GraduationCap,
  Home, Wallet, ChevronRight, Check, Zap, PiggyBank, Rocket,
  Scale, CreditCard, BookOpen, User, Building2, CheckCircle2, CheckCircle,
  Info, ArrowRight, ExternalLink, AlertCircle, Clock, DollarSign,
  BarChart3, PlayCircle, Play, Award, AlertTriangle, Star, CheckSquare, XCircle
} from 'lucide-react';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Card, CardContent } from '@/components/ui/card';

type Section = 'home' | 'quiz' | 'readiness' | 'guide' | 'account-types' | 'compare-brokers' | 'compare-accounts' | 'comparator' | 'open-account';
type QuizStep = 'experience' | 'frequency' | 'capital' | 'objective' | 'assets' | 'fees' | 'support' | 'platform' | 'research' | 'features' | 'horizon' | 'risk' | 'results';

interface QuizProfile {
  experience: string | null;
  frequency: string | null;
  capital: string | null;
  objective: string | null;
  assets: string[] | null;
  fees: string | null;
  support: string | null;
  platform: string | null;
  research: string | null;
  features: string[] | null;
  horizon: string | null;
  risk: string | null;
}

interface Broker {
  name: string;
  logo: string;
  tagline: string;
  score: number;
  url: string;
  pros: string[];
  cons: string[];
  fees: {
    stocks: string;
    etfs: string;
    forex: string;
    options: string;
  };
  platforms: string[];
  accountTypes: string[];
  minDeposit: string;
  bestFor: string;
  support: string;
  features: string[];
}

export default function GoLivePage() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [quizStep, setQuizStep] = useState<QuizStep>('experience');
  const [quizProfile, setQuizProfile] = useState<QuizProfile>({
    experience: null,
    frequency: null,
    capital: null,
    objective: null,
    assets: null,
    fees: null,
    support: null,
    platform: null,
    research: null,
    features: null,
    horizon: null,
    risk: null
  });
  const [readinessAnswers, setReadinessAnswers] = useState<Record<string, boolean>>({});

  // COMPLETE BROKER DATABASE - 10 Major US Brokers (2025-2026)
  const brokers: Broker[] = [
    {
      name: 'Interactive Brokers',
      logo: '🏆',
      tagline: 'Broker professionnel / traders actifs',
      score: 0,
      url: 'https://www.interactivebrokers.com',
      pros: ['Accès 150+ marchés mondiaux', 'Taux de marge excellents (2.83-6.83%)', 'Outils professionnels avancés (TWS)', 'Exécution ultra-rapide', 'Trading futures, forex, options internationales'],
      cons: ['Interface complexe pour débutants', 'Courbe d\'apprentissage élevée', 'Support client limité'],
      fees: {
        stocks: '$0 (IBKR Lite) ou $0.005/action min $1 (Pro)',
        etfs: '$0 (Lite) ou $0.005/action min $1 (Pro)',
        forex: '0.2 pips',
        options: '$0.65/contrat (Lite) ou $0.25-0.65/contrat (Pro)'
      },
      platforms: ['Desktop (TWS)', 'Web', 'Mobile (IBKR)', 'API'],
      accountTypes: ['Individual', 'IRA', 'Joint', 'Margin', 'Corporate'],
      minDeposit: '$0 (mais $10,000 recommandé)',
      bestFor: 'Traders actifs, day traders, investisseurs internationaux, professionnels',
      support: 'Phone, email, chat',
      features: ['Global markets', 'Advanced orders', 'Portfolio Analyst', 'Risk Navigator', 'Low margin rates']
    },
    {
      name: 'Fidelity',
      logo: '💎',
      tagline: 'Broker complet / tous niveaux',
      score: 0,
      url: 'https://www.fidelity.com',
      pros: ['Service client #1 (J.D. Power 2024)', 'Recherche exceptionnelle et outils gratuits', 'Fractional shares dès $1', '4 fonds indiciels ZERO avec 0% expense ratio', 'Excellent pour débutants ET experts', 'Application mobile excellente'],
      cons: ['Pas de trading de futures', 'Interface moins moderne que certains concurrents'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'N/A',
        options: '$0.65/contrat'
      },
      platforms: ['Web', 'Mobile (iOS/Android)', 'Desktop (Active Trader Pro)'],
      accountTypes: ['Individual', 'IRA', 'Joint', 'Trust', 'Custodial'],
      minDeposit: '$0',
      bestFor: 'Débutants, investisseurs long-terme, planification retraite, épargnants IRA',
      support: 'Phone 24/7, email, chat, in-person',
      features: ['Fractional shares', 'Zero expense ratio funds', 'Research tools', 'Retirement planning', 'Tax-loss harvesting']
    },
    {
      name: 'Charles Schwab',
      logo: '📈',
      tagline: 'Broker complet / tous niveaux',
      score: 0,
      url: 'https://www.schwab.com',
      pros: ['Platform thinkorswim (acquise de TD Ameritrade) - une des meilleures', 'Support client 24/7 exceptionnel', 'Recherche de qualité supérieure', 'Large gamme de comptes de retraite', 'Trading de futures disponible', 'Succursales physiques pour support en personne'],
      cons: ['Taux de marge plus élevés qu\'Interactive Brokers (~10%)', 'Certains frais pour fonds internationaux ($74.95)'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'N/A',
        options: '$0.65/contrat'
      },
      platforms: ['thinkorswim (Desktop)', 'Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual', 'IRA', 'Joint', 'Trust', 'Custodial'],
      minDeposit: '$0',
      bestFor: 'Investisseurs long-terme, retraite, débutants à avancés, ceux qui veulent support personnalisé',
      support: 'Phone 24/7, email, chat, in-person branches',
      features: ['thinkorswim platform', 'Research tools', 'Retirement planning', 'Futures trading', 'Education']
    },
    {
      name: 'Robinhood',
      logo: '🚀',
      tagline: 'Broker mobile-first / débutants',
      score: 0,
      url: 'https://robinhood.com',
      pros: ['Interface la plus simple et intuitive', 'Parfait pour débutants absolus', 'Trading 24/5 (extended hours)', 'Fractional shares dès $1', 'IRA match 3% avec Gold', 'Application mobile primée'],
      cons: ['Pas de fonds mutuels', 'Outils de recherche limités (sauf Gold)', 'Pas d\'access desktop complet', 'Support client limité'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'N/A',
        options: '$0'
      },
      platforms: ['Mobile (iOS/Android)', 'Web'],
      accountTypes: ['Individual', 'IRA', 'Joint'],
      minDeposit: '$0',
      bestFor: 'Débutants complets, jeunes investisseurs, trading mobile, investissement casual',
      support: 'Email, in-app chat',
      features: ['Fractional shares', 'Crypto (22 coins)', 'Extended hours', 'IRA match (Gold)', 'Simple UI']
    },
    {
      name: 'Webull',
      logo: '📊',
      tagline: 'Broker mobile-first / traders intermédiaires',
      score: 0,
      url: 'https://www.webull.com',
      pros: ['Outils techniques avancés gratuits', 'Paper trading (compte virtuel pour pratiquer)', 'Extended hours trading', 'Level 2 market data', 'Desktop + mobile apps', 'Meilleur que Robinhood pour traders actifs'],
      cons: ['Pas de fonds mutuels', 'Support client faible', 'Moins de contenu éducatif'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'Spread variable',
        options: '$0'
      },
      platforms: ['Desktop', 'Mobile (iOS/Android)', 'Web'],
      accountTypes: ['Individual', 'IRA', 'Joint'],
      minDeposit: '$0',
      bestFor: 'Traders intermédiaires, day traders débutants, ceux qui veulent outils gratuits',
      support: 'Email, in-app chat',
      features: ['Paper trading', 'Advanced charts', 'Level 2 data', 'Crypto (50+ coins)', 'Extended hours', 'Forex']
    },
    {
      name: 'E*TRADE',
      logo: '💼',
      tagline: 'Broker complet / tous niveaux',
      score: 0,
      url: 'https://www.etrade.com',
      pros: ['Plateforme Power E*TRADE excellente', 'Support 24/7 (phone, email, chat)', 'Large gamme d\'actifs', 'Bon pour traders actifs', 'Recherche complète'],
      cons: ['Interface peut être écrasante pour débutants', 'Pas aussi innovant que concurrents récents'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'Spread variable',
        options: '$0.65/contrat ($0.50 pour 30+ trades/trimestre)'
      },
      platforms: ['Power E*TRADE (Desktop)', 'Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual', 'IRA', 'Joint', 'Trust', 'Custodial'],
      minDeposit: '$0',
      bestFor: 'Traders actifs, investisseurs diversifiés, ceux qui veulent tout en un',
      support: 'Phone 24/7, email, chat',
      features: ['Power E*TRADE platform', 'Futures trading', 'Forex', 'Bonds', 'Research tools']
    },
    {
      name: 'Ally Invest',
      logo: '🏦',
      tagline: 'Broker économique / extension d\'Ally Bank',
      score: 0,
      url: 'https://www.ally.com/invest',
      pros: ['Commission options la plus basse ($0.50)', 'Excellent si vous avez déjà Ally Bank', 'Interface simple', 'Robo-advisor disponible (Ally Invest Portfolios)'],
      cons: ['Outils moins avancés', 'Pas de trading de futures', 'Recherche limitée'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'Spread variable',
        options: '$0.50/contrat (le plus bas!)'
      },
      platforms: ['Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual', 'IRA', 'Joint'],
      minDeposit: '$0',
      bestFor: 'Clients Ally Bank, investisseurs économes, traders d\'options',
      support: 'Phone, email, chat',
      features: ['Low option fees', 'Robo-advisor', 'Forex', 'Simple interface']
    },
    {
      name: 'eToro',
      logo: '👥',
      tagline: 'Broker social trading / débutants',
      score: 0,
      url: 'https://www.etoro.com',
      pros: ['Social trading (copier d\'autres traders)', 'Interface très simple', 'Bon pour débutants', 'Crypto trading intégré', 'Communauté active'],
      cons: ['Sélection limitée d\'actions US', 'Pas de fonds mutuels', 'Frais de retrait ($5)'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'Spread',
        options: 'N/A'
      },
      platforms: ['Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual'],
      minDeposit: '$10 (minimum trade)',
      bestFor: 'Débutants qui veulent copier des pros, social traders, investisseurs crypto',
      support: 'Email, chat',
      features: ['Copy trading', 'Social feed', 'Crypto trading', 'Simple UI']
    },
    {
      name: 'Firstrade',
      logo: '💵',
      tagline: 'Broker économique',
      score: 0,
      url: 'https://www.firstrade.com',
      pros: ['Options trading GRATUIT', 'Interface simple', 'Bon pour buy-and-hold'],
      cons: ['Outils basiques', 'Pas de futures trading', 'Moins connu'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'N/A',
        options: '$0 (rare!)'
      },
      platforms: ['Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual', 'IRA', 'Joint'],
      minDeposit: '$0',
      bestFor: 'Investisseurs économes, traders d\'options débutants',
      support: 'Phone, email, chat',
      features: ['Free options', 'Fractional shares ($5+)', 'Simple interface']
    },
    {
      name: 'TradeStation',
      logo: '⚡',
      tagline: 'Broker pour traders actifs',
      score: 0,
      url: 'https://www.tradestation.com',
      pros: ['Excellent pour day trading', 'Outils ultra-avancés', 'Backtesting et stratégies automatisées', 'Crypto disponible'],
      cons: ['Courbe d\'apprentissage élevée', 'Interface complexe', 'Pas pour débutants'],
      fees: {
        stocks: '$0',
        etfs: '$0',
        forex: 'N/A',
        options: '$0.60/contrat'
      },
      platforms: ['Desktop (TradeStation)', 'Web', 'Mobile (iOS/Android)'],
      accountTypes: ['Individual', 'IRA', 'Joint'],
      minDeposit: '$0',
      bestFor: 'Day traders actifs, traders algorithmiques, programmeurs',
      support: 'Phone, email, chat',
      features: ['Advanced backtesting', 'Automated strategies', 'Crypto', 'Futures ($0.50-$1.50/contrat)']
    },
  ];

  // ACCOUNT TYPES
  const accountTypes = [
    {
      id: 'tfsa',
      icon: '🛡️',
      name: 'CELI (TFSA)',
      desc: 'Compte d\'épargne libre d\'impôt',
      taxInfo: 'Gains et retraits 100% libres d\'impôt',
      contribution: '2024: $7,000, Limite à vie cumulative',
      bestFor: 'Épargne flexible, tous objectifs',
      withdrawal: 'Anytime, sans pénalité',
      pros: ['Tax-free growth', 'Flexible withdrawals', 'Pour tous les objectifs'],
      cons: ['Contribution limits', 'Overcontribution penalties']
    },
    {
      id: 'rrsp',
      icon: '🐷',
      name: 'REER (RRSP)',
      desc: 'Régime enregistré d\'épargne-retraite',
      taxInfo: 'Cotisations déductibles, impôt au retrait',
      contribution: '18% du revenu, max $31,560 (2024)',
      bestFor: 'Retraite, réduction d\'impôt maintenant',
      withdrawal: 'Pénalités avant retraite (sauf HBP/LLP)',
      pros: ['Tax deduction', 'Tax-deferred growth', 'Lower retirement tax'],
      cons: ['Locked until retirement', 'Taxed on withdrawal', 'Mandatory RRIF at 71']
    },
    {
      id: 'personal',
      icon: '💳',
      name: 'Compte Personnel (Non-enregistré)',
      desc: 'Compte imposable standard',
      taxInfo: 'Gains en capital imposés à 50%, dividendes avec crédit',
      contribution: 'Illimité',
      bestFor: 'Après avoir maximisé TFSA/RRSP',
      withdrawal: 'Anytime',
      pros: ['No limits', 'Flexible', 'Tax advantages on capital gains'],
      cons: ['Taxable', 'Need to track ACB', 'More complex tax reporting']
    },
    {
      id: 'resp',
      icon: '🎓',
      name: 'REEE (RESP)',
      desc: 'Régime enregistré d\'épargne-études',
      taxInfo: 'Subventions + croissance imposables au retrait',
      contribution: '$50,000 lifetime, CESG 20% match jusqu\'à $500/an',
      bestFor: 'Épargner pour études enfants',
      withdrawal: 'Pour études seulement',
      pros: ['Government grants (CESG)', 'Tax-deferred growth', 'Family plan option'],
      cons: ['Education only', 'Penalties if not used', 'Complex rules']
    },
    {
      id: 'margin',
      icon: '📈',
      name: 'Compte sur Marge',
      desc: 'Trading avec effet de levier',
      taxInfo: 'Gains imposables, intérêts déductibles',
      contribution: 'Selon marge disponible (2:1 typical)',
      bestFor: 'Traders expérimentés seulement',
      withdrawal: 'Subject to margin requirements',
      pros: ['Leverage', 'Short selling', 'More buying power'],
      cons: ['High risk', 'Interest costs', 'Margin calls', 'Can lose more than invested']
    },
    {
      id: 'corporate',
      icon: '🏢',
      name: 'Compte Corporatif',
      desc: 'Pour entreprises et sociétés',
      taxInfo: 'Imposition au taux corporatif, dividendes imposables',
      contribution: 'Selon structure',
      bestFor: 'Entrepreneurs, propriétaires d\'entreprise',
      withdrawal: 'Selon structure',
      pros: ['Corporate tax rate', 'Asset protection', 'Business integration'],
      cons: ['Complex accounting', 'Higher fees', 'Legal requirements']
    }
  ];

  // QUIZ QUESTIONS - 12 Questions avec système de scoring avancé
  const quizQuestions = {
    experience: {
      title: 'Niveau d\'Expérience',
      subtitle: 'Quel est votre niveau d\'expérience en trading/investissement?',
      options: [
        { id: 'complete_beginner', label: 'Débutant complet', emoji: '🌱', desc: 'Jamais investi' },
        { id: 'beginner', label: 'Débutant', emoji: '📚', desc: 'Quelques trades, comprends les bases' },
        { id: 'intermediate', label: 'Intermédiaire', emoji: '📈', desc: '1-3 ans d\'expérience' },
        { id: 'advanced', label: 'Avancé', emoji: '🎯', desc: '3+ ans, trading actif' },
        { id: 'professional', label: 'Professionnel', emoji: '🏆', desc: 'Trading quotidien, stratégies complexes' }
      ]
    },
    frequency: {
      title: 'Fréquence de Trading',
      subtitle: 'À quelle fréquence prévoyez-vous trader?',
      options: [
        { id: 'rarely', label: 'Rarement', emoji: '🐢', desc: 'Quelques fois par an - buy & hold' },
        { id: 'occasional', label: 'Occasionnellement', emoji: '📅', desc: '1-5 trades/mois' },
        { id: 'regular', label: 'Régulièrement', emoji: '⚡', desc: 'Plusieurs trades/semaine' },
        { id: 'very_active', label: 'Très actif', emoji: '🔥', desc: 'Trades quotidiens - day trading' },
        { id: 'ultra_active', label: 'Ultra-actif', emoji: '💥', desc: 'Multiples trades par jour' }
      ]
    },
    capital: {
      title: 'Capital Initial',
      subtitle: 'Combien prévoyez-vous investir initialement?',
      options: [
        { id: 'less_100', label: 'Moins de $100', emoji: '💰', desc: 'Petit budget' },
        { id: '100_1000', label: '$100 - $1,000', emoji: '💵', desc: 'Budget modeste' },
        { id: '1000_5000', label: '$1,000 - $5,000', emoji: '💸', desc: 'Capital moyen' },
        { id: '5000_25000', label: '$5,000 - $25,000', emoji: '💎', desc: 'Capital substantiel' },
        { id: 'over_25000', label: 'Plus de $25,000', emoji: '👑', desc: 'Gros capital' }
      ]
    },
    objective: {
      title: 'Objectif Principal',
      subtitle: 'Quel est votre objectif principal?',
      options: [
        { id: 'retirement', label: 'Épargne retraite', emoji: '🏦', desc: 'IRA, long-terme' },
        { id: 'long_term_growth', label: 'Croissance long-terme', emoji: '📊', desc: '5+ ans' },
        { id: 'passive_income', label: 'Revenus passifs', emoji: '💵', desc: 'Dividendes' },
        { id: 'active_trading', label: 'Trading actif', emoji: '⚡', desc: 'Profits court-terme' },
        { id: 'learning', label: 'Apprentissage', emoji: '🎓', desc: 'Expérimentation' }
      ]
    },
    assets: {
      title: 'Types d\'Actifs',
      subtitle: 'Quels types d\'actifs voulez-vous trader? (Sélection multiple)',
      options: [
        { id: 'stocks_only', label: 'Actions seulement', emoji: '📈', desc: 'Actions individuelles' },
        { id: 'stocks_etfs', label: 'Actions + ETFs', emoji: '📊', desc: 'Actions et fonds indiciels' },
        { id: 'options', label: 'Options', emoji: '⚙️', desc: 'Options trading' },
        { id: 'crypto', label: 'Crypto', emoji: '₿', desc: 'Cryptomonnaies' },
        { id: 'forex', label: 'Forex', emoji: '💱', desc: 'Devises' },
        { id: 'futures', label: 'Futures', emoji: '📉', desc: 'Contrats à terme' },
        { id: 'mutual_funds', label: 'Fonds mutuels', emoji: '🏛️', desc: 'Fonds communs' },
        { id: 'everything', label: 'Tout ce qui est disponible', emoji: '🌐', desc: 'Maximum de choix' }
      ],
      multiple: true
    },
    fees: {
      title: 'Budget pour Frais',
      subtitle: 'Quel est votre budget mensuel pour frais de trading?',
      options: [
        { id: 'free_only', label: '$0 absolument gratuit', emoji: '🆓', desc: 'Pas de frais acceptables' },
        { id: 'up_to_5', label: 'Jusqu\'à $5/mois', emoji: '💵', desc: 'Budget minimal' },
        { id: 'up_to_10', label: 'Jusqu\'à $10/mois', emoji: '💸', desc: 'Budget modéré' },
        { id: 'no_limit', label: 'Peu importe si meilleurs outils', emoji: '💎', desc: 'Qualité avant tout' },
        { id: 'lowest_fees', label: 'Frais les plus bas possibles', emoji: '💰', desc: 'Optimisation coûts' }
      ]
    },
    support: {
      title: 'Importance du Support Client',
      subtitle: 'À quel point le support client est important pour vous?',
      options: [
        { id: 'essential', label: 'Essentiel', emoji: '📞', desc: 'Support 24/7 nécessaire' },
        { id: 'important', label: 'Important', emoji: '💬', desc: 'Disponible heures ouvrables' },
        { id: 'moderate', label: 'Modéré', emoji: '📧', desc: 'Email/chat suffisant' },
        { id: 'not_important', label: 'Pas important', emoji: '🔧', desc: 'Je suis autonome' },
        { id: 'community', label: 'Communauté/forums', emoji: '👥', desc: 'Préfère communauté' }
      ]
    },
    platform: {
      title: 'Préférence de Plateforme',
      subtitle: 'Comment préférez-vous trader?',
      options: [
        { id: 'mobile_only', label: 'Mobile seulement', emoji: '📱', desc: 'Smartphone uniquement' },
        { id: 'mobile_web', label: 'Principalement mobile', emoji: '📱💻', desc: 'Mobile avec accès web' },
        { id: 'both', label: '50/50 mobile et desktop', emoji: '⚖️', desc: 'Équilibre' },
        { id: 'desktop', label: 'Principalement desktop', emoji: '💻', desc: 'Ordinateur principal' },
        { id: 'professional_desktop', label: 'Desktop professionnel', emoji: '🖥️', desc: 'Multiples écrans' }
      ]
    },
    research: {
      title: 'Importance de la Recherche',
      subtitle: 'Combien valorisez-vous les outils de recherche?',
      options: [
        { id: 'essential_research', label: 'Essentiel', emoji: '🔬', desc: 'Recherche professionnelle' },
        { id: 'important_research', label: 'Important', emoji: '📊', desc: 'Analyses de base nécessaires' },
        { id: 'moderate_research', label: 'Modéré', emoji: '📈', desc: 'Quelques outils suffisent' },
        { id: 'not_important_research', label: 'Pas important', emoji: '🔍', desc: 'Mes propres recherches' },
        { id: 'copy_trading', label: 'Copier d\'autres traders', emoji: '👥', desc: 'Social trading' }
      ]
    },
    features: {
      title: 'Fonctionnalités Spéciales',
      subtitle: 'Quelles fonctionnalités sont importantes? (Sélection multiple)',
      options: [
        { id: 'fractional_shares', label: 'Fractional shares', emoji: '🧩', desc: 'Acheter moins d\'1 action' },
        { id: 'paper_trading', label: 'Paper trading', emoji: '📝', desc: 'Compte virtuel' },
        { id: 'low_margin', label: 'Taux de marge bas', emoji: '💳', desc: 'Margin rates compétitifs' },
        { id: 'ira_match', label: 'IRA match program', emoji: '🎁', desc: 'Contribution employeur' },
        { id: 'international', label: 'Marchés internationaux', emoji: '🌍', desc: 'Accès global' },
        { id: 'automated', label: 'Trading automatisé', emoji: '🤖', desc: 'Algorithmes/stratégies' },
        { id: 'education', label: 'Formation/éducation', emoji: '🎓', desc: 'Contenu éducatif' },
        { id: 'social', label: 'Communauté sociale', emoji: '👥', desc: 'Social trading' }
      ],
      multiple: true
    },
    horizon: {
      title: 'Horizon Temporel',
      subtitle: 'Quel est votre horizon d\'investissement?',
      options: [
        { id: 'short_term', label: 'Court terme', emoji: '⚡', desc: 'Moins d\'1 an' },
        { id: 'medium_term', label: 'Moyen terme', emoji: '📅', desc: '1-5 ans' },
        { id: 'long_term', label: 'Long terme', emoji: '📊', desc: '5-10 ans' },
        { id: 'very_long_term', label: 'Très long terme', emoji: '🏦', desc: '10+ ans / retraite' },
        { id: 'mix', label: 'Mix de tous', emoji: '🎯', desc: 'Stratégie diversifiée' }
      ]
    },
    risk: {
      title: 'Tolérance au Risque',
      subtitle: 'Quelle est votre tolérance au risque?',
      options: [
        { id: 'very_conservative', label: 'Très conservateur', emoji: '🛡️', desc: 'Préservation capital' },
        { id: 'conservative', label: 'Conservateur', emoji: '📈', desc: 'Croissance lente et stable' },
        { id: 'moderate', label: 'Modéré', emoji: '⚖️', desc: 'Équilibre risque/rendement' },
        { id: 'aggressive', label: 'Agressif', emoji: '🚀', desc: 'Recherche hauts rendements' },
        { id: 'very_aggressive', label: 'Très agressif', emoji: '💥', desc: 'Day trading, options, leverage' }
      ]
    }
  };

  // READINESS QUESTIONS
  const readinessQuestions = [
    { id: 'emergency-fund', category: 'Finances', question: 'J\'ai un fonds d\'urgence de 3-6 mois', weight: 10, explanation: 'Essentiel avant investir' },
    { id: 'no-debt', category: 'Finances', question: 'Pas de dettes >8% intérêt', weight: 10, explanation: 'Priorité rembourser dettes' },
    { id: 'basics', category: 'Connaissances', question: 'Je comprends actions, ETFs, diversification', weight: 8, explanation: 'Base minimale' },
    { id: 'risk', category: 'Psychologie', question: 'Je peux voir -20% sans paniquer', weight: 9, explanation: 'Volatilité normale' },
    { id: 'longterm', category: 'Stratégie', question: 'J\'investis pour 5+ ans', weight: 7, explanation: 'Court-terme trop volatile' },
    { id: 'no-need', category: 'Finances', question: 'Pas besoin argent 3+ ans', weight: 8, explanation: 'Argent "oubliable"' },
    { id: 'research', category: 'Connaissances', question: 'Je sais rechercher entreprise/ETF', weight: 6, explanation: 'Due diligence' },
    { id: 'fees', category: 'Connaissances', question: 'Je comprends MER et frais', weight: 6, explanation: 'Impact long-terme' },
    { id: 'tax', category: 'Connaissances', question: 'Je comprends TFSA vs RRSP vs imposable', weight: 7, explanation: 'Optimisation fiscale' },
    { id: 'emotions', category: 'Psychologie', question: 'Je ne check pas portefeuille quotidiennement', weight: 5, explanation: 'Éviter décisions émotionnelles' }
  ];

  // FIRST TRADE STEPS
  const firstTradeSteps = [
    { step: 1, title: 'Ouvre et vérifie ton compte', duration: '1-3 jours', tasks: ['Choisis broker', 'Remplis formulaire', 'Pièces d\'identité', 'Attends approbation'], tips: ['Prépare documents', 'Adresse permanente'] },
    { step: 2, title: 'Dépose ton premier montant', duration: '1-5 jours', tasks: ['Va dans Dépôt', 'Choisis EFT', 'Entre montant', 'Attends confirmation'], tips: ['EFT = plus rapide', 'Commence petit'] },
    { step: 3, title: 'Fais tes recherches', duration: '2-7 jours', tasks: ['Actions ou ETF?', 'Regarde XEQT/VGRO', 'Vérifie ticker', 'Prix historique'], tips: ['Débutant = ETF', 'Évite penny stocks'] },
    { step: 4, title: 'Place ton premier ordre', duration: '5-10 min', tasks: ['Clique Trade', 'Entre ticker', 'Market ou Limit', 'Révise total', 'Confirme'], tips: ['Market = immédiat', 'Limite = prix max'] },
    { step: 5, title: 'Confirme et surveille', duration: '1 min - 1 jour', tasks: ['Attends exécution', 'Vérifie portefeuille', 'Screenshot', 'Relaxe!'], tips: ['9:30-16:00 EST', 'Pense long-terme'] }
  ];

  // SCORING MATRIX - Système de scoring avancé
  const scoringMatrix: Record<string, Record<string, Array<{broker: string, points: number}>>> = {
    experience: {
      'complete_beginner': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'eToro', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      'beginner': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'Ally Invest', points: 8 }
      ],
      'intermediate': [
        { broker: 'Webull', points: 10 },
        { broker: 'E*TRADE', points: 9 },
        { broker: 'Charles Schwab', points: 8 }
      ],
      'advanced': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'professional': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 }
      ]
    },
    frequency: {
      'rarely': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'Ally Invest', points: 8 }
      ],
      'occasional': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'regular': [
        { broker: 'Webull', points: 10 },
        { broker: 'E*TRADE', points: 9 },
        { broker: 'Interactive Brokers', points: 8 }
      ],
      'very_active': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 },
        { broker: 'Webull', points: 8 }
      ],
      'ultra_active': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 }
      ]
    },
    capital: {
      'less_100': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      '100_1000': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'Webull', points: 8 }
      ],
      '1000_5000': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      '5000_25000': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'over_25000': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'Charles Schwab', points: 9 }
      ]
    },
    objective: {
      'retirement': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'long_term_growth': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'passive_income': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'Ally Invest', points: 8 }
      ],
      'active_trading': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 },
        { broker: 'Webull', points: 8 }
      ],
      'learning': [
        { broker: 'Webull', points: 10 },
        { broker: 'eToro', points: 9 },
        { broker: 'Robinhood', points: 8 }
      ]
    },
    fees: {
      'free_only': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      'up_to_5': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      'up_to_10': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'no_limit': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 }
      ],
      'lowest_fees': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'Ally Invest', points: 9 }
      ]
    },
    support: {
      'essential': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'E*TRADE', points: 9 }
      ],
      'important': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'moderate': [
        { broker: 'Ally Invest', points: 8 },
        { broker: 'Webull', points: 7 },
        { broker: 'Robinhood', points: 7 }
      ],
      'not_important': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 8 }
      ],
      'community': [
        { broker: 'eToro', points: 10 },
        { broker: 'Webull', points: 8 }
      ]
    },
    platform: {
      'mobile_only': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'eToro', points: 8 }
      ],
      'mobile_web': [
        { broker: 'Robinhood', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      'both': [
        { broker: 'Webull', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ],
      'desktop': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'professional_desktop': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 }
      ]
    },
    research: {
      'essential_research': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Interactive Brokers', points: 9 }
      ],
      'important_research': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'moderate_research': [
        { broker: 'Webull', points: 8 },
        { broker: 'E*TRADE', points: 7 },
        { broker: 'Ally Invest', points: 7 }
      ],
      'not_important_research': [
        { broker: 'Robinhood', points: 8 },
        { broker: 'Webull', points: 7 }
      ],
      'copy_trading': [
        { broker: 'eToro', points: 10 },
        { broker: 'Robinhood', points: 5 }
      ]
    },
    horizon: {
      'short_term': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 9 },
        { broker: 'Webull', points: 8 }
      ],
      'medium_term': [
        { broker: 'E*TRADE', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'Charles Schwab', points: 8 }
      ],
      'long_term': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'very_long_term': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'E*TRADE', points: 9 }
      ],
      'mix': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Interactive Brokers', points: 9 },
        { broker: 'Fidelity', points: 8 }
      ]
    },
    risk: {
      'very_conservative': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'Ally Invest', points: 8 }
      ],
      'conservative': [
        { broker: 'Fidelity', points: 10 },
        { broker: 'Charles Schwab', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'moderate': [
        { broker: 'Charles Schwab', points: 10 },
        { broker: 'Fidelity', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'aggressive': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'Webull', points: 9 },
        { broker: 'E*TRADE', points: 8 }
      ],
      'very_aggressive': [
        { broker: 'Interactive Brokers', points: 10 },
        { broker: 'TradeStation', points: 10 },
        { broker: 'Webull', points: 8 }
      ]
    }
  };

  // Scoring pour assets (multiple selection)
  const getAssetsScoring = (selectedAssets: string[]) => {
    const scores: Array<{broker: string, points: number}> = [];
    
    if (selectedAssets.includes('stocks_only') || selectedAssets.includes('stocks_etfs')) {
      scores.push({ broker: 'Robinhood', points: 10 }, { broker: 'Fidelity', points: 9 }, { broker: 'Charles Schwab', points: 8 });
    }
    if (selectedAssets.includes('options')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'Ally Invest', points: 9 }, { broker: 'E*TRADE', points: 8 });
    }
    if (selectedAssets.includes('crypto')) {
      scores.push({ broker: 'Webull', points: 10 }, { broker: 'Robinhood', points: 8 }, { broker: 'eToro', points: 7 });
    }
    if (selectedAssets.includes('forex')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'Webull', points: 9 }, { broker: 'Ally Invest', points: 5 });
    }
    if (selectedAssets.includes('futures')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'TradeStation', points: 9 }, { broker: 'Charles Schwab', points: 8 });
    }
    if (selectedAssets.includes('mutual_funds')) {
      scores.push({ broker: 'Fidelity', points: 10 }, { broker: 'Charles Schwab', points: 10 }, { broker: 'E*TRADE', points: 8 });
    }
    if (selectedAssets.includes('everything')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'E*TRADE', points: 9 });
    }
    
    return scores;
  };

  // Scoring pour features (multiple selection)
  const getFeaturesScoring = (selectedFeatures: string[]) => {
    const scores: Array<{broker: string, points: number}> = [];
    
    if (selectedFeatures.includes('fractional_shares')) {
      scores.push({ broker: 'Fidelity', points: 10 }, { broker: 'Robinhood', points: 9 }, { broker: 'Charles Schwab', points: 8 });
    }
    if (selectedFeatures.includes('paper_trading')) {
      scores.push({ broker: 'Webull', points: 10 }, { broker: 'Charles Schwab', points: 9 }, { broker: 'TradeStation', points: 8 });
    }
    if (selectedFeatures.includes('low_margin')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'Robinhood', points: 5 });
    }
    if (selectedFeatures.includes('ira_match')) {
      scores.push({ broker: 'Robinhood', points: 10 }, { broker: 'Webull', points: 9 });
    }
    if (selectedFeatures.includes('international')) {
      scores.push({ broker: 'Interactive Brokers', points: 10 }, { broker: 'Charles Schwab', points: 5 });
    }
    if (selectedFeatures.includes('automated')) {
      scores.push({ broker: 'TradeStation', points: 10 }, { broker: 'Interactive Brokers', points: 9 });
    }
    if (selectedFeatures.includes('education')) {
      scores.push({ broker: 'Fidelity', points: 10 }, { broker: 'Charles Schwab', points: 9 }, { broker: 'E*TRADE', points: 8 });
    }
    if (selectedFeatures.includes('social')) {
      scores.push({ broker: 'eToro', points: 10 }, { broker: 'Webull', points: 7 });
    }
    
    return scores;
  };

  // Get personalized reasons for broker recommendation
  const getPersonalizedReasons = (brokerName: string, profile: QuizProfile): string[] => {
    const reasons: string[] = [];
    
    // Experience-based reasons
    if (profile.experience === 'complete_beginner' || profile.experience === 'beginner') {
      if (['Robinhood', 'Fidelity', 'eToro'].includes(brokerName)) {
        reasons.push('Parfait pour votre niveau débutant avec interface simple');
      }
    }
    if (profile.experience === 'advanced' || profile.experience === 'professional') {
      if (['Interactive Brokers', 'TradeStation'].includes(brokerName)) {
        reasons.push('Outils professionnels adaptés à votre niveau avancé');
      }
    }
    
    // Objective-based reasons
    if (profile.objective === 'retirement' || profile.objective === 'long_term_growth') {
      if (['Fidelity', 'Charles Schwab'].includes(brokerName)) {
        reasons.push('Idéal pour objectif retraite long-terme (IRA)');
        reasons.push('Recherche exceptionnelle gratuite');
      }
    }
    if (profile.objective === 'active_trading') {
      if (['Interactive Brokers', 'TradeStation', 'Webull'].includes(brokerName)) {
        reasons.push('Excellente exécution pour trading actif');
      }
    }
    
    // Capital-based reasons
    if (profile.capital === 'less_100' || profile.capital === '100_1000') {
      if (['Robinhood', 'Fidelity', 'Webull'].includes(brokerName)) {
        reasons.push('Fractional shares pour petit budget');
        reasons.push('Pas de minimum de dépôt');
      }
    }
    if (profile.capital === 'over_25000') {
      if (['Interactive Brokers', 'Charles Schwab'].includes(brokerName)) {
        reasons.push('Taux de marge excellents pour gros capital');
        reasons.push('Outils institutionnels');
      }
    }
    
    // Platform-based reasons
    if (profile.platform === 'mobile_only' || profile.platform === 'mobile_web') {
      if (['Robinhood', 'Webull'].includes(brokerName)) {
        reasons.push('Application mobile primée et intuitive');
      }
    }
    if (profile.platform === 'professional_desktop') {
      if (['Interactive Brokers', 'TradeStation'].includes(brokerName)) {
        reasons.push('Plateforme desktop professionnelle avec multiples écrans');
      }
    }
    
    // Support-based reasons
    if (profile.support === 'essential' || profile.support === 'important') {
      if (['Fidelity', 'Charles Schwab'].includes(brokerName)) {
        reasons.push('Service client #1 de l\'industrie');
        reasons.push('Support 24/7 disponible');
      }
    }
    
    // Features-based reasons
    if (Array.isArray(profile.features)) {
      if (profile.features.includes('fractional_shares') && ['Fidelity', 'Robinhood'].includes(brokerName)) {
        reasons.push('Fractional shares dès $1');
      }
      if (profile.features.includes('paper_trading') && brokerName === 'Webull') {
        reasons.push('Paper trading gratuit pour pratiquer');
      }
      if (profile.features.includes('low_margin') && brokerName === 'Interactive Brokers') {
        reasons.push('Taux de marge les plus bas (2.83-6.83%)');
      }
      if (profile.features.includes('international') && brokerName === 'Interactive Brokers') {
        reasons.push('Accès à 150+ marchés mondiaux');
      }
    }
    
    // Default reasons if none found
    if (reasons.length === 0) {
      reasons.push('Excellent match avec votre profil');
      reasons.push('Frais compétitifs');
    }
    
    return reasons.slice(0, 4); // Max 4 reasons
  };

  // CALCULATE RECOMMENDATIONS - Système de scoring avancé
  const calculateRecommendations = () => {
    // Initialize scores
    const brokerScores: Record<string, number> = {};
    brokers.forEach(broker => {
      brokerScores[broker.name] = 0;
    });

    // Apply scoring for each answered question
    Object.entries(quizProfile).forEach(([key, value]) => {
      if (!value) return;

      // Handle multiple selection questions
      if (key === 'assets' && Array.isArray(value)) {
        const scores = getAssetsScoring(value);
        scores.forEach(({ broker, points }) => {
          if (brokerScores.hasOwnProperty(broker)) {
            brokerScores[broker] += points;
          }
        });
      } else if (key === 'features' && Array.isArray(value)) {
        const scores = getFeaturesScoring(value);
        scores.forEach(({ broker, points }) => {
          if (brokerScores.hasOwnProperty(broker)) {
            brokerScores[broker] += points;
          }
        });
      } else if (typeof value === 'string' && scoringMatrix[key]) {
        const scores = scoringMatrix[key][value];
        if (scores) {
          scores.forEach(({ broker, points }) => {
            if (brokerScores.hasOwnProperty(broker)) {
              brokerScores[broker] += points;
            }
          });
        }
      }
    });

    // Convert to array and sort
    const scoredBrokers = brokers.map(broker => ({
      ...broker,
      matchScore: brokerScores[broker.name] || 0
    })).sort((a, b) => b.matchScore - a.matchScore);

    // Get top 3
    const topBrokers = scoredBrokers.slice(0, 3);

    // Calculate percentage scores (max possible is ~120 points for 12 questions)
    const maxPossibleScore = 120;
    const topBrokersWithPercent = topBrokers.map(broker => ({
      ...broker,
      matchScore: Math.min(100, Math.round((broker.matchScore / maxPossibleScore) * 100))
    }));

    return {
      topBrokers: topBrokersWithPercent
    };
  };

  const calculateReadinessScore = () => {
    const totalWeight = readinessQuestions.reduce((sum, q) => sum + q.weight, 0);
    const earnedWeight = readinessQuestions.reduce((sum, q) => 
      readinessAnswers[q.id] ? sum + q.weight : sum, 0
    );
    return Math.round((earnedWeight / totalWeight) * 100);
  };

  const readinessScore = calculateReadinessScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-32">
      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Back Button - Only show when not on home */}
        {activeSection !== 'home' && (
          <div className="mb-4">
            <button
              onClick={() => setActiveSection('home')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Retour au menu
            </button>
          </div>
        )}

        {/* HOME - Magnificent Design */}
        {activeSection === 'home' && (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden pb-20 sm:pb-24 md:pb-32">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-4xl mx-auto">
              {/* Header with sparkle effect */}
              <div className="text-center mb-6 sm:mb-8 md:mb-12 space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight px-2">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Prêt à Trader?
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto px-2">
                  Choisis ton chemin vers le trading réel
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-3 sm:gap-4 md:gap-5">
                {/* Trouvez Votre Broker - Featured */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0s both`
                  }}
                  onClick={() => setActiveSection('quiz')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Featured badge - Above content */}
                    <div className="relative z-10 mb-2 sm:mb-3">
                      <div className="inline-flex px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg">
                        <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">Recommandé</span>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
                      <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform rotate-45 group-hover:rotate-90 transition-transform duration-700 blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform rotate-12 group-hover:rotate-180 transition-transform duration-700 opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                          <Target className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          Trouvez Votre Broker
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          Le compte parfait pour votre profil
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Readiness Check */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0.1s both`
                  }}
                  onClick={() => setActiveSection('readiness')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
                      <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform animate-pulse blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60 transition-all duration-700"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 animate-pulse transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:via-green-500 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          Readiness Check
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          Êtes-vous prêt à trader?
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* First Trade Guide */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0.2s both`
                  }}
                  onClick={() => setActiveSection('guide')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-violet-500/10 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60 transition-all duration-700"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-fuchsia-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          First Trade Guide
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          Votre premier trade étape par étape
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Types de Comptes */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0.25s both`
                  }}
                  onClick={() => setActiveSection('account-types')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60 transition-all duration-700"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <Wallet className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-amber-500 group-hover:to-yellow-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          Types de Comptes
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          CELI, REER, Margin - Choisissez le bon compte
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Les Brokers */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0.3s both`
                  }}
                  onClick={() => setActiveSection('compare-brokers')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60 transition-all duration-700"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <Building2 className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          Les Brokers
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          Les courtiers les plus populaires avec tous les détails
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparateur */}
                <div
                  className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animation: `slideInUp 0.6s ease-out 0.35s both`
                  }}
                  onClick={() => setActiveSection('comparator')}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-white shadow-xl shadow-rose-500/10 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 p-3 sm:p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5">
                      <div className="relative flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 rounded-xl sm:rounded-2xl md:rounded-3xl transform blur-lg opacity-40 group-hover:blur-xl group-hover:opacity-60 transition-all duration-700"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '8px 8px'
                          }}></div>
                          <Scale className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-1.5 sm:pr-2 md:pr-0">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-0.5 sm:mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:via-pink-500 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-500 break-words leading-tight">
                          Comparateur
                        </h3>
                        <p className="text-slate-600 font-medium text-[11px] sm:text-xs md:text-sm leading-snug">
                          Comparez les meilleurs brokers côte à côte
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 flex items-center justify-center transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 sm:mt-8 md:mt-12 text-center px-2">
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Besoin d'aide pour choisir? Commence par <span className="text-blue-600 font-semibold">Trouvez Votre Broker</span>
                </p>
              </div>
            </div>

            <style>{`
              @keyframes slideInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        )}
        
        {/* QUIZ SECTION */}
        {activeSection === 'quiz' && (
          <div className="space-y-6">
            {quizStep !== 'results' ? (
              <>
                {/* Progress bar */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">
                      Question {Object.keys(quizQuestions).indexOf(quizStep) + 1} sur {Object.keys(quizQuestions).length}
                    </span>
                    <span className="text-sm text-blue-600 font-bold">
                      {Math.round(((Object.keys(quizQuestions).indexOf(quizStep) + 1) / Object.keys(quizQuestions).length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((Object.keys(quizQuestions).indexOf(quizStep) + 1) / Object.keys(quizQuestions).length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {quizQuestions[quizStep].title}
                    </h2>
                    <p className="text-gray-600">{quizQuestions[quizStep].subtitle}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {quizQuestions[quizStep].options.map((option: any) => {
                      const isMultiple = (quizQuestions[quizStep] as any).multiple;
                      let isSelected = false;
                      
                      if (isMultiple) {
                        const currentValue = quizProfile[quizStep as keyof QuizProfile];
                        isSelected = Array.isArray(currentValue) && currentValue.includes(option.id);
                      } else {
                        isSelected = quizProfile[quizStep as keyof QuizProfile] === option.id;
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            if (isMultiple) {
                              const currentValue = quizProfile[quizStep as keyof QuizProfile];
                              const currentArray = Array.isArray(currentValue) ? currentValue : [];
                              const newArray = currentArray.includes(option.id)
                                ? currentArray.filter((id: string) => id !== option.id)
                                : [...currentArray, option.id];
                              setQuizProfile({ ...quizProfile, [quizStep]: newArray.length > 0 ? newArray : null });
                            } else {
                              setQuizProfile({ ...quizProfile, [quizStep]: option.id });
                              setTimeout(() => {
                                const steps = Object.keys(quizQuestions) as QuizStep[];
                                const currentIndex = steps.indexOf(quizStep);
                                if (currentIndex < steps.length - 1) {
                                  setQuizStep(steps[currentIndex + 1]);
                                } else {
                                  setQuizStep('results');
                                }
                              }, 300);
                            }
                          }}
                          className={`group p-6 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-xl'
                              : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-4xl group-hover:scale-110 transition-transform">{option.emoji}</span>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1 text-gray-900">{option.label}</h3>
                              <p className="text-sm text-gray-600">{option.desc}</p>
                            </div>
                            {isSelected && (
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Continue button for multiple selection questions */}
                  {(quizQuestions[quizStep] as any).multiple && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => {
                          const currentValue = quizProfile[quizStep as keyof QuizProfile];
                          if (Array.isArray(currentValue) && currentValue.length > 0) {
                            const steps = Object.keys(quizQuestions) as QuizStep[];
                            const currentIndex = steps.indexOf(quizStep);
                            if (currentIndex < steps.length - 1) {
                              setQuizStep(steps[currentIndex + 1]);
                            } else {
                              setQuizStep('results');
                            }
                          }
                        }}
                        disabled={!Array.isArray(quizProfile[quizStep as keyof QuizProfile]) || (quizProfile[quizStep as keyof QuizProfile] as string[]).length === 0}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
                      >
                        Continuer
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // RESULTS
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-10 text-white text-center shadow-2xl">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-bold mb-3">Tes recommandations personnalisées!</h2>
                  <p className="text-xl opacity-90">Top 3 courtiers parfaits pour ton profil</p>
                </div>

                {/* Top 3 Brokers */}
                <div className="space-y-4">
                  {calculateRecommendations().topBrokers.map((broker, index) => (
                    <div
                      key={broker.name}
                      className={`bg-white rounded-2xl p-6 shadow-xl border-2 ${
                        index === 0 ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="text-center">
                          <span className="text-5xl block mb-2">{broker.logo}</span>
                          {index === 0 && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">
                              🏆 #1
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{broker.name}</h3>
                              <p className="text-sm text-gray-600 italic">{broker.tagline}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-black text-blue-600">{broker.matchScore}%</div>
                              <div className="text-xs text-gray-500 font-semibold">Match Score</div>
                            </div>
                          </div>

                          {/* Personalized explanation */}
                          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">{index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}</div>
                              <div className="flex-1">
                                <h4 className="font-bold text-blue-900 mb-2">
                                  {index === 0 ? 'VOTRE MEILLEUR BROKER' : index === 1 ? '2ÈME CHOIX' : '3ÈME CHOIX'}: {broker.name} (Score: {broker.matchScore}/100)
                                </h4>
                                <div className="space-y-2 text-sm text-blue-800">
                                  <p className="font-semibold">✅ Pourquoi {broker.name} pour vous:</p>
                                  <ul className="list-disc list-inside space-y-1 ml-2">
                                    {getPersonalizedReasons(broker.name, quizProfile).map((reason, i) => (
                                      <li key={i}>{reason}</li>
                                    ))}
                                  </ul>
                                  {broker.cons.length > 0 && (
                                    <>
                                      <p className="font-semibold mt-3">⚠️ Considérations:</p>
                                      <ul className="list-disc list-inside space-y-1 ml-2">
                                        {broker.cons.slice(0, 2).map((con, i) => (
                                          <li key={i}>{con}</li>
                                        ))}
                                      </ul>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-green-50 rounded-lg p-3">
                              <p className="text-xs font-bold text-green-800 mb-2">✓ AVANTAGES</p>
                              {broker.pros.slice(0, 4).map((pro, i) => (
                                <p key={i} className="text-sm text-green-700 mb-1">• {pro}</p>
                              ))}
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3">
                              <p className="text-xs font-bold text-orange-800 mb-2">⚠️ INCONVÉNIENTS</p>
                              {broker.cons.slice(0, 3).map((con, i) => (
                                <p key={i} className="text-sm text-orange-700 mb-1">• {con}</p>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500">Frais actions</p>
                              <p className="font-bold text-gray-900">{broker.fees.stocks}</p>
                            </div>
                            <a
                              href={broker.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                            >
                              Ouvrir un compte
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* READINESS */}
        {activeSection === 'readiness' && (
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Es-tu prêt pour le trading réel?</h2>
                <p className="text-gray-600">Évalue ta préparation avec 10 questions</p>
              </div>
            </div>

            {Object.keys(readinessAnswers).length > 0 && (
              <div className={`rounded-xl p-8 mb-8 text-center ${
                readinessScore >= 70 ? 'bg-green-50 border-2 border-green-500' : 'bg-orange-50 border-2 border-orange-500'
              }`}>
                <h3 className="text-5xl font-black text-gray-900 mb-2">{readinessScore}%</h3>
                <p className={`text-xl font-bold ${readinessScore >= 70 ? 'text-green-700' : 'text-orange-700'}`}>
                  {readinessScore >= 70 ? '✓ Tu es prêt à commencer!' : '⚠️ Encore un peu de préparation'}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {readinessQuestions.map((q) => {
                const answer = readinessAnswers[q.id];
                return (
                  <div key={q.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => setReadinessAnswers({ ...readinessAnswers, [q.id]: !answer })}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          answer ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {answer && <Check className="w-6 h-6 text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{q.question}</h4>
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold ml-2">
                            {q.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GUIDE */}
        {activeSection === 'guide' && (
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <PlayCircle className="w-10 h-10 text-purple-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Guide: Ton Premier Trade</h2>
                <p className="text-gray-600">5 étapes simples du compte au trade</p>
              </div>
            </div>

            <div className="space-y-8">
              {firstTradeSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < firstTradeSteps.length - 1 && (
                    <div className="absolute left-7 top-20 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded" />
                  )}
                  <div className="flex gap-6">
                    <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <span className="text-white font-black text-xl">{step.step}</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        {step.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{task}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-100 border-l-4 border-blue-600 rounded p-3">
                        <p className="text-xs font-bold text-blue-900 mb-1">💡 Tips:</p>
                        <ul className="space-y-0.5">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="text-xs text-blue-800">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BROKER COMPARISON - BEAUTIFUL CARDS */}
        {activeSection === 'account-types' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <Wallet className="w-10 h-10 text-orange-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Types de Comptes</h2>
                  <p className="text-gray-600">CELI, REER, Margin - Choisissez le bon compte</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* CELI / TFSA */}
                <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🏦</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">CELI / TFSA</h3>
                      <p className="text-sm text-gray-600">Tax-Free Savings Account</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-green-800 mb-2">✅ Avantages:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Gains en capital 100% libres d'impôt</li>
                        <li>Retraits non imposables</li>
                        <li>Flexible - retrait en tout temps</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800 mb-2">⚠️ Limites:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Plafond de cotisation annuel (~$7,000 en 2024)</li>
                        <li>Pas de déduction fiscale lors du dépôt</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-green-200">
                      <p className="text-xs font-semibold text-gray-600">Idéal pour:</p>
                      <p className="text-sm text-gray-700">Épargne à moyen/long terme, objectifs personnels, compléter le REER</p>
                    </div>
                  </div>
                </div>

                {/* REER / RRSP */}
                <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">REER / RRSP</h3>
                      <p className="text-sm text-gray-600">Registered Retirement Savings Plan</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-blue-800 mb-2">✅ Avantages:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Déduction fiscale immédiate sur cotisations</li>
                        <li>Gains croissent à l'abri de l'impôt</li>
                        <li>Réduit votre revenu imposable</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800 mb-2">⚠️ Limites:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Retraits imposables</li>
                        <li>Pénalités si retrait avant retraite</li>
                        <li>Doit convertir en FERR à 71 ans</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-xs font-semibold text-gray-600">Idéal pour:</p>
                      <p className="text-sm text-gray-700">Planification retraite, réduire impôts annuels, horizon long terme (10+ ans)</p>
                    </div>
                  </div>
                </div>

                {/* Compte Cash */}
                <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Compte Cash</h3>
                      <p className="text-sm text-gray-600">Non-Enregistré</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">✅ Avantages:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Aucune limite de dépôt</li>
                        <li>Pas de restrictions sur retraits</li>
                        <li>Peut déduire pertes en capital</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800 mb-2">⚠️ Limites:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Gains en capital imposables (50%)</li>
                        <li>Dividendes imposables</li>
                        <li>Moins avantageux fiscalement</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600">Idéal pour:</p>
                      <p className="text-sm text-gray-700">Trading actif, montants dépassant CELI/REER, besoin de liquidité</p>
                    </div>
                  </div>
                </div>

                {/* Compte Margin */}
                <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Compte Margin</h3>
                      <p className="text-sm text-gray-600">Trading avec effet de levier</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-2">✅ Avantages:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Effet de levier (2:1 typiquement)</li>
                        <li>Augmente pouvoir d'achat</li>
                        <li>Court-vente (short selling) possible</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-800 mb-2">⚠️ Limites:</p>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Intérêts sur montant emprunté (8-12%)</li>
                        <li>Risque de margin call</li>
                        <li>Peut amplifier les pertes</li>
                        <li>Minimum requis: $2,000-$5,000</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-red-200">
                      <p className="text-xs font-semibold text-gray-600">Idéal pour:</p>
                      <p className="text-sm text-gray-700">Traders expérimentés, stratégies avancées, day trading</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tableau Comparatif */}
              <div className="mt-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border-2 border-slate-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Tableau Comparatif</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left p-2 font-bold text-gray-900">Type</th>
                        <th className="text-left p-2 font-bold text-gray-900">Avantages Fiscaux</th>
                        <th className="text-left p-2 font-bold text-gray-900">Limite Dépôt</th>
                        <th className="text-left p-2 font-bold text-gray-900">Retraits</th>
                        <th className="text-left p-2 font-bold text-gray-900">Idéal Pour</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-2 font-semibold">CELI</td>
                        <td className="p-2 text-green-600">✅ Gains libres d'impôt</td>
                        <td className="p-2">~$7k/an</td>
                        <td className="p-2 text-green-600">Libres</td>
                        <td className="p-2">Court/Moyen terme</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">REER</td>
                        <td className="p-2 text-green-600">✅ Déduction immédiate</td>
                        <td className="p-2">18% revenu</td>
                        <td className="p-2 text-orange-600">Imposables</td>
                        <td className="p-2">Retraite</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Cash</td>
                        <td className="p-2 text-red-600">❌ Aucun</td>
                        <td className="p-2">Illimité</td>
                        <td className="p-2 text-green-600">Libres</td>
                        <td className="p-2">Trading actif</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Margin</td>
                        <td className="p-2 text-red-600">❌ Aucun</td>
                        <td className="p-2">Selon équité</td>
                        <td className="p-2 text-green-600">Libres</td>
                        <td className="p-2">Traders avancés</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes Importantes */}
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <h4 className="font-bold text-yellow-900 mb-2">⚠️ Restrictions importantes:</h4>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li><strong>CELI:</strong> Pas de day trading excessif (CRA peut requalifier en revenu business)</li>
                  <li><strong>REER:</strong> Retrait avant 55 ans = retenue + pénalité</li>
                  <li><strong>Margin:</strong> Ne jamais utiliser si débutant</li>
                </ul>
              </div>

              {/* Stratégie Recommandée */}
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">💡 Stratégie recommandée:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Commencer avec CELI (maxer plafond)</li>
                  <li>Puis REER si revenu élevé</li>
                  <li>Compte Cash pour surplus</li>
                  <li>Margin seulement si expérimenté</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'compare-brokers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-10 h-10 text-blue-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Comparaison des 10 Brokers US Majeurs</h2>
                  <p className="text-gray-600">Découvre tous les brokers américains en détail</p>
                </div>
              </div>
            </div>

            {/* Broker Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {brokers.map((broker) => (
                <div key={broker.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-blue-500">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{broker.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{broker.name}</h3>
                        <p className="text-sm text-gray-600 italic">{broker.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-600">{broker.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>

                  {/* Fees Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Actions</p>
                      <p className="font-bold text-sm text-gray-900">{broker.fees.stocks}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">ETFs</p>
                      <p className="font-bold text-sm text-gray-900">{broker.fees.etfs}</p>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold">Plateformes:</p>
                    <div className="flex flex-wrap gap-2">
                      {broker.platforms.map((platform, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-900 font-bold mb-1">🎯 Best For:</p>
                    <p className="text-sm text-purple-800">{broker.bestFor}</p>
                  </div>

                  {/* Pros/Cons */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-green-700 font-bold mb-2">✓ Pros</p>
                      {broker.pros.slice(0, 2).map((pro, i) => (
                        <p key={i} className="text-xs text-gray-700 mb-1">• {pro}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-orange-700 font-bold mb-2">⚠️ Cons</p>
                      {broker.cons.slice(0, 2).map((con, i) => (
                        <p key={i} className="text-xs text-gray-700 mb-1">• {con}</p>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={broker.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  >
                    Visiter {broker.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ACCOUNT COMPARISON - BEAUTIFUL CARDS */}
        {activeSection === 'compare-accounts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-10 h-10 text-indigo-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Types de Comptes Expliqués</h2>
                  <p className="text-gray-600">TFSA, RRSP, Personnel, RESP, Margin - tous les détails</p>
                </div>
              </div>
            </div>

            {/* Account Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {accountTypes.map((account) => {
                // Get color classes based on account type
                const getAccountClasses = (id: string) => {
                  switch(id) {
                    case 'tfsa':
                      return { border: 'border-blue-200', hoverBorder: 'hover:border-blue-500', bg: 'bg-blue-50', borderL: 'border-blue-500' };
                    case 'rrsp':
                      return { border: 'border-green-200', hoverBorder: 'hover:border-green-500', bg: 'bg-green-50', borderL: 'border-green-500' };
                    case 'personal':
                      return { border: 'border-purple-200', hoverBorder: 'hover:border-purple-500', bg: 'bg-purple-50', borderL: 'border-purple-500' };
                    case 'resp':
                      return { border: 'border-yellow-200', hoverBorder: 'hover:border-yellow-500', bg: 'bg-yellow-50', borderL: 'border-yellow-500' };
                    case 'margin':
                      return { border: 'border-red-200', hoverBorder: 'hover:border-red-500', bg: 'bg-red-50', borderL: 'border-red-500' };
                    case 'corporate':
                      return { border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-500', bg: 'bg-indigo-50', borderL: 'border-indigo-500' };
                    default:
                      return { border: 'border-gray-200', hoverBorder: 'hover:border-gray-500', bg: 'bg-gray-50', borderL: 'border-gray-500' };
                  }
                };
                const colors = getAccountClasses(account.id);

                return (
                  <div key={account.id} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 ${colors.border} ${colors.hoverBorder}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-5xl">{account.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{account.name}</h3>
                        <p className="text-sm text-gray-600 italic">{account.desc}</p>
                      </div>
                    </div>

                    <div className={`${colors.bg} border-l-4 ${colors.borderL} rounded p-3 mb-4`}>
                      <p className="text-xs font-bold text-gray-700 mb-2">Tax Info & Contributions:</p>
                      <p className="text-sm text-gray-700 mb-1">• {account.taxInfo}</p>
                      <p className="text-sm text-gray-700 mb-1">• {account.contribution}</p>
                    </div>

                    <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-purple-900 font-bold mb-1">🎯 Best For:</p>
                      <p className="text-sm text-purple-800">{account.bestFor}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-green-700 font-bold mb-2">✓ Pros</p>
                        {account.pros.map((pro, i) => (
                          <p key={i} className="text-xs text-gray-700 mb-1">• {pro}</p>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-orange-700 font-bold mb-2">⚠️ Cons</p>
                        {account.cons.map((con, i) => (
                          <p key={i} className="text-xs text-gray-700 mb-1">• {con}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* COMPARATOR SECTION */}
        {activeSection === 'comparator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-10 h-10 text-pink-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Comparateur de Brokers</h2>
                  <p className="text-gray-600">Comparez les brokers côte à côte</p>
                </div>
              </div>
              <p className="text-gray-600">
                Cette fonctionnalité sera disponible prochainement. En attendant, utilisez la section "Les Brokers" pour voir tous les détails.
              </p>
            </div>
          </div>
        )}

        {/* OPEN ACCOUNT SECTION */}
        {activeSection === 'open-account' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink className="w-10 h-10 text-orange-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Ouvrir Un Compte</h2>
                  <p className="text-gray-600">Liens directs vers les brokers canadiens</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {brokers.slice(0, 6).map((broker) => (
                  <a
                    key={broker.name}
                    href={broker.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all"
                  >
                    <span className="text-3xl">{broker.logo}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{broker.name}</h3>
                      <p className="text-sm text-gray-600">{broker.tagline}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-orange-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM NAVIGATION - Always visible like other pages */}
      <BottomNav />
    </div>
  );
}
