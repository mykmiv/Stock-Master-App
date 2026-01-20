# Avatar System - Duolingo Style

Système d'avatar personnalisé style Duolingo pour l'application de trading.

## Structure

```
src/
├── types/
│   └── avatar.ts              # Types et configuration par défaut
└── components/
    └── avatar/
        ├── AvatarRenderer.tsx  # Composant de rendu SVG
        ├── AvatarEditor.tsx    # Éditeur avec onglets
        └── README.md           # Cette documentation
```

## Utilisation

### Afficher un avatar

```tsx
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { AvatarConfig } from '@/types/avatar';

const config: AvatarConfig = {
  face: 'round',
  skinTone: 'medium',
  eyes: 'focused',
  // ... autres options
};

<AvatarRenderer config={config} size={200} />
```

### Ouvrir l'éditeur

```tsx
import { AvatarEditor } from '@/components/avatar/AvatarEditor';

<AvatarEditor
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  currentConfig={config}
  onSave={(newConfig) => {
    // Sauvegarder dans la base de données
  }}
/>
```

## Configuration

L'avatar est composé de plusieurs couches SVG empilées :

1. **Face** - Forme du visage (round, oval, square)
2. **Skin Tone** - Teint (light → dark)
3. **Hair** - Coiffure et couleur
4. **Eyes** - Forme des yeux
5. **Eyebrows** - Style de sourcils
6. **Mouth** - Expression
7. **Beard** - Barbe (optionnel)
8. **Glasses** - Lunettes (optionnel)
9. **Hat** - Chapeau (optionnel)
10. **Outfit** - Tenue (trading-themed)
11. **Accessory** - Accessoires trading (headset, laptop badge, etc.)

## Options Trading

- **Hoodie** avec icône 📈
- **Hoodie Dark** avec icône 📈 bleue
- **Headset** - Casque audio
- **Laptop Badge** - Badge ordinateur
- **Watch** - Montre

## Sauvegarde

La configuration est sauvegardée en JSON dans `profiles.avatar_config` :

```json
{
  "face": "round",
  "skinTone": "medium",
  "eyes": "focused",
  "eyebrows": "confident",
  "mouth": "smile",
  "hair": "short",
  "hairColor": "brown",
  "beard": "none",
  "glasses": "none",
  "hat": "none",
  "outfit": "hoodie",
  "accessory": "none"
}
```

## Intégration

Le système est déjà intégré dans `ProfilePage.tsx`. Cliquer sur l'avatar ouvre l'éditeur.

## Personnalisation

Pour ajouter de nouvelles options :

1. Ajouter le type dans `src/types/avatar.ts`
2. Ajouter le rendu SVG dans `AvatarRenderer.tsx`
3. Ajouter l'option dans `AvatarEditor.tsx`

