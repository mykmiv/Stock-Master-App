import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { LEVELS } from '@/types/lesson.types';
import { triggerConfetti } from '@/lib/confetti';

interface LevelUpModalProps {
  newLevel: number;
  isOpen: boolean;
  onClose: () => void;
}

export function LevelUpModal({ newLevel, isOpen, onClose }: LevelUpModalProps) {
  const levelInfo = LEVELS.find(l => l.level === newLevel);

  React.useEffect(() => {
    if (isOpen) {
      triggerConfetti();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="text-center space-y-6">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                    <Trophy className="w-16 h-16 text-yellow-300" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white"
                >
                  Level Up! 🎉
                </motion.h2>

                {/* Level Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
                >
                  <p className="text-6xl font-bold text-white mb-2">
                    Niveau {newLevel}
                  </p>
                  {levelInfo && (
                    <p className="text-xl text-white/90 font-medium">
                      {levelInfo.title}
                    </p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/90 text-lg"
                >
                  Félicitations! Tu progresses rapidement! 🚀
                </motion.p>

                {/* Continue Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={onClose}
                  className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  Continuer
                </motion.button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/10 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

