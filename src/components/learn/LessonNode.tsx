import { Lock, Play, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NodeState = 'locked' | 'current' | 'completed';

interface LessonNodeProps {
  state: NodeState;
  xpReward?: number;
  quizScore?: number | null;
  onClick: () => void;
  index: number;
  title: string;
}

export function LessonNode({ state, xpReward, quizScore, onClick, index, title }: LessonNodeProps) {
  const getNodeStyles = () => {
    switch (state) {
      case 'locked':
        return 'bg-muted border-muted-foreground/30 cursor-not-allowed';
      case 'current':
        return 'bg-warning border-warning shadow-lg shadow-warning/30 cursor-pointer';
      case 'completed':
        return 'bg-primary border-primary cursor-pointer';
    }
  };

  const getIconColor = () => {
    switch (state) {
      case 'locked':
        return 'text-muted-foreground';
      case 'current':
      case 'completed':
        return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
      className="relative flex flex-col items-center"
    >
      {/* Main Node */}
      <motion.button
        onClick={onClick}
        disabled={state === 'locked'}
        whileHover={state !== 'locked' ? { scale: 1.1 } : {}}
        whileTap={state !== 'locked' ? { scale: 0.95 } : {}}
        className={cn(
          'relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all',
          getNodeStyles()
        )}
        aria-label={title}
      >
        {/* Pulse animation for current */}
        {state === 'current' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-warning/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        
        {/* Icon */}
        <div className={cn('relative z-10', getIconColor())}>
          {state === 'locked' && <Lock className="h-8 w-8" />}
          {state === 'current' && <Play className="h-10 w-10 fill-current" />}
          {state === 'completed' && <Check className="h-10 w-10 stroke-[3]" />}
        </div>
      </motion.button>

      {/* XP Badge for completed */}
      {state === 'completed' && xpReward && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.2, type: 'spring' }}
          className="absolute -bottom-2 -right-2 flex items-center gap-0.5 bg-warning text-warning-foreground px-2 py-0.5 rounded-full text-xs font-bold shadow-md"
        >
          <Star className="h-3 w-3 fill-current" />
          <span>+{xpReward}</span>
        </motion.div>
      )}

      {/* Quiz score badge */}
      {state === 'completed' && quizScore !== null && quizScore !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.3 }}
          className="mt-2 text-xs font-bold text-primary"
        >
          {quizScore}%
        </motion.div>
      )}

      {/* Title tooltip on hover */}
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.1 }}
        className="mt-2 text-xs font-medium text-center text-muted-foreground max-w-[100px] line-clamp-2"
      >
        {title}
      </motion.span>
    </motion.div>
  );
}
