export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface FriendProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  current_streak?: number;
  streak_days?: number;
}

export interface FriendLeaderboard {
  friend: FriendProfile;
  rank: number;
  streak: number;
}
