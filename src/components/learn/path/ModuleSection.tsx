import { motion } from 'framer-motion';
import { BookOpen, Check, Lock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleSectionProps {
  moduleNumber: number;
  title: string;
  completedCount: number;
  totalCount: number;
  isUnlocked: boolean;
  children: React.ReactNode;
}

export function ModuleSection({
  moduleNumber,
  title,
  completedCount,
  totalCount,
  isUnlocked,
  children,
}: ModuleSectionProps) {
  const isComplete = completedCount === totalCount && totalCount > 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleNumber * 0.1 }}
      className={cn(
        'relative mb-12',
        !isUnlocked && 'opacity-50'
      )}
    >
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: moduleNumber * 0.1 + 0.1 }}
        className={cn(
          'flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl',
          'bg-card/80 backdrop-blur-sm border border-border/50',
          isComplete && 'border-primary/30 bg-primary/5'
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
            isComplete
              ? 'bg-primary text-primary-foreground'
              : isUnlocked
              ? 'bg-secondary/10 text-secondary'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isComplete ? (
            <Trophy className="h-5 w-5" />
          ) : isUnlocked ? (
            <BookOpen className="h-5 w-5" />
          ) : (
            <Lock className="h-5 w-5" />
          )}
        </div>

        {/* Title and Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-foreground truncate">{title}</h2>
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="shrink-0"
              >
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                  <Check className="h-3 w-3" />
                  Complété
                </div>
              </motion.div>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: moduleNumber * 0.1 + 0.3, duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground shrink-0">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Module Content */}
      <div className={cn(!isUnlocked && 'pointer-events-none')}>
        {children}
      </div>
    </motion.section>
  );
}
