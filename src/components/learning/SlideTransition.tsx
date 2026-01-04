import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  key: string | number;
}

export function SlideTransition({ children, direction = 'right', key }: SlideTransitionProps) {
  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={key}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

