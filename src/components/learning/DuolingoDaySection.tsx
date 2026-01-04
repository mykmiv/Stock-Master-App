import React from 'react';
import { Check } from 'lucide-react';
import { LessonWithProgress } from '@/types/lesson.types';
import { LessonNode } from './DuolingoLessonNode';
import { TreasureChest } from './TreasureChest';

interface DaySectionProps {
  day: {
    dayNumber: number;
    title: string;
    lessons: (LessonWithProgress & { position?: 'left' | 'right' })[];
  };
  currentLessonRef: React.RefObject<HTMLDivElement>;
  onLessonClick: (lesson: LessonWithProgress) => void;
  isCurrentDay: boolean;
}

export function DaySection({ day, currentLessonRef, onLessonClick, isCurrentDay }: DaySectionProps) {
  const allCompleted = day.lessons.every(l => l.isCompleted);
  
  return (
    <div className="relative">
      {/* Day Header */}
      <div className="flex justify-center mb-12">
        <div className="relative z-10 bg-white px-8 py-4 rounded-full shadow-xl border-3 border-indigo-500">
          <div className="text-center">
            <h3 className="font-black text-xl text-indigo-700">
              Jour {day.dayNumber}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {day.title}
            </p>
            {allCompleted && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lessons in zigzag pattern */}
      <div className="space-y-6">
        {day.lessons.map((lesson, index) => {
          const lessonWithPosition = {
            ...lesson,
            position: lesson.position || (index % 2 === 0 ? 'left' : 'right')
          };
          
          return (
            <LessonNode
              key={lesson.id}
              lesson={lessonWithPosition}
              ref={lesson.isCurrent ? currentLessonRef : null}
              onLessonClick={onLessonClick}
            />
          );
        })}
      </div>

      {/* Treasure Chest if day completed */}
      {allCompleted && (
        <div className="flex justify-center mt-8 mb-12">
          <TreasureChest dayNumber={day.dayNumber} />
        </div>
      )}
    </div>
  );
}

