// Configuration avatar Duolingo exacte
export interface DuolingoAvatarConfig {
  // Corps/Visage
  skinColor: string;
  
  // Cheveux
  hairStyle: 'none' | 'short' | 'curly' | 'spiky' | 'long' | 'bun' | 'afro' | 'wavy';
  hairColor: string;
  
  // Yeux
  eyeColor: string;
  eyeStyle: 'normal' | 'wide' | 'lookingLeft' | 'lookingRight' | 'wink' | 'closed';
  eyeExpression: 'default' | 'surprised' | 'wink';
  
  // Lunettes
  glassesStyle: 'none' | 'round' | 'roundSmall' | 'square' | 'sunglasses';
  glassesColor: string;
  
  // Moustache/Facial
  facialHair: 'none' | 'mustache' | 'beard';
  facialHairColor?: string;
  
  // Chapeau
  hatStyle: 'none' | 'beanie' | 'cap' | 'turban';
  hatColor?: string;
  
  // Vêtements
  shirtStyle: 'tShirt' | 'hoodie' | 'polo';
  shirtColor: string;
  
  // Bouche
  mouthStyle: 'smile' | 'bigSmile' | 'neutral' | 'open' | 'tongue';
}

export const DEFAULT_DUOLINGO_AVATAR_CONFIG: DuolingoAvatarConfig = {
  skinColor: '#d08b5b',
  hairStyle: 'none',
  hairColor: '#2c1b18',
  eyeColor: '#2c1b18',
  eyeStyle: 'normal',
  eyeExpression: 'default',
  glassesStyle: 'none',
  glassesColor: '#1cb0f6',
  facialHair: 'none',
  hatStyle: 'none',
  shirtStyle: 'tShirt',
  shirtColor: '#ce82ff',
  mouthStyle: 'smile',
};

// Couleurs exactes Duolingo
export const DUOLINGO_COLORS = {
  skin: [
    { value: '#ffdbb4', label: 'Clair' },
    { value: '#edb98a', label: 'Moyen Clair' },
    { value: '#d08b5b', label: 'Moyen' },
    { value: '#ae5d29', label: 'Foncé' },
    { value: '#8b5a3c', label: 'Très Foncé' },
    { value: '#6b4423', label: 'Sombre' }
  ],
  
  hair: [
    { value: '#2c1b18', label: 'Noir' },
    { value: '#4a312c', label: 'Brun Foncé' },
    { value: '#724133', label: 'Brun' },
    { value: '#a55728', label: 'Châtain' },
    { value: '#e68e2e', label: 'Blond' },
    { value: '#c93305', label: 'Roux' },
    { value: '#8b8b8b', label: 'Gris' },
    { value: '#ffffff', label: 'Blanc' },
    { value: '#f59797', label: 'Rose' }
  ],
  
  eyes: [
    { value: '#2c1b18', label: 'Noir' },
    { value: '#4a312c', label: 'Brun Foncé' },
    { value: '#724133', label: 'Brun' },
    { value: '#58cc02', label: 'Vert' },
    { value: '#0ea5e9', label: 'Bleu' },
    { value: '#6366f1', label: 'Violet' }
  ],
  
  glasses: [
    { value: '#ce82ff', label: 'Violet' },
    { value: '#1cb0f6', label: 'Bleu' },
    { value: '#58cc02', label: 'Vert' },
    { value: '#ff9600', label: 'Orange' },
    { value: '#ff4b4b', label: 'Rouge' },
    { value: '#ff6b9d', label: 'Rose' }
  ],
  
  shirt: [
    { value: '#1cb0f6', label: 'Bleu' },
    { value: '#58cc02', label: 'Vert' },
    { value: '#ff4b4b', label: 'Rouge' },
    { value: '#ff6b9d', label: 'Rose' },
    { value: '#ce82ff', label: 'Violet' },
    { value: '#ff9600', label: 'Orange' },
    { value: '#ffd700', label: 'Jaune' },
    { value: '#2c2c2c', label: 'Noir' },
    { value: '#ffffff', label: 'Blanc' }
  ]
};

export const DUOLINGO_OPTIONS = {
  hairStyle: [
    { value: 'none', label: 'Chauve' },
    { value: 'short', label: 'Court' },
    { value: 'curly', label: 'Bouclé' },
    { value: 'spiky', label: 'Piquant' },
    { value: 'long', label: 'Long' },
    { value: 'bun', label: 'Chignon' },
    { value: 'afro', label: 'Afro' },
    { value: 'wavy', label: 'Ondulé' }
  ],
  
  eyeStyle: [
    { value: 'normal', label: 'Normal' },
    { value: 'wide', label: 'Grands' },
    { value: 'lookingLeft', label: 'Gauche' },
    { value: 'lookingRight', label: 'Droite' },
    { value: 'wink', label: 'Clin' },
    { value: 'closed', label: 'Fermés' }
  ],
  
  glassesStyle: [
    { value: 'none', label: 'Aucune' },
    { value: 'round', label: 'Rondes' },
    { value: 'roundSmall', label: 'Petites' },
    { value: 'square', label: 'Carrées' },
    { value: 'sunglasses', label: 'Soleil' }
  ],
  
  facialHair: [
    { value: 'none', label: 'Aucun' },
    { value: 'mustache', label: 'Moustache' },
    { value: 'beard', label: 'Barbe' }
  ],
  
  hatStyle: [
    { value: 'none', label: 'Aucun' },
    { value: 'beanie', label: 'Bonnet' },
    { value: 'cap', label: 'Casquette' },
    { value: 'turban', label: 'Turban' }
  ],
  
  shirtStyle: [
    { value: 'tShirt', label: 'T-shirt' },
    { value: 'hoodie', label: 'Hoodie' },
    { value: 'polo', label: 'Polo' }
  ],
  
  mouthStyle: [
    { value: 'smile', label: 'Sourire' },
    { value: 'bigSmile', label: 'Grand Sourire' },
    { value: 'neutral', label: 'Neutre' },
    { value: 'open', label: 'Ouvert' },
    { value: 'tongue', label: 'Langue' }
  ]
};

