import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LearningPathType } from '@/lib/learningPathLogic';
import { learningPaths, getPathConfig } from '@/config/learningPaths';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function SelectPath() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [selectedPath, setSelectedPath] = useState<LearningPathType | null>(
    (profile?.learning_path as LearningPathType) || null
  );

  const handleSelectPath = (pathType: LearningPathType) => {
    setSelectedPath(pathType);
  };

  const handleConfirm = () => {
    if (selectedPath) {
      // Ici on devrait appeler une fonction pour changer le parcours
      // Pour l'instant, on navigue juste vers /learn
      toast.success(`Parcours sélectionné: ${learningPaths[selectedPath].name}`);
      navigate('/learn');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/learn')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">
              Choisis ton Parcours d'Apprentissage
            </h1>
            <p className="text-lg text-muted-foreground">
              Sélectionne le parcours qui correspond le mieux à tes objectifs
            </p>
          </div>

          {/* Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {(Object.keys(learningPaths) as LearningPathType[]).map((pathType) => {
              const pathConfig = learningPaths[pathType];
              const isSelected = selectedPath === pathType;
              
              return (
                <motion.div
                  key={pathType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPath(pathType)}
                  className="cursor-pointer"
                >
                  <Card
                    className={cn(
                      "h-full transition-all duration-200",
                      isSelected
                        ? "border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-primary/10"
                        : "border hover:border-primary/50 hover:shadow-lg"
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-3xl">
                          {pathConfig.icon}
                        </div>
                        {isSelected && (
                          <Badge className="bg-primary text-primary-foreground">
                            Sélectionné
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">
                        {pathConfig.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-3">
                        {pathConfig.level}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Parcours adapté pour les niveaux {pathConfig.level.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Confirm Button */}
          {selectedPath && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                onClick={handleConfirm}
                className="px-8 py-6 text-lg"
              >
                Confirmer la sélection
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
