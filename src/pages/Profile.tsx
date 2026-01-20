import { ProfilePage } from '@/components/profile/ProfilePage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Profile() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ProfilePage />
      </MainLayout>
    </ProtectedRoute>
  );
}
