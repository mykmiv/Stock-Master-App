import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { UserStats } from '@/types/lesson.types';

export function useUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      // Get stats from user_stats table or fallback to profiles
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is ok
        throw statsError;
      }

      if (statsData) {
        setStats(statsData);
      } else {
        // Fallback to profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('xp, coins, streak_days, lessons_completed, perfect_scores')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setStats({
            total_xp: profile.xp || 0,
            total_coins: profile.coins || 0,
            current_streak_days: profile.streak_days || 0,
            longest_streak_days: profile.streak_days || 0,
            lessons_completed: profile.lessons_completed || 0,
            perfect_scores: profile.perfect_scores || 0,
            last_lesson_date: null,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from('user_stats')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        await supabase
          .from('user_stats')
          .update(updateData)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('user_stats')
          .insert({
            user_id: user.id,
            ...updateData,
          });
      }

      await fetchStats();
    } catch (error) {
      console.error('Error updating stats:', error);
      throw error;
    }
  };

  return {
    stats,
    isLoading,
    updateStats,
    refreshStats: fetchStats,
  };
}

