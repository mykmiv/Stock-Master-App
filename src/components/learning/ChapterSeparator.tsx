import React from 'react';

interface ChapterSeparatorProps {
  nextChapterTitle: string;
}

export function ChapterSeparator({ nextChapterTitle }: ChapterSeparatorProps) {
  return (
    <div className="flex items-center justify-center my-20 px-6">
      {/* Left line */}
      <div className="flex-1 h-0.5 bg-gray-400 opacity-60" />
      
      {/* Chapter text */}
      <div className="px-8">
        <span className="text-base font-semibold text-gray-700 tracking-wide">
          {nextChapterTitle.toUpperCase()}
        </span>
      </div>
      
      {/* Right line */}
      <div className="flex-1 h-0.5 bg-gray-400 opacity-60" />
    </div>
  );
}
