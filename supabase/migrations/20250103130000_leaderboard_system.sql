-- Add columns to profiles for leaderboard stats
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS weekly_xp_start_date DATE,
ADD COLUMN IF NOT EXISTS monthly_xp_start_date DATE;

-- Create function to reset weekly XP
CREATE OR REPLACE FUNCTION reset_weekly_xp()
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET weekly_xp = 0,
      weekly_xp_start_date = CURRENT_DATE
  WHERE weekly_xp_start_date IS NULL 
     OR weekly_xp_start_date < CURRENT_DATE - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Create function to get leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(period TEXT, limit_count INTEGER DEFAULT 100)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_config JSONB,
  total_xp INTEGER,
  weekly_xp INTEGER,
  streak_days INTEGER,
  rank BIGINT
) AS $$
BEGIN
  IF period = 'weekly' THEN
    RETURN QUERY
    SELECT 
      p.user_id,
      p.username,
      p.display_name,
      p.avatar_config,
      p.xp as total_xp,
      p.weekly_xp,
      p.streak_days,
      ROW_NUMBER() OVER (ORDER BY p.weekly_xp DESC, p.xp DESC) as rank
    FROM public.profiles p
    WHERE p.weekly_xp > 0
    ORDER BY p.weekly_xp DESC, p.xp DESC
    LIMIT limit_count;
  ELSIF period = 'monthly' THEN
    RETURN QUERY
    SELECT 
      p.user_id,
      p.username,
      p.display_name,
      p.avatar_config,
      p.xp as total_xp,
      p.weekly_xp,
      p.streak_days,
      ROW_NUMBER() OVER (ORDER BY p.weekly_xp DESC, p.xp DESC) as rank
    FROM public.profiles p
    WHERE p.monthly_xp_start_date >= DATE_TRUNC('month', CURRENT_DATE)
    ORDER BY p.weekly_xp DESC, p.xp DESC
    LIMIT limit_count;
  ELSE -- alltime
    RETURN QUERY
    SELECT 
      p.user_id,
      p.username,
      p.display_name,
      p.avatar_config,
      p.xp as total_xp,
      p.weekly_xp,
      p.streak_days,
      ROW_NUMBER() OVER (ORDER BY p.xp DESC, p.streak_days DESC) as rank
    FROM public.profiles p
    WHERE p.xp > 0
    ORDER BY p.xp DESC, p.streak_days DESC
    LIMIT limit_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

