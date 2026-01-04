import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: Set<string>;
  steps: Array<{ id: string; title?: string }>;
  onStepClick?: (index: number) => void;
}

/**
 * Indicateur de progression visuel avec navigation
 */
export function ProgressIndicator({
  currentStep,
  totalSteps,
  completedSteps,
  steps,
  onStepClick,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = completedSteps.has(step.id);
        const isPast = idx < currentStep;
        const isAccessible = isPast || isActive;
        
        return (
          <motion.button
            key={step.id}
            onClick={() => {
              if (isAccessible && onStepClick) {
                onStepClick(idx);
              }
            }}
            disabled={!isAccessible}
            whileHover={isAccessible ? { scale: 1.05 } : {}}
            whileTap={isAccessible ? { scale: 0.95 } : {}}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all shrink-0",
              "disabled:cursor-not-allowed",
              isActive && "bg-primary text-primary-foreground shadow-md",
              isCompleted && !isActive && "bg-primary/20 text-primary border border-primary/30",
              !isActive && !isCompleted && isAccessible && "bg-muted text-muted-foreground hover:bg-muted/80",
              !isAccessible && "bg-muted/50 text-muted-foreground/50"
            )}
          >
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <CheckCircle2 className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                className={cn(
                  "h-4 w-4 rounded-full border-2 transition-colors",
                  isActive ? "border-primary-foreground bg-primary-foreground/20" : "border-current"
                )}
                animate={isActive ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            <span className="hidden sm:inline whitespace-nowrap">
              {step.title || `Étape ${idx + 1}`}
            </span>
            {isActive && (
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

