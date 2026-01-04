-- Create league groups table (groups of 50 users competing weekly)
CREATE TABLE public.league_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league TEXT NOT NULL DEFAULT 'Bronze', -- Bronze, Silver, Gold, Platinum, Diamond, Masters, Grandmaster, Challenger
  week_number INTEGER NOT NULL,
  week_start_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user leagues table (user's league participation)
CREATE TABLE public.user_leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Current league info
  current_league TEXT NOT NULL DEFAULT 'Bronze',
  league_group_id UUID REFERENCES public.league_groups(id),
  league_rank INTEGER DEFAULT 50, -- Position in league (1-50)
  
  -- Weekly stats
  week_number INTEGER NOT NULL DEFAULT 1,
  week_start_date DATE,
  weekly_xp INTEGER DEFAULT 0,
  
  -- History
  highest_league_reached TEXT DEFAULT 'Bronze',
  total_promotions INTEGER DEFAULT 0,
  total_demotions INTEGER DEFAULT 0,
  weeks_participated INTEGER DEFAULT 0,
  total_top_3_finishes INTEGER DEFAULT 0,
  total_first_place_finishes INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.league_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_leagues ENABLE ROW LEVEL SECURITY;

-- Policies for league_groups (readable by all authenticated users)
CREATE POLICY "Anyone can view league groups" ON public.league_groups
  FOR SELECT USING (true);

-- Policies for user_leagues
CREATE POLICY "Users can view all league participants" ON public.user_leagues
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own league entry" ON public.user_leagues
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own league entry" ON public.user_leagues
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_leagues_user ON public.user_leagues(user_id);
CREATE INDEX idx_user_leagues_group ON public.user_leagues(league_group_id, weekly_xp DESC);
CREATE INDEX idx_user_leagues_league ON public.user_leagues(current_league, weekly_xp DESC);
CREATE INDEX idx_league_groups_active ON public.league_groups(is_active, week_number);

-- Function to get current week number
CREATE OR REPLACE FUNCTION public.get_current_week_number()
RETURNS INTEGER
LANGUAGE SQL
STABLE
AS $$
  SELECT EXTRACT(WEEK FROM CURRENT_DATE)::INTEGER + (EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER * 52);
$$;

-- Function to get week start date (Monday)
CREATE OR REPLACE FUNCTION public.get_week_start_date()
RETURNS DATE
LANGUAGE SQL
STABLE
AS $$
  SELECT DATE_TRUNC('week', CURRENT_DATE)::DATE;
$$;