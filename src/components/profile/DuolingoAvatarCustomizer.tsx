import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DuolingoAvatar } from './DuolingoAvatar';
import { DuolingoAvatarConfig, DEFAULT_DUOLINGO_AVATAR_CONFIG, DUOLINGO_COLORS, DUOLINGO_OPTIONS } from '@/types/duolingoAvatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DuolingoAvatarCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig?: DuolingoAvatarConfig | null;
  onSave?: (config: DuolingoAvatarConfig) => void;
}

type TabType = 'body' | 'eyes' | 'hair' | 'glasses' | 'facial';

export function DuolingoAvatarCustomizer({
  isOpen,
  onClose,
  currentConfig,
  onSave,
}: DuolingoAvatarCustomizerProps) {
  const { user } = useAuth();
  const [config, setConfig] = useState<DuolingoAvatarConfig>(
    currentConfig || DEFAULT_DUOLINGO_AVATAR_CONFIG
  );
  const [activeTab, setActiveTab] = useState<TabType>('body');
  const [saving, setSaving] = useState(false);

  const updateConfig = (key: keyof DuolingoAvatarConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    setSaving(true);
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        toast.error('Profil non trouvé');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_config: config })
        .eq('id', profile.id);

      if (error) throw error;

      toast.success('✨ Avatar sauvegardé !', {
        description: 'Ton personnage a été mis à jour',
        duration: 3000
      });
      
      onSave?.(config);
      
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast.error('❌ Erreur', {
        description: 'Impossible de sauvegarder ton avatar',
        duration: 3000
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'body', label: 'Corps', icon: '👤' },
    { id: 'eyes', label: 'Yeux', icon: '👁️' },
    { id: 'hair', label: 'Cheveux', icon: '💇' },
    { id: 'glasses', label: 'Lunettes', icon: '👓' },
    { id: 'facial', label: 'Accessoires', icon: '🧔' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-2 sm:my-4 flex flex-col shadow-2xl min-h-[600px] max-h-[95vh]">
        {/* Header - Fixe en haut */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b shrink-0 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 text-center px-2">Crée ton avatar</h2>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-3 sm:px-4 py-2 bg-[#1CB0F6] text-white rounded-lg hover:bg-[#0A9BD6] disabled:opacity-50 transition-colors font-semibold text-xs sm:text-sm shrink-0"
          >
            {saving ? 'Sauvegarde...' : 'TERMINÉ'}
          </button>
        </div>

        {/* Preview - Plus petit pour laisser place aux options */}
        <div className="bg-gray-100 p-3 sm:p-4 flex justify-center border-b shrink-0 flex-shrink-0">
          <div className="relative transition-all duration-300 ease-in-out animate-pulse-subtle">
            <DuolingoAvatar 
              config={config}
              size={160}
              className="drop-shadow-lg"
            />
          </div>
        </div>

        {/* Tabs - Fixe et toujours visible */}
        <div className="flex border-b overflow-x-auto bg-white shrink-0 flex-shrink-0 sticky top-0 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 px-1 sm:px-2 py-2 sm:py-3 font-medium transition-all border-b-3 min-w-[60px] sm:min-w-[70px] shrink-0 ${
                activeTab === tab.id
                  ? 'text-[#1CB0F6] border-[#1CB0F6] bg-blue-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-transparent'
              }`}
              style={{
                borderBottomWidth: activeTab === tab.id ? '3px' : '0px',
              }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl leading-none">{tab.icon}</span>
              <span className="text-[10px] sm:text-xs leading-tight mt-0.5 text-center">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Options Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 min-h-0" style={{ maxHeight: 'calc(95vh - 380px)' }}>
          {activeTab === 'body' && (
            <div className="space-y-6">
              {/* Skin Color */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Couleur de peau</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                  {DUOLINGO_COLORS.skin.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('skinColor', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.skinColor === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, skinColor: option.value }}
                        size={80}
                        className="mx-auto mb-2"
                      />
                      <div 
                        className="w-full h-8 sm:h-10 rounded-lg border-2 border-gray-200 mb-1"
                        style={{ backgroundColor: option.value }}
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shirt Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Vêtement</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.shirtStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('shirtStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.shirtStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, shirtStyle: option.value as any }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shirt Color */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Couleur du vêtement</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                  {DUOLINGO_COLORS.shirt.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('shirtColor', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.shirtColor === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, shirtColor: option.value }}
                        size={75}
                        className="mx-auto mb-2"
                      />
                      <div 
                        className="w-full h-6 sm:h-8 rounded-lg border-2 border-gray-200 mb-1"
                        style={{ backgroundColor: option.value }}
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eyes' && (
            <div className="space-y-6">
              {/* Eye Color */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Couleur des yeux</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                  {DUOLINGO_COLORS.eyes.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('eyeColor', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.eyeColor === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, eyeColor: option.value }}
                        size={80}
                        className="mx-auto mb-2"
                      />
                      <div 
                        className="w-full h-6 sm:h-8 rounded-lg border-2 border-gray-200 mb-1"
                        style={{ backgroundColor: option.value }}
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Expression</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.eyeStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('eyeStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.eyeStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, eyeStyle: option.value as any }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mouth Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Bouche</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.mouthStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('mouthStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.mouthStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, mouthStyle: option.value as any }}
                        size={85}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hair' && (
            <div className="space-y-6">
              {/* Hair Color */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Couleur de cheveux principale</h3>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {DUOLINGO_COLORS.hair.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('hairColor', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.hairColor === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, hairColor: option.value }}
                        size={85}
                        className="mx-auto mb-2"
                      />
                      <div 
                        className="w-full h-6 sm:h-8 rounded-lg border-2 border-gray-200 mb-1"
                        style={{ backgroundColor: option.value }}
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Coupe de cheveux</h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.hairStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('hairStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.hairStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, hairStyle: option.value as any }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'glasses' && (
            <div className="space-y-6">
              {/* Glasses Color */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Couleur des lunettes</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                  {DUOLINGO_COLORS.glasses.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('glassesColor', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.glassesColor === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, glassesStyle: 'round', glassesColor: option.value }}
                        size={85}
                        className="mx-auto mb-2"
                      />
                      <div 
                        className="w-full h-6 sm:h-8 rounded-lg border-2 border-gray-200 mb-1"
                        style={{ backgroundColor: option.value }}
                      />
                      <p className="text-xs font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glasses Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Lunettes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.glassesStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('glassesStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.glassesStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, glassesStyle: option.value as any }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'facial' && (
            <div className="space-y-6">
              {/* Facial Hair */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Pilosité faciale</h3>
                <div className="grid grid-cols-3 gap-3">
                  {DUOLINGO_OPTIONS.facialHair.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('facialHair', option.value)}
                      className={`p-3 rounded-xl border-2 transition-all bg-white ${
                        config.facialHair === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, facialHair: option.value as any, facialHairColor: config.hairColor }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hat Style */}
              <div>
                <h3 className="font-semibold text-base mb-3 text-gray-900">Chapeau</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {DUOLINGO_OPTIONS.hatStyle.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateConfig('hatStyle', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all bg-white ${
                        config.hatStyle === option.value
                          ? 'border-[#1CB0F6] bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <DuolingoAvatar
                        config={{ ...config, hatStyle: option.value as any, hatColor: config.shirtColor }}
                        size={90}
                        className="mx-auto mb-2"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

