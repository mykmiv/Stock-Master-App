-- Update avatar_config to support DiceBear format
-- This migration ensures existing profiles can use both legacy and DiceBear formats

-- The avatar_config column already exists from previous migration
-- We just need to ensure it can store DiceBear config format

-- Example DiceBear config structure:
-- {
--   "style": "avataaars",
--   "seed": "user-id-or-random-string",
--   "skinColor": ["light"],
--   "hairColor": ["brown"],
--   "accessories": ["blank"],
--   "clothing": ["shirtCrewNeck"],
--   "clothingColor": ["blue01"],
--   "eyes": ["default"],
--   "eyebrows": ["default"],
--   "mouth": ["default"],
--   "top": ["shortHairShortFlat"],
--   "facialHair": ["blank"]
-- }

-- No schema changes needed as avatar_config is already JSONB
-- This migration is informational/documentation

COMMENT ON COLUMN public.profiles.avatar_config IS 
'Avatar configuration in JSONB format. Supports both legacy format and DiceBear format. 
DiceBear format includes: style (avataaars|bigSmile|lorelei|personas), seed, skinColor, hairColor, 
top, clothing, clothingColor, eyes, eyebrows, mouth, facialHair, accessories arrays.';

