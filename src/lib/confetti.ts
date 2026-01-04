import confetti from 'canvas-confetti';

export function triggerConfetti() {
  // Fire confetti from both sides
  const defaults = {
    spread: 70,
    ticks: 100,
    gravity: 1.2,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#10B981', '#22C55E', '#4ADE80', '#86EFAC', '#FFD700', '#FFA500']
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(200 * particleRatio)
    });
  }

  // Left side
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 0.1, y: 0.7 }
  });

  fire(0.2, {
    spread: 60,
    origin: { x: 0.1, y: 0.7 }
  });

  // Right side
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 0.9, y: 0.7 }
  });

  fire(0.2, {
    spread: 60,
    origin: { x: 0.9, y: 0.7 }
  });

  // Center burst
  setTimeout(() => {
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.5 }
    });
  }, 150);
}

export function triggerSuccessConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10B981', '#22C55E', '#4ADE80']
  });
}

export function triggerCelebration() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const colors = ['#FFD700', '#FFA500', '#FF6347', '#10B981', '#3B82F6', '#8B5CF6'];

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Create confetti from random positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: colors,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: colors,
    });
  }, 250);

  // Initial big burst
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    startVelocity: 45,
    ticks: 100,
    zIndex: 9999,
  });
}

export function triggerDemotionEffect() {
  // Subtle falling effect for demotion
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { x: 0.5, y: 0 },
    colors: ['#EF4444', '#F87171', '#FCA5A5'],
    gravity: 2,
    scalar: 0.8,
    drift: 0,
    ticks: 150,
  });
}
