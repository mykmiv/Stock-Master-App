import { Lock, Play, Check, BookOpen, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NodeState = 'locked' | 'current' | 'in_progress' | 'completed';

interface LessonNodeDuolingoProps {
  state: NodeState;
  xpReward?: number;
  quizScore?: number | null;
  onClick: () => void;
  index: number;
  title: string;
  isFirst?: boolean;
  moduleNumber?: number;
}

export function LessonNodeDuolingo({
  state,
  xpReward,
  quizScore,
  onClick,
  index,
  title,
  isFirst,
  moduleNumber,
}: LessonNodeDuolingoProps) {
  const isPerfect = quizScore === 100;

  const getNodeStyles = () => {
    switch (state) {
      case 'locked':
        return 'bg-muted border-muted-foreground/30';
      case 'current':
        return 'bg-gradient-to-br from-warning to-amber-500 border-warning shadow-lg shadow-warning/40';
      case 'in_progress':
        return 'bg-gradient-to-br from-primary to-emerald-500 border-primary shadow-lg shadow-primary/30';
      case 'completed':
        return 'bg-gradient-to-br from-primary to-emerald-400 border-primary';
    }
  };

  const getGlowStyles = () => {
    switch (state) {
      case 'current':
        return 'shadow-[0_0_30px_hsl(var(--warning)/0.5)]';
      case 'in_progress':
        return 'shadow-[0_0_20px_hsl(var(--primary)/0.4)]';
      case 'completed':
        if (isPerfect) return 'shadow-[0_0_20px_hsl(var(--warning)/0.4)]';
        return '';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    return state === 'locked' ? 'text-muted-foreground' : 'text-white';
  };

  const renderIcon = () => {
    const iconClass = cn('h-8 w-8', getIconColor());

    switch (state) {
      case 'locked':
        return <Lock className={iconClass} />;
      case 'current':
        return <Play className={cn(iconClass, 'fill-current ml-0.5')} />;
      case 'in_progress':
        return <BookOpen className={iconClass} />;
      case 'completed':
        return isPerfect
          ? <Crown className={cn(iconClass, 'fill-current')} />
          : <Check className={cn(iconClass, 'stroke-[3]')} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      className="relative flex flex-col items-center group"
    >
      {/* Crown badge for first lesson in module */}
      {isFirst && moduleNumber && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.06 + 0.2 }}
          className="absolute -top-8 flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-bold"
        >
          <Crown className="h-3 w-3" />
          Module {moduleNumber}
        </motion.div>
      )}

      {/* Main Node */}
      <motion.button
        onClick={onClick}
        disabled={state === 'locked'}
        whileHover={state !== 'locked' ? { scale: 1.1, y: -4 } : {}}
        whileTap={state !== 'locked' ? { scale: 0.95 } : {}}
        className={cn(
          'relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all',
          getNodeStyles(),
          getGlowStyles(),
          state !== 'locked' && 'cursor-pointer hover:border-opacity-100',
          state === 'locked' && 'cursor-not-allowed opacity-60'
        )}
        aria-label={title}
      >
        {/* Pulse animation for current */}
        {state === 'current' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-warning/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Inner glow ring */}
        {(state === 'completed' || state === 'in_progress') && (
          <div className="absolute inset-1 rounded-full bg-white/10" />
        )}

        {/* Icon */}
        <div className="relative z-10">{renderIcon()}</div>
      </motion.button>

      {/* XP Badge for completed */}
      {state === 'completed' && xpReward && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: index * 0.06 + 0.2, type: 'spring' }}
          className="absolute -bottom-1 -right-1 flex items-center gap-0.5 bg-warning text-warning-foreground px-2 py-0.5 rounded-full text-xs font-bold shadow-md"
        >
          <Star className="h-3 w-3 fill-current" />
          <span>+{xpReward}</span>
        </motion.div>
      )}

      {/* Perfect score star */}
      {state === 'completed' && isPerfect && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.06 + 0.3, type: 'spring' }}
          className="absolute -top-2 -right-2"
        >
          <div className="relative">
            <Star className="h-6 w-6 text-warning fill-warning drop-shadow-lg" />
            <div className="absolute inset-0 animate-ping">
              <Star className="h-6 w-6 text-warning fill-warning opacity-50" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Quiz score badge */}
      {state === 'completed' && quizScore !== null && quizScore !== undefined && !isPerfect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.06 + 0.3 }}
          className="mt-1 text-xs font-bold text-primary"
        >
          {quizScore}%
        </motion.div>
      )}

      {/* Title tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 + 0.1 }}
        className="mt-2 max-w-[100px] text-center"
      >
        <span className="text-xs font-semibold text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
          {title}
        </span>
      </motion.div>

      {/* Hover info card */}
      <motion.div
        initial={false}
        className={cn(
          'absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50',
          'bg-card border border-border rounded-xl p-3 shadow-xl',
          'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
          'transition-opacity duration-200 w-48'
        )}
      >
        <p className="font-bold text-sm text-foreground">{title}</p>
        {xpReward && (
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 text-warning" />
            <span>{xpReward} XP</span>
          </div>
        )}
        {state === 'locked' && (
          <p className="text-xs text-muted-foreground mt-1">Complétez les leçons précédentes</p>
        )}
        {state === 'current' && (
          <p className="text-xs text-warning font-medium mt-1">Prêt à commencer!</p>
        )}
      </motion.div>
    </motion.div>
  );
}
