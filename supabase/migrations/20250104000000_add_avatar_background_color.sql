-- Add avatar_background_color column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_background_color TEXT;
