import React, { useMemo, useEffect, useState } from 'react';
import { LessonWithProgress } from '@/types/lesson.types';
import LearnButton from './LearnButton';

interface FineloLessonPathProps {
  lessons: LessonWithProgress[];
  onLessonClick: (lesson: LessonWithProgress) => void;
  chapterTitle?: string;
  globalIndexOffset?: number; // Index global pour calculer la position continue
}

// Constantes pour le path continu en S (style Duolingo)
const AMPLITUDE = 85;        // Largeur du S
const WAVELENGTH = 260;      // Longueur d'une vague (plus grand = plus smooth)
const SPACING = 110;         // Distance verticale ENTRE les cercles
const INITIAL_OFFSET = 120;  // Espacement en haut pour le premier chapitre (évite que le premier node touche le header)

export function FineloLessonPath({ 
  lessons, 
  onLessonClick, 
  chapterTitle,
  globalIndexOffset = 0 
}: FineloLessonPathProps) {
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById('s-curve-container');
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculer les positions des nodes avec index global continu
  const nodePositions = useMemo(() => {
    if (lessons.length === 0) return [];
    
    const centerX = containerWidth / 2;
    
    return lessons.map((lesson, localIndex) => {
      // Index global = offset du chapitre + index local dans le chapitre
      const globalIndex = globalIndexOffset + localIndex;
      
      // Position Y basée sur l'index global (espacement constant)
      // Ajouter l'offset initial seulement pour le premier chapitre (globalIndexOffset === 0)
      const baseY = globalIndex * SPACING;
      const y = globalIndexOffset === 0 && globalIndex === 0 
        ? baseY + INITIAL_OFFSET 
        : baseY + (globalIndexOffset === 0 ? INITIAL_OFFSET : 0);
      
      // Position X basée sur une sinusoïde continue (S fluide infini)
      const x = centerX + Math.sin(y / WAVELENGTH) * AMPLITUDE;
      
      return { x, y, globalIndex };
    });
  }, [lessons.length, containerWidth, globalIndexOffset]);

  // Calculer la hauteur totale nécessaire pour ce chapitre
  const chapterHeight = useMemo(() => {
    if (lessons.length === 0) return 0;
    const lastGlobalIndex = globalIndexOffset + lessons.length - 1;
    const baseHeight = lastGlobalIndex * SPACING + SPACING; // +SPACING pour le padding en bas
    // Ajouter l'offset initial pour le premier chapitre
    return globalIndexOffset === 0 ? baseHeight + INITIAL_OFFSET : baseHeight;
  }, [lessons.length, globalIndexOffset]);

  return (
    <div className="relative w-full py-8">
      {/* Container principal */}
      <div 
        id="s-curve-container"
        className="relative w-full mx-auto"
        style={{ 
          height: chapterHeight || 600,
          minHeight: chapterHeight || 600,
        }}
      >
        {/* Titre de chapitre positionné dans le parcours continu */}
        {chapterTitle && lessons.length > 0 && nodePositions[0] && (
          <div
            className="absolute z-5"
            style={{
              left: '50%',
              top: `${nodePositions[0].y - 80}px`, // Positionné 80px au-dessus du premier node
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '600px',
              pointerEvents: 'none',
            }}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
              <h3 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider px-3 sm:px-4 whitespace-nowrap flex-shrink-0">
                {chapterTitle.toUpperCase()}
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
            </div>
          </div>
        )}

        {/* Nodes positionnés sur la courbe S continue */}
        {lessons.map((lesson, index) => {
          const position = nodePositions[index];
          if (!position) return null;

          return (
            <div
              key={lesson.id}
              className="absolute"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)',
                animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
                zIndex: 40, // Au-dessus du header blanc (z-50) mais sous le rectangle vert (z-60)
              }}
            >
              <LearnButton
                state={
                  lesson.isLocked 
                    ? 'locked' 
                    : lesson.isCompleted 
                    ? 'completed' 
                    : lesson.isCurrent 
                    ? 'active' 
                    : 'active'
                }
                onPress={() => !lesson.isLocked && onLessonClick(lesson)}
              />
            </div>
          );
        })}
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 30px)) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
