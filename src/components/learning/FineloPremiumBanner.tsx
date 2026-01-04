import React from 'react';
import { Zap, Crown } from 'lucide-react';

export function FineloPremiumBanner() {
  return (
    <div className="mx-6 mb-6 mt-8 relative overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-6 relative shadow-2xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="premium-stars" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="2" fill="white" opacity="0.6" />
              <circle cx="35" cy="25" r="1.5" fill="white" opacity="0.4" />
              <circle cx="20" cy="45" r="1" fill="white" opacity="0.5" />
              <circle cx="50" cy="15" r="1.5" fill="white" opacity="0.7" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#premium-stars)" />
          </svg>
        </div>

        {/* Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-30" />

        <div className="relative flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/30">
              <Zap className="w-9 h-9 text-yellow-300" fill="currentColor" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-white font-black text-xl mb-1 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-300" fill="currentColor" />
              Unlock Pro Trading Tools
            </h3>
            <p className="text-indigo-100 text-sm font-medium">
              Advanced charts, AI scanner & live trading simulator
            </p>
          </div>

          {/* CTA Button */}
          <button className="flex-shrink-0 bg-white text-indigo-600 px-6 py-3.5 rounded-xl font-bold shadow-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
            <span>Upgrade</span>
            <Zap className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-3 right-24 text-white/20 text-3xl animate-pulse">✦</div>
        <div className="absolute bottom-4 right-36 text-white/15 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>
        <div className="absolute top-1/2 right-12 text-white/10 text-xl animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      </div>
    </div>
  );
}
