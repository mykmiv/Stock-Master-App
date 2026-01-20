# 🔧 Configuration pour accéder depuis ton cell

## ✅ Configuration actuelle

- **IP de ton PC** : `10.0.0.30`
- **Port** : `8080`
- **URL sur ton cell** : `http://10.0.0.30:8080`

## 🚀 Démarrage du serveur

1. Ouvre un terminal PowerShell dans le dossier du projet
2. Lance : `npm run dev`
3. Tu devrais voir :
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:8080/
   ➜  Network: http://10.0.0.30:8080/
   ```

## 🔥 Configuration du pare-feu Windows

### Option 1 : Via PowerShell (Administrateur)

1. Ouvre PowerShell en tant qu'**administrateur** (clic droit → Exécuter en tant qu'administrateur)
2. Exécute cette commande :
   ```powershell
   netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080
   ```

### Option 2 : Via l'interface Windows

1. Ouvre **Paramètres Windows** → **Réseau et Internet** → **Pare-feu Windows**
2. Clique sur **Paramètres avancés**
3. Clique sur **Règles de trafic entrant** → **Nouvelle règle**
4. Sélectionne **Port** → **Suivant**
5. Sélectionne **TCP** et entre `8080` → **Suivant**
6. Sélectionne **Autoriser la connexion** → **Suivant**
7. Coche toutes les cases (Domaine, Privé, Public) → **Suivant**
8. Nomme la règle : `Vite Dev Server` → **Terminer**

## 📱 Test depuis ton cell

1. Assure-toi que ton PC et ton cell sont sur le **même réseau Wi‑Fi**
2. Sur ton cell, ouvre le navigateur
3. Va sur : `http://10.0.0.30:8080`
4. La page devrait se charger !

## ❌ Si ça ne marche toujours pas

### Vérifications :

1. **Même réseau Wi‑Fi** : PC et cell doivent être sur le même réseau
2. **Serveur tourne** : Vérifie que `npm run dev` affiche bien `Network: http://10.0.0.30:8080/`
3. **Pare-feu** : Vérifie que la règle est bien créée
4. **Ping test** : Depuis ton cell, essaie de ping `10.0.0.30` (si possible)

### Solution temporaire (test uniquement) :

Désactive temporairement le pare-feu Windows pour tester :
- **Paramètres** → **Pare-feu Windows** → **Désactiver temporairement**

⚠️ **Réactive-le après le test !**

## 🔄 Mise à jour du cache

Si la page est blanche ou affiche une ancienne version :

1. **Sur le cell** : Vider le cache du navigateur
   - Chrome Android : Paramètres → Confidentialité → Effacer les données de navigation → Cocher "Images et fichiers en cache"
2. **Redémarrer le serveur** : Arrête (`Ctrl+C`) et relance `npm run dev`

## 📝 Notes

- Le serveur doit tourner en continu pour que le cell puisse y accéder
- Si tu changes de réseau Wi‑Fi, l'IP peut changer (refais `ipconfig` pour vérifier)
- Le HMR (Hot Module Replacement) fonctionne aussi sur le réseau maintenant
