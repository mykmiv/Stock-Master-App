import { LearningPathType } from '@/lib/learningPathLogic';

export interface LearningPathConfig {
  name: string;
  level: string; // "Débutant", "Intermédiaire", "Avancé"
  icon: string;
  color: string; // Tailwind gradient classes
}

/**
 * Configuration des learning paths avec leurs métadonnées
 */
export const learningPaths: Record<LearningPathType, LearningPathConfig> = {
  'zero_to_hero': {
    name: 'Zero to Hero',
    level: 'Débutant',
    icon: '🎯',
    color: 'from-cyan-400 to-blue-500'
  },
  'day_trader': {
    name: 'Day Trader',
    level: 'Intermédiaire',
    icon: '⚡',
    color: 'from-purple-400 to-indigo-500'
  },
  'swing_trader': {
    name: 'Swing Trader',
    level: 'Intermédiaire',
    icon: '🌊',
    color: 'from-blue-400 to-cyan-500'
  },
  'position_investor': {
    name: 'Investisseur',
    level: 'Intermédiaire',
    icon: '🏔️',
    color: 'from-green-400 to-emerald-500'
  },
  'chart_master': {
    name: 'Maître des Charts',
    level: 'Avancé',
    icon: '📊',
    color: 'from-orange-400 to-red-500'
  },
  'risk_averse': {
    name: 'Conservateur',
    level: 'Débutant',
    icon: '🛡️',
    color: 'from-indigo-400 to-purple-500'
  },
  'tech_enthusiast': {
    name: 'Tech Expert',
    level: 'Avancé',
    icon: '🤖',
    color: 'from-pink-400 to-rose-500'
  },
  'fast_track': {
    name: 'Fast Track',
    level: 'Intermédiaire',
    icon: '🚀',
    color: 'from-yellow-400 to-orange-500'
  }
};

/**
 * Get learning path config by type
 */
export function getPathConfig(pathType: LearningPathType): LearningPathConfig {
  return learningPaths[pathType] || learningPaths['zero_to_hero'];
}
