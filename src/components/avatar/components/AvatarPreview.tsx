import React from 'react';
import { AvatarConfig } from '@/types/avatarConfig';
import { BaseAvatarRenderer } from './BaseAvatarRenderer';
import { HairRenderer } from './HairRenderer';
import { AccessoryRenderer } from './AccessoryRenderer';
import { TopRenderer } from './TopRenderer';

interface AvatarPreviewProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * Production Avatar Preview Component
 * Renders avatar using layered architecture:
 * 1. Top/clothing (bottom layer)
 * 2. Base face (fixed per baseId)
 * 3. Hair (above face)
 * 4. Accessory (optional, top layer)
 */
export function AvatarPreview({
  config,
  size = 200,
  className = '',
  onClick,
}: AvatarPreviewProps) {
  if (!config) {
    return null;
  }

  const viewBox = '0 0 200 200';

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg
        viewBox={viewBox}
        width={size}
        height={size}
        className="drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Top/Clothing (bottom layer) */}
        <TopRenderer topId={config.topId} size={size} />

        {/* Layer 2: Base Avatar Face */}
        <BaseAvatarRenderer baseId={config.baseId} size={size} />

        {/* Layer 3: Hair (above face) */}
        <HairRenderer
          hairId={config.hairId}
          hairColor={config.hairColor}
          size={size}
        />

        {/* Layer 4: Accessory (optional, top layer) */}
        {config.accessoryEnabled && (
          <AccessoryRenderer size={size} />
        )}
      </svg>
    </div>
  );
}
