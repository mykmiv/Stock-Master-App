// Component that runs once on app initialization to seed lessons
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { autoSeedLessons } from '@/lib/autoSeedLessons';

export function AppInitializer() {
  const { user } = useAuth();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Run auto-seed once after a delay to ensure Supabase is ready
    if (!hasRun) {
      const timer = setTimeout(async () => {
        try {
          console.log('🚀 App initializer: Starting auto-seed...');
          const result = await autoSeedLessons();
          if (result.success) {
            console.log('✅ Auto-seed completed successfully');
          } else {
            console.warn('⚠️ Auto-seed completed with warnings:', result.message);
          }
        } catch (error) {
          console.error('❌ Auto-seed failed:', error);
        } finally {
          setHasRun(true);
        }
      }, 2000); // Wait 2 seconds for Supabase to be fully initialized

      return () => clearTimeout(timer);
    }
  }, [hasRun]);

  // This component doesn't render anything
  return null;
}

