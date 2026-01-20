import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AvatarPreview, AvatarConfig } from './AvatarPreview';

interface Follower {
  id: string;
  username: string;
  display_name?: string;
  avatar_config: AvatarConfig | null;
  total_xp: number;
  streak_days: number;
}

interface FollowersListProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'followers' | 'following';
}

export function FollowersList({ isOpen, onClose, type }: FollowersListProps) {
  const { user } = useAuth();
  const [users, setUsers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      fetchUsers();
    }
  }, [isOpen, user, type]);

  const fetchUsers = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) return;

      let query;
      if (type === 'followers') {
        // Get users who follow me
        query = supabase
          .from('friendships')
          .select(`
            user:profiles!friendships_user_id_fkey(
              id, username, display_name, avatar_config, xp as total_xp, streak_days
            )
          `)
          .eq('friend_id', currentProfile.id)
          .eq('status', 'accepted');
      } else {
        // Get users I follow
        query = supabase
          .from('friendships')
          .select(`
            friend:profiles!friendships_friend_id_fkey(
              id, username, display_name, avatar_config, xp as total_xp, streak_days
            )
          `)
          .eq('user_id', currentProfile.id)
          .eq('status', 'accepted');
      }

      const { data, error } = await query;

      if (error) throw error;

      const usersList = (data || []).map(item => {
        const userData = type === 'followers' ? (item as any).user : (item as any).friend;
        return {
          id: userData.id,
          username: userData.username,
          display_name: userData.display_name,
          avatar_config: userData.avatar_config,
          total_xp: userData.total_xp || 0,
          streak_days: userData.streak_days || 0,
        };
      });

      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId: string) => {
    if (!user) return;

    try {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) return;

      const { error } = await supabase
        .from('friendships')
        .delete()
        .eq('user_id', currentProfile.id)
        .eq('friend_id', userId);

      if (error) throw error;

      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('Désabonné');
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Erreur lors du désabonnement');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            {type === 'followers' ? 'Abonnés' : 'Abonnements'} ({users.length})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CB0F6] mx-auto"></div>
            </div>
          )}

          {!loading && users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {type === 'followers' ? 'Aucun abonné pour le moment' : 'Vous ne suivez personne pour le moment'}
            </div>
          )}

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <AvatarPreview config={user.avatar_config} size="medium" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.display_name || user.username}
                  </p>
                  <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>🔥 {user.streak_days} jours</span>
                    <span>⚡ {user.total_xp} XP</span>
                  </div>
                </div>

                {/* Unfollow Button (only for following list) */}
                {type === 'following' && (
                  <button
                    onClick={() => handleUnfollow(user.id)}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                  >
                    Se désabonner
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

