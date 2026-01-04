import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// VAPID public key - in production, generate your own key pair
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

interface PushState {
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  permission: NotificationPermission | 'default';
}

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

export function usePushNotifications() {
  const { user } = useAuth();
  const [state, setState] = useState<PushState>({
    isSupported: false,
    isSubscribed: false,
    isLoading: true,
    permission: 'default',
  });

  // Check if push notifications are supported
  useEffect(() => {
    const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    const permission = isSupported ? Notification.permission : 'default';
    
    setState(prev => ({
      ...prev,
      isSupported,
      permission,
    }));
  }, []);

  // Register service worker and check subscription status
  useEffect(() => {
    if (!state.isSupported || !user) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        const subscription = await registration.pushManager.getSubscription();
        
        setState(prev => ({
          ...prev,
          isSubscribed: !!subscription,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error checking push subscription:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkSubscription();
  }, [state.isSupported, user]);

  const subscribe = useCallback(async () => {
    if (!state.isSupported || !user) return false;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Request permission
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));

      if (permission !== 'granted') {
        toast.error('Notification permission denied');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      const subscriptionJson = subscription.toJSON();
      
      // Save subscription to database
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: user.id,
          endpoint: subscriptionJson.endpoint!,
          p256dh: subscriptionJson.keys!.p256dh,
          auth: subscriptionJson.keys!.auth,
        }, {
          onConflict: 'user_id,endpoint',
        });

      if (error) throw error;

      // Update user settings
      await supabase
        .from('user_settings')
        .update({ push_enabled: true })
        .eq('user_id', user.id);

      setState(prev => ({
        ...prev,
        isSubscribed: true,
        isLoading: false,
      }));

      toast.success('Push notifications enabled');
      return true;
    } catch (error) {
      console.error('Error subscribing to push:', error);
      toast.error('Failed to enable push notifications');
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [state.isSupported, user]);

  const unsubscribe = useCallback(async () => {
    if (!state.isSupported || !user) return false;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Remove subscription from database
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', subscription.endpoint);
      }

      // Update user settings
      await supabase
        .from('user_settings')
        .update({ push_enabled: false })
        .eq('user_id', user.id);

      setState(prev => ({
        ...prev,
        isSubscribed: false,
        isLoading: false,
      }));

      toast.success('Push notifications disabled');
      return true;
    } catch (error) {
      console.error('Error unsubscribing from push:', error);
      toast.error('Failed to disable push notifications');
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [state.isSupported, user]);

  const toggleSubscription = useCallback(async () => {
    if (state.isSubscribed) {
      return unsubscribe();
    } else {
      return subscribe();
    }
  }, [state.isSubscribed, subscribe, unsubscribe]);

  return {
    ...state,
    subscribe,
    unsubscribe,
    toggleSubscription,
  };
}
