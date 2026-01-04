import { Reward } from './xpLevels';

export type LeagueName = 
  | 'Bronze' 
  | 'Silver' 
  | 'Gold' 
  | 'Platinum' 
  | 'Diamond' 
  | 'Masters' 
  | 'Grandmaster' 
  | 'Challenger';

export interface LeagueConfig {
  name: LeagueName;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  minRank: number;
  monthlyXPRequirement: number;
  rewards: {
    top1: Reward[];
    top3: Reward[];
    top10: Reward[];
    participation: Reward[];
  };
}

export const LEAGUES: LeagueConfig[] = [
  {
    name: 'Bronze',
    color: 'text-amber-700',
    bgColor: 'bg-amber-700/20',
    borderColor: 'border-amber-700',
    icon: '🥉',
    minRank: 0,
    monthlyXPRequirement: 0,
    rewards: {
      top1: [{ type: 'coins', value: 2000 }],
      top3: [{ type: 'coins', value: 1200 }],
      top10: [{ type: 'coins', value: 400 }],
      participation: [{ type: 'coins', value: 200 }]
    }
  },
  {
    name: 'Silver',
    color: 'text-slate-400',
    bgColor: 'bg-slate-400/20',
    borderColor: 'border-slate-400',
    icon: '🥈',
    minRank: 1000,
    monthlyXPRequirement: 2000,
    rewards: {
      top1: [{ type: 'coins', value: 4000 }, { type: 'badge', value: 'silver_champion' }],
      top3: [{ type: 'coins', value: 2400 }],
      top10: [{ type: 'coins', value: 800 }],
      participation: [{ type: 'coins', value: 300 }]
    }
  },
  {
    name: 'Gold',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500',
    icon: '🥇',
    minRank: 2500,
    monthlyXPRequirement: 4000,
    rewards: {
      top1: [{ type: 'coins', value: 8000 }, { type: 'premium_days', value: 14 }, { type: 'badge', value: 'gold_champion' }],
      top3: [{ type: 'coins', value: 4800 }, { type: 'premium_days', value: 7 }],
      top10: [{ type: 'coins', value: 1600 }],
      participation: [{ type: 'coins', value: 400 }]
    }
  },
  {
    name: 'Platinum',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/20',
    borderColor: 'border-cyan-400',
    icon: '💎',
    minRank: 5000,
    monthlyXPRequirement: 8000,
    rewards: {
      top1: [{ type: 'coins', value: 12000 }, { type: 'premium_days', value: 30 }],
      top3: [{ type: 'coins', value: 8000 }, { type: 'premium_days', value: 14 }],
      top10: [{ type: 'coins', value: 3200 }],
      participation: [{ type: 'coins', value: 600 }]
    }
  },
  {
    name: 'Diamond',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    borderColor: 'border-blue-400',
    icon: '💠',
    minRank: 10000,
    monthlyXPRequirement: 14000,
    rewards: {
      top1: [{ type: 'coins', value: 20000 }, { type: 'premium_month', value: 1 }, { type: 'real_money_bonus', value: 50 }],
      top3: [{ type: 'coins', value: 14000 }, { type: 'premium_days', value: 30 }],
      top10: [{ type: 'coins', value: 6000 }],
      participation: [{ type: 'coins', value: 800 }]
    }
  },
  {
    name: 'Masters',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500',
    icon: '👑',
    minRank: 50000,
    monthlyXPRequirement: 20000,
    rewards: {
      top1: [{ type: 'coins', value: 40000 }, { type: 'premium_month', value: 3 }, { type: 'real_money_bonus', value: 200 }],
      top3: [{ type: 'coins', value: 28000 }, { type: 'premium_month', value: 1 }],
      top10: [{ type: 'coins', value: 12000 }],
      participation: [{ type: 'coins', value: 2000 }]
    }
  },
  {
    name: 'Grandmaster',
    color: 'text-red-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500',
    icon: '⚔️',
    minRank: 100000,
    monthlyXPRequirement: 30000,
    rewards: {
      top1: [{ type: 'coins', value: 100000 }, { type: 'premium_month', value: 12 }, { type: 'real_money_bonus', value: 1000 }],
      top3: [{ type: 'coins', value: 60000 }, { type: 'premium_month', value: 6 }, { type: 'real_money_bonus', value: 400 }],
      top10: [{ type: 'coins', value: 30000 }, { type: 'premium_month', value: 3 }],
      participation: [{ type: 'coins', value: 4000 }]
    }
  },
  {
    name: 'Challenger',
    color: 'text-amber-400',
    bgColor: 'bg-gradient-to-r from-amber-400/20 to-orange-500/20',
    borderColor: 'border-amber-400',
    icon: '⚡',
    minRank: 999999,
    monthlyXPRequirement: 40000,
    rewards: {
      top1: [
        { type: 'coins', value: 400000 },
        { type: 'lifetime_premium', value: true },
        { type: 'real_money_bonus', value: 5000 },
        { type: 'hall_of_fame', value: true }
      ],
      top3: [{ type: 'coins', value: 200000 }, { type: 'premium_month', value: 24 }, { type: 'real_money_bonus', value: 2000 }],
      top10: [{ type: 'coins', value: 100000 }, { type: 'premium_month', value: 12 }, { type: 'real_money_bonus', value: 1000 }],
      participation: [{ type: 'coins', value: 20000 }, { type: 'premium_month', value: 1 }]
    }
  }
];

export function getLeagueConfig(name: LeagueName): LeagueConfig {
  return LEAGUES.find(l => l.name === name) || LEAGUES[0];
}

export function getNextLeague(name: LeagueName): LeagueConfig | null {
  const currentIndex = LEAGUES.findIndex(l => l.name === name);
  return currentIndex < LEAGUES.length - 1 ? LEAGUES[currentIndex + 1] : null;
}

export function getPreviousLeague(name: LeagueName): LeagueConfig | null {
  const currentIndex = LEAGUES.findIndex(l => l.name === name);
  return currentIndex > 0 ? LEAGUES[currentIndex - 1] : null;
}

export function getLeagueIndex(name: LeagueName): number {
  return LEAGUES.findIndex(l => l.name === name);
}

// Zone definitions
export const PROMOTION_ZONE = 10; // Top 10 get promoted
export const DEMOTION_ZONE = 5; // Bottom 5 get demoted
export const LEAGUE_SIZE = 50; // Users per league group

export function isInPromotionZone(rank: number): boolean {
  return rank <= PROMOTION_ZONE;
}

export function isInDemotionZone(rank: number, totalMembers: number = LEAGUE_SIZE): boolean {
  return rank > totalMembers - DEMOTION_ZONE;
}

export function getZoneStatus(rank: number, totalMembers: number = LEAGUE_SIZE): 'promotion' | 'safe' | 'demotion' {
  if (isInPromotionZone(rank)) return 'promotion';
  if (isInDemotionZone(rank, totalMembers)) return 'demotion';
  return 'safe';
}

// Calculate days left in current month
export function getDaysLeftInMonth(): number {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate() - now.getDate();
}

// Get current month number (unique identifier)
export function getCurrentMonthNumber(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

// Get start of current month
export function getMonthStartDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
