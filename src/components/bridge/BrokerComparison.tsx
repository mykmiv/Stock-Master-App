import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Star, Scale } from 'lucide-react';
import { type Broker } from '@/data/brokers';
import { cn } from '@/lib/utils';

interface BrokerComparisonProps {
  brokers: Broker[];
}

export function BrokerComparison({ brokers }: BrokerComparisonProps) {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([
    'robinhood',
    'fidelity',
    'ibkr'
  ]);

  const toggleBroker = (id: string) => {
    if (selectedBrokers.includes(id)) {
      if (selectedBrokers.length > 2) {
        setSelectedBrokers(selectedBrokers.filter(b => b !== id));
      }
    } else if (selectedBrokers.length < 4) {
      setSelectedBrokers([...selectedBrokers, id]);
    }
  };

  const compareFields: { key: keyof Broker | 'easeOfUseStars' | 'mobileAppStars' | 'researchStars'; label: string; format: (v: any, broker?: Broker) => React.ReactNode }[] = [
    { 
      key: 'minDeposit', 
      label: 'Dépôt minimum', 
      format: (v) => v === 0 ? <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">Aucun</Badge> : `$${v}` 
    },
    { key: 'commission', label: 'Commissions', format: (v) => v },
    { 
      key: 'easeOfUseStars', 
      label: 'Facilité', 
      format: (_, broker) => broker ? renderStars(broker.easeOfUse) : null 
    },
    { 
      key: 'mobileAppStars', 
      label: 'App mobile', 
      format: (_, broker) => broker ? renderStars(broker.mobileApp) : null 
    },
    { key: 'accountOpeningTime', label: 'Ouverture compte', format: (v) => v },
    { key: 'fundingTime', label: 'Délai financement', format: (v) => <span className="text-xs">{v}</span> },
    { key: 'customerSupport', label: 'Support client', format: (v) => <span className="text-xs">{v}</span> },
    { 
      key: 'researchStars', 
      label: 'Outils recherche', 
      format: (_, broker) => broker ? renderStars(broker.researchTools) : null 
    },
    { key: 'marginRate', label: 'Taux de marge', format: (v) => <span className="text-xs">{v}</span> },
    { key: 'platformComplexity', label: 'Niveau requis', format: (v) => {
      const labels = { beginner: '🌱 Débutant', intermediate: '📈 Intermédiaire', advanced: '🚀 Avancé' };
      return labels[v as keyof typeof labels] || v;
    }},
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "h-3.5 w-3.5",
              i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
            )} 
          />
        ))}
      </div>
    );
  };

  const selectedBrokerData = brokers.filter(b => selectedBrokers.includes(b.id));

  return (
    <div className="space-y-4">
      {/* Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Sélectionne 2-4 courtiers à comparer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {brokers.map(broker => (
              <div
                key={broker.id}
                onClick={() => toggleBroker(broker.id)}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all",
                  selectedBrokers.includes(broker.id)
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                    : 'hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedBrokers.includes(broker.id)} 
                    className="pointer-events-none"
                  />
                  <div className="h-5 flex-1 min-w-0">
                    <img 
                      src={broker.logo} 
                      alt={broker.name} 
                      className="h-full w-auto object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-sm font-medium truncate">${broker.name}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {selectedBrokers.length}/4 sélectionnés (minimum 2)
          </p>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedBrokerData.length >= 2 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold text-sm w-[140px]">Critère</th>
                  {selectedBrokerData.map(broker => (
                    <th key={broker.id} className="p-4 text-center">
                      <div className="h-8 mb-2 flex items-center justify-center">
                        <img 
                          src={broker.logo} 
                          alt={broker.name} 
                          className="h-full w-auto object-contain max-w-[100px]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-sm font-bold">${broker.name}</span>`;
                            }
                          }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground font-normal">{broker.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFields.map((field, idx) => (
                  <tr 
                    key={field.key} 
                    className={cn(
                      "border-b hover:bg-muted/30 transition-colors",
                      idx % 2 === 0 && "bg-muted/10"
                    )}
                  >
                    <td className="p-4 font-medium text-sm">{field.label}</td>
                    {selectedBrokerData.map(broker => {
                      const value = field.key.endsWith('Stars') 
                        ? null 
                        : broker[field.key as keyof Broker];
                      return (
                        <td key={broker.id} className="p-4 text-center text-sm">
                          {field.format(value, broker)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
