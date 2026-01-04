import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Stripe product/price mapping
export const SUBSCRIPTION_TIERS = {
  starter: {
    product_id: 'prod_TgVcnXC3ugjzTz',
    price_id: 'price_1Sj8auGTae1AWYg3YAHO1WWS',
    name: 'Starter',
  },
  pro: {
    product_id: 'prod_TgVdK2a4xM0wBl',
    price_id: 'price_1Sj8cVGTae1AWYg3MdkM7UX4',
    name: 'Pro',
  },
  elite: {
    product_id: 'prod_TgVeLPYdIHK7Tw',
    price_id: 'price_1Sj8ciGTae1AWYg3F4HxKZCO',
    name: 'Elite',
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS | 'free';

interface SubscriptionState {
  subscribed: boolean;
  productId: string | null;
  tier: SubscriptionTier;
  subscriptionEnd: string | null;
  isLoading: boolean;
  isDemoMode: boolean;
}

// Demo mode key for localStorage
const DEMO_MODE_KEY = 'stocksim_demo_tier';

export function useSubscription() {
  const { user } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    subscribed: false,
    productId: null,
    tier: 'free',
    subscriptionEnd: null,
    isLoading: true,
    isDemoMode: false,
  });

  const getTierFromProductId = (productId: string | null): SubscriptionTier => {
    if (!productId) return 'free';
    
    for (const [tier, config] of Object.entries(SUBSCRIPTION_TIERS)) {
      if (config.product_id === productId) {
        return tier as SubscriptionTier;
      }
    }
    return 'free';
  };

  // Check for demo mode on mount
  useEffect(() => {
    const demoTier = localStorage.getItem(DEMO_MODE_KEY) as SubscriptionTier | null;
    if (demoTier && demoTier !== 'free') {
      setState(prev => ({
        ...prev,
        tier: demoTier,
        subscribed: true,
        isDemoMode: true,
        isLoading: false,
        subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }));
    }
  }, []);

  const checkSubscription = useCallback(async () => {
    // Skip real check if in demo mode
    const demoTier = localStorage.getItem(DEMO_MODE_KEY) as SubscriptionTier | null;
    if (demoTier && demoTier !== 'free') {
      return;
    }

    if (!user) {
      setState({
        subscribed: false,
        productId: null,
        tier: 'free',
        subscriptionEnd: null,
        isLoading: false,
        isDemoMode: false,
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;

      const tier = getTierFromProductId(data.product_id);
      
      setState({
        subscribed: data.subscribed,
        productId: data.product_id,
        tier,
        subscriptionEnd: data.subscription_end,
        isLoading: false,
        isDemoMode: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [user]);

  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  const createCheckout = async (priceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };

  const openCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      throw error;
    }
  };

  // Demo mode functions
  const enableDemoMode = (tier: SubscriptionTier) => {
    localStorage.setItem(DEMO_MODE_KEY, tier);
    setState({
      subscribed: tier !== 'free',
      productId: tier !== 'free' ? SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]?.product_id || null : null,
      tier,
      subscriptionEnd: tier !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
      isLoading: false,
      isDemoMode: tier !== 'free',
    });
  };

  const disableDemoMode = () => {
    localStorage.removeItem(DEMO_MODE_KEY);
    setState(prev => ({
      ...prev,
      isDemoMode: false,
    }));
    // Re-check real subscription
    checkSubscription();
  };

  return {
    ...state,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
    enableDemoMode,
    disableDemoMode,
  };
}
