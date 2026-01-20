# ⚡ SOLUTION RAPIDE - Accès depuis le cell

## ✅ Le serveur tourne maintenant !

Le serveur écoute bien sur `0.0.0.0:8080` ✅

## 🔥 PROBLÈME : Le pare-feu bloque

### Solution immédiate (2 minutes) :

1. **Ouvre PowerShell en tant qu'administrateur** :
   - Clic droit sur PowerShell → "Exécuter en tant qu'administrateur"

2. **Exécute cette commande** :
   ```powershell
   netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080
   ```

3. **Teste sur ton cell** :
   - Ouvre `http://10.0.0.30:8080` sur ton cell
   - Ça devrait marcher maintenant !

## ✅ Vérifications

- ✅ Serveur tourne : `0.0.0.0:8080` en LISTENING
- ✅ IP correcte : `10.0.0.30`
- ⚠️  Pare-feu : À configurer (voir ci-dessus)

## 🆘 Si ça ne marche toujours pas

1. **Désactive temporairement le pare-feu** (pour tester) :
   - Paramètres → Pare-feu Windows → Désactiver temporairement
   - Teste depuis le cell
   - **Réactive-le après !**

2. **Vérifie le réseau** :
   - PC et cell sur le même Wi‑Fi ?
   - Pas de données cellulaires sur le cell

3. **Vide le cache du navigateur** sur le cell

## 📱 URL finale

Sur ton cell : **`http://10.0.0.30:8080`**
