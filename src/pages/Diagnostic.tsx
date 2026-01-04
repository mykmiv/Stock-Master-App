// Page de diagnostic pour vérifier l'état du système
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Diagnostic() {
  const { user } = useAuth();
  const [checks, setChecks] = useState<Record<string, { status: 'checking' | 'success' | 'error'; message: string }>>({});
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: Record<string, { status: 'checking' | 'success' | 'error'; message: string }> = {};

    // Check 1: User authentication
    results.auth = { status: 'checking', message: 'Vérification...' };
    setChecks({ ...results });
    if (user) {
      results.auth = { status: 'success', message: `Utilisateur connecté: ${user.email}` };
    } else {
      results.auth = { status: 'error', message: 'Aucun utilisateur connecté' };
    }
    setChecks({ ...results });

    // Check 2: Lessons table exists
    results.lessonsTable = { status: 'checking', message: 'Vérification...' };
    setChecks({ ...results });
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('id')
        .limit(1);
      
      if (error) {
        results.lessonsTable = { status: 'error', message: `Erreur: ${error.message}` };
      } else {
        results.lessonsTable = { status: 'success', message: 'Table lessons existe' };
      }
    } catch (error: any) {
      results.lessonsTable = { status: 'error', message: `Exception: ${error.message}` };
    }
    setChecks({ ...results });

    // Check 3: New columns exist
    results.newColumns = { status: 'checking', message: 'Vérification...' };
    setChecks({ ...results });
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('module_id, day_number, lesson_number, content_json, coin_reward')
        .limit(1);
      
      if (error) {
        if (error.message.includes('column') || error.message.includes('does not exist')) {
          results.newColumns = { 
            status: 'error', 
            message: 'Les nouvelles colonnes n\'existent pas. La migration doit être appliquée!' 
          };
        } else {
          results.newColumns = { status: 'error', message: `Erreur: ${error.message}` };
        }
      } else {
        results.newColumns = { status: 'success', message: 'Toutes les colonnes existent' };
      }
    } catch (error: any) {
      results.newColumns = { status: 'error', message: `Exception: ${error.message}` };
    }
    setChecks({ ...results });

    // Check 4: Count existing lessons
    results.lessonCount = { status: 'checking', message: 'Vérification...' };
    setChecks({ ...results });
    try {
      const { count, error } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results.lessonCount = { status: 'error', message: `Erreur: ${error.message}` };
      } else {
        results.lessonCount = { 
          status: 'success', 
          message: `${count || 0} leçons dans la base de données` 
        };
      }
    } catch (error: any) {
      results.lessonCount = { status: 'error', message: `Exception: ${error.message}` };
    }
    setChecks({ ...results });

    // Check 5: User progress table
    results.progressTable = { status: 'checking', message: 'Vérification...' };
    setChecks({ ...results });
    try {
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .select('id')
        .limit(1);
      
      if (error) {
        results.progressTable = { status: 'error', message: `Erreur: ${error.message}` };
      } else {
        results.progressTable = { status: 'success', message: 'Table user_lesson_progress existe' };
      }
    } catch (error: any) {
      results.progressTable = { status: 'error', message: `Exception: ${error.message}` };
    }
    setChecks({ ...results });

    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'checking':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'checking':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic du Système</CardTitle>
            <CardDescription>
              Vérification de l'état de la base de données et des migrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runDiagnostics} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                'Relancer les Vérifications'
              )}
            </Button>

            {Object.entries(checks).map(([key, check]) => (
              <div
                key={key}
                className={`p-4 rounded-lg border-2 ${getStatusColor(check.status)}`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">
                      {key === 'auth' && 'Authentification'}
                      {key === 'lessonsTable' && 'Table Lessons'}
                      {key === 'newColumns' && 'Nouvelles Colonnes'}
                      {key === 'lessonCount' && 'Nombre de Leçons'}
                      {key === 'progressTable' && 'Table User Progress'}
                    </h3>
                    <p className="text-sm">{check.message}</p>
                  </div>
                </div>
              </div>
            ))}

            {checks.newColumns?.status === 'error' && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-900 mb-2">⚠️ Action Requise</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  La migration n'a pas été appliquée. Vous devez:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                  <li>Aller sur votre dashboard Supabase</li>
                  <li>Ouvrir SQL Editor</li>
                  <li>Exécuter le fichier: <code className="bg-yellow-100 px-1 rounded">supabase/migrations/20260103000000_stockmaster_learning_system.sql</code></li>
                  <li>Rafraîchir cette page</li>
                </ol>
              </div>
            )}

            {checks.lessonCount?.status === 'success' && 
             checks.lessonCount.message.includes('0 leçons') && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">💡 Prochaine Étape</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Aucune leçon dans la base de données. Insérez les leçons:
                </p>
                <Button
                  onClick={() => window.location.href = '/seed-lessons'}
                  className="w-full"
                >
                  Aller à la page d'insertion
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

