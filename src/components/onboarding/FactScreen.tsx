import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OnboardingData, FactScreenData } from '@/types/onboarding';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Quote, Check, X, SkipForward } from 'lucide-react';

interface Props {
  factScreen: FactScreenData;
  data: Partial<OnboardingData>;
  onComplete: () => void;
}

export function FactScreen({ factScreen, data, onComplete }: Props) {
  const [countdown, setCountdown] = useState(Math.ceil(factScreen.duration / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [factScreen.duration, onComplete]);

  const renderContent = () => {
    switch (factScreen.type) {
      case 'trading_reality':
        return <TradingRealityScreen />;
      case 'with_without_education':
        return <WithWithoutEducationScreen />;
      case 'ai_scanner':
        return <AiScannerScreen />;
      case 'success_timeline':
        return <SuccessTimelineScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-2xl space-y-8">
        {renderContent()}

        {/* Countdown + Skip */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Suite dans {countdown}s...</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onComplete}>
            <SkipForward className="h-4 w-4 mr-1" />
            Passer
          </Button>
        </div>
      </div>
    </div>
  );
}

// Fact Screen 1: "90% des traders perdent de l'argent"
function TradingRealityScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      {/* Warning icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.3 }}
        className="text-8xl"
      >
        ⚠️
      </motion.div>

      {/* Stat */}
      <div>
        <h2 className="text-4xl font-black mb-4">
          90% des traders perdent de l'argent
        </h2>
        <p className="text-xl text-muted-foreground">
          ...parce qu'ils tradent sans formation.
        </p>
      </div>

      {/* Reassurance */}
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-2 border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check className="h-8 w-8 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black mb-2">Sois dans les 10%</h3>
            <p className="text-muted-foreground">
              Notre méthode d'apprentissage structurée + simulateur sans risque 
              te préparent AVANT de risquer un seul dollar.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Fact Screen 2: With vs Without Education comparison
function WithWithoutEducationScreen() {
  return (
    <div className="space-y-8">
      {/* Split screen comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Without education */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-2 border-red-200 dark:border-red-800 h-full">
            <div className="text-center">
              <div className="text-4xl mb-3">😰</div>
              <h3 className="font-black text-xl mb-4">Sans formation</h3>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="text-sm">90% de taux d'échec</p>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="text-sm">Perte moyenne: $5,000+</p>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="text-sm">Stress émotionnel élevé</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* With StockMaster */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 h-full">
            <div className="text-center">
              <div className="text-4xl mb-3">😎</div>
              <h3 className="font-black text-xl mb-4">Avec StockMaster</h3>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <p className="text-sm">Pratique sans risque ($100K virtuels)</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <p className="text-sm">Stratégies éprouvées</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-success flex-shrink-0" />
                  <p className="text-sm">Confiance avant de risquer $1</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-lg text-muted-foreground">
          Nos utilisateurs pratiquent en moyenne <span className="font-black text-primary">3 semaines</span> sur 
          le simulateur avant leur premier trade réel
        </p>
      </motion.div>
    </div>
  );
}

// Fact Screen 3: AI Scanner showcase
function AiScannerScreen() {
  return (
    <div className="text-center space-y-8">
      {/* Animation */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-8xl"
      >
        🤖
      </motion.div>

      {/* Title */}
      <div>
        <h2 className="text-4xl font-black mb-4">
          Notre Scanner AI révolutionne l'apprentissage
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Prends une photo d'un chart, l'IA te dit EXACTEMENT ce qu'elle voit
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="font-bold mb-2">Upload un chart</h3>
            <p className="text-sm text-muted-foreground">
              Photo d'écran, graphique, n'importe quoi
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold mb-2">AI analyse</h3>
            <p className="text-sm text-muted-foreground">
              Patterns, tendances, supports/résistances
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-bold mb-2">Apprends en pratique</h3>
            <p className="text-sm text-muted-foreground">
              Comprends WHY, pas juste WHAT
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="max-w-xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="flex items-start gap-3">
            <Quote className="h-8 w-8 text-primary flex-shrink-0" />
            <div className="text-left">
              <p className="italic mb-3">
                "Le scanner m'a aidé à identifier des patterns que je manquais complètement. 
                Game changer!"
              </p>
              <p className="text-sm text-muted-foreground">
                — Marie L., utilisatrice depuis 2 mois
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Fact Screen 4: Success Timeline (8 weeks)
function SuccessTimelineScreen() {
  const timelineItems = [
    { week: 'Semaines 1-2', icon: '📚', title: 'Apprentissage des bases', description: 'Comprendre les marchés, types d\'ordres, lecture de charts' },
    { week: 'Semaines 3-4', icon: '🎮', title: 'Simulateur intensif', description: 'Pratiquer 20-30 trades, tester différentes stratégies' },
    { week: 'Semaines 5-6', icon: '📊', title: 'Stratégie personnalisée', description: 'Identifier TON style, créer TON plan de trading' },
    { week: 'Semaines 7-8', icon: '💰', title: 'Premier trade réel', description: 'Petit capital, grande confiance!' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-center">
        Le parcours typique d'un trader qui réussit 🎯
      </h2>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto space-y-4">
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.week}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="p-4 flex items-start gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-2">{item.week}</Badge>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30">
          <div className="text-center">
            <p className="text-4xl font-black text-success mb-2">8 semaines</p>
            <p className="text-lg text-muted-foreground">
              Temps moyen pour passer de zéro à premier trade confiant
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
