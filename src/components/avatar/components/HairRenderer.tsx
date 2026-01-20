import React from 'react';

interface HairRendererProps {
  hairId: number;
  hairColor: string;
  size: number;
}

/**
 * Renders hair styles as layered SVG
 * Positioned above base face but below accessories
 */
export function HairRenderer({ hairId, hairColor, size }: HairRendererProps) {
  const centerX = 100;
  const centerY = 90;
  const headRadius = 70;

  const renderHair = () => {
    switch (hairId) {
      case 1: // Short
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY - 40}
              rx={headRadius * 0.85}
              ry={headRadius * 0.4}
              fill={hairColor}
            />
            {[0, 1, 2].map(i => (
              <ellipse
                key={i}
                cx={centerX - 30 + i * 30}
                cy={centerY - 35}
                rx={8}
                ry={6}
                fill={hairColor}
                opacity={0.7}
              />
            ))}
          </>
        );

      case 2: // Curly
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY - 40}
              rx={headRadius * 0.9}
              ry={headRadius * 0.45}
              fill={hairColor}
            />
            {[0, 1, 2, 3, 4].map(i => {
              const angle = (i / 5) * Math.PI * 2;
              const x = centerX + Math.cos(angle) * 25;
              const y = centerY - 40 + Math.sin(angle) * 15;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={10 + (i % 2) * 2}
                  fill={hairColor}
                />
              );
            })}
          </>
        );

      case 3: // Long
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY - 40}
              rx={headRadius * 0.85}
              ry={headRadius * 0.4}
              fill={hairColor}
            />
            <ellipse
              cx={centerX - 50}
              cy={centerY + 30}
              rx={15}
              ry={40}
              fill={hairColor}
            />
            <ellipse
              cx={centerX + 50}
              cy={centerY + 30}
              rx={15}
              ry={40}
              fill={hairColor}
            />
            <ellipse
              cx={centerX}
              cy={centerY + 40}
              rx={headRadius * 0.6}
              ry={headRadius * 0.3}
              fill={hairColor}
            />
          </>
        );

      case 4: // Bun
        return (
          <>
            <ellipse
              cx={centerX}
              cy={centerY - 40}
              rx={headRadius * 0.85}
              ry={headRadius * 0.4}
              fill={hairColor}
            />
            <circle
              cx={centerX}
              cy={centerY - 60}
              r={20}
              fill={hairColor}
            />
            <circle
              cx={centerX}
              cy={centerY - 60}
              r={18}
              fill={hairColor}
              opacity={0.8}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <g id={`hair-${hairId}`}>
      {renderHair()}
    </g>
  );
}
