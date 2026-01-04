import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConceptCardProps {
  title: string;
  description: string;
  example?: string;
  icon?: LucideIcon;
  imageSrc?: string;
  imageGradient?: string;
  index?: number;
}

export function ConceptCard({
  title,
  description,
  example,
  icon: Icon,
  imageSrc,
  imageGradient = 'from-primary/20 to-emerald-500/20',
  index = 0,
}: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'group overflow-hidden rounded-2xl border border-border',
        'bg-card hover:shadow-xl transition-all duration-300',
        'hover:border-primary/30'
      )}
    >
      {/* Image/Gradient Header */}
      <div className={cn(
        'h-32 md:h-40 relative overflow-hidden',
        'bg-gradient-to-br',
        imageGradient
      )}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Decorative circles */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-white/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-white/30"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {Icon && <Icon className="h-12 w-12 text-primary relative z-10" />}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Title with icon */}
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Example box */}
        {example && (
          <Alert className="bg-warning/10 border-warning/30">
            <Lightbulb className="h-4 w-4 text-warning" />
            <AlertDescription className="text-sm">
              <span className="font-semibold text-foreground">Exemple: </span>
              {example}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </motion.div>
  );
}
