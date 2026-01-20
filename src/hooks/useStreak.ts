import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useStreak() {
  const { user, profile, refreshProfile } = useAuth();

  const updateStreak = useCallback(async () => {
    if (!user || !profile) return;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastActivityDate = profile.last_activity_date
        ? new Date(profile.last_activity_date)
        : null;

      if (!lastActivityDate) {
        // First activity
        await supabase
          .from('profiles')
          .update({
            streak_days: 1,
            last_activity_date: today.toISOString().split('T')[0]
          })
          .eq('user_id', user.id);
        
        await refreshProfile();
        return;
      }

      lastActivityDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Already updated today
        return;
      }

      let newStreak = profile.streak_days || 0;

      if (daysDiff === 1) {
        // Consecutive day
        newStreak += 1;
      } else if (daysDiff > 1) {
        // Streak broken
        newStreak = 1;
        toast.info('Nouvelle série commencée !');
      }

      // Update longest streak if needed
      const longestStreak = Math.max((profile as any).longest_streak || 0, newStreak);

      await supabase
        .from('profiles')
        .update({
          streak_days: newStreak,
          longest_streak: longestStreak,
          last_activity_date: today.toISOString().split('T')[0]
        })
        .eq('user_id', user.id);

      await refreshProfile();

      // Celebrate milestones
      if (newStreak === 7) {
        toast.success('🔥 Série de 7 jours !');
      } else if (newStreak === 30) {
        toast.success('👑 Série de 30 jours !');
      } else if (newStreak === 100) {
        toast.success('🏆 Série légendaire de 100 jours !');
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, [user, profile, refreshProfile]);

  useEffect(() => {
    // Update streak when user completes an activity
    // This should be called from lesson completion, etc.
  }, []);

  return {
    updateStreak,
    currentStreak: profile?.streak_days || 0,
  };
}

