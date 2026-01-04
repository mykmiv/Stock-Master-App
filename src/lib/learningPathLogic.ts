import { OnboardingData } from '@/types/onboarding';

export type LearningPathType = 
  | 'zero_to_hero'
  | 'day_trader'
  | 'swing_trader'
  | 'position_investor'
  | 'chart_master'
  | 'risk_averse'
  | 'tech_enthusiast'
  | 'fast_track';

export interface PathLessonConfig {
  path: LearningPathType;
  description: string;
  totalLessons: number;
  estimatedWeeks: number;
  lessonCodes: string[];
}

// Score thresholds and weights for path determination
interface PathScores {
  zero_to_hero: number;
  day_trader: number;
  swing_trader: number;
  position_investor: number;
  chart_master: number;
  risk_averse: number;
  tech_enthusiast: number;
  fast_track: number;
}

/**
 * Analyzes onboarding responses and determines the best learning path
 */
export function determineLearningPath(data: OnboardingData): LearningPathType {
  const scores: PathScores = {
    zero_to_hero: 0,
    day_trader: 0,
    swing_trader: 0,
    position_investor: 0,
    chart_master: 0,
    risk_averse: 0,
    tech_enthusiast: 0,
    fast_track: 0
  };

  // === Q1: Why trading? ===
  if (data.whyTrading === 'curiosity') scores.zero_to_hero += 5;
  if (data.whyTrading === 'escape_9to5' || data.whyTrading === 'side_income') {
    scores.day_trader += 3;
    scores.swing_trader += 3;
  }
  if (data.whyTrading === 'wealth_building') scores.position_investor += 4;
  if (data.whyTrading === 'passion') scores.chart_master += 3;

  // === Q2: Risk tolerance ===
  if (data.riskTolerance === 'risk_averse') {
    scores.risk_averse += 10;
    scores.position_investor += 5;
  }
  if (data.riskTolerance === 'aggressive') {
    scores.day_trader += 5;
    scores.swing_trader += 3;
  }
  if (data.riskTolerance === 'calculated') {
    scores.swing_trader += 4;
    scores.chart_master += 3;
  }

  // === Q3: Trading style ===
  if (data.tradingStyle === 'day_trading') {
    scores.day_trader += 10;
  }
  if (data.tradingStyle === 'swing_trading') {
    scores.swing_trader += 10;
  }
  if (data.tradingStyle === 'position_trading') {
    scores.position_investor += 10;
  }
  if (data.tradingStyle === 'not_sure') {
    scores.zero_to_hero += 5;
  }

  // === Q4: Screen time ===
  if (data.screenTime === 'all_day') {
    scores.day_trader += 8;
  }
  if (data.screenTime === 'few_hours') {
    scores.swing_trader += 6;
  }
  if (data.screenTime === '30min' || data.screenTime === 'weekends') {
    scores.position_investor += 6;
    scores.risk_averse += 3;
  }

  // === Q5: Starting capital ===
  if (data.startingCapital === 'under_500') {
    scores.risk_averse += 5;
    scores.zero_to_hero += 3;
  }
  if (data.startingCapital === 'over_10000') {
    scores.position_investor += 3;
  }

  // === Q6: Main interests ===
  if (data.mainInterests?.includes('chart_patterns')) {
    scores.chart_master += 8;
    scores.swing_trader += 4;
  }
  if (data.mainInterests?.includes('fundamentals')) {
    scores.position_investor += 5;
  }
  if (data.mainInterests?.includes('quick_profits')) {
    scores.day_trader += 5;
  }
  if (data.mainInterests?.includes('passive_income')) {
    scores.position_investor += 6;
    scores.risk_averse += 3;
  }
  if (data.mainInterests?.includes('tech_tools')) {
    scores.tech_enthusiast += 10;
    scores.chart_master += 3;
  }

  // === Q9: Current knowledge ===
  if (data.currentKnowledge === 'zero') {
    scores.zero_to_hero += 10;
  }
  if (data.currentKnowledge === 'advanced') {
    scores.fast_track += 10;
  }

  // === Q10: Trading experience ===
  if (data.tradingExperience?.includes('none')) {
    scores.zero_to_hero += 5;
  }
  if (data.tradingExperience?.includes('lost_money')) {
    scores.risk_averse += 4;
    scores.zero_to_hero += 3;
  }
  if (data.tradingExperience?.includes('made_money') && 
      data.tradingExperience?.includes('real_traded')) {
    scores.fast_track += 7;
  }

  // === Q11: Sectors ===
  if (data.sectors?.includes('tech')) {
    scores.tech_enthusiast += 5;
  }

  // === Q12: Tools used ===
  if (data.toolsUsed === 'none') {
    scores.zero_to_hero += 4;
  }
  if (data.toolsUsed === 'charting' || data.toolsUsed === 'multiple') {
    scores.chart_master += 5;
    scores.fast_track += 3;
  }
  if (data.toolsUsed === 'scanners') {
    scores.tech_enthusiast += 4;
  }

  // === Q13: Timeline ===
  if (data.tradeTimeline === 'asap') {
    scores.day_trader += 3;
    scores.fast_track += 5;
  }
  if (data.tradeTimeline === 'exploring') {
    scores.zero_to_hero += 4;
  }

  // Determine winning path
  const pathScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  const winningPath = pathScores[0][0] as LearningPathType;
  
  console.log('Path Scores:', scores);
  console.log('Winner:', winningPath, 'with score', pathScores[0][1]);

  return winningPath;
}

/**
 * Learning path configurations with lesson codes
 */
export const PATH_LESSON_CONFIGS: Record<LearningPathType, PathLessonConfig> = {
  // PARCOURS 1: ZERO TO HERO - Débutants absolus
  zero_to_hero: {
    path: 'zero_to_hero',
    description: 'Parcours complet pour débutants absolus',
    totalLessons: 45,
    estimatedWeeks: 12,
    lessonCodes: [
      // Module 1: Introduction (ALL)
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
      // Module 2: Reading Charts (ALL)
      '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10',
      // Module 3: Orders (ALL)
      '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8',
      // Module 4: Support & Resistance (BASICS)
      '4.1', '4.2', '4.3', '4.4',
      // Module 5: Risk Management (ALL)
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
      // Module 6: Chart Patterns (BASICS ONLY)
      '6.1', '6.2', '6.4', '6.5',
      // Module 8: Indicators (BASICS)
      '8.1', '8.2', '8.3', '8.4', '8.5'
    ]
  },

  // PARCOURS 2: DAY TRADER - Trading actif intrajournée
  day_trader: {
    path: 'day_trader',
    description: 'Trading actif intrajournée',
    totalLessons: 42,
    estimatedWeeks: 10,
    lessonCodes: [
      // Module 1: Basics (FAST)
      '1.1', '1.2', '1.3', '1.8',
      // Module 2: Charts (ALL - crucial)
      '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10',
      // Module 3: Orders (ALL - execution matters)
      '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8',
      // Module 4: S/R (ESSENTIAL)
      '4.1', '4.2', '4.4', '4.7', '4.8',
      // Module 5: Risk (CRITICAL)
      '5.1', '5.2', '5.3', '5.4', '5.5',
      // Module 8: Indicators (KEY ONES)
      '8.1', '8.2', '8.3', '8.5', '8.6', '8.7'
    ]
  },

  // PARCOURS 3: SWING TRADER - Trades multi-jours
  swing_trader: {
    path: 'swing_trader',
    description: 'Trades multi-jours avec patterns',
    totalLessons: 48,
    estimatedWeeks: 11,
    lessonCodes: [
      // Module 1: ALL
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
      // Module 2: Charts (ALL)
      '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10',
      // Module 3: Orders (ALL)
      '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8',
      // Module 4: S/R (ALL - crucial for swing)
      '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8',
      // Module 5: Risk (ALL)
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
      // Module 6: Reversal Patterns (SELECTION)
      '6.1', '6.2', '6.4', '6.5',
      // Module 8: Indicators (MAIN ONES)
      '8.1', '8.2', '8.3', '8.4', '8.5'
    ]
  },

  // PARCOURS 4: POSITION INVESTOR - Long-term
  position_investor: {
    path: 'position_investor',
    description: 'Investissement long-terme',
    totalLessons: 35,
    estimatedWeeks: 9,
    lessonCodes: [
      // Module 1: ALL (fundamentals important)
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
      // Module 2: Charts (BASICS)
      '2.1', '2.2', '2.5', '2.6', '2.9',
      // Module 3: Orders (ESSENTIALS)
      '3.1', '3.2', '3.3', '3.6',
      // Module 4: S/R (BASICS)
      '4.1', '4.2', '4.3', '4.4',
      // Module 5: Risk (ALL - critical)
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
      // Module 8: Indicators (MAs ONLY)
      '8.1', '8.2', '8.3', '8.4'
    ]
  },

  // PARCOURS 5: CHART MASTER - Expert technique
  chart_master: {
    path: 'chart_master',
    description: 'Expert en analyse technique',
    totalLessons: 50,
    estimatedWeeks: 14,
    lessonCodes: [
      // Module 1: MINIMAL
      '1.1', '1.2', '1.3', '1.8',
      // Module 2: Charts (ALL)
      '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10',
      // Module 4: S/R (ALL)
      '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8',
      // Module 5: Risk (ESSENTIAL)
      '5.1', '5.2', '5.3', '5.4',
      // Module 6: Reversal (ALL)
      '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8',
      // Module 7: Continuation (KEY)
      '7.1', '7.2', '7.3', '7.4',
      // Module 8: Indicators (ALL)
      '8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9', '8.10'
    ]
  },

  // PARCOURS 6: RISK AVERSE - Conservateur
  risk_averse: {
    path: 'risk_averse',
    description: 'Approche conservatrice, sécurité avant tout',
    totalLessons: 32,
    estimatedWeeks: 8,
    lessonCodes: [
      // Module 1: ALL
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
      // Module 2: Charts (BASICS)
      '2.1', '2.2', '2.3', '2.5', '2.6', '2.9',
      // Module 3: Orders (PROTECTION FOCUS)
      '3.1', '3.2', '3.3', '3.4', '3.5', '3.7',
      // Module 4: S/R (BASICS)
      '4.1', '4.2', '4.3', '4.4',
      // Module 5: Risk (ALL - THE CORE)
      '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
      // Module 8: Indicators (MAs)
      '8.1', '8.2', '8.3', '8.4'
    ]
  },

  // PARCOURS 7: TECH ENTHUSIAST - Outils et automation
  tech_enthusiast: {
    path: 'tech_enthusiast',
    description: 'Focus sur les outils et l\'automation',
    totalLessons: 40,
    estimatedWeeks: 12,
    lessonCodes: [
      // Module 1: ALL
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
      // Module 2: Selection
      '2.1', '2.2', '2.5', '2.9',
      // Module 3: Essentials
      '3.1', '3.2', '3.3',
      // Module 4: Basics
      '4.1', '4.2',
      // Module 5: Core
      '5.1', '5.2', '5.3',
      // Module 8: Indicators (KEY)
      '8.1', '8.2', '8.5', '8.7',
      // Advanced modules
      '6.1', '6.2', '6.4',
      '7.1', '7.2',
      // Plus additional focus on tools
      '8.3', '8.4', '8.6', '8.8', '8.9', '8.10'
    ]
  },

  // PARCOURS 8: FAST TRACK - Utilisateurs avancés
  fast_track: {
    path: 'fast_track',
    description: 'Parcours accéléré pour utilisateurs avancés',
    totalLessons: 30,
    estimatedWeeks: 6,
    lessonCodes: [
      // SKIP Module 1 entirely
      // Module 2: Review rapide
      '2.2', '2.5', '2.9',
      // Module 4: S/R Review
      '4.4', '4.5', '4.7',
      // Module 5: Risk essentials
      '5.1', '5.2', '5.3',
      // Module 6-7: Patterns
      '6.1', '6.2', '6.4', '6.5',
      '7.1', '7.3', '7.5',
      // Module 8: Advanced indicators
      '8.5', '8.6', '8.7', '8.8', '8.9', '8.10',
      // Advanced strategies
      '3.4', '3.5', '3.6', '3.7', '3.8',
      '4.8'
    ]
  }
};

/**
 * Get path display name in French
 */
export function getPathDisplayName(path: LearningPathType): string {
  const names: Record<LearningPathType, string> = {
    zero_to_hero: 'Zero to Hero',
    day_trader: 'Day Trader',
    swing_trader: 'Swing Trader',
    position_investor: 'Investisseur',
    chart_master: 'Maître des Charts',
    risk_averse: 'Conservateur',
    tech_enthusiast: 'Tech Expert',
    fast_track: 'Fast Track'
  };
  return names[path] || path;
}

/**
 * Get path icon emoji
 */
export function getPathIcon(path: LearningPathType): string {
  const icons: Record<LearningPathType, string> = {
    zero_to_hero: '🚀',
    day_trader: '⚡',
    swing_trader: '🌊',
    position_investor: '🏔️',
    chart_master: '📊',
    risk_averse: '🛡️',
    tech_enthusiast: '🤖',
    fast_track: '🎯'
  };
  return icons[path] || '📚';
}
