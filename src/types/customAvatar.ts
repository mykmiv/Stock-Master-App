// Custom Avatar Configuration (Simple Duolingo-style)
export interface CustomAvatarConfig {
  skinColor: string;
  hairType: 'bald' | 'short' | 'curly' | 'long' | 'bun' | 'ponytail' | 'afro' | 'wavy';
  hairColor: string;
  eyeType: 'normal' | 'happy' | 'wink' | 'closed' | 'surprised';
  mouthType: 'smile' | 'bigSmile' | 'neutral' | 'sad' | 'surprised';
  shirtColor: string;
  accessory?: 'none' | 'glasses' | 'sunglasses' | 'hat' | 'cap' | 'headset';
}

export const DEFAULT_CUSTOM_AVATAR_CONFIG: CustomAvatarConfig = {
  skinColor: '#ffdbb4',
  hairType: 'short',
  hairColor: '#2c1b18',
  eyeType: 'normal',
  mouthType: 'smile',
  shirtColor: '#1cb0f6',
  accessory: 'none',
};

export const COLORS = {
  skin: [
    { name: 'Clair', value: '#ffdbb4' },
    { name: 'Moyen', value: '#edb98a' },
    { name: 'Tan', value: '#d08b5b' },
    { name: 'Foncé', value: '#ae5d29' },
    { name: 'Très Foncé', value: '#614335' }
  ],
  
  hair: [
    { name: 'Noir', value: '#2c1b18' },
    { name: 'Brun', value: '#724133' },
    { name: 'Châtain', value: '#a55728' },
    { name: 'Blond', value: '#e68e2e' },
    { name: 'Roux', value: '#c93305' },
    { name: 'Gris', value: '#8b8b8b' },
    { name: 'Rose', value: '#f59797' },
    { name: 'Bleu', value: '#0ba5e9' },
    { name: 'Vert', value: '#3eac2c' },
    { name: 'Violet', value: '#9d4edd' }
  ],
  
  shirt: [
    { name: 'Bleu', value: '#1cb0f6' },
    { name: 'Vert', value: '#58cc02' },
    { name: 'Rouge', value: '#ff4b4b' },
    { name: 'Rose', value: '#ff6b9d' },
    { name: 'Violet', value: '#ce82ff' },
    { name: 'Orange', value: '#ff9600' },
    { name: 'Jaune', value: '#ffd700' },
    { name: 'Noir', value: '#2c2c2c' },
    { name: 'Blanc', value: '#ffffff' }
  ]
};

