export interface OnboardingData {
  // Q1-15 trading-focused responses
  whyTrading: string;             // Q1 - Pourquoi le trading
  riskTolerance: string;          // Q2 - Niveau de risque
  tradingStyle: string;           // Q3 - Style de trading
  screenTime: string;             // Q4 - Temps devant écrans
  startingCapital: string;        // Q5 - Capital de départ
  mainInterests: string[];        // Q6 - Intérêts (multi-select)
  stockTypes: string[];           // Q7 - Types d'actions (multi-select)
  biggestChallenge: string;       // Q8 - Plus grand défi
  currentKnowledge: string;       // Q9 - Connaissance actuelle
  tradingExperience: string[];    // Q10 - Expérience (multi-select)
  sectors: string[];              // Q11 - Secteurs (multi-select, max 3)
  toolsUsed: string;              // Q12 - Outils utilisés
  tradeTimeline: string;          // Q13 - Timeline premier trade
  mainMotivation: string;         // Q14 - Motivation principale
  notificationPrefs: string[];    // Q15 - Notifications (multi-select)
  
  // Calculated
  preparationScore?: number;
}

export interface OnboardingQuestion {
  id: keyof OnboardingData;
  title: string;
  subtitle?: string;
  options: OnboardingOption[];
  multiSelect?: boolean;
  maxSelection?: number;
  hasReassurance?: boolean;
}

export interface OnboardingOption {
  value: string;
  icon: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface FactScreenData {
  id: string;
  type: 'trading_reality' | 'with_without_education' | 'ai_scanner' | 'success_timeline';
  duration: number;
  title?: string;
  subtitle?: string;
}

// Flow item can be either a question or a fact screen
export type OnboardingFlowItem = 
  | { type: 'question'; questionId: keyof OnboardingData }
  | { type: 'fact'; factId: string };
