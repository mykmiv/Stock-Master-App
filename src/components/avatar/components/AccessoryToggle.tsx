import React from 'react';
import { AvatarPreview } from './AvatarPreview';

interface AccessoryToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  currentConfig: { baseId: number; hairId: number; hairColor: string; topId: number };
}

/**
 * Accessory Toggle Component
 * Simple on/off toggle for optional accessories
 */
export function AccessoryToggle({
  enabled,
  onToggle,
  currentConfig,
}: AccessoryToggleProps) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 text-gray-900">Accessoire</h3>
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(false)}
          className={`
            flex-1 rounded-xl border-2 p-4 transition-all bg-white
            ${!enabled
              ? 'border-[#1CB0F6] bg-blue-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <AvatarPreview
            config={{ ...currentConfig, accessoryEnabled: false }}
            size={80}
            className="mx-auto"
          />
          <p className="text-xs font-medium text-gray-900 text-center mt-2">
            Sans
          </p>
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`
            flex-1 rounded-xl border-2 p-4 transition-all bg-white
            ${enabled
              ? 'border-[#1CB0F6] bg-blue-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <AvatarPreview
            config={{ ...currentConfig, accessoryEnabled: true }}
            size={80}
            className="mx-auto"
          />
          <p className="text-xs font-medium text-gray-900 text-center mt-2">
            Avec
          </p>
        </button>
      </div>
    </div>
  );
}
