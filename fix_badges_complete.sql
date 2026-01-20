-- Script COMPLET pour résoudre le problème des badges
-- Exécutez ce script dans Supabase SQL Editor en une seule fois

-- ========================================
-- ÉTAPE 1: VÉRIFIER ET CRÉER LA TABLE
-- ========================================

-- Supprimer la table si elle existe (pour repartir de zéro)
DROP TABLE IF EXISTS public.badges CASCADE;

-- Créer la table badges
CREATE TABLE public.badges (
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

-- ========================================
-- ÉTAPE 2: CRÉER LES INDEX
-- ========================================

CREATE INDEX idx_badges_monthly ON public.badges(monthly);
CREATE INDEX idx_badges_category ON public.badges(category);
CREATE INDEX idx_badges_monthly_category ON public.badges(monthly, category);

-- ========================================
-- ÉTAPE 3: CONFIGURER RLS
-- ========================================

-- Activer RLS
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les anciennes politiques
DROP POLICY IF EXISTS "Anyone can view badges" ON public.badges;
DROP POLICY IF EXISTS "Public can view badges" ON public.badges;
DROP POLICY IF EXISTS "Authenticated can view badges" ON public.badges;
DROP POLICY IF EXISTS "Service role can view badges" ON public.badges;
DROP POLICY IF EXISTS "anon can view badges" ON public.badges;
DROP POLICY IF EXISTS "authenticated can view badges" ON public.badges;

-- Créer les nouvelles politiques RLS (très permissives pour les badges publics)
CREATE POLICY "Public read access for badges"
ON public.badges
FOR SELECT
TO public
USING (true);

-- Permettre aussi aux rôles spécifiques
CREATE POLICY "anon can read badges"
ON public.badges
FOR SELECT
TO anon
USING (true);

CREATE POLICY "authenticated can read badges"
ON public.badges
FOR SELECT
TO authenticated
USING (true);

-- ========================================
-- ÉTAPE 4: GRANT PERMISSIONS EXPLICITES
-- ========================================

-- Donner les permissions SELECT à tous les rôles
GRANT SELECT ON public.badges TO anon;
GRANT SELECT ON public.badges TO authenticated;
GRANT SELECT ON public.badges TO service_role;

-- ========================================
-- ÉTAPE 5: INSÉRER LES 57 BADGES MENSUELS
-- ========================================

INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
-- LEARNING
('Première Leçon du Mois', 'Complète ta première leçon ce mois', '🎯', 'lessons', 'count', 1, true),
('Curieux', 'Complète 5 leçons ce mois', '📚', 'lessons', 'count', 5, true),
('Score Parfait', 'Obtiens 100% sur une leçon ce mois', '💯', 'lessons', 'score', 1, true),
('Étudiant Régulier', 'Complète 15 leçons ce mois', '📖', 'lessons', 'count', 15, true),
('Perfectionniste', 'Obtiens 100% sur 5 leçons ce mois', '⭐', 'lessons', 'score', 5, true),
('Marathon du Savoir', 'Étudie 10 heures ce mois', '⏰', 'lessons', 'special', 10, true),
('Expert du Mois', 'Complète 30 leçons ce mois', '🎓', 'lessons', 'count', 30, true),
('Génie', 'Obtiens 100% sur 15 leçons ce mois', '🧠', 'lessons', 'score', 15, true),
('Maître Mensuel', 'Complète un module entier ce mois', '👑', 'lessons', 'special', 1, true),

-- TRADING
('Premier Trade du Mois', 'Exécute ton premier trade ce mois', '💰', 'trading', 'count', 1, true),
('Trader Actif', 'Complète 10 simulations ce mois', '📊', 'trading', 'count', 10, true),
('Premier Profit Mensuel', 'Réalise un trade gagnant ce mois', '💵', 'trading', 'special', 1, true),
('Trader Régulier', 'Complète 25 simulations ce mois', '📈', 'trading', 'count', 25, true),
('Série Gagnante', 'Gagne 5 trades consécutifs ce mois', '🎯', 'trading', 'streak', 5, true),
('Gestion du Risque', 'Respecte ton stop-loss 15 fois', '🛡️', 'trading', 'special', 15, true),
('Trader Pro Mensuel', 'Complète 50 simulations ce mois', '💎', 'trading', 'count', 50, true),
('Win Rate Champion', 'Atteins 70% de win rate sur 30 trades', '🏆', 'trading', 'special', 30, true),
('Bull du Mois', 'Gagne 10 trades longs ce mois', '🐂', 'trading', 'special', 10, true),
('Bear du Mois', 'Gagne 10 trades courts ce mois', '🐻', 'trading', 'special', 10, true),

-- STREAK
('Bon Début', 'Série de 3 jours ce mois', '🔥', 'streak', 'streak', 3, true),
('Une Semaine', 'Série de 7 jours ce mois', '⚡', 'streak', 'streak', 7, true),
('Deux Semaines', 'Série de 14 jours ce mois', '💪', 'streak', 'streak', 14, true),
('Mois Parfait', 'Série de 30 jours ce mois', '👑', 'streak', 'streak', 30, true),
('Jamais Manqué', 'Aucun jour manqué ce mois', '💯', 'streak', 'special', 1, true),

-- XP
('Premier 100', 'Gagne 100 XP ce mois', '⭐', 'xp', 'count', 100, true),
('500 Club', 'Gagne 500 XP ce mois', '🌟', 'xp', 'count', 500, true),
('1K Mensuel', 'Gagne 1,000 XP ce mois', '✨', 'xp', 'count', 1000, true),
('2K Champion', 'Gagne 2,000 XP ce mois', '💠', 'xp', 'count', 2000, true),
('5K Master', 'Gagne 5,000 XP ce mois', '💎', 'xp', 'count', 5000, true),
('10K Legend', 'Gagne 10,000 XP ce mois', '🏆', 'xp', 'count', 10000, true),

-- SOCIAL
('Nouveau Ami', 'Ajoute 1 ami ce mois', '👋', 'social', 'count', 1, true),
('Social du Mois', 'Ajoute 3 amis ce mois', '👥', 'social', 'count', 3, true),
('Compétiteur', 'Gagne 3 compétitions ce mois', '⚔️', 'social', 'special', 3, true),
('Champion Mensuel', 'Gagne 10 compétitions ce mois', '🏅', 'social', 'special', 10, true),
('Top 3 du Mois', 'Termine dans le top 3 de ton groupe', '🥉', 'social', 'special', 1, true),
('#1 du Mois', 'Termine #1 dans ton groupe', '👑', 'social', 'special', 1, true),

-- SPÉCIAL
('Early Bird du Mois', 'Étudie avant 7h pendant 5 jours', '🌅', 'special', 'special', 5, true),
('Night Owl du Mois', 'Étudie après minuit pendant 5 jours', '🦉', 'special', 'special', 5, true),
('Marathon Mensuel', 'Complète 10 leçons en une journée', '⚡', 'special', 'special', 10, true),
('Week-end Warrior', 'Complète 15 leçons les week-ends', '🎖️', 'special', 'special', 15, true),
('Flash Learner', 'Complète 5 leçons en moins de 2h', '💨', 'special', 'special', 5, true),
('Tous les Jours', 'Apprends au moins 30 min chaque jour', '📅', 'special', 'special', 1, true),
('Week-end Studieux', 'Étudie tous les week-ends du mois', '📚', 'special', 'special', 4, true),
('Explorateur', 'Essaie toutes les fonctionnalités', '🗺️', 'special', 'special', 1, true),
('Scanner Pro', 'Utilise le Scanner AI 20 fois', '🤖', 'special', 'special', 20, true),
('Bon Prof', 'Aide 3 amis avec leurs leçons', '👨‍🏫', 'special', 'special', 3, true),
('Motivateur', 'Encourage 5 amis à garder leur série', '💪', 'special', 'special', 5, true),
('Sans Faute', 'Termine 10 leçons avec 100%', '🎯', 'special', 'score', 10, true),
('Vitesse Éclair', 'Termine une leçon en moins de 5 min', '⚡', 'special', 'special', 1, true),
('Comeback', 'Récupère après avoir perdu ta série', '🔄', 'special', 'special', 1, true),
('Nouveau Module', 'Commence un nouveau module ce mois', '🆕', 'special', 'special', 1, true),
('Level Up', 'Monte d''un niveau ce mois', '📈', 'xp', 'special', 1, true),
('Double Level', 'Monte de 2 niveaux ce mois', '⬆️', 'xp', 'special', 2, true),
('Triple Threat', 'Monte de 3 niveaux ce mois', '🚀', 'xp', 'special', 3, true),
('Premier Succès', 'Débloque ton premier succès ce mois', '🎁', 'special', 'special', 1, true),
('Collectionneur', 'Débloque 5 succès ce mois', '🏆', 'special', 'special', 5, true),
('Chasseur de Badges', 'Débloque 10 badges ce mois', '🎖️', 'special', 'special', 10, true);

-- ========================================
-- ÉTAPE 6: VÉRIFICATION
-- ========================================

-- Vérifier le nombre de badges
SELECT 
  COUNT(*) as total_badges,
  COUNT(*) FILTER (WHERE monthly = true) as monthly_badges
FROM badges;

-- Vérifier les permissions
SELECT 
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND table_name = 'badges';

-- Vérifier les politiques RLS
SELECT 
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'badges';

-- ========================================
-- ÉTAPE 7: FORCER LE RAFRAÎCHISSEMENT DU CACHE
-- ========================================

-- Notifier PostgREST de rafraîchir le cache
NOTIFY pgrst, 'reload schema';

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE '✅ Table badges recréée avec succès!';
  RAISE NOTICE '✅ 57 badges mensuels insérés!';
  RAISE NOTICE '✅ Permissions et RLS configurés!';
  RAISE NOTICE '✅ Cache PostgREST notifié pour rafraîchissement!';
  RAISE NOTICE '';
  RAISE NOTICE '🔄 Attendez 30 secondes puis rafraîchissez votre application (F5).';
END $$;
