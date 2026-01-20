-- Migration: Add 55+ diverse monthly badges
-- This migration adds a wide variety of monthly badges covering different categories, difficulty levels, and challenge types
-- Date: 2025-01-04

-- ========================================
-- CREATE BADGES TABLE (if not exists)
-- ========================================
-- Create badges table to store all badge definitions
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_badges_monthly ON public.badges(monthly);
CREATE INDEX IF NOT EXISTS idx_badges_category ON public.badges(category);
CREATE INDEX IF NOT EXISTS idx_badges_monthly_category ON public.badges(monthly, category);

-- Enable RLS
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view badges (public read)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'badges' 
    AND policyname = 'Anyone can view badges'
  ) THEN
    CREATE POLICY "Anyone can view badges" ON public.badges
      FOR SELECT USING (true);
  END IF;
END $$;

-- First, delete existing monthly badges to avoid duplicates (optional, comment out if you want to keep existing ones)
-- DELETE FROM badges WHERE monthly = true;

-- ========================================
-- BADGES MENSUELS - VARIÉTÉ COMPLÈTE
-- ========================================

-- ==================
-- CATÉGORIE: LEARNING (Apprentissage)
-- ==================

-- Easy (accessible à tous)
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Première Leçon du Mois', 'Complète ta première leçon ce mois', '🎯', 'lessons', 'count', 1, true),
('Curieux', 'Complète 5 leçons ce mois', '📚', 'lessons', 'count', 5, true),
('Score Parfait', 'Obtiens 100% sur une leçon ce mois', '💯', 'lessons', 'score', 1, true),

-- Medium
('Étudiant Régulier', 'Complète 15 leçons ce mois', '📖', 'lessons', 'count', 15, true),
('Perfectionniste', 'Obtiens 100% sur 5 leçons ce mois', '⭐', 'lessons', 'score', 5, true),
('Marathon du Savoir', 'Étudie 10 heures ce mois', '⏰', 'lessons', 'special', 10, true),

-- Hard
('Expert du Mois', 'Complète 30 leçons ce mois', '🎓', 'lessons', 'count', 30, true),
('Génie', 'Obtiens 100% sur 15 leçons ce mois', '🧠', 'lessons', 'score', 15, true),
('Maître Mensuel', 'Complète un module entier ce mois', '👑', 'lessons', 'special', 1, true);

-- ==================
-- CATÉGORIE: TRADING (Pratique)
-- ==================

-- Easy
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Premier Trade du Mois', 'Exécute ton premier trade ce mois', '💰', 'trading', 'count', 1, true),
('Trader Actif', 'Complète 10 simulations ce mois', '📊', 'trading', 'count', 10, true),
('Premier Profit Mensuel', 'Réalise un trade gagnant ce mois', '💵', 'trading', 'special', 1, true),

-- Medium
('Trader Régulier', 'Complète 25 simulations ce mois', '📈', 'trading', 'count', 25, true),
('Série Gagnante', 'Gagne 5 trades consécutifs ce mois', '🎯', 'trading', 'streak', 5, true),
('Gestion du Risque', 'Respecte ton stop-loss 15 fois', '🛡️', 'trading', 'special', 15, true),

-- Hard
('Trader Pro Mensuel', 'Complète 50 simulations ce mois', '💎', 'trading', 'count', 50, true),
('Win Rate Champion', 'Atteins 70% de win rate sur 30 trades', '🏆', 'trading', 'special', 30, true),
('Bull du Mois', 'Gagne 10 trades longs ce mois', '🐂', 'trading', 'special', 10, true),
('Bear du Mois', 'Gagne 10 trades courts ce mois', '🐻', 'trading', 'special', 10, true);

-- ==================
-- CATÉGORIE: STREAK (Régularité)
-- ==================

INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Bon Début', 'Série de 3 jours ce mois', '🔥', 'streak', 'streak', 3, true),
('Une Semaine', 'Série de 7 jours ce mois', '⚡', 'streak', 'streak', 7, true),
('Deux Semaines', 'Série de 14 jours ce mois', '💪', 'streak', 'streak', 14, true),
('Mois Parfait', 'Série de 30 jours ce mois', '👑', 'streak', 'streak', 30, true),
('Jamais Manqué', 'Aucun jour manqué ce mois', '💯', 'streak', 'special', 1, true);

-- ==================
-- CATÉGORIE: XP (Points)
-- ==================

-- Easy
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Premier 100', 'Gagne 100 XP ce mois', '⭐', 'xp', 'count', 100, true),
('500 Club', 'Gagne 500 XP ce mois', '🌟', 'xp', 'count', 500, true),

-- Medium
('1K Mensuel', 'Gagne 1,000 XP ce mois', '✨', 'xp', 'count', 1000, true),
('2K Champion', 'Gagne 2,000 XP ce mois', '💠', 'xp', 'count', 2000, true),

-- Hard
('5K Master', 'Gagne 5,000 XP ce mois', '💎', 'xp', 'count', 5000, true),
('10K Legend', 'Gagne 10,000 XP ce mois', '🏆', 'xp', 'count', 10000, true);

-- ==================
-- CATÉGORIE: SOCIAL (Communauté)
-- ==================

INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Nouveau Ami', 'Ajoute 1 ami ce mois', '👋', 'social', 'count', 1, true),
('Social du Mois', 'Ajoute 3 amis ce mois', '👥', 'social', 'count', 3, true),
('Compétiteur', 'Gagne 3 compétitions ce mois', '⚔️', 'social', 'special', 3, true),
('Champion Mensuel', 'Gagne 10 compétitions ce mois', '🏅', 'social', 'special', 10, true),
('Top 3 du Mois', 'Termine dans le top 3 de ton groupe', '🥉', 'social', 'special', 1, true),
('#1 du Mois', 'Termine #1 dans ton groupe', '👑', 'social', 'special', 1, true);

-- ==================
-- CATÉGORIE: SPÉCIAL (Challenges uniques)
-- ==================

-- Time-based
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Early Bird du Mois', 'Étudie avant 7h pendant 5 jours', '🌅', 'special', 'special', 5, true),
('Night Owl du Mois', 'Étudie après minuit pendant 5 jours', '🦉', 'special', 'special', 5, true),

-- Challenge-based
('Marathon Mensuel', 'Complète 10 leçons en une journée', '⚡', 'special', 'special', 10, true),
('Week-end Warrior', 'Complète 15 leçons les week-ends', '🎖️', 'special', 'special', 15, true),
('Flash Learner', 'Complète 5 leçons en moins de 2h', '💨', 'special', 'special', 5, true),

-- Consistency-based
('Tous les Jours', 'Apprends au moins 30 min chaque jour', '📅', 'special', 'special', 1, true),
('Week-end Studieux', 'Étudie tous les week-ends du mois', '📚', 'special', 'special', 4, true),

-- Exploration-based
('Explorateur', 'Essaie toutes les fonctionnalités', '🗺️', 'special', 'special', 1, true),
('Scanner Pro', 'Utilise le Scanner AI 20 fois', '🤖', 'special', 'special', 20, true),

-- Social/Community
('Bon Prof', 'Aide 3 amis avec leurs leçons', '👨‍🏫', 'special', 'special', 3, true),
('Motivateur', 'Encourage 5 amis à garder leur série', '💪', 'special', 'special', 5, true),

-- Performance-based
('Sans Faute', 'Termine 10 leçons avec 100%', '🎯', 'special', 'score', 10, true),
('Vitesse Éclair', 'Termine une leçon en moins de 5 min', '⚡', 'special', 'special', 1, true),

-- Milestone-based
('Comeback', 'Récupère après avoir perdu ta série', '🔄', 'special', 'special', 1, true),
('Nouveau Module', 'Commence un nouveau module ce mois', '🆕', 'special', 'special', 1, true);

-- ==================
-- CATÉGORIE: PROGRESSION (Niveaux)
-- ==================

INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Level Up', 'Monte d''un niveau ce mois', '📈', 'xp', 'special', 1, true),
('Double Level', 'Monte de 2 niveaux ce mois', '⬆️', 'xp', 'special', 2, true),
('Triple Threat', 'Monte de 3 niveaux ce mois', '🚀', 'xp', 'special', 3, true);

-- ==================
-- CATÉGORIE: ACHIEVEMENT COLLECTOR
-- ==================

INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, monthly) VALUES
('Premier Succès', 'Débloque ton premier succès ce mois', '🎁', 'special', 'special', 1, true),
('Collectionneur', 'Débloque 5 succès ce mois', '🏆', 'special', 'special', 5, true),
('Chasseur de Badges', 'Débloque 10 badges ce mois', '🎖️', 'special', 'special', 10, true);

-- ========================================
-- VERIFICATION
-- ========================================

-- Check total monthly badges (should be 55+)
-- SELECT COUNT(*) as total_monthly_badges FROM badges WHERE monthly = true;

-- See badges by category
-- SELECT category, COUNT(*) as count FROM badges WHERE monthly = true GROUP BY category ORDER BY count DESC;

-- See all monthly badges
-- SELECT name, category, requirement_value, icon FROM badges WHERE monthly = true ORDER BY category, requirement_value;
