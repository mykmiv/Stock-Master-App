/**
 * Production-grade Avatar Configuration System
 * Inspired by Duolingo, Option 3: Base avatars + limited variations
 */

export interface AvatarConfig {
  baseId: number; // 1-12: Predefined base avatar
  hairId: number; // 1-4: Hair style variation
  hairColor: string; // Hex color from palette
  accessoryEnabled: boolean; // Optional accessory on/off
  topId: number; // 1-3: Top/shirt style
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  baseId: 1,
  hairId: 1,
  hairColor: '#2c1b18',
  accessoryEnabled: false,
  topId: 1,
};

/**
 * Base Avatar Definitions
 * Each base has a unique face structure (eyes, mouth, skin tone)
 */
export interface BaseAvatar {
  id: number;
  name: string;
  skinTone: string; // Default skin tone for this base
  description: string;
}

export const BASE_AVATARS: BaseAvatar[] = [
  { id: 1, name: 'Alex', skinTone: '#ffdbb4', description: 'Friendly smile' },
  { id: 2, name: 'Sam', skinTone: '#edb98a', description: 'Happy expression' },
  { id: 3, name: 'Jordan', skinTone: '#d08b5b', description: 'Neutral friendly' },
  { id: 4, name: 'Casey', skinTone: '#ae5d29', description: 'Warm smile' },
  { id: 5, name: 'Morgan', skinTone: '#8b5a3c', description: 'Cheerful face' },
  { id: 6, name: 'Riley', skinTone: '#6b4423', description: 'Friendly neutral' },
  { id: 7, name: 'Taylor', skinTone: '#ffdbb4', description: 'Big smile' },
  { id: 8, name: 'Avery', skinTone: '#edb98a', description: 'Happy eyes' },
  { id: 9, name: 'Quinn', skinTone: '#d08b5b', description: 'Warm expression' },
  { id: 10, name: 'Sage', skinTone: '#ae5d29', description: 'Friendly grin' },
  { id: 11, name: 'River', skinTone: '#8b5a3c', description: 'Cheerful smile' },
  { id: 12, name: 'Phoenix', skinTone: '#6b4423', description: 'Happy neutral' },
];

/**
 * Hair Style Definitions
 */
export interface HairStyle {
  id: number;
  name: string;
  description: string;
}

export const HAIR_STYLES: HairStyle[] = [
  { id: 1, name: 'Short', description: 'Classic short cut' },
  { id: 2, name: 'Curly', description: 'Curly waves' },
  { id: 3, name: 'Long', description: 'Long straight' },
  { id: 4, name: 'Bun', description: 'Top bun' },
];

/**
 * Top/Shirt Definitions
 */
export interface TopStyle {
  id: number;
  name: string;
  description: string;
}

export const TOP_STYLES: TopStyle[] = [
  { id: 1, name: 'T-Shirt', description: 'Classic tee' },
  { id: 2, name: 'Hoodie', description: 'Comfy hoodie' },
  { id: 3, name: 'Polo', description: 'Smart polo' },
];

/**
 * Hair Color Palette
 * Soft, inclusive colors matching Duolingo style
 */
export const HAIR_COLORS = [
  { value: '#2c1b18', label: 'Noir' },
  { value: '#4a312c', label: 'Brun Foncé' },
  { value: '#724133', label: 'Brun' },
  { value: '#a55728', label: 'Châtain' },
  { value: '#e68e2e', label: 'Blond' },
  { value: '#c93305', label: 'Roux' },
  { value: '#8b8b8b', label: 'Gris' },
  { value: '#ffffff', label: 'Blanc' },
  { value: '#f59797', label: 'Rose' },
];

/**
 * Top Color Palette
 */
export const TOP_COLORS = [
  { value: '#1cb0f6', label: 'Bleu' },
  { value: '#58cc02', label: 'Vert' },
  { value: '#ff4b4b', label: 'Rouge' },
  { value: '#ff6b9d', label: 'Rose' },
  { value: '#ce82ff', label: 'Violet' },
  { value: '#ff9600', label: 'Orange' },
  { value: '#ffd700', label: 'Jaune' },
  { value: '#2c2c2c', label: 'Noir' },
  { value: '#ffffff', label: 'Blanc' },
];

/**
 * Skin Tone Palette
 */
export const SKIN_TONES = [
  { value: '#ffdbb4', label: 'Clair' },
  { value: '#edb98a', label: 'Moyen Clair' },
  { value: '#d08b5b', label: 'Moyen' },
  { value: '#ae5d29', label: 'Foncé' },
  { value: '#8b5a3c', label: 'Très Foncé' },
  { value: '#6b4423', label: 'Sombre' },
];
