import { motion } from 'framer-motion';
import { Sparkles, Target, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeCardProps {
  userName?: string;
  totalLessons: number;
  totalModules: number;
  estimatedHours: number;
  onStart: () => void;
  className?: string;
}

export function WelcomeCard({
  userName,
  totalLessons,
  totalModules,
  estimatedHours,
  onStart,
  className,
}: WelcomeCardProps) {
  const stats = [
    { icon: BookOpen, label: 'Leçons', value: totalLessons, color: 'text-primary' },
    { icon: Target, label: 'Modules', value: totalModules, color: 'text-secondary' },
    { icon: TrendingUp, label: 'Heures', value: estimatedHours, color: 'text-warning' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'bg-gradient-to-br from-primary via-primary to-emerald-500',
        'p-6 md:p-8 text-white',
        'shadow-2xl shadow-primary/30',
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      {/* Floating sparkles */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 right-4"
      >
        <Sparkles className="h-8 w-8 text-white/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            {userName ? `Bienvenue, ${userName}! 👋` : 'Bienvenue! 👋'}
          </h2>
          <p className="text-white/80 text-sm md:text-base">
            Votre parcours vers la maîtrise du trading commence ici.
            Apprenez à votre rythme et devenez un trader confiant.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 my-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center"
            >
              <stat.icon className="h-5 w-5 mx-auto mb-1" />
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className={cn(
              'w-full bg-white text-primary hover:bg-white/90',
              'font-bold text-lg py-6 rounded-xl',
              'shadow-lg shadow-black/20',
              'group'
            )}
          >
            Commencer l'Aventure
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
