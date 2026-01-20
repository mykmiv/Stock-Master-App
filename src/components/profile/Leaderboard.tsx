import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AvatarPreview, AvatarConfig } from './AvatarPreview';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  display_name?: string;
  avatar_config: AvatarConfig | null;
  total_xp: number;
  weekly_xp: number;
  streak_days: number;
  rank: number;
}

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Leaderboard({ isOpen, onClose }: LeaderboardProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen, period]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let query;
      
      if (period === 'weekly') {
        query = supabase
          .from('profiles')
          .select('user_id, username, display_name, avatar_config, xp as total_xp, weekly_xp, streak_days')
          .not('weekly_xp', 'is', null)
          .gt('weekly_xp', 0)
          .order('weekly_xp', { ascending: false })
          .order('xp', { ascending: false })
          .limit(100);
      } else if (period === 'monthly') {
        query = supabase
          .from('profiles')
          .select('user_id, username, display_name, avatar_config, xp as total_xp, weekly_xp, streak_days')
          .not('weekly_xp', 'is', null)
          .gt('weekly_xp', 0)
          .order('weekly_xp', { ascending: false })
          .order('xp', { ascending: false })
          .limit(100);
      } else {
        query = supabase
          .from('profiles')
          .select('user_id, username, display_name, avatar_config, xp as total_xp, weekly_xp, streak_days')
          .not('xp', 'is', null)
          .gt('xp', 0)
          .order('xp', { ascending: false })
          .order('streak_days', { ascending: false })
          .limit(100);
      }

      const { data, error } = await query;

      if (error) throw error;

      const leaderboardEntries = (data || []).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

      setEntries(leaderboardEntries);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="w-6 h-6 text-gray-400" />;
    } else if (rank === 3) {
      return <Award className="w-6 h-6 text-amber-600" />;
    }
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
    return 'bg-white border-gray-200';
  };

  if (!isOpen) return null;

  const currentUserId = user?.id;
  const currentUserEntry = entries.find(e => e.user_id === currentUserId);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Classement</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 p-4 border-b">
          {(['weekly', 'monthly', 'alltime'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                period === p
                  ? 'bg-[#1CB0F6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p === 'weekly' ? 'Hebdomadaire' : p === 'monthly' ? 'Mensuel' : 'Tous les temps'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CB0F6] mx-auto"></div>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune entrée pour le moment
            </div>
          )}

          {/* Top 3 Podium */}
          {!loading && entries.length >= 3 && (
            <div className="flex items-end justify-center gap-2 mb-6">
              {/* 2nd Place */}
              <div className="flex-1 max-w-[120px] text-center">
                <div className="mb-2">
                  <Medal className="w-8 h-8 text-gray-400 mx-auto" />
                </div>
                <AvatarPreview
                  config={entries[1].avatar_config}
                  size="medium"
                  className="mx-auto mb-2"
                />
                <p className="font-semibold text-sm truncate">{entries[1].display_name || entries[1].username}</p>
                <p className="text-xs text-gray-500">{period === 'alltime' ? entries[1].total_xp : entries[1].weekly_xp} XP</p>
              </div>

              {/* 1st Place */}
              <div className="flex-1 max-w-[140px] text-center">
                <div className="mb-2">
                  <Trophy className="w-10 h-10 text-yellow-500 mx-auto" />
                </div>
                <AvatarPreview
                  config={entries[0].avatar_config}
                  size="large"
                  className="mx-auto mb-2"
                />
                <p className="font-semibold truncate">{entries[0].display_name || entries[0].username}</p>
                <p className="text-sm text-gray-500">{period === 'alltime' ? entries[0].total_xp : entries[0].weekly_xp} XP</p>
              </div>

              {/* 3rd Place */}
              <div className="flex-1 max-w-[120px] text-center">
                <div className="mb-2">
                  <Award className="w-8 h-8 text-amber-600 mx-auto" />
                </div>
                <AvatarPreview
                  config={entries[2].avatar_config}
                  size="medium"
                  className="mx-auto mb-2"
                />
                <p className="font-semibold text-sm truncate">{entries[2].display_name || entries[2].username}</p>
                <p className="text-xs text-gray-500">{period === 'alltime' ? entries[2].total_xp : entries[2].weekly_xp} XP</p>
              </div>
            </div>
          )}

          {/* Rest of the list */}
          <div className="space-y-2">
            {entries.slice(3).map((entry) => (
              <div
                key={entry.user_id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  entry.user_id === currentUserId
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {/* Rank */}
                <div className="w-8 text-center font-bold text-gray-600">
                  {entry.rank}
                </div>

                {/* Avatar */}
                <AvatarPreview config={entry.avatar_config} size="small" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {entry.display_name || entry.username}
                    {entry.user_id === currentUserId && (
                      <span className="ml-2 text-xs text-blue-600">(Vous)</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 truncate">@{entry.username}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>🔥 {entry.streak_days} jours</span>
                    <span>⚡ {period === 'alltime' ? entry.total_xp : entry.weekly_xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current User Position (if not in top 3) */}
          {currentUserEntry && currentUserEntry.rank > 3 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-300 bg-blue-50">
                <div className="w-8 text-center font-bold text-blue-600">
                  {currentUserEntry.rank}
                </div>
                <AvatarPreview config={currentUserEntry.avatar_config} size="small" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-blue-900 truncate">
                    {currentUserEntry.display_name || currentUserEntry.username}
                    <span className="ml-2 text-xs">(Vous)</span>
                  </p>
                  <div className="flex gap-4 text-xs text-blue-600 mt-1">
                    <span>🔥 {currentUserEntry.streak_days} jours</span>
                    <span>⚡ {period === 'alltime' ? currentUserEntry.total_xp : currentUserEntry.weekly_xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

