import { Star, Trophy, Flame, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressOverviewProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  completedCount: number;
  totalCount: number;
  streak: number;
}

export function ProgressOverview({ level, xp, completedCount, totalCount, streak }: ProgressOverviewProps) {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const xpToNext = level === 'beginner' ? 500 : level === 'intermediate' ? 2000 : null;
  const xpProgress = xpToNext ? Math.min(100, (xp / xpToNext) * 100) : 100;
  
  const getLevelConfig = () => {
    switch (level) {
      case 'beginner': return { color: 'bg-primary', gradient: 'from-primary to-emerald-500', text: 'text-primary' };
      case 'intermediate': return { color: 'bg-secondary', gradient: 'from-secondary to-blue-500', text: 'text-secondary' };
      case 'advanced': return { color: 'bg-purple-500', gradient: 'from-purple-500 to-pink-500', text: 'text-purple-500' };
    }
  };

  const config = getLevelConfig();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated overflow-hidden"
    >
      <div className={cn("h-2 bg-gradient-to-r", config.gradient)} />
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Level */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Level</p>
            <div className="flex items-center gap-2">
              <div className={cn("icon-circle-sm", config.color)}>
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <span className={cn("font-black text-lg capitalize", config.text)}>{level}</span>
            </div>
          </motion.div>

          {/* XP Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">XP</p>
              <span className="text-xs font-black text-warning">
                {xp} {xpToNext && `/ ${xpToNext}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-warning to-orange-500"
                />
              </div>
            </div>
            {xpToNext && (
              <p className="text-xs text-muted-foreground">
                {xpToNext - xp} XP to {level === 'beginner' ? 'Intermediate' : 'Advanced'}
              </p>
            )}
          </motion.div>

          {/* Lessons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Lessons</p>
              <span className="text-xs font-black">{completedCount}/{totalCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-emerald-500"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{progressPercent}% complete</p>
          </motion.div>

          {/* Streak */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Streak</p>
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl w-fit",
              streak > 0 ? "bg-gradient-red" : "bg-muted"
            )}>
              <Flame className={cn(
                "h-5 w-5",
                streak > 0 ? "text-destructive animate-pulse" : "text-muted-foreground"
              )} />
              <span className={cn(
                "font-black",
                streak > 0 ? "text-destructive" : "text-muted-foreground"
              )}>
                {streak} {streak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
