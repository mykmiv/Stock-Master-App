import React from 'react';

interface FineloModuleHeaderProps {
  moduleNumber: number;
  moduleTitle?: string;
}

export function FineloModuleHeader({ moduleNumber, moduleTitle }: FineloModuleHeaderProps) {
  return (
    <div className="px-6 py-5 flex items-center gap-4">
      <div className="flex-shrink-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Module</p>
        <h2 className="text-5xl font-black text-indigo-900 leading-none">
          {String(moduleNumber).padStart(2, '0')}
        </h2>
        {moduleTitle && (
          <p className="text-sm font-medium text-gray-700 mt-1">{moduleTitle}</p>
        )}
      </div>
      <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-200 to-transparent" />
    </div>
  );
}

