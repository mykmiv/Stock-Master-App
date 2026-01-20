import { createAvatar } from '@dicebear/core';
import { avataaars, bigSmile, lorelei, personas } from '@dicebear/collection';
import { useMemo } from 'react';

export interface DiceBearAvatarConfig {
  style?: 'avataaars' | 'bigSmile' | 'lorelei' | 'personas';
  seed: string;
  backgroundColor?: string[];
  skinColor?: string[];
  hairColor?: string[];
  hair?: string[]; // For bigSmile (instead of top)
  accessories?: string[];
  accessoriesProbability?: number;
  clothing?: string[];
  clothingColor?: string[];
  eyebrows?: string[];
  eyes?: string[];
  facialHair?: string[];
  facialHairColor?: string[];
  facialHairProbability?: number;
  mouth?: string[];
  top?: string[]; // For avataaars
  glasses?: string[]; // For bigSmile (instead of accessories)
}

interface AvatarGeneratorProps {
  config: DiceBearAvatarConfig | null;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function AvatarGenerator({ 
  config, 
  size = 200, 
  className = '',
  onClick 
}: AvatarGeneratorProps) {
  const avatarSvg = useMemo(() => {
    if (!config || !config.seed) {
      // Default avatar with bigSmile (cartoon style)
      const defaultAvatar = createAvatar(bigSmile, {
        seed: 'default',
        size: size,
      });
      return defaultAvatar.toString();
    }

    const styleMap = {
      avataaars: avataaars,
      bigSmile: bigSmile,
      lorelei: lorelei,
      personas: personas
    };

    const selectedStyle = styleMap[config.style || 'bigSmile']; // Default to bigSmile (cartoon)

    // bigSmile uses different property names
    if (selectedStyle === bigSmile) {
      const avatar = createAvatar(bigSmile, {
        seed: config.seed,
        size: size,
        backgroundColor: config.backgroundColor,
        skinColor: config.skinColor,
        hairColor: config.hairColor,
        hair: config.hair || config.top, // Use hair for bigSmile (fallback to top for compatibility)
        eyes: config.eyes,
        eyebrows: config.eyebrows,
        mouth: config.mouth,
        glasses: config.glasses || config.accessories, // Use glasses for bigSmile (fallback to accessories)
      });
      return avatar.toString();
    }

    // For other styles (avataaars, lorelei, personas)
    const avatar = createAvatar(selectedStyle, {
      seed: config.seed,
      size: size,
      skinColor: config.skinColor,
      hairColor: config.hairColor,
      accessories: config.accessories,
      accessoriesProbability: config.accessoriesProbability,
      clothing: config.clothing,
      clothingColor: config.clothingColor,
      eyebrows: config.eyebrows,
      eyes: config.eyes,
      facialHair: config.facialHair,
      facialHairColor: config.facialHairColor,
      facialHairProbability: config.facialHairProbability,
      mouth: config.mouth,
      top: config.top,
    });

    return avatar.toString();
  }, [config, size]);

  return (
    <div 
      className={className}
      style={{ width: size, height: size }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: avatarSvg }}
    />
  );
}

