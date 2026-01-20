import React, { useState } from 'react';
import { Star, Lock, Check } from 'lucide-react';

type State = 'locked' | 'active' | 'completed';

interface Props {
  state?: State;
  onPress?: () => void;
}

const SIZE = 72;
const DEPTH = 10;

export default function LearnButton({ state = 'locked', onPress }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const disabled = state === 'locked';
  const Icon = state === 'completed' ? Check : state === 'active' ? Star : Lock;

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  // Transform base (perspective + rotation)
  const baseTransform = 'perspective(800px) rotateX(18deg)';
  
  // Transform when pressed (add translateY)
  const pressedTransform = isPressed && !disabled 
    ? 'perspective(800px) rotateX(18deg) translateY(10px)'
    : baseTransform;

  return (
    <button
      disabled={disabled}
      onClick={handlePress}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        width: SIZE,
        height: SIZE + DEPTH,
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        transform: pressedTransform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* SIDE (épaisseur) */}
      <div
        style={{
          position: 'absolute',
          top: DEPTH,
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: sideColors[state].backgroundColor,
        }}
      />

      {/* TOP (face penchée) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: topColors[state].backgroundColor,
        }}
      >
        <Icon size={28} color={iconColors[state]} strokeWidth={2.5} />
      </div>
    </button>
  );
}

/* ==== COULEURS ==== */

const topColors = {
  locked: { backgroundColor: '#EEEEEE' },
  active: { backgroundColor: '#7CDD57' },
  completed: { backgroundColor: '#4CAF50' },
};

const sideColors = {
  locked: { backgroundColor: '#CFCFCF' },
  active: { backgroundColor: '#58B63E' },
  completed: { backgroundColor: '#388E3C' },
};

const iconColors = {
  locked: '#B0B0B0',
  active: '#FFFFFF',
  completed: '#FFFFFF',
};
