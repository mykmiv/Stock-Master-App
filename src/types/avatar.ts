// Avatar configuration types
export type FaceShape = 'round' | 'oval' | 'square';
export type SkinTone = 'light' | 'medium' | 'tan' | 'brown' | 'dark';
export type EyeShape = 'normal' | 'focused' | 'confident' | 'relaxed' | 'happy' | 'wink';
export type EyebrowStyle = 'neutral' | 'confident' | 'sharp' | 'thick' | 'thin';
export type MouthStyle = 'smile' | 'neutral' | 'focused' | 'grin' | 'surprised';
export type HairStyle = 'short' | 'medium' | 'long' | 'curly' | 'wavy' | 'afro' | 'bald' | 'bun' | 'ponytail';
export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'blue' | 'green' | 'purple';
export type BeardStyle = 'none' | 'stubble' | 'short' | 'medium' | 'full' | 'goatee';
export type GlassesStyle = 'none' | 'round' | 'square' | 'aviator' | 'wayfarer';
export type HatStyle = 'none' | 'cap' | 'beanie' | 'snapback' | 'bucket';
export type OutfitStyle = 'tshirt' | 'hoodie' | 'hoodie_dark' | 'polo' | 'suit' | 'jacket';
export type AccessoryStyle = 'none' | 'headset' | 'laptop_badge' | 'watch' | 'necklace';

export interface AvatarConfig {
  // Base layers
  face: FaceShape;
  skinTone: SkinTone;
  eyes: EyeShape;
  eyebrows: EyebrowStyle;
  mouth: MouthStyle;
  
  // Hair & facial features
  hair: HairStyle;
  hairColor: HairColor;
  beard: BeardStyle;
  
  // Accessories
  glasses: GlassesStyle;
  hat: HatStyle;
  
  // Trading-themed
  outfit: OutfitStyle;
  accessory: AccessoryStyle;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  face: 'round',
  skinTone: 'medium',
  eyes: 'focused',
  eyebrows: 'confident',
  mouth: 'smile',
  hair: 'short',
  hairColor: 'brown',
  beard: 'none',
  glasses: 'none',
  hat: 'none',
  outfit: 'hoodie',
  accessory: 'none',
};

