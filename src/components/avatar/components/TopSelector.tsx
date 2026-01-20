import React from 'react';
import { TOP_STYLES } from '@/types/avatarConfig';
import { AvatarPreview } from './AvatarPreview';

interface TopSelectorProps {
  selectedTopId: number;
  onSelect: (topId: number) => void;
  currentConfig: { baseId: number; hairId: number; hairColor: string; accessoryEnabled: boolean };
}

/**
 * Top/Shirt Selector Component
 * Grid display of available top styles
 */
export function TopSelector({
  selectedTopId,
  onSelect,
  currentConfig,
}: TopSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 text-gray-900">Haut</h3>
      <div className="grid grid-cols-3 gap-3">
        {TOP_STYLES.map((top) => {
          const previewConfig = {
            ...currentConfig,
            topId: top.id,
          };
          const isSelected = selectedTopId === top.id;

          return (
            <button
              key={top.id}
              onClick={() => onSelect(top.id)}
              className={`
                rounded-xl border-2 p-3 transition-all bg-white
                ${isSelected
                  ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              <AvatarPreview
                config={previewConfig}
                size={80}
                className="mx-auto"
              />
              <p className="text-xs font-medium text-gray-900 text-center mt-2">
                {top.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
