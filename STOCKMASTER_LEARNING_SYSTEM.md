# StockMaster AI - Système d'Apprentissage Complet

## 📋 Vue d'ensemble

Ce document décrit le nouveau système d'apprentissage gamifié de type Duolingo pour StockMaster AI. Le système transforme l'apprentissage du trading en une expérience engageante et motivante.

## 🎯 Fonctionnalités Implémentées

### ✅ Composants Créés

1. **StockyCharacter** (`src/components/mascot/StockyCharacter.tsx`)
   - Mascotte animée avec 6 émotions différentes
   - Tailles: small, medium, large
   - Animations intégrées

2. **SpeechBubble** (`src/components/mascot/SpeechBubble.tsx`)
   - Bulles de dialogue pour Stocky
   - Positions: top, bottom, left, right
   - Animations d'apparition

3. **LearningDashboard** (`src/components/learning/LearningDashboard.tsx`)
   - Barre de stats (streak, XP, coins, level)
   - Affichage de Stocky et niveau utilisateur
   - Sélecteur de modules

4. **LessonPath** (`src/components/learning/LessonPath.tsx`)
   - Chemin vertical style Duolingo
   - Groupement par jours
   - Trésors de fin de jour

5. **LessonCard** (`src/components/learning/LessonCard.tsx`)
   - États: locked, current, completed
   - Badge de score parfait (3 étoiles)
   - Hover avec infos

6. **LessonPlayer** (`src/components/learning/LessonPlayer.tsx`)
   - Lecteur de leçons complet
   - Support de tous les types de contenu
   - Barre de progression
   - Navigation avant/arrière

7. **Composants de Contenu Interactif**
   - `ExplanationSlide.tsx` - Écrans d'explication
   - `MultipleChoiceSlide.tsx` - Questions à choix multiples
   - `DragDropSlide.tsx` - Glisser-déposer
   - `TrueFalseSlide.tsx` - Vrai/Faux
   - `CompletionSlide.tsx` - Écran de fin

### ✅ Hooks Créés

1. **useLessonProgress** (`src/hooks/useLessonProgress.ts`)
   - Gestion du progrès des leçons
   - Déverrouillage automatique
   - Mise à jour des statuts

2. **useUserStats** (`src/hooks/useUserStats.ts`)
   - Statistiques utilisateur
   - XP, coins, streaks
   - Synchronisation avec Supabase

### ✅ Types TypeScript

- `src/types/lesson.types.ts` - Tous les types pour le système

### ✅ Migration Base de Données

- `supabase/migrations/20260103000000_stockmaster_learning_system.sql`
  - Extension des tables existantes
  - Nouvelles tables: user_achievements, user_stats
  - Champs ajoutés: coins, streaks, etc.

## 🚀 Prochaines Étapes

### 1. Appliquer la Migration

```bash
# Dans Supabase CLI ou via le dashboard
supabase migration up
```

### 2. Intégrer la Nouvelle Page

Remplacez ou ajoutez la route dans `src/App.tsx`:

```typescript
import LearnNew from '@/pages/LearnNew';

// Dans vos routes:
<Route path="/learn" element={<LearnNew />} />
```

### 3. Créer le Contenu des Leçons

Utilisez le script `src/scripts/seedLessons.ts` pour insérer les premières leçons, ou créez-les via l'interface Supabase.

Format JSON pour `content_json`:
```json
[
  {
    "type": "intro",
    "stockyEmotion": "happy",
    "speechBubble": "Texte...",
    "continueButtonText": "Continuer"
  },
  {
    "type": "explanation",
    "stockyEmotion": "teaching",
    "title": "Titre",
    "speechBubbleText": "Texte...",
    "keyPoints": ["Point 1", "Point 2"],
    "continueButtonText": "Continuer"
  }
]
```

### 4. Système XP/Coins/Achievements

À implémenter dans `useLessonProgress.ts`:
- Calcul automatique de XP/coins à la fin d'une leçon
- Vérification des achievements
- Mise à jour des streaks
- Level up automatique

### 5. Animations et Transitions

Les animations Framer Motion sont déjà intégrées. Pour améliorer:
- Ajouter des transitions entre slides
- Animations de confetti améliorées
- Effets sonores (optionnel)

## 📊 Structure des Données

### Table `lessons`
- `module_id`: Numéro du module (1-5)
- `day_number`: Numéro du jour (1-25)
- `lesson_number`: Numéro de la leçon (1.1, 1.2, etc.)
- `content_json`: Contenu JSONB avec tous les slides
- `xp_reward`: XP gagné (défaut: 10)
- `coin_reward`: Coins gagnés (défaut: 5)

### Table `user_lesson_progress`
- `status`: not_started | in_progress | completed | mastered
- `score`: Score final (0-100)
- `attempts`: Nombre de tentatives
- `time_spent_seconds`: Temps passé

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans les composants. Pour changer le thème:
- Indigo (#4F46E5) - Couleur principale
- Green (#10B981) - Succès
- Orange (#F59E0B) - Streak/Warning

### Stocky
Pour ajouter de nouvelles émotions, modifiez `StockyCharacter.tsx` et ajoutez les variations SVG.

## 🐛 Problèmes Connus

1. Le contenu JSON doit être correctement formaté dans la base de données
2. Les leçons doivent être créées avec le bon format `content_json`
3. Le système de déverrouillage nécessite que les leçons précédentes soient complétées

## 📝 Notes

- Le système est conçu pour être extensible
- Tous les composants sont réutilisables
- Le système de gamification peut être étendu facilement
- Les types TypeScript garantissent la cohérence des données

## 🔗 Fichiers Clés

- Page principale: `src/pages/LearnNew.tsx`
- Types: `src/types/lesson.types.ts`
- Hooks: `src/hooks/useLessonProgress.ts`, `src/hooks/useUserStats.ts`
- Composants: `src/components/learning/`, `src/components/mascot/`
- Migration: `supabase/migrations/20260103000000_stockmaster_learning_system.sql`

