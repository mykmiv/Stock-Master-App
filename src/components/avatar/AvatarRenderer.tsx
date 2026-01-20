import React from 'react';
import { AvatarConfig } from '@/types/avatar';

interface AvatarRendererProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-24 h-24',
  large: 'w-48 h-48',
  xl: 'w-64 h-64',
};

export function AvatarRenderer({ 
  config, 
  size = 200, 
  className = '',
  onClick 
}: AvatarRendererProps) {
  const viewBox = '0 0 200 200';
  
  // Skin tone colors
  const skinColors: Record<string, string> = {
    light: '#FFDBB4',
    medium: '#EDB98A',
    tan: '#D08B5B',
    brown: '#AE5D29',
    dark: '#614335',
  };

  // Hair colors
  const hairColors: Record<string, string> = {
    black: '#2C1B18',
    brown: '#724133',
    blonde: '#F5DEB3',
    red: '#C93305',
    gray: '#929598',
    blue: '#1E88E5',
    green: '#43A047',
    purple: '#8E24AA',
  };

  // Generate SVG layers
  const renderFace = () => {
    const facePaths: Record<string, string> = {
      round: 'M 100 40 Q 100 20 80 20 Q 60 20 60 40 L 60 140 Q 60 160 80 160 Q 100 160 100 140 L 140 140 Q 140 160 120 160 Q 100 160 100 140 L 100 40 Z',
      oval: 'M 100 30 Q 80 20 60 30 L 60 150 Q 80 160 100 150 Q 120 160 140 150 L 140 30 Q 120 20 100 30 Z',
      square: 'M 60 30 L 140 30 L 140 150 L 60 150 Z',
    };
    return (
      <path
        d={facePaths[config.face] || facePaths.round}
        fill={skinColors[config.skinTone] || skinColors.medium}
      />
    );
  };

  const renderEyes = () => {
    const eyeStyles: Record<string, { left: string; right: string }> = {
      normal: {
        left: 'M 75 80 Q 85 75 95 80 Q 85 85 75 80',
        right: 'M 105 80 Q 115 75 125 80 Q 115 85 105 80',
      },
      focused: {
        left: 'M 75 80 Q 85 70 95 80 Q 85 90 75 80',
        right: 'M 105 80 Q 115 70 125 80 Q 115 90 105 80',
      },
      confident: {
        left: 'M 75 75 Q 85 70 95 75 Q 85 80 75 75',
        right: 'M 105 75 Q 115 70 125 75 Q 115 80 105 75',
      },
      relaxed: {
        left: 'M 75 85 Q 85 80 95 85',
        right: 'M 105 85 Q 115 80 125 85',
      },
      happy: {
        left: 'M 75 80 Q 85 70 95 80',
        right: 'M 105 80 Q 115 70 125 80',
      },
      wink: {
        left: 'M 75 80 Q 85 75 95 80',
        right: 'M 105 80 L 125 80',
      },
    };
    const style = eyeStyles[config.eyes] || eyeStyles.normal;
    return (
      <>
        <path d={style.left} fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />
        <path d={style.right} fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="2" />
        {/* Eye shine */}
        <circle cx="85" cy="78" r="3" fill="#FFFFFF" />
        <circle cx="115" cy="78" r="3" fill="#FFFFFF" />
      </>
    );
  };

  const renderEyebrows = () => {
    const eyebrowStyles: Record<string, { left: string; right: string }> = {
      neutral: {
        left: 'M 70 60 Q 85 55 95 60',
        right: 'M 105 60 Q 115 55 130 60',
      },
      confident: {
        left: 'M 70 55 Q 85 50 95 55',
        right: 'M 105 55 Q 115 50 130 55',
      },
      sharp: {
        left: 'M 70 60 L 90 50 L 95 60',
        right: 'M 105 60 L 115 50 L 130 60',
      },
      thick: {
        left: 'M 70 60 Q 85 55 95 60 Q 85 65 70 60',
        right: 'M 105 60 Q 115 55 130 60 Q 115 65 105 60',
      },
      thin: {
        left: 'M 70 60 Q 85 58 95 60',
        right: 'M 105 60 Q 115 58 130 60',
      },
    };
    const style = eyebrowStyles[config.eyebrows] || eyebrowStyles.neutral;
    return (
      <>
        <path d={style.left} fill="none" stroke="#2C1B18" strokeWidth="3" strokeLinecap="round" />
        <path d={style.right} fill="none" stroke="#2C1B18" strokeWidth="3" strokeLinecap="round" />
      </>
    );
  };

  const renderMouth = () => {
    const mouthStyles: Record<string, string> = {
      smile: 'M 80 120 Q 100 140 120 120',
      neutral: 'M 80 120 L 120 120',
      focused: 'M 80 120 Q 100 125 120 120',
      grin: 'M 75 120 Q 100 150 125 120',
      surprised: 'M 100 120 Q 100 130 100 120',
    };
    return (
      <path
        d={mouthStyles[config.mouth] || mouthStyles.smile}
        fill="none"
        stroke="#2C1B18"
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  };

  const renderHair = () => {
    if (config.hair === 'bald') return null;
    
    const hairStyles: Record<string, string> = {
      short: 'M 50 50 Q 100 30 150 50 L 150 80 L 50 80 Z',
      medium: 'M 50 50 Q 100 20 150 50 L 150 100 L 50 100 Z',
      long: 'M 50 50 Q 100 10 150 50 L 150 130 L 50 130 Z',
      curly: 'M 50 50 Q 100 25 150 50 Q 140 60 150 80 Q 100 40 50 80 Q 60 60 50 50 Z',
      wavy: 'M 50 50 Q 70 40 90 50 Q 110 40 130 50 Q 150 40 150 50 L 150 100 L 50 100 Z',
      afro: 'M 50 50 Q 100 20 150 50 Q 150 70 140 80 Q 100 40 60 80 Q 50 70 50 50 Z',
      bun: 'M 50 50 Q 100 30 150 50 L 150 80 L 50 80 Z M 120 50 Q 120 40 130 40 Q 140 40 140 50',
      ponytail: 'M 50 50 Q 100 30 150 50 L 150 80 L 50 80 Z M 140 50 Q 150 40 160 50 Q 160 80 150 90',
    };
    
    return (
      <path
        d={hairStyles[config.hair] || hairStyles.short}
        fill={hairColors[config.hairColor] || hairColors.brown}
      />
    );
  };

  const renderBeard = () => {
    if (config.beard === 'none') return null;
    
    const beardStyles: Record<string, string> = {
      stubble: 'M 70 110 Q 100 115 130 110',
      short: 'M 70 110 Q 100 120 130 110 Q 100 130 70 110',
      medium: 'M 70 110 Q 100 125 130 110 Q 100 140 70 110',
      full: 'M 70 110 Q 100 130 130 110 Q 130 150 100 150 Q 70 150 70 110',
      goatee: 'M 90 110 Q 100 120 110 110 Q 110 130 100 130 Q 90 130 90 110',
    };
    
    return (
      <path
        d={beardStyles[config.beard] || beardStyles.short}
        fill={hairColors[config.hairColor] || hairColors.brown}
      />
    );
  };

  const renderGlasses = () => {
    if (config.glasses === 'none') return null;
    
    const glassesStyles: Record<string, JSX.Element> = {
      round: (
        <>
          <circle cx="85" cy="80" r="15" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <circle cx="115" cy="80" r="15" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="100" y1="80" x2="100" y2="80" stroke="#1A1A1A" strokeWidth="3" />
        </>
      ),
      square: (
        <>
          <rect x="70" y="65" width="30" height="30" rx="5" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <rect x="100" y="65" width="30" height="30" rx="5" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="100" y1="80" x2="100" y2="80" stroke="#1A1A1A" strokeWidth="3" />
        </>
      ),
      aviator: (
        <>
          <ellipse cx="85" cy="80" rx="18" ry="12" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <ellipse cx="115" cy="80" rx="18" ry="12" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="103" y1="80" x2="97" y2="80" stroke="#1A1A1A" strokeWidth="2" />
        </>
      ),
      wayfarer: (
        <>
          <path d="M 70 70 Q 85 65 100 70 L 100 90 Q 85 95 70 90 Z" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <path d="M 100 70 Q 115 65 130 70 L 130 90 Q 115 95 100 90 Z" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="100" y1="80" x2="100" y2="80" stroke="#1A1A1A" strokeWidth="3" />
        </>
      ),
    };
    
    return glassesStyles[config.glasses] || null;
  };

  const renderHat = () => {
    if (config.hat === 'none') return null;
    
    const hatStyles: Record<string, string> = {
      cap: 'M 40 50 Q 100 30 160 50 L 150 70 L 50 70 Z M 50 70 L 50 60 L 150 60 L 150 70',
      beanie: 'M 50 50 Q 100 20 150 50 L 150 70 L 50 70 Z',
      snapback: 'M 40 50 Q 100 25 160 50 L 155 65 L 45 65 Z M 45 65 L 45 55 L 155 55 L 155 65',
      bucket: 'M 50 50 Q 100 30 150 50 Q 150 70 100 70 Q 50 70 50 50',
    };
    
    return (
      <path
        d={hatStyles[config.hat] || hatStyles.cap}
        fill="#1A1A1A"
      />
    );
  };

  const renderOutfit = () => {
    const outfitStyles: Record<string, { path: string; color: string }> = {
      tshirt: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140',
        color: '#FFFFFF',
      },
      hoodie: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140 M 70 130 Q 70 120 80 120 Q 100 115 120 120 Q 130 120 130 130',
        color: '#1CB0F6',
      },
      hoodie_dark: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140 M 70 130 Q 70 120 80 120 Q 100 115 120 120 Q 130 120 130 130',
        color: '#1A1A1A',
      },
      polo: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140 M 100 130 L 100 150',
        color: '#FFFFFF',
      },
      suit: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140 M 100 130 L 100 180',
        color: '#2C2C2C',
      },
      jacket: {
        path: 'M 60 140 L 60 180 L 140 180 L 140 140 Q 140 130 130 130 L 70 130 Q 60 130 60 140 M 70 130 L 70 180 M 130 130 L 130 180',
        color: '#4A4A4A',
      },
    };
    
    const outfit = outfitStyles[config.outfit] || outfitStyles.tshirt;
    
    return (
      <>
        <path d={outfit.path} fill={outfit.color} />
        {/* Trading icon on hoodie */}
        {config.outfit === 'hoodie' && (
          <text x="100" y="155" fontSize="20" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">📈</text>
        )}
        {config.outfit === 'hoodie_dark' && (
          <text x="100" y="155" fontSize="20" fill="#1CB0F6" textAnchor="middle" fontWeight="bold">📈</text>
        )}
      </>
    );
  };

  const renderAccessory = () => {
    if (config.accessory === 'none') return null;
    
    const accessoryStyles: Record<string, JSX.Element> = {
      headset: (
        <g transform="translate(100, 60)">
          <ellipse cx="0" cy="0" rx="25" ry="15" fill="none" stroke="#1A1A1A" strokeWidth="2" />
          <line x1="-20" y1="0" x2="-30" y2="-10" stroke="#1A1A1A" strokeWidth="2" />
          <line x1="20" y1="0" x2="30" y2="-10" stroke="#1A1A1A" strokeWidth="2" />
        </g>
      ),
      laptop_badge: (
        <rect x="85" y="145" width="30" height="20" rx="3" fill="#1CB0F6" stroke="#FFFFFF" strokeWidth="2">
          <text x="100" y="158" fontSize="12" fill="#FFFFFF" textAnchor="middle">💻</text>
        </rect>
      ),
      watch: (
        <circle cx="130" cy="150" r="8" fill="none" stroke="#1A1A1A" strokeWidth="2" />
      ),
      necklace: (
        <path d="M 80 140 Q 100 145 120 140" fill="none" stroke="#FFD700" strokeWidth="2" />
      ),
    };
    
    return accessoryStyles[config.accessory] || null;
  };

  return (
    <div
      className={`${className} ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="100" fill="#F0F0F0" />
        
        {/* Layers in order (back to front) */}
        {renderFace()}
        {renderHair()}
        {renderEyebrows()}
        {renderEyes()}
        {renderMouth()}
        {renderBeard()}
        {renderOutfit()}
        {renderGlasses()}
        {renderHat()}
        {renderAccessory()}
      </svg>
    </div>
  );
}

