import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Target, Sparkles, CheckCircle2, 
  RefreshCw, Lightbulb, TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LearningPathType } from '@/lib/learningPathLogic';
import { OnboardingData } from '@/types/onboarding';
import { ALL_PATHS, PathOption } from '@/data/pathOptions';
import { calculateMatchScore, getReasoningText } from '@/lib/pathScoring';

interface Props {
  recommendedPath: LearningPathType;
  data: OnboardingData;
  onConfirm: (selectedPath: LearningPathType) => void;
}

export function PathConfirmationScreen({ recommendedPath, data, onConfirm }: Props) {
  const [showAllPaths, setShowAllPaths] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPathType | null>(null);

  const recommendedPathData = ALL_PATHS.find(p => p.type === recommendedPath)!;
  const matchScore = calculateMatchScore(data, recommendedPath);
  const reasoningText = getReasoningText(data, recommendedPath);

  const handleConfirmRecommended = () => {
    onConfirm(recommendedPath);
  };

  const handleConfirmCustomPath = () => {
    if (selectedPath) {
      onConfirm(selectedPath);
      setShowAllPaths(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          
          <h1 className="text-3xl font-black mb-3">
            Ton Parcours Personnalisé
          </h1>
          <p className="text-lg text-muted-foreground">
            Basé sur tes réponses, voici ce qu'on recommande
          </p>
        </div>

        {/* Recommended Path Card */}
        <Card className="mb-6 border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-3xl">{recommendedPathData.icon}</span>
                </div>
                <div>
                  <Badge className="mb-2 bg-primary text-primary-foreground">
                    ⭐ Recommandé pour toi
                  </Badge>
                  <CardTitle className="text-2xl">
                    {recommendedPathData.name}
                  </CardTitle>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-3xl font-black text-primary">
                  {matchScore}%
                </p>
                <p className="text-xs text-muted-foreground">
                  Match
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-lg">
              {recommendedPathData.description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard>
                <BookOpen className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-black">
                  {recommendedPathData.totalLessons}
                </p>
                <p className="text-xs text-muted-foreground">
                  Leçons
                </p>
              </StatCard>
              
              <StatCard>
                <Clock className="h-5 w-5 text-primary mb-2" />
                <p className="text-2xl font-black">
                  {recommendedPathData.estimatedWeeks}
                </p>
                <p className="text-xs text-muted-foreground">
                  Semaines
                </p>
              </StatCard>
              
              <StatCard>
                <Target className="h-5 w-5 text-primary mb-2" />
                <p className="text-lg font-black leading-tight">
                  {recommendedPathData.tier}
                </p>
                <p className="text-xs text-muted-foreground">
                  Niveau
                </p>
              </StatCard>
            </div>
            
            {/* What You'll Learn */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Ce que tu vas apprendre:
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {recommendedPathData.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Pourquoi ce parcours */}
            <Alert className="bg-primary/5 border-primary/20">
              <Lightbulb className="h-4 w-4 text-primary" />
              <AlertTitle>Pourquoi ce parcours?</AlertTitle>
              <AlertDescription>
                {reasoningText}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 btn-primary py-6"
            onClick={handleConfirmRecommended}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Parfait! On y va!
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowAllPaths(true)}
            className="py-6"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Voir les autres
          </Button>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Tu pourras toujours changer de parcours dans les paramètres
        </p>
      </motion.div>

      {/* All Paths Modal */}
      <Dialog open={showAllPaths} onOpenChange={setShowAllPaths}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Choisis ton parcours
            </DialogTitle>
            <DialogDescription>
              Sélectionne celui qui correspond le mieux à tes objectifs
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {ALL_PATHS.map((path) => (
              <PathOptionCard
                key={path.type}
                path={path}
                isRecommended={path.type === recommendedPath}
                matchScore={calculateMatchScore(data, path.type)}
                isSelected={selectedPath === path.type}
                onClick={() => setSelectedPath(path.type)}
              />
            ))}
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAllPaths(false)}
            >
              Annuler
            </Button>
            <Button
              className="btn-primary"
              onClick={handleConfirmCustomPath}
              disabled={!selectedPath}
            >
              Confirmer ce parcours →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background/60 rounded-lg p-4 text-center">
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

interface PathOptionCardProps {
  path: PathOption;
  isRecommended: boolean;
  matchScore: number;
  isSelected: boolean;
  onClick: () => void;
}

function PathOptionCard({ path, isRecommended, matchScore, isSelected, onClick }: PathOptionCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg",
        isRecommended && "border-primary bg-primary/5",
        isSelected && "border-primary bg-primary/10 shadow-lg",
        !isRecommended && !isSelected && "border-muted hover:border-primary/50"
      )}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground">
          ⭐ Recommandé ({matchScore}% match)
        </Badge>
      )}
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0",
          isSelected ? "bg-primary" : "bg-muted"
        )}>
          <span className="text-2xl">{path.icon}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black">{path.name}</h3>
            {!isRecommended && matchScore > 0 && (
              <span className="text-sm text-muted-foreground">
                {matchScore}% match
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {path.description}
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm mb-3">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-semibold">{path.totalLessons} leçons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-semibold">{path.estimatedWeeks} semaines</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-semibold">{path.tier}</span>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="flex flex-wrap gap-2">
            {path.keyFeatures.slice(0, 3).map((feature, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Checkmark */}
        {isSelected && (
          <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
        )}
      </div>
    </div>
  );
}
