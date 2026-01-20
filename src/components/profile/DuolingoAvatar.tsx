import React from 'react';
import { DuolingoAvatarConfig } from '@/types/duolingoAvatar';

interface DuolingoAvatarProps {
  config: DuolingoAvatarConfig | null;
  size?: number;
  className?: string;
  onClick?: () => void;
}

// Helper to darken color for ears and shadows
function darkenColor(color: string, percent: number = 15): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) - amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) - amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) - amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

export function DuolingoAvatar({ 
  config, 
  size = 200,
  className = '',
  onClick 
}: DuolingoAvatarProps) {
  if (!config) {
    return null;
  }

  const scale = size / 200;
  const earColor = darkenColor(config.skinColor, 15);

  // Hair rendering
  const renderHair = () => {
    if (config.hairStyle === 'none') return null;

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '45%',
      backgroundColor: config.hairColor,
      borderRadius: '28%',
      zIndex: 1,
    };

    switch (config.hairStyle) {
      case 'short':
        return <div style={baseStyle} />;
      
      case 'curly':
        return (
          <>
            <div style={baseStyle} />
            {[15, 40, 65].map(left => (
              <div
                key={left}
                style={{
                  ...baseStyle,
                  position: 'absolute',
                  width: '20%',
                  height: '15%',
                  left: `${left}%`,
                  top: '8%',
                  borderRadius: '50%',
                }}
              />
            ))}
          </>
        );
      
      case 'spiky':
        return (
          <>
            <div style={baseStyle} />
            {[20, 35, 50, 65].map((left, i) => (
              <div
                key={left}
                style={{
                  ...baseStyle,
                  position: 'absolute',
                  width: '12%',
                  height: '20%',
                  left: `${left}%`,
                  top: '5%',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  transform: `rotate(${-15 + i * 10}deg)`,
                }}
              />
            ))}
          </>
        );
      
      case 'long':
        return (
          <>
            <div style={baseStyle} />
            <div style={{
              ...baseStyle,
              position: 'absolute',
              width: '25%',
              height: '40%',
              left: '5%',
              top: '45%',
              borderRadius: '50%',
            }} />
            <div style={{
              ...baseStyle,
              position: 'absolute',
              width: '25%',
              height: '40%',
              right: '5%',
              top: '45%',
              borderRadius: '50%',
            }} />
          </>
        );
      
      case 'bun':
        return (
          <>
            <div style={baseStyle} />
            <div style={{
              ...baseStyle,
              position: 'absolute',
              width: '35%',
              height: '30%',
              left: '32.5%',
              top: '8%',
              borderRadius: '50%',
            }} />
          </>
        );
      
      case 'afro':
        return (
          <>
            <div style={{ ...baseStyle, height: '50%', top: '-5%' }} />
            {[10, 25, 40, 55, 70, 85].map(left => (
              <div
                key={left}
                style={{
                  ...baseStyle,
                  position: 'absolute',
                  width: '18%',
                  height: '18%',
                  left: `${left}%`,
                  top: '5%',
                  borderRadius: '50%',
                }}
              />
            ))}
          </>
        );
      
      case 'wavy':
        return (
          <>
            <div style={baseStyle} />
            <div style={{
              ...baseStyle,
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '20%',
              borderTop: `8px solid ${config.hairColor}`,
              borderBottom: 'none',
              borderRadius: '50%',
              backgroundColor: 'transparent',
            }} />
          </>
        );
      
      default:
        return <div style={baseStyle} />;
    }
  };

  // Eyes rendering - Style Duolingo exact - Plus grands et expressifs
  const renderEyes = () => {
    const eyeSize = size * 0.30 * scale; // Yeux encore plus grands comme Duolingo
    const eyeHeight = size * 0.22 * scale; // Ovales comme Duolingo
    const pupilSize = eyeSize * 0.55; // Pupilles plus grandes
    
    const eyeBase: React.CSSProperties = {
      position: 'absolute',
      top: '28%',
      width: `${eyeSize}px`,
      height: `${eyeHeight}px`,
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    };

    const pupil: React.CSSProperties = {
      position: 'absolute',
      width: `${pupilSize}px`,
      height: `${pupilSize}px`,
      backgroundColor: config.eyeColor,
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    };

    // Highlight pour rendre les yeux plus vivants comme Duolingo
    const highlight: React.CSSProperties = {
      position: 'absolute',
      width: `${pupilSize * 0.4}px`,
      height: `${pupilSize * 0.4}px`,
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: '50%',
      top: '35%',
      left: '30%',
      zIndex: 3,
    };

    if (config.eyeStyle === 'wink') {
      return (
        <>
          <div style={{ ...eyeBase, left: '18%' }}>
            <div style={pupil}>
              <div style={highlight} />
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: '31%',
            right: '18%',
            width: `${eyeSize * 0.75}px`,
            height: '5px',
            backgroundColor: config.eyeColor,
            borderRadius: '3px',
            zIndex: 2,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }} />
        </>
      );
    }

    if (config.eyeStyle === 'closed') {
      return (
        <>
          <div style={{
            position: 'absolute',
            top: '31%',
            left: '18%',
            width: `${eyeSize * 0.75}px`,
            height: '5px',
            backgroundColor: config.eyeColor,
            borderRadius: '3px',
            zIndex: 2,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }} />
          <div style={{
            position: 'absolute',
            top: '31%',
            right: '18%',
            width: `${eyeSize * 0.75}px`,
            height: '5px',
            backgroundColor: config.eyeColor,
            borderRadius: '3px',
            zIndex: 2,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }} />
        </>
      );
    }

    let leftPupilOffset = '0%, 0%';
    let rightPupilOffset = '0%, 0%';

    if (config.eyeStyle === 'lookingLeft') {
      leftPupilOffset = '-28%, 0%';
      rightPupilOffset = '-28%, 0%';
    } else if (config.eyeStyle === 'lookingRight') {
      leftPupilOffset = '28%, 0%';
      rightPupilOffset = '28%, 0%';
    }

    const eyeWidthFinal = config.eyeStyle === 'wide' ? eyeSize * 1.35 : eyeSize;
    const eyeHeightFinal = config.eyeStyle === 'wide' ? eyeHeight * 1.5 : eyeHeight;

    return (
      <>
        <div style={{ ...eyeBase, left: '18%', width: `${eyeWidthFinal}px`, height: `${eyeHeightFinal}px` }}>
          <div style={{ ...pupil, transform: `translate(${leftPupilOffset})` }}>
            <div style={highlight} />
          </div>
        </div>
        <div style={{ ...eyeBase, right: '18%', width: `${eyeWidthFinal}px`, height: `${eyeHeightFinal}px` }}>
          <div style={{ ...pupil, transform: `translate(${rightPupilOffset})` }}>
            <div style={highlight} />
          </div>
        </div>
      </>
    );
  };

  // Glasses rendering
  const renderGlasses = () => {
    if (config.glassesStyle === 'none') return null;

    const frameWidth = size * 0.28 * scale;
    const frameHeight = size * 0.18 * scale;
    const bridgeWidth = size * 0.08 * scale;

    if (config.glassesStyle === 'sunglasses') {
      return (
        <>
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '18%',
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            zIndex: 3,
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '18%',
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            zIndex: 3,
          }} />
          <div style={{
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${bridgeWidth}px`,
            height: '3px',
            backgroundColor: config.glassesColor,
            zIndex: 3,
          }} />
        </>
      );
    }

    const isRound = config.glassesStyle === 'round' || config.glassesStyle === 'roundSmall';
    const frameSize = config.glassesStyle === 'roundSmall' ? frameWidth * 0.8 : frameWidth;

    return (
      <>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: `${frameSize}px`,
          height: `${frameHeight}px`,
          border: `4px solid ${config.glassesColor}`,
          borderRadius: isRound ? '50%' : '8px',
          backgroundColor: 'transparent',
          zIndex: 3,
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: `${frameSize}px`,
          height: `${frameHeight}px`,
          border: `4px solid ${config.glassesColor}`,
          borderRadius: isRound ? '50%' : '8px',
          backgroundColor: 'transparent',
          zIndex: 3,
        }} />
        <div style={{
          position: 'absolute',
          top: '34%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${bridgeWidth}px`,
          height: '4px',
          backgroundColor: config.glassesColor,
          zIndex: 3,
        }} />
      </>
    );
  };

  // Mouth rendering - Style Duolingo exact
  const renderMouth = () => {
    const mouthWidth = size * 0.32 * scale;
    const mouthY = '56%';

    if (config.mouthStyle === 'tongue' || config.mouthStyle === 'open') {
      return (
        <>
          {/* Bouche ouverte - style Duolingo */}
          <div style={{
            position: 'absolute',
            top: mouthY,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${mouthWidth}px`,
            height: `${size * 0.18 * scale}px`,
            backgroundColor: '#ffffff',
            borderRadius: `0 0 ${mouthWidth * 0.6}px ${mouthWidth * 0.6}px`,
            border: `3px solid #2c1b18`,
            borderTop: 'none',
            zIndex: 2,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}>
            {/* Langue rouge */}
            {config.mouthStyle === 'tongue' && (
              <div style={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '50%',
                backgroundColor: '#ff0066',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }} />
            )}
            {/* Dent blanche pour open */}
            {config.mouthStyle === 'open' && (
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20%',
                height: '30%',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                border: '1px solid #ddd',
              }} />
            )}
          </div>
          {/* Lèvre supérieure */}
          <div style={{
            position: 'absolute',
            top: mouthY,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${mouthWidth * 0.8}px`,
            height: '3px',
            backgroundColor: '#ff6b9d',
            borderRadius: '2px',
            zIndex: 3,
          }} />
        </>
      );
    }

    if (config.mouthStyle === 'neutral') {
      return (
        <div style={{
          position: 'absolute',
          top: mouthY,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${mouthWidth * 0.7}px`,
          height: '3px',
          backgroundColor: '#2c1b18',
          borderRadius: '2px',
          zIndex: 2,
        }} />
      );
    }

    const isBig = config.mouthStyle === 'bigSmile';
    const mouthHeight = isBig ? size * 0.12 * scale : size * 0.08 * scale;
    const mouthCurve = isBig ? mouthWidth * 1.3 : mouthWidth;

    return (
      <>
        <div style={{
          position: 'absolute',
          top: mouthY,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${mouthCurve}px`,
          height: `${mouthHeight}px`,
          border: '3px solid #2c1b18',
          borderTop: 'none',
          borderRadius: `0 0 ${mouthCurve}px ${mouthCurve}px`,
          backgroundColor: '#ff6b9d',
          zIndex: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }} />
        {/* Lèvre supérieure pour sourire */}
        <div style={{
          position: 'absolute',
          top: mouthY,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${mouthCurve * 0.7}px`,
          height: '2px',
          backgroundColor: '#ff6b9d',
          borderRadius: '1px',
          zIndex: 3,
        }} />
      </>
    );
  };

  // Hat rendering
  const renderHat = () => {
    if (config.hatStyle === 'none') return null;

    const hatStyle: React.CSSProperties = {
      position: 'absolute',
      top: '-8%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: config.hatColor || config.shirtColor,
      zIndex: 4,
    };

    switch (config.hatStyle) {
      case 'beanie':
        return (
          <div style={{
            ...hatStyle,
            width: '90%',
            height: '35%',
            borderRadius: '50% 50% 10px 10px',
          }} />
        );
      case 'cap':
        return (
          <>
            <div style={{
              ...hatStyle,
              width: '85%',
              height: '25%',
              borderRadius: '15px 15px 0 0',
            }} />
            <div style={{
              ...hatStyle,
              top: '20%',
              width: '30%',
              height: '8%',
              backgroundColor: config.hatColor || config.shirtColor,
              borderRadius: '50%',
            }} />
          </>
        );
      case 'turban':
        return (
          <div style={{
            ...hatStyle,
            width: '95%',
            height: '30%',
            borderRadius: '20px',
            boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
          }} />
        );
      default:
        return null;
    }
  };

  // Facial hair rendering
  const renderFacialHair = () => {
    if (config.facialHair === 'none') return null;

    const color = config.facialHairColor || config.hairColor;

    if (config.facialHair === 'mustache') {
      return (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '35%',
          height: '8%',
          backgroundColor: color,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          zIndex: 2,
        }} />
      );
    }

    if (config.facialHair === 'beard') {
      return (
        <div style={{
          position: 'absolute',
          top: '52%',
          left: '32%',
          width: '36%',
          height: '25%',
          backgroundColor: color,
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          zIndex: 2,
        }} />
      );
    }

    return null;
  };

  // Body/Shirt rendering - Plus détaillé comme Duolingo
  const renderBody = () => {
    const bodyWidth = size * 0.65;
    const bodyHeight = size * 0.52;
    const bodyStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${bodyWidth}px`,
      height: `${bodyHeight}px`,
      backgroundColor: config.shirtColor,
      borderRadius: '14px',
      zIndex: 0,
      boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
    };

    if (config.shirtStyle === 'hoodie') {
      return (
        <>
          <div style={bodyStyle} />
          {/* Capuche */}
          <div style={{
            ...bodyStyle,
            height: `${bodyHeight * 0.65}px`,
            backgroundColor: darkenColor(config.shirtColor, 12),
            borderRadius: '14px 14px 0 0',
          }} />
          {/* Ligne de séparation */}
          <div style={{
            position: 'absolute',
            bottom: bodyHeight * 0.35,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${bodyWidth * 0.85}px`,
            height: '4px',
            backgroundColor: darkenColor(config.shirtColor, 20),
            borderRadius: '2px',
            zIndex: 1,
          }} />
        </>
      );
    }

    if (config.shirtStyle === 'polo') {
      return (
        <>
          <div style={bodyStyle} />
          {/* Col polo */}
          <div style={{
            position: 'absolute',
            bottom: bodyHeight * 0.75,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '18%',
            height: '10%',
            backgroundColor: darkenColor(config.shirtColor, 25),
            borderRadius: '50%',
            zIndex: 1,
          }} />
          {/* Boutons */}
          {[0.68, 0.62, 0.56].map(offset => (
            <div
              key={offset}
              style={{
                position: 'absolute',
                bottom: bodyHeight * offset,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8%',
                height: '8%',
                backgroundColor: darkenColor(config.shirtColor, 30),
                borderRadius: '50%',
                zIndex: 1,
              }}
            />
          ))}
        </>
      );
    }

    // T-shirt simple - ajouter des détails comme sur l'image Duolingo
    return (
      <>
        <div style={bodyStyle} />
        {/* Détails rectangulaires comme sur l'image */}
        <div style={{
          position: 'absolute',
          bottom: bodyHeight * 0.25,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${bodyWidth * 0.25}px`,
          height: `${bodyHeight * 0.15}px`,
          backgroundColor: darkenColor(config.shirtColor, 15),
          borderRadius: '4px',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          bottom: bodyHeight * 0.1,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${bodyWidth * 0.3}px`,
          height: `${bodyHeight * 0.12}px`,
          backgroundColor: darkenColor(config.shirtColor, 15),
          borderRadius: '4px',
          zIndex: 1,
        }} />
      </>
    );
  };

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size * 1.25, // Taller for body
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {/* Body/Shirt */}
      {renderBody()}

      {/* Head - Style Duolingo exact */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size,
          height: size,
          backgroundColor: config.skinColor,
          borderRadius: '30%', // Duolingo rounded square - plus arrondi
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Ears - Plus petits et mieux positionnés */}
        <div style={{
          position: 'absolute',
          left: -size * 0.10 * scale,
          top: '26%',
          width: size * 0.18 * scale,
          height: size * 0.18 * scale,
          backgroundColor: earColor,
          borderRadius: '50%',
          zIndex: 0,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }} />
        <div style={{
          position: 'absolute',
          right: -size * 0.10 * scale,
          top: '26%',
          width: size * 0.18 * scale,
          height: size * 0.18 * scale,
          backgroundColor: earColor,
          borderRadius: '50%',
          zIndex: 0,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }} />

        {/* Hat (on top) */}
        {renderHat()}

        {/* Hair */}
        {renderHair()}

        {/* Eyes */}
        {renderEyes()}

        {/* Glasses */}
        {renderGlasses()}

        {/* Facial Hair */}
        {renderFacialHair()}

        {/* Mouth */}
        {renderMouth()}
      </div>
    </div>
  );
}

