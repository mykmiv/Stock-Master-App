import React, { useMemo } from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import { FineloLearningHeader } from './FineloLearningHeader';
import { FineloModuleHeader } from './FineloModuleHeader';
import { FineloLessonPath } from './FineloLessonPath';
import { FineloPremiumBanner } from './FineloPremiumBanner';
import { FineloBottomNav } from './FineloBottomNav';
import { EnhancedBackground } from './EnhancedBackground';

interface FineloLearningScreenProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
}

export function FineloLearningScreen({ lessons, onLessonClick }: FineloLearningScreenProps) {
  // Group lessons by module (using module_id, fallback to day_number)
  const modulesMap = useMemo(() => {
    const map = new Map<number, LessonWithProgress[]>();
    
    lessons.forEach((lesson) => {
      const moduleId = lesson.module_id || lesson.day_number || 1;
      if (!map.has(moduleId)) {
        map.set(moduleId, []);
      }
      map.get(moduleId)!.push(lesson);
    });

    // Sort lessons within each module by lesson_number
    map.forEach((moduleLessons) => {
      moduleLessons.sort((a, b) => (a.lesson_number || 0) - (b.lesson_number || 0));
    });

    return map;
  }, [lessons]);

  const modules = Array.from(modulesMap.entries())
    .map(([moduleNumber, moduleLessons]) => ({
      moduleNumber,
      lessons: moduleLessons,
      moduleTitle: moduleNumber === 1 ? 'Trading Fundamentals' : 
                   moduleNumber === 2 ? 'Technical Analysis' : 
                   `Module ${moduleNumber}`
    }))
    .sort((a, b) => a.moduleNumber - b.moduleNumber);

  return (
    <>
      {/* Enhanced Background */}
      <EnhancedBackground />
      
      <div className="min-h-screen pb-24 relative">
        {/* Header */}
        <FineloLearningHeader />

      {/* Modules and Lessons */}
      <div className="pb-8">
        {modules.map((module) => (
          <div key={module.moduleNumber}>
            <FineloModuleHeader 
              moduleNumber={module.moduleNumber} 
              moduleTitle={module.moduleTitle}
            />
            <FineloLessonPath 
              lessons={module.lessons} 
              onLessonClick={onLessonClick}
            />
          </div>
        ))}
      </div>

      {/* Premium Banner */}
      <FineloPremiumBanner />

        {/* Bottom Navigation */}
        <FineloBottomNav />
      </div>
    </>
  );
}

