-- Migration: StockMaster AI Complete Learning System
-- Extends existing tables and adds new gamification features

-- Extend lessons table with new fields
ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS module_id INTEGER,
ADD COLUMN IF NOT EXISTS day_number INTEGER,
ADD COLUMN IF NOT EXISTS lesson_number DECIMAL(3,1),
ADD COLUMN IF NOT EXISTS lesson_type VARCHAR(50) DEFAULT 'explanation',
ADD COLUMN IF NOT EXISTS content_json JSONB,
ADD COLUMN IF NOT EXISTS min_score_to_pass INTEGER DEFAULT 70,
ADD COLUMN IF NOT EXISTS coin_reward INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS unlock_requirement VARCHAR(255),
ADD COLUMN IF NOT EXISTS estimated_duration_minutes INTEGER DEFAULT 5;

-- Extend user_lesson_progress with new fields
ALTER TABLE public.user_lesson_progress
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'not_started',
ADD COLUMN IF NOT EXISTS attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add coins to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS coins INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_streak_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS lessons_completed INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS perfect_scores INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS user_level INTEGER DEFAULT 1;

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  achievement_data JSONB,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- Create user_stats table (can be merged with profiles, but keeping separate for clarity)
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  total_coins INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  perfect_scores INTEGER DEFAULT 0,
  last_lesson_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_module_day ON public.lessons(module_id, day_number, lesson_number);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_status ON public.user_lesson_progress(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_achievements_type ON public.user_achievements(user_id, achievement_type);

-- RLS Policies for new tables
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" ON public.user_achievements 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON public.user_stats 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.user_stats 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON public.user_stats 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_xp, total_coins, lessons_completed)
  SELECT 
    p.user_id,
    p.xp,
    p.coins,
    COUNT(ulp.id) FILTER (WHERE ulp.completed = true)
  FROM public.profiles p
  LEFT JOIN public.user_lesson_progress ulp ON ulp.user_id = p.user_id
  WHERE p.user_id = NEW.user_id
  GROUP BY p.user_id, p.xp, p.coins
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = EXCLUDED.total_xp,
    total_coins = EXCLUDED.total_coins,
    lessons_completed = EXCLUDED.lessons_completed,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

