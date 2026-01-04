import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Gift, Star, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Level, formatReward, getTierColor, getTierGradient, getLevelById } from '@/data/xpLevels';
import { cn } from '@/lib/utils';

interface LevelUpModalProps {
  level: Level | null;
  onClose: () => void;
}

export function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  if (!level) return null;

  const previousLevel = getLevelById(level.level - 1);
  const tierChanged = previousLevel && previousLevel.tier !== level.tier;

  return (
    <AnimatePresence>
      <Dialog open={!!level} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-md overflow-hidden border-0 p-0">
          {/* Animated background gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              getTierGradient(level.tier)
            )}
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="relative p-6 text-center"
          >
            {/* Sparkle decorations */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-8 text-warning"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-12 left-8 text-primary"
            >
              <Star className="h-5 w-5 fill-current" />
            </motion.div>

            {/* Level badge - huge and animated */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-8xl mb-2"
            >
              {level.badge}
            </motion.div>

            {/* Level up text */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Level Up!
            </motion.h2>

            {/* Level number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="text-7xl font-black text-primary mb-2"
            >
              {level.level}
            </motion.div>

            {/* Level name */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-bold mb-6"
            >
              {level.name}
            </motion.p>

            {/* Tier change alert */}
            {tierChanged && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Alert className="mb-4 bg-warning/10 border-warning text-left">
                  <Crown className="h-4 w-4 text-warning" />
                  <AlertTitle className={cn("font-bold", getTierColor(level.tier))}>
                    Nouveau Tier!
                  </AlertTitle>
                  <AlertDescription>
                    Tu es maintenant <span className="font-bold">{level.tier}</span>! 🎉
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Rewards section */}
            {level.rewards.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-muted/50 backdrop-blur rounded-xl p-4 mb-6"
              >
                <h3 className="font-bold mb-3 flex items-center gap-2 justify-center">
                  <Gift className="h-4 w-4 text-primary" />
                  Récompenses débloquées
                </h3>
                <div className="space-y-2">
                  {level.rewards.map((reward, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg bg-background/50"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <RewardIcon type={reward.type} />
                      </div>
                      <span className="font-medium text-sm">
                        {formatReward(reward)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Continue button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button 
                className="w-full font-bold" 
                size="lg"
                onClick={onClose}
              >
                Continuer →
              </Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}

function RewardIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    coins: '🪙',
    xp: '⭐',
    badge: '🏅',
    title: '🎖️',
    premium_days: '💎',
    premium_month: '💎',
    feature_unlock: '🔓',
    scanner_unlocks: '🤖',
    custom_avatar: '👤',
    tier_complete: '🏆',
    real_money_bonus: '💵',
    lifetime_premium: '👑',
    hall_of_fame: '🏛️',
    custom_badge: '🎨',
  };
  
  return <span className="text-lg">{icons[type] || '🎁'}</span>;
}
