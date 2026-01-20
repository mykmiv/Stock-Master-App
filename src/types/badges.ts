export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'lessons' | 'xp' | 'trading' | 'social';
  requirement_type: 'count' | 'streak' | 'achievement';
  requirement_value: number;
  monthly: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  progress: number;
  earned_at: string | null;
  earned_month: string | null;
  created_at: string;
}

export interface BadgeWithProgress extends Badge {
  progress: number;
  earned: boolean;
  earned_at: string | null;
}
