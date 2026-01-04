import { BadgeDefinition } from '@/types';

export const badges: BadgeDefinition[] = [
  // Learning badges
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    tier: 'bronze',
    requirement: 'Complete 1 lesson',
  },
  {
    id: 'beginner_complete',
    name: 'Foundation Builder',
    description: 'Complete all beginner lessons',
    icon: '📚',
    tier: 'silver',
    requirement: 'Complete all beginner lessons',
  },
  {
    id: 'intermediate_complete',
    name: 'Rising Analyst',
    description: 'Complete all intermediate lessons',
    icon: '📈',
    tier: 'silver',
    requirement: 'Complete all intermediate lessons',
  },
  {
    id: 'advanced_complete',
    name: 'Market Master',
    description: 'Complete all advanced lessons',
    icon: '🏆',
    tier: 'gold',
    requirement: 'Complete all advanced lessons',
  },
  
  // Streak badges
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    tier: 'bronze',
    requirement: '7 consecutive days',
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: '⚡',
    tier: 'silver',
    requirement: '30 consecutive days',
  },
  {
    id: 'streak_100',
    name: 'Century Club',
    description: 'Maintain a 100-day learning streak',
    icon: '💎',
    tier: 'gold',
    requirement: '100 consecutive days',
  },

  // Trading badges
  {
    id: 'first_trade',
    name: 'Market Entry',
    description: 'Execute your first paper trade',
    icon: '💹',
    tier: 'bronze',
    requirement: 'Complete 1 trade',
  },
  {
    id: 'ten_trades',
    name: 'Active Trader',
    description: 'Execute 10 paper trades',
    icon: '📊',
    tier: 'bronze',
    requirement: 'Complete 10 trades',
  },
  {
    id: 'profitable_week',
    name: 'Green Week',
    description: 'End a week with positive returns',
    icon: '💚',
    tier: 'silver',
    requirement: 'Positive weekly return',
  },
  {
    id: 'beat_market',
    name: 'Market Beater',
    description: 'Outperform S&P 500 for a month',
    icon: '🚀',
    tier: 'gold',
    requirement: 'Beat S&P 500 monthly',
  },

  // AI Scanner badges
  {
    id: 'first_scan',
    name: 'Chart Reader',
    description: 'Analyze your first chart with AI',
    icon: '🔍',
    tier: 'bronze',
    requirement: 'Complete 1 chart analysis',
  },
  {
    id: 'pattern_hunter',
    name: 'Pattern Hunter',
    description: 'Find 10 chart patterns using AI',
    icon: '🎨',
    tier: 'silver',
    requirement: 'Identify 10 patterns',
  },

  // XP badges
  {
    id: 'xp_1000',
    name: 'Rising Star',
    description: 'Earn 1,000 XP',
    icon: '⭐',
    tier: 'bronze',
    requirement: 'Earn 1,000 XP',
  },
  {
    id: 'xp_5000',
    name: 'Knowledge Seeker',
    description: 'Earn 5,000 XP',
    icon: '🌟',
    tier: 'silver',
    requirement: 'Earn 5,000 XP',
  },
  {
    id: 'xp_10000',
    name: 'Trading Scholar',
    description: 'Earn 10,000 XP',
    icon: '✨',
    tier: 'gold',
    requirement: 'Earn 10,000 XP',
  },
];

export const getBadgeById = (id: string): BadgeDefinition | undefined => {
  return badges.find((badge) => badge.id === id);
};

export const getBadgesByTier = (tier: 'bronze' | 'silver' | 'gold'): BadgeDefinition[] => {
  return badges.filter((badge) => badge.tier === tier);
};
