import React from 'react';
import { BASE_AVATARS } from '@/types/avatarConfig';
import { AvatarPreview } from './AvatarPreview';
import { DEFAULT_AVATAR_CONFIG } from '@/types/avatarConfig';

interface BaseAvatarSelectorProps {
  selectedBaseId: number;
  onSelect: (baseId: number) => void;
  currentConfig: { hairId: number; hairColor: string; accessoryEnabled: boolean; topId: number };
}

/**
 * Base Avatar Selector Component
 * Grid display of all available base avatars
 */
export function BaseAvatarSelector({
  selectedBaseId,
  onSelect,
  currentConfig,
}: BaseAvatarSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 text-gray-900">Avatar de base</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {BASE_AVATARS.map((base) => {
          const previewConfig = {
            baseId: base.id,
            ...currentConfig,
          };
          const isSelected = selectedBaseId === base.id;

          return (
            <button
              key={base.id}
              onClick={() => onSelect(base.id)}
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
                {base.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
