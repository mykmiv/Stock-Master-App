import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Users } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { OnboardingLoading } from '@/components/onboarding/OnboardingLoading';
import { PathConfirmationScreen } from '@/components/onboarding/PathConfirmationScreen';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { determineLearningPath, LearningPathType } from '@/lib/learningPathLogic';

type OnboardingPhase = 'welcome' | 'questions' | 'path-confirmation' | 'loading';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [phase, setPhase] = useState<OnboardingPhase>('welcome');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPathType | null>(null);
  const [recommendedPath, setRecommendedPath] = useState<LearningPathType | null>(null);

  const handleStartQuestions = () => {
    setPhase('questions');
  };

  const handleQuestionsComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    // Determine the recommended path
    const path = determineLearningPath(data);
    setRecommendedPath(path);
    setPhase('path-confirmation');
  };

  const handlePathConfirmed = (path: LearningPathType) => {
    setSelectedPath(path);
    setPhase('loading');
  };

  const handleLoadingComplete = async () => {
    await refreshProfile();
    toast.success('Bienvenue sur StockMaster! 🎉');
    navigate('/dashboard');
  };

  return (
    <AnimatePresence mode="wait">
      {phase === 'welcome' && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-6"
        >
          <div className="w-full max-w-md text-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl mb-6"
              >
                📈
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h1 className="font-display text-4xl font-black">
                Bienvenue sur
                <br />
                <span className="text-primary">StockMaster AI</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                L'éducation boursière propulsée par l'IA
              </p>
            </motion.div>

            {/* Stats badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                1,234+ traders formés
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                4.8/5 satisfaction
              </Badge>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-left p-4 rounded-2xl bg-card border border-border">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <p className="font-bold">+300h de contenu</p>
                  <p className="text-sm text-muted-foreground">Du débutant au pro</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left p-4 rounded-2xl bg-card border border-border">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎮</span>
                </div>
                <div>
                  <p className="font-bold">Simulateur $100K</p>
                  <p className="text-sm text-muted-foreground">Pratique sans risque</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left p-4 rounded-2xl bg-card border border-border">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-bold">Scanner AI</p>
                  <p className="text-sm text-muted-foreground">Analyse tes graphiques</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <p className="text-muted-foreground text-sm">
                Réponds à quelques questions (3 min)
              </p>
              <Button
                size="lg"
                className="w-full btn-primary text-lg py-6"
                onClick={handleStartQuestions}
              >
                Commencer 🚀
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-muted-foreground"
            >
              En continuant, tu acceptes nos{' '}
              <Link to="/terms" className="underline">
                Conditions
              </Link>
            </motion.p>
          </div>
        </motion.div>
      )}

      {phase === 'questions' && (
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OnboardingFlow onComplete={handleQuestionsComplete} />
        </motion.div>
      )}

      {phase === 'path-confirmation' && onboardingData && recommendedPath && (
        <motion.div
          key="path-confirmation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PathConfirmationScreen
            recommendedPath={recommendedPath}
            data={onboardingData}
            onConfirm={handlePathConfirmed}
          />
        </motion.div>
      )}

      {phase === 'loading' && onboardingData && user && selectedPath && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OnboardingLoading 
            data={onboardingData} 
            userId={user.id}
            selectedPath={selectedPath}
            onComplete={handleLoadingComplete} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
