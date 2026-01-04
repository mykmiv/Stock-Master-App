-- Create table for onboarding data
CREATE TABLE public.onboarding_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  experience_level TEXT,
  primary_goal TEXT,
  time_available TEXT,
  budget_range TEXT,
  main_fear TEXT,
  learning_styles TEXT[],
  market_interests TEXT[],
  age_range TEXT,
  income_goal TEXT,
  notifications_preference TEXT,
  notification_time TEXT,
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