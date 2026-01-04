import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Star,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LessonViewerProps {
  title: string;
  content: string;
  xpReward: number;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  quizQuestions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function LessonViewer({
  title, content, xpReward, duration, level, quizQuestions, onComplete, onBack,
}: LessonViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [finalScore, setFinalScore] = useState(0);

  const hasQuiz = quizQuestions.length > 0;
  const totalSteps = hasQuiz ? 1 + quizQuestions.length : 1;
  const isContentStep = currentStep === 0;
  const quizIndex = currentStep - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getLevelBadgeClass = () => {
    switch (level) {
      case 'beginner': return 'bg-primary/20 text-primary';
      case 'intermediate': return 'bg-secondary/20 text-secondary';
      case 'advanced': return 'bg-purple-500/20 text-purple-600';
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    else calculateResults();
  };

  const handleMarkComplete = () => {
    setFinalScore(100);
    setShowResults(true);
    onComplete(100);
  };

  const handleSubmitAnswer = () => {
    const newSubmitted = [...submitted];
    newSubmitted[quizIndex] = true;
    setSubmitted(newSubmitted);
  };

  const calculateResults = () => {
    if (!hasQuiz) { handleMarkComplete(); return; }
    let correct = 0;
    quizQuestions.forEach((q, i) => { if (quizAnswers[i] === q.correctAnswer) correct++; });
    const score = Math.round((correct / quizQuestions.length) * 100);
    setFinalScore(score);
    setShowResults(true);
    onComplete(score);
  };

  const currentQuestion = quizQuestions[quizIndex];
  const isAnswered = quizAnswers[quizIndex] !== null;
  const isSubmitted = submitted[quizIndex];
  const isCorrect = isSubmitted && quizAnswers[quizIndex] === currentQuestion?.correctAnswer;

  // Animated Success Modal
  if (showResults) {
    let correct = 0;
    quizQuestions.forEach((q, i) => { if (quizAnswers[i] === q.correctAnswer) correct++; });
    const passed = finalScore >= 70;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-card rounded-3xl p-8 md:p-12 text-center max-w-md w-full shadow-2xl"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: passed ? 360 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
              passed ? "bg-primary/20" : "bg-warning/20"
            )}
          >
            {passed ? (
              <Trophy className="h-12 w-12 text-primary" />
            ) : (
              <Target className="h-12 w-12 text-warning" />
            )}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black mb-3"
          >
            {passed ? 'Lesson Complete!' : 'Keep Practicing!'}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-6"
          >
            {hasQuiz ? (
              <>You scored <span className="font-black text-foreground">{finalScore}%</span> ({correct}/{quizQuestions.length})</>
            ) : 'You completed this lesson!'}
          </motion.p>
          
          {passed && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-warning/20">
                <Star className="h-6 w-6 text-warning fill-warning" />
                <span className="text-xl font-black text-warning">+{xpReward} XP</span>
              </div>
            </motion.div>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button onClick={onBack} size="lg" className="btn-primary">
              Back to Lessons
            </Button>
            {!passed && hasQuiz && (
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-xl font-bold"
                onClick={() => {
                  setCurrentStep(0);
                  setQuizAnswers(new Array(quizQuestions.length).fill(null));
                  setSubmitted(new Array(quizQuestions.length).fill(false));
                  setShowResults(false);
                }}
              >
                Try Again
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-4"
    >
      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden border-2 border-primary/20">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary to-emerald-500"
          />
        </div>
        <span className="text-sm font-bold text-muted-foreground">{currentStep + 1}/{totalSteps}</span>
      </div>

      <div className="card-elevated overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getLevelBadgeClass()}>{level}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {duration} min
            </div>
            <div className="flex items-center gap-1 text-sm text-warning font-bold">
              <Star className="h-4 w-4 fill-warning" /> +{xpReward} XP
            </div>
          </div>
          <h2 className="text-xl font-black">
            {isContentStep ? title : `Quiz: Question ${quizIndex + 1}/${quizQuestions.length}`}
          </h2>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {isContentStep ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <motion.div
                key={`quiz-${quizIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <p className="text-lg font-bold">{currentQuestion.question}</p>
                
                <RadioGroup
                  value={quizAnswers[quizIndex]?.toString() || ''}
                  onValueChange={(val) => {
                    if (!isSubmitted) {
                      const newAnswers = [...quizAnswers];
                      newAnswers[quizIndex] = parseInt(val);
                      setQuizAnswers(newAnswers);
                    }
                  }}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                        isSubmitted && idx === currentQuestion.correctAnswer && "border-primary bg-primary/10",
                        isSubmitted && quizAnswers[quizIndex] === idx && idx !== currentQuestion.correctAnswer && "border-destructive bg-destructive/10",
                        !isSubmitted && quizAnswers[quizIndex] === idx && "border-secondary bg-secondary/5",
                        !isSubmitted && quizAnswers[quizIndex] !== idx && "hover:border-secondary/50 hover:bg-muted/50"
                      )}
                      onClick={() => {
                        if (!isSubmitted) {
                          const newAnswers = [...quizAnswers];
                          newAnswers[quizIndex] = idx;
                          setQuizAnswers(newAnswers);
                        }
                      }}
                    >
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} disabled={isSubmitted} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-medium">{option}</Label>
                      {isSubmitted && idx === currentQuestion.correctAnswer && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      {isSubmitted && quizAnswers[quizIndex] === idx && idx !== currentQuestion.correctAnswer && <XCircle className="h-5 w-5 text-destructive" />}
                    </motion.div>
                  ))}
                </RadioGroup>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-xl",
                      isCorrect ? "bg-primary/10 border-2 border-primary/30" : "bg-warning/10 border-2 border-warning/30"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? <Sparkles className="h-5 w-5 text-primary" /> : <Target className="h-5 w-5 text-warning" />}
                      <p className="font-black">{isCorrect ? 'Correct!' : 'Not quite right'}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between p-5 border-t border-border">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-xl font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          <div className="flex gap-2">
            {!isContentStep && !isSubmitted && (
              <Button onClick={handleSubmitAnswer} disabled={!isAnswered} className="btn-secondary rounded-xl">
                Check Answer
              </Button>
            )}
            {isContentStep && !hasQuiz && (
              <Button onClick={handleMarkComplete} className="btn-primary rounded-xl gap-2">
                <CheckCircle2 className="h-4 w-4" /> Complete
              </Button>
            )}
            {isContentStep && hasQuiz && (
              <Button onClick={handleNext} className="btn-primary rounded-xl gap-2">
                Start Quiz <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {!isContentStep && isSubmitted && (
              <Button onClick={handleNext} className="btn-primary rounded-xl gap-2">
                {currentStep === totalSteps - 1 ? 'Finish' : 'Next'} <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
