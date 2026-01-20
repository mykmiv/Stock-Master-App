import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { BadgeWithProgress } from '@/types/badges';
import { BadgeDetailModal } from './MonthlyBadges';
import { supabase } from '@/integrations/supabase/client';

interface AllBadgesModalProps {
  userId: string;
  onClose: () => void;
}

export function AllBadgesModal({ userId, onClose }: AllBadgesModalProps) {
  const [badges, setBadges] = useState<BadgeWithProgress[]>([]);
  const [filteredBadges, setFilteredBadges] = useState<BadgeWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'monthly' | 'permanent' | 'earned' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<BadgeWithProgress | null>(null);

  const loadAllBadges = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);

      // Récupérer tous les badges
      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .order('monthly', { ascending: false })
        .order('category', { ascending: true })
        .order('requirement_value', { ascending: true });

      if (badgesError) {
        console.error('Error loading badges:', badgesError);
        setBadges([]);
        setFilteredBadges([]);
        setLoading(false);
        return;
      }

      if (!allBadges || allBadges.length === 0) {
        console.warn('No badges found in database');
        setBadges([]);
        setFilteredBadges([]);
        setLoading(false);
        return;
      }

      // Récupérer les badges de l'utilisateur (statut)
      const { data: userBadges, error: userBadgesError } = await supabase
        .from('user_badges')
        .select('badge_id, earned_at')
        .eq('user_id', userId);

      if (userBadgesError) {
        console.error('Error loading user badges:', userBadgesError);
      }

      // Créer un map des badges de l'utilisateur
      const userBadgesMap = new Map(
        (userBadges || []).map(ub => [
          ub.badge_id,
          {
            earned: !!ub.earned_at,
            earned_at: ub.earned_at,
          }
        ])
      );

      // Combiner les badges avec le statut de l'utilisateur
      const badgesWithProgress: BadgeWithProgress[] = allBadges.map(badge => {
        const userBadge = userBadgesMap.get(badge.id);
        return {
          ...badge,
          progress: 0, // TODO: Implémenter le système de progression
          earned: userBadge?.earned || false,
          earned_at: userBadge?.earned_at || null,
        };
      });

      setBadges(badgesWithProgress);
      setFilteredBadges(badgesWithProgress);
    } catch (error) {
      console.error('Error loading badges:', error);
      setBadges([]);
      setFilteredBadges([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadAllBadges();
    } else {
      setLoading(false);
    }
  }, [userId, loadAllBadges]);

  useEffect(() => {
    filterBadges();
  }, [activeTab, searchQuery, badges]);

  const filterBadges = () => {
    let filtered = [...badges];

    // Filter by tab
    switch (activeTab) {
      case 'monthly':
        filtered = filtered.filter(b => b.monthly);
        break;
      case 'permanent':
        filtered = filtered.filter(b => !b.monthly);
        break;
      case 'earned':
        filtered = filtered.filter(b => b.earned);
        break;
      case 'locked':
        filtered = filtered.filter(b => !b.earned);
        break;
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBadges(filtered);
  };

  const getProgressPercentage = (badge: BadgeWithProgress) => {
    if (badge.requirement_value === 0) return 0;
    return Math.min(100, (badge.progress / badge.requirement_value) * 100);
  };

  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Tous les Badges
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {earnedCount} débloqués sur {badges.length} disponibles
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un badge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'all', label: 'Tous', count: badges.length },
                { id: 'monthly', label: 'Mensuels', count: badges.filter(b => b.monthly).length },
                { id: 'permanent', label: 'Permanents', count: badges.filter(b => !b.monthly).length },
                { id: 'earned', label: 'Débloqués', count: earnedCount },
                { id: 'locked', label: 'Verrouillés', count: badges.length - earnedCount }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all
                    ${activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs ${
                    activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    ({tab.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Badges Grid */}
          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-32 rounded-2xl bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : filteredBadges.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 font-semibold">
                  {searchQuery 
                    ? 'Aucun badge trouvé'
                    : 'Aucun badge dans cette catégorie'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredBadges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => setSelectedBadge(badge)}
                    className={`
                      relative rounded-2xl p-4 text-center transition-all hover:scale-105
                      ${badge.earned 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg' 
                        : 'bg-gray-100 border-2 border-gray-200'
                      }
                    `}
                  >
                    {/* Monthly/Permanent badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full font-bold
                        ${badge.monthly
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                        }
                      `}>
                        {badge.monthly ? '📅 Mensuel' : '♾️ Permanent'}
                      </span>
                    </div>

                    {/* Lock icon */}
                    {!badge.earned && (
                      <div className="absolute top-2 right-2 text-lg">
                        🔒
                      </div>
                    )}

                    {/* Badge icon */}
                    <div className={`text-5xl mb-3 mt-6 ${!badge.earned && 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </div>

                    {/* Badge name */}
                    <div className={`font-bold text-sm mb-2 ${
                      badge.earned ? 'text-white' : 'text-gray-800'
                    }`}>
                      {badge.name}
                    </div>

                    {/* Progress or earned date */}
                    {badge.earned ? (
                      <div className="text-xs text-white/80">
                        ✓ Débloqué
                      </div>
                    ) : (
                      <>
                        <div className="text-xs text-gray-600 mb-2">
                          {badge.progress}/{badge.requirement_value}
                        </div>
                        <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${getProgressPercentage(badge)}%` }}
                          />
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer stats */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-gray-600">
                  <span className="font-bold text-gray-800">{earnedCount}</span> débloqués
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-gray-600">
                  <span className="font-bold text-gray-800">{badges.length - earnedCount}</span> à débloquer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </>
  );
}
