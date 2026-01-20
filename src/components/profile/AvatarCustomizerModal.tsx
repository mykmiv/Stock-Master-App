import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AvatarGenerator, DiceBearAvatarConfig } from './AvatarGenerator';
import { AvatarOptionCard } from './AvatarOptionCard';
import { ColorOptionCard } from './ColorOptionCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { debounce } from '@/utils/debounce';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: DiceBearAvatarConfig | null;
  onSave?: (config: DiceBearAvatarConfig) => void;
}

type TabType = 'skin' | 'hair' | 'face' | 'clothes' | 'accessories';

const defaultConfig: DiceBearAvatarConfig = {
  style: 'bigSmile', // Cartoon style like Duolingo
  seed: '',
  backgroundColor: ['b6e3f4'], // Light blue background
  skinColor: ['edb98a'],
  hairColor: ['a55728'],
  hair: ['short'], // For bigSmile
  eyes: ['happy'],
  eyebrows: ['default'],
  mouth: ['smile'],
  glasses: ['none'],
};

export function AvatarCustomizerModal({ 
  isOpen, 
  onClose, 
  currentConfig,
  onSave 
}: AvatarCustomizerModalProps) {
  const { user } = useAuth();
  const [config, setConfig] = useState<DiceBearAvatarConfig>(currentConfig || defaultConfig);
  const [activeTab, setActiveTab] = useState<TabType>('skin');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentConfig && (currentConfig.seed || currentConfig.style)) {
      setConfig({ ...defaultConfig, ...currentConfig });
    } else if (user) {
      setConfig({ ...defaultConfig, seed: user.id });
    }
  }, [currentConfig, user]);

  // Avatar options
  const options = {
    skinColor: [
      { value: 'tanned', label: 'Bronzé', color: '#FD9841' },
      { value: 'yellow', label: 'Jaune', color: '#F8D25C' },
      { value: 'pale', label: 'Pâle', color: '#FFDBB4' },
      { value: 'light', label: 'Clair', color: '#EDB98A' },
      { value: 'brown', label: 'Brun', color: '#D08B5B' },
      { value: 'darkBrown', label: 'Brun Foncé', color: '#AE5D29' },
      { value: 'black', label: 'Noir', color: '#614335' }
    ],
    
    hairColor: [
      { value: 'auburn', label: 'Auburn', color: '#A55728' },
      { value: 'black', label: 'Noir', color: '#2C1B18' },
      { value: 'blonde', label: 'Blond', color: '#B58143' },
      { value: 'blondeGolden', label: 'Blond Doré', color: '#D6B370' },
      { value: 'brown', label: 'Brun', color: '#724133' },
      { value: 'brownDark', label: 'Brun Foncé', color: '#4A312C' },
      { value: 'pastelPink', label: 'Rose', color: '#F59797' },
      { value: 'blue', label: 'Bleu', color: '#000fdb' },
      { value: 'platinum', label: 'Platine', color: '#ECDCBF' },
      { value: 'red', label: 'Rouge', color: '#C93305' }
    ],

    top: [
      { value: 'noHair', label: 'Chauve' },
      { value: 'eyepatch', label: 'Cache-Œil' },
      { value: 'hat', label: 'Chapeau' },
      { value: 'hijab', label: 'Hijab' },
      { value: 'turban', label: 'Turban' },
      { value: 'winterHat1', label: 'Bonnet' },
      { value: 'longHairBigHair', label: 'Grands Cheveux' },
      { value: 'longHairBob', label: 'Bob' },
      { value: 'longHairBun', label: 'Chignon' },
      { value: 'longHairCurly', label: 'Bouclés Longs' },
      { value: 'longHairCurvy', label: 'Courbes' },
      { value: 'longHairDreads', label: 'Dreadlocks' },
      { value: 'longHairFrida', label: 'Frida' },
      { value: 'longHairFro', label: 'Afro' },
      { value: 'longHairFroBand', label: 'Afro avec Bandeau' },
      { value: 'longHairMiaWallace', label: 'Mia Wallace' },
      { value: 'longHairShavedSides', label: 'Rasés sur les Côtés' },
      { value: 'longHairStraight', label: 'Longs et Droits' },
      { value: 'longHairStraight2', label: 'Longs et Droits 2' },
      { value: 'longHairStraightStrand', label: 'Longs Mèches' },
      { value: 'shortHairDreads01', label: 'Dreads Courts 1' },
      { value: 'shortHairDreads02', label: 'Dreads Courts 2' },
      { value: 'shortHairFrizzle', label: 'Frisés' },
      { value: 'shortHairShaggyMullet', label: 'Mullet' },
      { value: 'shortHairShortCurly', label: 'Courts Bouclés' },
      { value: 'shortHairShortFlat', label: 'Courts Plats' },
      { value: 'shortHairShortRound', label: 'Courts Ronds' },
      { value: 'shortHairShortWaved', label: 'Courts Ondulés' },
      { value: 'shortHairSides', label: 'Sur les Côtés' },
      { value: 'shortHairTheCaesar', label: 'César' },
      { value: 'shortHairTheCaesarSidePart', label: 'César avec Raie' }
    ],

    facialHair: [
      { value: 'blank', label: 'Aucun' },
      { value: 'beardMedium', label: 'Barbe Moyenne' },
      { value: 'beardLight', label: 'Barbe Légère' },
      { value: 'beardMajestic', label: 'Barbe Majestueuse' },
      { value: 'moustacheFancy', label: 'Moustache Élégante' },
      { value: 'moustacheMagnum', label: 'Moustache Magnum' }
    ],

    eyes: [
      { value: 'default', label: 'Normal' },
      { value: 'close', label: 'Fermés' },
      { value: 'cry', label: 'Pleurs' },
      { value: 'dizzy', label: 'Étourdi' },
      { value: 'eyeRoll', label: 'Yeux au Ciel' },
      { value: 'happy', label: 'Heureux' },
      { value: 'hearts', label: 'Cœurs' },
      { value: 'side', label: 'Sur le Côté' },
      { value: 'squint', label: 'Plissés' },
      { value: 'surprised', label: 'Surpris' },
      { value: 'wink', label: 'Clin d\'Œil' },
      { value: 'winkWacky', label: 'Clin d\'Œil Farfelu' }
    ],

    eyebrows: [
      { value: 'default', label: 'Normal' },
      { value: 'defaultNatural', label: 'Naturel' },
      { value: 'angry', label: 'En Colère' },
      { value: 'angryNatural', label: 'En Colère Naturel' },
      { value: 'flatNatural', label: 'Plats' },
      { value: 'raisedExcited', label: 'Relevés Excités' },
      { value: 'raisedExcitedNatural', label: 'Relevés Excités Naturel' },
      { value: 'sadConcerned', label: 'Tristes Préoccupés' },
      { value: 'sadConcernedNatural', label: 'Tristes Préoccupés Naturel' },
      { value: 'unibrowNatural', label: 'Monosourcil' },
      { value: 'upDown', label: 'Haut Bas' },
      { value: 'upDownNatural', label: 'Haut Bas Naturel' }
    ],

    mouth: [
      { value: 'default', label: 'Normal' },
      { value: 'concerned', label: 'Préoccupé' },
      { value: 'disbelief', label: 'Incrédulité' },
      { value: 'eating', label: 'Mange' },
      { value: 'grimace', label: 'Grimace' },
      { value: 'sad', label: 'Triste' },
      { value: 'screamOpen', label: 'Crie' },
      { value: 'serious', label: 'Sérieux' },
      { value: 'smile', label: 'Sourire' },
      { value: 'tongue', label: 'Langue' },
      { value: 'twinkle', label: 'Étincelle' },
      { value: 'vomit', label: 'Malade' }
    ],

    clothing: [
      { value: 'blazerShirt', label: 'Blazer + Chemise' },
      { value: 'blazerSweater', label: 'Blazer + Pull' },
      { value: 'collarSweater', label: 'Pull avec Col' },
      { value: 'graphicShirt', label: 'T-Shirt Graphique' },
      { value: 'hoodie', label: 'Hoodie' },
      { value: 'overall', label: 'Salopette' },
      { value: 'shirtCrewNeck', label: 'Col Rond' },
      { value: 'shirtScoopNeck', label: 'Col Arrondi' },
      { value: 'shirtVNeck', label: 'Col en V' }
    ],

    clothingColor: [
      { value: 'black', label: 'Noir', color: '#262E33' },
      { value: 'blue01', label: 'Bleu', color: '#65C9FF' },
      { value: 'blue02', label: 'Bleu Foncé', color: '#5199E4' },
      { value: 'blue03', label: 'Bleu Marine', color: '#25557C' },
      { value: 'gray01', label: 'Gris', color: '#E6E6E6' },
      { value: 'gray02', label: 'Gris Foncé', color: '#929598' },
      { value: 'heather', label: 'Heather', color: '#3C4F5C' },
      { value: 'pastelBlue', label: 'Bleu Pastel', color: '#B1E2FF' },
      { value: 'pastelGreen', label: 'Vert Pastel', color: '#A7FFC4' },
      { value: 'pastelOrange', label: 'Orange Pastel', color: '#FFDEB5' },
      { value: 'pastelRed', label: 'Rouge Pastel', color: '#FFAFB9' },
      { value: 'pastelYellow', label: 'Jaune Pastel', color: '#FFFFB1' },
      { value: 'pink', label: 'Rose', color: '#FF488E' },
      { value: 'red', label: 'Rouge', color: '#FF5C5C' },
      { value: 'white', label: 'Blanc', color: '#FFFFFF' }
    ],

    accessories: [
      { value: 'blank', label: 'Aucun' },
      { value: 'kurt', label: 'Kurt (Lunettes de Soleil)' },
      { value: 'prescription01', label: 'Lunettes 1' },
      { value: 'prescription02', label: 'Lunettes 2' },
      { value: 'round', label: 'Rondes' },
      { value: 'sunglasses', label: 'Lunettes de Soleil' },
      { value: 'wayfarers', label: 'Wayfarers' }
    ]
  };

  // Debounced auto-save
  const debouncedSave = debounce(async (configToSave: DiceBearAvatarConfig) => {
    if (!user) return;

    try {
      // Ensure seed is set
      if (!configToSave.seed) {
        configToSave.seed = user.id;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      await supabase
        .from('profiles')
        .update({ avatar_config: configToSave })
        .eq('id', profile.id);
    } catch (error) {
      console.error('Error auto-saving avatar:', error);
    }
  }, 1000);

  const updateConfig = (key: keyof DiceBearAvatarConfig, value: string[]) => {
    const newConfig: DiceBearAvatarConfig = { 
      ...config, 
      [key]: value,
      seed: config.seed || user?.id || 'default',
      style: config.style || 'bigSmile',
      // For bigSmile compatibility, map top to hair
      ...(key === 'top' && { hair: value }),
    };
    setConfig(newConfig);
    debouncedSave(newConfig);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    setSaving(true);
    try {
      // Ensure seed is set
      const configToSave = {
        ...config,
        seed: config.seed || user.id,
        style: config.style || 'bigSmile',
      };

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
        .update({ avatar_config: configToSave })
        .eq('id', profile.id);

      if (error) throw error;

      toast.success('✨ Avatar sauvegardé !', {
        description: 'Ton avatar a été mis à jour avec succès',
        duration: 3000
      });
      onSave?.(configToSave);
      
      // Close modal after short delay for better UX
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
    { id: 'skin', label: 'Peau', icon: '🎨' },
    { id: 'hair', label: 'Cheveux', icon: '💇' },
    { id: 'face', label: 'Visage', icon: '😊' },
    { id: 'clothes', label: 'Vêtements', icon: '👕' },
    { id: 'accessories', label: 'Accessoires', icon: '👓' },
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
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex justify-center border-b relative">
          <div className="relative transition-all duration-300 ease-in-out">
            <AvatarGenerator 
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
          {activeTab === 'skin' && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur de peau</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {options.skinColor.map((option) => (
                  <ColorOptionCard
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    color={option.color}
                    isSelected={config.skinColor?.[0] === option.value}
                    onClick={() => updateConfig('skinColor', [option.value])}
                    previewConfig={{
                      ...config,
                        skinColor: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hair' && (
            <div className="space-y-6">
              {/* Hairstyles */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Coiffure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.top.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.top?.[0] === option.value}
                      onClick={() => updateConfig('top', [option.value])}
                      previewConfig={{
                        ...config,
                        top: [option.value],
                        hair: [option.value], // For bigSmile compatibility
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Hair Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur de cheveux</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {options.hairColor.map((option) => (
                    <ColorOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      color={option.color}
                      isSelected={config.hairColor?.[0] === option.value}
                      onClick={() => updateConfig('hairColor', [option.value])}
                      previewConfig={{
                        ...config,
                        hairColor: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'avataaars',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Facial Hair */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Barbe/Moustache</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.facialHair.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.facialHair?.[0] === option.value}
                      onClick={() => updateConfig('facialHair', [option.value])}
                      previewConfig={{
                        ...config,
                        facialHair: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'face' && (
            <div className="space-y-6">
              {/* Eyes */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Yeux</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.eyes.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.eyes?.[0] === option.value}
                      onClick={() => updateConfig('eyes', [option.value])}
                      previewConfig={{
                        ...config,
                        eyes: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Eyebrows */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Sourcils</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.eyebrows.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.eyebrows?.[0] === option.value}
                      onClick={() => updateConfig('eyebrows', [option.value])}
                      previewConfig={{
                        ...config,
                        eyebrows: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Mouth */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Bouche</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.mouth.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.mouth?.[0] === option.value}
                      onClick={() => updateConfig('mouth', [option.value])}
                      previewConfig={{
                        ...config,
                        mouth: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clothes' && (
            <div className="space-y-6">
              {/* Clothing */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Vêtements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {options.clothing.map((option) => (
                    <AvatarOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      isSelected={config.clothing?.[0] === option.value}
                      onClick={() => updateConfig('clothing', [option.value])}
                      previewConfig={{
                        ...config,
                        clothing: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Clothing Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Couleur</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {options.clothingColor.map((option) => (
                    <ColorOptionCard
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      color={option.color}
                      isSelected={config.clothingColor?.[0] === option.value}
                      onClick={() => updateConfig('clothingColor', [option.value])}
                      previewConfig={{
                        ...config,
                        clothingColor: [option.value],
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessories' && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Lunettes/Accessoires</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {options.accessories.map((option) => (
                  <AvatarOptionCard
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={config.accessories?.[0] === option.value}
                    onClick={() => updateConfig('accessories', [option.value])}
                    previewConfig={{
                      ...config,
                        accessories: [option.value],
                        glasses: [option.value], // For bigSmile
                        seed: config.seed || user?.id || 'default',
                        style: config.style || 'bigSmile',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


