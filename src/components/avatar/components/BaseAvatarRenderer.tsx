import React from 'react';
import { BASE_AVATARS } from '@/types/avatarConfig';

interface BaseAvatarRendererProps {
  baseId: number;
  size: number;
}

/**
 * Renders the base avatar face
 * Each base has unique facial features (eyes, mouth, expression)
 * Style: Cartoon, flat, rounded, friendly
 */
export function BaseAvatarRenderer({ baseId, size }: BaseAvatarRendererProps) {
  const base = BASE_AVATARS.find(b => b.id === baseId) || BASE_AVATARS[0];
  const centerX = 100;
  const centerY = 90;
  const headRadius = 70;
  const earRadius = 18;

  // Generate unique facial features based on baseId
  const eyeOffsetX = 25;
  const eyeOffsetY = 15;
  const eyeSize = 12 + (baseId % 3) * 2;
  const mouthOffsetY = (baseId % 4) * 3;

  return (
    <g id={`base-${baseId}`}>
      {/* Head - Rounded, oversized */}
      <circle
        cx={centerX}
        cy={centerY}
        r={headRadius}
        fill={base.skinTone}
      />

      {/* Ears - Small, rounded */}
      <circle
        cx={centerX - 55}
        cy={centerY + 5}
        r={earRadius}
        fill={base.skinTone}
      />
      <circle
        cx={centerX + 55}
        cy={centerY + 5}
        r={earRadius}
        fill={base.skinTone}
      />

      {/* Eyes - Large, friendly, white with pupils */}
      <ellipse
        cx={centerX - eyeOffsetX}
        cy={centerY - eyeOffsetY}
        rx={eyeSize}
        ry={eyeSize + 2}
        fill="#ffffff"
      />
      <ellipse
        cx={centerX + eyeOffsetX}
        cy={centerY - eyeOffsetY}
        rx={eyeSize}
        ry={eyeSize + 2}
        fill="#ffffff"
      />

      {/* Pupils - Dark, friendly */}
      <circle
        cx={centerX - eyeOffsetX}
        cy={centerY - eyeOffsetY + 1}
        r={eyeSize * 0.4}
        fill="#2c1b18"
      />
      <circle
        cx={centerX + eyeOffsetX}
        cy={centerY - eyeOffsetY + 1}
        r={eyeSize * 0.4}
        fill="#2c1b18"
      />

      {/* Mouth - Smile variations based on baseId */}
      {baseId % 3 === 0 ? (
        <path
          d={`M ${centerX - 20} ${centerY + 40 + mouthOffsetY} Q ${centerX} ${centerY + 52 + mouthOffsetY} ${centerX + 20} ${centerY + 40 + mouthOffsetY}`}
          stroke="#2c1b18"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ) : baseId % 3 === 1 ? (
        <path
          d={`M ${centerX - 15} ${centerY + 40 + mouthOffsetY} Q ${centerX} ${centerY + 48 + mouthOffsetY} ${centerX + 15} ${centerY + 40 + mouthOffsetY}`}
          stroke="#2c1b18"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M ${centerX - 12} ${centerY + 40 + mouthOffsetY} Q ${centerX} ${centerY + 45 + mouthOffsetY} ${centerX + 12} ${centerY + 40 + mouthOffsetY}`}
          stroke="#2c1b18"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}
