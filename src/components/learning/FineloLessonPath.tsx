import React from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import { FineloLessonNode } from './FineloLessonNode';

interface FineloLessonPathProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
}

export function FineloLessonPath({ lessons, onLessonClick }: FineloLessonPathProps) {
  // Group lessons by day to determine which is last of each day
  const lessonsByDay = new Map<number, LessonWithProgress[]>();
  lessons.forEach((lesson) => {
    const day = lesson.day_number || 1;
    if (!lessonsByDay.has(day)) {
      lessonsByDay.set(day, []);
    }
    lessonsByDay.get(day)!.push(lesson);
  });

  // Determine which lessons are last of their day
  const isLastOfDayMap = new Map<string, boolean>();
  lessonsByDay.forEach((dayLessons) => {
    if (dayLessons.length > 0) {
      const lastLesson = dayLessons[dayLessons.length - 1];
      isLastOfDayMap.set(lastLesson.id, true);
    }
  });

  return (
    <div className="relative px-6 py-12">
      {/* No background needed here - we have the global EnhancedBackground */}
      
      <div className="relative space-y-20">
        {lessons.map((lesson, index) => {
          // Zigzag positioning - alternate left and right
          const position = index % 2 === 0 ? 'left' : 'right';
          const isLeft = position === 'left';
          const isFirst = index === 0;
          const isLastOfDay = isLastOfDayMap.get(lesson.id) || false;
          
          return (
            <div key={lesson.id} className="relative">
              {/* Connecting Curve to Next Lesson */}
              {index < lessons.length - 1 && (
                <svg
                  className="absolute top-28 left-1/2 -translate-x-1/2 pointer-events-none z-0"
                  width="160"
                  height="90"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={
                        lesson.isCompleted ? '#818CF8' : 
                        lesson.isCurrent ? '#A78BFA' : 
                        '#E0E7FF'
                      } />
                      <stop offset="100%" stopColor={
                        lessons[index + 1]?.isCompleted ? '#818CF8' : 
                        lessons[index + 1]?.isCurrent ? '#A78BFA' : 
                        '#E0E7FF'
                      } />
                    </linearGradient>
                  </defs>
                  <path
                    d={isLeft 
                      ? "M 80 0 Q 110 45 80 90"
                      : "M 80 0 Q 50 45 80 90"
                    }
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={lesson.isLocked ? '10,10' : '0'}
                    strokeLinecap="round"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  />
                </svg>
              )}

              {/* Lesson Node - with extra margin for labels */}
              <div 
                className={`
                  flex justify-center relative z-10
                  ${isLeft ? 'mr-24' : 'ml-24'}
                `}
                onClick={() => !lesson.isLocked && onLessonClick(lesson)}
              >
                <FineloLessonNode 
                  lesson={lesson} 
                  isFirst={isFirst} 
                  index={index} 
                  isLastOfDay={isLastOfDay}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

