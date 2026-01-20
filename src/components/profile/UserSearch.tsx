import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { AvatarPreview, AvatarConfig } from './AvatarPreview';

interface SearchUser {
  id: string;
  username: string;
  display_name?: string;
  avatar_config: AvatarConfig | null;
  followers_count: number;
}

interface UserSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onUserFollowed?: () => void;
}

export function UserSearch({ isOpen, onClose, onUserFollowed }: UserSearchProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    
    const fetchFollowing = async () => {
      const { data } = await supabase
        .from('friendships')
        .select('friend_id')
        .eq('user_id', (await supabase.from('profiles').select('id').eq('user_id', user.id).single()).data?.id)
        .eq('status', 'accepted');
      
      if (data) {
        setFollowingIds(new Set(data.map(f => f.friend_id)));
      }
    };
    
    fetchFollowing();
  }, [user]);

  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_config, followers_count')
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .neq('id', profile.id)
        .limit(20);

      if (error) throw error;

      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    try {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) {
        toast.error('Profil non trouvé');
        return;
      }

      const { error } = await supabase
        .from('friendships')
        .insert({
          user_id: currentProfile.id,
          friend_id: userId,
          status: 'accepted'
        });

      if (error) {
        // If already following, unfollow
        if (error.code === '23505') {
          await supabase
            .from('friendships')
            .delete()
            .eq('user_id', currentProfile.id)
            .eq('friend_id', userId);
          
          setFollowingIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(userId);
            return newSet;
          });
          toast.success('Désabonné');
        } else {
          throw error;
        }
      } else {
        setFollowingIds(prev => new Set([...prev, userId]));
        toast.success('Abonné !');
        onUserFollowed?.();
      }
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Erreur lors de l\'abonnement');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Rechercher des utilisateurs</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom d'utilisateur..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchUsers(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CB0F6]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CB0F6] mx-auto"></div>
            </div>
          )}

          {!loading && searchResults.length === 0 && searchQuery.length >= 2 && (
            <div className="text-center py-8 text-gray-500">
              Aucun utilisateur trouvé
            </div>
          )}

          {!loading && searchQuery.length < 2 && (
            <div className="text-center py-8 text-gray-500">
              Tapez au moins 2 caractères pour rechercher
            </div>
          )}

          <div className="space-y-3">
            {searchResults.map((user) => {
              const isFollowing = followingIds.has(user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Avatar */}
                  <AvatarPreview config={user.avatar_config} size="small" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.display_name || user.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                    {user.followers_count > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {user.followers_count} abonné{user.followers_count > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-[#1CB0F6] text-white hover:bg-[#0A9BD6]'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check size={16} />
                        <span>Suivi</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        <span>Suivre</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

