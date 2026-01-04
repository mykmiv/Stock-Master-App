import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function AnimatedBackground() {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate clouds
    const generatedClouds: Cloud[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 10 + Math.random() * 30,
      size: 60 + Math.random() * 40,
      duration: 40 + Math.random() * 30,
      delay: Math.random() * -40,
    }));
    setClouds(generatedClouds);

    // Generate stars
    const generatedStars: Star[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-background dark:from-slate-900 dark:via-slate-800 dark:to-background transition-colors duration-500" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 40%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 40% 80%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Stars (visible in dark mode) */}
      <div className="hidden dark:block">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Clouds (visible in light mode) */}
      <div className="dark:hidden">
        {clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.y}%`,
              width: cloud.size,
              height: cloud.size * 0.6,
            }}
            initial={{ x: '-20%', left: `${cloud.x}%` }}
            animate={{ x: '120vw' }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              delay: cloud.delay,
              ease: 'linear',
            }}
          >
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full fill-white/60 dark:fill-slate-700/30"
            >
              <ellipse cx="50" cy="35" rx="35" ry="20" />
              <ellipse cx="25" cy="40" rx="20" ry="15" />
              <ellipse cx="75" cy="40" rx="18" ry="14" />
              <ellipse cx="40" cy="25" rx="18" ry="12" />
              <ellipse cx="60" cy="28" rx="15" ry="10" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 dark:bg-primary/30"
            style={{
              left: `${10 + (i * 7)}%`,
              top: '100%',
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
