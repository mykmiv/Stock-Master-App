import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  completed?: number[];
}

export function ProgressIndicator({ current, total, completed = [] }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const isCompleted = completed.includes(step);
        const isCurrent = step === current;
        const isPast = step < current;

        return (
          <React.Fragment key={step}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                border-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-green-500 border-green-600 text-white' 
                  : isCurrent 
                  ? 'bg-indigo-500 border-indigo-600 text-white scale-110' 
                  : isPast
                  ? 'bg-gray-300 border-gray-400 text-gray-600'
                  : 'bg-white border-gray-300 text-gray-400'
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="font-bold text-sm">{step}</span>
              )}
              
              {/* Pulse animation for current step */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
            
            {/* Connector line */}
            {index < total - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`
                  h-1 flex-1 transition-colors duration-300
                  ${isPast || isCurrent ? 'bg-indigo-500' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

