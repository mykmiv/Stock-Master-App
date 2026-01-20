import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';

interface NoLivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextRegeneration?: Date | null;
}

export function NoLivesModal({ isOpen, onClose, nextRegeneration }: NoLivesModalProps) {
  const navigate = useNavigate();
  const { tier } = useSubscription();

  const getTimeUntilRegeneration = () => {
    if (!nextRegeneration) return null;
    const now = new Date();
    const diff = nextRegeneration.getTime() - now.getTime();
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
  };

  const timeUntil = getTimeUntilRegeneration();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            😢 Plus de vies!
          </DialogTitle>
          <DialogDescription className="text-center">
            Tu as utilisé toutes tes vies pour aujourd'hui.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Option 1: Attendre */}
          {timeUntil && (
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-900">Attendre pour régénérer</div>
                  <div className="text-sm text-blue-700">
                    Prochaine vie dans {timeUntil.hours}h {timeUntil.minutes}min
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={onClose}
              >
                Attendre
              </Button>
            </div>
          )}

          {/* Option 2: Upgrade to PRO */}
          <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg p-4 border-2 border-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-white" />
              <div>
                <div className="font-bold text-white text-lg">Passe à PRO</div>
                <div className="text-sm text-white/90">Vies illimitées ∞</div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white text-sm">
                <Heart className="w-4 h-4" />
                <span>Vies illimitées</span>
              </div>
              <div className="flex items-center gap-2 text-white text-sm">
                <span>🤖</span>
                <span>IA illimitée</span>
              </div>
            </div>
            <Button
              className="w-full bg-white text-blue-600 hover:bg-gray-50 font-bold"
              onClick={() => {
                navigate('/pricing');
                onClose();
              }}
            >
              Upgrade - $19.99/mois
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
