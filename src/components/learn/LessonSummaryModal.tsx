import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Clock, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonWithProgress } from '@/hooks/useLessons';

interface LessonSummaryModalProps {
  lesson: LessonWithProgress | null;
  isOpen: boolean;
  onClose: () => void;
  onReview: () => void;
}

export function LessonSummaryModal({ lesson, isOpen, onClose, onReview }: LessonSummaryModalProps) {
  if (!lesson) return null;

  const getLevelColor = () => {
    switch (lesson.level) {
      case 'beginner': return 'bg-primary/20 text-primary';
      case 'intermediate': return 'bg-secondary/20 text-secondary';
      case 'advanced': return 'bg-purple-500/20 text-purple-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Lesson Completed
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Lesson Info */}
          <div className="space-y-2">
            <div className={cn("inline-block px-2 py-0.5 rounded-full text-xs font-bold", getLevelColor())}>
              {lesson.level}
            </div>
            <h3 className="text-xl font-black">{lesson.title}</h3>
            {lesson.description && (
              <p className="text-sm text-muted-foreground">{lesson.description}</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center p-3 rounded-xl bg-primary/10"
            >
              <Trophy className="h-6 w-6 text-primary mb-1" />
              <span className="text-2xl font-black text-primary">{lesson.quizScore || 100}%</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </motion.div>

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center p-3 rounded-xl bg-warning/10"
            >
              <Star className="h-6 w-6 text-warning fill-warning mb-1" />
              <span className="text-2xl font-black text-warning">+{lesson.xpReward}</span>
              <span className="text-xs text-muted-foreground">XP Earned</span>
            </motion.div>

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center p-3 rounded-xl bg-muted"
            >
              <Clock className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-2xl font-black">{lesson.durationMinutes}</span>
              <span className="text-xs text-muted-foreground">Minutes</span>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={onReview} className="flex-1 gap-2">
              <RotateCcw className="h-4 w-4" />
              Review Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
