import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2, Lock, Flame } from 'lucide-react';

interface DaySectionProps {
  dayNumber: number;
  title: string;
  completedCount: number;
  totalCount: number;
  isUnlocked: boolean;
  children: ReactNode;
}

export function DaySection({ 
  dayNumber, 
  title, 
  completedCount, 
  totalCount, 
  isUnlocked,
  children 
}: DaySectionProps) {
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Sticky Header */}
      <div className={cn(
        "sticky top-16 z-20 py-4 backdrop-blur-md bg-background/80 border-b border-border/50"
      )}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Day Badge */}
            <div className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl font-black text-lg",
              isComplete ? "bg-primary text-primary-foreground" :
              isUnlocked ? "bg-secondary text-secondary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {isComplete ? <CheckCircle2 className="h-6 w-6" /> :
               !isUnlocked ? <Lock className="h-5 w-5" /> :
               <span>{dayNumber}</span>}
            </div>
            
            <div>
              <h2 className="text-lg font-black">{title}</h2>
              <p className="text-sm text-muted-foreground">
                {isUnlocked ? `${completedCount}/${totalCount} lessons` : 'Complete previous day to unlock'}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          {isUnlocked && (
            <div className="flex items-center gap-2">
              {isComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-primary font-bold text-sm"
                >
                  <Flame className="h-4 w-4 fill-primary" />
                  Complete!
                </motion.div>
              )}
              <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={cn(
                    "h-full rounded-full",
                    isComplete ? "bg-primary" : "bg-secondary"
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lessons Content */}
      <div className={cn(
        "pt-8 pb-12",
        !isUnlocked && "opacity-40 pointer-events-none"
      )}>
        {children}
      </div>
    </motion.section>
  );
}
