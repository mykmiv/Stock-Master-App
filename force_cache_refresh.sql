-- Script pour forcer le rafraîchissement du cache PostgREST
-- Exécutez ce script dans Supabase SQL Editor

-- Méthode 1: Notifier PostgREST de rafraîchir le cache
NOTIFY pgrst, 'reload schema';

-- Méthode 2: Vérifier que la table est bien accessible
SELECT 
  'Table exists' as status,
  COUNT(*) as badge_count
FROM badges;

-- Méthode 3: Vérifier les politiques RLS
SELECT 
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'badges';

-- Si vous voyez les résultats ci-dessus, la table existe bien
-- Le problème est uniquement le cache PostgREST qui doit être rafraîchi
