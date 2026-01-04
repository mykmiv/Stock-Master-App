import { useMemo } from 'react';
import { LessonWithProgress } from '@/hooks/useLessons';
import { LessonNode, NodeState } from './LessonNode';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LearningPathProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress, state: NodeState) => void;
}

export function LearningPath({ lessons, onLessonClick }: LearningPathProps) {
  // Find the first uncompleted lesson to mark as current
  const currentLessonIndex = useMemo(() => {
    const idx = lessons.findIndex(l => !l.isCompleted && !l.isLocked);
    return idx >= 0 ? idx : -1;
  }, [lessons]);

  const getNodeState = (lesson: LessonWithProgress, index: number): NodeState => {
    if (lesson.isLocked) return 'locked';
    if (lesson.isCompleted) return 'completed';
    if (index === currentLessonIndex) return 'current';
    return 'locked'; // Not yet reached
  };

  // Create a zigzag pattern for the path
  const getNodePosition = (index: number): { x: number; align: 'left' | 'center' | 'right' } => {
    const pattern = index % 4;
    switch (pattern) {
      case 0: return { x: 0, align: 'center' };
      case 1: return { x: 60, align: 'right' };
      case 2: return { x: 0, align: 'center' };
      case 3: return { x: -60, align: 'left' };
      default: return { x: 0, align: 'center' };
    }
  };

  return (
    <div className="relative flex flex-col items-center py-8">
      {lessons.map((lesson, index) => {
        const state = getNodeState(lesson, index);
        const position = getNodePosition(index);
        const isLast = index === lessons.length - 1;

        return (
          <div key={lesson.id} className="relative">
            {/* Connector Line */}
            {!isLast && (
              <svg
                className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-16 z-0"
                viewBox="0 0 128 64"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  d={getConnectorPath(index)}
                  fill="none"
                  stroke={state === 'completed' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.3)'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8 8"
                />
              </svg>
            )}

            {/* Node */}
            <motion.div
              style={{ marginLeft: position.x }}
              className="relative z-10 mb-8"
            >
              <LessonNode
                state={state}
                xpReward={lesson.xpReward}
                quizScore={lesson.quizScore}
                onClick={() => onLessonClick(lesson, state)}
                index={index}
                title={lesson.title}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function getConnectorPath(index: number): string {
  const pattern = index % 4;
  // Simple curved connector paths based on zigzag pattern
  switch (pattern) {
    case 0: return 'M 64 0 Q 90 32 64 64'; // center to right
    case 1: return 'M 64 0 Q 38 32 64 64'; // right to center
    case 2: return 'M 64 0 Q 38 32 64 64'; // center to left
    case 3: return 'M 64 0 Q 90 32 64 64'; // left to center
    default: return 'M 64 0 L 64 64';
  }
}
