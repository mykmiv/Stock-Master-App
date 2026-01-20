// Component that runs once on app initialization to seed lessons and badges
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { autoSeedLessons } from '@/lib/autoSeedLessons';
import { seedBadges, needsSeeding } from '@/lib/seedDatabase';

export function AppInitializer() {
  const { user } = useAuth();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Run auto-seed once after a delay to ensure Supabase is ready
    if (!hasRun) {
      const timer = setTimeout(async () => {
        try {
          console.log('🚀 App initializer: Starting auto-seed...');
          
          // Seed badges first
          const needsBadgeSeed = await needsSeeding();
          if (needsBadgeSeed) {
            console.log('🌱 Seeding badges...');
            const badgeResult = await seedBadges();
            if (badgeResult.success) {
              console.log(`✅ Badges seeded: ${badgeResult.count} badges created`);
            } else {
              console.warn('⚠️ Badge seeding failed:', badgeResult.error);
            }
          } else {
            console.log('✅ Badges already exist, skipping...');
          }
          
          // Then seed lessons
          const lessonResult = await autoSeedLessons();
          if (lessonResult.success) {
            console.log('✅ Auto-seed completed successfully');
          } else {
            console.warn('⚠️ Auto-seed completed with warnings:', lessonResult.message);
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

