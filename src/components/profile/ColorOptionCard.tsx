import React from 'react';
import { AvatarGenerator, DiceBearAvatarConfig } from './AvatarGenerator';

interface ColorOptionCardProps {
  label: string;
  value: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  previewConfig: DiceBearAvatarConfig;
}

export function ColorOptionCard({ 
  label, 
  value, 
  color,
  isSelected, 
  onClick,
  previewConfig 
}: ColorOptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-2 rounded-xl border-2 transition-all active:scale-95
        ${isSelected 
          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-1'
        }
      `}
    >
      {/* Color Swatch */}
      <div className="flex items-center gap-2 mb-2">
        <div 
          className={`w-8 h-8 rounded-full border-2 shadow-sm transition-all ${
            isSelected ? 'border-[#1CB0F6] scale-110' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
        />
        <span className={`text-xs font-medium flex-1 text-left truncate ${
          isSelected ? 'text-[#1CB0F6] font-semibold' : 'text-gray-700'
        }`}>
          {label}
        </span>
      </div>
      
      {/* Mini Avatar with this color */}
      <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden p-1">
        <div className="w-full h-full rounded-full overflow-hidden">
          <AvatarGenerator 
            config={previewConfig}
            size={60}
            className="rounded-full"
          />
        </div>
      </div>
      
      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-5 h-5 bg-[#1CB0F6] rounded-full flex items-center justify-center shadow-md animate-scale-in">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

