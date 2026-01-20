import React, { useEffect, useRef, useState } from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import { DaySection } from './DuolingoDaySection';
import { StatsHeader } from './DuolingoStatsHeader';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface DuolingoPathProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
}

interface DayGroup {
  dayNumber: number;
  title: string;
  lessons: LessonWithProgress[];
}

export function DuolingoPath({ lessons, onLessonClick }: DuolingoPathProps) {
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Group lessons by day
  const daysMap = new Map<number, LessonWithProgress[]>();
  
  lessons.forEach((lesson, index) => {
    const day = lesson.day_number || 1;
    if (!daysMap.has(day)) {
      daysMap.set(day, []);
    }
    
    // Assign position (zigzag pattern)
    const dayLessons = daysMap.get(day)!;
    const position = dayLessons.length % 2 === 0 ? 'left' : 'right';
    const lessonWithPosition = { ...lesson, position } as LessonWithProgress & { position: 'left' | 'right' };
    
    daysMap.get(day)!.push(lessonWithPosition);
  });

  const days: DayGroup[] = Array.from(daysMap.entries())
    .map(([dayNumber, dayLessons]) => {
      const sortedLessons = dayLessons.sort((a, b) => 
        (a.lesson_number || 0) - (b.lesson_number || 0)
      );
      
      return {
        dayNumber,
        title: getDayTitle(dayNumber),
        lessons: sortedLessons,
      };
    })
    .sort((a, b) => a.dayNumber - b.dayNumber);

  // Find current lesson index
  const currentLessonIndex = lessons.findIndex(l => l.isCurrent);
  const currentDayIndex = days.findIndex(day => 
    day.lessons.some(l => l.isCurrent)
  );

  // Auto-scroll to current lesson on initial load
  useEffect(() => {
    if (isInitialLoad && currentLessonRef.current && scrollContainerRef.current && currentDayIndex >= 0) {
      setTimeout(() => {
        currentLessonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setIsInitialLoad(false);
      }, 500);
    }
  }, [lessons, isInitialLoad, currentDayIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      {/* Fixed Header with Stats */}
      <StatsHeader />

      {/* Scrollable Path Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-y-auto"
        style={{ height: 'calc(100vh - 140px)' }}
      >
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          {/* Central connecting line */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-2.5 sm:w-3 md:w-3.5 lg:w-4 xl:w-4.5 -translate-x-1/2 z-0"
            style={{
              background: 'linear-gradient(to bottom, #10B981 0%, #F59E0B 30%, #9CA3AF 100%)'
            }}
          />

          {/* Lessons grouped by day */}
          <div className="space-y-12 relative z-10">
            {days.map((day, index) => (
              <DaySection
                key={day.dayNumber}
                day={day}
                currentLessonRef={currentLessonRef}
                onLessonClick={onLessonClick}
                isCurrentDay={index === currentDayIndex}
              />
            ))}
          </div>

          {/* End of path indicator */}
          <div className="text-center mt-16 mb-8">
            <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-purple-500">
              <Trophy className="w-6 h-6 text-purple-500" />
              <span className="font-bold text-lg text-purple-700">
                Tu as atteint la fin! Plus de contenu bientôt 🚀
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDayTitle(dayNumber: number): string {
  const titles: Record<number, string> = {
    1: 'Introduction au Trading',
    2: 'Bases du Marché',
    3: 'Introduction aux Graphiques',
    4: 'Analyse Fondamentale',
    5: 'Gestion des Risques 101',
  };
  
  return titles[dayNumber] || `Jour ${dayNumber}`;
}

