import React, { useState } from 'react';
import { MultipleChoiceContent } from '@/types/lesson.types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MultipleChoiceSlideProps {
  content: MultipleChoiceContent;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  onContinue: () => void;
}

export function MultipleChoiceSlide({ content, onAnswer, onContinue }: MultipleChoiceSlideProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (showFeedback) return; // Prevent changing answer after feedback
    
    setSelectedOption(optionId);
    const option = content.options.find(opt => opt.id === optionId);
    const correct = option?.isCorrect || false;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(optionId, correct);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {content.question}
      </h2>

      <div className="space-y-3">
        {content.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = showFeedback && option.isCorrect;
          const showIncorrect = showFeedback && isSelected && !option.isCorrect;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showFeedback}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all
                ${isSelected 
                  ? showCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                }
                ${showFeedback && !isSelected && option.isCorrect 
                  ? 'border-green-500 bg-green-50' 
                  : ''
                }
                disabled:opacity-75 disabled:cursor-not-allowed
              `}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{option.text}</span>
                <AnimatePresence>
                  {showCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </motion.div>
                  )}
                  {showIncorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                    >
                      <XCircle className="w-6 h-6 text-red-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              p-4 rounded-xl
              ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}
            `}
          >
            <p className="font-medium mb-2">
              {isCorrect ? content.correctFeedback : content.incorrectFeedback}
            </p>
            <p className="text-sm text-gray-700">{content.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

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

