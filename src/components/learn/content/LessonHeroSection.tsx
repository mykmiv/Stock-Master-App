import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, Star, BookOpen, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LessonHeroSectionProps {
  title: string;
  description: string;
  moduleNumber: number;
  lessonNumber: number;
  xpReward: number;
  durationMinutes: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon?: React.ReactNode;
}

export function LessonHeroSection({
  title,
  description,
  moduleNumber,
  lessonNumber,
  xpReward,
  durationMinutes,
  level,
  icon,
}: LessonHeroSectionProps) {
  const levelConfig = {
    beginner: {
      label: 'Débutant',
      gradient: 'from-primary to-emerald-400',
      bgPattern: 'bg-gradient-to-br from-primary/10 via-emerald-50 to-teal-50 dark:from-primary/20 dark:via-emerald-950/30 dark:to-teal-950/20',
    },
    intermediate: {
      label: 'Intermédiaire',
      gradient: 'from-secondary to-blue-400',
      bgPattern: 'bg-gradient-to-br from-secondary/10 via-blue-50 to-indigo-50 dark:from-secondary/20 dark:via-blue-950/30 dark:to-indigo-950/20',
    },
    advanced: {
      label: 'Avancé',
      gradient: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-purple-100 via-pink-50 to-rose-50 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-rose-950/20',
    },
  };

  const config = levelConfig[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 md:p-8',
        config.bgPattern
      )}
    >
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern id="heroPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary" />
          </pattern>
          <rect fill="url(#heroPattern)" width="100" height="100" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="secondary" className="font-semibold">
            Module {moduleNumber}
          </Badge>
          <Badge variant="outline" className="font-semibold">
            Leçon {lessonNumber}
          </Badge>
          <Badge className={cn('bg-gradient-to-r text-white', config.gradient)}>
            {config.label}
          </Badge>
        </div>

        {/* Icon and Title */}
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className={cn(
              'h-14 w-14 rounded-2xl flex items-center justify-center shrink-0',
              'bg-gradient-to-br shadow-lg',
              config.gradient,
              'text-white'
            )}>
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
              {title}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{durationMinutes} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="font-bold text-warning">+{xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Leçon interactive</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
