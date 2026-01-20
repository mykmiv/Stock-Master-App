import React from 'react';
import { CustomAvatarConfig } from '@/types/customAvatar';

interface CustomAvatarProps {
  config: CustomAvatarConfig;
  size?: number;
  className?: string;
  onClick?: () => void;
}

// Hair Component
function HairComponent({ type, color }: { type: string; color: string }) {
  const hairStyles: Record<string, JSX.Element | null> = {
    bald: null,
    
    short: (
      <path
        d="M 60 55 Q 60 35 80 35 Q 100 30 120 35 Q 140 35 140 55 L 140 70 L 60 70 Z"
        fill={color}
      />
    ),
    
    curly: (
      <>
        <circle cx="70" cy="45" r="12" fill={color} />
        <circle cx="85" cy="40" r="12" fill={color} />
        <circle cx="100" cy="38" r="12" fill={color} />
        <circle cx="115" cy="40" r="12" fill={color} />
        <circle cx="130" cy="45" r="12" fill={color} />
        <path d="M 60 50 L 60 75 Q 100 70 140 75 L 140 50 Z" fill={color} />
      </>
    ),
    
    long: (
      <>
        <ellipse cx="70" cy="65" rx="12" ry="35" fill={color} />
        <ellipse cx="130" cy="65" rx="12" ry="35" fill={color} />
        <path
          d="M 60 40 Q 60 30 80 30 L 120 30 Q 140 30 140 40 L 140 70 Q 100 65 60 70 Z"
          fill={color}
        />
      </>
    ),
    
    bun: (
      <>
        <circle cx="100" cy="35" r="20" fill={color} />
        <path
          d="M 70 50 Q 70 40 100 40 Q 130 40 130 50 L 130 70 L 70 70 Z"
          fill={color}
        />
      </>
    ),
    
    ponytail: (
      <>
        <path
          d="M 60 45 Q 60 35 100 35 Q 140 35 140 45 L 140 55 Q 100 50 60 55 Z"
          fill={color}
        />
        <ellipse cx="145" cy="70" rx="10" ry="25" fill={color} />
      </>
    ),
    
    afro: (
      <>
        <circle cx="70" cy="50" r="15" fill={color} />
        <circle cx="85" cy="45" r="15" fill={color} />
        <circle cx="100" cy="42" r="16" fill={color} />
        <circle cx="115" cy="45" r="15" fill={color} />
        <circle cx="130" cy="50" r="15" fill={color} />
        <path d="M 55 55 Q 55 45 100 45 Q 145 45 145 55 L 145 75 L 55 75 Z" fill={color} />
      </>
    ),
    
    wavy: (
      <>
        <path
          d="M 60 40 Q 70 30 80 35 Q 90 30 100 35 Q 110 30 120 35 Q 130 30 140 40 L 140 70 Q 100 65 60 70 Z"
          fill={color}
        />
        <path
          d="M 65 45 Q 75 40 85 45 Q 95 40 105 45 Q 115 40 125 45"
          stroke={color}
          strokeWidth="8"
          fill="none"
        />
      </>
    )
  };

  return <g>{hairStyles[type] || null}</g>;
}

// Eyes Component
function EyesComponent({ type }: { type: string }) {
  const eyeStyles: Record<string, JSX.Element> = {
    normal: (
      <>
        <circle cx="85" cy="75" r="10" fill="#ffffff" />
        <circle cx="115" cy="75" r="10" fill="#ffffff" />
        <circle cx="85" cy="75" r="6" fill="#2c1b18" />
        <circle cx="115" cy="75" r="6" fill="#2c1b18" />
        <circle cx="87" cy="73" r="2" fill="#ffffff" />
        <circle cx="117" cy="73" r="2" fill="#ffffff" />
      </>
    ),
    
    happy: (
      <>
        <path d="M 78 75 Q 85 82 92 75" stroke="#2c1b18" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 108 75 Q 115 82 122 75" stroke="#2c1b18" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="83" cy="72" r="3" fill="#2c1b18" />
        <circle cx="113" cy="72" r="3" fill="#2c1b18" />
      </>
    ),
    
    wink: (
      <>
        <path d="M 78 75 Q 85 78 92 75" stroke="#2c1b18" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="115" cy="75" r="10" fill="#ffffff" />
        <circle cx="115" cy="75" r="6" fill="#2c1b18" />
        <circle cx="117" cy="73" r="2" fill="#ffffff" />
      </>
    ),
    
    closed: (
      <>
        <path d="M 78 75 L 92 75" stroke="#2c1b18" strokeWidth="4" strokeLinecap="round" />
        <path d="M 108 75 L 122 75" stroke="#2c1b18" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
    
    surprised: (
      <>
        <circle cx="85" cy="75" r="12" fill="#ffffff" />
        <circle cx="115" cy="75" r="12" fill="#ffffff" />
        <circle cx="85" cy="75" r="8" fill="#2c1b18" />
        <circle cx="115" cy="75" r="8" fill="#2c1b18" />
        <circle cx="87" cy="72" r="3" fill="#ffffff" />
        <circle cx="117" cy="72" r="3" fill="#ffffff" />
      </>
    )
  };

  return <g>{eyeStyles[type] || eyeStyles.normal}</g>;
}

// Mouth Component
function MouthComponent({ type }: { type: string }) {
  const mouthStyles: Record<string, JSX.Element> = {
    smile: (
      <path 
        d="M 85 95 Q 100 105 115 95" 
        stroke="#2c1b18" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
    ),
    
    bigSmile: (
      <>
        <path 
          d="M 82 92 Q 100 110 118 92" 
          stroke="#2c1b18" 
          strokeWidth="4" 
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d="M 85 94 Q 100 108 115 94" 
          fill="#ff6b9d" 
        />
      </>
    ),
    
    neutral: (
      <line 
        x1="85" 
        y1="95" 
        x2="115" 
        y2="95" 
        stroke="#2c1b18" 
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
    
    sad: (
      <path 
        d="M 85 100 Q 100 90 115 100" 
        stroke="#2c1b18" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
    ),
    
    surprised: (
      <ellipse 
        cx="100" 
        cy="98" 
        rx="8" 
        ry="12" 
        fill="#2c1b18" 
      />
    )
  };

  return <g>{mouthStyles[type] || mouthStyles.smile}</g>;
}

// Accessory Component
function AccessoryComponent({ type }: { type: string }) {
  if (type === 'none') return null;

  const accessories: Record<string, JSX.Element> = {
    glasses: (
      <>
        <circle cx="85" cy="75" r="14" fill="none" stroke="#2c1b18" strokeWidth="3" />
        <circle cx="115" cy="75" r="14" fill="none" stroke="#2c1b18" strokeWidth="3" />
        <line x1="99" y1="75" x2="101" y2="75" stroke="#2c1b18" strokeWidth="4" />
      </>
    ),
    
    sunglasses: (
      <>
        <rect x="73" y="68" width="26" height="16" rx="8" fill="#2c1b18" />
        <rect x="101" y="68" width="26" height="16" rx="8" fill="#2c1b18" />
        <line x1="99" y1="75" x2="101" y2="75" stroke="#1cb0f6" strokeWidth="3" />
      </>
    ),
    
    hat: (
      <g>
        <ellipse cx="100" cy="38" rx="45" ry="8" fill="#ff6b9d" />
        <path d="M 70 38 Q 70 25 100 20 Q 130 25 130 38" fill="#ff6b9d" />
      </g>
    ),
    
    cap: (
      <g>
        <path d="M 60 45 Q 100 30 140 45 L 138 60 L 62 60 Z" fill="#1cb0f6" />
        <rect x="100" y="60" width="3" height="15" fill="#1cb0f6" />
      </g>
    ),
    
    headset: (
      <g>
        <ellipse cx="100" cy="65" rx="50" ry="8" fill="none" stroke="#1cb0f6" strokeWidth="3" />
        <circle cx="75" cy="60" r="8" fill="#1cb0f6" />
        <circle cx="125" cy="60" r="8" fill="#1cb0f6" />
        <line x1="70" y1="55" x2="65" y2="50" stroke="#1cb0f6" strokeWidth="3" />
        <line x1="130" y1="55" x2="135" y2="50" stroke="#1cb0f6" strokeWidth="3" />
      </g>
    )
  };

  return <g>{accessories[type] || null}</g>;
}

export function CustomAvatar({ 
  config, 
  size = 200, 
  className = '',
  onClick 
}: CustomAvatarProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle */}
        <circle cx="100" cy="100" r="95" fill="#f0f0f0" />
        
        {/* Body/Shirt */}
        <path
          d="M 60 140 Q 60 120 80 120 L 120 120 Q 140 120 140 140 L 140 200 L 60 200 Z"
          fill={config.shirtColor}
        />
        
        {/* Trading icon on shirt */}
        {config.shirtColor !== '#ffffff' && (
          <text x="100" y="165" fontSize="24" fill="#ffffff" textAnchor="middle" fontWeight="bold">📈</text>
        )}
        {config.shirtColor === '#ffffff' && (
          <text x="100" y="165" fontSize="24" fill="#1cb0f6" textAnchor="middle" fontWeight="bold">📈</text>
        )}
        
        {/* Head */}
        <circle cx="100" cy="80" r="48" fill={config.skinColor} />
        
        {/* Hair (behind head) */}
        <HairComponent type={config.hairType} color={config.hairColor} />
        
        {/* Eyes */}
        <EyesComponent type={config.eyeType} />
        
        {/* Mouth */}
        <MouthComponent type={config.mouthType} />
        
        {/* Accessory (on top) */}
        {config.accessory && config.accessory !== 'none' && (
          <AccessoryComponent type={config.accessory} />
        )}
      </svg>
    </div>
  );
}

