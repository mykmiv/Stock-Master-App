import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NextStepCTAProps {
  nextLessonTitle: string;
  nextLessonDescription?: string;
  xpReward?: number;
  onContinue: () => void;
  onReview?: () => void;
  index?: number;
}

export function NextStepCTA({
  nextLessonTitle,
  nextLessonDescription,
  xpReward,
  onContinue,
  onReview,
  index = 0,
}: NextStepCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-r from-primary via-emerald-500 to-teal-500',
        'p-6 md:p-8',
        'shadow-xl shadow-primary/20'
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-white/80" />
          <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
            Prochaine leçon
          </span>
        </div>

        {/* Next lesson info */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {nextLessonTitle}
          </h3>
          {nextLessonDescription && (
            <p className="text-white/80 text-sm md:text-base">
              {nextLessonDescription}
            </p>
          )}
          {xpReward && (
            <div className="flex items-center gap-1.5 mt-3">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="text-sm font-bold text-white">+{xpReward} XP</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onContinue}
            size="lg"
            className={cn(
              'flex-1 bg-white text-primary hover:bg-white/90',
              'font-bold py-6 rounded-xl',
              'shadow-lg shadow-black/20',
              'group'
            )}
          >
            Continuer
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {onReview && (
            <Button
              onClick={onReview}
              size="lg"
              variant="ghost"
              className={cn(
                'flex-1 text-white hover:bg-white/20',
                'font-medium py-6 rounded-xl border border-white/30'
              )}
            >
              Revoir cette leçon
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
