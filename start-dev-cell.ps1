# Script pour démarrer le serveur de développement accessible depuis le cell
# Exécute en tant qu'administrateur pour configurer le pare-feu automatiquement

Write-Host "🚀 Configuration du serveur de développement pour accès cell..." -ForegroundColor Cyan

# Vérifier l'IP
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "10.0.0.*" -or $_.IPAddress -like "192.168.*"} | Select-Object -First 1).IPAddress
if (-not $ip) {
    $ip = "10.0.0.30"
    Write-Host "⚠️  IP non détectée, utilisation de l'IP par défaut: $ip" -ForegroundColor Yellow
} else {
    Write-Host "✅ IP détectée: $ip" -ForegroundColor Green
}

# Vérifier si on est admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-Host "🔧 Configuration du pare-feu..." -ForegroundColor Cyan
    
    # Vérifier si la règle existe déjà
    $existingRule = netsh advfirewall firewall show rule name="Vite Dev Server" 2>$null
    if ($existingRule) {
        Write-Host "✅ Règle pare-feu déjà existante" -ForegroundColor Green
    } else {
        # Créer la règle pare-feu
        netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080 | Out-Null
        Write-Host "✅ Règle pare-feu créée" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Pas de droits administrateur - Configure le pare-feu manuellement" -ForegroundColor Yellow
    Write-Host "   Commande à exécuter en admin: netsh advfirewall firewall add rule name=`"Vite Dev Server`" dir=in action=allow protocol=TCP localport=8080" -ForegroundColor Yellow
}

# Vérifier si le port est déjà utilisé
$portInUse = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️  Le port 8080 est déjà utilisé" -ForegroundColor Yellow
    Write-Host "   Arrêt des processus Node existants..." -ForegroundColor Yellow
    Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "📱 URL pour ton cell: http://$ip:8080" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Démarrage du serveur Vite..." -ForegroundColor Cyan
Write-Host "   Appuie sur Ctrl+C pour arrêter" -ForegroundColor Gray
Write-Host ""

# Démarrer le serveur
npm run dev
