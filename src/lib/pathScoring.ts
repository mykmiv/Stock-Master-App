import { OnboardingData } from '@/types/onboarding';
import { LearningPathType } from './learningPathLogic';

export interface PathScores {
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
 * Calculate scores for all paths based on onboarding responses
 */
export function calculateAllPathScores(data: OnboardingData): PathScores {
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

  return scores;
}

/**
 * Calculate match percentage for a specific path
 */
export function calculateMatchScore(
  data: OnboardingData,
  pathType: LearningPathType
): number {
  const scores = calculateAllPathScores(data);
  const maxScore = Math.max(...Object.values(scores));
  const pathScore = scores[pathType];
  
  if (maxScore === 0) return 0;
  
  // Convert to percentage
  const percentage = Math.round((pathScore / maxScore) * 100);
  return percentage;
}

/**
 * Get reasoning text explaining why a path was recommended
 */
export function getReasoningText(
  data: OnboardingData,
  pathType: LearningPathType
): string {
  const reasons: string[] = [];
  
  if (pathType === 'zero_to_hero') {
    if (data.currentKnowledge === 'zero') {
      reasons.push("Tu débutes complètement");
    }
    if (data.tradingExperience?.includes('none')) {
      reasons.push("aucune expérience de trading");
    }
    if (data.tradingStyle === 'not_sure') {
      reasons.push("tu explores encore ton style");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil débutant'} - ce parcours te guidera pas à pas depuis zéro jusqu'à ton premier trade profitable! 🎯`;
  }
  
  if (pathType === 'day_trader') {
    if (data.tradingStyle === 'day_trading') {
      reasons.push("Tu veux faire du day trading");
    }
    if (data.screenTime === 'all_day') {
      reasons.push("tu as du temps devant les écrans");
    }
    if (data.mainInterests?.includes('quick_profits')) {
      reasons.push("tu cherches des profits rapides");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil actif'} - ce parcours te formera aux stratégies de trading actif intrajournée! ⚡`;
  }
  
  if (pathType === 'swing_trader') {
    if (data.tradingStyle === 'swing_trading') {
      reasons.push("Tu veux faire du swing trading");
    }
    if (data.screenTime === 'few_hours') {
      reasons.push("tu as quelques heures par jour");
    }
    if (data.mainInterests?.includes('chart_patterns')) {
      reasons.push("tu t'intéresses aux patterns");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil équilibré'} - ce parcours te permettra de trader efficacement avec un équilibre vie pro/perso! 📈`;
  }
  
  if (pathType === 'position_investor') {
    if (data.tradingStyle === 'position_trading') {
      reasons.push("Tu veux investir long-terme");
    }
    if (data.mainInterests?.includes('passive_income')) {
      reasons.push("tu cherches du revenu passif");
    }
    if (data.riskTolerance === 'risk_averse') {
      reasons.push("tu préfères limiter les risques");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil investisseur'} - ce parcours te montrera comment construire un portfolio solide! 💼`;
  }
  
  if (pathType === 'chart_master') {
    if (data.mainInterests?.includes('chart_patterns')) {
      reasons.push("Tu es passionné par les patterns");
    }
    if (data.toolsUsed === 'charting' || data.toolsUsed === 'multiple') {
      reasons.push("tu utilises déjà des outils de charting");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil technique'} - ce parcours fera de toi un expert en analyse technique! 🎯`;
  }
  
  if (pathType === 'risk_averse') {
    if (data.riskTolerance === 'risk_averse') {
      reasons.push("Tu es prudent avec le risque");
    }
    if (data.startingCapital === 'under_500') {
      reasons.push("tu as un petit capital de départ");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil prudent'} - ce parcours mettra la sécurité de ton capital en priorité! 🛡️`;
  }
  
  if (pathType === 'tech_enthusiast') {
    if (data.mainInterests?.includes('tech_tools')) {
      reasons.push("Tu es intéressé par les outils tech");
    }
    if (data.sectors?.includes('tech')) {
      reasons.push("tu aimes le secteur tech");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil tech'} - ce parcours te montrera comment automatiser ton trading! 🤖`;
  }
  
  if (pathType === 'fast_track') {
    if (data.currentKnowledge === 'advanced') {
      reasons.push("Tu as déjà des connaissances avancées");
    }
    if (data.tradingExperience?.includes('made_money')) {
      reasons.push("tu as déjà fait des profits");
    }
    if (data.tradeTimeline === 'asap') {
      reasons.push("tu veux progresser rapidement");
    }
    
    return `${reasons.length > 0 ? reasons.join(', ') : 'Profil avancé'} - ce parcours t'amènera directement au niveau expert! 🚀`;
  }
  
  return "Ce parcours correspond bien à ton profil!";
}
