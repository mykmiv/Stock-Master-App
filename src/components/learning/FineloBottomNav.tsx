import React from 'react';
import { BookOpen, BarChart3, TrendingUp, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function FineloBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split('/')[1] || 'learn';

  const tabs = [
    { id: 'learn', label: 'Learn', icon: BookOpen, path: '/learn' },
    { id: 'scanner', label: 'Scanner', icon: BarChart3, path: '/scanner' },
    { id: 'trade', label: 'Trade', icon: TrendingUp, path: '/trade' },
    { id: 'league', label: 'Ranking', icon: Trophy, path: '/league' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl
                transition-all duration-200 relative
                ${isActive 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} 
              />
              <span className={`text-xs font-semibold ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
