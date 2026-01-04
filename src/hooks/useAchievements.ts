import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Achievement, ACHIEVEMENTS } from '@/types/lesson.types';
import { toast } from 'sonner';

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAchievements = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const checkAndAwardAchievement = async (
    achievementId: string,
    condition: boolean
  ) => {
    if (!user || !condition) return false;

    try {
      // Check if already earned
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', user.id)
        .eq('achievement_type', achievementId)
        .single();

      if (existing) return false; // Already earned

      // Find achievement config
      const achievementConfig = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievementConfig) return false;

      // Award achievement
      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_type: achievementId,
          achievement_data: {
            title: achievementConfig.title,
            description: achievementConfig.description,
            icon: achievementConfig.icon,
          }
        });

      if (error) throw error;

      // Award XP and coins
      const { data: profile } = await supabase
        .from('profiles')
        .select('xp, coins')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            xp: (profile.xp || 0) + achievementConfig.xp,
            coins: (profile.coins || 0) + achievementConfig.coins,
          })
          .eq('user_id', user.id);
      }

      // Show notification
      toast.success(`🏅 Achievement Débloqué: ${achievementConfig.title}!`, {
        description: achievementConfig.description,
        duration: 5000,
      });

      await fetchAchievements();
      return true;
    } catch (error) {
      console.error('Error awarding achievement:', error);
      return false;
    }
  };

  const checkAchievements = async (stats: {
    lessonsCompleted?: number;
    perfectScores?: number;
    streakDays?: number;
    totalXP?: number;
    lessonsToday?: number;
  }) => {
    if (!user) return;

    // First lesson
    if (stats.lessonsCompleted === 1) {
      await checkAndAwardAchievement('first_lesson', true);
    }

    // Perfect week (7-day streak)
    if (stats.streakDays === 7) {
      await checkAndAwardAchievement('perfect_week', true);
    }

    // Speed demon (5 lessons in one day)
    if (stats.lessonsToday && stats.lessonsToday >= 5) {
      await checkAndAwardAchievement('speed_demon', true);
    }

    // XP milestones
    if (stats.totalXP && stats.totalXP >= 1000) {
      // Could add more XP-based achievements
    }
  };

  return {
    achievements,
    isLoading,
    checkAndAwardAchievement,
    checkAchievements,
    refreshAchievements: fetchAchievements,
  };
}

