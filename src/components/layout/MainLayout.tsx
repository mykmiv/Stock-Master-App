import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useXP } from '@/hooks/useXP';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/demo/DemoBanner';
import { XPBar } from '@/components/xp/XPBar';
import { LevelUpModal } from '@/components/xp/LevelUpModal';
import { BottomNav } from '@/components/navigation/BottomNav';
import {
  GraduationCap,
  ScanLine,
  LineChart,
  LogOut,
  User,
  Flame,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/learn', label: 'Learn', icon: GraduationCap, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
  { path: '/scanner', label: 'Scan', icon: ScanLine, color: 'bg-secondary', textColor: 'text-secondary', badge: 'AI' },
  { path: '/trade', label: 'Trade', icon: LineChart, color: 'bg-purple-500', textColor: 'text-purple-600' },
  { path: '/league', label: 'Ranking', icon: Trophy, color: 'bg-amber-500', textColor: 'text-amber-600' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { isDemoMode } = useSubscription();
  const { currentLevel, xpProgress, totalXP, pendingLevelUp, dismissLevelUp } = useXP();

  // Afficher la bannière du haut uniquement sur la page Profile
  const isProfilePage = location.pathname === '/profile';
  const showTopBanner = isProfilePage;

  return (
    <div className={cn("min-h-screen bg-background", isDemoMode && "pt-10")}>
      <DemoBanner />
      
      {/* Top Navigation - Uniquement sur Profile */}
      {showTopBanner && (
        <header className={cn(
          "sticky z-50 border-b-2 border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80",
          isDemoMode ? "top-10" : "top-0"
        )}>
          <div className="container flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/learn" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-md"
              >
                <LineChart className="h-5 w-5 text-white" />
              </motion.div>
              <span className="font-black text-xl hidden sm:block">StockMaster</span>
            </Link>

            {/* Desktop Navigation - Icon based like Duolingo */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all relative',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                        isActive ? item.color : "bg-muted"
                      )}>
                        <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground")} />
                      </div>
                      <span className="hidden lg:inline">{item.label}</span>
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 text-[10px] font-black px-1.5 py-0.5 rounded-full bg-warning text-black flex items-center gap-0.5">
                          <Sparkles className="h-2.5 w-2.5" />
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* User Stats & Profile */}
            <div className="flex items-center gap-3">
              {/* Streak */}
              {profile && profile.streak_days > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-red"
                >
                  <Flame className="h-4 w-4 text-destructive" />
                  <span className="font-black text-destructive text-sm">{profile.streak_days}</span>
                </motion.div>
              )}

              {/* XP Bar */}
              <XPBar 
                currentLevel={currentLevel}
                xpProgress={xpProgress}
                totalXP={totalXP}
                compact
              />

              {/* Notifications, Theme & Profile */}
              <div className="flex items-center gap-1">
                <NotificationCenter />
                <ThemeToggle />
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Bottom Navigation - Design original */}
      <BottomNav />

      {/* Main Content */}
      <main className={cn(
        "w-full",
        "px-3 sm:px-4 md:px-6",
        "py-4 sm:py-6",
        "pb-28 sm:pb-32",
        "max-w-7xl mx-auto"
      )}>
        {children}
      </main>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Level Up Modal */}
      <LevelUpModal level={pendingLevelUp} onClose={dismissLevelUp} />
    </div>
  );
}
