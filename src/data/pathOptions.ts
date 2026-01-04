import { LearningPathType } from '@/lib/learningPathLogic';

export interface PathOption {
  type: LearningPathType;
  name: string;
  icon: string;
  description: string;
  totalLessons: number;
  estimatedWeeks: number;
  tier: string;
  highlights: string[];
  keyFeatures: string[];
  idealFor: string[];
}

export const ALL_PATHS: PathOption[] = [
  {
    type: 'zero_to_hero',
    name: 'Zero to Hero',
    icon: '🌱',
    description: 'Parcours complet pour débutants absolus. Tout depuis le début, sans rien sauter.',
    totalLessons: 70,
    estimatedWeeks: 12,
    tier: 'Beginner → Intermediate',
    highlights: [
      'Bases du trading expliquées simplement',
      'Lecture de charts étape par étape',
      'Gestion du risque dès le début',
      'Premier trade guidé dans le simulateur',
      'Patterns de base essentiels',
      'Stratégies simples et efficaces'
    ],
    keyFeatures: [
      'Très guidé',
      'Aucun prérequis',
      'Progression douce'
    ],
    idealFor: [
      'Jamais tradé avant',
      'Veut tout comprendre',
      'Pas pressé'
    ]
  },
  
  {
    type: 'day_trader',
    name: 'Day Trader Path',
    icon: '⚡',
    description: 'Trading actif intrajournée. Scalping, momentum, et exécution rapide.',
    totalLessons: 65,
    estimatedWeeks: 10,
    tier: 'Intermediate → Advanced',
    highlights: [
      'Indicators pour day trading',
      'Order flow analysis',
      'Scalping techniques',
      'Gap trading strategies',
      'News trading',
      'Momentum identification'
    ],
    keyFeatures: [
      'Fast-paced',
      'Technical focus',
      'Execution-heavy'
    ],
    idealFor: [
      'Temps devant les écrans',
      'Trading actif',
      'Quick profits'
    ]
  },
  
  {
    type: 'swing_trader',
    name: 'Swing Trader Path',
    icon: '📈',
    description: 'Trades multi-jours avec focus sur les patterns et support/résistance.',
    totalLessons: 68,
    estimatedWeeks: 11,
    tier: 'Intermediate',
    highlights: [
      'Tous les chart patterns',
      'Support & résistance mastery',
      'Swing trading strategies',
      'Risk management avancé',
      'Pullback entries',
      'Multi-timeframe analysis'
    ],
    keyFeatures: [
      'Pattern-focused',
      'Work-life balance',
      'Technical analysis'
    ],
    idealFor: [
      'Quelques heures/jour',
      'Patient trader',
      'Chart reader'
    ]
  },
  
  {
    type: 'position_investor',
    name: 'Position Investor',
    icon: '💼',
    description: 'Approche long-terme avec focus sur les fundamentals et portfolio management.',
    totalLessons: 55,
    estimatedWeeks: 9,
    tier: 'Beginner → Intermediate',
    highlights: [
      'Fundamental analysis',
      'ETF & dividend stocks',
      'Portfolio diversification',
      'Long-term strategies',
      'Risk management conservateur',
      'Tax-efficient investing'
    ],
    keyFeatures: [
      'Low stress',
      'Passive income',
      'Conservative'
    ],
    idealFor: [
      'Peu de temps',
      'Long-term wealth',
      'Risk averse'
    ]
  },
  
  {
    type: 'chart_master',
    name: 'Chart Master Path',
    icon: '🎯',
    description: 'Technical analysis expert. Tous les patterns, tous les indicators.',
    totalLessons: 85,
    estimatedWeeks: 14,
    tier: 'Intermediate → Advanced',
    highlights: [
      'Tous les chart patterns',
      'Tous les indicators',
      'Advanced TA (Fibonacci, Elliott Wave)',
      'Multi-timeframe mastery',
      'Volume analysis',
      'Order flow & market profile'
    ],
    keyFeatures: [
      'Pattern expert',
      'Technical mastery',
      'Comprehensive'
    ],
    idealFor: [
      'Amoureux des charts',
      'Patient learner',
      'Wants mastery'
    ]
  },
  
  {
    type: 'risk_averse',
    name: 'Risk Averse Path',
    icon: '🛡️',
    description: 'Sécurité avant tout. Capital preservation et croissance stable.',
    totalLessons: 50,
    estimatedWeeks: 8,
    tier: 'Beginner',
    highlights: [
      'Risk management focus',
      'Protective strategies',
      'ETFs & blue chips',
      'Position sizing mastery',
      'Stop-loss optimization',
      'Conservative approaches'
    ],
    keyFeatures: [
      'Safety first',
      'Low risk',
      'Stable growth'
    ],
    idealFor: [
      'Risk averse',
      'Small capital',
      'Can\'t afford losses'
    ]
  },
  
  {
    type: 'tech_enthusiast',
    name: 'Tech Enthusiast Path',
    icon: '🤖',
    description: 'Automation, AI tools, algo trading. Tech-forward approach.',
    totalLessons: 75,
    estimatedWeeks: 12,
    tier: 'Intermediate → Advanced',
    highlights: [
      'Python for trading',
      'Building trading bots',
      'Backtesting systems',
      'AI scanner mastery',
      'Algo trading basics',
      'API integration'
    ],
    keyFeatures: [
      'Automation',
      'Tech-focused',
      'Programming'
    ],
    idealFor: [
      'Tech background',
      'Wants automation',
      'Programming interest'
    ]
  },
  
  {
    type: 'fast_track',
    name: 'Fast Track Path',
    icon: '🚀',
    description: 'Pour traders expérimentés. Skip les bases, direct à l\'avancé.',
    totalLessons: 55,
    estimatedWeeks: 8,
    tier: 'Advanced → Expert',
    highlights: [
      'Advanced patterns only',
      'Complex strategies',
      'Options trading',
      'Algo concepts',
      'Portfolio optimization',
      'Advanced risk management'
    ],
    keyFeatures: [
      'Skip basics',
      'Advanced only',
      'Fast progression'
    ],
    idealFor: [
      'Déjà expérience',
      'Knows basics',
      'Wants advanced'
    ]
  }
];

export function getPathByType(type: LearningPathType): PathOption | undefined {
  return ALL_PATHS.find(p => p.type === type);
}
