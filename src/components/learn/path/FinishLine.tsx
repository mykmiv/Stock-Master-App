import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FinishLineProps {
  totalXP: number;
  totalLessons: number;
  perfectScores: number;
  onContinue: () => void;
  className?: string;
}

export function FinishLine({
  totalXP,
  totalLessons,
  perfectScores,
  onContinue,
  className,
}: FinishLineProps) {
  const stats = [
    { icon: Star, label: 'XP Total', value: totalXP.toLocaleString(), color: 'text-warning' },
    { icon: Trophy, label: 'Leçons', value: totalLessons, color: 'text-primary' },
    { icon: Sparkles, label: 'Parfaits', value: perfectScores, color: 'text-secondary' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'bg-gradient-to-br from-warning via-amber-400 to-orange-500',
        'p-8 text-center',
        'shadow-2xl shadow-warning/30',
        className
      )}
    >
      {/* Confetti-like decorations */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#fff', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 5],
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Trophy Icon */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative z-10 mb-4"
      >
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/30 backdrop-blur rounded-full">
            <Trophy className="h-14 w-14 text-white drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/40"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow">
          🎉 Félicitations! 🎉
        </h2>
        <p className="text-white/90 text-lg">
          Vous avez complété tout le parcours d'apprentissage!
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4 my-8 relative z-10"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="bg-white/25 backdrop-blur-sm rounded-xl p-4"
          >
            <stat.icon className="h-6 w-6 mx-auto mb-2 text-white" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/80">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="relative z-10"
      >
        <Button
          onClick={onContinue}
          size="lg"
          className={cn(
            'bg-white text-warning hover:bg-white/90',
            'font-bold text-lg py-6 px-8 rounded-xl',
            'shadow-lg shadow-black/20',
            'group'
          )}
        >
          Commencer à Trader
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
