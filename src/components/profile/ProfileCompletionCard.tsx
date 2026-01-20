import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface ProfileCompletionCardProps {
  stepsRemaining: number;
  onComplete: () => void;
}

export function ProfileCompletionCard({ stepsRemaining, onComplete }: ProfileCompletionCardProps) {
  if (stepsRemaining === 0) return null;

  return (
    <div className="mx-4 mb-6 bg-[#E6F7FF] rounded-xl p-4 flex items-center gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">Finalise ton profil !</h3>
        <p className="text-sm text-gray-600 mb-3">
          {stepsRemaining} {stepsRemaining === 1 ? 'ÉTAPE RESTANTE' : 'ÉTAPES RESTANTES'}
        </p>
        <Button
          onClick={onComplete}
          className="bg-[#1CB0F6] hover:bg-[#0A9BD6] text-white font-semibold"
        >
          COMPLÈTE TON PROFIL
        </Button>
      </div>
      <div className="hidden sm:block">
        <div className="w-20 h-20 flex items-center justify-center">
          <TrendingUp className="w-16 h-16 text-[#1CB0F6] opacity-50" />
        </div>
      </div>
    </div>
  );
}

