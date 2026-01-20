import React from 'react';

interface UpgradeSectionProps {
  onUpgrade: () => void;
  currentTier?: 'free' | 'pro' | 'elite';
}

export function UpgradeSection({ onUpgrade, currentTier = 'free' }: UpgradeSectionProps) {
  // Si l'utilisateur a déjà PRO, ne rien afficher
  if (currentTier === 'pro' || currentTier === 'elite') {
    return null;
  }

  // Si l'utilisateur est Free, afficher "Passe au Pro"
  return (
    <div className="bg-gradient-to-br from-blue-500 via-green-500 to-emerald-500 rounded-2xl p-3.5 mb-4 shadow-xl border-2 border-white/20 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-white/5 animate-pulse" />
      
      {/* Badge */}
      <div className="absolute top-2.5 right-2.5 z-20">
        <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-1 rounded-full shadow-lg">
          🔥 POPULAR
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon + Title */}
        <div className="text-center mb-2.5">
          <div className="text-3xl mb-1.5">👑</div>
          <h2 className="text-xl font-black text-white mb-1">
            Passe au Pro
          </h2>
            <p className="text-white/90 text-xs font-semibold">
              Accès illimité, zéro restriction
            </p>
        </div>

        {/* Features Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <div className="text-xl mb-1">♾️</div>
              <div className="text-white text-xs font-bold">Tout illimité</div>
              <div className="text-white/70 text-[10px]">Leçons, Trading, IA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <div className="text-xl mb-1">📚</div>
              <div className="text-white text-xs font-bold">13 modules</div>
              <div className="text-white/70 text-[10px]">156 leçons complètes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <div className="text-xl mb-1">🤖</div>
              <div className="text-white text-xs font-bold">IA illimitée</div>
              <div className="text-white/70 text-[10px]">Scanner & Coach</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
              <div className="text-xl mb-1">📧</div>
              <div className="text-white text-xs font-bold">Support Email</div>
              <div className="text-white/70 text-[10px]">Réponse 48h</div>
            </div>
          </div>

        {/* Price */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-2.5 mb-3 border-2 border-white/30">
          <div className="text-center">
            <div className="text-white/80 text-xs font-semibold mb-1">À partir de</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-white text-2xl font-black">19.99$</span>
                <span className="text-white/80 text-base font-bold">/mois</span>
              </div>
              <div className="text-white/70 text-xs mt-1">
                ✨ Annule quand tu veux
              </div>
          </div>
        </div>

          {/* CTA Button */}
          <button
            onClick={onUpgrade}
            className="w-full bg-white hover:bg-gray-50 text-blue-600 py-2.5 rounded-xl font-black text-sm shadow-xl transition-all active:scale-95 hover:shadow-lg"
          >
            🚀 Débloquer Pro Maintenant
          </button>

          {/* Social Proof */}
          <div className="text-center mt-2.5 text-white/80 text-xs">
            <span className="font-bold">2,847 traders</span> utilisent déjà PRO
          </div>
      </div>
    </div>
  );
}
