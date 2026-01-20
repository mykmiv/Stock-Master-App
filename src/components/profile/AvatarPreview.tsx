import React from 'react';
import { AvatarGenerator, DiceBearAvatarConfig } from './AvatarGenerator';
import { AvatarRenderer as CustomAvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { AvatarConfig as CustomAvatarConfig } from '@/types/avatar';
import { CustomAvatar } from '@/components/avatar/CustomAvatar';
import { CustomAvatarConfig as SimpleCustomAvatarConfig } from '@/types/customAvatar';
import { DuolingoAvatar } from './DuolingoAvatar';
import { DuolingoAvatarConfig } from '@/types/duolingoAvatar';
import { AvatarPreview as NewAvatarPreview } from '@/components/avatar/components/AvatarPreview';
import { AvatarConfig as NewAvatarConfig } from '@/types/avatarConfig';

export interface AvatarConfig {
  skinTone?: string;
  bodyShape?: string;
  bodyColor?: string;
  eyeShape?: string;
  eyeColor?: string;
  eyebrows?: string;
  hairStyle?: string;
  hairColor?: string;
  glasses?: string;
  glassesColor?: string;
  hat?: string;
  facialHair?: string;
  earrings?: string;
  necklace?: string;
  mask?: string;
  // Legacy support
  eyes?: string;
  hair?: string;
  accessories?: string[];
  // DiceBear config (preferred)
  style?: 'avataaars' | 'bigSmile' | 'lorelei' | 'personas';
  seed?: string;
  skinColor?: string[];
  hairColor?: string[];
  top?: string[];
  clothing?: string[];
  clothingColor?: string[];
  eyes?: string[];
  eyebrows?: string[];
  mouth?: string[];
  facialHair?: string[];
}

interface AvatarPreviewProps {
  config: AvatarConfig | null;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-24 h-24',
  large: 'w-48 h-48',
};

const sizeValues = {
  small: 48,
  medium: 96,
  large: 192,
};

export function AvatarPreview({ config, size = 'medium', className = '', onClick }: AvatarPreviewProps) {
  const sizeValue = sizeValues[size];
  
  // Check if we have new AvatarConfig (baseId system - production system)
  const hasNewAvatarConfig = config && (config as any).baseId !== undefined && (config as any).hairId !== undefined;
  
  // Check if we have Duolingo Avatar config (newest system - exact Duolingo style with hairStyle)
  const hasDuolingoAvatarConfig = config && (config as any).skinColor && (config as any).hairStyle !== undefined && (config as any).eyeColor && !hasNewAvatarConfig;
  
  // Check if we have simple custom avatar config (Duolingo SVG style with hairType)
  const hasSimpleCustomConfig = config && (config as any).skinColor && (config as any).hairType && !hasDuolingoAvatarConfig && !hasNewAvatarConfig;
  
  // Check if we have complex custom avatar config (layered system)
  const hasCustomConfig = config && (config as any).face && (config as any).skinTone && !hasSimpleCustomConfig && !hasDuolingoAvatarConfig && !hasNewAvatarConfig;
  
  // Check if we have DiceBear config
  const hasDiceBearConfig = config && (config.seed || config.style) && !hasCustomConfig && !hasSimpleCustomConfig && !hasDuolingoAvatarConfig && !hasNewAvatarConfig;
  
  // Check if we have legacy config
  const hasLegacyConfig = config && config.bodyShape && !hasCustomConfig && !hasDiceBearConfig && !hasSimpleCustomConfig && !hasDuolingoAvatarConfig && !hasNewAvatarConfig;

  // Use new production AvatarPreview if available (baseId system - highest priority)
  if (hasNewAvatarConfig) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          relative
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
        style={{ width: sizeValue, height: sizeValue }}
      >
        <NewAvatarPreview
          config={config as NewAvatarConfig}
          size={sizeValue}
        />
      </div>
    );
  }

  // Use Duolingo Avatar if available (newest system - exact Duolingo style)
  if (hasDuolingoAvatarConfig) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          relative 
          overflow-hidden
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        <DuolingoAvatar 
          config={config as DuolingoAvatarConfig}
          size={sizeValue}
          className="rounded-full"
        />
      </div>
    );
  }

  // Use simple custom avatar (Duolingo SVG style) if available
  if (hasSimpleCustomConfig) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          relative 
          overflow-hidden
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        <CustomAvatar 
          config={config as SimpleCustomAvatarConfig}
          size={sizeValue}
          className="rounded-full"
        />
      </div>
    );
  }

  // Use complex custom avatar renderer if available (layered system)
  if (hasCustomConfig) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          relative 
          overflow-hidden
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        <CustomAvatarRenderer 
          config={config as CustomAvatarConfig}
          size={sizeValue}
          className="rounded-full"
        />
      </div>
    );
  }

  // Use DiceBear if available, otherwise fall back to legacy or default
  if (hasDiceBearConfig) {
    const diceBearConfig: DiceBearAvatarConfig = {
      style: config.style || 'avataaars',
      seed: config.seed || 'default',
      skinColor: config.skinColor,
      hairColor: config.hairColor,
      top: config.top,
      clothing: config.clothing,
      clothingColor: config.clothingColor,
      eyes: config.eyes,
      eyebrows: config.eyebrows,
      mouth: config.mouth,
      facialHair: config.facialHair,
      accessories: config.accessories,
    };

    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          relative 
          overflow-hidden
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        <AvatarGenerator 
          config={diceBearConfig}
          size={sizeValue}
          className="rounded-full"
        />
      </div>
    );
  }

  if (!hasLegacyConfig && !hasDiceBearConfig) {
    return (
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-3 
          border-dashed 
          border-[#1CB0F6] 
          flex 
          items-center 
          justify-center 
          bg-[#E6F7FF]
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          ${className}
        `}
        onClick={onClick}
        style={{ borderWidth: '3px' }}
      >
        <span className="text-[#1CB0F6] text-2xl font-bold">+</span>
      </div>
    );
  }

  // Legacy SVG rendering (keep for backward compatibility)
  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        relative 
        overflow-hidden
        ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <svg
        width={sizeValue}
        height={sizeValue}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="100" fill={config.skinTone || '#F5DEB3'} />
        
        {/* Body/Shirt */}
        {config.bodyShape && (
          <g id="body">
            {getBodySVG(config.bodyShape, config.skinTone || '#F5DEB3')}
          </g>
        )}
        
        {/* Eyes */}
        {config.eyes && (
          <g id="eyes">
            {getEyesSVG(config.eyes, config.eyeColor || '#000000')}
          </g>
        )}
        
        {/* Hair */}
        {config.hair && (
          <g id="hair">
            {getHairSVG(config.hair, config.hairColor || '#8B4513')}
          </g>
        )}
        
        {/* Glasses */}
        {config.glasses && config.glasses !== 'none' && (
          <g id="glasses">
            {getGlassesSVG(config.glasses)}
          </g>
        )}
        
        {/* Accessories */}
        {config.accessories && config.accessories.map((acc, idx) => (
          <g key={idx} id={`accessory-${idx}`}>
            {getAccessorySVG(acc)}
          </g>
        ))}
      </svg>
    </div>
  );
}

// Helper functions to generate SVG parts
function getBodySVG(shape: string, skinTone: string): string {
  const shapes: Record<string, string> = {
    body1: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#4A90E2" />`,
    body2: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#E74C3C" />`,
    body3: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#2ECC71" />`,
    body4: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#F39C12" />`,
    body5: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#9B59B6" />`,
    body6: `<rect x="60" y="120" width="80" height="60" rx="10" fill="#34495E" />`,
  };
  return shapes[shape] || shapes.body1;
}

function getEyesSVG(eyes: string, color: string): string {
  const eyeShapes: Record<string, string> = {
    eyes1: `
      <circle cx="80" cy="80" r="8" fill="${color}" />
      <circle cx="120" cy="80" r="8" fill="${color}" />
    `,
    eyes2: `
      <ellipse cx="80" cy="80" rx="10" ry="8" fill="${color}" />
      <ellipse cx="120" cy="80" rx="10" ry="8" fill="${color}" />
    `,
    eyes3: `
      <path d="M 70 80 Q 80 70 90 80 Q 80 90 70 80" fill="${color}" />
      <path d="M 110 80 Q 120 70 130 80 Q 120 90 110 80" fill="${color}" />
    `,
  };
  return eyeShapes[eyes] || eyeShapes.eyes1;
}

function getHairSVG(hair: string, color: string): string {
  const hairStyles: Record<string, string> = {
    hair1: `<path d="M 50 60 Q 100 20 150 60 Q 100 40 50 60" fill="${color}" />`,
    hair2: `<path d="M 50 60 Q 100 30 150 60 L 150 80 L 50 80 Z" fill="${color}" />`,
    hair3: `<circle cx="100" cy="50" r="40" fill="${color}" />`,
    hair4: `<path d="M 50 60 Q 70 40 90 50 Q 110 40 130 50 Q 150 40 150 60 L 150 80 L 50 80 Z" fill="${color}" />`,
    hair5: `<path d="M 60 60 Q 100 30 140 60 Q 100 50 60 60" fill="${color}" />`,
  };
  return hairStyles[hair] || hairStyles.hair1;
}

function getGlassesSVG(glasses: string): string {
  const glassesStyles: Record<string, string> = {
    glasses1: `
      <circle cx="80" cy="80" r="20" fill="none" stroke="#000" stroke-width="3" />
      <circle cx="120" cy="80" r="20" fill="none" stroke="#000" stroke-width="3" />
      <line x1="100" y1="80" x2="100" y2="80" stroke="#000" stroke-width="3" />
    `,
    glasses2: `
      <rect x="60" y="70" width="40" height="20" rx="5" fill="none" stroke="#000" stroke-width="3" />
      <rect x="100" y="70" width="40" height="20" rx="5" fill="none" stroke="#000" stroke-width="3" />
      <line x1="100" y1="80" x2="100" y2="80" stroke="#000" stroke-width="3" />
    `,
  };
  return glassesStyles[glasses] || glassesStyles.glasses1;
}

function getAccessorySVG(accessory: string): string {
  const accessories: Record<string, string> = {
    hat1: `<path d="M 40 50 Q 100 20 160 50 L 150 70 L 50 70 Z" fill="#1CB0F6" />`,
    beard1: `<path d="M 70 100 Q 100 120 130 100 Q 100 140 70 100" fill="#8B4513" />`,
  };
  return accessories[accessory] || '';
}

