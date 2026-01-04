-- Create XP transaction history table
CREATE TABLE public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL, -- 'lesson_completed', 'quiz_perfect', 'daily_goal', etc
  multiplier DECIMAL DEFAULT 1.0,
  final_amount INTEGER NOT NULL, -- amount × multiplier
  metadata JSONB DEFAULT '{}', -- Extra info (lesson_id, etc)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own XP transactions
CREATE POLICY "Users can view own xp transactions" ON public.xp_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own XP transactions  
CREATE POLICY "Users can insert own xp transactions" ON public.xp_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_xp_transactions_user ON public.xp_transactions(user_id, created_at DESC);
CREATE INDEX idx_xp_transactions_source ON public.xp_transactions(user_id, source);

-- Add level tracking columns to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS current_level INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS level_name TEXT DEFAULT 'Novice Trader',
  ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Beginner',
  ADD COLUMN IF NOT EXISTS weekly_xp INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS daily_xp INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_lessons_completed INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_quizzes_perfect INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;