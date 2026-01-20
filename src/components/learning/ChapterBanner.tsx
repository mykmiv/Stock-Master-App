import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useLives } from '@/hooks/useLives';
import { Heart, ChevronDown } from 'lucide-react';
import { LearningPathType } from '@/lib/learningPathLogic';
import { learningPaths, getPathConfig } from '@/config/learningPaths';

interface Chapter {
  id: number;
  number: number;
  title: string;
  color: string;
  totalLessons?: number;
  completedLessons?: number;
}

interface ChapterBannerProps {
  chapters: Chapter[];
  onBookClick: (chapter: Chapter) => void;
  pathName?: string;
  pathLevel?: string; // "Débutant", "Intermédiaire", "Avancé"
  currentPath?: LearningPathType;
  onPathChange?: (newPath: LearningPathType) => void;
}

// Couleurs pour chaque chapitre (couleurs vives style Duolingo)
const CHAPTER_COLORS = [
  'bg-[#58CC02]',      // Vert vif Duolingo pour chapitre 1
  'bg-[#1CB0F6]',      // Bleu vif pour chapitre 2
  'bg-[#CE82FF]',      // Violet vif pour chapitre 3
  'bg-[#FF9600]',      // Orange vif pour chapitre 4
  'bg-[#FF4B4B]',      // Rouge/Rose vif pour chapitre 5
  'bg-[#00D9FF]',      // Cyan vif pour chapitre 6
  'bg-[#7C3AED]',      // Indigo vif pour chapitre 7
  'bg-[#F59E0B]',      // Ambre vif pour chapitre 8
];

export function ChapterBanner({ 
  chapters, 
  onBookClick, 
  pathName = 'Zero to Hero', 
  pathLevel,
  currentPath = 'zero_to_hero',
  onPathChange
}: ChapterBannerProps) {
  const { profile } = useAuth();
  const { currentLives } = useLives();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState<Chapter>(chapters[0] || { id: 1, number: 1, title: '', color: CHAPTER_COLORS[0] });
  const chapterRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Stats du joueur
  const streakDays = profile?.streak_days || 0;
  const gems = profile?.coins || 500; // XP/Gems
  const hearts = currentLives; // Vies depuis le hook

  // Configuration du parcours actuel
  const currentPathConfig = getPathConfig(currentPath);

  // Naviguer vers la page de sélection de parcours
  const handlePathSelectorClick = () => {
    navigate('/learn/select-path');
  };

  useEffect(() => {
    // Store references to chapter sections for scroll detection
    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      chapters.forEach(chapter => {
        const element = document.getElementById(`chapter-${chapter.id}`);
        if (element) {
          chapterRefs.current.set(chapter.id, element);
        }
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [chapters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset pour détecter avant d'arriver au chapitre

      // Find which chapter is currently in view
      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapter = chapters[i];
        const element = chapterRefs.current.get(chapter.id);
        
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentChapter(chapter);
            break;
          }
        }
      }

      // If scrolled past all chapters, show the last one
      if (chapters.length > 0) {
        const lastChapter = chapters[chapters.length - 1];
        const lastElement = chapterRefs.current.get(lastChapter.id);
        if (lastElement && scrollPosition >= lastElement.offsetTop) {
          setCurrentChapter(lastChapter);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chapters]);

  if (chapters.length === 0) return null;

  const currentColor = currentChapter.color || CHAPTER_COLORS[(currentChapter.number - 1) % CHAPTER_COLORS.length];

  return (
    <div 
      className="sticky top-0 z-50 pb-3 sm:pb-4 px-3 sm:px-4 pt-2 sm:pt-3"
      style={{
        background: 'linear-gradient(to bottom, white 0%, white 50%, transparent 50%, transparent 100%)'
      }}
    >
      {/* Top Bar: Une seule ligne - Logo + Nom du parcours + Stats - Optimisé pour mobile (iPhone 14) */}
      <div className="mx-auto max-w-4xl mb-2 sm:mb-3 px-2 sm:px-4 py-2 sm:py-4 bg-white rounded-xl relative" style={{ zIndex: 50 }}>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo + Nom du parcours - à gauche */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {/* Logo */}
            <span className="text-lg sm:text-2xl flex-shrink-0">📈</span>
            
            {/* Nom du parcours avec flèche */}
            <button
              onClick={handlePathSelectorClick}
              className="flex items-center gap-1.5 sm:gap-2 group hover:opacity-90 transition-opacity flex-1 min-w-0"
            >
              {/* Icon + Nom + Path */}
              <span className="text-lg sm:text-2xl flex-shrink-0">{currentPathConfig.icon}</span>
              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h2 className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {currentPathConfig.name} Path
                  </h2>
                  <ChevronDown 
                    className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 group-hover:text-blue-600"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Stats - à droite - optimisé pour mobile */}
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            {/* Streak */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className={`text-xl sm:text-3xl ${streakDays === 0 ? 'grayscale' : ''}`}>🔥</span>
              <span className="text-base sm:text-2xl font-bold text-gray-700">{streakDays}</span>
            </div>

            {/* Hearts/Lives */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-red-500 fill-red-500" />
              <span className="text-base sm:text-2xl font-bold text-red-500">
                {hearts === Infinity ? '∞' : hearts}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rectangle vert principal - masque les cercles qui passent derrière - optimisé pour mobile */}
      <div className="mx-auto max-w-4xl relative" style={{ zIndex: 60 }}>
        <div 
          className={cn(
            "rounded-lg sm:rounded-2xl transition-colors duration-300 ease-in-out relative p-2.5 sm:p-4",
            currentColor,
            "border-2 border-white/30"
          )}
          style={{
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
        <div className="flex items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-4 flex-1 min-w-0">
            <div className="text-white min-w-0 flex-1">
              {/* Chapitre seulement - simplifié */}
              <p className="text-[10px] sm:text-sm font-bold leading-tight mb-0.5 sm:mb-1.5 text-white/70">
                CHAPITRE {currentChapter.number}
              </p>
              <p className="text-sm sm:text-lg font-bold leading-tight text-white break-words">
                {currentChapter.title}
              </p>
            </div>
            
            {/* Tracker du nombre de leçons complétées */}
            {currentChapter.totalLessons !== undefined && (
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <span className="text-xs sm:text-base font-bold text-white/90">
                  {currentChapter.completedLessons || 0}/{currentChapter.totalLessons}
                </span>
              </div>
            )}
          </div>
          
          {/* Ligne verticale séparatrice */}
          <div className="h-8 sm:h-14 w-[1px] bg-white/25 mx-1.5 sm:mx-4 flex-shrink-0" />
          
          {/* Bouton Menu (3 lignes horizontales) */}
          <button
            onClick={() => onBookClick(currentChapter)}
            className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 flex-shrink-0 touch-manipulation"
            aria-label="Options du chapitre"
          >
            {/* Trois lignes horizontales (menu icon) */}
            <div className="w-3 sm:w-5 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-5 h-0.5 bg-white rounded-full" />
            <div className="w-3 sm:w-5 h-0.5 bg-white rounded-full" />
          </button>
        </div>
        </div>
      </div>

    </div>
  );
}
