import React from 'react';
import { StockyEmotion } from '@/types/lesson.types';

interface StockyCharacterProps {
  emotion?: StockyEmotion;
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
  className?: string;
}

export function StockyCharacter({ 
  emotion = 'happy', 
  size = 'medium', 
  animate = false,
  className = ''
}: StockyCharacterProps) {
  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-60 h-60'
  };

  const getEmotionTransform = () => {
    switch (emotion) {
      case 'celebrating':
        return {
          leftArm: 'rotate(-30 50 110)',
          rightArm: 'rotate(30 150 110)',
        };
      case 'encouraging':
        return {
          leftArm: 'rotate(-20 50 110)',
          rightArm: 'rotate(20 150 110)',
        };
      default:
        return {
          leftArm: '',
          rightArm: '',
        };
    }
  };

  const transforms = getEmotionTransform();

  return (
    <div className={`relative ${sizeClasses[size]} ${animate ? 'animate-bounce-slow' : ''} ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bull Body */}
        <ellipse cx="100" cy="120" rx="60" ry="70" fill="#4F46E5" />
        
        {/* Arms */}
        <ellipse 
          cx="50" 
          cy="110" 
          rx="20" 
          ry="35" 
          fill="#4F46E5"
          transform={transforms.leftArm}
        />
        <ellipse 
          cx="150" 
          cy="110" 
          rx="20" 
          ry="35" 
          fill="#4F46E5"
          transform={transforms.rightArm}
        />
        
        {/* Head */}
        <circle cx="100" cy="70" r="40" fill="#4F46E5" />
        
        {/* Eyes */}
        {emotion === 'thinking' ? (
          <>
            <ellipse cx="90" cy="65" rx="6" ry="8" fill="white" />
            <ellipse cx="110" cy="65" rx="6" ry="8" fill="white" />
            <circle cx="90" cy="66" r="3" fill="#111827" />
            <circle cx="110" cy="66" r="3" fill="#111827" />
            {/* Thinking dots */}
            <circle cx="70" cy="50" r="2" fill="#111827" className="animate-pulse" />
            <circle cx="75" cy="50" r="2" fill="#111827" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            <circle cx="80" cy="50" r="2" fill="#111827" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          </>
        ) : (
          <>
            <circle cx="90" cy="65" r="8" fill="white" />
            <circle cx="110" cy="65" r="8" fill="white" />
            <circle cx="92" cy="66" r="4" fill="#111827" />
            <circle cx="112" cy="66" r="4" fill="#111827" />
            {/* Sparkle in eyes for happy/celebrating */}
            {(emotion === 'happy' || emotion === 'celebrating') && (
              <>
                <circle cx="94" cy="64" r="1.5" fill="white" />
                <circle cx="114" cy="64" r="1.5" fill="white" />
              </>
            )}
          </>
        )}
        
        {/* Mouth */}
        {emotion === 'happy' && (
          <path 
            d="M 85 80 Q 100 90 115 80" 
            stroke="white" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
          />
        )}
        {emotion === 'celebrating' && (
          <path 
            d="M 85 80 Q 100 95 115 80" 
            stroke="white" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round" 
          />
        )}
        {emotion === 'thinking' && (
          <ellipse cx="100" cy="82" rx="8" ry="6" fill="white" />
        )}
        {(emotion === 'teaching' || emotion === 'explaining') && (
          <ellipse cx="100" cy="80" rx="10" ry="8" fill="white" />
        )}
        {emotion === 'encouraging' && (
          <path 
            d="M 85 80 Q 100 88 115 80" 
            stroke="white" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
          />
        )}
        
        {/* Horns */}
        <path 
          d="M 70 50 Q 65 35 70 30" 
          stroke="#F59E0B" 
          strokeWidth="8" 
          fill="none" 
          strokeLinecap="round" 
        />
        <path 
          d="M 130 50 Q 135 35 130 30" 
          stroke="#F59E0B" 
          strokeWidth="8" 
          fill="none" 
          strokeLinecap="round" 
        />
        
        {/* Green vest */}
        <ellipse cx="100" cy="130" rx="45" ry="35" fill="#10B981" />
        
        {/* Legs */}
        <rect x="75" y="170" width="20" height="25" rx="10" fill="#312E81" />
        <rect x="105" y="170" width="20" height="25" rx="10" fill="#312E81" />
        
        {/* Props based on emotion */}
        {emotion === 'teaching' && (
          <g transform="translate(140, 100)">
            <rect x="0" y="0" width="30" height="40" fill="#FFF" stroke="#111827" strokeWidth="2" rx="2" />
            <line x1="5" y1="10" x2="25" y2="10" stroke="#111827" strokeWidth="1.5" />
            <line x1="5" y1="15" x2="25" y2="15" stroke="#111827" strokeWidth="1.5" />
            <line x1="5" y1="20" x2="20" y2="20" stroke="#111827" strokeWidth="1.5" />
            {/* Chart lines on the book */}
            <line x1="8" y1="25" x2="22" y2="25" stroke="#10B981" strokeWidth="2" />
            <line x1="8" y1="30" x2="18" y2="30" stroke="#EF4444" strokeWidth="2" />
          </g>
        )}
        
        {emotion === 'celebrating' && (
          <>
            {/* Confetti */}
            <circle 
              cx="60" 
              cy="40" 
              r="3" 
              fill="#F59E0B" 
              className="animate-ping"
            />
            <circle 
              cx="140" 
              cy="35" 
              r="3" 
              fill="#10B981" 
              className="animate-ping"
              style={{ animationDelay: '0.2s' }}
            />
            <rect 
              x="50" 
              y="30" 
              width="4" 
              height="4" 
              fill="#EF4444" 
              className="animate-ping"
              style={{ animationDelay: '0.4s' }}
            />
            <circle 
              cx="45" 
              cy="50" 
              r="2.5" 
              fill="#8B5CF6" 
              className="animate-ping"
              style={{ animationDelay: '0.6s' }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

