import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentChapterColor } from '@/hooks/useCurrentChapterColor';

// Map chapter colors to gradient colors that match
const CHAPTER_GRADIENT_MAP: Record<string, string> = {
  'bg-[#58CC02]': 'from-[#58CC02] via-[#4CAF00] to-[#45A000]',      // Vert vif Duolingo
  'bg-[#1CB0F6]': 'from-[#1CB0F6] via-[#0EA5E9] to-[#0D8CC4]',      // Bleu vif
  'bg-[#CE82FF]': 'from-[#CE82FF] via-[#B973E6] to-[#A855CD]',      // Violet vif
  'bg-[#FF9600]': 'from-[#FF9600] via-[#FF8800] to-[#E67A00]',      // Orange vif
  'bg-[#FF4B4B]': 'from-[#FF4B4B] via-[#FF3838] to-[#E62E2E]',      // Rouge/Rose vif
  'bg-[#00D9FF]': 'from-[#00D9FF] via-[#00C4E6] to-[#00B0CC]',      // Cyan vif
  'bg-[#7C3AED]': 'from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]',      // Indigo vif
  'bg-[#F59E0B]': 'from-[#F59E0B] via-[#D97706] to-[#B45309]',      // Ambre vif
};

export function FineloPremiumBanner() {
  const navigate = useNavigate();
  const currentChapterBgColor = useCurrentChapterColor(); // Use shared hook
  const currentChapterColor = CHAPTER_GRADIENT_MAP[currentChapterBgColor] || 'from-indigo-600 via-purple-600 to-indigo-700';

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="fixed bottom-24 sm:bottom-28 left-0 right-0 z-40 px-3 sm:px-4 safe-area-bottom">
      <div className={cn(
        "bg-gradient-to-r rounded-xl sm:rounded-2xl p-3 sm:p-4 relative shadow-xl max-w-4xl mx-auto transition-colors duration-300 mb-2",
        currentChapterColor
      )}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="premium-stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.5" fill="white" opacity="0.6" />
              <circle cx="25" cy="18" r="1" fill="white" opacity="0.4" />
              <circle cx="15" cy="30" r="0.8" fill="white" opacity="0.5" />
              <circle cx="35" cy="10" r="1" fill="white" opacity="0.7" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#premium-stars)" />
          </svg>
        </div>

        {/* Glow Effect - Reduced */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-400 rounded-full blur-2xl opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400 rounded-full blur-2xl opacity-20" />

        <div className="relative flex items-center gap-2 sm:gap-3">
          {/* Icon - Smaller */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/30">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" fill="currentColor" />
            </div>
          </div>

          {/* Content - Smaller */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-black text-sm sm:text-base mb-0.5 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" fill="currentColor" />
              <span className="truncate">Unlock Pro Trading Tools</span>
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm font-medium truncate">
              Advanced charts, AI scanner & live trading
            </p>
          </div>

          {/* CTA Button - Smaller */}
          <button 
            onClick={handleUpgradeClick}
            className="flex-shrink-0 bg-white text-indigo-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 group touch-manipulation"
          >
            <span>Upgrade</span>
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:text-yellow-500 transition-colors" />
          </button>
        </div>

        {/* Decorative Elements - Removed or smaller */}
      </div>
    </div>
  );
}
