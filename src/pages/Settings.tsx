import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { useSubscription } from '@/hooks/useSubscription';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useAdmin } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Settings as SettingsIcon,
  Bell,
  User,
  TrendingUp,
  ScanLine,
  Moon,
  Sun,
  Monitor,
  Shield,
  Download,
  Trash2,
  CreditCard,
  Crown,
  Smartphone,
  BellRing,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { user, profile, signOut } = useAuth();
  const { settings, updateSettings, isLoading } = useSettings();
  const { tier, openCustomerPortal, subscribed } = useSubscription();
  const { isSupported: pushSupported, isSubscribed: pushSubscribed, isLoading: pushLoading, toggleSubscription, permission } = usePushNotifications();
  const { isAdmin, role } = useAdmin();

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (key: string, value: boolean) => {
    setIsSaving(true);
    const success = await updateSettings({ [key]: value });
    if (success) {
      toast.success('Setting updated');
    } else {
      toast.error('Failed to update setting');
    }
    setIsSaving(false);
  };

  const handleSelect = async (key: string, value: string) => {
    setIsSaving(true);
    const success = await updateSettings({ [key]: value });
    if (success) {
      toast.success('Setting updated');
    } else {
      toast.error('Failed to update setting');
    }
    setIsSaving(false);
  };

  const handleSlider = async (key: string, value: number[]) => {
    setIsSaving(true);
    const success = await updateSettings({ [key]: value[0] });
    if (success) {
      toast.success('Setting updated');
    } else {
      toast.error('Failed to update setting');
    }
    setIsSaving(false);
  };

  const handlePasswordChange = async () => {
    if (!user?.email) return;
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) throw error;
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  const handleResetPortfolio = async () => {
    toast.info('Portfolio reset functionality coming soon');
  };

  const handleDeleteAccount = async () => {
    toast.info('Account deletion requires contacting support');
  };

  const handleExportData = async () => {
    toast.info('Data export functionality coming soon');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 h-auto">
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="trading" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="scanner" className="gap-2">
              <ScanLine className="h-4 w-4" />
              Scanner
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'system', label: 'System', icon: Monitor },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleSelect('theme', value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          settings.theme === value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSelect('language', value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es" disabled>
                        Español (coming soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="date_format">Date Format</Label>
                  <Select
                    value={settings.date_format}
                    onValueChange={(value) => handleSelect('date_format', value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display</CardTitle>
                <CardDescription>Configure display preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing for denser layouts
                    </p>
                  </div>
                  <Switch
                    checked={settings.compact_mode}
                    onCheckedChange={(checked) => handleToggle('compact_mode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth transitions and effects
                    </p>
                  </div>
                  <Switch
                    checked={settings.animations_enabled}
                    onCheckedChange={(checked) =>
                      handleToggle('animations_enabled', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show XP in Header</Label>
                    <p className="text-sm text-muted-foreground">
                      Display XP progress and streak in navigation
                    </p>
                  </div>
                  <Switch
                    checked={settings.show_xp_in_header}
                    onCheckedChange={(checked) =>
                      handleToggle('show_xp_in_header', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which emails you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'email_daily_streak', label: 'Daily Streak Reminder', desc: 'Get reminded to maintain your streak' },
                  { key: 'email_new_lesson', label: 'New Lesson Available', desc: 'Be notified when new content is added' },
                  { key: 'email_weekly_summary', label: 'Weekly Progress Summary', desc: 'Receive a weekly recap of your progress' },
                  { key: 'email_scanner_complete', label: 'Scanner Analysis Complete', desc: 'Get notified when chart analysis is ready' },
                  { key: 'email_portfolio_alerts', label: 'Portfolio Alerts', desc: 'Alerts for significant gains/losses (>5%)' },
                  { key: 'email_badge_unlocked', label: 'Badge Unlocked', desc: 'Celebrate your achievements' },
                  { key: 'email_marketing', label: 'Marketing & Promotions', desc: 'Updates about new features and offers' },
                ].map(({ key, label, desc }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{label}</Label>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch
                        checked={settings[key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => handleToggle(key, checked)}
                      />
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
                <CardDescription>
                  Receive notifications even when the app is closed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label>Enable Push Notifications</Label>
                      {!pushSupported && (
                        <Badge variant="secondary" className="text-xs">Not Supported</Badge>
                      )}
                      {pushSupported && permission === 'denied' && (
                        <Badge variant="destructive" className="text-xs">Blocked</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {!pushSupported 
                        ? 'Your browser does not support push notifications'
                        : permission === 'denied'
                          ? 'You have blocked notifications. Please enable them in your browser settings.'
                          : 'Get real-time alerts on your device'}
                    </p>
                  </div>
                  <Switch
                    checked={pushSubscribed}
                    onCheckedChange={toggleSubscription}
                    disabled={!pushSupported || pushLoading || permission === 'denied'}
                  />
                </div>

                {pushSubscribed && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Push Notification Types</Label>
                      {[
                        { key: 'push_daily_streak', label: 'Daily Streak Reminder', desc: 'Get reminded to maintain your streak' },
                        { key: 'push_lesson_completed', label: 'Lesson Completed', desc: 'Celebrate when you complete a lesson' },
                        { key: 'push_scanner_complete', label: 'Scanner Analysis Complete', desc: 'Get notified when chart analysis is ready' },
                        { key: 'push_portfolio_alerts', label: 'Portfolio Alerts', desc: 'Alerts for significant gains/losses' },
                        { key: 'push_badge_unlocked', label: 'Badge Unlocked', desc: 'Be notified of new achievements' },
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm">{label}</Label>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                          <Switch
                            checked={settings[key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => handleToggle(key, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>Manage notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.desktop_notifications}
                    onCheckedChange={(checked) =>
                      handleToggle('desktop_notifications', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for notifications and actions
                    </p>
                  </div>
                  <Switch
                    checked={settings.sound_effects}
                    onCheckedChange={(checked) => handleToggle('sound_effects', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            {/* Admin Panel Access - Only visible to admins */}
            {isAdmin && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Administration
                  </CardTitle>
                  <CardDescription>
                    Accès réservé aux administrateurs ({role})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/admin">
                    <Button className="gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Ouvrir le Panneau Admin
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="flex items-center gap-2">
                    <Input value={user?.email || ''} disabled className="max-w-md" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex items-center gap-2">
                    <Input value="••••••••" type="password" disabled className="max-w-md" />
                    <Button variant="outline" onClick={handlePasswordChange}>
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Subscription</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {tier !== 'free' ? (
                        <Crown className="h-5 w-5 text-amber-500" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="font-medium capitalize">{tier} Plan</span>
                    </div>
                    {subscribed ? (
                      <Button variant="outline" onClick={openCustomerPortal}>
                        Manage Subscription
                      </Button>
                    ) : (
                      <Link to="/pricing">
                        <Button>Upgrade Plan</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>Manage your data and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Export Your Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download all your data (GDPR)
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-destructive">Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. All your data including progress,
                          trades, and badges will be permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trading Tab */}
          <TabsContent value="trading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Preferences</CardTitle>
                <CardDescription>Configure your paper trading settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Starting Cash</Label>
                  <Select
                    value={String(settings.starting_cash)}
                    onValueChange={(value) => handleSelect('starting_cash', value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000">$10,000</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                      <SelectItem value="100000">$100,000</SelectItem>
                      <SelectItem value="500000">$500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Default Order Type</Label>
                  <Select
                    value={settings.default_order_type}
                    onValueChange={(value) => handleSelect('default_order_type', value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Confirm Before Trade</Label>
                    <p className="text-sm text-muted-foreground">
                      Show confirmation dialog before executing trades
                    </p>
                  </div>
                  <Switch
                    checked={settings.confirm_before_trade}
                    onCheckedChange={(checked) =>
                      handleToggle('confirm_before_trade', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>P&L Display</Label>
                  <Select
                    value={settings.show_pnl_mode}
                    onValueChange={(value) => handleSelect('show_pnl_mode', value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total P&L only</SelectItem>
                      <SelectItem value="position">By position</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reset Portfolio</Label>
                    <p className="text-sm text-muted-foreground">
                      Reset portfolio to starting balance and delete all trades
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Reset Portfolio</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Portfolio?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will reset your portfolio to $100,000 and delete all trade
                          history. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleResetPortfolio}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Reset Portfolio
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scanner Preferences</CardTitle>
                <CardDescription>Configure AI chart analysis settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Confidence Threshold: {settings.confidence_threshold}%</Label>
                  </div>
                  <Slider
                    value={[settings.confidence_threshold]}
                    onValueChange={(value) => handleSlider('confidence_threshold', value)}
                    min={50}
                    max={90}
                    step={5}
                    className="max-w-md"
                  />
                  <p className="text-sm text-muted-foreground">
                    Only show patterns with confidence above this threshold
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-fetch Live Prices</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically fetch live prices when ticker is detected
                    </p>
                  </div>
                  <Switch
                    checked={settings.auto_fetch_prices}
                    onCheckedChange={(checked) =>
                      handleToggle('auto_fetch_prices', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include Fundamental Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Show market cap, P/E ratio, sector in analysis
                    </p>
                  </div>
                  <Switch
                    checked={settings.include_fundamentals}
                    onCheckedChange={(checked) =>
                      handleToggle('include_fundamentals', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include News</Label>
                    <p className="text-sm text-muted-foreground">
                      Fetch latest news articles in analysis
                    </p>
                  </div>
                  <Switch
                    checked={settings.include_news}
                    onCheckedChange={(checked) => handleToggle('include_news', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Save Scan History</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep history of scanned charts
                    </p>
                  </div>
                  <Switch
                    checked={settings.save_scan_history}
                    onCheckedChange={(checked) =>
                      handleToggle('save_scan_history', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>History Retention</Label>
                  <Select
                    value={String(settings.history_retention_days)}
                    onValueChange={(value) =>
                      handleSelect('history_retention_days', value)
                    }
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
