import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Level, getTierColor } from '@/data/xpLevels';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface XPBarProps {
  currentLevel: Level;
  xpProgress: { current: number; needed: number; percent: number };
  totalXP: number;
  compact?: boolean;
}

export function XPBar({ currentLevel, xpProgress, totalXP, compact = false }: XPBarProps) {
  const nextLevel = currentLevel.level < 100 ? currentLevel.level + 1 : 100;

  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all"
          >
            <div className="flex items-center gap-1">
              <span className="text-lg">{currentLevel.badge}</span>
              <span className="font-black text-sm">{currentLevel.level}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-warning fill-warning" />
              <span className="text-xs font-bold text-muted-foreground">
                {xpProgress.current}/{xpProgress.needed}
              </span>
            </div>
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <XPBarExpanded 
            currentLevel={currentLevel} 
            xpProgress={xpProgress} 
            totalXP={totalXP}
            nextLevel={nextLevel}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <XPBarExpanded 
      currentLevel={currentLevel} 
      xpProgress={xpProgress} 
      totalXP={totalXP}
      nextLevel={nextLevel}
    />
  );
}

function XPBarExpanded({ 
  currentLevel, 
  xpProgress, 
  totalXP,
  nextLevel 
}: XPBarProps & { nextLevel: number }) {
  return (
    <div className="space-y-3">
      {/* Level info header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-3xl"
          >
            {currentLevel.badge}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-black">
                Lvl {currentLevel.level}
              </Badge>
              <span className={cn("text-xs font-bold", getTierColor(currentLevel.tier))}>
                {currentLevel.tier}
              </span>
            </div>
            <p className="text-sm font-bold">{currentLevel.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total XP</p>
          <p className="font-black text-primary">{totalXP.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Prochain niveau</span>
          <span className="font-bold">
            {xpProgress.current} / {xpProgress.needed} XP
          </span>
        </div>
        <div className="relative">
          <Progress value={xpProgress.percent} className="h-3" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          >
            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold">
              {nextLevel}
            </div>
          </motion.div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{xpProgress.needed - xpProgress.current} XP restants</span>
          <span className="flex items-center gap-1">
            Lvl {nextLevel}
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
