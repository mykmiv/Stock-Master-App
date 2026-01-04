import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { LessonStep } from '@/lib/lessonParser';
import { RevealCard } from './RevealCard';
import { QuickCheckQuestion } from '../content/QuickCheckQuestion';

interface StepCardProps {
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  isCompleted: boolean;
  onComplete?: () => void;
  onInteraction?: (type: string, data: any) => void;
}

/**
 * Carte représentant une étape de la leçon
 * Gère l'affichage du contenu et des interactions
 */
export function StepCard({
  step,
  stepIndex,
  totalSteps,
  isCompleted,
  onComplete,
  onInteraction,
}: StepCardProps) {
  const renderContent = () => {
    switch (step.type) {
      case 'interactive':
        if (step.interaction?.type === 'reveal' && step.interaction.data) {
          return (
            <RevealCard
              title={step.title}
              items={step.interaction.data.items}
              onReveal={(index) => {
                onInteraction?.('reveal', { stepIndex, itemIndex: index });
              }}
              index={stepIndex}
            />
          );
        }
        // Fallback to regular content
        return (
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: step.content }}
          />
        );

      case 'quiz':
        // Pour les quiz inline, utiliser QuickCheckQuestion
        if (step.interaction?.data) {
          return (
            <QuickCheckQuestion
              question={step.interaction.data.question}
              options={step.interaction.data.options}
              correctAnswer={step.interaction.data.correctAnswer}
              explanation={step.interaction.data.explanation}
              index={stepIndex}
              onAnswer={(isCorrect) => {
                onInteraction?.('quiz', { stepIndex, isCorrect });
              }}
            />
          );
        }
        return null;

      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground prose-strong:text-foreground prose-ul:space-y-2 prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: step.content }}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-2xl border-2 overflow-hidden bg-card',
        isCompleted && 'border-primary/50 bg-primary/5'
      )}
    >
      {/* Header */}
      {step.title && (
        <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-bold">{stepIndex + 1}</span>
                )}
              </div>
              <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
            </div>
            {step.metadata?.duration && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>~{step.metadata.duration}s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">{renderContent()}</div>

      {/* Completion indicator */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-6 py-3 bg-primary/10 border-t border-primary/20 flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Étape complétée
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

