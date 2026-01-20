import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Camera, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadModalProps {
  userId: string;
  userName: string;
  currentAvatarUrl: string | null;
  currentInitialsColor?: string | null;
  onClose: () => void;
  onPhotoUpdate: (url: string | null) => void;
  onColorUpdate?: (color: string) => void;
}

export function PhotoUploadModal({ 
  userId, 
  userName, 
  currentAvatarUrl, 
  currentInitialsColor,
  onClose, 
  onPhotoUpdate,
  onColorUpdate
}: PhotoUploadModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>(currentInitialsColor || '');

  // Generate initials for preview
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 0) return '??';
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getGradient = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-green-600',
    ];
    return gradients[hash % gradients.length];
  };

  // Available colors for initials background
  const availableColors = [
    { value: '#3b82f6', label: 'Bleu', gradient: 'from-blue-500 to-blue-600' },
    { value: '#8b5cf6', label: 'Violet', gradient: 'from-purple-500 to-purple-600' },
    { value: '#10b981', label: 'Vert', gradient: 'from-green-500 to-green-600' },
    { value: '#f59e0b', label: 'Orange', gradient: 'from-orange-500 to-orange-600' },
    { value: '#ef4444', label: 'Rouge', gradient: 'from-red-500 to-red-600' },
    { value: '#ec4899', label: 'Rose', gradient: 'from-pink-500 to-pink-600' },
    { value: '#6366f1', label: 'Indigo', gradient: 'from-indigo-500 to-indigo-600' },
    { value: '#14b8a6', label: 'Turquoise', gradient: 'from-teal-500 to-teal-600' },
    { value: '#eab308', label: 'Jaune', gradient: 'from-yellow-500 to-yellow-600' },
    { value: '#06b6d4', label: 'Cyan', gradient: 'from-cyan-500 to-cyan-600' },
  ];

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setCameraStream(stream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Impossible d\'accéder à la caméra');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(blob));
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG ou WEBP.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image trop grande. Maximum 5MB.');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Delete old photo if exists
      if (currentAvatarUrl) {
        try {
          const urlParts = currentAvatarUrl.split('/');
          const fileName = urlParts[urlParts.length - 1].split('?')[0];
          if (fileName && fileName !== 'null') {
            await supabase.storage.from('avatars').remove([fileName]);
          }
        } catch (error) {
          console.warn('Error deleting old photo:', error);
        }
      }

      // Upload new photo
      const fileExt = selectedFile.name.split('.').pop() || 'jpg';
      const fileName = `${userId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, selectedFile, { 
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update database
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', userId);

      if (dbError) throw dbError;

      toast.success('Photo mise à jour!');
      onPhotoUpdate(publicUrl);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!currentAvatarUrl) return;

    setIsUploading(true);
    try {
      // Delete from storage
      try {
        const urlParts = currentAvatarUrl.split('/');
        const fileName = urlParts[urlParts.length - 1].split('?')[0];
        if (fileName && fileName !== 'null') {
          await supabase.storage.from('avatars').remove([fileName]);
        }
      } catch (error) {
        console.warn('Error deleting from storage:', error);
      }

      // Update database
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('Photo supprimée');
      onPhotoUpdate(null);
    } catch (error: any) {
      console.error('Remove error:', error);
      toast.error(error.message || 'Erreur lors de la suppression');
    } finally {
      setIsUploading(false);
    }
  };

  const handleColorSave = async () => {
    if (!selectedColor || !onColorUpdate) return;
    
    setIsUploading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_background_color: selectedColor })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('Couleur mise à jour!');
      onColorUpdate(selectedColor);
    } catch (error: any) {
      console.error('Color save error:', error);
      toast.error(error.message || 'Erreur lors de la sauvegarde');
    } finally {
      setIsUploading(false);
    }
  };

  const initials = getInitials(userName);
  const gradient = getGradient(userName);
  const displayColor = selectedColor || currentInitialsColor;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Photo de profil</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            disabled={isUploading}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-8 bg-gray-50 flex justify-center">
          {showCamera && videoRef.current ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              <button
                onClick={capturePhoto}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold"
              >
                Prendre la photo
              </button>
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div 
              className={`w-40 h-40 rounded-full ${displayColor ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center border-4 border-white shadow-lg`}
              style={displayColor ? { backgroundColor: displayColor } : undefined}
            >
              <span className="text-white text-5xl font-bold">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-5 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            capture="environment"
          />
          
          {/* Camera or Import buttons */}
          {!showCamera && !previewUrl && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startCamera}
                disabled={isUploading}
                className="flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold rounded-xl transition-colors"
              >
                <Camera className="w-5 h-5" />
                Prendre une photo
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-xl transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                Importer
              </button>
            </div>
          )}

          {!showCamera && previewUrl && (
            <button
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
              }}
              disabled={isUploading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold rounded-xl transition-colors"
            >
              Choisir une autre photo
            </button>
          )}

          {showCamera && (
            <button
              onClick={stopCamera}
              disabled={isUploading}
              className="w-full py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              Annuler
            </button>
          )}

          {/* Color picker for initials background (only if no photo) */}
          {!previewUrl && !currentAvatarUrl && (
            <div className="pt-3 border-t">
              <p className="text-sm font-semibold text-gray-700 mb-3">Couleur du fond</p>
              <div className="grid grid-cols-5 gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`
                      w-full h-12 rounded-lg border-2 transition-all
                      ${selectedColor === color.value || (!selectedColor && currentInitialsColor === color.value)
                        ? 'border-blue-500 ring-2 ring-blue-200 scale-110'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
              {selectedColor !== currentInitialsColor && (
                <button
                  onClick={handleColorSave}
                  disabled={isUploading}
                  className="w-full mt-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Sauvegarder la couleur
                </button>
              )}
            </div>
          )}

          {currentAvatarUrl && (
            <button
              onClick={handleRemove}
              disabled={isUploading}
              className="w-full py-3 bg-red-50 hover:bg-red-100 disabled:bg-red-50 text-red-600 font-semibold rounded-xl transition-colors"
            >
              {isUploading ? 'Suppression...' : 'Supprimer la photo'}
            </button>
          )}

          {selectedFile && !showCamera && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold rounded-xl transition-colors"
            >
              {isUploading ? 'Upload en cours...' : 'Sauvegarder'}
            </button>
          )}

          <button
            onClick={onClose}
            disabled={isUploading}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
