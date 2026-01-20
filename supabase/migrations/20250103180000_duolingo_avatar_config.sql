-- Add Duolingo-exact avatar configuration support
-- This is the newest avatar system - CSS-based avatars that look exactly like Duolingo

-- Update default for new profiles to use Duolingo Avatar (exact Duolingo style)
CREATE OR REPLACE FUNCTION set_default_duolingo_avatar_config()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.avatar_config IS NULL THEN
    NEW.avatar_config := '{
      "skinColor": "#d08b5b",
      "hairStyle": "none",
      "hairColor": "#2c1b18",
      "eyeColor": "#2c1b18",
      "eyeStyle": "normal",
      "eyeExpression": "default",
      "glassesStyle": "none",
      "glassesColor": "#1cb0f6",
      "facialHair": "none",
      "hatStyle": "none",
      "shirtStyle": "tShirt",
      "shirtColor": "#ce82ff",
      "mouthStyle": "smile"
    }'::jsonb;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_default_avatar_config ON public.profiles;
CREATE TRIGGER trigger_set_default_avatar_config
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_default_duolingo_avatar_config();

-- Update comment to include Duolingo Avatar format
COMMENT ON COLUMN public.profiles.avatar_config IS 
'Avatar configuration in JSONB format. Supports multiple formats:
- Duolingo Avatar (NEWEST - Exact Duolingo Style): {"skinColor": "#d08b5b", "hairStyle": "none", "hairColor": "#...", "eyeColor": "#...", "eyeStyle": "normal", "glassesStyle": "none", "shirtStyle": "tShirt", "shirtColor": "#...", "mouthStyle": "smile", ...}
- Simple Custom (Duolingo SVG): {"skinColor": "#...", "hairType": "...", ...}
- Complex Custom (Layered SVG): {"face": "...", "skinTone": "...", ...}
- DiceBear: {"style": "avataaars", "seed": "...", ...}
- Legacy: old format with bodyShape, etc.

Default for new users: Duolingo Avatar with exact Duolingo style (CSS-based).';

