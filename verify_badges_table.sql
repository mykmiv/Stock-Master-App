-- Script pour vérifier que la table badges existe et est accessible
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Vérifier l'existence de la table
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'badges';

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
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'badges';

-- 4. Compter les badges
SELECT 
  COUNT(*) as total_badges,
  COUNT(*) FILTER (WHERE monthly = true) as monthly_badges,
  COUNT(*) FILTER (WHERE monthly = false) as permanent_badges
FROM badges;

-- 5. Voir quelques badges
SELECT 
  id,
  name,
  icon,
  category,
  monthly
FROM badges
LIMIT 5;

-- 6. Vérifier les permissions de la table
SELECT 
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND table_name = 'badges';
