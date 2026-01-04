-- Drop existing onboarding_data table and recreate with new trading-focused schema
DROP TABLE IF EXISTS public.onboarding_data;

-- Create new onboarding_data table with trading-focused fields
CREATE TABLE public.onboarding_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  
  -- Q1: Why trading?
  why_trading TEXT,
  
  -- Q2: Risk tolerance
  risk_tolerance TEXT,
  
  -- Q3: Trading style
  trading_style TEXT,
  
  -- Q4: Screen time
  screen_time TEXT,
  
  -- Q5: Starting capital
  starting_capital TEXT,
  
  -- Q6: Main interests (multi-select)
  main_interests TEXT[],
  
  -- Q7: Stock types (multi-select)
  stock_types TEXT[],
  
  -- Q8: Biggest challenge
  biggest_challenge TEXT,
  
  -- Q9: Current knowledge
  current_knowledge TEXT,
  
  -- Q10: Experience (multi-select)
  trading_experience TEXT[],
  
  -- Q11: Sectors (multi-select, max 3)
  sectors TEXT[],
  
  -- Q12: Tools used
  tools_used TEXT,
  
  -- Q13: Timeline for first trade
  trade_timeline TEXT,
  
  -- Q14: Main motivation
  main_motivation TEXT,
  
  -- Q15: Notification preferences (multi-select)
  notification_prefs TEXT[],
  
  -- Calculated/metadata
  preparation_score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.onboarding_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own onboarding data"
  ON public.onboarding_data
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding data"
  ON public.onboarding_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data"
  ON public.onboarding_data
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_onboarding_data_user_id ON public.onboarding_data(user_id);
CREATE INDEX idx_onboarding_data_completed_at ON public.onboarding_data(completed_at);