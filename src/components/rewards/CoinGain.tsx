import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';

interface CoinGainProps {
  amount: number;
  show: boolean;
}

export function CoinGain({ amount, show }: CoinGainProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed top-32 right-4 z-50 bg-white rounded-xl shadow-2xl border-2 border-amber-300 p-4 flex items-center gap-3"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <Coins className="w-8 h-8 text-amber-500" />
          </motion.div>
          <div>
            <p className="text-sm text-gray-600">Coins Gagnés</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-2xl font-bold text-amber-600"
            >
              +{amount}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

