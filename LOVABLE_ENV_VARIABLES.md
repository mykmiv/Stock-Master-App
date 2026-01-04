# Guide : Variables d'environnement dans Lovable

## ⚠️ IMPORTANT : Deux sections différentes

Dans Lovable, il y a **DEUX endroits différents** pour configurer des variables :

### 1. **Cloud → Secrets** (Backend - Edge Functions)
- ❌ **PAS pour les variables VITE_***
- ✅ Pour les secrets backend (Stripe keys, API keys privées)
- Accessibles uniquement dans les edge functions (Deno.env.get)
- **Vous êtes actuellement ici** - ce n'est PAS la bonne section

### 2. **Project Settings → Environment Variables** (Frontend - Vite/React)
- ✅ **C'est ici qu'il faut configurer VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY**
- Pour les variables accessibles dans le code React/Vite
- Doivent commencer par `VITE_` pour être accessibles

## 🔧 Comment configurer les variables VITE_ dans Lovable

### Étape 1: Trouver la bonne section

1. Dans votre projet Lovable, cherchez :
   - **Project Settings** (ou **Settings** du projet)
   - Section **Environment Variables** (ou **Environment**)
   - **PAS** dans Cloud → Secrets

2. Si vous ne trouvez pas :
   - Cherchez un menu "Settings" dans la barre latérale gauche
   - Ou un icône de roue dentée ⚙️
   - Ou "Project Settings" dans le menu du projet

### Étape 2: Ajouter les variables

1. Cliquez sur "Add Environment Variable" ou un bouton similaire
2. Ajoutez ces deux variables :

```
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=votre-cle-publique
```

3. Pour obtenir les valeurs :
   - Allez sur https://app.supabase.com
   - Sélectionnez votre projet "Trading learning app"
   - Settings → API
   - Copiez "Project URL" → pour `VITE_SUPABASE_URL`
   - Copiez "anon/public key" → pour `VITE_SUPABASE_PUBLISHABLE_KEY`

4. Sauvegardez et redémarrez l'application

## 📝 Résumé

| Section | Pour quoi ? | Variables exemple |
|---------|-------------|-------------------|
| **Cloud → Secrets** | Backend (Edge Functions) | `STRIPE_SECRET_KEY`, `OPENAI_API_KEY` |
| **Project Settings → Environment** | Frontend (Vite/React) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` |

## ✅ Vérification

Après avoir ajouté les variables dans **Project Settings → Environment Variables** :
- L'application devrait se connecter à Supabase
- Les leçons devraient apparaître
- Le visuel devrait correspondre à votre version locale

