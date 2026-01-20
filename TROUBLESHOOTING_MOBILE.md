# 🔧 Guide : Accès Mobile au Dev Server

## 📱 Problème : Le téléphone ne peut pas accéder à http://10.0.0.30:8080

## ✅ Solutions

### 1. Vérifier l'IP actuelle de votre PC

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -match "^10\."}
```

**IP actuelle détectée : `10.0.0.39`**

### 2. Options de correction

#### Option A : Utiliser l'IP actuelle (10.0.0.39)
👉 **Accéder depuis le téléphone : `http://10.0.0.39:8080`**

#### Option B : Configurer l'IP fixe 10.0.0.30
Si vous voulez absolument utiliser `10.0.0.30`, configurez une IP fixe :

1. **Ouvrir les paramètres réseau Windows**
   - Panneau de configuration → Réseau et Internet → Centre réseau et partage
   - Ou : Paramètres → Réseau et Internet → Wi-Fi → Propriétés de votre connexion

2. **Configurer l'IP statique**
   - IPv4 : `10.0.0.30`
   - Masque : `255.255.255.0`
   - Passerelle : `10.0.0.1` (généralement)

3. **Redémarrer le serveur Vite**
   ```powershell
   npm run dev
   ```

### 3. Configurer le pare-feu Windows

**Exécuter en tant qu'administrateur :**
```powershell
# Créer la règle pare-feu pour le port 8080
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080

# Vérifier la règle
netsh advfirewall firewall show rule name="Vite Dev Server"
```

**Ou utiliser le script :**
```powershell
.\configure-firewall.ps1
```

### 4. Vérifier que le serveur tourne

```powershell
# Vérifier si le port 8080 est ouvert
Get-NetTCPConnection -LocalPort 8080 -State Listen

# Vérifier les processus Node
Get-Process -Name node
```

### 5. Tester depuis le PC

Depuis un navigateur sur le PC :
```
http://localhost:8080
http://10.0.0.39:8080  (ou 10.0.0.30 si configuré)
```

### 6. Tester depuis le téléphone

Assurez-vous que le téléphone est sur le **même réseau Wi-Fi** que le PC.

**URLs à essayer :**
```
http://10.0.0.39:8080
http://10.0.0.30:8080  (si IP fixe configurée)
```

## 🔍 Diagnostic rapide

```powershell
# 1. IP actuelle
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -match "^10\."}

# 2. Port 8080 ouvert ?
Get-NetTCPConnection -LocalPort 8080 -State Listen

# 3. Pare-feu activé ?
netsh advfirewall firewall show rule name="Vite Dev Server"

# 4. Serveur démarré ?
Get-Process -Name node
```

## ⚠️ Notes importantes

- Le PC et le téléphone **DOIVENT** être sur le même réseau Wi-Fi
- L'IP dans `vite.config.ts` doit correspondre à l'IP réelle du PC
- Le pare-feu Windows doit autoriser le port 8080
- Le serveur Vite doit être démarré avec `host: "0.0.0.0"` (déjà configuré ✅)

## 🚀 Commandes rapides

```powershell
# Démarrer le serveur
npm run dev

# Voir l'IP actuelle
ipconfig | findstr IPv4

# Créer règle pare-feu (admin requis)
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080
```
