-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  requirement JSONB,
  reward_xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON public.user_achievements(achievement_id);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert predefined achievements
INSERT INTO public.achievements (id, name, description, icon, requirement, reward_xp) VALUES
  ('first_lesson', 'Première Leçon', 'Complète ta première leçon', '🎓', '{"type": "lessons_completed", "count": 1}'::jsonb, 50),
  ('week_warrior', 'Guerrier de la Semaine', 'Maintiens une série de 7 jours', '🔥', '{"type": "streak_days", "count": 7}'::jsonb, 100),
  ('month_master', 'Maître du Mois', 'Maintiens une série de 30 jours', '👑', '{"type": "streak_days", "count": 30}'::jsonb, 500),
  ('xp_hunter', 'Chasseur d''XP', 'Atteins 1000 XP', '⚡', '{"type": "total_xp", "count": 1000}'::jsonb, 200),
  ('xp_master', 'Maître d''XP', 'Atteins 5000 XP', '🌟', '{"type": "total_xp", "count": 5000}'::jsonb, 500),
  ('social_butterfly', 'Papillon Social', 'Suit 10 utilisateurs', '🦋', '{"type": "following_count", "count": 10}'::jsonb, 150),
  ('perfectionist', 'Perfectionniste', 'Obtiens 100% sur 10 leçons', '⭐', '{"type": "perfect_lessons", "count": 10}'::jsonb, 300),
  ('early_bird', 'Lève-tôt', 'Connecte-toi 7 jours consécutifs avant 8h', '🌅', '{"type": "early_login_streak", "count": 7}'::jsonb, 100),
  ('night_owl', 'Oiseau de Nuit', 'Apprends 7 soirs consécutifs après 22h', '🦉', '{"type": "night_study_streak", "count": 7}'::jsonb, 100),
  ('speed_demon', 'Démon de la Vitesse', 'Complète 5 leçons en une journée', '🚀', '{"type": "lessons_in_day", "count": 5}'::jsonb, 150),
  ('referral_king', 'Roi des Parrainages', 'Parraine 5 amis', '👥', '{"type": "referrals", "count": 5}'::jsonb, 500),
  ('learner', 'Apprenant', 'Complète 10 leçons', '📚', '{"type": "lessons_completed", "count": 10}'::jsonb, 200),
  ('scholar', 'Érudit', 'Complète 50 leçons', '🎓', '{"type": "lessons_completed", "count": 50}'::jsonb, 500),
  ('dedicated', 'Dédié', 'Maintiens une série de 14 jours', '💪', '{"type": "streak_days", "count": 14}'::jsonb, 200),
  ('legendary', 'Légendaire', 'Maintiens une série de 100 jours', '🏆', '{"type": "streak_days", "count": 100}'::jsonb, 2000)
ON CONFLICT (id) DO NOTHING;

