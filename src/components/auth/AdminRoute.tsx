import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
  requireOwner?: boolean;
}

export function AdminRoute({ children, requireOwner = false }: AdminRouteProps) {
  const { isAdmin, isOwner, loading } = useAdmin();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin || (requireOwner && !isOwner)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Accès refusé. Cette section est réservée aux administrateurs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
