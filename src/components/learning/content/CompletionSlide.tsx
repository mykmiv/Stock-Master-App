import React from 'react';
import { CompletionContent } from '@/types/lesson.types';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';
import { Star, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerConfetti } from '@/lib/confetti';

interface CompletionSlideProps {
  content: CompletionContent;
  onContinue: () => void;
}

export function CompletionSlide({ content, onContinue }: CompletionSlideProps) {
  React.useEffect(() => {
    // Delay confetti slightly for better effect
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 text-center">
      {/* Speech Bubble */}
      <div className="flex justify-center">
        <SpeechBubble text={content.speechBubble} position="bottom" />
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Leçon Terminée! 🎉
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Correct Answers */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl p-4"
          >
            <p className="text-sm text-gray-600 mb-1">Réponses Correctes</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-2xl font-bold text-green-600"
            >
              {content.summary.correctAnswers} / {content.summary.totalQuestions}
            </motion.p>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl p-4"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              </motion.div>
              <p className="text-sm text-gray-600">XP Gagné</p>
            </div>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-2xl font-bold text-indigo-600"
            >
              +{content.summary.xpEarned}
            </motion.p>
          </motion.div>
        </div>

        {/* Coins Earned */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="bg-white rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Coins className="w-5 h-5 text-amber-500" />
            </motion.div>
            <p className="text-sm text-gray-600">Coins Gagnés</p>
          </div>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="text-2xl font-bold text-amber-600"
          >
            +{content.summary.coinsEarned}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg text-lg"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}

