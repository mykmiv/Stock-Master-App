import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface TakeawaysCardProps {
  title?: string;
  takeaways: string[];
  index?: number;
}

export function TakeawaysCard({
  title = 'Points clés à retenir',
  takeaways,
  index = 0,
}: TakeawaysCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'rounded-2xl border border-primary/30 overflow-hidden',
        'bg-gradient-to-br from-primary/5 via-emerald-50/50 to-teal-50/50',
        'dark:from-primary/10 dark:via-emerald-950/20 dark:to-teal-950/10'
      )}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-primary/20 bg-primary/10">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          {title}
        </h3>
      </div>

      {/* Takeaways Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {takeaways.map((takeaway, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.1 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              {/* Number badge */}
              <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </div>

              {/* Text */}
              <p className="text-sm text-foreground leading-relaxed pt-0.5">
                {takeaway}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
