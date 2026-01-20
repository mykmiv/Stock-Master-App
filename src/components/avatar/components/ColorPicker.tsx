import React from 'react';
import { HAIR_COLORS } from '@/types/avatarConfig';

interface ColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
  colors: Array<{ value: string; label: string }>;
  title: string;
}

/**
 * Color Picker Component
 * Horizontal scrollable color swatches
 */
export function ColorPicker({
  selectedColor,
  onSelect,
  colors,
  title,
}: ColorPickerProps) {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 text-gray-900">{title}</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;

          return (
            <button
              key={color.value}
              onClick={() => onSelect(color.value)}
              className={`
                w-12 h-12 rounded-lg border-2 flex-shrink-0 transition-all
                ${isSelected
                  ? 'border-[#1CB0F6] scale-105 ring-2 ring-[#1CB0F6] ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              style={{ backgroundColor: color.value }}
              title={color.label}
              aria-label={color.label}
            />
          );
        })}
      </div>
    </div>
  );
}
