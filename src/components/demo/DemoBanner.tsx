import { useSubscription, SubscriptionTier, SUBSCRIPTION_TIERS } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Crown, Rocket } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DemoBanner() {
  const { isDemoMode, tier, enableDemoMode, disableDemoMode } = useSubscription();

  const tierIcons = {
    free: null,
    starter: Sparkles,
    pro: Rocket,
    elite: Crown,
  };

  const tierColors = {
    free: 'bg-muted',
    starter: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    pro: 'bg-primary/10 text-primary border-primary/20',
    elite: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  const TierIcon = tierIcons[tier];

  if (!isDemoMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => enableDemoMode('pro')}
          className="shadow-lg bg-background/95 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        >
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          Essayer le mode Pro
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground py-2 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            MODE DÉMO
          </Badge>
          <span className="text-sm font-medium">
            Vous visualisez l'app en mode
          </span>
          <Select
            value={tier}
            onValueChange={(value) => enableDemoMode(value as SubscriptionTier)}
          >
            <SelectTrigger className="w-32 h-8 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Pro
                </div>
              </SelectItem>
              <SelectItem value="elite">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Elite
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          {TierIcon && (
            <div className="flex items-center gap-2 text-sm">
              <TierIcon className="h-4 w-4" />
              <span>Fonctionnalités {SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]?.name} débloquées</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={disableDemoMode}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Quitter la démo
          </Button>
        </div>
      </div>
    </div>
  );
}
