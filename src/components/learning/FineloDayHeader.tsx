import React from 'react';

interface FineloDayHeaderProps {
  dayNumber: number;
}

export function FineloDayHeader({ dayNumber }: FineloDayHeaderProps) {
  return (
    <div className="px-6 py-4 flex items-center gap-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Day</p>
        <h2 className="text-5xl font-black text-indigo-900">
          {String(dayNumber).padStart(2, '0')}
        </h2>
      </div>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

