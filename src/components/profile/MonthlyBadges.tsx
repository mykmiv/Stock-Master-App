import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  monthly: boolean;
  created_at?: string;
}

interface MonthlyBadgesProps {
  userId: string;
}

export function MonthlyBadges({ userId }: MonthlyBadgesProps) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadBadges();
    }
  }, [userId]);

  const loadBadges = async () => {
    console.log('=== LOADING BADGES START ===');
    console.log('User ID:', userId);
    
    try {
      setLoading(true);

      // Test 1: Query ALL badges first (no filter)
      console.log('Test 1: Querying ALL badges...');
      const { data: allBadges, error: allError } = await supabase
        .from('badges')
        .select('*');
      
      console.log('All badges result:', {
        count: allBadges?.length,
        error: allError,
        firstBadge: allBadges?.[0]
      });

      if (allError) {
        console.error('❌ Error querying all badges:', allError);
        console.error('  Code:', allError.code);
        console.error('  Message:', allError.message);
        console.error('  Details:', JSON.stringify(allError, null, 2));
      }

      // Test 2: Query with monthly filter
      console.log('Test 2: Querying monthly badges...');
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .eq('monthly', true)
        .order('requirement_value', { ascending: true });

      console.log('Monthly badges result:', {
        count: data?.length,
        error: error,
        firstBadge: data?.[0]
      });

      if (error) {
        console.error('❌ Error loading monthly badges:', error);
        console.error('  Code:', error.code);
        console.error('  Message:', error.message);
        console.error('  Details:', JSON.stringify(error, null, 2));
        
        // Fallback: use all badges if monthly filter fails
        if (allBadges && allBadges.length > 0 && !allError) {
          console.log('✅ Using all badges as fallback:', allBadges.length);
          // Filter manually
          const monthlyOnly = allBadges.filter(b => b.monthly === true);
          console.log('Monthly badges after manual filter:', monthlyOnly.length);
          setBadges(monthlyOnly);
        } else {
          setBadges([]);
        }
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ No monthly badges found with filter!');
        console.log('Trying without filter...');
        
        // Fallback: use all badges if monthly filter returns nothing
        if (allBadges && allBadges.length > 0 && !allError) {
          console.log('✅ Using all badges as fallback:', allBadges.length);
          // Filter manually
          const monthlyOnly = allBadges.filter(b => b.monthly === true);
          console.log('Monthly badges after manual filter:', monthlyOnly.length);
          if (monthlyOnly.length > 0) {
            setBadges(monthlyOnly);
          } else {
            console.warn('⚠️ No badges have monthly=true in data');
            setBadges([]);
          }
        } else {
          console.warn('⚠️ No badges found at all');
          setBadges([]);
        }
      } else {
        console.log('✅ Setting monthly badges:', data.length);
        setBadges(data);
      }

    } catch (error) {
      console.error('❌ Exception:', error);
      console.error('Exception details:', JSON.stringify(error, null, 2));
      setBadges([]);
    } finally {
      setLoading(false);
      console.log('=== LOADING BADGES END ===');
    }
  };

  const earnedCount = 0; // TODO: Track earned badges from user_badges table

  return (
    <div className="px-4 mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-gray-800 tracking-wide">
          BADGES MENSUELS
        </h3>
        <button 
          className="text-blue-600 hover:text-blue-700 transition-colors"
          aria-label="Voir tous les badges"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* DEBUG INFO */}
      <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-xs font-mono border border-yellow-200">
        <div className="font-bold mb-1">🔍 DEBUG INFO:</div>
        <div>Loading: {loading.toString()}</div>
        <div>Badges count: {badges.length}</div>
        <div>First badge: {badges[0]?.name || 'none'}</div>
        <div>User ID: {userId ? '✅' : '❌'}</div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mb-3"></div>
          <p className="text-sm text-gray-500">Chargement des badges...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && badges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Aucun badge mensuel disponible
          </p>
          <p className="text-sm text-gray-500">
            Debug: Check console (F12) for details
          </p>
          <p className="text-xs text-red-400 mt-2 font-mono">
            (Vérifie la console pour les logs de debug)
          </p>
        </div>
      )}

      {/* Badges Grid */}
      {!loading && badges.length > 0 && (
        <>
          {/* Empty State Message (if no badges earned) */}
          {earnedCount === 0 && (
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-500">
                🏆 Aucun badge débloqué ce mois
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Continue à apprendre pour en débloquer!
              </p>
            </div>
          )}

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
            {badges.slice(0, 6).map((badge) => (
              <div
                key={badge.id}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 flex items-center justify-center relative overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
                  {/* Locked Badge */}
                  <div className="relative">
                    <span className="text-4xl grayscale opacity-40">
                      {badge.icon}
                    </span>
                    <div className="absolute -top-1 -right-1 bg-gray-300 rounded-full p-1">
                      <span className="text-xs">🔒</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                    <div 
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
                
                {/* Badge Name */}
                <p className="text-xs text-center text-gray-600 font-semibold mt-2 truncate max-w-[112px]">
                  {badge.name}
                </p>
                
                {/* Badge Progress (0/X) */}
                <p className="text-xs text-center text-gray-400">
                  0/{badge.requirement_value}
                </p>
              </div>
            ))}

            {/* See All Button */}
            {badges.length > 6 && (
              <div className="flex-shrink-0">
                <button
                  className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg transition-all"
                  aria-label="Voir tous les badges"
                >
                  <span className="text-3xl mb-2">👁️</span>
                  <span className="text-xs font-bold text-blue-600">
                    Voir tous
                  </span>
                  <span className="text-xs text-blue-500">
                    ({badges.length})
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {badges.length} badges disponibles
              </span>
              <span className="text-gray-400">
                {earnedCount} débloqués ce mois
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
