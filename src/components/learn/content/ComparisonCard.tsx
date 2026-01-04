import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface ComparisonItem {
  title: string;
  icon?: React.ReactNode;
  points: string[];
  type: 'positive' | 'negative' | 'neutral';
}

interface ComparisonCardProps {
  items: [ComparisonItem, ComparisonItem];
  title?: string;
  index?: number;
}

export function ComparisonCard({ items, title, index = 0 }: ComparisonCardProps) {
  const getTypeStyles = (type: ComparisonItem['type']) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-success/10 dark:bg-success/20',
          border: 'border-success/30',
          icon: <Check className="h-4 w-4 text-success" />,
          iconBg: 'bg-success/20',
          textColor: 'text-success',
        };
      case 'negative':
        return {
          bg: 'bg-destructive/10 dark:bg-destructive/20',
          border: 'border-destructive/30',
          icon: <X className="h-4 w-4 text-destructive" />,
          iconBg: 'bg-destructive/20',
          textColor: 'text-destructive',
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          icon: null,
          iconBg: 'bg-muted-foreground/20',
          textColor: 'text-muted-foreground',
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Title */}
      {title && (
        <div className="px-6 py-4 border-b border-border bg-muted/50">
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
        </div>
      )}

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {items.map((item, i) => {
          const styles = getTypeStyles(item.type);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 + i * 0.1 }}
              className={cn('p-5', styles.bg)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                {item.icon && (
                  <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', styles.iconBg)}>
                    {item.icon}
                  </div>
                )}
                <h4 className={cn('font-bold text-base', styles.textColor)}>
                  {item.title}
                </h4>
              </div>

              {/* Points */}
              <ul className="space-y-2">
                {item.points.map((point, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 + j * 0.05 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="shrink-0 mt-0.5">{styles.icon}</span>
                    <span className="text-foreground">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
