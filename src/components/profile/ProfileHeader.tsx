import React, { useState, useEffect } from 'react';
import { Settings, QrCode, UserPlus } from 'lucide-react';
import { ProfilePhoto } from './ProfilePhoto';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfileHeaderProps {
  username: string;
  displayName?: string;
  memberSince: Date;
  avatarUrl?: string | null;
  initialsColor?: string | null;
  followingCount?: number;
  followersCount?: number;
  onAddFriends?: () => void;
  onShowQR?: () => void;
  onFollowingClick?: () => void;
  onFollowersClick?: () => void;
}

export function ProfileHeader({
  username,
  displayName,
  memberSince,
  avatarUrl,
  initialsColor,
  followingCount = 0,
  followersCount = 0,
  onAddFriends,
  onShowQR,
  onFollowingClick,
  onFollowersClick,
}: ProfileHeaderProps) {
  const { user } = useAuth();
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(avatarUrl || null);
  const [currentInitialsColor, setCurrentInitialsColor] = useState<string | null>(initialsColor || null);

  useEffect(() => {
    setCurrentAvatarUrl(avatarUrl || null);
  }, [avatarUrl]);

  useEffect(() => {
    setCurrentInitialsColor(initialsColor || null);
  }, [initialsColor]);

  const handlePhotoUpdate = async (url: string | null) => {
    setCurrentAvatarUrl(url);
    // Optionally refresh profile data
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url, avatar_background_color')
        .eq('user_id', user.id)
        .single();
      if (data) {
        setCurrentAvatarUrl(data.avatar_url);
        setCurrentInitialsColor(data.avatar_background_color);
      }
    }
  };

  const handleColorUpdate = async (color: string) => {
    setCurrentInitialsColor(color);
    // Optionally refresh profile data
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_background_color')
        .eq('user_id', user.id)
        .single();
      if (data) {
        setCurrentInitialsColor(data.avatar_background_color);
      }
    }
  };

  const displayNameForPhoto = displayName || username;

  return (
    <div className="bg-gradient-to-b from-[#E6F7FF] to-white pb-4 sm:pb-6">
      {/* Top bar with settings */}
      <div className="flex items-center justify-between px-3 sm:px-4 pt-3 sm:pt-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate pr-2">{username}</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Avatar - Upload photo only */}
      <div className="flex justify-center mt-3 sm:mt-4">
        <ProfilePhoto
          userId={user?.id || ''}
          userName={displayNameForPhoto}
          avatarUrl={currentAvatarUrl}
          initialsColor={currentInitialsColor}
          onPhotoUpdate={handlePhotoUpdate}
          onColorUpdate={handleColorUpdate}
          size={140}
        />
      </div>

      {/* User info */}
      <div className="text-center mt-3 sm:mt-4 px-3">
        {displayName && (
          <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">{displayName}</p>
        )}
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          @{username.toLowerCase().replace(/\s+/g, '')} · MEMBRE DEPUIS {format(memberSince, 'yyyy').toUpperCase()}
        </p>
      </div>

      {/* Stats row - Abonnements et Abonnés centrés */}
      <div className="flex items-center justify-center gap-8 sm:gap-12 mt-4 sm:mt-6">
        <button
          onClick={onFollowingClick}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity touch-manipulation"
        >
          <span className="text-base sm:text-lg font-semibold text-gray-900">{followingCount}</span>
          <span className="text-[10px] sm:text-xs text-gray-600">Abonnements</span>
        </button>
        <button
          onClick={onFollowersClick}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity touch-manipulation"
        >
          <span className="text-base sm:text-lg font-semibold text-gray-900">{followersCount}</span>
          <span className="text-[10px] sm:text-xs text-gray-600">Abonnés</span>
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-3 sm:px-4">
        <button
          onClick={onAddFriends}
          className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 border-2 border-[#1CB0F6] text-[#1CB0F6] rounded-xl font-semibold hover:bg-[#E6F7FF] active:bg-[#D0EFFF] transition-colors touch-manipulation min-h-[44px]"
        >
          <UserPlus className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm whitespace-nowrap">AJOUTER DES AMIS</span>
        </button>
        <button
          onClick={onShowQR}
          className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-300 hover:border-gray-400 active:border-gray-500 transition-colors touch-manipulation flex-shrink-0"
        >
          <QrCode className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

