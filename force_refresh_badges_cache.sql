-- Script pour forcer le rafraîchissement du cache PostgREST et vérifier les badges
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Vérifier que la table existe
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'badges';

-- 2. Vérifier les colonnes
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'badges'
ORDER BY ordinal_position;

-- 3. Vérifier les politiques RLS
SELECT 
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'badges';

-- 4. Compter les badges
SELECT 
  COUNT(*) as total_badges,
  COUNT(*) FILTER (WHERE monthly = true) as monthly_badges,
  COUNT(*) FILTER (WHERE monthly = false) as permanent_badges
FROM badges;

-- 5. Voir quelques badges mensuels
SELECT 
  name,
  icon,
  category,
  requirement_type,
  requirement_value,
  monthly
FROM badges
WHERE monthly = true
ORDER BY category, requirement_value
LIMIT 10;

-- 6. Forcer le rafraîchissement du cache PostgREST
-- Cette commande notifie PostgREST de rafraîchir son cache
NOTIFY pgrst, 'reload schema';

-- 7. Vérifier les index
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'badges'
AND schemaname = 'public';
