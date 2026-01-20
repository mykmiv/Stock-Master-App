# 🔧 Dépannage - Accès depuis le cell

## ✅ Checklist rapide

### 1. Serveur tourne-t-il ?
Dans le terminal où tu as lancé `npm run dev`, tu dois voir :
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: http://10.0.0.30:8080/
```

**Si tu ne vois pas ça** → Le serveur ne tourne pas. Lance `npm run dev`

### 2. Pare-feu configuré ?
Ouvre PowerShell **en tant qu'administrateur** et exécute :
```powershell
.\configure-firewall.ps1
```

Ou manuellement :
```powershell
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080
```

### 3. Même réseau Wi‑Fi ?
- PC et cell doivent être sur le **même réseau Wi‑Fi**
- Pas de données cellulaires sur le cell
- Vérifie l'IP : `ipconfig` doit montrer `10.0.0.30`

### 4. Test de connexion
Depuis ton cell, essaie :
- `http://10.0.0.30:8080`
- Si ça ne marche pas, essaie `http://10.0.0.30:8080/learn`

## 🚨 Problèmes courants

### Page blanche
1. Vide le cache du navigateur sur le cell
2. Redémarre le serveur (`Ctrl+C` puis `npm run dev`)
3. Essaie en navigation privée

### Connexion refusée
1. Vérifie que le serveur tourne
2. Vérifie le pare-feu (voir étape 2)
3. Vérifie que tu es sur le même Wi‑Fi

### Timeout
1. Vérifie que l'IP est bien `10.0.0.30` (`ipconfig`)
2. Désactive temporairement le pare-feu pour tester
3. Vérifie qu'aucun antivirus ne bloque

## 🔍 Vérifications avancées

### Vérifier que le port écoute
```powershell
netstat -ano | findstr :8080
```
Tu devrais voir quelque chose comme :
```
TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    12345
```

### Tester depuis le PC
Ouvre `http://10.0.0.30:8080` dans le navigateur du PC. Si ça marche sur le PC mais pas sur le cell, c'est un problème de réseau/pare-feu.

### Ping test
Depuis ton cell (si possible), essaie de ping `10.0.0.30`. Si le ping ne fonctionne pas, c'est un problème de réseau.

## 🆘 Solution d'urgence

Si rien ne fonctionne :

1. **Désactive temporairement le pare-feu** :
   - Paramètres → Pare-feu Windows → Désactiver temporairement
   - Teste depuis le cell
   - **Réactive-le après !**

2. **Utilise un hotspot** :
   - Crée un hotspot Wi‑Fi depuis ton PC
   - Connecte ton cell au hotspot
   - Utilise l'IP du hotspot (généralement `192.168.137.1`)

3. **Vérifie les logs** :
   - Regarde les erreurs dans le terminal où tourne `npm run dev`
   - Regarde la console du navigateur sur le cell (si possible)
