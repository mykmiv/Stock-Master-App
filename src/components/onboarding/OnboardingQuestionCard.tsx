import { motion } from 'framer-motion';
import { OnboardingOption } from '@/types/onboarding';
import { Check, Lightbulb, DollarSign, Shield, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  option: OnboardingOption;
  selected: boolean;
  multiSelect?: boolean;
  onClick: () => void;
}

export function OnboardingQuestionCard({ option, selected, multiSelect, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-3xl ${selected ? 'scale-110' : ''} transition-transform`}>
          {option.icon}
        </div>
        <div className="flex-1">
          <p className={`font-bold ${selected ? 'text-primary' : 'text-foreground'}`}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-muted-foreground">{option.description}</p>
          )}
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-6 w-6 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="h-4 w-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

interface ReassuranceProps {
  fear: string;
}

export function FearReassurance({ fear }: ReassuranceProps) {
  if (fear === 'losing_money') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                  Tu vas pratiquer avec $0 risque réel!
                </p>
                <p className="text-sm text-muted-foreground">
                  Notre simulateur te donne $100,000 virtuels. Tu perfectionnes tes skills AVANT de risquer ton argent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (fear === 'not_knowing_where_invest') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-purple-700 dark:text-purple-300 mb-1">
                  On te guide à chaque étape!
                </p>
                <p className="text-sm text-muted-foreground">
                  Scanner AI + leçons personnalisées = tu sauras toujours quoi faire.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (fear === 'too_complex') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">
                  On explique TOUT simplement!
                </p>
                <p className="text-sm text-muted-foreground">
                  Nos leçons débutent vraiment à zéro. Pas de jargon. Tout est expliqué comme si tu avais 12 ans.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (fear === 'fomo') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-orange-700 dark:text-orange-300 mb-1">
                  Alertes personnalisées pour toi!
                </p>
                <p className="text-sm text-muted-foreground">
                  Notre système t'envoie les opportunités importantes. Tu ne manqueras plus rien!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
}
