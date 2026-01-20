-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reward_claimed BOOLEAN DEFAULT FALSE,
  UNIQUE(referred_id)
);

-- Add referral stats to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS referrals_count INTEGER DEFAULT 0;

-- Function to update referral counts
CREATE OR REPLACE FUNCTION update_referral_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles SET referrals_count = referrals_count + 1 WHERE id = NEW.referrer_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.profiles SET referrals_count = referrals_count - 1 WHERE id = OLD.referrer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS referral_counts_trigger ON public.referrals;
CREATE TRIGGER referral_counts_trigger
AFTER INSERT OR DELETE ON public.referrals
FOR EACH ROW EXECUTE FUNCTION update_referral_counts();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON public.referrals(referred_id);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own referrals" ON public.referrals
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = referrals.referrer_id)
    OR auth.uid() = (SELECT user_id FROM public.profiles WHERE id = referrals.referred_id)
  );

CREATE POLICY "System can insert referrals" ON public.referrals
  FOR INSERT WITH CHECK (true);

