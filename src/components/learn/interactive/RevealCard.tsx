import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';

interface RevealItem {
  label: string;
  revealed: boolean;
}

interface RevealCardProps {
  title?: string;
  items: RevealItem[];
  onReveal?: (index: number) => void;
  index?: number;
}

/**
 * Carte interactive avec révélation progressive
 * Permet à l'utilisateur de cliquer pour révéler chaque point
 */
export function RevealCard({
  title = 'Découvrez les points clés',
  items,
  onReveal,
  index = 0,
}: RevealCardProps) {
  const [revealedItems, setRevealedItems] = useState<boolean[]>(
    items.map(() => false)
  );

  const handleReveal = (itemIndex: number) => {
    if (revealedItems[itemIndex]) return;

    const newRevealed = [...revealedItems];
    newRevealed[itemIndex] = true;
    setRevealedItems(newRevealed);
    onReveal?.(itemIndex);
  };

  const allRevealed = revealedItems.every((r) => r);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border-2 border-primary/30 overflow-hidden bg-card"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-emerald-500/10 border-b border-primary/20">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {title}
          </h3>
          {allRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-sm text-primary font-bold"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complété
            </motion.div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-3">
        {items.map((item, i) => {
          const isRevealed = revealedItems[i];
          return (
            <motion.button
              key={i}
              onClick={() => handleReveal(i)}
              disabled={isRevealed}
              whileHover={!isRevealed ? { scale: 1.02 } : {}}
              whileTap={!isRevealed ? { scale: 0.98 } : {}}
              className={cn(
                'w-full text-left p-4 rounded-xl border-2 transition-all',
                'flex items-center gap-4',
                isRevealed
                  ? 'border-primary/50 bg-primary/5 cursor-default'
                  : 'border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                  isRevealed
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {isRevealed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-medium text-foreground prose prose-sm dark:prose-invert max-w-none prose-strong:text-foreground prose-em:text-primary"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
                      <span className="text-sm text-muted-foreground italic">
                        Cliquez pour révéler
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isRevealed && (
                <EyeOff className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

