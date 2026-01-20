import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AchievementCategory } from '@/types/achievements';
import type { Achievement } from '@/types/achievements';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';

interface AchievementsSectionProps {
  userId: string;
}

export function AchievementsSection({ userId }: AchievementsSectionProps) {
  const [categories, setCategories] = useState<AchievementCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Store mapping of display name to database key
  const categoryKeyMap: { [key: string]: string } = {
    'Leçons': 'lessons',
    'Trading': 'trading',
    'Série': 'streak',
    'XP': 'xp',
    'Social': 'social',
    'Spécial': 'special'
  };

  useEffect(() => {
    loadAchievementCategories();
  }, [userId]);

  const loadAchievementCategories = async () => {
    try {
      // For now, we'll use mock data since achievements table may not exist yet
      // TODO: Replace with actual database queries when achievements system is implemented
      const categoryData: AchievementCategory[] = [
        {
          name: 'Leçons',
          icon: '📚',
          color: 'from-blue-500 to-cyan-500',
          totalAchievements: 20,
          completedAchievements: 0,
        },
        {
          name: 'Trading',
          icon: '📈',
          color: 'from-green-500 to-teal-500',
          totalAchievements: 15,
          completedAchievements: 0,
        },
        {
          name: 'Série',
          icon: '🔥',
          color: 'from-orange-500 to-red-500',
          totalAchievements: 10,
          completedAchievements: 0,
        },
        {
          name: 'XP',
          icon: '⭐',
          color: 'from-purple-500 to-pink-500',
          totalAchievements: 12,
          completedAchievements: 0,
        },
        {
          name: 'Social',
          icon: '👥',
          color: 'from-yellow-500 to-orange-500',
          totalAchievements: 8,
          completedAchievements: 0,
        },
        {
          name: 'Spécial',
          icon: '🎁',
          color: 'from-pink-500 to-rose-500',
          totalAchievements: 6,
          completedAchievements: 0,
        },
      ];

      setCategories(categoryData);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (category: AchievementCategory) => {
    if (category.totalAchievements === 0) return 0;
    return (category.completedAchievements / category.totalAchievements) * 100;
  };

  return (
    <>
      <div className="px-4 mb-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-gray-800 tracking-wide">
            SUCCÈS
          </h3>
          <button className="text-blue-600 hover:text-blue-700">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid - Always show all 6 categories */}
        <div className="grid grid-cols-2 gap-3">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-gray-200 animate-pulse" />
            ))
          ) : (
            categories.map((category) => {
              const hasProgress = category.completedAchievements > 0;
              const progressPercentage = getProgressPercentage(category);

              return (
                <button
                  key={category.name}
                  onClick={() => {
                    // Pass the database key, not the display name
                    const dbKey = categoryKeyMap[category.name];
                    console.log('Opening category:', category.name, '→', dbKey); // DEBUG
                    setSelectedCategory(dbKey || category.name.toLowerCase());
                  }}
                  className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all group"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} ${
                    hasProgress ? 'opacity-90' : 'opacity-70'
                  } group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Content */}
                  <div className="relative p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl ${!hasProgress && 'opacity-70'}`}>
                        {category.icon}
                      </span>
                      <div className="text-right">
                        <div className="text-xs font-semibold opacity-90">
                          {category.completedAchievements}/{category.totalAchievements}
                        </div>
                      </div>
                    </div>
                    
                    <div className="font-bold text-sm mb-2">{category.name}</div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedCategory && (
        <AchievementDetailModal
          userId={userId}
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}

// Achievement Detail Modal with full list
function AchievementDetailModal({ 
  userId, 
  category, 
  onClose 
}: { 
  userId: string; 
  category: string; 
  onClose: () => void;
}) {
  const [achievements, setAchievements] = useState<(Achievement & { 
    progress: number; 
    completed: boolean;
    completedAt: string | null;
  })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryAchievements();
  }, [userId, category]);

  const loadCategoryAchievements = async () => {
    try {
      // Map French category name to database category key
      const categoryNameMap: { [key: string]: string } = {
        'Leçons': 'lessons',
        'Trading': 'trading',
        'Série': 'streak',
        'XP': 'xp',
        'Social': 'social',
        'Spécial': 'special',
      };
      
      const categoryKey = categoryNameMap[category] || category.toLowerCase();
      
      // Filter achievements by category using diverse achievements data
      const categoryAchievements = ACHIEVEMENTS_DATA.filter(
        a => a.category === categoryKey
      );

      // Map to include progress and completion status
      const achievementsWithProgress = categoryAchievements.map(achievement => ({
        ...achievement,
        progress: 0, // TODO: Get actual progress from user_achievements table
        completed: false, // TODO: Check completion status
        completedAt: null, // TODO: Get completion date
      }));

      setAchievements(achievementsWithProgress);
    } catch (error) {
      console.error('Error loading category achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Map database key back to display name
  const categoryDisplayMap: { [key: string]: string } = {
    'lessons': 'Leçons',
    'trading': 'Trading',
    'streak': 'Série',
    'xp': 'XP',
    'social': 'Social',
    'special': 'Spécial'
  };

  const categoryDisplayName = categoryDisplayMap[category] || category;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-orange-700 to-orange-900';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-cyan-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const completedCount = achievements.filter(a => a.completed).length;
  const hasCompletedAny = completedCount > 0;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              Succès - {categoryDisplayName}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Progress summary */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {completedCount} / {achievements.length} débloqués
            </span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ 
                    width: `${achievements.length > 0 ? (completedCount / achievements.length) * 100 : 0}%` 
                  }}
                />
              </div>
              <span className="text-xs font-bold text-gray-700">
                {achievements.length > 0 
                  ? Math.round((completedCount / achievements.length) * 100) 
                  : 0}%
              </span>
            </div>
          </div>

          {/* Empty state message */}
          {!hasCompletedAny && (
            <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-sm text-blue-700 text-center">
                🎯 Commence à apprendre pour débloquer des succès dans cette catégorie!
              </p>
            </div>
          )}
        </div>

        {/* Achievements List */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-800 font-bold text-lg mb-2">
                Aucun succès trouvé
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Les succès pour cette catégorie n'ont pas encore été créés.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-700">
                  💡 <strong>Info développeur:</strong><br/>
                  Vérifie que les achievements ont été insérés en base de données
                  avec la bonne valeur de 'category' (en minuscules).
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((achievement) => {
                const progressPercentage = Math.min(
                  100,
                  (achievement.progress / achievement.requirement_value) * 100
                );

                return (
                  <div
                    key={achievement.id}
                    className={`
                      relative overflow-hidden rounded-xl p-4 border-2 transition-all
                      ${achievement.completed 
                        ? 'border-transparent bg-gradient-to-r ' + getTierColor(achievement.tier)
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`
                        text-4xl flex-shrink-0
                        ${!achievement.completed && 'grayscale opacity-50'}
                      `}>
                        {achievement.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className={`font-bold mb-1 ${
                          achievement.completed ? 'text-white' : 'text-gray-800'
                        }`}>
                          {achievement.name}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            achievement.completed 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {achievement.tier}
                          </span>
                        </div>
                        
                        <div className={`text-sm mb-2 ${
                          achievement.completed ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {achievement.description}
                        </div>

                        {achievement.completed ? (
                          <div className="text-xs text-white/80">
                            ✓ Débloqué le {new Date(achievement.completedAt!).toLocaleDateString('fr-FR')}
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">
                                {achievement.progress === 0 
                                  ? 'Pas encore commencé' 
                                  : 'Progression'
                                }
                              </span>
                              <span className="font-bold text-gray-800">
                                {achievement.progress}/{achievement.requirement_value}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                            
                            {/* Motivational message */}
                            {achievement.progress === 0 && (
                              <p className="text-xs text-gray-500 mt-1">
                                💪 Commence pour débloquer ce succès!
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* XP Reward */}
                      <div className={`
                        text-center flex-shrink-0
                        ${achievement.completed ? 'text-white' : 'text-gray-400'}
                      `}>
                        <div className="text-xs font-semibold">+{achievement.xp_reward}</div>
                        <div className="text-xs">XP</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with motivation */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-600">
              {hasCompletedAny 
                ? `🎉 Continue! Plus que ${achievements.length - completedCount} succès à débloquer.`
                : '🎯 Commence à apprendre pour débloquer tes premiers succès!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
