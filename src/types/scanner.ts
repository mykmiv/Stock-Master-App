// Scanner types for AI chart analysis

export type TrendDirection = 'bullish' | 'bearish' | 'neutral';
export type RecommendationAction = 'buy' | 'hold' | 'sell' | 'watch';

export interface KeyLevels {
  entry?: number;
  stopLoss?: number;
  target?: number;
}

export interface Recommendation {
  action: RecommendationAction;
  confidence: number;
  reasoning: string;
  keyLevels: KeyLevels;
}

export interface FundamentalContext {
  marketCap?: string;
  peRatio?: number;
  sector?: string;
  recentNews?: {
    headline: string;
    source: string;
    url: string;
  }[];
}

export interface ChartAnalysisResult {
  ticker?: string;
  currentPrice?: number;
  priceChange?: number;
  priceChangePercent?: number;
  trend: TrendDirection;
  patterns: string[];
  supportLevels: number[];
  resistanceLevels: number[];
  volumeAnalysis: string;
  recommendation: Recommendation;
  educationalNotes: string[];
  fundamentals?: FundamentalContext;
  analyzedAt: string;
}

export interface ScanUsage {
  used: number;
  limit: number;
  remaining: number;
  isPremium: boolean;
}

export interface RecentScan {
  id: string;
  ticker?: string;
  trend: TrendDirection;
  confidence: number;
  imageUrl?: string;
  createdAt: string;
}
