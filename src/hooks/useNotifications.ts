import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  user_id: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  action_url?: string;
  action_label?: string;
  created_at: string;
}

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications((data || []) as Notification[]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Real-time subscription for new notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('[Realtime] New notification received:', payload);
          const newNotification = payload.new as Notification;
          
          // Add to state
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast for new notification
          toast(newNotification.title, {
            description: newNotification.message,
            action: newNotification.action_url ? {
              label: newNotification.action_label || 'View',
              onClick: () => window.location.href = newNotification.action_url!,
            } : undefined,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('[Realtime] Notification updated:', payload);
          const updatedNotification = payload.new as Notification;
          setNotifications(prev =>
            prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('[Realtime] Notification deleted:', payload);
          const deletedId = (payload.old as { id: string }).id;
          setNotifications(prev => prev.filter(n => n.id !== deletedId));
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Subscription status:', status);
      });

    return () => {
      console.log('[Realtime] Unsubscribing from notifications');
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (notificationId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  };

  const markAllAsRead = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  };

  const clearAll = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications([]);
      return true;
    } catch (error) {
      console.error('Error clearing notifications:', error);
      return false;
    }
  };

  const createNotification = async (
    notification: Omit<Notification, 'id' | 'user_id' | 'read' | 'created_at'>
  ) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          ...notification,
        })
        .select()
        .single();

      if (error) throw error;

      const newNotification = data as Notification;
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    createNotification,
    refreshNotifications: fetchNotifications,
  };
}
