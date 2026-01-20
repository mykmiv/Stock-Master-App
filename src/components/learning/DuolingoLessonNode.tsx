import React, { useState } from 'react';
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
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const getNodeStyle = () => {
      switch (status) {
        case 'completed':
          return {
            bg: 'bg-gradient-to-b from-yellow-400 to-yellow-500',
            borderTop: 'border-t-4 border-yellow-300/50',
            shadowColor: '#a16207', // yellow-700
            icon: <Check className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-white stroke-[3]" />,
            clickable: true,
            glow: false
          };
        case 'current':
          return {
            bg: 'bg-gradient-to-b from-green-400 to-green-500',
            borderTop: 'border-t-4 border-green-300/50',
            shadowColor: '#15803d', // green-700
            icon: <BookOpen className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-white" />,
            clickable: true,
            pulse: true,
            glow: true
          };
        case 'available':
          return {
            bg: 'bg-gradient-to-b from-indigo-400 to-indigo-500',
            borderTop: 'border-t-4 border-indigo-300/50',
            shadowColor: '#4338ca', // indigo-700
            icon: <BookOpen className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-white" />,
            clickable: true,
            glow: false
          };
        case 'locked':
          return {
            bg: 'bg-gradient-to-b from-gray-300 to-gray-400',
            borderTop: 'border-t-4 border-gray-400/30',
            shadowColor: '#6b7280', // gray-500
            icon: <Lock className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-gray-500" />,
            clickable: false,
            glow: false
          };
      }
    };

    const nodeStyle = getNodeStyle();
    const alignmentClass = position === 'left' 
      ? 'justify-start ml-8 sm:ml-12 md:ml-16 lg:ml-20 xl:ml-24' 
      : 'justify-end mr-8 sm:mr-12 md:mr-16 lg:mr-20 xl:mr-24';

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
              className="absolute -top-14 sm:-top-16 md:-top-18 lg:-top-20 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Star className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Glow effect for current lesson */}
          {nodeStyle.glow && (
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              animate={{
                scale: [1.3, 1.5, 1.3],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `radial-gradient(circle, ${nodeStyle.shadowColor}40 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Container with 3D effect */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.3, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: (lesson.lesson_number || 0) * 0.05,
            }}
          >
            {/* Soft shadow beneath (like in the image) */}
            <div 
              className="absolute inset-0 rounded-full transition-all duration-200"
              style={{
                transform: isPressed ? 'translateY(4px)' : isHovered ? 'translateY(3px)' : 'translateY(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                filter: 'blur(8px)',
                opacity: isPressed ? 0.3 : isHovered ? 0.35 : 0.4,
                zIndex: 0,
              }}
            />
            
            {/* Main Circle with 3D disc effect */}
            <motion.button
              onClick={handleClick}
              disabled={!isClickable}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              className={`
                relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 rounded-full
                ${nodeStyle.bg}
                flex items-center justify-center
                transition-all duration-200
                ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
                overflow-hidden
              `}
              style={{
                transform: isPressed ? 'translateY(2px)' : isHovered ? 'translateY(1px)' : 'translateY(0)',
                boxShadow: 'none',
                zIndex: 1,
              }}
            >
              {/* Top surface - uniform light color (flat top of disc) */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: nodeStyle.bg.includes('green') 
                    ? '#4ade80' // Uniform green (flat surface)
                    : nodeStyle.bg.includes('yellow')
                    ? '#facc15' // Uniform yellow
                    : nodeStyle.bg.includes('indigo')
                    ? '#818cf8' // Uniform indigo
                    : '#d1d5db', // Uniform gray
                  zIndex: 2,
                }}
              />
              
              {/* Bottom/side edge - darker to simulate 3D disc thickness (like Duolingo image) */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(ellipse 120% 80% at 50% 110%, ${nodeStyle.shadowColor} 0%, ${nodeStyle.shadowColor} 45%, transparent 65%)`,
                  zIndex: 1,
                }}
              />
              
              {/* Subtle highlight along top edge (like in Duolingo image) */}
              <div 
                className="absolute top-0 left-1/4 right-1/4 h-1/4 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.3) 0%, transparent 100%)',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
              {/* Icon */}
              <motion.div
                className={`
                  relative z-10
                  ${!isClickable ? 'opacity-50' : ''}
                  transition-transform duration-200
                `}
                whileHover={isClickable ? { scale: 1.1 } : {}}
              >
                {nodeStyle.icon}
              </motion.div>
              
              {/* Progress ring for current lesson */}
              {status === 'current' && lesson.progress?.score !== undefined && (
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="calc(50% - 8px)"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * (50 - 8)}`}
                    strokeDashoffset={`${2 * Math.PI * (50 - 8) * (1 - (lesson.progress?.score || 0) / 100)}`}
                    opacity="0.5"
                    className="transition-all duration-500"
                  />
                </svg>
              )}
              
              {/* Pulsing ring for current lesson */}
              {status === 'current' && (
                <>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-green-400 opacity-75 pointer-events-none"
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
                    className="absolute inset-0 rounded-full bg-green-400 opacity-50 pointer-events-none"
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
          </motion.div>

          {/* Hover Card */}
          <div className={`
            absolute top-0 z-20
            ${position === 'left' ? 'left-44 sm:left-48 md:left-52 lg:left-56' : 'right-44 sm:right-48 md:right-52 lg:right-56'}
            w-64 sm:w-72 md:w-80 bg-white rounded-2xl shadow-2xl p-5
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
            absolute top-1/2 -translate-y-1/2 w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-2.5 sm:h-3 md:h-3.5 lg:h-4
            ${status === 'completed' ? 'bg-green-500' : status === 'current' ? 'bg-yellow-500' : 'bg-gray-300'}
            ${position === 'left' ? '-right-14 sm:-right-16 md:-right-20 lg:-right-24 xl:-right-28' : '-left-14 sm:-left-16 md:-left-20 lg:-left-24 xl:-left-28'}
          `} />
        </div>
      </div>
    );
  }
);

LessonNode.displayName = 'LessonNode';

