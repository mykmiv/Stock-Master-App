// XP Sources - How to earn XP
export const XP_SOURCES = {
  // Lessons
  lessonCompleted: 50,
  perfectQuiz: 25, // Bonus if 100% quiz score
  firstTry: 15, // Bonus if passed on first attempt
  speedBonus: 10, // Completed in <80% of estimated time

  // Daily Goals
  dailyGoalMet: 100,
  streak7Days: 500,
  streak30Days: 2000,

  // Simulator
  profitableTrade: 25,
  riskManaged: 15,
  weeklyProfit: 200,

  // AI Scanner
  scanUsed: 10,
  scanAccurate: 50,

  // Social
  referralSignup: 500,
  helpOthers: 25,

  // Achievements (range)
  achievementMin: 100,
  achievementMax: 1000,
} as const;

// XP Multipliers
export const XP_MULTIPLIERS = {
  premiumUser: 1.5,
  weekendBonus: 1.2,
  doubleXPEvent: 2.0,
  comboBase: 1.0,
  comboPerStreak: 0.1, // +10% per lesson without pause
} as const;

// Tier definitions
export type Tier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master' | 'Legend';

// Reward types
export type RewardType =
  | 'coins'
  | 'xp'
  | 'badge'
  | 'title'
  | 'premium_days'
  | 'premium_month'
  | 'feature_unlock'
  | 'scanner_unlocks'
  | 'custom_avatar'
  | 'tier_complete'
  | 'real_money_bonus'
  | 'lifetime_premium'
  | 'hall_of_fame'
  | 'custom_badge';

export interface Reward {
  type: RewardType;
  value: string | number | boolean;
}

export interface Level {
  level: number;
  name: string;
  tier: Tier;
  xpRequired: number; // XP needed from previous level
  totalXpRequired: number; // Total cumulative XP
  rewards: Reward[];
  badge: string;
}

// XP calculation formula based on level
function calculateXPForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level <= 10) {
    // Beginner: linear growth
    return 500 + (level - 2) * 250;
  } else if (level <= 25) {
    // Intermediate: soft exponential
    return Math.floor(4000 * Math.pow(1.15, level - 11));
  } else if (level <= 40) {
    // Advanced: medium exponential
    return Math.floor(10000 * Math.pow(1.12, level - 26));
  } else if (level <= 60) {
    // Expert: strong exponential
    return Math.floor(15000 * Math.pow(1.10, level - 41));
  } else if (level <= 80) {
    // Master: very difficult
    return Math.floor(25000 * Math.pow(1.08, level - 61));
  } else {
    // Legend: extremely difficult
    return Math.floor(50000 * Math.pow(1.05, level - 81));
  }
}

function getTierForLevel(level: number): Tier {
  if (level <= 10) return 'Beginner';
  if (level <= 25) return 'Intermediate';
  if (level <= 40) return 'Advanced';
  if (level <= 60) return 'Expert';
  if (level <= 80) return 'Master';
  return 'Legend';
}

function getLevelName(level: number): string {
  const names: Record<number, string> = {
    1: 'Novice Trader',
    2: 'Curious Learner',
    3: 'Chart Reader',
    4: 'Data Observer',
    5: 'Trend Watcher',
    6: 'Price Analyst',
    7: 'Market Student',
    8: 'Pattern Seeker',
    9: 'Trading Initiate',
    10: 'Market Observer',
    11: 'Pattern Spotter',
    12: 'Candlestick Reader',
    13: 'Indicator Master',
    14: 'Volume Analyst',
    15: 'Support Finder',
    16: 'Resistance Hunter',
    17: 'Trend Follower',
    18: 'Breakout Trader',
    19: 'Momentum Rider',
    20: 'Swing Trader',
    21: 'Position Builder',
    22: 'Risk Calculator',
    23: 'Portfolio Manager',
    24: 'Strategy Tester',
    25: 'Strategy Master',
    26: 'Risk Manager',
    27: 'Capital Protector',
    28: 'Loss Minimizer',
    29: 'Profit Optimizer',
    30: 'Trade Executor',
    31: 'Order Specialist',
    32: 'Timing Expert',
    33: 'Entry Master',
    34: 'Exit Strategist',
    35: 'Trade Planner',
    36: 'Market Timer',
    37: 'Sector Analyst',
    38: 'Industry Expert',
    39: 'Macro Trader',
    40: 'Advanced Trader',
    41: 'Market Analyst',
    42: 'Technical Guru',
    43: 'Fundamental Expert',
    44: 'News Trader',
    45: 'Earnings Specialist',
    46: 'Dividend Hunter',
    47: 'Growth Investor',
    48: 'Value Seeker',
    49: 'Multi-Asset Trader',
    50: 'Options Explorer',
    51: 'Derivatives Expert',
    52: 'Hedge Strategist',
    53: 'Portfolio Optimizer',
    54: 'Alpha Seeker',
    55: 'Beta Neutralizer',
    56: 'Risk Arbitrageur',
    57: 'Statistical Trader',
    58: 'Quant Analyst',
    59: 'Algo Designer',
    60: 'Expert Trader',
    61: 'Trading Veteran',
    62: 'Market Sage',
    63: 'Investment Guru',
    64: 'Wealth Builder',
    65: 'Capital Grower',
    66: 'Financial Architect',
    67: 'Portfolio Sculptor',
    68: 'Risk Artisan',
    69: 'Trade Maestro',
    70: 'Market Virtuoso',
    71: 'Investment Prodigy',
    72: 'Wealth Strategist',
    73: 'Capital Commander',
    74: 'Trading Philosopher',
    75: 'Market Mystic',
    76: 'Investment Oracle',
    77: 'Portfolio Wizard',
    78: 'Trading Sensei',
    79: 'Market Mastermind',
    80: 'Master Trader',
    81: 'Market Legend',
    82: 'Trading Titan',
    83: 'Investment Icon',
    84: 'Wealth Monarch',
    85: 'Capital Emperor',
    86: 'Market Overlord',
    87: 'Trading Sovereign',
    88: 'Investment Deity',
    89: 'Portfolio Supreme',
    90: 'Market Immortal',
    91: 'Trading Eternal',
    92: 'Investment Infinite',
    93: 'Wealth Transcendent',
    94: 'Capital Absolute',
    95: 'Market Universal',
    96: 'Trading Cosmic',
    97: 'Investment Divine',
    98: 'Portfolio Celestial',
    99: 'Market Omniscient',
    100: 'Trading God',
  };
  return names[level] || `Level ${level} Trader`;
}

function getBadgeForLevel(level: number): string {
  const badges: Record<number, string> = {
    1: '🌱', 2: '🔍', 3: '📊', 4: '👁️', 5: '📈',
    6: '💹', 7: '📚', 8: '🎯', 9: '🎓', 10: '👀',
    11: '🎯', 12: '🕯️', 13: '📉', 14: '📊', 15: '🛡️',
    16: '🚧', 17: '➡️', 18: '💥', 19: '🚀', 20: '🔄',
    21: '🏗️', 22: '🧮', 23: '💼', 24: '🧪', 25: '🧠',
    26: '⚖️', 27: '🛡️', 28: '📉', 29: '📈', 30: '⚡',
    31: '📝', 32: '⏰', 33: '🎯', 34: '🚪', 35: '📋',
    36: '⌚', 37: '🏭', 38: '🔬', 39: '🌍', 40: '🎖️',
    41: '🔬', 42: '📐', 43: '📊', 44: '📰', 45: '💰',
    46: '💵', 47: '🌱', 48: '💎', 49: '🎨', 50: '🎰',
    51: '📈', 52: '🛡️', 53: '⚙️', 54: '🔮', 55: '⚖️',
    56: '🔄', 57: '📊', 58: '🤖', 59: '💻', 60: '🏆',
    61: '👑', 62: '🧙', 63: '🎓', 64: '🏰', 65: '🌳',
    66: '🏛️', 67: '🗿', 68: '🎨', 69: '🎼', 70: '🎻',
    71: '⚡', 72: '🗺️', 73: '⚔️', 74: '📖', 75: '🔮',
    76: '👁️', 77: '🧙‍♂️', 78: '🥋', 79: '🧩', 80: '🏅',
    81: '⚡', 82: '🦁', 83: '🏛️', 84: '👑', 85: '🏰',
    86: '⚔️', 87: '👸', 88: '🌟', 89: '💫', 90: '✨',
    91: '🌌', 92: '♾️', 93: '🌠', 94: '💠', 95: '🌍',
    96: '🪐', 97: '☀️', 98: '🌙', 99: '👁️‍🗨️', 100: '🌟',
  };
  return badges[level] || '⭐';
}

function getRewardsForLevel(level: number): Reward[] {
  const rewards: Reward[] = [];

  // Base coins for every level
  rewards.push({ type: 'coins', value: level * 50 });

  // Milestone rewards
  if (level === 5) {
    rewards.push({ type: 'feature_unlock', value: 'watchlist_alerts' });
  }
  if (level === 10) {
    rewards.push({ type: 'tier_complete', value: 'Beginner Champion!' });
    rewards.push({ type: 'badge', value: 'beginner_master' });
    rewards.push({ type: 'coins', value: 1000 });
  }
  if (level === 15) {
    rewards.push({ type: 'scanner_unlocks', value: 5 });
  }
  if (level === 20) {
    rewards.push({ type: 'premium_days', value: 3 });
  }
  if (level === 25) {
    rewards.push({ type: 'tier_complete', value: 'Intermediate Champion!' });
    rewards.push({ type: 'badge', value: 'intermediate_master' });
    rewards.push({ type: 'coins', value: 2500 });
  }
  if (level === 30) {
    rewards.push({ type: 'premium_days', value: 7 });
  }
  if (level === 40) {
    rewards.push({ type: 'tier_complete', value: 'Advanced Champion!' });
    rewards.push({ type: 'badge', value: 'advanced_master' });
    rewards.push({ type: 'premium_days', value: 14 });
  }
  if (level === 50) {
    rewards.push({ type: 'premium_month', value: 1 });
    rewards.push({ type: 'custom_avatar', value: true });
  }
  if (level === 60) {
    rewards.push({ type: 'tier_complete', value: 'Expert Champion!' });
    rewards.push({ type: 'badge', value: 'expert_master' });
    rewards.push({ type: 'real_money_bonus', value: 25 });
  }
  if (level === 75) {
    rewards.push({ type: 'premium_month', value: 3 });
  }
  if (level === 80) {
    rewards.push({ type: 'tier_complete', value: 'Master Champion!' });
    rewards.push({ type: 'badge', value: 'master_trader' });
    rewards.push({ type: 'real_money_bonus', value: 100 });
  }
  if (level === 90) {
    rewards.push({ type: 'premium_month', value: 6 });
  }
  if (level === 100) {
    rewards.push({ type: 'tier_complete', value: 'Trading God!' });
    rewards.push({ type: 'hall_of_fame', value: true });
    rewards.push({ type: 'lifetime_premium', value: true });
    rewards.push({ type: 'custom_badge', value: 'design_your_own' });
  }

  return rewards;
}

// Generate all 100 levels
function generateLevels(): Level[] {
  const levels: Level[] = [];
  let totalXP = 0;

  for (let i = 1; i <= 100; i++) {
    const xpRequired = calculateXPForLevel(i);
    totalXP += xpRequired;

    levels.push({
      level: i,
      name: getLevelName(i),
      tier: getTierForLevel(i),
      xpRequired,
      totalXpRequired: totalXP,
      rewards: getRewardsForLevel(i),
      badge: getBadgeForLevel(i),
    });
  }

  return levels;
}

export const LEVELS = generateLevels();

// Helper functions
export function getLevelByXP(totalXP: number): Level {
  let currentLevel = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXP >= level.totalXpRequired) {
      currentLevel = level;
    } else {
      break;
    }
  }
  return currentLevel;
}

export function getLevelById(levelNum: number): Level {
  return LEVELS[levelNum - 1] || LEVELS[0];
}

export function getXPProgressInLevel(totalXP: number): { current: number; needed: number; percent: number } {
  const currentLevel = getLevelByXP(totalXP);
  const nextLevel = LEVELS[currentLevel.level] || currentLevel;

  const xpInCurrentLevel = totalXP - currentLevel.totalXpRequired;
  const xpNeededForNext = nextLevel.xpRequired;
  const percent = xpNeededForNext > 0 ? Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100) : 100;

  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNext,
    percent,
  };
}

export function getTierColor(tier: Tier): string {
  const colors: Record<Tier, string> = {
    Beginner: 'text-emerald-500',
    Intermediate: 'text-blue-500',
    Advanced: 'text-purple-500',
    Expert: 'text-orange-500',
    Master: 'text-pink-500',
    Legend: 'text-amber-400',
  };
  return colors[tier];
}

export function getTierGradient(tier: Tier): string {
  const gradients: Record<Tier, string> = {
    Beginner: 'from-emerald-500/20 to-emerald-600/10',
    Intermediate: 'from-blue-500/20 to-blue-600/10',
    Advanced: 'from-purple-500/20 to-purple-600/10',
    Expert: 'from-orange-500/20 to-orange-600/10',
    Master: 'from-pink-500/20 to-pink-600/10',
    Legend: 'from-amber-400/20 to-amber-500/10',
  };
  return gradients[tier];
}

export function formatReward(reward: Reward): string {
  switch (reward.type) {
    case 'coins':
      return `${reward.value} Coins`;
    case 'xp':
      return `+${reward.value} XP`;
    case 'badge':
      return `Badge: ${reward.value}`;
    case 'title':
      return `Title: ${reward.value}`;
    case 'premium_days':
      return `${reward.value} days Premium`;
    case 'premium_month':
      return `${reward.value} month${Number(reward.value) > 1 ? 's' : ''} Premium`;
    case 'feature_unlock':
      return `Feature: ${String(reward.value).replace(/_/g, ' ')}`;
    case 'scanner_unlocks':
      return `+${reward.value} AI Scans`;
    case 'custom_avatar':
      return 'Custom Avatar Frame';
    case 'tier_complete':
      return String(reward.value);
    case 'real_money_bonus':
      return `$${reward.value} Credit`;
    case 'lifetime_premium':
      return 'Lifetime Premium!';
    case 'hall_of_fame':
      return 'Hall of Fame Entry';
    case 'custom_badge':
      return 'Design Your Badge';
    default:
      return String(reward.value);
  }
}
