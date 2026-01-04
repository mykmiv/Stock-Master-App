import React from 'react';
import { 
  Check, 
  BookOpen, 
  Star,
  Sparkles,
  Zap
} from 'lucide-react';
import { LessonWithProgress } from '@/types/lesson.types';

interface FineloLessonNodeProps {
  lesson: LessonWithProgress;
  isFirst?: boolean;
  index?: number;
  isLastOfDay?: boolean;
}

export function FineloLessonNode({ lesson, isFirst = false, index = 0, isLastOfDay = false }: FineloLessonNodeProps) {
  const getStatus = (): 'completed' | 'current' | 'locked' => {
    if (lesson.isCompleted) return 'completed';
    if (lesson.isCurrent) return 'current';
    if (lesson.isLocked) return 'locked';
    return 'current';
  };

  const status = getStatus();
  const isPerfect = lesson.progress?.score === 100;
  const xpReward = lesson.xp_reward || 10;
  const isLeft = (index || 0) % 2 === 0;

  const getLessonIcon = () => {
    // Last lesson of the day gets stars
    if (isLastOfDay) {
      return (
        <div className="relative">
          <Sparkles 
            className="w-16 h-16 text-white drop-shadow-xl" 
            strokeWidth={2.5} 
            fill="white"
          />
          {/* Extra sparkle effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Star 
              className="w-8 h-8 text-yellow-200 animate-pulse" 
              fill="currentColor"
            />
          </div>
        </div>
      );
    }
    
    // Completed lessons get checkmark
    if (status === 'completed') {
      return (
        <Check 
          className="w-16 h-16 text-white drop-shadow-lg" 
          strokeWidth={4} 
        />
      );
    }
    
    // Not done (locked or current) gets book
    return (
      <BookOpen 
        className="w-14 h-14 text-white drop-shadow-lg" 
        strokeWidth={2.5} 
      />
    );
  };

  const getNodeConfig = () => {
    // Last lesson of day - STARS!
    if (isLastOfDay) {
      return {
        bg: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500',
        shadow: 'shadow-2xl shadow-amber-400/60',
        ring: 'ring-6 ring-yellow-300/70',
        pulse: true,
        glow: true,
        label: status === 'completed' ? '🎉 Day Complete!' : '⭐ Day Final'
      };
    }

    // Perfect score
    if (isPerfect && status === 'completed') {
      return {
        bg: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
        shadow: 'shadow-xl shadow-green-400/50',
        ring: 'ring-5 ring-green-300/70',
        glow: true,
        label: '💯 Perfect!'
      };
    }

    switch (status) {
      case 'completed':
        return {
          bg: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700',
          shadow: 'shadow-xl shadow-indigo-300/50',
          ring: 'ring-4 ring-indigo-200/70',
        };
      
      case 'current':
        return {
          bg: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',
          shadow: 'shadow-2xl shadow-purple-400/70',
          ring: 'ring-6 ring-white ring-offset-4 ring-offset-purple-200',
          pulse: true,
          glow: true,
          label: '▶️ Start Now'
        };
      
      case 'locked':
        return {
          bg: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
          shadow: 'shadow-lg shadow-gray-300/60',
          ring: 'ring-4 ring-gray-200/80',
        };
    }
  };

  const config = getNodeConfig();
  const icon = getLessonIcon();

  return (
    <div className="relative group">
      {/* Stars for Perfect Score - ABOVE circle (only if not last of day) */}
      {isPerfect && status === 'completed' && !isLastOfDay && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <Star
                className="w-7 h-7 text-yellow-400 fill-yellow-400 drop-shadow-lg animate-star-pop"
                style={{ 
                  animationDelay: `${i * 0.15}s` 
                }}
              />
              <div className="absolute inset-0 bg-yellow-300/50 blur-md rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Pulse Rings for active lessons */}
      {config.pulse && (
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <span className="absolute w-36 h-36 rounded-full bg-purple-400/40 animate-ping" />
          <span 
            className="absolute w-32 h-32 rounded-full bg-indigo-500/30 animate-pulse" 
            style={{ animationDuration: '2s', animationDelay: '0.5s' }} 
          />
        </div>
      )}

      {/* Main Circle Container */}
      <div className="relative">
        {/* Glow Effect */}
        {config.glow && (
          <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-2xl animate-pulse -z-10" />
        )}
        
        {/* The Lesson Circle */}
        <button
          disabled={status === 'locked'}
          className={`
            relative
            w-28 h-28 rounded-full
            ${config.bg}
            ${config.shadow}
            ${config.ring}
            flex items-center justify-center
            transition-all duration-300
            ${status !== 'locked' 
              ? 'hover:scale-110 hover:shadow-2xl cursor-pointer active:scale-105' 
              : 'cursor-not-allowed opacity-80'
            }
            z-10
            overflow-visible
          `}
        >
          {icon}
        </button>

        {/* XP Badge - Top Right Corner */}
        {xpReward && status !== 'locked' && (
          <div className="absolute -top-2 -right-2 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-75" />
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-xl border-2 border-white">
                +{xpReward}
              </div>
            </div>
          </div>
        )}

        {/* Labels - SIDE POSITION (with label from config) */}
        {config.label && (
          <div className={`
            absolute top-1/2 -translate-y-1/2 z-20
            ${isLeft ? '-right-40' : '-left-40'}
          `}>
            <div className="relative">
              {/* Glow based on lesson type */}
              <div className={`
                absolute inset-0 rounded-xl blur-md opacity-50
                ${isLastOfDay ? 'bg-amber-500' : isPerfect ? 'bg-green-500' : 'bg-indigo-500'}
              `} />
              
              {/* Label Card */}
              <div className={`
                relative px-4 py-2.5 rounded-xl shadow-xl border-2 border-white/40 backdrop-blur-sm
                ${isLastOfDay 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                  : isPerfect
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }
                text-white
              `}>
                <span className="font-bold text-sm whitespace-nowrap">
                  {config.label}
                </span>
              </div>
              
              {/* Arrow pointing to circle */}
              <div className={`
                absolute top-1/2 -translate-y-1/2
                ${isLeft ? '-left-3' : '-right-3'}
              `}>
                <div className={`
                  w-0 h-0 
                  ${isLeft 
                    ? `border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] ${
                        isLastOfDay ? 'border-r-orange-500' : isPerfect ? 'border-r-emerald-600' : 'border-r-purple-600'
                      }`
                    : `border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] ${
                        isLastOfDay ? 'border-l-orange-500' : isPerfect ? 'border-l-emerald-600' : 'border-l-purple-600'
                      }`
                  }
                `} />
              </div>
            </div>
          </div>
        )}

        {/* Info Card on Hover - SIDE POSITION */}
        <div className={`
          absolute top-0 z-30
          ${isLeft ? '-right-64' : '-left-64'}
          w-60
          opacity-0 group-hover:opacity-100
          pointer-events-none group-hover:pointer-events-auto
          transition-all duration-300
          transform scale-95 group-hover:scale-100
        `}>
          <div className="relative">
            {/* Glow effect */}
            <div className={`
              absolute inset-0 rounded-2xl blur-xl
              ${isLastOfDay 
                ? 'bg-amber-500/30' 
                : status === 'completed' 
                ? 'bg-indigo-500/20' 
                : 'bg-purple-500/20'
              }
            `} />
            
            {/* Card */}
            <div className={`
              relative bg-white rounded-2xl shadow-2xl p-4
              border-2 ${
                isLastOfDay
                  ? 'border-amber-400'
                  : status === 'completed' 
                  ? 'border-green-400' 
                  : status === 'current' 
                  ? 'border-indigo-500' 
                  : 'border-gray-300'
              }
            `}>
              {/* Day Final Badge */}
              {isLastOfDay && (
                <div className="mb-3 pb-3 border-b border-amber-100">
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <Sparkles className="w-4 h-4 text-amber-600" fill="currentColor" />
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                      Day Completion Lesson
                    </span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Lesson {lesson.lesson_number || '?'}
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 leading-tight">
                    {lesson.title}
                  </h4>
                </div>
                
                {status === 'completed' && (
                  <div className="flex-shrink-0 ml-2">
                    <div className={`
                      text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1
                      ${isLastOfDay 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-green-100 text-green-700'
                      }
                    `}>
                      <Check className="w-3 h-3" />
                      Done
                    </div>
                  </div>
                )}
              </div>

              {/* Rewards */}
              {xpReward && (
                <div className="flex items-center gap-3 pt-3 mt-3 border-t border-gray-100">
                  <div className={`
                    flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                    ${isLastOfDay 
                      ? 'bg-amber-50' 
                      : 'bg-purple-50'
                    }
                  `}>
                    <Sparkles className={`
                      w-4 h-4
                      ${isLastOfDay ? 'text-amber-500' : 'text-purple-500'}
                    `} />
                    <span className={`
                      text-xs font-bold
                      ${isLastOfDay ? 'text-amber-700' : 'text-purple-700'}
                    `}>
                      +{xpReward} XP
                    </span>
                  </div>
                  
                  {status !== 'locked' && (
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                      <span className="text-sm">💰</span>
                      <span className="text-xs font-bold text-amber-700">
                        +{Math.floor(xpReward / 2)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Locked message */}
              {status === 'locked' && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 italic flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    Complete previous lessons to unlock
                  </p>
                </div>
              )}
            </div>
            
            {/* Arrow pointing to circle */}
            <div className={`
              absolute top-8
              ${isLeft ? '-left-3' : '-right-3'}
            `}>
              <div className={`
                w-0 h-0 
                ${isLeft 
                  ? 'border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[12px] border-r-white'
                  : 'border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-white'
                }
              `} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
