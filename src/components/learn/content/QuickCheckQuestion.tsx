import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X, HelpCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickCheckQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  index?: number;
  onAnswer?: (isCorrect: boolean) => void;
}

export function QuickCheckQuestion({
  question,
  options,
  correctAnswer,
  explanation,
  index = 0,
  onAnswer,
}: QuickCheckQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctAnswer;

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    onAnswer?.(optionIndex === correctAnswer);
  };

  const getOptionStyles = (optionIndex: number) => {
    if (!isAnswered) {
      return 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer';
    }

    if (optionIndex === correctAnswer) {
      return 'border-success bg-success/10 dark:bg-success/20';
    }

    if (optionIndex === selectedAnswer && !isCorrect) {
      return 'border-destructive bg-destructive/10 dark:bg-destructive/20';
    }

    return 'border-border opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'rounded-2xl border-2 overflow-hidden',
        isAnswered
          ? isCorrect
            ? 'border-success bg-success/5'
            : 'border-destructive bg-destructive/5'
          : 'border-secondary/30 bg-secondary/5'
      )}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-border/50">
        <div className={cn(
          'h-10 w-10 rounded-xl flex items-center justify-center',
          isAnswered
            ? isCorrect
              ? 'bg-success text-success-foreground'
              : 'bg-destructive text-destructive-foreground'
            : 'bg-secondary text-secondary-foreground'
        )}>
          {isAnswered ? (
            isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />
          ) : (
            <HelpCircle className="h-5 w-5" />
          )}
        </div>
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Quick Check
          </span>
          <h4 className="font-bold text-foreground">{question}</h4>
        </div>
      </div>

      {/* Options */}
      <div className="p-4 space-y-2">
        {options.map((option, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.1 + i * 0.05 }}
            onClick={() => handleSelect(i)}
            disabled={isAnswered}
            className={cn(
              'w-full text-left px-4 py-3 rounded-xl border-2 transition-all',
              'flex items-center gap-3',
              getOptionStyles(i)
            )}
          >
            {/* Letter indicator */}
            <span className={cn(
              'h-7 w-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
              isAnswered && i === correctAnswer
                ? 'bg-success text-success-foreground'
                : isAnswered && i === selectedAnswer && !isCorrect
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-muted text-muted-foreground'
            )}>
              {String.fromCharCode(65 + i)}
            </span>

            <span className="text-sm font-medium text-foreground">{option}</span>

            {/* Result icon */}
            {isAnswered && i === correctAnswer && (
              <Check className="h-5 w-5 text-success ml-auto" />
            )}
            {isAnswered && i === selectedAnswer && !isCorrect && (
              <X className="h-5 w-5 text-destructive ml-auto" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50"
          >
            <div className={cn(
              'p-4 flex items-start gap-3',
              isCorrect ? 'bg-success/10' : 'bg-warning/10'
            )}>
              <Lightbulb className={cn(
                'h-5 w-5 shrink-0 mt-0.5',
                isCorrect ? 'text-success' : 'text-warning'
              )} />
              <div>
                <span className={cn(
                  'text-sm font-bold',
                  isCorrect ? 'text-success' : 'text-warning'
                )}>
                  {isCorrect ? 'Excellent!' : 'Pas tout à fait...'}
                </span>
                <p className="text-sm text-foreground mt-1">{explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
