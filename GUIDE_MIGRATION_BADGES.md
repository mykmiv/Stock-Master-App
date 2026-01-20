# Guide pour Exécuter la Migration des Badges Mensuels

## 📋 Fichier de Migration Créé

Le fichier de migration a été créé :
- `supabase/migrations/20250104000003_add_diverse_monthly_badges.sql`

Cette migration ajoute **57 badges mensuels variés** à votre base de données.

---

## 🚀 Méthode 1 : Via Supabase Dashboard (RECOMMANDÉ)

### Étapes :

1. **Ouvrez votre dashboard Supabase**
   - Allez sur : https://supabase.com/dashboard
   - Connectez-vous si nécessaire

2. **Sélectionnez votre projet**
   - Cliquez sur le projet "App learnin trading" (ou le nom de votre projet)

3. **Ouvrez SQL Editor**
   - Dans le menu de gauche, cliquez sur **"SQL Editor"**
   - Ou allez directement : `https://supabase.com/dashboard/project/[VOTRE_PROJECT_ID]/sql/new`

4. **Créez une nouvelle requête**
   - Cliquez sur le bouton **"New query"** en haut à droite

5. **Copiez le contenu de la migration**
   - Ouvrez le fichier : `supabase/migrations/20250104000003_add_diverse_monthly_badges.sql`
   - Sélectionnez tout le contenu (Ctrl+A)
   - Copiez (Ctrl+C)

6. **Collez dans SQL Editor**
   - Collez le contenu dans l'éditeur SQL (Ctrl+V)

7. **Exécutez la migration**
   - Cliquez sur le bouton **"Run"** (ou appuyez sur **Ctrl+Enter**)
   - Attendez quelques secondes...

8. **Vérifiez le résultat**
   - Vous devriez voir un message de succès : "Success. No rows returned"
   - Cela signifie que les badges ont été insérés avec succès !

---

## 🖥️ Méthode 2 : Via Supabase CLI (Avancé)

### Prérequis :
- Supabase CLI doit être installé
- Vous devez être connecté à votre projet Supabase

### Étapes :

1. **Vérifiez que Supabase CLI est installé**
   ```powershell
   supabase --version
   ```
   Si ce n'est pas installé, installez-le :
   ```powershell
   npm install -g supabase
   ```

2. **Connectez-vous à Supabase**
   ```powershell
   supabase login
   ```

3. **Liez votre projet local au projet Supabase**
   ```powershell
   supabase link --project-ref [VOTRE_PROJECT_REF]
   ```
   Vous pouvez trouver votre project-ref dans l'URL de votre dashboard Supabase

4. **Exécutez la migration**
   ```powershell
   supabase db push
   ```
   Cela exécutera toutes les nouvelles migrations dans le dossier `supabase/migrations/`

---

## ✅ Vérification Après Exécution

Après avoir exécuté la migration, vérifiez que tout fonctionne :

### 1. Dans Supabase SQL Editor, exécutez :

```sql
-- Compter le nombre total de badges mensuels
SELECT COUNT(*) as total_monthly_badges 
FROM badges 
WHERE monthly = true;
```

**Résultat attendu :** `57` (ou plus si vous aviez déjà des badges)

### 2. Voir la répartition par catégorie :

```sql
SELECT category, COUNT(*) as count 
FROM badges 
WHERE monthly = true 
GROUP BY category 
ORDER BY count DESC;
```

**Résultat attendu :**
- `special`: ~18 badges
- `lessons`: 9 badges
- `trading`: 10 badges
- `xp`: 9 badges (6 + 3 progression)
- `social`: 6 badges
- `streak`: 5 badges

### 3. Voir tous les badges :

```sql
SELECT name, category, icon, requirement_value 
FROM badges 
WHERE monthly = true 
ORDER BY category, requirement_value 
LIMIT 20;
```

---

## 🎯 Badges Ajoutés

Cette migration ajoute **57 badges mensuels** répartis comme suit :

- **9 badges Learning** (Première leçon → Maître Mensuel)
- **10 badges Trading** (Premier trade → Bull/Bear du Mois)
- **5 badges Streak** (3 jours → Mois Parfait)
- **6 badges XP** (100 XP → 10K XP)
- **9 badges XP Progression** (Level Up → Triple Threat)
- **6 badges Social** (Nouveau Ami → #1 du Mois)
- **15 badges Spécial** (Early Bird, Night Owl, Marathon, Scanner Pro, etc.)
- **3 badges Achievement Collector** (Premier Succès → Chasseur)

---

## 🚨 Problèmes Possibles

### Erreur : "relation badges does not exist"

**Solution :** La table `badges` n'existe pas encore. Vous devez d'abord exécuter la migration précédente :
- `supabase/migrations/20250104000002_add_monthly_badges.sql`

Cette migration crée la table `badges` si elle n'existe pas.

### Erreur : "duplicate key value"

**Solution :** Certains badges existent déjà. C'est normal si vous exécutez la migration plusieurs fois. Pour remplacer les badges existants, décommentez cette ligne au début du fichier SQL :
```sql
DELETE FROM badges WHERE monthly = true;
```

### Erreur : "permission denied"

**Solution :** Assurez-vous d'être connecté avec un compte qui a les droits d'administration sur le projet Supabase.

---

## 📝 Notes Importantes

1. **La table `badges` doit exister** avant d'exécuter cette migration
   - Si elle n'existe pas, exécutez d'abord : `20250104000002_add_monthly_badges.sql`

2. **Les badges sont mensuels** (`monthly = true`)
   - Cela signifie qu'ils se réinitialisent chaque mois
   - Les utilisateurs peuvent les redébloquer chaque mois

3. **Tous les badges respectent les contraintes**
   - `category` : 'streak', 'lessons', 'xp', 'trading', 'social', 'special'
   - `requirement_type` : 'count', 'streak', 'score', 'special'

---

## ✅ Après l'Exécution

Une fois la migration exécutée avec succès :

1. ✅ Les **57 badges mensuels** seront disponibles dans votre base de données
2. ✅ Ils apparaîtront dans l'application quand vous implémenterez la récupération depuis Supabase
3. ✅ Les utilisateurs pourront les voir dans la section "BADGES MENSUELS" du profil

---

**Bon courage ! 🚀**
