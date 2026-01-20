import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AvatarRenderer } from './AvatarRenderer';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG } from '@/types/avatar';
import { AvatarOptionCard } from '../profile/AvatarOptionCard';
import { ColorOptionCard } from '../profile/ColorOptionCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig?: AvatarConfig;
  onSave?: (config: AvatarConfig) => void;
}

type TabType = 'face' | 'hair' | 'accessories' | 'outfit';

export function AvatarEditor({ 
  isOpen, 
  onClose, 
  currentConfig,
  onSave 
}: AvatarEditorProps) {
  const { user } = useAuth();
  const [config, setConfig] = useState<AvatarConfig>(currentConfig || DEFAULT_AVATAR_CONFIG);
  const [activeTab, setActiveTab] = useState<TabType>('face');
  const [saving, setSaving] = useState(false);

  const updateConfig = (key: keyof AvatarConfig, value: any) => {
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
    { id: 'accessories', label: 'Accessoires', icon: '👓' },
    { id: 'outfit', label: 'Tenue', icon: '👕' },
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
            <AvatarRenderer 
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
              {/* Face Shape */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Forme du visage</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['round', 'oval', 'square'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => updateConfig('face', shape)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        config.face === shape
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, face: shape }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{shape}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Teint</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['light', 'medium', 'tan', 'brown', 'dark'] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => updateConfig('skinTone', tone)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.skinTone === tone
                          ? 'border-[#1CB0F6] bg-blue-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, skinTone: tone }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{tone}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eyes */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Yeux</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['normal', 'focused', 'confident', 'relaxed', 'happy', 'wink'] as const).map((eye) => (
                    <button
                      key={eye}
                      onClick={() => updateConfig('eyes', eye)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.eyes === eye
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, eyes: eye }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{eye}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eyebrows */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Sourcils</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['neutral', 'confident', 'sharp', 'thick', 'thin'] as const).map((brow) => (
                    <button
                      key={brow}
                      onClick={() => updateConfig('eyebrows', brow)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.eyebrows === brow
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, eyebrows: brow }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{brow}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mouth */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Bouche</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['smile', 'neutral', 'focused', 'grin', 'surprised'] as const).map((mouth) => (
                    <button
                      key={mouth}
                      onClick={() => updateConfig('mouth', mouth)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.mouth === mouth
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, mouth }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{mouth}</p>
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
                <div className="grid grid-cols-3 gap-3">
                  {(['short', 'medium', 'long', 'curly', 'wavy', 'afro', 'bald', 'bun', 'ponytail'] as const).map((hair) => (
                    <button
                      key={hair}
                      onClick={() => updateConfig('hair', hair)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.hair === hair
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, hair }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{hair}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur de cheveux</h3>
                <div className="grid grid-cols-4 gap-3">
                  {(['black', 'brown', 'blonde', 'red', 'gray', 'blue', 'green', 'purple'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => updateConfig('hairColor', color)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.hairColor === color
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, hairColor: color }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{color}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beard */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Barbe</h3>
                <div className="grid grid-cols-6 gap-3">
                  {(['none', 'stubble', 'short', 'medium', 'full', 'goatee'] as const).map((beard) => (
                    <button
                      key={beard}
                      onClick={() => updateConfig('beard', beard)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.beard === beard
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, beard }}
                        size={60}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{beard}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessories' && (
            <div className="space-y-6">
              {/* Glasses */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Lunettes</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['none', 'round', 'square', 'aviator', 'wayfarer'] as const).map((glasses) => (
                    <button
                      key={glasses}
                      onClick={() => updateConfig('glasses', glasses)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.glasses === glasses
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, glasses }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{glasses}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hat */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Chapeau</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['none', 'cap', 'beanie', 'snapback', 'bucket'] as const).map((hat) => (
                    <button
                      key={hat}
                      onClick={() => updateConfig('hat', hat)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.hat === hat
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, hat }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{hat}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outfit' && (
            <div className="space-y-6">
              {/* Outfit */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Tenue</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['tshirt', 'hoodie', 'hoodie_dark', 'polo', 'suit', 'jacket'] as const).map((outfit) => (
                    <button
                      key={outfit}
                      onClick={() => updateConfig('outfit', outfit)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.outfit === outfit
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, outfit }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{outfit.replace('_', ' ')}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Accessoires Trading</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(['none', 'headset', 'laptop_badge', 'watch', 'necklace'] as const).map((accessory) => (
                    <button
                      key={accessory}
                      onClick={() => updateConfig('accessory', accessory)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        config.accessory === accessory
                          ? 'border-[#1CB0F6] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <AvatarRenderer
                        config={{ ...config, accessory }}
                        size={80}
                        className="mx-auto"
                      />
                      <p className="text-xs text-center mt-2 capitalize">{accessory.replace('_', ' ')}</p>
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

