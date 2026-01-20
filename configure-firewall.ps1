# Script pour configurer le pare-feu Windows pour Vite
# DOIT être exécuté en tant qu'administrateur

Write-Host "🔧 Configuration du pare-feu Windows pour Vite Dev Server..." -ForegroundColor Cyan

# Vérifier si on est admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ ERREUR: Ce script doit être exécuté en tant qu'administrateur!" -ForegroundColor Red
    Write-Host "   Clic droit sur PowerShell → Exécuter en tant qu'administrateur" -ForegroundColor Yellow
    pause
    exit 1
}

# Vérifier si la règle existe déjà
$existingRule = netsh advfirewall firewall show rule name="Vite Dev Server" 2>$null
if ($existingRule -and $existingRule -notmatch "No rules match") {
    Write-Host "✅ Règle pare-feu déjà existante" -ForegroundColor Green
    netsh advfirewall firewall show rule name="Vite Dev Server"
} else {
    # Créer la règle pare-feu
    Write-Host "🔧 Création de la règle pare-feu..." -ForegroundColor Cyan
    $result = netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=8080 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Règle pare-feu créée avec succès!" -ForegroundColor Green
        netsh advfirewall firewall show rule name="Vite Dev Server"
    } else {
        Write-Host "❌ Erreur lors de la création de la règle:" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📱 Maintenant, démarre le serveur avec: npm run dev" -ForegroundColor Cyan
Write-Host "   Puis accède depuis ton cell: http://10.0.0.30:8080" -ForegroundColor Green
Write-Host ""
pause
