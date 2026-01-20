import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserStats } from '@/hooks/useUserStats';
import { useLeague } from '@/hooks/useLeague';
import { useStreak } from '@/hooks/useStreak';
import { useAchievements } from '@/hooks/useAchievements';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';
import { ProfileCompletionCard } from './ProfileCompletionCard';
import { FriendsList } from './FriendsList';
import { AchievementsSection } from './AchievementsSection';
import { MonthlyBadges } from './MonthlyBadges';
import { SafeComponent } from './SafeComponent';
import { UserSearch } from './UserSearch';
import { ShareSheet } from './ShareSheet';
import { FollowersList } from './FollowersList';
import { Leaderboard } from './Leaderboard';
import { UpgradeSection } from './UpgradeSection';
import { ProFeaturesGrid } from './ProFeaturesGrid';
import { useSubscription } from '@/hooks/useSubscription';
import { AvatarConfig } from './AvatarPreview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trophy, Rocket, ArrowRight } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { stats } = useUserStats();
  const { userLeague } = useLeague();
  const { updateStreak, currentStreak } = useStreak();
  const { achievements, loading: achievementsLoading } = useAchievements();
  const { tier, subscribed } = useSubscription();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCustomAvatarEditorOpen, setIsCustomAvatarEditorOpen] = useState(false);
  const [isSimpleCustomAvatarEditorOpen, setIsSimpleCustomAvatarEditorOpen] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | null>(null);
  const [diceBearConfig, setDiceBearConfig] = useState<DiceBearAvatarConfig | null>(null);
  const [customAvatarConfig, setCustomAvatarConfig] = useState<CustomAvatarConfig | null>(null);
  const [simpleCustomAvatarConfig, setSimpleCustomAvatarConfig] = useState<SimpleCustomAvatarConfig | null>(null);
  const [isDuolingoAvatarCustomizerOpen, setIsDuolingoAvatarCustomizerOpen] = useState(false);
  const [duolingoAvatarConfig, setDuolingoAvatarConfig] = useState<DuolingoAvatarConfig | null>(null);
  const [isNewAvatarEditorOpen, setIsNewAvatarEditorOpen] = useState(false);
  const [newAvatarConfig, setNewAvatarConfig] = useState<AvatarConfig | null>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [friendCode, setFriendCode] = useState('');
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);


  useEffect(() => {
    if (user) {
      fetchFriends();
      fetchFollowCounts();
    }
  }, [user, profile]);

  // Scroll to upgrade section if hash is present
  useEffect(() => {
    if (window.location.hash === '#upgrade') {
      setTimeout(() => {
        const element = document.getElementById('upgrade');
        if (element) {
          // Get element position and dimensions
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          const elementHeight = element.offsetHeight;
          
          // Get viewport dimensions
          const viewportHeight = window.innerHeight;
          const bottomNavHeight = 80; // Height of bottom navigation bar
          const topPadding = 20; // Small padding from top
          
          // Calculate available visible area (excluding bottom nav)
          const availableHeight = viewportHeight - bottomNavHeight - topPadding;
          
          // Calculate center position - element should be perfectly centered
          const centerOffset = (availableHeight - elementHeight) / 2;
          
          // Scroll to position element perfectly centered
          const targetScroll = elementTop - topPadding - centerOffset;
          
          window.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth'
          });
        }
      }, 700); // Increased delay to ensure page is fully rendered
    }
  }, []);

  const fetchFriends = async () => {
    if (!user) return;
    try {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) return;

      const { data } = await supabase
        .from('friendships')
        .select(`
          friend:profiles!friendships_friend_id_fkey(
            id, username, display_name, avatar_config
          )
        `)
        .eq('user_id', currentProfile.id)
        .eq('status', 'accepted')
        .limit(5);

      if (data) {
        setFriends(data.map((f: any) => ({
          id: f.friend.id,
          username: f.friend.username,
          display_name: f.friend.display_name,
          avatarConfig: f.friend.avatar_config,
        })));
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchFollowCounts = async () => {
    if (!profile) return;
    setFollowingCount((profile as any).following_count || 0);
    setFollowersCount((profile as any).followers_count || 0);
  };

  const handleSaveAvatar = async (config: AvatarConfig | DiceBearAvatarConfig) => {
    setAvatarConfig(config as AvatarConfig);
    if ((config as DiceBearAvatarConfig).seed || (config as DiceBearAvatarConfig).style) {
      setDiceBearConfig(config as DiceBearAvatarConfig);
    }
    await refreshProfile();
    if (profile?.avatar_config) {
      const updatedConfig = profile.avatar_config as any;
      setAvatarConfig(updatedConfig as AvatarConfig);
      if (updatedConfig.seed || updatedConfig.style) {
        setDiceBearConfig(updatedConfig as DiceBearAvatarConfig);
      }
    }
  };

  const calculateProfileCompletion = () => {
    let steps = 0;
    if (!avatarConfig) steps++;
    if (!profile?.username) steps++;
    // Add more completion checks as needed
    return steps;
  };

  const handleAddFriend = async () => {
    if (!friendCode.trim()) {
      toast.error('Veuillez entrer un code ami');
      return;
    }

    if (!user) return;

    try {
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!currentProfile) return;

      // Find friend by friend_code or username
      const { data: friendProfile, error: findError } = await supabase
        .from('profiles')
        .select('id')
        .or(`friend_code.eq.${friendCode},username.eq.${friendCode}`)
        .single();

      if (findError || !friendProfile) {
        toast.error('Utilisateur non trouvé');
        return;
      }

      if (friendProfile.id === currentProfile.id) {
        toast.error('Vous ne pouvez pas vous ajouter vous-même');
        return;
      }

      const { error: insertError } = await supabase
        .from('friendships')
        .insert({
          user_id: currentProfile.id,
          friend_id: friendProfile.id,
          status: 'accepted'
        });

      if (insertError) {
        if (insertError.code === '23505') {
          toast.info('Vous suivez déjà cet utilisateur');
        } else {
          throw insertError;
        }
      } else {
        toast.success('Ami ajouté !');
        await fetchFriends();
        await fetchFollowCounts();
      }
      
      setIsAddFriendOpen(false);
      setFriendCode('');
    } catch (error) {
      console.error('Error adding friend:', error);
      toast.error('Erreur lors de l\'ajout');
    }
  };


  // Show loading only while auth is loading (with timeout fallback)
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    if (authLoading) {
      const timeout = setTimeout(() => {
        console.warn('Auth loading timeout - proceeding anyway');
        setLoadingTimeout(true);
      }, 5000); // 5 second timeout
      return () => clearTimeout(timeout);
    }
  }, [authLoading]);

  if (authLoading && !loadingTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CB0F6] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
          <p className="text-xs text-gray-400 mt-2">Si cela prend trop de temps, vérifiez votre connexion</p>
        </div>
      </div>
    );
  }

  // If no user, show message (ProtectedRoute should handle redirect, but just in case)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center p-6">
          <p className="text-gray-600 mb-4">Vous devez être connecté pour voir votre profil.</p>
          <a href="/auth" className="text-[#1CB0F6] hover:underline">Se connecter</a>
        </div>
      </div>
    );
  }

  // If user exists but no profile yet, create a default profile object
  const displayProfile = profile || {
    id: user.id,
    user_id: user.id,
    username: user.email?.split('@')[0] || 'Utilisateur',
    avatar_url: null,
    level: 'beginner' as const,
    xp: 0,
    streak_days: 0,
    last_activity_date: null,
    onboarding_completed: false,
    readiness_score: 0,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const username = displayProfile.username || user.email?.split('@')[0] || 'Utilisateur';
  const memberSince = displayProfile.created_at ? new Date(displayProfile.created_at) : new Date();
  const streakDays = currentStreak || stats?.current_streak_days || displayProfile.streak_days || 0;
  const totalXP = stats?.total_xp || displayProfile.xp || 0;
  const achievementsCount = achievements.filter(a => !!a.unlocked_at).length;
  const leaderboardPosition = userLeague?.total_first_place_finishes || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 sm:pb-28">
      <ProfileHeader
        username={username}
        displayName={(displayProfile as any).display_name || undefined}
        memberSince={memberSince}
        avatarUrl={displayProfile?.avatar_url || null}
        initialsColor={(displayProfile as any).avatar_background_color || null}
        followingCount={followingCount}
        followersCount={followersCount}
        onAddFriends={() => setIsSearchOpen(true)}
        onShowQR={() => setIsShareOpen(true)}
        onFollowingClick={() => setIsFollowingOpen(true)}
        onFollowersClick={() => setIsFollowersOpen(true)}
      />

      {/* Upgrade Section - Show different content based on tier */}
      {tier !== 'elite' && (
        <div id="upgrade" className="px-3 sm:px-4 scroll-mt-24 sm:scroll-mt-32">
          <UpgradeSection
            currentTier={tier}
            onUpgrade={() => {
              // Navigate to pricing page or open payment modal
              window.location.href = '/pricing';
            }}
          />
        </div>
      )}

      <ProfileStats
        streakDays={streakDays}
        totalXP={totalXP}
        achievementsCount={achievementsCount}
        leaderboardPosition={leaderboardPosition}
        onLeaderboardClick={() => setIsLeaderboardOpen(true)}
      />

      {/* Go Live - Advanced Feature */}
      <div className="px-4 py-4">
        <button
          onClick={() => navigate('/bridge')}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200/50 hover:border-orange-300 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Rocket className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="text-base font-bold text-gray-900">Go Live</div>
              <div className="text-xs text-gray-600">Live Trading & Broker Setup</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* PRO Features Grid - 4 carrés */}
      <ProFeaturesGrid />

      <FriendsList
        friends={friends}
        onAddFriend={() => setIsSearchOpen(true)}
      />

      {/* Monthly Badges Section */}
      <SafeComponent>
        <MonthlyBadges userId={user?.id || ''} />
      </SafeComponent>

      {/* Achievements Section */}
      <SafeComponent>
        <AchievementsSection userId={user?.id || ''} />
      </SafeComponent>


      {/* Add Friend Dialog (by code) */}
      <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un ami</DialogTitle>
            <DialogDescription>
              Entrez le code ami ou le nom d'utilisateur de votre contact.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Code ami ou nom d'utilisateur"
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddFriend} className="flex-1">
                Ajouter
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddFriendOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                Rechercher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Search Modal */}
      <UserSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onUserFollowed={() => {
          fetchFriends();
          fetchFollowCounts();
        }}
      />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Followers List */}
      <FollowersList
        isOpen={isFollowersOpen}
        onClose={() => setIsFollowersOpen(false)}
        type="followers"
      />

      {/* Following List */}
      <FollowersList
        isOpen={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        type="following"
      />

      {/* Leaderboard */}
      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

    </div>
  );
}

