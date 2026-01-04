import React, { useState } from 'react';
import { DragDropContent } from '@/types/lesson.types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DragDropSlideProps {
  content: DragDropContent;
  onComplete: (isCorrect: boolean) => void;
  onContinue: () => void;
}

export function DragDropSlide({ content, onComplete, onContinue }: DragDropSlideProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem) return;

    const item = content.items.find(i => i.id === draggedItem);
    if (item && item.correctMatchId === targetId) {
      setMatches({ ...matches, [draggedItem]: targetId });
      setDraggedItem(null);
      
      // Check if all matches are correct
      const allMatched = content.items.every(i => 
        matches[i.id] === i.correctMatchId || (i.id === draggedItem && targetId === i.correctMatchId)
      );
      
      if (allMatched && Object.keys(matches).length + 1 === content.items.length) {
        setShowFeedback(true);
        onComplete(true);
      }
    } else {
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const isItemMatched = (itemId: string) => matches[itemId] !== undefined;
  const isTargetFilled = (targetId: string) => Object.values(matches).includes(targetId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {content.instruction}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items to Drag */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 mb-3">Glissez vers la cible:</h3>
          {content.items.map((item) => {
            const matched = isItemMatched(item.id);
            return (
              <motion.div
                key={item.id}
                draggable={!matched}
                onDragStart={() => handleDragStart(item.id)}
                className={`
                  p-4 rounded-xl border-2 cursor-move
                  ${matched 
                    ? 'bg-green-100 border-green-400 opacity-50' 
                    : 'bg-white border-indigo-300 hover:border-indigo-500 hover:shadow-md'
                  }
                  transition-all
                `}
                whileHover={!matched ? { scale: 1.02 } : {}}
                whileDrag={{ scale: 1.1, opacity: 0.8 }}
              >
                <p className="font-medium text-gray-900">{item.content}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Drop Targets */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 mb-3">Cibles:</h3>
          {content.targets.map((target) => {
            const filled = isTargetFilled(target.id);
            const matchedItem = content.items.find(i => matches[i.id] === target.id);
            
            return (
              <div
                key={target.id}
                onDrop={() => handleDrop(target.id)}
                onDragOver={handleDragOver}
                className={`
                  p-4 rounded-xl border-2 border-dashed min-h-[60px] flex items-center justify-center
                  ${filled 
                    ? 'bg-green-100 border-green-400' 
                    : 'bg-gray-50 border-gray-300 hover:border-indigo-400'
                  }
                  transition-all
                `}
              >
                {matchedItem ? (
                  <p className="font-medium text-gray-900">{matchedItem.content}</p>
                ) : (
                  <p className="text-gray-500">{target.label}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border-2 border-green-200 p-4 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="font-medium text-green-900">Parfait! Toutes les correspondances sont correctes!</p>
          </div>
        </motion.div>
      )}

      {showFeedback && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}

