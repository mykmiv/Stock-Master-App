import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '@/types/onboarding';
import { 
  onboardingQuestions, 
  onboardingFlowOrder, 
  getQuestionByIndex, 
  getFactScreenByIndex,
  getTotalQuestions,
  getCurrentQuestionNumber,
  challengeReassurances 
} from '@/data/onboardingQuestions';
import { OnboardingQuestionCard } from './OnboardingQuestionCard';
import { FactScreen } from './FactScreen';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

interface Props {
  onComplete: (data: OnboardingData) => void;
}

const initialData: OnboardingData = {
  whyTrading: '',
  riskTolerance: '',
  tradingStyle: '',
  screenTime: '',
  startingCapital: '',
  mainInterests: [],
  stockTypes: [],
  biggestChallenge: '',
  currentKnowledge: '',
  tradingExperience: [],
  sectors: [],
  toolsUsed: '',
  tradeTimeline: '',
  mainMotivation: '',
  notificationPrefs: [],
};

export function OnboardingFlow({ onComplete }: Props) {
  const [flowIndex, setFlowIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);

  const currentFlowItem = onboardingFlowOrder[flowIndex];
  const currentQuestion = currentFlowItem?.type === 'question' ? getQuestionByIndex(flowIndex) : undefined;
  const currentFactScreen = currentFlowItem?.type === 'fact' ? getFactScreenByIndex(flowIndex) : undefined;
  
  const questionNumber = getCurrentQuestionNumber(flowIndex);
  const totalQuestions = getTotalQuestions();
  const progress = (questionNumber / totalQuestions) * 100;

  const handleSelect = (value: string) => {
    if (!currentQuestion) return;
    
    if (currentQuestion.multiSelect) {
      const currentValues = (data[currentQuestion.id] as string[]) || [];
      const maxSelection = currentQuestion.maxSelection || Infinity;
      
      if (currentValues.includes(value)) {
        // Remove
        setData({ 
          ...data, 
          [currentQuestion.id]: currentValues.filter(v => v !== value) 
        });
      } else if (currentValues.length < maxSelection) {
        // Add
        setData({ 
          ...data, 
          [currentQuestion.id]: [...currentValues, value] 
        });
      }
    } else {
      setData({ ...data, [currentQuestion.id]: value });
    }
  };

  const isSelected = (value: string) => {
    if (!currentQuestion) return false;
    
    const currentValue = data[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return (currentValue as string[])?.includes(value) || false;
    }
    return currentValue === value;
  };

  const canContinue = () => {
    if (!currentQuestion) return true; // For fact screens
    
    const value = data[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return (value as string[])?.length > 0;
    }
    return !!value;
  };

  const handleNext = () => {
    if (flowIndex < onboardingFlowOrder.length - 1) {
      setFlowIndex(flowIndex + 1);
    } else {
      // Calculate preparation score
      const score = calculatePreparationScore(data);
      onComplete({ ...data, preparationScore: score });
    }
  };

  const handleBack = () => {
    if (flowIndex > 0) {
      setFlowIndex(flowIndex - 1);
    }
  };

  // If it's a fact screen, render that
  if (currentFactScreen) {
    return (
      <FactScreen 
        factScreen={currentFactScreen} 
        data={data} 
        onComplete={handleNext} 
      />
    );
  }

  // Otherwise render question
  if (!currentQuestion) return null;

  const showReassurance = currentQuestion.hasReassurance && data.biggestChallenge;
  const reassurance = showReassurance ? challengeReassurances[data.biggestChallenge] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 p-4">
      {/* Header */}
      <div className="w-full max-w-lg mx-auto pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <LineChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">StockMaster</span>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={flowIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Title */}
              <div className="text-center space-y-2">
                <h1 className="font-display text-2xl font-bold">{currentQuestion.title}</h1>
                {currentQuestion.subtitle && (
                  <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <OnboardingQuestionCard
                    key={option.value}
                    option={option}
                    selected={isSelected(option.value)}
                    onClick={() => handleSelect(option.value)}
                    multiSelect={currentQuestion.multiSelect}
                  />
                ))}
              </div>

              {/* Challenge Reassurance */}
              {reassurance && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6"
                >
                  <Alert className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200">
                    <Lightbulb className="h-5 w-5 text-emerald-600" />
                    <AlertTitle className="text-emerald-700 dark:text-emerald-300">
                      {reassurance.title}
                    </AlertTitle>
                    <AlertDescription>
                      {reassurance.description}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-lg mx-auto py-6">
        <div className="flex gap-3">
          {flowIndex > 0 && (
            <Button variant="outline" size="lg" onClick={handleBack} className="flex-shrink-0">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Button 
            size="lg" 
            className="flex-1 btn-primary"
            onClick={handleNext}
            disabled={!canContinue()}
          >
            {flowIndex === onboardingFlowOrder.length - 1 ? 'Terminer' : 'Continuer'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function calculatePreparationScore(data: OnboardingData): number {
  let score = 60;

  // Experience
  if (data.tradingExperience.includes('real_traded')) score += 15;
  else if (data.tradingExperience.includes('paper_traded')) score += 10;

  // Knowledge
  if (data.currentKnowledge === 'advanced') score += 10;
  else if (data.currentKnowledge === 'intermediate') score += 8;
  else if (data.currentKnowledge === 'basic') score += 5;

  // Timeline
  if (data.tradeTimeline === 'asap') score += 5;
  else if (data.tradeTimeline === '1_3_months') score += 8;

  // Motivation
  if (data.mainMotivation === 'master_skill') score += 5;

  return Math.min(score, 95);
}
