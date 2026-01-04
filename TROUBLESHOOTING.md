# Guide de Dépannage - StockMaster Learning System

## 🔍 Diagnostic Rapide

### 1. Vérifier l'état du système

Allez sur: **`http://localhost:8080/diagnostic`**

Cette page vérifie automatiquement:
- ✅ Authentification utilisateur
- ✅ Existence de la table `lessons`
- ✅ Présence des nouvelles colonnes (migration appliquée)
- ✅ Nombre de leçons dans la DB
- ✅ Table `user_lesson_progress`

### 2. Problèmes Courants et Solutions

#### ❌ "Le serveur ne démarre pas"

**Solution:**
```bash
# Arrêter tous les processus Node
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process

# Redémarrer
cd "C:\Users\mykae\OneDrive\Documentos\App learnin trading"
npm run dev
```

#### ❌ "Erreur: column does not exist"

**Cause:** La migration n'a pas été appliquée

**Solution:**
1. Allez sur votre dashboard Supabase
2. Ouvrez **SQL Editor**
3. Copiez le contenu de `supabase/migrations/20260103000000_stockmaster_learning_system.sql`
4. Exécutez la requête
5. Vérifiez avec `/diagnostic`

#### ❌ "Aucune leçon n'apparaît"

**Causes possibles:**
1. Aucune leçon dans la DB → Allez sur `/seed-lessons`
2. Migration non appliquée → Voir ci-dessus
3. Erreur de chargement → Vérifiez la console (F12)

**Solution:**
1. Vérifiez `/diagnostic`
2. Si 0 leçons → Allez sur `/seed-lessons`
3. Cliquez sur "Insérer les 10 Leçons"
4. Rafraîchissez `/learn`

#### ❌ "Erreur lors de l'insertion des leçons"

**Vérifications:**
1. Êtes-vous connecté? (vérifiez `/diagnostic`)
2. La migration est-elle appliquée? (vérifiez `/diagnostic`)
3. Ouvrez la console (F12) et regardez les erreurs

**Solution:**
- Si erreur "column does not exist" → Appliquez la migration
- Si erreur de permissions → Vérifiez les RLS policies dans Supabase
- Si autre erreur → Regardez le message exact dans la console

#### ❌ "localhost ne répond pas"

**Vérifications:**
```powershell
# Vérifier si le port est utilisé
netstat -ano | findstr :8080

# Vérifier les processus Node
Get-Process | Where-Object {$_.ProcessName -eq "node"}
```

**Solution:**
1. Arrêter tous les processus Node
2. Redémarrer: `npm run dev`
3. Attendre 5-10 secondes
4. Ouvrir: `http://localhost:8080`

#### ❌ "Erreurs de compilation"

**Vérifications:**
```bash
npm run build
```

**Solutions:**
- Si erreur CSS → Vérifiez `src/index.css` (l'@import doit être avant @tailwind)
- Si erreur TypeScript → Vérifiez les types dans `src/types/lesson.types.ts`
- Si erreur d'import → Vérifiez les chemins dans les imports

## 🛠️ Commandes Utiles

### Redémarrer le serveur
```powershell
# Arrêter
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process

# Démarrer
cd "C:\Users\mykae\OneDrive\Documentos\App learnin trading"
npm run dev
```

### Vérifier les erreurs
```powershell
# Build pour voir les erreurs
npm run build

# Linter
npm run lint
```

### Vérifier la base de données
```sql
-- Dans Supabase SQL Editor
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lessons';

-- Compter les leçons
SELECT COUNT(*) FROM lessons;

-- Voir les colonnes de lessons
SELECT * FROM lessons LIMIT 1;
```

## 📋 Checklist de Vérification

Avant de signaler un problème, vérifiez:

- [ ] Le serveur tourne (port 8080 actif)
- [ ] Vous êtes connecté (vérifiez `/diagnostic`)
- [ ] La migration est appliquée (vérifiez `/diagnostic`)
- [ ] Les leçons sont insérées (vérifiez `/diagnostic`)
- [ ] Pas d'erreurs dans la console (F12)
- [ ] Pas d'erreurs de compilation (`npm run build`)

## 🆘 Si Rien Ne Fonctionne

1. **Vérifiez `/diagnostic`** - Cela vous dira exactement ce qui ne va pas
2. **Regardez la console** (F12 → Console) - Les erreurs sont là
3. **Vérifiez Supabase** - Les tables existent-elles?
4. **Redémarrez tout:**
   ```powershell
   # Arrêter Node
   Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process
   
   # Nettoyer et réinstaller
   Remove-Item -Recurse -Force node_modules
   npm install
   
   # Redémarrer
   npm run dev
   ```

## 📞 Informations à Fournir

Si vous avez besoin d'aide, fournissez:
1. Le résultat de `/diagnostic`
2. Les erreurs de la console (F12)
3. Le résultat de `npm run build`
4. Les messages d'erreur exacts

