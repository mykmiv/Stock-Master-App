import React from 'react';
import { UserPlus } from 'lucide-react';
import { AvatarPreview, AvatarConfig } from './AvatarPreview';

interface Friend {
  id: string;
  username: string;
  avatarConfig: AvatarConfig | null;
}

interface FriendsListProps {
  friends: Friend[];
  onAddFriend: () => void;
}

export function FriendsList({ friends, onAddFriend }: FriendsListProps) {
  const maxSlots = 5;
  const slots = Array(maxSlots).fill(null).map((_, index) => friends[index] || null);

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">SÉRIES ENTRE AMIS</h2>
      <div className="flex gap-3">
        {slots.map((friend, index) => (
          <div key={index} className="flex-1">
            {friend ? (
              <div className="flex flex-col items-center gap-2">
                <AvatarPreview config={friend.avatarConfig} size="medium" />
                <span className="text-xs text-gray-600 text-center">{friend.username}</span>
              </div>
            ) : (
              <button
                onClick={onAddFriend}
                className="w-full aspect-square rounded-full border-3 border-dashed border-gray-300 flex items-center justify-center hover:border-[#1CB0F6] hover:bg-[#E6F7FF] transition-colors"
                style={{ borderWidth: '3px' }}
              >
                <UserPlus className="w-6 h-6 text-gray-400" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

