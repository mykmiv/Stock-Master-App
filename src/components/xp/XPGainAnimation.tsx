import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface XPGain {
  id: string;
  amount: number;
  x: number;
  y: number;
}

interface XPGainAnimationProps {
  gains: XPGain[];
  onComplete: (id: string) => void;
}

export function XPGainAnimation({ gains, onComplete }: XPGainAnimationProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {gains.map((gain) => (
          <XPGainItem 
            key={gain.id} 
            gain={gain} 
            onComplete={() => onComplete(gain.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function XPGainItem({ gain, onComplete }: { gain: XPGain; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ 
        opacity: 1, 
        y: gain.y, 
        x: gain.x,
        scale: 0.5 
      }}
      animate={{ 
        opacity: 0, 
        y: gain.y - 100,
        scale: 1.2
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute flex items-center gap-1 px-3 py-1.5 rounded-full bg-warning text-warning-foreground font-black text-lg shadow-lg"
    >
      <Star className="h-5 w-5 fill-current" />
      <span>+{gain.amount} XP</span>
    </motion.div>
  );
}

// Hook for managing XP gain animations
export function useXPGainAnimation() {
  const [gains, setGains] = useState<XPGain[]>([]);

  const showGain = (amount: number, x?: number, y?: number) => {
    const id = `${Date.now()}-${Math.random()}`;
    setGains((prev) => [
      ...prev,
      { 
        id, 
        amount, 
        x: x ?? window.innerWidth / 2 - 50, 
        y: y ?? window.innerHeight / 2 
      }
    ]);
  };

  const removeGain = (id: string) => {
    setGains((prev) => prev.filter((g) => g.id !== id));
  };

  return { gains, showGain, removeGain };
}
