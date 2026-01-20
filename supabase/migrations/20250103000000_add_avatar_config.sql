-- Add avatar_config column to profiles table for avatar customization
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_config JSONB DEFAULT NULL;

-- Add display_name column for user display name
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT DEFAULT NULL;

-- Add friend_code column for friend system
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS friend_code TEXT UNIQUE DEFAULT NULL;

-- Create function to generate friend code on profile creation
CREATE OR REPLACE FUNCTION generate_friend_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 6-character alphanumeric code
    code := UPPER(
      SUBSTRING(
        MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)
        FROM 1 FOR 6
      )
    );
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE friend_code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate friend code on profile creation
CREATE OR REPLACE FUNCTION set_friend_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.friend_code IS NULL THEN
    NEW.friend_code := generate_friend_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_set_friend_code ON public.profiles;
CREATE TRIGGER trigger_set_friend_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_friend_code();

-- Update existing profiles to have friend codes
UPDATE public.profiles 
SET friend_code = generate_friend_code()
WHERE friend_code IS NULL;

