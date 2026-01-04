import React from 'react';
import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function SpeechBubble({ 
  text, 
  position = 'bottom',
  className = ''
}: SpeechBubbleProps) {
  const positionClasses = {
    top: 'bottom-full mb-4',
    bottom: 'top-full mt-4',
    left: 'right-full mr-4',
    right: 'left-full ml-4'
  };

  const arrowPosition = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white border-r-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white border-r-transparent border-t-transparent border-l-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white border-r-transparent border-t-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white border-l-transparent border-t-transparent border-b-transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: position === 'bottom' ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className={`relative ${positionClasses[position]} ${className}`}
    >
      <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs border-2 border-indigo-200">
        <p className="text-gray-800 text-sm font-medium leading-relaxed">
          {text}
        </p>
        {/* Arrow */}
        <div 
          className={`absolute w-0 h-0 border-8 ${arrowPosition[position]}`}
        />
      </div>
    </motion.div>
  );
}

