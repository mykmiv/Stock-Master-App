import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  reward_xp: number;
  unlocked_at?: string;
}

export function useAchievements() {
  const { user, profile } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get all achievements
      const { data: allAchievements, error: achError } = await supabase
        .from('achievements')
        .select('*')
        .order('reward_xp', { ascending: false });

      if (achError) throw achError;

      // Get user's unlocked achievements
      const { data: userAchievements, error: userError } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id);

      if (userError) throw userError;

      const unlockedIds = new Set((userAchievements || []).map(ua => ua.achievement_id));

      const achievementsWithStatus = (allAchievements || []).map(ach => {
        const userAch = (userAchievements || []).find(ua => ua.achievement_id === ach.id);
        return {
          ...ach,
          unlocked_at: userAch?.unlocked_at,
        };
      });

      setAchievements(achievementsWithStatus);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndUnlockAchievements = useCallback(async (type: string, value: number) => {
    if (!user || !profile) return;

    try {
      // Get achievements that match the requirement
      const { data: matchingAchievements, error } = await supabase
        .from('achievements')
        .select('*')
        .contains('requirement', { type });

      if (error) throw error;

      for (const achievement of matchingAchievements || []) {
        const requirement = achievement.requirement as { type: string; count: number };
        
        if (requirement.type === type && value >= requirement.count) {
          // Check if already unlocked
          const { data: existing } = await supabase
            .from('user_achievements')
            .select('id')
            .eq('user_id', user.id)
            .eq('achievement_id', achievement.id)
            .single();

          if (!existing) {
            // Unlock achievement
            const { error: unlockError } = await supabase
              .from('user_achievements')
              .insert({
                user_id: user.id,
                achievement_id: achievement.id,
              });

            if (unlockError && unlockError.code !== '23505') throw unlockError;

            // Award XP
            if (achievement.reward_xp > 0) {
              // Update profile XP
              await supabase.rpc('increment', {
                row_id: profile.id,
                xp_amount: achievement.reward_xp,
              });
            }

            toast.success(`🏆 Achievement débloqué: ${achievement.name}!`);
            await fetchAchievements();
          }
        }
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }, [user, profile]);

  return {
    achievements,
    loading,
    checkAndUnlockAchievements,
    refetch: fetchAchievements,
  };
}
