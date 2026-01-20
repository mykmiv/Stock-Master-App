import React, { useState, useEffect } from 'react';
import { Share2, Instagram, MessageCircle, Mail, Copy, X, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareSheet({ isOpen, onClose }: ShareSheetProps) {
  const { user, profile } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && user) {
      generateQRCode();
    }
  }, [isOpen, user]);

  const generateQRCode = async () => {
    if (!user) return;
    
    try {
      const shareUrl = `${window.location.origin}/join/${profile?.username || user.id}`;
      const qr = await QRCode.toDataURL(shareUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1CB0F6',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qr);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const shareUrl = user ? `${window.location.origin}/join/${profile?.username || user.id}` : '';
  const shareText = `Rejoins-moi sur StockMaster AI ! J'apprends le trading de manière fun et gamifiée. Utilise mon code: ${profile?.username || user?.id}`;

  const shareVia = {
    instagram: () => {
      if (navigator.share) {
        navigator.share({
          title: 'StockMaster AI',
          text: shareText,
          url: shareUrl
        }).catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(shareUrl + '\n\n' + shareText);
          toast.success('Lien copié ! Partagez-le sur Instagram');
        });
      } else {
        navigator.clipboard.writeText(shareUrl + '\n\n' + shareText);
        toast.success('Lien copié ! Partagez-le sur Instagram');
      }
    },
    
    snapchat: () => {
      const snapchatUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(shareUrl)}`;
      window.open(snapchatUrl, '_blank');
    },
    
    whatsapp: () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    },
    
    messenger: () => {
      if (navigator.share) {
        navigator.share({
          title: 'StockMaster AI',
          text: shareText,
          url: shareUrl
        });
      } else {
        const messengerUrl = `fb-messenger://share?link=${encodeURIComponent(shareUrl)}`;
        window.location.href = messengerUrl;
      }
    },
    
    sms: () => {
      const smsUrl = `sms:?&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.location.href = smsUrl;
    },
    
    email: () => {
      const emailUrl = `mailto:?subject=${encodeURIComponent('Rejoins-moi sur StockMaster AI')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      window.location.href = emailUrl;
    },
    
    copyLink: async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Lien copié !');
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error('Erreur lors de la copie');
      }
    }
  };

  if (!isOpen) return null;

  const ShareButton = ({ icon, label, onClick, color }: { icon: React.ReactNode; label: string; onClick: () => void; color: string }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors active:scale-95"
    >
      <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold">Inviter des amis</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Buttons Grid */}
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <ShareButton
              icon={<Instagram className="w-6 h-6" />}
              label="Instagram"
              onClick={shareVia.instagram}
              color="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <ShareButton
              icon={<MessageCircle className="w-6 h-6" />}
              label="Snapchat"
              onClick={shareVia.snapchat}
              color="bg-yellow-400"
            />
            <ShareButton
              icon={<MessageCircle className="w-6 h-6" />}
              label="WhatsApp"
              onClick={shareVia.whatsapp}
              color="bg-green-500"
            />
            <ShareButton
              icon={<MessageCircle className="w-6 h-6" />}
              label="Messenger"
              onClick={shareVia.messenger}
              color="bg-blue-500"
            />
            <ShareButton
              icon={<MessageCircle className="w-6 h-6" />}
              label="SMS"
              onClick={shareVia.sms}
              color="bg-green-600"
            />
            <ShareButton
              icon={<Mail className="w-6 h-6" />}
              label="Email"
              onClick={shareVia.email}
              color="bg-red-500"
            />
            <ShareButton
              icon={copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              label="Copier"
              onClick={shareVia.copyLink}
              color="bg-gray-500"
            />
            {navigator.share && (
              <ShareButton
                icon={<Share2 className="w-6 h-6" />}
                label="Partager"
                onClick={() => navigator.share({ title: 'StockMaster AI', text: shareText, url: shareUrl })}
                color="bg-indigo-500"
              />
            )}
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="bg-gray-100 p-6 rounded-xl mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Scannez pour me suivre</p>
              <div className="flex justify-center mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="rounded-lg shadow-lg" />
              </div>
              <div className="bg-white p-3 rounded-lg mb-3">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Ton lien d'invitation:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-gray-50 p-2 rounded break-all">{shareUrl}</code>
                  <button
                    onClick={shareVia.copyLink}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-600" />}
                  </button>
                </div>
              </div>
              {profile?.username && (
                <p className="text-xs text-center text-gray-500">@{profile.username}</p>
              )}
            </div>
          )}

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

