-- Drop old table and recreate with new structure for 17 questions
DROP TABLE IF EXISTS public.onboarding_data;

CREATE TABLE public.onboarding_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  
  -- Q1-17
  has_traded TEXT,                    -- Q1
  age_range TEXT,                     -- Q2
  primary_goal TEXT,                  -- Q3
  income_source TEXT,                 -- Q4
  financial_situation TEXT,           -- Q5
  money_obstacle TEXT,                -- Q6
  retirement_plan TEXT,               -- Q7
  trading_knowledge TEXT,             -- Q8
  main_fear TEXT,                     -- Q9
  trading_interest TEXT,              -- Q10
  company_interest TEXT,              -- Q11
  uses_tools TEXT,                    -- Q12
  income_goal TEXT,                   -- Q13
  revenue_usage TEXT,                 -- Q14
  ready_to_start TEXT,                -- Q15
  specific_goals TEXT,                -- Q16
  time_available TEXT,                -- Q17
  
  -- Meta
  preparation_score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.onboarding_data ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Indexes
CREATE INDEX idx_onboarding_user ON public.onboarding_data(user_id);
CREATE INDEX idx_onboarding_completed ON public.onboarding_data(completed_at);