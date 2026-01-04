import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, PlayCircle, Clock, Star, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  title: string;
  description: string | null;
  duration: number;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  quizScore?: number | null;
  level: 'beginner' | 'intermediate' | 'advanced';
  onStart: () => void;
}

export function LessonCard({
  title,
  description,
  duration,
  xpReward,
  isCompleted,
  isLocked,
  quizScore,
  level,
  onStart,
}: LessonCardProps) {
  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    }
  };

  return (
    <Card className={cn(
      "transition-all hover:shadow-md group",
      isLocked && "opacity-60 cursor-not-allowed",
      isCompleted && "border-emerald-500/30 bg-emerald-500/5"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            isCompleted 
              ? "bg-emerald-500/20" 
              : isLocked 
                ? "bg-muted" 
                : "bg-primary/10"
          )}>
            {isCompleted ? (
              <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            ) : isLocked ? (
              <Lock className="h-6 w-6 text-muted-foreground" />
            ) : (
              <PlayCircle className="h-7 w-7 text-primary" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title & XP Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg leading-tight line-clamp-1">{title}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                )}
              </div>
            </div>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{duration} min</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span>+{xpReward} XP</span>
              </div>
              
              {isCompleted && quizScore !== null && quizScore !== undefined && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    quizScore >= 70 
                      ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400" 
                      : "border-amber-500/50 text-amber-700 dark:text-amber-400"
                  )}
                >
                  Score: {quizScore}%
                </Badge>
              )}
            </div>
            
            {/* Action Button */}
            <div className="pt-2">
              {isLocked ? (
                <Button size="sm" variant="secondary" disabled className="gap-2">
                  <Lock className="h-4 w-4" />
                  Locked
                </Button>
              ) : isCompleted ? (
                <Button size="sm" variant="outline" onClick={onStart} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Review
                </Button>
              ) : (
                <Button size="sm" onClick={onStart} className="gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Start Lesson
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
