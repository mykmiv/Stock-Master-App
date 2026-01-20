import React from 'react';
import { HAIR_STYLES } from '@/types/avatarConfig';
import { AvatarPreview } from './AvatarPreview';
import { DEFAULT_AVATAR_CONFIG } from '@/types/avatarConfig';

interface HairSelectorProps {
  selectedHairId: number;
  hairColor: string;
  onSelect: (hairId: number) => void;
  currentConfig: { baseId: number; accessoryEnabled: boolean; topId: number };
}

/**
 * Hair Style Selector Component
 * Horizontal scrollable list of hair styles
 */
export function HairSelector({
  selectedHairId,
  hairColor,
  onSelect,
  currentConfig,
}: HairSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 text-gray-900">Style de cheveux</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {HAIR_STYLES.map((hair) => {
          const previewConfig = {
            ...currentConfig,
            hairId: hair.id,
            hairColor,
          };
          const isSelected = selectedHairId === hair.id;

          return (
            <button
              key={hair.id}
              onClick={() => onSelect(hair.id)}
              className={`
                rounded-xl border-2 p-3 transition-all bg-white flex-shrink-0
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
              <p className="text-xs font-medium text-gray-900 text-center mt-2 whitespace-nowrap">
                {hair.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
