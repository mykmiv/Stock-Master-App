import React from 'react';
import { BookOpen, BarChart3, TrendingUp, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-0.5
        flex-1 max-w-[80px] px-1.5 py-2 rounded-2xl
        transition-all duration-300 ease-out
        relative
        active:scale-95
        ${isActive 
          ? 'text-[#6B4EFF] bg-[#F5F3FF]' 
          : 'text-[#6B7280] hover:text-[#374151] hover:bg-gray-50'
        }
      `}
      aria-label={label}
    >
      {/* Icon */}
      <div className={`
        transition-all duration-300 ease-out
        ${isActive ? 'scale-110' : 'scale-100'}
      `}>
        <Icon 
          size={24}
          strokeWidth={isActive ? 2.5 : 2}
          className={isActive ? 'text-[#6B4EFF]' : 'text-[#6B7280]'}
        />
      </div>
      
      {/* Label */}
      <span className={`
        text-[10px] sm:text-xs leading-tight mt-0.5
        transition-all duration-300
        ${isActive 
          ? 'text-[#6B4EFF] font-bold' 
          : 'text-[#6B7280] font-medium'
        }
      `}>
        {label}
      </span>
      
      {/* Active Indicator Bar */}
      {isActive && (
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#6B4EFF] rounded-b-full"
        />
      )}
    </button>
  );
};

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active route based on pathname
  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/learn')) return 'learn';
    if (path.startsWith('/scanner')) return 'scanner';
    if (path.startsWith('/trade')) return 'trade';
    if (path.startsWith('/league') || path.startsWith('/ranking')) return 'ranking';
    if (path.startsWith('/profile')) return 'profile';
    return 'learn'; // Default to learn
  };
  
  const activeRoute = getActiveRoute();
  
  const navItems = [
    { 
      id: 'learn', 
      label: 'Learn', 
      icon: BookOpen, 
      path: '/learn' 
    },
    { 
      id: 'scanner', 
      label: 'Scan', 
      icon: BarChart3, 
      path: '/scanner' 
    },
    { 
      id: 'trade', 
      label: 'Trade', 
      icon: TrendingUp, 
      path: '/trade' 
    },
    { 
      id: 'ranking', 
      label: 'Ranking', 
      icon: Trophy, 
      path: '/league' // Using /league as it exists in routes
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/profile' 
    },
  ];
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div 
        className="flex items-center justify-evenly h-20 sm:h-24"
        style={{ padding: '8px 4px 12px' }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          
          return (
            <NavItem
              key={item.id}
              icon={Icon}
              label={item.label}
              path={item.path}
              isActive={isActive}
              onClick={() => navigate(item.path)}
            />
          );
        })}
      </div>
    </div>
  );
}

