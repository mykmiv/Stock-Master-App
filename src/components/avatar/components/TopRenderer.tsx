import React from 'react';
import { TOP_COLORS } from '@/types/avatarConfig';

interface TopRendererProps {
  topId: number;
  size: number;
  color?: string;
}

/**
 * Renders top/clothing layer
 * Positioned at bottom, below all other layers
 */
export function TopRenderer({ topId, size, color }: TopRendererProps) {
  const centerX = 100;
  const centerY = 90;
  const topColor = color || TOP_COLORS[0].value;

  const renderTop = () => {
    switch (topId) {
      case 1: // T-Shirt
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY + 70}
              rx={50}
              ry={45}
              fill={topColor}
            />
            <ellipse
              cx={centerX - 45}
              cy={centerY + 60}
              rx={12}
              ry={20}
              fill={topColor}
            />
            <ellipse
              cx={centerX + 45}
              cy={centerY + 60}
              rx={12}
              ry={20}
              fill={topColor}
            />
          </>
        );

      case 2: // Hoodie
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY + 70}
              rx={52}
              ry={48}
              fill={topColor}
            />
            <path
              d={`M ${centerX - 40} ${centerY + 30} Q ${centerX} ${centerY} ${centerX + 40} ${centerY + 30} L ${centerX + 35} ${centerY + 45} L ${centerX - 35} ${centerY + 45} Z`}
              fill={topColor}
            />
            <ellipse
              cx={centerX - 48}
              cy={centerY + 60}
              rx={14}
              ry={25}
              fill={topColor}
            />
            <ellipse
              cx={centerX + 48}
              cy={centerY + 60}
              rx={14}
              ry={25}
              fill={topColor}
            />
          </>
        );

      case 3: // Polo
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY + 70}
              rx={48}
              ry={44}
              fill={topColor}
            />
            <path
              d={`M ${centerX - 15} ${centerY + 35} L ${centerX} ${centerY + 40} L ${centerX + 15} ${centerY + 35} L ${centerX + 12} ${centerY + 45} L ${centerX - 12} ${centerY + 45} Z`}
              fill={topColor}
              opacity={0.9}
            />
            <ellipse
              cx={centerX - 44}
              cy={centerY + 58}
              rx={13}
              ry={22}
              fill={topColor}
            />
            <ellipse
              cx={centerX + 44}
              cy={centerY + 58}
              rx={13}
              ry={22}
              fill={topColor}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <g id={`top-${topId}`}>
      {renderTop()}
    </g>
  );
}
