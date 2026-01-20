export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'lessons' | 'trading' | 'streak' | 'xp' | 'social' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement_type: 'count' | 'streak' | 'score' | 'special';
  requirement_value: number;
  xp_reward: number;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface AchievementCategory {
  name: string;
  icon: string;
  color: string;
  totalAchievements: number;
  completedAchievements: number;
}
