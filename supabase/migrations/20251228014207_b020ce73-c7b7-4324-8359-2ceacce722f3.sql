-- Table user_settings for storing user preferences
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  theme TEXT CHECK (theme IN ('light', 'dark', 'system')) DEFAULT 'system',
  language TEXT DEFAULT 'en',
  date_format TEXT DEFAULT 'MM/DD/YYYY',
  compact_mode BOOLEAN DEFAULT false,
  animations_enabled BOOLEAN DEFAULT true,
  show_xp_in_header BOOLEAN DEFAULT true,
  
  -- Email notifications
  email_daily_streak BOOLEAN DEFAULT true,
  email_new_lesson BOOLEAN DEFAULT false,
  email_weekly_summary BOOLEAN DEFAULT true,
  email_scanner_complete BOOLEAN DEFAULT true,
  email_portfolio_alerts BOOLEAN DEFAULT true,
  email_badge_unlocked BOOLEAN DEFAULT true,
  email_marketing BOOLEAN DEFAULT false,
  
  -- In-app notifications
  desktop_notifications BOOLEAN DEFAULT true,
  sound_effects BOOLEAN DEFAULT true,
  
  -- Scanner preferences
  confidence_threshold INTEGER DEFAULT 70,
  auto_fetch_prices BOOLEAN DEFAULT true,
  include_fundamentals BOOLEAN DEFAULT true,
  include_news BOOLEAN DEFAULT true,
  save_scan_history BOOLEAN DEFAULT true,
  history_retention_days INTEGER DEFAULT 30,
  
  -- Trading preferences
  starting_cash DECIMAL(12,2) DEFAULT 100000,
  default_order_type TEXT DEFAULT 'market',
  confirm_before_trade BOOLEAN DEFAULT true,
  show_pnl_mode TEXT DEFAULT 'both',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table notifications for in-app notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('success', 'info', 'warning', 'achievement')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  action_label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications" ON public.notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Index for performance
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read, created_at DESC);

-- Add bio, trading_goals, risk_tolerance to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS trading_goals TEXT DEFAULT 'learning',
ADD COLUMN IF NOT EXISTS risk_tolerance TEXT DEFAULT 'moderate';

-- Update handle_new_user function to also create user_settings
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username');
  
  -- Create portfolio with starting capital
  INSERT INTO public.portfolios (user_id)
  VALUES (NEW.id);
  
  -- Create default watchlist
  INSERT INTO public.watchlists (user_id, name)
  VALUES (NEW.id, 'My Watchlist');
  
  -- Create user settings with defaults
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$function$;

-- Trigger for updating updated_at on user_settings
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();