import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, BookOpen, Star } from 'lucide-react';
import { LessonWithProgress } from '@/types/lesson.types';
import { motion } from 'framer-motion';

interface LessonNodeProps {
  lesson: LessonWithProgress & { position?: 'left' | 'right' };
  onLessonClick: (lesson: LessonWithProgress) => void;
}

export const LessonNode = React.forwardRef<HTMLDivElement, LessonNodeProps>(
  ({ lesson, onLessonClick }, ref) => {
    const navigate = useNavigate();
    
    const getStatus = (): 'completed' | 'current' | 'locked' | 'available' => {
      if (lesson.isCompleted) return 'completed';
      if (lesson.isCurrent) return 'current';
      if (lesson.isLocked) return 'locked';
      return 'available';
    };

    const status = getStatus();
    const isClickable = status !== 'locked';
    const position = lesson.position || 'left';

    const getNodeStyle = () => {
      switch (status) {
        case 'completed':
          return {
            bg: 'bg-green-500',
            border: 'border-green-600',
            shadow: 'shadow-lg shadow-green-200',
            icon: <Check className="w-10 h-10 text-white" />,
            clickable: true
          };
        case 'current':
          return {
            bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
            border: 'border-yellow-500',
            shadow: 'shadow-2xl shadow-yellow-300',
            icon: <BookOpen className="w-10 h-10 text-white" />,
            clickable: true,
            pulse: true
          };
        case 'available':
          return {
            bg: 'bg-indigo-500',
            border: 'border-indigo-600',
            shadow: 'shadow-lg shadow-indigo-200',
            icon: <BookOpen className="w-10 h-10 text-white" />,
            clickable: true
          };
        case 'locked':
          return {
            bg: 'bg-gray-300',
            border: 'border-gray-400',
            shadow: 'shadow-md',
            icon: <Lock className="w-10 h-10 text-gray-500" />,
            clickable: false
          };
      }
    };

    const nodeStyle = getNodeStyle();
    const alignmentClass = position === 'left' 
      ? 'justify-start ml-8' 
      : 'justify-end mr-8';

    const handleClick = () => {
      if (isClickable) {
        onLessonClick(lesson);
      }
    };

    return (
      <div 
        ref={ref}
        className={`flex ${alignmentClass} relative z-10`}
      >
        <div className="relative group">
          {/* Stars for perfect score */}
          {status === 'completed' && lesson.progress?.score === 100 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Main Circle */}
          <motion.button
            onClick={handleClick}
            disabled={!isClickable}
            whileHover={isClickable ? { scale: 1.1 } : {}}
            whileTap={isClickable ? { scale: 0.95 } : {}}
            className={`
              relative w-24 h-24 rounded-full
              ${nodeStyle.bg}
              ${nodeStyle.shadow}
              border-4 ${nodeStyle.border}
              flex items-center justify-center
              transition-all duration-300
              ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
            `}
          >
            {nodeStyle.icon}
            
            {/* Pulsing ring for current lesson */}
            {status === 'current' && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full bg-yellow-400 opacity-75"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.75, 0, 0.75],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-yellow-400 opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </>
            )}
          </motion.button>

          {/* Hover Card */}
          <div className={`
            absolute top-0 z-20
            ${position === 'left' ? 'left-28' : 'right-28'}
            w-64 bg-white rounded-2xl shadow-2xl p-5
            border-2 ${status === 'completed' ? 'border-green-500' : status === 'current' ? 'border-yellow-500' : 'border-gray-300'}
            opacity-0 group-hover:opacity-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-300
            transform group-hover:scale-100 scale-95
          `}>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-gray-900">
                Leçon {lesson.lesson_number || '?'}
              </h4>
              <p className="text-sm text-gray-600">
                {lesson.title}
              </p>

              {/* Status indicator */}
              <div className="flex items-center gap-2">
                {status === 'completed' ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-green-600">
                        {lesson.progress?.score || 0}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Terminé</span>
                  </>
                ) : status === 'current' ? (
                  <span className="text-sm font-bold text-yellow-600 animate-pulse">
                    ⚡ Commence ici!
                  </span>
                ) : status === 'available' ? (
                  <span className="text-sm text-indigo-600 font-medium">
                    Prêt à apprendre
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    🔒 Complète les leçons précédentes
                  </span>
                )}
              </div>

              {/* Rewards */}
              <div className="flex items-center gap-4 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-bold">+{lesson.xp_reward || 10} XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">💰</span>
                  <span className="text-xs font-bold">+{Math.floor((lesson.xp_reward || 10) / 2)} coins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connecting dot to path line */}
          <div className={`
            absolute top-1/2 -translate-y-1/2 w-8 h-1
            ${status === 'completed' ? 'bg-green-500' : status === 'current' ? 'bg-yellow-500' : 'bg-gray-300'}
            ${position === 'left' ? '-right-8' : '-left-8'}
          `} />
        </div>
      </div>
    );
  }
);

LessonNode.displayName = 'LessonNode';

