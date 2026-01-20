-- Migration: Fix RLS policies for badges table
-- This ensures that badges are visible to all users (authenticated and anonymous)
-- Date: 2025-01-05

-- Enable RLS if not already enabled
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view badges" ON public.badges;
DROP POLICY IF EXISTS "Public can view badges" ON public.badges;
DROP POLICY IF EXISTS "Authenticated can view badges" ON public.badges;

-- Create policy to allow authenticated users to view badges
CREATE POLICY "Authenticated can view badges"
ON public.badges
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow anonymous users to view badges (for public badges)
CREATE POLICY "Public can view badges"
ON public.badges
FOR SELECT
TO anon
USING (true);

-- Also allow service role (for backend operations)
CREATE POLICY "Service role can view badges"
ON public.badges
FOR SELECT
TO service_role
USING (true);

-- Verification query (uncomment to run):
-- SELECT COUNT(*) as total_badges FROM badges WHERE monthly = true;
