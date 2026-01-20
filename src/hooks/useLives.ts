import { useState, useEffect, useCallback } from 'react';
import { useSubscription } from './useSubscription';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

const MAX_LIVES_FREE = 5;
const LIFE_REGENERATION_HOURS = 4;

interface LivesData {
  currentLives: number;
  maxLives: number;
  lastRegeneration: string | null;
  nextRegeneration: Date | null;
}

export function useLives() {
  const { tier } = useSubscription();
  const { user } = useAuth();
  const [lives, setLives] = useState<LivesData>({
    currentLives: MAX_LIVES_FREE,
    maxLives: MAX_LIVES_FREE,
    lastRegeneration: null,
    nextRegeneration: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const isPro = tier === 'pro' || tier === 'elite';
  const hasUnlimitedLives = isPro;

  // Charger les vies depuis la base de données
  const loadLives = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      // Pour l'instant, on utilise localStorage pour stocker les vies
      // Plus tard, on pourra utiliser une table dans Supabase
      const storedLives = localStorage.getItem(`lives_${user.id}`);
      const storedData = storedLives ? JSON.parse(storedLives) : null;

      if (hasUnlimitedLives) {
        setLives({
          currentLives: Infinity,
          maxLives: Infinity,
          lastRegeneration: null,
          nextRegeneration: null,
        });
        setIsLoading(false);
        return;
      }

      // FREE: Gérer les vies limitées
      const today = new Date().toDateString();
      const lastDate = storedData?.lastDate;

      if (lastDate === today) {
        // Même jour: utiliser les vies stockées
        setLives({
          currentLives: storedData.currentLives || MAX_LIVES_FREE,
          maxLives: MAX_LIVES_FREE,
          lastRegeneration: storedData.lastRegeneration || null,
          nextRegeneration: storedData.nextRegeneration 
            ? new Date(storedData.nextRegeneration) 
            : null,
        });
      } else {
        // Nouveau jour: réinitialiser à 5 vies
        setLives({
          currentLives: MAX_LIVES_FREE,
          maxLives: MAX_LIVES_FREE,
          lastRegeneration: null,
          nextRegeneration: null,
        });
        localStorage.setItem(`lives_${user.id}`, JSON.stringify({
          currentLives: MAX_LIVES_FREE,
          lastDate: today,
          lastRegeneration: null,
          nextRegeneration: null,
        }));
      }
    } catch (error) {
      console.error('Error loading lives:', error);
      setLives({
        currentLives: MAX_LIVES_FREE,
        maxLives: MAX_LIVES_FREE,
        lastRegeneration: null,
        nextRegeneration: null,
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, hasUnlimitedLives]);

  // Perdre une vie
  const loseLife = useCallback(async () => {
    if (hasUnlimitedLives) {
      return true; // PRO: pas de perte de vie
    }

    if (!user) return false;

    const currentLives = lives.currentLives;
    if (currentLives <= 0) {
      return false; // Plus de vies
    }

    const newLives = currentLives - 1;
    const today = new Date().toDateString();
    
    setLives(prev => ({
      ...prev,
      currentLives: newLives,
    }));

    const storedLives = localStorage.getItem(`lives_${user.id}`);
    const storedData = storedLives ? JSON.parse(storedLives) : {};
    
    localStorage.setItem(`lives_${user.id}`, JSON.stringify({
      currentLives: newLives,
      lastDate: today,
      lastRegeneration: storedData.lastRegeneration || null,
      nextRegeneration: storedData.nextRegeneration || null,
    }));

    return true;
  }, [user, lives, hasUnlimitedLives]);

  // Régénérer une vie (après 4h)
  const regenerateLife = useCallback(() => {
    if (hasUnlimitedLives || !user) return;

    const currentLives = lives.currentLives;
    if (currentLives >= MAX_LIVES_FREE) return;

    const newLives = Math.min(currentLives + 1, MAX_LIVES_FREE);
    const today = new Date().toDateString();
    const nextRegen = new Date(Date.now() + LIFE_REGENERATION_HOURS * 60 * 60 * 1000);

    setLives(prev => ({
      ...prev,
      currentLives: newLives,
      lastRegeneration: new Date().toISOString(),
      nextRegeneration: nextRegen,
    }));

    localStorage.setItem(`lives_${user.id}`, JSON.stringify({
      currentLives: newLives,
      lastDate: today,
      lastRegeneration: new Date().toISOString(),
      nextRegeneration: nextRegen.toISOString(),
    }));
  }, [user, lives, hasUnlimitedLives]);

  useEffect(() => {
    loadLives();
  }, [loadLives]);

  // Vérifier la régénération automatique
  useEffect(() => {
    if (hasUnlimitedLives || !lives.nextRegeneration) return;

    const checkRegeneration = setInterval(() => {
      const now = new Date();
      if (lives.nextRegeneration && now >= lives.nextRegeneration) {
        regenerateLife();
      }
    }, 60000); // Vérifier toutes les minutes

    return () => clearInterval(checkRegeneration);
  }, [lives.nextRegeneration, regenerateLife, hasUnlimitedLives]);

  return {
    currentLives: lives.currentLives,
    maxLives: lives.maxLives,
    hasUnlimitedLives,
    isLoading,
    loseLife,
    regenerateLife,
    canContinue: hasUnlimitedLives || lives.currentLives > 0,
  };
}
