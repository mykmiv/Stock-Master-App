import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function FineloLearningHeader() {
  const { profile } = useAuth();
  
  const streakDays = profile?.streak_days || 0;

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 py-6 relative overflow-hidden">
      {/* StockMaster Logo */}
      <div className="absolute top-6 left-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-2xl">S</span>
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="flex justify-end items-center gap-4 mb-8">
        {/* Daily Streak */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-lg text-gray-900">{streakDays}</span>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-4 relative z-10">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-purple-900 italic mb-2 leading-tight">
          Zero to Hero
          <br />
          Trading Path
        </h1>
        <button className="flex items-center gap-2 text-indigo-600 font-semibold text-base hover:text-indigo-700 transition-colors">
          View All Modules
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>


      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
