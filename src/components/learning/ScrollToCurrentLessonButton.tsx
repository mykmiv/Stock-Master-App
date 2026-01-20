import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { LessonWithProgress } from '@/types/lesson.types';
import { cn } from '@/lib/utils';
import { useCurrentChapterColor } from '@/hooks/useCurrentChapterColor';

interface ScrollToCurrentLessonButtonProps {
  lessons: LessonWithProgress[];
}

export function ScrollToCurrentLessonButton({ lessons }: ScrollToCurrentLessonButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const currentChapterColor = useCurrentChapterColor(); // Use shared hook
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trouver la leçon courante
  const currentLesson = lessons.find(lesson => lesson.isCurrent);
  const currentLessonIndex = lessons.findIndex(lesson => lesson.isCurrent);

  useEffect(() => {
    // Trouver l'élément de la leçon courante
    if (currentLessonIndex >= 0) {
      const lessonElement = document.querySelector(`[data-lesson-id="${currentLesson?.id}"]`);
      if (lessonElement) {
        currentLessonRef.current = lessonElement as HTMLDivElement;
      }
    }
  }, [currentLesson, currentLessonIndex, lessons]);

  useEffect(() => {
    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the visibility check
      scrollTimeoutRef.current = setTimeout(() => {

        if (currentLessonRef.current) {
          const rect = currentLessonRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Show button if current lesson is not visible in viewport
          const isCurrentLessonVisible = 
            rect.top >= 0 && 
            rect.top < windowHeight && 
            rect.bottom > 0 && 
            rect.bottom <= windowHeight;

          setIsVisible(!isCurrentLessonVisible);
        } else {
          // If we can't find the current lesson element, hide the button
          setIsVisible(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentLesson]);

  const scrollToCurrentLesson = () => {
    if (currentLessonRef.current) {
      currentLessonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      // Fallback: try to find the element again
      const lessonElement = document.querySelector(`[data-lesson-id="${currentLesson?.id}"]`);
      if (lessonElement) {
        lessonElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  if (!currentLesson || !isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToCurrentLesson}
      className={cn(
        "fixed bottom-44 sm:bottom-48 right-4 sm:right-6 z-50",
        "w-12 h-12 sm:w-14 sm:h-14",
        "text-white rounded-xl shadow-2xl",
        "flex items-center justify-center",
        "transition-all duration-300",
        "hover:scale-110 active:scale-95",
        "border-2 border-white/30 backdrop-blur-sm",
        currentChapterColor
      )}
      style={{
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15)',
      }}
      aria-label="Retour à la leçon courante"
    >
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
