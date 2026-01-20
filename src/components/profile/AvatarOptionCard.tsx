import React from 'react';
import { AvatarGenerator, DiceBearAvatarConfig } from './AvatarGenerator';

interface AvatarOptionCardProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
  previewConfig: DiceBearAvatarConfig;
}

export function AvatarOptionCard({ 
  label, 
  value, 
  isSelected, 
  onClick,
  previewConfig 
}: AvatarOptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-3 rounded-xl border-2 transition-all active:scale-95
        ${isSelected 
          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-1'
        }
      `}
    >
      {/* Mini Avatar Preview */}
      <div className="w-full aspect-square mb-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-2">
        <div className="w-full h-full rounded-full overflow-hidden">
          <AvatarGenerator 
            config={previewConfig}
            size={80}
            className="rounded-full"
          />
        </div>
      </div>
      
      {/* Label */}
      <p className={`text-xs font-medium text-center leading-tight ${
        isSelected ? 'text-[#1CB0F6] font-semibold' : 'text-gray-700'
      }`}>
        {label}
      </p>
      
      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-[#1CB0F6] rounded-full flex items-center justify-center shadow-md animate-scale-in">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

