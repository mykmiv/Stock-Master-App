# 🚀 DÉMARRAGE DU SERVEUR - INSTRUCTIONS

## ⚠️ IMPORTANT : Le serveur doit être démarré manuellement !

### Étape 1 : Ouvrir un terminal
1. Ouvre PowerShell ou CMD dans le dossier du projet
2. Ou utilise le terminal intégré de Cursor

### Étape 2 : Démarrer le serveur
```powershell
npm run dev
```

### Étape 3 : Vérifier que ça fonctionne
Tu dois voir dans le terminal :
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: http://10.0.0.30:8080/
```

**Si tu vois `Network: http://10.0.0.30:8080/` → C'est bon !**

### Étape 4 : Configurer le pare-feu (UNE SEULE FOIS)
Ouvre PowerShell **en tant qu'administrateur** et exécute :
```powershell
cd "c:\Users\mykae\OneDrive\Documentos\App learnin trading"
.\configure-firewall.ps1
```

Ou manuellement :
```powershell
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080
```

### Étape 5 : Tester sur ton cell
1. Assure-toi que ton PC et ton cell sont sur le **même Wi‑Fi**
2. Sur ton cell, ouvre : `http://10.0.0.30:8080`
3. La page devrait se charger !

## 🔄 Si ça ne marche pas

1. **Vérifie que le serveur tourne** : Regarde le terminal
2. **Vérifie le pare-feu** : Voir étape 4
3. **Vérifie le réseau** : PC et cell sur le même Wi‑Fi
4. **Vide le cache** : Sur le cell, vide le cache du navigateur

## 📝 Notes

- Le serveur doit tourner **en continu** pour que le cell puisse y accéder
- Ne ferme **pas** le terminal où tourne `npm run dev`
- Pour arrêter le serveur : `Ctrl+C` dans le terminal
