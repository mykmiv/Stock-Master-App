// Simple page to seed lessons - can be accessed directly
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// Dynamic import to avoid SSR issues
const seedLessons1to10 = async () => {
  const module = await import('@/scripts/seedLessons1to10');
  return module.seedLessons1to10();
};
import { toast } from 'sonner';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function SeedLessons() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<{ success: boolean; successCount: number; errorCount: number } | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);

    try {
      const seedResult = await seedLessons1to10();
      setResult(seedResult);

      if (seedResult.success) {
        toast.success('Leçons insérées avec succès!', {
          description: `${seedResult.successCount} leçons ont été ajoutées.`
        });
      } else {
        toast.error('Erreurs lors de l\'insertion', {
          description: `${seedResult.errorCount} erreurs rencontrées.`
        });
      }
    } catch (error) {
      console.error('Error seeding lessons:', error);
      toast.error('Erreur lors de l\'insertion des leçons');
      setResult({ success: false, successCount: 0, errorCount: 10 });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Insérer les Leçons 1-10</CardTitle>
            <CardDescription>
              Cette page permet d'insérer les 10 premières leçons du cours "Zero to Hero Trading" dans la base de données.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">Ce qui sera inséré:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li><strong>Jour 1:</strong> 4 leçons (1.1 à 1.4)</li>
                <li><strong>Jour 2:</strong> 6 leçons (2.1 à 2.6)</li>
                <li><strong>Total:</strong> 10 leçons complètes avec quiz et contenu interactif</li>
                <li><strong>XP Total:</strong> 125 XP</li>
                <li><strong>Coins Total:</strong> 75 coins</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">⚠️ Important:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                <li>Assurez-vous que la migration Supabase a été appliquée</li>
                <li>Les leçons existantes ne seront pas dupliquées</li>
                <li>Cette opération peut prendre quelques secondes</li>
              </ul>
            </div>

            <Button
              onClick={handleSeed}
              disabled={isSeeding}
              size="lg"
              className="w-full"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Insertion en cours...
                </>
              ) : (
                'Insérer les 10 Leçons'
              )}
            </Button>

            {result && (
              <div className={`rounded-lg p-4 border-2 ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <h3 className={`font-bold ${
                    result.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {result.success ? 'Succès!' : 'Erreurs rencontrées'}
                  </h3>
                </div>
                <div className="text-sm space-y-1">
                  <p className={result.success ? 'text-green-800' : 'text-red-800'}>
                    ✅ Leçons insérées: {result.successCount}
                  </p>
                  {result.errorCount > 0 && (
                    <p className="text-red-800">
                      ❌ Erreurs: {result.errorCount}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/learn'}
              >
                Aller à la page Learn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

