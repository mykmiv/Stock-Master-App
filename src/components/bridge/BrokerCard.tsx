import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Star,
  Smartphone,
  GraduationCap,
  Search
} from 'lucide-react';
import { type Broker } from '@/data/brokers';
import { cn } from '@/lib/utils';

interface BrokerCardProps {
  broker: Broker;
}

export function BrokerCard({ broker }: BrokerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "h-3 w-3",
              i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
            )} 
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const complexityBadge = {
    beginner: { label: 'Débutant', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    intermediate: { label: 'Intermédiaire', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
    advanced: { label: 'Avancé', className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      isExpanded && "ring-2 ring-primary/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-10 w-20 shrink-0 flex items-center">
              <img 
                src={broker.logo} 
                alt={broker.name}
                className="h-full w-full object-contain object-left"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-lg font-bold">${broker.name}</span>`;
                  }
                }}
              />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base truncate">{broker.name}</CardTitle>
              <CardDescription className="text-xs truncate">{broker.tagline}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className={cn("shrink-0", complexityBadge[broker.platformComplexity].className)}>
            {complexityBadge[broker.platformComplexity].label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Dépôt minimum</p>
            <p className="font-semibold text-emerald-600">
              {broker.minDeposit === 0 ? 'Aucun' : `$${broker.minDeposit}`}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Commissions</p>
            <p className="font-semibold">{broker.commission.split(' ')[0]}</p>
          </div>
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            {renderStars(broker.mobileApp)}
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            {renderStars(broker.researchTools)}
          </div>
        </div>

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1.5">
          {broker.features.slice(0, 3).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs font-normal">
              {feature.length > 30 ? feature.slice(0, 30) + '...' : feature}
            </Badge>
          ))}
          {broker.features.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{broker.features.length - 3}
            </Badge>
          )}
        </div>

        {/* Expand Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Moins de détails
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Plus de détails
            </>
          )}
        </Button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 pt-2 border-t animate-in fade-in slide-in-from-top-2">
            {/* Description */}
            <p className="text-sm text-muted-foreground">{broker.description}</p>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Ouverture compte</span>
                </div>
                <p className="font-medium text-xs">{broker.accountOpeningTime}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs">Ressources éducatives</span>
                </div>
                {renderStars(broker.educationalResources)}
              </div>
            </div>

            {/* Pros */}
            <div>
              <p className="text-sm font-semibold text-emerald-600 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Points forts
              </p>
              <ul className="text-sm space-y-1.5">
                {broker.pros.slice(0, 4).map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <p className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Points faibles
              </p>
              <ul className="text-sm space-y-1.5">
                {broker.cons.slice(0, 3).map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm font-semibold mb-2">Idéal pour:</p>
              <div className="flex flex-wrap gap-1.5">
                {broker.bestFor.slice(0, 4).map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
              <div><strong>Financement:</strong> {broker.fundingTime}</div>
              <div><strong>Retrait:</strong> {broker.withdrawalTime}</div>
              <div><strong>Support:</strong> {broker.supportHours}</div>
              <div><strong>Marge:</strong> {broker.marginRate}</div>
            </div>

            {/* CTA Button */}
            <Button asChild className="w-full gap-2">
              <a href={broker.url} target="_blank" rel="noopener noreferrer">
                Ouvrir un compte
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {broker.affiliateNote && (
              <p className="text-xs text-muted-foreground text-center italic">
                {broker.affiliateNote}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
