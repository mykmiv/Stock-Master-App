import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { LessonWithProgress } from '@/hooks/useLessons';
import { LessonNodeDuolingo, NodeState } from './LessonNodeDuolingo';
import { ModuleSection } from './ModuleSection';
import { cn } from '@/lib/utils';

interface LearningPathContainerProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress, state: NodeState) => void;
  lessonsPerModule?: number;
}

interface ModuleData {
  moduleNumber: number;
  title: string;
  lessons: LessonWithProgress[];
  isUnlocked: boolean;
  completedCount: number;
}

export function LearningPathContainer({
  lessons,
  onLessonClick,
  lessonsPerModule = 4,
}: LearningPathContainerProps) {
  // Group lessons into modules
  const modules = useMemo((): ModuleData[] => {
    const result: ModuleData[] = [];

    for (let i = 0; i < lessons.length; i += lessonsPerModule) {
      const moduleLessons = lessons.slice(i, i + lessonsPerModule);
      const moduleNumber = Math.floor(i / lessonsPerModule) + 1;
      const previousModuleEnd = i;
      const isUnlocked = moduleNumber === 1 || lessons.slice(0, previousModuleEnd).some(l => l.isCompleted);
      const completedCount = moduleLessons.filter(l => l.isCompleted).length;

      const levelNames: Record<string, string> = {
        beginner: 'Les Fondamentaux',
        intermediate: 'Stratégies',
        advanced: 'Maîtrise Avancée',
      };

      const primaryLevel = moduleLessons[0]?.level || 'beginner';

      result.push({
        moduleNumber,
        title: `${levelNames[primaryLevel]} - Module ${moduleNumber}`,
        lessons: moduleLessons,
        isUnlocked,
        completedCount,
      });
    }

    return result;
  }, [lessons, lessonsPerModule]);

  // Get node state for a lesson
  const getNodeState = (
    lesson: LessonWithProgress,
    index: number,
    moduleLessons: LessonWithProgress[]
  ): NodeState => {
    if (lesson.isLocked) return 'locked';
    if (lesson.isCompleted) return 'completed';

    // Check if this is the current lesson (first uncompleted, unlocked)
    const firstUncompletedIndex = moduleLessons.findIndex(l => !l.isCompleted && !l.isLocked);
    if (index === firstUncompletedIndex) return 'current';

    return 'locked';
  };

  // Zigzag pattern for nodes
  const getNodeOffset = (index: number): number => {
    const pattern = index % 4;
    switch (pattern) {
      case 0: return 0;
      case 1: return 60;
      case 2: return 0;
      case 3: return -60;
      default: return 0;
    }
  };

  // Generate connector path between two nodes
  const getConnectorPath = (fromOffset: number, toOffset: number): string => {
    const startX = 64 + fromOffset * 0.5;
    const endX = 64 + toOffset * 0.5;
    const midX = (startX + endX) / 2;

    return `M ${startX} 0 Q ${midX} 24 ${endX} 48`;
  };

  let globalIndex = 0;

  return (
    <div className="relative max-w-lg mx-auto py-8 px-4">
      {/* Central gradient line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />

      {modules.map((module) => {
        const startIndex = globalIndex;

        return (
          <ModuleSection
            key={module.moduleNumber}
            moduleNumber={module.moduleNumber}
            title={module.title}
            completedCount={module.completedCount}
            totalCount={module.lessons.length}
            isUnlocked={module.isUnlocked}
          >
            <div className="flex flex-col items-center relative">
              {module.lessons.map((lesson, localIndex) => {
                const currentGlobalIndex = globalIndex++;
                const state = getNodeState(lesson, localIndex, module.lessons);
                const offset = getNodeOffset(localIndex);
                const isLast = localIndex === module.lessons.length - 1;
                const nextOffset = !isLast ? getNodeOffset(localIndex + 1) : 0;

                return (
                  <div key={lesson.id} className="relative">
                    {/* Connector Line */}
                    {!isLast && (
                      <svg
                        className="absolute top-[76px] left-1/2 -translate-x-1/2 w-32 h-12 z-0 pointer-events-none"
                        viewBox="0 0 128 48"
                      >
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: currentGlobalIndex * 0.04 + 0.3, duration: 0.4 }}
                          d={getConnectorPath(offset, nextOffset)}
                          fill="none"
                          stroke={
                            lesson.isCompleted
                              ? 'hsl(var(--primary))'
                              : 'hsl(var(--muted-foreground) / 0.25)'
                          }
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={lesson.isCompleted ? '0' : '8 8'}
                        />
                      </svg>
                    )}

                    {/* Node */}
                    <motion.div
                      style={{ marginLeft: offset }}
                      className="relative z-10 mb-8"
                    >
                      <LessonNodeDuolingo
                        state={state}
                        xpReward={lesson.xpReward}
                        quizScore={lesson.quizScore}
                        onClick={() => onLessonClick(lesson, state)}
                        index={currentGlobalIndex}
                        title={lesson.title}
                        isFirst={localIndex === 0}
                        moduleNumber={localIndex === 0 ? module.moduleNumber : undefined}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </ModuleSection>
        );
      })}
    </div>
  );
}
