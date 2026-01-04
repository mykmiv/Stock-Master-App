import { AdminRoute } from '@/components/auth/AdminRoute';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  BookOpen, 
  Users, 
  DollarSign, 
  BarChart3, 
  Bell,
  Shield
} from 'lucide-react';

import { VideoManager } from '@/components/admin/VideoManager';
import { LessonManager } from '@/components/admin/LessonManager';
import { UserManagement } from '@/components/admin/UserManagement';
import { RevenueAnalytics } from '@/components/admin/RevenueAnalytics';
import { AppStatistics } from '@/components/admin/AppStatistics';
import { NotificationSender } from '@/components/admin/NotificationSender';
import { useAdmin } from '@/hooks/useAdmin';

export default function Admin() {
  const { role } = useAdmin();

  return (
    <ProtectedRoute>
      <AdminRoute>
        <MainLayout>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Panneau de contrôle - Accès {role?.charAt(0).toUpperCase()}{role?.slice(1)}
                </p>
              </div>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="videos" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Vidéos</span>
                </TabsTrigger>
                <TabsTrigger value="lessons" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Leçons</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="hidden sm:inline">Revenus</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Stats</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
                <VideoManager />
              </TabsContent>

              <TabsContent value="lessons">
                <LessonManager />
              </TabsContent>

              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              <TabsContent value="revenue">
                <RevenueAnalytics />
              </TabsContent>

              <TabsContent value="stats">
                <AppStatistics />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationSender />
              </TabsContent>
            </Tabs>
          </div>
        </MainLayout>
      </AdminRoute>
    </ProtectedRoute>
  );
}
