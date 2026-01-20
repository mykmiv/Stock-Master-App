# Configuration du Storage Supabase pour les Avatars

## 📋 Étapes de Configuration

### 1. Créer le Bucket "avatars" dans Supabase

1. Aller dans le dashboard Supabase
2. Naviguer vers **Storage** (dans le menu de gauche)
3. Cliquer sur **"New bucket"**
4. Nom du bucket: `avatars`
5. Cocher **"Public bucket"** (pour permettre l'accès public aux images)
6. Cliquer sur **"Create bucket"**

### 2. Configurer les Politiques de Sécurité (RLS)

Dans le SQL Editor de Supabase, exécuter les commandes suivantes:

```sql
-- Permettre à tous les utilisateurs authentifiés d'uploader leur propre avatar
CREATE POLICY "Users can upload their avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Permettre à tous les utilisateurs authentifiés de mettre à jour leur avatar
CREATE POLICY "Users can update their avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Permettre à tous les utilisateurs authentifiés de supprimer leur avatar
CREATE POLICY "Users can delete their avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Permettre à tous (public) de voir les avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

**Note:** Les fichiers sont stockés directement dans le bucket (pas dans des dossiers), donc la politique ci-dessus utilise `(storage.foldername(name))[1]` pour extraire le nom de fichier. Si les fichiers sont stockés directement (comme `{user_id}.jpg`), vous pouvez simplifier:

```sql
-- Alternative: Si les fichiers sont stockés directement dans le bucket (sans dossiers)
CREATE POLICY "Users can upload their avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Users can delete their avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

### 3. Vérifier que la colonne avatar_url existe

La colonne `avatar_url` devrait déjà exister dans la table `profiles` (créée dans la migration `20251227192019_80a0799c-bc79-4782-a1ac-e7dbeefd82d0.sql`).

Si elle n'existe pas, l'ajouter:

```sql
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

## ✅ Test

1. Aller sur la page de profil
2. Cliquer sur la photo/initiales ou le bouton ✏️
3. Télécharger une photo
4. Vérifier que la photo s'affiche correctement
5. Tester la suppression de la photo

## 📝 Notes

- Les fichiers sont stockés avec le nom: `{user_id}.{extension}` (ex: `123e4567-e89b-12d3-a456-426614174000.jpg`)
- Taille maximale: 5MB
- Formats acceptés: JPG, PNG, WEBP
- Les initiales sont générées automatiquement si aucune photo n'est uploadée
- Le gradient des initiales est basé sur le nom de l'utilisateur (couleur constante)
