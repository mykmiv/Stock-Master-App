import React from 'react';
import { Lock, Check, BookOpen, Clock, Star } from 'lucide-react';
import { LessonWithProgress } from '@/types/lesson.types';
import { motion } from 'framer-motion';

interface LessonCardProps {
  lesson: LessonWithProgress;
  position: 'left' | 'right';
  onLessonClick: (lesson: LessonWithProgress) => void;
}

export function LessonCard({ lesson, position, onLessonClick }: LessonCardProps) {
  const bgColor = lesson.isCompleted 
    ? 'bg-green-500' 
    : lesson.isCurrent 
    ? 'bg-indigo-500' 
    : lesson.isLocked 
    ? 'bg-gray-300'
    : 'bg-white border-2 border-indigo-300';
    
  const Icon = BookOpen;
  
  const handleClick = () => {
    if (!lesson.isLocked) {
      onLessonClick(lesson);
    }
  };

  const justifyClass = position === 'left' ? 'justify-start' : 'justify-end';
  
  return (
    <div className={`flex ${justifyClass} px-4`}>
      <motion.div 
        className={`
          relative group cursor-pointer
          ${position === 'left' ? 'mr-auto' : 'ml-auto'}
        `}
        style={{ maxWidth: '280px' }}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Lesson Circle */}
        <motion.div
          whileHover={!lesson.isLocked ? { scale: 1.1, rotate: 5 } : {}}
          whileTap={!lesson.isLocked ? { scale: 0.95 } : {}}
          className={`
            w-20 h-20 rounded-full shadow-xl
            flex items-center justify-center
            border-4 border-white
            transition-all duration-300
            ${bgColor}
            ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl cursor-pointer'}
          `}
        >
          {lesson.isLocked ? (
            <Lock className="w-10 h-10 text-white" />
          ) : lesson.isCompleted ? (
            <Check className="w-10 h-10 text-white" />
          ) : (
            <Icon className="w-10 h-10 text-indigo-600" />
          )}
        </motion.div>

        {/* Lesson Info Card */}
        <div className={`
          absolute ${position === 'left' ? 'left-24' : 'right-24'} top-0
          bg-white rounded-xl shadow-lg p-4 border-2
          w-48 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          z-10
          ${lesson.isCompleted ? 'border-green-500' : lesson.isCurrent ? 'border-indigo-500' : 'border-gray-200'}
        `}>
          <h4 className="font-bold text-sm mb-1">{lesson.title}</h4>
          {lesson.description && (
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
          )}
          
          {lesson.isCompleted && lesson.progress?.score !== null && (
            <div className="flex items-center gap-2 text-xs">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              <span className="font-medium">{lesson.progress.score}%</span>
            </div>
          )}
          
          {!lesson.isLocked && !lesson.isCompleted && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimated_duration_minutes || 5} min</span>
            </div>
          )}
        </div>

        {/* Stars for perfect score */}
        {lesson.isCompleted && lesson.progress?.score === 100 && (
          <motion.div 
            className="absolute -top-2 -right-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="relative">
              <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                3
              </span>
            </div>
          </motion.div>
        )}

        {/* Lesson Number Badge */}
        {!lesson.isLocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="absolute -bottom-1 -left-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
          >
            {lesson.lesson_number || '?'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

