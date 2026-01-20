import React from 'react';

interface AccessoryRendererProps {
  size: number;
}

/**
 * Renders optional accessories (glasses, hat, etc.)
 * Positioned above hair but below top
 */
export function AccessoryRenderer({ size }: AccessoryRendererProps) {
  const centerX = 100;
  const centerY = 90;

  // Simple glasses as default accessory
  return (
    <g id="accessory-glasses">
      <circle
        cx={centerX - 25}
        cy={centerY - 15}
        r={18}
        fill="none"
        stroke="#1cb0f6"
        strokeWidth="4"
      />
      <circle
        cx={centerX + 25}
        cy={centerY - 15}
        r={18}
        fill="none"
        stroke="#1cb0f6"
        strokeWidth="4"
      />
      <line
        x1={centerX - 7}
        y1={centerY - 15}
        x2={centerX + 7}
        y2={centerY - 15}
        stroke="#1cb0f6"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
