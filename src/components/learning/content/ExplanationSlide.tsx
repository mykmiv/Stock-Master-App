import React from 'react';
import { ExplanationContent } from '@/types/lesson.types';
import { SpeechBubble } from '@/components/mascot/SpeechBubble';
import { CheckCircle2 } from 'lucide-react';

interface ExplanationSlideProps {
  content: ExplanationContent;
  onContinue: () => void;
}

export function ExplanationSlide({ content, onContinue }: ExplanationSlideProps) {
  return (
    <div className="space-y-6">
      {/* Speech Bubble */}
      <div className="flex justify-center">
        <SpeechBubble text={content.speechBubbleText} position="bottom" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        {content.title}
      </h2>

      {/* Visual Aid */}
      {content.visualAid && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {content.visualAid.type === 'image' && (
            <img 
              src={content.visualAid.src} 
              alt={content.title}
              className="w-full rounded-lg"
            />
          )}
          {content.visualAid.type === 'diagram' && (
            <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Diagramme: {content.visualAid.src}</p>
            </div>
          )}
        </div>
      )}

      {/* Key Points */}
      {content.keyPoints && content.keyPoints.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-6 space-y-3">
          <h3 className="font-bold text-lg text-indigo-900 mb-4">Points Clés</h3>
          {content.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
        >
          {content.continueButtonText || 'Continuer'}
        </button>
      </div>
    </div>
  );
}

