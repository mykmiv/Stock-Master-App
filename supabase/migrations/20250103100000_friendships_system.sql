-- Create friendships table
CREATE TABLE IF NOT EXISTS public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'accepted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON public.friendships(status);

-- Add followers/following counts to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

-- Function to update friendship counts
CREATE OR REPLACE FUNCTION update_friendship_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'accepted' THEN
    UPDATE public.profiles SET following_count = following_count + 1 WHERE id = NEW.user_id;
    UPDATE public.profiles SET followers_count = followers_count + 1 WHERE id = NEW.friend_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'accepted' AND NEW.status = 'accepted' THEN
      UPDATE public.profiles SET following_count = following_count + 1 WHERE id = NEW.user_id;
      UPDATE public.profiles SET followers_count = followers_count + 1 WHERE id = NEW.friend_id;
    ELSIF OLD.status = 'accepted' AND NEW.status != 'accepted' THEN
      UPDATE public.profiles SET following_count = following_count - 1 WHERE id = NEW.user_id;
      UPDATE public.profiles SET followers_count = followers_count - 1 WHERE id = NEW.friend_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'accepted' THEN
    UPDATE public.profiles SET following_count = following_count - 1 WHERE id = OLD.user_id;
    UPDATE public.profiles SET followers_count = followers_count - 1 WHERE id = OLD.friend_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS friendship_counts_trigger ON public.friendships;
CREATE TRIGGER friendship_counts_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.friendships
FOR EACH ROW EXECUTE FUNCTION update_friendship_counts();

-- Enable RLS
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view friendships they are part of" ON public.friendships
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = friendships.user_id) 
                 OR auth.uid() = (SELECT user_id FROM public.profiles WHERE id = friendships.friend_id));

CREATE POLICY "Users can create friendships" ON public.friendships
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = friendships.user_id));

CREATE POLICY "Users can update their own friendships" ON public.friendships
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = friendships.user_id));

CREATE POLICY "Users can delete their own friendships" ON public.friendships
  FOR DELETE USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = friendships.user_id));

