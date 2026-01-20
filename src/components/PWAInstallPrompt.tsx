import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show manual install option after 5 seconds if no prompt appears
    const timer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        setShowManual(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show manual installation instructions
      alert('Pour installer l\'app:\n\nChrome: Menu (⋮) → Installer l\'application\nSafari: Bouton partage → Sur l\'écran d\'accueil');
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Install prompt error:', error);
      // Fallback to manual instructions
      alert('Pour installer l\'app:\n\nChrome: Menu (⋮) → Installer l\'application\nSafari: Bouton partage → Sur l\'écran d\'accueil');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  const handleShowManualInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isAndroid = /Android/.test(navigator.userAgent);

    let instructions = '';
    
    if (isIOS) {
      instructions = '📱 Sur iPhone/iPad:\n\n1. Appuyez sur le bouton de partage (□↑)\n2. Faites défiler et appuyez sur "Sur l\'écran d\'accueil"\n3. Appuyez sur "Ajouter"';
    } else if (isAndroid && isChrome) {
      instructions = '📱 Sur Android Chrome:\n\n1. Appuyez sur le menu (⋮) en haut à droite\n2. Appuyez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"\n3. Confirmez l\'installation';
    } else if (isChrome) {
      instructions = '💻 Sur Chrome Desktop:\n\n1. Cliquez sur l\'icône d\'installation (⊕) dans la barre d\'adresse\n2. Ou allez dans Menu (⋮) → "Installer StockMaster..."';
    } else {
      instructions = '📱 Pour installer:\n\nChrome: Menu (⋮) → Installer l\'application\nSafari: Bouton partage → Sur l\'écran d\'accueil\nFirefox: Menu → Installer';
    }

    alert(instructions);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Show manual install button if no prompt available
  if (showManual && !deferredPrompt) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-indigo-500 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Installer l'application
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Installez StockMaster pour une expérience optimale !
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleShowManualInstructions}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  size="sm"
                >
                  Voir les instructions
                </Button>
                <Button
                  onClick={() => setShowManual(false)}
                  variant="ghost"
                  size="sm"
                  className="px-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show automatic prompt if available
  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  if (sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-indigo-500 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Installer l'application
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Installez StockMaster pour une expérience optimale, sans barre du navigateur !
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleInstallClick}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                size="sm"
              >
                Installer
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="px-3"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
