-- Create push_subscriptions table for storing push notification subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, endpoint)
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own push subscriptions"
ON public.push_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own push subscriptions"
ON public.push_subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push subscriptions"
ON public.push_subscriptions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own push subscriptions"
ON public.push_subscriptions
FOR DELETE
USING (auth.uid() = user_id);

-- Add push notification preferences to user_settings
ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS push_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS push_daily_streak BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS push_lesson_completed BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS push_scanner_complete BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS push_portfolio_alerts BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS push_badge_unlocked BOOLEAN DEFAULT true;

-- Add trigger for updated_at on push_subscriptions
CREATE TRIGGER update_push_subscriptions_updated_at
BEFORE UPDATE ON public.push_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();