-- Script pour vérifier et créer la table badges si nécessaire
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Vérifier si la table existe
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'badges'
) AS table_exists;

-- 2. Si la table n'existe pas, créez-la
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT NOT NULL CHECK (category IN ('streak', 'lessons', 'xp', 'trading', 'social', 'special')),
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('count', 'streak', 'score', 'special')),
  requirement_value INTEGER NOT NULL,
  monthly BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Créer les index
CREATE INDEX IF NOT EXISTS idx_badges_monthly ON public.badges(monthly);
CREATE INDEX IF NOT EXISTS idx_badges_category ON public.badges(category);
CREATE INDEX IF NOT EXISTS idx_badges_monthly_category ON public.badges(monthly, category);

-- 4. Activer RLS
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- 5. Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Anyone can view badges" ON public.badges;
DROP POLICY IF EXISTS "Public can view badges" ON public.badges;
DROP POLICY IF EXISTS "Authenticated can view badges" ON public.badges;
DROP POLICY IF EXISTS "Service role can view badges" ON public.badges;

-- 6. Créer les nouvelles politiques RLS
CREATE POLICY "Authenticated can view badges"
ON public.badges
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Public can view badges"
ON public.badges
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Service role can view badges"
ON public.badges
FOR SELECT
TO service_role
USING (true);

-- 7. Vérifier que la table existe maintenant
SELECT COUNT(*) as total_badges FROM badges;

-- 8. Si la table est vide, exécutez ensuite la migration 20250104000003_add_diverse_monthly_badges.sql
-- pour insérer les 57 badges mensuels
