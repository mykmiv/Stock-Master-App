import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Trophy, Star, Sparkles } from 'lucide-react';
import { triggerConfetti, triggerCelebration } from '@/lib/confetti';
import { LeagueName, getLeagueConfig, getNextLeague, getPreviousLeague } from '@/data/leagues';
import { cn } from '@/lib/utils';

interface LeagueResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'promotion' | 'demotion' | 'top1' | 'top3' | 'top10' | 'monthly_result';
  finalRank: number;
  league: LeagueName;
  newLeague?: LeagueName;
}

const Particle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    className={cn('absolute w-2 h-2 rounded-full', color)}
    initial={{ y: 0, x, opacity: 1, scale: 1 }}
    animate={{
      y: [-20, -100, -200],
      x: [x, x + (Math.random() - 0.5) * 100, x + (Math.random() - 0.5) * 150],
      opacity: [1, 1, 0],
      scale: [1, 1.5, 0.5],
    }}
    transition={{
      duration: 2,
      delay,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 1,
    }}
  />
);

const FloatingStar = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute"
    initial={{ y: 100, x, opacity: 0, rotate: 0 }}
    animate={{
      y: [-50, -150],
      opacity: [0, 1, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 3,
      delay,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 2,
    }}
  >
    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
  </motion.div>
);

export function LeagueResultModal({
  isOpen,
  onClose,
  type,
  finalRank,
  league,
  newLeague,
}: LeagueResultModalProps) {
  const [showContent, setShowContent] = useState(false);
  const leagueConfig = getLeagueConfig(league);
  const newLeagueConfig = newLeague ? getLeagueConfig(newLeague) : null;

  const isPromotion = type === 'promotion' || type === 'top1' || type === 'top3' || type === 'top10';
  const isDemotion = type === 'demotion';

  useEffect(() => {
    if (isOpen) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 300);

      // Trigger confetti for promotions
      if (isPromotion) {
        setTimeout(() => {
          if (type === 'top1') {
            triggerCelebration();
          } else {
            triggerConfetti();
          }
        }, 500);
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, isPromotion, type]);

  const getContent = () => {
    switch (type) {
      case 'top1':
        return {
          icon: '🏆',
          title: 'CHAMPION DU MOIS!',
          subtitle: `Tu as dominé la ${leagueConfig.name} League!`,
          description: 'Incroyable performance! Tu es le meilleur trader ce mois-ci.',
          gradient: 'from-yellow-500 via-amber-400 to-orange-500',
          bgGlow: 'shadow-[0_0_100px_30px_rgba(234,179,8,0.3)]',
        };
      case 'top3':
        return {
          icon: '🥇',
          title: 'PODIUM ATTEINT!',
          subtitle: `#${finalRank} en ${leagueConfig.name} League`,
          description: 'Tu fais partie des 3 meilleurs traders!',
          gradient: 'from-slate-300 via-slate-200 to-slate-400',
          bgGlow: 'shadow-[0_0_80px_20px_rgba(148,163,184,0.3)]',
        };
      case 'promotion':
      case 'top10':
        return {
          icon: '🚀',
          title: 'PROMOTION!',
          subtitle: `Tu montes en ${newLeagueConfig?.name || 'ligue supérieure'}!`,
          description: `Tu as terminé #${finalRank} et tu mérites cette ascension!`,
          gradient: 'from-emerald-500 via-green-400 to-teal-500',
          bgGlow: 'shadow-[0_0_80px_20px_rgba(16,185,129,0.3)]',
        };
      case 'demotion':
        return {
          icon: '📉',
          title: 'Relégation',
          subtitle: `Tu descends en ${newLeagueConfig?.name || 'ligue inférieure'}`,
          description: 'Ne te décourage pas! Le mois prochain sera le tien.',
          gradient: 'from-red-500 via-rose-400 to-pink-500',
          bgGlow: 'shadow-[0_0_60px_15px_rgba(239,68,68,0.2)]',
        };
      default:
        return {
          icon: '📊',
          title: 'Résultats du mois',
          subtitle: `#${finalRank} en ${leagueConfig.name} League`,
          description: 'Continue comme ça pour le mois prochain!',
          gradient: 'from-blue-500 via-indigo-400 to-purple-500',
          bgGlow: '',
        };
    }
  };

  const content = getContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-none">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              className={cn(
                'relative rounded-2xl bg-background border-2 overflow-hidden',
                content.bgGlow,
                isPromotion ? 'border-emerald-500' : isDemotion ? 'border-destructive' : 'border-border'
              )}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className={cn(
                  'absolute inset-0 opacity-20 bg-gradient-to-br',
                  content.gradient
                )}
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Particles for promotions */}
              {isPromotion && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <Particle
                      key={i}
                      delay={i * 0.15}
                      x={30 + (i % 6) * 50}
                      color={i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'bg-emerald-400' : 'bg-cyan-400'}
                    />
                  ))}
                  {type === 'top1' && [...Array(5)].map((_, i) => (
                    <FloatingStar key={`star-${i}`} delay={i * 0.5} x={50 + i * 60} />
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Main Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2, damping: 10 }}
                  className="text-7xl mb-4"
                >
                  {content.icon}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={cn(
                    'text-3xl font-black mb-2 bg-gradient-to-r bg-clip-text text-transparent',
                    content.gradient
                  )}
                >
                  {content.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-foreground mb-2"
                >
                  {content.subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground mb-6"
                >
                  {content.description}
                </motion.p>

                {/* League Transition Visual */}
                {(type === 'promotion' || type === 'demotion') && newLeagueConfig && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-center gap-4 mb-6"
                  >
                    <div className={cn(
                      'h-16 w-16 rounded-full flex items-center justify-center text-3xl border-2',
                      leagueConfig.bgColor,
                      leagueConfig.borderColor
                    )}>
                      {leagueConfig.icon}
                    </div>
                    
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {isPromotion ? (
                        <TrendingUp className="h-8 w-8 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-destructive" />
                      )}
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={cn(
                        'h-16 w-16 rounded-full flex items-center justify-center text-3xl border-2',
                        newLeagueConfig.bgColor,
                        newLeagueConfig.borderColor
                      )}
                    >
                      {newLeagueConfig.icon}
                    </motion.div>
                  </motion.div>
                )}

                {/* Sparkle decoration for top performers */}
                {(type === 'top1' || type === 'top3') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center gap-2 mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                      >
                        <Sparkles className="h-5 w-5 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Action Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={onClose}
                    size="lg"
                    className={cn(
                      'font-bold px-8 bg-gradient-to-r',
                      content.gradient,
                      'text-white hover:opacity-90 transition-opacity'
                    )}
                  >
                    {isPromotion ? 'Continuer!' : isDemotion ? 'Revanche!' : 'OK'}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
