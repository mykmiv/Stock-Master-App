import React from 'react';
import { Heart, Bot, BookOpen, Zap } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

export function ProFeaturesGrid() {
  const { tier } = useSubscription();
  const isPro = tier === 'pro' || tier === 'elite';

  // Ne pas afficher si l'utilisateur n'est pas PRO
  if (!isPro) {
    return null;
  }

  const features = [
    {
      icon: Heart,
      emoji: '💚',
      title: 'Vies illimitées',
      description: 'Apprends sans limite',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Bot,
      emoji: '🤖',
      title: 'IA illimitée',
      description: 'Scanner & Coach',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: BookOpen,
      emoji: '📚',
      title: 'Accès toutes leçons',
      description: '13 modules complets',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Zap,
      emoji: '🎯',
      title: 'Pro actif',
      description: 'Tout illimité',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">PRO - Avantages</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`${feature.bgColor} rounded-xl p-4 border-2 border-white shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{feature.emoji}</span>
                <Icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <div className={`text-base font-bold ${feature.color} mb-1`}>
                {feature.title}
              </div>
              <div className="text-xs text-gray-600">
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
