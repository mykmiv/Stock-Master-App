import { supabase } from '@/integrations/supabase/client';

// All 57 monthly badges data
const MONTHLY_BADGES = [
  // LEARNING (9 badges)
  { name: 'Première Leçon du Mois', description: 'Complète ta première leçon ce mois', icon: '🎯', category: 'lessons', requirement_type: 'count', requirement_value: 1, monthly: true },
  { name: 'Curieux', description: 'Complète 5 leçons ce mois', icon: '📚', category: 'lessons', requirement_type: 'count', requirement_value: 5, monthly: true },
  { name: 'Score Parfait', description: 'Obtiens 100% sur une leçon ce mois', icon: '💯', category: 'lessons', requirement_type: 'score', requirement_value: 1, monthly: true },
  { name: 'Étudiant Régulier', description: 'Complète 15 leçons ce mois', icon: '📖', category: 'lessons', requirement_type: 'count', requirement_value: 15, monthly: true },
  { name: 'Perfectionniste', description: 'Obtiens 100% sur 5 leçons ce mois', icon: '⭐', category: 'lessons', requirement_type: 'score', requirement_value: 5, monthly: true },
  { name: 'Marathon du Savoir', description: 'Étudie 10 heures ce mois', icon: '⏰', category: 'lessons', requirement_type: 'special', requirement_value: 10, monthly: true },
  { name: 'Expert du Mois', description: 'Complète 30 leçons ce mois', icon: '🎓', category: 'lessons', requirement_type: 'count', requirement_value: 30, monthly: true },
  { name: 'Génie', description: 'Obtiens 100% sur 15 leçons ce mois', icon: '🧠', category: 'lessons', requirement_type: 'score', requirement_value: 15, monthly: true },
  { name: 'Maître Mensuel', description: 'Complète un module entier ce mois', icon: '👑', category: 'lessons', requirement_type: 'special', requirement_value: 1, monthly: true },

  // TRADING (10 badges)
  { name: 'Premier Trade du Mois', description: 'Exécute ton premier trade ce mois', icon: '💰', category: 'trading', requirement_type: 'count', requirement_value: 1, monthly: true },
  { name: 'Trader Actif', description: 'Complète 10 simulations ce mois', icon: '📊', category: 'trading', requirement_type: 'count', requirement_value: 10, monthly: true },
  { name: 'Premier Profit Mensuel', description: 'Réalise un trade gagnant ce mois', icon: '💵', category: 'trading', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Trader Régulier', description: 'Complète 25 simulations ce mois', icon: '📈', category: 'trading', requirement_type: 'count', requirement_value: 25, monthly: true },
  { name: 'Série Gagnante', description: 'Gagne 5 trades consécutifs ce mois', icon: '🎯', category: 'trading', requirement_type: 'streak', requirement_value: 5, monthly: true },
  { name: 'Gestion du Risque', description: 'Respecte ton stop-loss 15 fois', icon: '🛡️', category: 'trading', requirement_type: 'special', requirement_value: 15, monthly: true },
  { name: 'Trader Pro Mensuel', description: 'Complète 50 simulations ce mois', icon: '💎', category: 'trading', requirement_type: 'count', requirement_value: 50, monthly: true },
  { name: 'Win Rate Champion', description: 'Atteins 70% de win rate sur 30 trades', icon: '🏆', category: 'trading', requirement_type: 'special', requirement_value: 30, monthly: true },
  { name: 'Bull du Mois', description: 'Gagne 10 trades longs ce mois', icon: '🐂', category: 'trading', requirement_type: 'special', requirement_value: 10, monthly: true },
  { name: 'Bear du Mois', description: 'Gagne 10 trades courts ce mois', icon: '🐻', category: 'trading', requirement_type: 'special', requirement_value: 10, monthly: true },

  // STREAK (5 badges)
  { name: 'Bon Début', description: 'Série de 3 jours ce mois', icon: '🔥', category: 'streak', requirement_type: 'streak', requirement_value: 3, monthly: true },
  { name: 'Une Semaine', description: 'Série de 7 jours ce mois', icon: '⚡', category: 'streak', requirement_type: 'streak', requirement_value: 7, monthly: true },
  { name: 'Deux Semaines', description: 'Série de 14 jours ce mois', icon: '💪', category: 'streak', requirement_type: 'streak', requirement_value: 14, monthly: true },
  { name: 'Mois Parfait', description: 'Série de 30 jours ce mois', icon: '👑', category: 'streak', requirement_type: 'streak', requirement_value: 30, monthly: true },
  { name: 'Jamais Manqué', description: 'Aucun jour manqué ce mois', icon: '💯', category: 'streak', requirement_type: 'special', requirement_value: 1, monthly: true },

  // XP (9 badges)
  { name: 'Premier 100', description: 'Gagne 100 XP ce mois', icon: '⭐', category: 'xp', requirement_type: 'count', requirement_value: 100, monthly: true },
  { name: '500 Club', description: 'Gagne 500 XP ce mois', icon: '🌟', category: 'xp', requirement_type: 'count', requirement_value: 500, monthly: true },
  { name: '1K Mensuel', description: 'Gagne 1,000 XP ce mois', icon: '✨', category: 'xp', requirement_type: 'count', requirement_value: 1000, monthly: true },
  { name: '2K Champion', description: 'Gagne 2,000 XP ce mois', icon: '💠', category: 'xp', requirement_type: 'count', requirement_value: 2000, monthly: true },
  { name: '5K Master', description: 'Gagne 5,000 XP ce mois', icon: '💎', category: 'xp', requirement_type: 'count', requirement_value: 5000, monthly: true },
  { name: '10K Legend', description: 'Gagne 10,000 XP ce mois', icon: '🏆', category: 'xp', requirement_type: 'count', requirement_value: 10000, monthly: true },
  { name: 'Level Up', description: 'Monte d\'un niveau ce mois', icon: '📈', category: 'xp', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Double Level', description: 'Monte de 2 niveaux ce mois', icon: '⬆️', category: 'xp', requirement_type: 'special', requirement_value: 2, monthly: true },
  { name: 'Triple Threat', description: 'Monte de 3 niveaux ce mois', icon: '🚀', category: 'xp', requirement_type: 'special', requirement_value: 3, monthly: true },

  // SOCIAL (6 badges)
  { name: 'Nouveau Ami', description: 'Ajoute 1 ami ce mois', icon: '👋', category: 'social', requirement_type: 'count', requirement_value: 1, monthly: true },
  { name: 'Social du Mois', description: 'Ajoute 3 amis ce mois', icon: '👥', category: 'social', requirement_type: 'count', requirement_value: 3, monthly: true },
  { name: 'Compétiteur', description: 'Gagne 3 compétitions ce mois', icon: '⚔️', category: 'social', requirement_type: 'special', requirement_value: 3, monthly: true },
  { name: 'Champion Mensuel', description: 'Gagne 10 compétitions ce mois', icon: '🏅', category: 'social', requirement_type: 'special', requirement_value: 10, monthly: true },
  { name: 'Top 3 du Mois', description: 'Termine dans le top 3 de ton groupe', icon: '🥉', category: 'social', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: '#1 du Mois', description: 'Termine #1 dans ton groupe', icon: '👑', category: 'social', requirement_type: 'special', requirement_value: 1, monthly: true },

  // SPECIAL (18 badges)
  { name: 'Early Bird du Mois', description: 'Étudie avant 7h pendant 5 jours', icon: '🌅', category: 'special', requirement_type: 'special', requirement_value: 5, monthly: true },
  { name: 'Night Owl du Mois', description: 'Étudie après minuit pendant 5 jours', icon: '🦉', category: 'special', requirement_type: 'special', requirement_value: 5, monthly: true },
  { name: 'Marathon Mensuel', description: 'Complète 10 leçons en une journée', icon: '⚡', category: 'special', requirement_type: 'special', requirement_value: 10, monthly: true },
  { name: 'Week-end Warrior', description: 'Complète 15 leçons les week-ends', icon: '🎖️', category: 'special', requirement_type: 'special', requirement_value: 15, monthly: true },
  { name: 'Flash Learner', description: 'Complète 5 leçons en moins de 2h', icon: '💨', category: 'special', requirement_type: 'special', requirement_value: 5, monthly: true },
  { name: 'Tous les Jours', description: 'Apprends au moins 30 min chaque jour', icon: '📅', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Week-end Studieux', description: 'Étudie tous les week-ends du mois', icon: '📚', category: 'special', requirement_type: 'special', requirement_value: 4, monthly: true },
  { name: 'Explorateur', description: 'Essaie toutes les fonctionnalités', icon: '🗺️', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Scanner Pro', description: 'Utilise le Scanner AI 20 fois', icon: '🤖', category: 'special', requirement_type: 'special', requirement_value: 20, monthly: true },
  { name: 'Bon Prof', description: 'Aide 3 amis avec leurs leçons', icon: '👨‍🏫', category: 'special', requirement_type: 'special', requirement_value: 3, monthly: true },
  { name: 'Motivateur', description: 'Encourage 5 amis à garder leur série', icon: '💪', category: 'special', requirement_type: 'special', requirement_value: 5, monthly: true },
  { name: 'Sans Faute', description: 'Termine 10 leçons avec 100%', icon: '🎯', category: 'special', requirement_type: 'score', requirement_value: 10, monthly: true },
  { name: 'Vitesse Éclair', description: 'Termine une leçon en moins de 5 min', icon: '⚡', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Comeback', description: 'Récupère après avoir perdu ta série', icon: '🔄', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Nouveau Module', description: 'Commence un nouveau module ce mois', icon: '🆕', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Premier Succès', description: 'Débloque ton premier succès ce mois', icon: '🎁', category: 'special', requirement_type: 'special', requirement_value: 1, monthly: true },
  { name: 'Collectionneur', description: 'Débloque 5 succès ce mois', icon: '🏆', category: 'special', requirement_type: 'special', requirement_value: 5, monthly: true },
  { name: 'Chasseur de Badges', description: 'Débloque 10 badges ce mois', icon: '🎖️', category: 'special', requirement_type: 'special', requirement_value: 10, monthly: true },
];

export async function seedBadges() {
  console.log('🌱 Starting badge seeding...');

  try {
    // Check if badges already exist
    const { data: existingBadges, error: checkError } = await supabase
      .from('badges')
      .select('id')
      .limit(1);

    if (checkError) {
      // If table doesn't exist, that's okay - we'll try to create badges anyway
      console.warn('⚠️ Could not check existing badges (table might not exist yet):', checkError.message);
    }

    if (existingBadges && existingBadges.length > 0) {
      console.log('✅ Badges already exist, skipping seed...');
      return { success: true, message: 'Badges already seeded', count: 0 };
    }

    console.log('📝 No badges found, creating 57 badges...');

    // Insert all badges
    const { data, error } = await supabase
      .from('badges')
      .insert(MONTHLY_BADGES)
      .select();

    if (error) {
      console.error('❌ Error inserting badges:', error);
      throw error;
    }

    console.log('✅ Successfully created', data?.length, 'badges!');
    return { success: true, message: 'Badges created successfully', count: data?.length || 0 };

  } catch (error: any) {
    console.error('❌ Seed failed:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

export async function needsSeeding() {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('id')
      .limit(1);

    if (error) {
      console.warn('⚠️ Error checking if seeding needed:', error.message);
      // If table doesn't exist, we need seeding
      return true;
    }

    return !data || data.length === 0;
  } catch (error: any) {
    console.warn('⚠️ Error in needsSeeding:', error.message);
    return true;
  }
}
