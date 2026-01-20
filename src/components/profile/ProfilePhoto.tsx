import React, { useState } from 'react';
import { PhotoUploadModal } from './PhotoUploadModal';

interface ProfilePhotoProps {
  userId: string;
  userName: string;
  avatarUrl: string | null;
  initialsColor?: string | null;
  onPhotoUpdate: (url: string | null) => void;
  onColorUpdate?: (color: string) => void;
  size?: number;
  className?: string;
}

export function ProfilePhoto({ 
  userId, 
  userName, 
  avatarUrl,
  initialsColor,
  onPhotoUpdate,
  onColorUpdate,
  size = 160,
  className = ''
}: ProfilePhotoProps) {
  const [showModal, setShowModal] = useState(false);
  
  // Generate initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(p => p.length > 0);
    if (parts.length === 0) return '??';
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  
  // Generate consistent gradient based on name
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

  const initials = getInitials(userName);
  const gradient = getGradient(userName);

  return (
    <>
      <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
        {/* Profile Photo or Initials */}
        <button
          onClick={() => setShowModal(true)}
          className="relative rounded-full overflow-hidden group cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full h-full"
        >
          {avatarUrl ? (
            <>
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-semibold">Changer</span>
              </div>
            </>
          ) : (
            <div 
              className={`w-full h-full ${initialsColor ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center`}
              style={initialsColor ? { backgroundColor: initialsColor } : undefined}
            >
              <span 
                className="text-white font-bold"
                style={{ fontSize: size * 0.35 }}
              >
                {initials}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-semibold">Ajouter photo</span>
              </div>
            </div>
          )}
        </button>

        {/* Edit Button */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 border-4 border-white text-white flex items-center justify-center transition-all shadow-lg active:scale-95 z-10"
        >
          ✏️
        </button>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <PhotoUploadModal
          userId={userId}
          userName={userName}
          currentAvatarUrl={avatarUrl}
          currentInitialsColor={initialsColor}
          onClose={() => setShowModal(false)}
          onPhotoUpdate={(url) => {
            onPhotoUpdate(url);
            setShowModal(false);
          }}
          onColorUpdate={(color) => {
            onColorUpdate?.(color);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
