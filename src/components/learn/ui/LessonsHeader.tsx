import { motion } from 'framer-motion';
import { BookOpen, Flame, Star, Trophy } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { cn } from '@/lib/utils';

interface LessonsHeaderProps {
  pathName: string;
  pathDescription?: string;
  progressPercent: number;
  completedCount: number;
  totalCount: number;
  xp: number;
  streak: number;
  className?: string;
}

export function LessonsHeader({
  pathName,
  pathDescription,
  progressPercent,
  completedCount,
  totalCount,
  xp,
  streak,
  className,
}: LessonsHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'sticky top-0 z-40 w-full',
        'bg-background/80 backdrop-blur-xl border-b border-border/50',
        'px-4 py-3',
        className
      )}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Path Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-foreground truncate">{pathName}</h1>
            {pathDescription && (
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                {pathDescription}
              </p>
            )}
          </div>
        </div>

        {/* Center: Progress (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3">
          <CircularProgress value={progressPercent} size={48} strokeWidth={5}>
            <span className="text-xs font-bold">{progressPercent}%</span>
          </CircularProgress>
          <div className="text-sm">
            <span className="font-bold text-foreground">{completedCount}</span>
            <span className="text-muted-foreground">/{totalCount} leçons</span>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* XP Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-warning/10 px-2.5 py-1.5 rounded-full"
          >
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="text-sm font-bold text-warning">{xp.toLocaleString()}</span>
          </motion.div>

          {/* Streak Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full',
              streak > 0 ? 'bg-destructive/10' : 'bg-muted'
            )}
          >
            <Flame className={cn('h-4 w-4', streak > 0 ? 'text-destructive fill-destructive' : 'text-muted-foreground')} />
            <span className={cn('text-sm font-bold', streak > 0 ? 'text-destructive' : 'text-muted-foreground')}>
              {streak}
            </span>
          </motion.div>

          {/* Trophy (mobile progress indicator) */}
          <div className="md:hidden flex items-center gap-1 text-primary">
            <Trophy className="h-4 w-4" />
            <span className="text-xs font-bold">{progressPercent}%</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
