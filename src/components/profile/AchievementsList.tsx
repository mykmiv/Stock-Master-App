import React from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import { Trophy, Award } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  isNew?: boolean;
}

interface AchievementsListProps {
  monthlyBadges: Achievement[];
  successBadges: Achievement[];
  onViewMore?: () => void;
}

export function AchievementsList({
  monthlyBadges,
  successBadges,
  onViewMore,
}: AchievementsListProps) {
  const renderBadge = (badge: Achievement, index: number) => (
    <div key={badge.id} className="relative flex-shrink-0">
      <div
        className={`
          w-20 h-20 rounded-full flex items-center justify-center
          ${badge.unlocked
            ? 'bg-gradient-to-br from-[#1CB0F6] to-[#0A9BD6]'
            : 'bg-gray-200'
          }
        `}
      >
        {badge.unlocked ? (
          <Trophy className="w-10 h-10 text-white" />
        ) : (
          <Lock className="w-8 h-8 text-gray-400" />
        )}
      </div>
      {badge.isNew && badge.unlocked && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          NOUVEAU
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Monthly Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">BADGES MENSUELS</h2>
          <button
            onClick={onViewMore}
            className="text-[#1CB0F6] hover:text-[#0A9BD6] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {monthlyBadges.map((badge, index) => renderBadge(badge, index))}
        </div>
      </div>

      {/* Success Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">SUCCÈS</h2>
          <button
            onClick={onViewMore}
            className="text-[#1CB0F6] hover:text-[#0A9BD6] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {successBadges.map((badge, index) => renderBadge(badge, index))}
        </div>
      </div>
    </div>
  );
}

