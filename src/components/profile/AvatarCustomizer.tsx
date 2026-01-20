import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AvatarPreview, AvatarConfig } from './AvatarPreview';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AvatarCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: AvatarConfig | null;
  onSave?: (config: AvatarConfig) => void;
}

type TabType = 'body' | 'eyes' | 'hair' | 'glasses' | 'accessories';

const skinTones = [
  { id: 'tone1', color: '#8B4513', name: 'Tone 1' },
  { id: 'tone2', color: '#A0522D', name: 'Tone 2' },
  { id: 'tone3', color: '#D2691E', name: 'Tone 3' },
  { id: 'tone4', color: '#CD853F', name: 'Tone 4' },
  { id: 'tone5', color: '#DEB887', name: 'Tone 5' },
  { id: 'tone6', color: '#F5DEB3', name: 'Tone 6' },
];

const bodyShapes = [
  { id: 'body1', name: 'Shirt 1', color: '#4A90E2' },
  { id: 'body2', name: 'Shirt 2', color: '#E74C3C' },
  { id: 'body3', name: 'Shirt 3', color: '#2ECC71' },
  { id: 'body4', name: 'Shirt 4', color: '#F39C12' },
  { id: 'body5', name: 'Shirt 5', color: '#9B59B6' },
  { id: 'body6', name: 'Shirt 6', color: '#34495E' },
];

const eyeShapes = [
  { id: 'eyes1', name: 'Round' },
  { id: 'eyes2', name: 'Oval' },
  { id: 'eyes3', name: 'Almond' },
];

const hairStyles = [
  { id: 'hair1', name: 'Style 1' },
  { id: 'hair2', name: 'Style 2' },
  { id: 'hair3', name: 'Style 3' },
  { id: 'hair4', name: 'Style 4' },
  { id: 'hair5', name: 'Style 5' },
];

const glassesOptions = [
  { id: 'none', name: 'Aucun' },
  { id: 'glasses1', name: 'Rondes' },
  { id: 'glasses2', name: 'Carrées' },
];

const accessories = [
  { id: 'hat1', name: 'Chapeau' },
  { id: 'beard1', name: 'Barbe' },
];

const eyeColors = [
  { id: 'brown', color: '#8B4513', name: 'Marron' },
  { id: 'blue', color: '#4169E1', name: 'Bleu' },
  { id: 'green', color: '#228B22', name: 'Vert' },
  { id: 'black', color: '#000000', name: 'Noir' },
];

const hairColors = [
  { id: 'black', color: '#000000', name: 'Noir' },
  { id: 'brown', color: '#8B4513', name: 'Brun' },
  { id: 'blonde', color: '#F5DEB3', name: 'Blond' },
  { id: 'red', color: '#DC143C', name: 'Rouge' },
];

export function AvatarCustomizer({ isOpen, onClose, currentConfig, onSave }: AvatarCustomizerProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('body');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(
    currentConfig || {
      skinTone: '#F5DEB3',
      bodyShape: 'body1',
      eyes: 'eyes1',
      eyeColor: '#000000',
      hair: 'hair1',
      hairColor: '#8B4513',
      glasses: 'none',
      accessories: [],
    }
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentConfig) {
      setAvatarConfig(currentConfig);
    }
  }, [currentConfig]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    setIsSaving(true);
    try {
      // Save to profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_config: avatarConfig })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Avatar sauvegardé !');
      onSave?.(avatarConfig);
      onClose();
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'body' as TabType, label: 'Corps', icon: '👕' },
    { id: 'eyes' as TabType, label: 'Yeux', icon: '👀' },
    { id: 'hair' as TabType, label: 'Cheveux', icon: '💇' },
    { id: 'glasses' as TabType, label: 'Lunettes', icon: '👓' },
    { id: 'accessories' as TabType, label: 'Accessoires', icon: '🎩' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md h-[90vh] max-h-[800px] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-bold text-lg">Crée ton avatar</h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-[#1CB0F6] font-semibold hover:text-[#0A9BD6] transition-colors disabled:opacity-50"
          >
            {isSaving ? '...' : 'TERMINÉ'}
          </button>
        </div>

        {/* Avatar Preview */}
        <div className="bg-[#F3F4F6] p-8 flex justify-center border-b">
          <AvatarPreview config={avatarConfig} size="large" />
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 min-w-[80px] px-3 py-3 text-sm font-medium
                transition-colors border-b-2
                ${activeTab === tab.id
                  ? 'border-[#1CB0F6] text-[#1CB0F6] bg-[#E6F7FF]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'body' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Couleur de peau</h3>
                <div className="flex gap-3 flex-wrap">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, skinTone: tone.color })}
                      className={`
                        w-12 h-12 rounded-full border-2 transition-all
                        ${avatarConfig.skinTone === tone.color
                          ? 'border-[#1CB0F6] scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                      style={{ backgroundColor: tone.color }}
                      title={tone.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Corps</h3>
                <div className="grid grid-cols-3 gap-3">
                  {bodyShapes.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, bodyShape: shape.id })}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${avatarConfig.bodyShape === shape.id
                          ? 'border-[#1CB0F6] bg-[#E6F7FF]'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div
                        className="w-full h-16 rounded-lg"
                        style={{ backgroundColor: shape.color }}
                      />
                      <p className="text-xs text-center mt-2 text-gray-600">{shape.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eyes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Forme des yeux</h3>
                <div className="grid grid-cols-3 gap-3">
                  {eyeShapes.map((eye) => (
                    <button
                      key={eye.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, eyes: eye.id })}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${avatarConfig.eyes === eye.id
                          ? 'border-[#1CB0F6] bg-[#E6F7FF]'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="w-full h-12 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300" />
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">{eye.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Couleur des yeux</h3>
                <div className="flex gap-3 flex-wrap">
                  {eyeColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, eyeColor: color.color })}
                      className={`
                        w-12 h-12 rounded-full border-2 transition-all
                        ${avatarConfig.eyeColor === color.color
                          ? 'border-[#1CB0F6] scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hair' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Style de cheveux</h3>
                <div className="grid grid-cols-3 gap-3">
                  {hairStyles.map((hair) => (
                    <button
                      key={hair.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, hair: hair.id })}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${avatarConfig.hair === hair.id
                          ? 'border-[#1CB0F6] bg-[#E6F7FF]'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="w-full h-12 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300" />
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">{hair.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Couleur des cheveux</h3>
                <div className="flex gap-3 flex-wrap">
                  {hairColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAvatarConfig({ ...avatarConfig, hairColor: color.color })}
                      className={`
                        w-12 h-12 rounded-full border-2 transition-all
                        ${avatarConfig.hairColor === color.color
                          ? 'border-[#1CB0F6] scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'glasses' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Lunettes</h3>
              <div className="grid grid-cols-3 gap-3">
                {glassesOptions.map((glasses) => (
                  <button
                    key={glasses.id}
                    onClick={() => setAvatarConfig({ ...avatarConfig, glasses: glasses.id })}
                    className={`
                      p-4 rounded-xl border-2 transition-all
                      ${avatarConfig.glasses === glasses.id
                        ? 'border-[#1CB0F6] bg-[#E6F7FF]'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="w-full h-12 flex items-center justify-center">
                      {glasses.id === 'none' ? (
                        <span className="text-gray-400 text-xs">Aucun</span>
                      ) : (
                        <div className="w-12 h-6 border-2 border-gray-400 rounded" />
                      )}
                    </div>
                    <p className="text-xs text-center mt-2 text-gray-600">{glasses.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'accessories' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Accessoires</h3>
              <div className="grid grid-cols-3 gap-3">
                {accessories.map((acc) => {
                  const isSelected = avatarConfig.accessories?.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        const current = avatarConfig.accessories || [];
                        const newAccessories = isSelected
                          ? current.filter((a) => a !== acc.id)
                          : [...current, acc.id];
                        setAvatarConfig({ ...avatarConfig, accessories: newAccessories });
                      }}
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${isSelected
                          ? 'border-[#1CB0F6] bg-[#E6F7FF]'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="w-full h-12 flex items-center justify-center">
                        <span className="text-2xl">{acc.id === 'hat1' ? '🎩' : '🧔'}</span>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">{acc.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

