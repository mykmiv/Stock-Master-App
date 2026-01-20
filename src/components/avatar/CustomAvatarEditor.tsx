import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CustomAvatar } from './CustomAvatar';
import { CustomAvatarConfig, DEFAULT_CUSTOM_AVATAR_CONFIG, COLORS } from '@/types/customAvatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CustomAvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig?: CustomAvatarConfig;
  onSave?: (config: CustomAvatarConfig) => void;
}

type TabType = 'face' | 'hair' | 'clothes' | 'accessories';

export function CustomAvatarEditor({ 
  isOpen, 
  onClose, 
  currentConfig,
  onSave 
}: CustomAvatarEditorProps) {
  const { user } = useAuth();
  const [config, setConfig] = useState<CustomAvatarConfig>(currentConfig || DEFAULT_CUSTOM_AVATAR_CONFIG);
  const [activeTab, setActiveTab] = useState<TabType>('face');
  const [saving, setSaving] = useState(false);

  const updateConfig = (key: keyof CustomAvatarConfig, value: any) => {
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
        description: 'Ton avatar a été mis à jour avec succès',
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
    { id: 'face', label: 'Visage', icon: '😊' },
    { id: 'hair', label: 'Cheveux', icon: '💇' },
    { id: 'clothes', label: 'Vêtements', icon: '👕' },
    { id: 'accessories', label: 'Accessoires', icon: '👓' },
  ];

  const hairOptions = [
    { type: 'bald' as const, label: 'Chauve' },
    { type: 'short' as const, label: 'Court' },
    { type: 'curly' as const, label: 'Bouclé' },
    { type: 'long' as const, label: 'Long' },
    { type: 'bun' as const, label: 'Chignon' },
    { type: 'ponytail' as const, label: 'Queue' },
    { type: 'afro' as const, label: 'Afro' },
    { type: 'wavy' as const, label: 'Ondulé' },
  ];

  const eyeOptions = [
    { type: 'normal' as const, label: 'Normal' },
    { type: 'happy' as const, label: 'Joyeux' },
    { type: 'wink' as const, label: 'Clin' },
    { type: 'closed' as const, label: 'Fermé' },
    { type: 'surprised' as const, label: 'Surpris' },
  ];

  const mouthOptions = [
    { type: 'smile' as const, label: 'Sourire' },
    { type: 'bigSmile' as const, label: 'Grand' },
    { type: 'neutral' as const, label: 'Neutre' },
    { type: 'sad' as const, label: 'Triste' },
    { type: 'surprised' as const, label: 'Surpris' },
  ];

  const accessoryOptions = [
    { type: 'none' as const, label: 'Aucun' },
    { type: 'glasses' as const, label: 'Lunettes' },
    { type: 'sunglasses' as const, label: 'Soleil' },
    { type: 'hat' as const, label: 'Chapeau' },
    { type: 'cap' as const, label: 'Casquette' },
    { type: 'headset' as const, label: 'Casque' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold">Crée ton avatar</h2>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#1CB0F6] text-white rounded-lg hover:bg-[#0A9BD6] disabled:opacity-50 transition-colors font-semibold"
          >
            {saving ? 'Sauvegarde...' : 'TERMINÉ'}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex justify-center border-b">
          <div className="relative transition-all duration-300 ease-in-out">
            <CustomAvatar 
              config={config}
              size={200}
              className="rounded-full border-4 border-white shadow-xl"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#1CB0F6] border-[#1CB0F6] bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'face' && (
            <div className="space-y-6">
              {/* Skin Color */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur de peau</h3>
                <div className="grid grid-cols-5 gap-3">
                  {COLORS.skin.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateConfig('skinColor', color.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.skinColor === color.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CustomAvatar
                        config={{ ...config, skinColor: color.value }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eyes */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Yeux</h3>
                <div className="grid grid-cols-5 gap-3">
                  {eyeOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => updateConfig('eyeType', option.type)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.eyeType === option.type
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CustomAvatar
                        config={{ ...config, eyeType: option.type }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mouth */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Bouche</h3>
                <div className="grid grid-cols-5 gap-3">
                  {mouthOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => updateConfig('mouthType', option.type)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.mouthType === option.type
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CustomAvatar
                        config={{ ...config, mouthType: option.type }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hair' && (
            <div className="space-y-6">
              {/* Hair Style */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Coiffure</h3>
                <div className="grid grid-cols-4 gap-3">
                  {hairOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => updateConfig('hairType', option.type)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.hairType === option.type
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CustomAvatar
                        config={{ ...config, hairType: option.type }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur de cheveux</h3>
                <div className="grid grid-cols-5 gap-3">
                  {COLORS.hair.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateConfig('hairColor', color.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.hairColor === color.value
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CustomAvatar
                        config={{ ...config, hairColor: color.value }}
                        size={60}
                        className="mx-auto"
                      />
                      <div 
                        className="w-full h-6 rounded mt-2"
                        style={{ backgroundColor: color.value }}
                      />
                      <p className="text-xs text-center mt-1">{color.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clothes' && (
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur du vêtement</h3>
              <div className="grid grid-cols-3 gap-3">
                {COLORS.shirt.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateConfig('shirtColor', color.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.shirtColor === color.value
                        ? 'border-[#1CB0F6] bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CustomAvatar
                      config={{ ...config, shirtColor: color.value }}
                      size={100}
                      className="mx-auto"
                    />
                    <div 
                      className="w-full h-8 rounded mt-2 border border-gray-200"
                      style={{ backgroundColor: color.value }}
                    />
                    <p className="text-xs text-center mt-1 font-medium">{color.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'accessories' && (
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Accessoires</h3>
              <div className="grid grid-cols-3 gap-3">
                {accessoryOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => updateConfig('accessory', option.type)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      config.accessory === option.type
                        ? 'border-[#1CB0F6] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CustomAvatar
                      config={{ ...config, accessory: option.type }}
                      size={100}
                      className="mx-auto"
                    />
                    <p className="text-xs text-center mt-2">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

