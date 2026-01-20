import { useState, useEffect, useRef } from 'react';

const CHAPTER_COLORS = [
  'bg-[#58CC02]',      // Vert vif Duolingo
  'bg-[#1CB0F6]',      // Bleu vif
  'bg-[#CE82FF]',      // Violet vif
  'bg-[#FF9600]',      // Orange vif
  'bg-[#FF4B4B]',      // Rouge/Rose vif
  'bg-[#00D9FF]',      // Cyan vif
  'bg-[#7C3AED]',      // Indigo vif
  'bg-[#F59E0B]',      // Ambre vif
];

export function useCurrentChapterColor() {
  const [currentChapterColor, setCurrentChapterColor] = useState<string>(CHAPTER_COLORS[0]);
  const chapterRefs = useRef<Map<number, HTMLElement>>(new Map());
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Store chapter references
    const timeoutId = setTimeout(() => {
      const chapters = document.querySelectorAll('[id^="chapter-"]');
      chapters.forEach(element => {
        const id = element.id.replace('chapter-', '');
        const chapterId = parseInt(id, 10);
        if (!isNaN(chapterId)) {
          chapterRefs.current.set(chapterId, element as HTMLElement);
        }
      });
    }, 100);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Same offset as ChapterBanner
      const chapters = Array.from(chapterRefs.current.keys()).sort((a, b) => a - b);

      // Find which chapter is currently in view - EXACT same logic as ChapterBanner
      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapterId = chapters[i];
        const element = chapterRefs.current.get(chapterId);
        
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            const colorIndex = (chapterId - 1) % CHAPTER_COLORS.length;
            setCurrentChapterColor(CHAPTER_COLORS[colorIndex]);
            return;
          }
        }
      }

      // If scrolled past all chapters, use last chapter color - same logic as ChapterBanner
      if (chapters.length > 0) {
        const lastChapterId = chapters[chapters.length - 1];
        const lastElement = chapterRefs.current.get(lastChapterId);
        if (lastElement && scrollPosition >= lastElement.offsetTop) {
          const colorIndex = (lastChapterId - 1) % CHAPTER_COLORS.length;
          setCurrentChapterColor(CHAPTER_COLORS[colorIndex]);
        }
      }
    };

    scrollHandlerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return currentChapterColor;
}
