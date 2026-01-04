// Types for the StockMaster AI Learning System

export type StockyEmotion = 'happy' | 'teaching' | 'celebrating' | 'thinking' | 'encouraging' | 'explaining';

export type LessonType = 'explanation' | 'interactive' | 'quiz' | 'practice' | 'mixed' | 'simulation';

export type LessonStatus = 'not_started' | 'in_progress' | 'completed' | 'mastered';

export type LessonContentType = 
  | 'intro'
  | 'explanation'
  | 'multiple_choice'
  | 'chart_analysis'
  | 'drag_drop'
  | 'true_false'
  | 'simulation'
  | 'completion';

export interface ExplanationContent {
  type: 'explanation';
  stockyEmotion: StockyEmotion;
  title: string;
  speechBubbleText: string;
  visualAid?: {
    type: 'chart' | 'diagram' | 'animation' | 'image';
    src: string;
    annotations?: string[];
  };
  keyPoints: string[];
  continueButtonText: string;
}

export interface MultipleChoiceContent {
  type: 'multiple_choice';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

export interface ChartAnalysisContent {
  type: 'chart_analysis';
  instruction: string;
  chartData: {
    symbol: string;
    timeframe: string;
    data: OHLCV[];
  };
  task: {
    type: 'identify_pattern' | 'mark_support' | 'draw_trendline';
    correctAnswer: any;
  };
  hint?: string;
}

export interface DragDropContent {
  type: 'drag_drop';
  instruction: string;
  items: {
    id: string;
    content: string;
    correctMatchId: string;
  }[];
  targets: {
    id: string;
    label: string;
  }[];
}

export interface TrueFalseContent {
  type: 'true_false';
  statements: {
    id: string;
    text: string;
    isTrue: boolean;
    explanation: string;
  }[];
}

export interface SimulationContent {
  type: 'simulation';
  scenario: {
    description: string;
    initialBalance: number;
    availableStocks: StockData[];
  };
  task: string;
  successCriteria: {
    minProfit?: number;
    maxLoss?: number;
    requiredActions?: string[];
  };
  timeLimit?: number;
}

export interface IntroContent {
  type: 'intro';
  stockyEmotion: StockyEmotion;
  speechBubble: string;
  continueButtonText: string;
}

export interface CompletionContent {
  type: 'completion';
  stockyEmotion: StockyEmotion;
  speechBubble: string;
  summary: {
    correctAnswers: number;
    totalQuestions: number;
    xpEarned: number;
    coinsEarned: number;
  };
  nextLesson?: string;
}

export type LessonContent = 
  | IntroContent
  | ExplanationContent
  | MultipleChoiceContent
  | ChartAnalysisContent
  | DragDropContent
  | TrueFalseContent
  | SimulationContent
  | CompletionContent;

export interface Lesson {
  id: string;
  module_id: number;
  day_number: number;
  lesson_number: number;
  title: string;
  description: string | null;
  lesson_type: LessonType;
  content: LessonContent[];
  min_score_to_pass: number;
  xp_reward: number;
  coin_reward: number;
  is_locked: boolean;
  unlock_requirement: string | null;
  estimated_duration_minutes: number;
  created_at: string;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  score: number | null;
  attempts: number;
  time_spent_seconds: number;
  completed_at: string | null;
  last_accessed: string;
}

export interface LessonWithProgress extends Lesson {
  progress: UserLessonProgress | null;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
}

export interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Achievement {
  id: string;
  achievement_type: string;
  achievement_data: any;
  earned_at: string;
}

export interface UserStats {
  total_xp: number;
  total_coins: number;
  current_streak_days: number;
  longest_streak_days: number;
  lessons_completed: number;
  perfect_scores: number;
  last_lesson_date: string | null;
}

export interface LevelInfo {
  level: number;
  xpRequired: number;
  title: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, xpRequired: 0, title: 'Beginner Trader' },
  { level: 2, xpRequired: 100, title: 'Novice Trader' },
  { level: 3, xpRequired: 250, title: 'Apprentice Trader' },
  { level: 4, xpRequired: 500, title: 'Intermediate Trader' },
  { level: 5, xpRequired: 1000, title: 'Advanced Trader' },
  { level: 6, xpRequired: 2000, title: 'Expert Trader' },
  { level: 7, xpRequired: 4000, title: 'Master Trader' },
  { level: 8, xpRequired: 8000, title: 'Pro Trader' },
  { level: 9, xpRequired: 15000, title: 'Elite Trader' },
  { level: 10, xpRequired: 25000, title: 'Trading Legend' },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xp: 50,
    coins: 25
  },
  {
    id: 'perfect_week',
    title: 'Perfect Week',
    description: '7-day streak',
    icon: '🔥',
    xp: 200,
    coins: 100
  },
  {
    id: 'chart_master',
    title: 'Chart Master',
    description: 'Complete all chart analysis lessons with 100%',
    icon: '📊',
    xp: 500,
    coins: 250
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    xp: 100,
    coins: 50
  },
  {
    id: 'comeback_kid',
    title: 'Comeback Kid',
    description: 'Return after 7 days away',
    icon: '💪',
    xp: 75,
    coins: 40
  }
] as const;

