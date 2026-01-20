import React from 'react';
import { Flame, Zap, Trophy, Medal } from 'lucide-react';

interface ProfileStatsProps {
  streakDays: number;
  totalXP: number;
  achievementsCount: number;
  leaderboardPosition?: number;
  onLeaderboardClick?: () => void;
}

export function ProfileStats({
  streakDays,
  totalXP,
  achievementsCount,
  leaderboardPosition = 0,
  onLeaderboardClick,
}: ProfileStatsProps) {
  const stats = [
    {
      icon: Flame,
      value: `${streakDays} jours`,
      label: 'Série',
      color: 'text-orange-500',
    },
    {
      icon: Zap,
      value: totalXP.toLocaleString(),
      label: 'XP total',
      color: 'text-yellow-500',
    },
    {
      icon: Trophy,
      value: achievementsCount > 0 ? achievementsCount.toString() : 'Aucune',
      label: 'Succès',
      color: 'text-amber-500',
    },
    {
      icon: Medal,
      value: leaderboardPosition > 0 ? `${leaderboardPosition} fois` : '0 fois',
      label: 'Dans le top 3',
      color: 'text-blue-500',
      onClick: onLeaderboardClick,
    },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">RÉCAP</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex flex-col gap-2 ${stat.onClick ? 'cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors' : ''}`}
              onClick={stat.onClick}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

