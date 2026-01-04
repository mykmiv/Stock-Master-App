import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface XPGainProps {
  amount: number;
  show: boolean;
}

export function XPGain({ amount, show }: XPGainProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border-2 border-yellow-300 p-4 flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
          </motion.div>
          <div>
            <p className="text-sm text-gray-600">XP Gagné</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-2xl font-bold text-indigo-600"
            >
              +{amount}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

