import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakTrackerProps {
  streakDays: number;
  className?: string;
}

export function StreakTracker({ streakDays, className = '' }: StreakTrackerProps) {
  const isOnFire = streakDays >= 7;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        animate={isOnFire ? {
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ duration: 0.5, repeat: isOnFire ? Infinity : 0, repeatDelay: 1 }}
      >
        <Flame 
          className={`w-5 h-5 ${isOnFire ? 'text-orange-500' : 'text-orange-400'}`}
          fill={isOnFire ? 'currentColor' : 'none'}
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none">{streakDays}</span>
        <span className="text-xs text-gray-500 leading-none">jours</span>
      </div>
      {isOnFire && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-xs text-orange-500 font-bold"
        >
          🔥
        </motion.span>
      )}
    </div>
  );
}

