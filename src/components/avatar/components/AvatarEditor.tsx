import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AvatarConfig, DEFAULT_AVATAR_CONFIG, HAIR_COLORS } from '@/types/avatarConfig';
import { AvatarPreview } from './AvatarPreview';
import { BaseAvatarSelector } from './BaseAvatarSelector';
import { HairSelector } from './HairSelector';
import { ColorPicker } from './ColorPicker';
import { AccessoryToggle } from './AccessoryToggle';
import { TopSelector } from './TopSelector';

interface AvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig?: AvatarConfig | null;
  onSave?: (config: AvatarConfig) => void;
}

type TabType = 'base' | 'hair' | 'accessory' | 'top';

/**
 * Production Avatar Editor Component
 * Full-featured editor with tabbed interface
 */
export function AvatarEditor({
  isOpen,
  onClose,
  currentConfig,
  onSave,
}: AvatarEditorProps) {
  const [config, setConfig] = useState<AvatarConfig>(
    currentConfig || DEFAULT_AVATAR_CONFIG
  );
  const [activeTab, setActiveTab] = useState<TabType>('base');
  const [saving, setSaving] = useState(false);

  const updateConfig = (updates: Partial<AvatarConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      onSave?.(config);
      setTimeout(() => {
        onClose();
      }, 300);
    } catch (error) {
      console.error('Error saving avatar:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'base', label: 'Base', icon: '👤' },
    { id: 'hair', label: 'Cheveux', icon: '💇' },
    { id: 'accessory', label: 'Accessoire', icon: '👓' },
    { id: 'top', label: 'Haut', icon: '👕' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-2 sm:my-4 flex flex-col shadow-2xl min-h-[600px] max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b shrink-0">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 text-center px-2">
            Crée ton avatar
          </h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 sm:px-4 py-2 bg-[#1CB0F6] text-white rounded-lg hover:bg-[#0A9BD6] disabled:opacity-50 transition-colors font-semibold text-xs sm:text-sm shrink-0"
          >
            {saving ? 'Sauvegarde...' : 'TERMINÉ'}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 p-3 sm:p-4 flex justify-center border-b shrink-0">
          <AvatarPreview config={config} size={160} className="drop-shadow-lg" />
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto bg-white shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 px-1 sm:px-2 py-2 sm:py-3 font-medium transition-all border-b-3 min-w-[60px] sm:min-w-[70px] shrink-0
                ${activeTab === tab.id
                  ? 'text-[#1CB0F6] border-[#1CB0F6] bg-blue-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-transparent'
                }
              `}
              style={{
                borderBottomWidth: activeTab === tab.id ? '3px' : '0px',
              }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl leading-none">
                {tab.icon}
              </span>
              <span className="text-[10px] sm:text-xs leading-tight mt-0.5 text-center">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50 min-h-0 space-y-6">
          {activeTab === 'base' && (
            <BaseAvatarSelector
              selectedBaseId={config.baseId}
              onSelect={(baseId) => updateConfig({ baseId })}
              currentConfig={{
                hairId: config.hairId,
                hairColor: config.hairColor,
                accessoryEnabled: config.accessoryEnabled,
                topId: config.topId,
              }}
            />
          )}

          {activeTab === 'hair' && (
            <>
              <HairSelector
                selectedHairId={config.hairId}
                hairColor={config.hairColor}
                onSelect={(hairId) => updateConfig({ hairId })}
                currentConfig={{
                  baseId: config.baseId,
                  accessoryEnabled: config.accessoryEnabled,
                  topId: config.topId,
                }}
              />
              <ColorPicker
                selectedColor={config.hairColor}
                onSelect={(color) => updateConfig({ hairColor: color })}
                colors={HAIR_COLORS}
                title="Couleur de cheveux"
              />
            </>
          )}

          {activeTab === 'accessory' && (
            <AccessoryToggle
              enabled={config.accessoryEnabled}
              onToggle={(enabled) => updateConfig({ accessoryEnabled: enabled })}
              currentConfig={{
                baseId: config.baseId,
                hairId: config.hairId,
                hairColor: config.hairColor,
                topId: config.topId,
              }}
            />
          )}

          {activeTab === 'top' && (
            <TopSelector
              selectedTopId={config.topId}
              onSelect={(topId) => updateConfig({ topId })}
              currentConfig={{
                baseId: config.baseId,
                hairId: config.hairId,
                hairColor: config.hairColor,
                accessoryEnabled: config.accessoryEnabled,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
