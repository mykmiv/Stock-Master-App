import React from 'react';

export function EnhancedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
      
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute top-0 -left-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      <div 
        className="absolute top-1/3 -right-40 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-pulse" 
        style={{ animationDuration: '10s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse" 
        style={{ animationDuration: '12s', animationDelay: '4s' }} 
      />
      
      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {/* Dot Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="dots-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
      </svg>
      
      {/* Floating Stock Symbols (Subtle) */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-4xl font-bold text-indigo-600 animate-float">$</div>
        <div 
          className="absolute top-40 right-20 text-3xl font-bold text-purple-600 animate-float" 
          style={{ animationDelay: '2s' }}
        >
          📈
        </div>
        <div 
          className="absolute bottom-40 left-1/4 text-3xl font-bold text-pink-600 animate-float" 
          style={{ animationDelay: '4s' }}
        >
          💹
        </div>
        <div 
          className="absolute top-1/2 right-1/4 text-2xl font-bold text-indigo-600 animate-float" 
          style={{ animationDelay: '6s' }}
        >
          📊
        </div>
      </div>
    </div>
  );
}

