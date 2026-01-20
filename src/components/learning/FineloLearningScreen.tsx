import React, { useMemo, useState } from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import { FineloLessonPath } from './FineloLessonPath';
import { FineloPremiumBanner } from './FineloPremiumBanner';
import { EnhancedBackground } from './EnhancedBackground';
import { ChapterBanner } from './ChapterBanner';
import { ChapterDetailModal } from './ChapterDetailModal';
import { ScrollToCurrentLessonButton } from './ScrollToCurrentLessonButton';
import { CHAPTER_DEFINITIONS, getChapterByModuleId } from '@/data/chapters';
import { LearningPathType, getPathDisplayName } from '@/lib/learningPathLogic';
import { getPathConfig } from '@/config/learningPaths';

interface FineloLearningScreenProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
  currentPath?: LearningPathType;
  onPathChange?: (newPath: LearningPathType) => void;
}

const CHAPTER_COLORS = [
  'bg-[#58CC02]',      // Vert vif Duolingo
  'bg-[#1CB0F6]',      // Bleu vif
  'bg-[#CE82FF]',      // Violet vif
  'bg-[#FF9600]',      // Orange vif
  'bg-[#FF4B4B]',      // Rouge/Rose vif
  'bg-[#00D9FF]',      // Cyan vif
  'bg-[#7C3AED]',      // Indigo vif
  'bg-[#F59E0B]',      // Ambre vif
];

export function FineloLearningScreen({ 
  lessons, 
  onLessonClick,
  currentPath = 'zero_to_hero',
  onPathChange 
}: FineloLearningScreenProps) {
  const [selectedChapter, setSelectedChapter] = useState<{ id: number; number: number; title: string; color: string } | null>(null);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);

  // Group lessons by module (chapters)
  const chaptersMap = useMemo(() => {
    try {
      const map = new Map<number, LessonWithProgress[]>();
      
      if (!lessons || lessons.length === 0) {
        console.warn('No lessons provided to FineloLearningScreen');
        return map;
      }

      lessons.forEach((lesson) => {
        const moduleId = lesson.module_id || lesson.day_number || 1;
        if (!map.has(moduleId)) {
          map.set(moduleId, []);
        }
        map.get(moduleId)!.push(lesson);
      });

      // Sort lessons within each chapter by lesson_number
      map.forEach((chapterLessons) => {
        chapterLessons.sort((a, b) => {
          const aNum = typeof a.lesson_number === 'number' ? a.lesson_number : parseFloat(String(a.lesson_number || 0));
          const bNum = typeof b.lesson_number === 'number' ? b.lesson_number : parseFloat(String(b.lesson_number || 0));
          return aNum - bNum;
        });
      });

      return map;
    } catch (error) {
      console.error('Error grouping lessons by chapters:', error);
      return new Map<number, LessonWithProgress[]>();
    }
  }, [lessons]);

  // Build chapters array with definitions
  const chapters = useMemo(() => {
    try {
      if (chaptersMap.size === 0) {
        console.warn('No chapters found');
        return [];
      }

      return Array.from(chaptersMap.entries())
        .map(([moduleId, chapterLessons]) => {
          const chapterDef = getChapterByModuleId(moduleId) || {
            id: moduleId,
            number: moduleId,
            title: `Module ${moduleId}`,
            description: '',
            module_id: moduleId,
          };

          const totalLessons = chapterLessons.length;
          const completedLessons = chapterLessons.filter(l => l.isCompleted).length;

          return {
            id: chapterDef.id,
            number: chapterDef.number,
            title: chapterDef.title,
            description: chapterDef.description,
            color: CHAPTER_COLORS[(chapterDef.number - 1) % CHAPTER_COLORS.length],
            lessons: chapterLessons,
            totalLessons,
            completedLessons,
          };
        })
        .sort((a, b) => a.number - b.number);
    } catch (error) {
      console.error('Error building chapters array:', error);
      return [];
    }
  }, [chaptersMap]);

  const handleBookClick = (chapter: { id: number; number: number; title: string; color: string }) => {
    const fullChapter = chapters.find(c => c.id === chapter.id);
    if (fullChapter) {
      setSelectedChapter({
        id: fullChapter.id,
        number: fullChapter.number,
        title: fullChapter.title,
        color: fullChapter.color,
      });
      setIsChapterModalOpen(true);
    }
  };

  const pathName = getPathDisplayName(currentPath);
  const pathConfig = getPathConfig(currentPath);

  // Safety check: if no chapters, show empty state
  if (chapters.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Aucune leçon disponible
          </h2>
          <p className="text-gray-600">
            Les leçons seront bientôt disponibles!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced Background */}
      <EnhancedBackground />
      
      <div className="min-h-screen pb-36 sm:pb-40 relative px-2 sm:px-4">
        {/* Chapter Banner - Sticky Header */}
        <ChapterBanner
          chapters={chapters.map(c => ({ 
            id: c.id, 
            number: c.number, 
            title: c.title, 
            color: c.color,
            totalLessons: c.totalLessons,
            completedLessons: c.completedLessons
          }))}
          onBookClick={handleBookClick}
          pathName={pathName}
          pathLevel={pathConfig.level}
          currentPath={currentPath}
          onPathChange={onPathChange}
        />

        {/* Chapters and Lessons */}
        <div className="pb-8 pt-4 relative">
          {/* Gradient fade TOP - cache les nodes qui approchent du header */}
          <div 
            className="fixed top-0 left-0 right-0 h-40 pointer-events-none z-30"
            style={{
              background: 'linear-gradient(to bottom, white 0%, white 60%, transparent 100%)'
            }}
          />
          
          {(() => {
            // Calculer l'index global pour chaque chapitre (accumulation)
            let globalIndexCounter = 0;
            
            return chapters.map((chapter, index) => {
              const globalIndexOffset = globalIndexCounter;
              // Incrémenter le compteur pour le prochain chapitre
              globalIndexCounter += chapter.lessons.length;
              
              return (
                <React.Fragment key={chapter.id}>
                  {/* Chapter Content - le titre est intégré dans le parcours */}
                  <div 
                    id={`chapter-${chapter.id}`}
                    className="scroll-mt-20"
                  >
                    <FineloLessonPath 
                      lessons={chapter.lessons} 
                      onLessonClick={onLessonClick}
                      chapterTitle={chapter.title}
                      globalIndexOffset={globalIndexOffset}
                    />
                  </div>
                </React.Fragment>
              );
            });
          })()}
          
          {/* Gradient fade BOTTOM - cache les nodes qui approchent de la bottom nav */}
          <div 
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
            style={{
              background: 'linear-gradient(to top, white 0%, white 50%, transparent 100%)'
            }}
          />
        </div>

        {/* Premium Banner - Now fixed at bottom */}
        <FineloPremiumBanner />
      </div>

      {/* Scroll to Current Lesson Button */}
      <ScrollToCurrentLessonButton lessons={lessons} />

      {/* Chapter Detail Modal */}
      <ChapterDetailModal
        chapter={selectedChapter ? {
          id: selectedChapter.id,
          number: selectedChapter.number,
          title: selectedChapter.title,
          color: selectedChapter.color,
          description: chapters.find(c => c.id === selectedChapter.id)?.description,
        } : null}
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        currentPath={currentPath}
        onPathChange={onPathChange}
        chapterLessons={selectedChapter ? chapters.find(c => c.id === selectedChapter.id)?.lessons || [] : []}
      />
    </>
  );
}

