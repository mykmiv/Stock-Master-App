import React from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import { LessonCard } from './LessonCard';
import { motion } from 'framer-motion';

interface LessonPathProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
}

interface DayGroup {
  dayNumber: number;
  title: string;
  lessons: LessonWithProgress[];
  allCompleted: boolean;
  treasureClaimed: boolean;
}

export function LessonPath({ lessons, onLessonClick }: LessonPathProps) {
  // Group lessons by day
  const daysMap = new Map<number, LessonWithProgress[]>();
  
  lessons.forEach(lesson => {
    const day = lesson.day_number || 1;
    if (!daysMap.has(day)) {
      daysMap.set(day, []);
    }
    daysMap.get(day)!.push(lesson);
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
        allCompleted: sortedLessons.every(l => l.isCompleted),
        treasureClaimed: false // TODO: Implement treasure system
      };
    })
    .sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className="relative py-8">
      {/* Vertical Path Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-indigo-300 to-gray-200 transform -translate-x-1/2 hidden md:block" />
      
      {/* Days Container */}
      <div className="space-y-20 relative z-10">
        {days.map((day, index) => (
          <motion.div
            key={day.dayNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Day Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-white px-6 py-3 rounded-full shadow-lg border-2 border-indigo-500"
              >
                <h3 className="font-bold text-lg text-indigo-700">
                  Jour {day.dayNumber}
                </h3>
                <p className="text-sm text-gray-600">{day.title}</p>
              </motion.div>
            </motion.div>

            {/* Lessons in a staggered pattern */}
            <div className="space-y-12 max-w-4xl mx-auto">
              {day.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className={`flex justify-${lessonIndex % 2 === 0 ? 'start' : 'end'}`}>
                  <LessonCard
                    lesson={lesson}
                    position={lessonIndex % 2 === 0 ? 'left' : 'right'}
                    onLessonClick={onLessonClick}
                  />
                </div>
              ))}
            </div>

            {/* Day Completion Treasure */}
            {day.allCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center mt-12"
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="inline-block cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-500">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Trésor débloqué!</p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
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
    6: 'Bases des Chandeliers',
    7: 'Support et Résistance',
    8: 'Analyse des Tendances',
    9: 'Moyennes Mobiles',
    10: 'Analyse du Volume',
  };
  
  return titles[dayNumber] || `Jour ${dayNumber}`;
}

