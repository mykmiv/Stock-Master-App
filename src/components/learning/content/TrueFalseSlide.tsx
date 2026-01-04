import React, { useState } from 'react';
import { TrueFalseContent } from '@/types/lesson.types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueFalseSlideProps {
  content: TrueFalseContent;
  onComplete: (score: number) => void;
  onContinue: () => void;
}

export function TrueFalseSlide({ content, onComplete, onContinue }: TrueFalseSlideProps) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (statementId: string, answer: boolean) => {
    setAnswers({ ...answers, [statementId]: answer });
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    
    let correct = 0;
    content.statements.forEach(statement => {
      const userAnswer = answers[statement.id];
      if (userAnswer === statement.isTrue) {
        correct++;
      }
    });

    const score = Math.round((correct / content.statements.length) * 100);
    onComplete(score);
  };

  const allAnswered = content.statements.every(s => answers[s.id] !== null && answers[s.id] !== undefined);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Indiquez si chaque affirmation est vraie ou fausse
      </h2>

      <div className="space-y-4">
        {content.statements.map((statement) => {
          const userAnswer = answers[statement.id];
          const isCorrect = userAnswer === statement.isTrue;
          const showResult = showFeedback;

          return (
            <div
              key={statement.id}
              className={`
                p-4 rounded-xl border-2
                ${showResult 
                  ? isCorrect 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-red-50 border-red-300'
                  : 'bg-white border-gray-200'
                }
                transition-all
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium text-gray-900 flex-1">{statement.text}</p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => !showResult && handleAnswer(statement.id, true)}
                    disabled={showResult}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${userAnswer === true 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      disabled:opacity-50
                    `}
                  >
                    Vrai
                  </button>
                  <button
                    onClick={() => !showResult && handleAnswer(statement.id, false)}
                    disabled={showResult}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${userAnswer === false 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      disabled:opacity-50
                    `}
                  >
                    Faux
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200"
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-700">{statement.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {!showFeedback && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vérifier les réponses
          </button>
        </div>
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

