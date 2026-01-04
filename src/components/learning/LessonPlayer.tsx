import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson, LessonContent } from '@/types/lesson.types';
import { StockyCharacter } from '@/components/mascot/StockyCharacter';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';
import { ExplanationSlide } from './content/ExplanationSlide';
import { MultipleChoiceSlide } from './content/MultipleChoiceSlide';
import { DragDropSlide } from './content/DragDropSlide';
import { TrueFalseSlide } from './content/TrueFalseSlide';
import { CompletionSlide } from './content/CompletionSlide';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export function LessonPlayer({ lesson, onComplete, onExit }: LessonPlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [scores, setScores] = useState<Record<number, number>>({});

  const content = lesson.content || [];
  const totalSlides = content.length;

  useEffect(() => {
    const newProgress = ((currentSlide + 1) / totalSlides) * 100;
    setProgress(newProgress);
  }, [currentSlide, totalSlides]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      calculateFinalScore();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswer = (slideIndex: number, answer: any, score?: number) => {
    setAnswers({ ...answers, [slideIndex]: answer });
    if (score !== undefined) {
      setScores({ ...scores, [slideIndex]: score });
    }
  };

  const calculateFinalScore = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore > 0 
      ? Math.round(totalScore / Object.keys(scores).length)
      : 100; // Default to 100 if no scored slides
    
    onComplete(averageScore);
  };

  const getCurrentEmotion = (): 'happy' | 'teaching' | 'celebrating' | 'thinking' | 'encouraging' | 'explaining' => {
    const currentContent = content[currentSlide];
    if (currentContent.type === 'completion') {
      return currentContent.stockyEmotion;
    }
    if (currentContent.type === 'explanation' || currentContent.type === 'intro') {
      return currentContent.stockyEmotion;
    }
    return 'teaching';
  };

  const renderContent = () => {
    const slide = content[currentSlide];
    if (!slide) return null;

    switch (slide.type) {
      case 'intro':
        return (
          <div className="text-center">
            <SpeechBubble text={slide.speechBubble} position="bottom" />
          </div>
        );

      case 'explanation':
        return (
          <ExplanationSlide
            content={slide}
            onContinue={handleNext}
          />
        );

      case 'multiple_choice':
        return (
          <MultipleChoiceSlide
            content={slide}
            onAnswer={(answer, isCorrect) => {
              handleAnswer(currentSlide, answer, isCorrect ? 100 : 0);
            }}
            onContinue={handleNext}
          />
        );

      case 'drag_drop':
        return (
          <DragDropSlide
            content={slide}
            onComplete={(isCorrect) => {
              handleAnswer(currentSlide, {}, isCorrect ? 100 : 0);
            }}
            onContinue={handleNext}
          />
        );

      case 'true_false':
        return (
          <TrueFalseSlide
            content={slide}
            onComplete={(score) => {
              handleAnswer(currentSlide, {}, score);
            }}
            onContinue={handleNext}
          />
        );

      case 'completion':
        return (
          <CompletionSlide
            content={slide}
            onContinue={() => {
              calculateFinalScore();
            }}
          />
        );

      default:
        return <div>Type de contenu non supporté</div>;
    }
  };

  const isLastSlide = currentSlide === totalSlides - 1;
  const canContinue = content[currentSlide]?.type === 'intro' || 
                     content[currentSlide]?.type === 'explanation' ||
                     answers[currentSlide] !== undefined ||
                     content[currentSlide]?.type === 'completion';

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header with Progress */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={onExit}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
            
            <div className="text-sm font-medium text-gray-600">
              {currentSlide + 1} / {totalSlides}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Stocky Character */}
          <AnimatePresence mode="wait">
            <motion.div
              key={getCurrentEmotion()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <StockyCharacter 
                emotion={getCurrentEmotion()}
                size="large"
                animate={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Content Renderer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-8"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="px-6 py-3 text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
            >
              Précédent
            </button>
            
            <motion.button
              onClick={handleNext}
              disabled={!canContinue && !isLastSlide}
              whileHover={canContinue || isLastSlide ? { scale: 1.05 } : {}}
              whileTap={canContinue || isLastSlide ? { scale: 0.95 } : {}}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastSlide ? 'Terminer la Leçon' : 'Continuer'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

