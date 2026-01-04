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
import {
  LayoutDashboard,
  GraduationCap,
  ScanLine,
  LineChart,
  Rocket,
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
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard, color: 'bg-primary', textColor: 'text-primary' },
  { path: '/learn', label: 'Learn', icon: GraduationCap, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
  { path: '/scanner', label: 'Scan', icon: ScanLine, color: 'bg-secondary', textColor: 'text-secondary', badge: 'AI' },
  { path: '/trade', label: 'Practice', icon: LineChart, color: 'bg-purple-500', textColor: 'text-purple-600' },
  { path: '/league', label: 'League', icon: Trophy, color: 'bg-amber-500', textColor: 'text-amber-600' },
  { path: '/bridge', label: 'Go Real', icon: Rocket, color: 'bg-warning', textColor: 'text-warning' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { isDemoMode } = useSubscription();
  const { currentLevel, xpProgress, totalXP, pendingLevelUp, dismissLevelUp } = useXP();

  return (
    <div className={cn("min-h-screen bg-background", isDemoMode && "pt-10")}>
      <DemoBanner />
      
      {/* Top Navigation - Duolingo Style */}
      <header className={cn(
        "sticky z-50 border-b-2 border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80",
        isDemoMode ? "top-10" : "top-0"
      )}>
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
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

      {/* Mobile Bottom Navigation - Duolingo Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="relative">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {/* Special elevated button for Scanner */}
                  {item.path === '/scanner' ? (
                    <div className={cn(
                      "absolute -top-4 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all",
                      isActive ? "bg-secondary" : "bg-muted"
                    )}>
                      <Icon className={cn("h-6 w-6", isActive ? "text-white" : "text-muted-foreground")} />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 text-[8px] font-black px-1 py-0.5 rounded-full bg-warning text-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                      isActive ? item.color : ""
                    )}>
                      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "")} />
                    </div>
                  )}
                  <span className={cn(
                    "text-xs font-bold",
                    item.path === '/scanner' && "mt-5",
                    isActive && item.textColor
                  )}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-6 pb-28 md:pb-6">
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
