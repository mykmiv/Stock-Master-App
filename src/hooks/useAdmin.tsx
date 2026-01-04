import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

type AdminRole = 'owner' | 'admin' | 'moderator';

interface AdminInfo {
  isAdmin: boolean;
  isOwner: boolean;
  role: AdminRole | null;
  permissions: Record<string, boolean>;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
}

export function useAdmin(): AdminInfo {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsOwner(false);
      setRole(null);
      setLoading(false);
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role, permissions')
          .eq('user_id', user.id)
          .single();

        if (error) {
          setIsAdmin(false);
          setIsOwner(false);
          setRole(null);
        } else {
          setRole(data.role as AdminRole);
          setPermissions((data.permissions as Record<string, boolean>) || {});
          setIsAdmin(true);
          setIsOwner(data.role === 'owner');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setIsOwner(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const hasPermission = (permission: string): boolean => {
    if (isOwner || permissions.all) return true;
    return permissions[permission] === true;
  };

  return {
    isAdmin,
    isOwner,
    role,
    permissions,
    loading,
    hasPermission
  };
}
