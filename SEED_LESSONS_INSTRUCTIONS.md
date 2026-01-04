# Instructions pour Insérer les Leçons 1-10

## Méthode 1: Via la Console du Navigateur (Recommandé)

1. **Ouvrez votre application** sur `http://localhost:8080`
2. **Ouvrez la console du navigateur** (F12 → Console)
3. **Copiez et collez ce code**:

```javascript
// Importer la fonction de seed
import { seedLessons1to10 } from './src/scripts/seedLessons1to10';

// Exécuter le seed
await seedLessons1to10();
```

**OU** si vous êtes déjà sur la page Learn:

```javascript
// Depuis la console du navigateur
const { seedLessons1to10 } = await import('/src/scripts/seedLessons1to10.ts');
await seedLessons1to10();
```

## Méthode 2: Via Supabase Dashboard

1. **Allez sur votre dashboard Supabase**
2. **Ouvrez SQL Editor**
3. **Créez une nouvelle requête**
4. **Copiez le contenu de chaque leçon** depuis `src/data/lessons1to10.ts`
5. **Insérez manuellement** avec des requêtes SQL:

```sql
INSERT INTO lessons (
  module_id, day_number, lesson_number, title, description,
  lesson_type, content_json, min_score_to_pass,
  xp_reward, coin_reward, is_locked, unlock_requirement,
  estimated_duration_minutes, level, order_index
) VALUES (
  1, 1, 1.1, 'Qu''est-ce que le Trading d''Actions?',
  'Découvre les bases de l''achat et de la vente d''actions',
  'mixed',
  '[{"type":"intro","stockyEmotion":"happy",...}]'::jsonb,
  70, 10, 5, false, null, 5, 'beginner', 1
);
```

## Méthode 3: Créer un Bouton Admin

Ajoutez un bouton dans votre page Admin pour exécuter le seed:

```typescript
// Dans votre page Admin
import { seedLessons1to10 } from '@/scripts/seedLessons1to10';

const handleSeedLessons = async () => {
  const result = await seedLessons1to10();
  if (result.success) {
    toast.success('Leçons insérées avec succès!');
  } else {
    toast.error('Erreur lors de l\'insertion');
  }
};
```

## Vérification

Après avoir inséré les leçons, vérifiez:

1. **Allez sur `/learn`**
2. **Vous devriez voir 10 leçons** organisées en 2 jours
3. **La première leçon devrait être déverrouillée**
4. **Les autres devraient être verrouillées** jusqu'à complétion

## Structure des Leçons

- **Jour 1**: Leçons 1.1, 1.2, 1.3, 1.4 (4 leçons)
- **Jour 2**: Leçons 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 (6 leçons)
- **Total**: 10 leçons
- **XP Total**: 125 XP (sans bonus)
- **Coins Total**: 75 coins (sans bonus)

## Problèmes Courants

### Les leçons n'apparaissent pas
- Vérifiez que la migration a été appliquée
- Vérifiez que les leçons sont bien dans la table `lessons`
- Rafraîchissez la page

### Erreur de format JSON
- Vérifiez que `content_json` est bien au format JSONB
- Vérifiez que tous les champs requis sont présents

### Les leçons ne se déverrouillent pas
- Vérifiez la logique de déverrouillage dans `useLessonProgress`
- Vérifiez que `unlock_requirement` est correctement défini

