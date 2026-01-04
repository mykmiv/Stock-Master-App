import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial');

const emailSchema = z.string().email('Adresse email invalide');

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailMatch, setEmailMatch] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const validatePassword = (value: string) => {
    const errors: string[] = [];
    if (value.length < 8) errors.push('8 caractères minimum');
    if (!/[A-Z]/.test(value)) errors.push('Une majuscule');
    if (!/[a-z]/.test(value)) errors.push('Une minuscule');
    if (!/[0-9]/.test(value)) errors.push('Un chiffre');
    if (!/[^A-Za-z0-9]/.test(value)) errors.push('Un caractère spécial');
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) validatePassword(value);
    else setPasswordErrors([]);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (confirmEmail) {
      setEmailMatch(value.toLowerCase() === confirmEmail.toLowerCase());
    }
  };

  const handleConfirmEmailChange = (value: string) => {
    setConfirmEmail(value);
    if (value) {
      setEmailMatch(email.toLowerCase() === value.toLowerCase());
    } else {
      setEmailMatch(null);
    }
  };

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailResult = emailSchema.safeParse(resetEmail);
    if (!emailResult.success) {
      toast.error(emailResult.error.errors[0].message);
      return;
    }
    
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Email de réinitialisation envoyé ! Vérifiez votre boîte mail.');
      setResetDialogOpen(false);
      setResetEmail('');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast.error(emailResult.error.errors[0].message);
      return;
    }
    
    // Validate email match
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      toast.error('Les adresses email ne correspondent pas');
      return;
    }
    
    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(passwordResult.error.errors[0].message);
      return;
    }
    
    setLoading(true);
    const { error } = await signUp(email, password, username);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Compte créé ! Bienvenue sur StockMaster.');
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <LineChart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold">StockMaster AI</h1>
          <p className="text-muted-foreground">Learn to trade stocks like a pro</p>
        </div>

        <Card>
          <Tabs defaultValue="signin">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="signin" className="mt-0">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
                  </Button>
                  
                  <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="w-full text-sm text-muted-foreground">
                        Mot de passe oublié ?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
                        <DialogDescription>
                          Entrez votre adresse email pour recevoir un lien de réinitialisation.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="you@example.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={resetLoading}>
                          {resetLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Envoyer le lien'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="trader123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-email">Confirmer l'email</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm-email"
                        type="email"
                        placeholder="you@example.com"
                        value={confirmEmail}
                        onChange={(e) => handleConfirmEmailChange(e.target.value)}
                        required
                        className="pr-10"
                      />
                      {emailMatch !== null && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {emailMatch ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      )}
                    </div>
                    {emailMatch !== null && (
                      <p className={`text-xs ${emailMatch ? 'text-green-500' : 'text-destructive'}`}>
                        {emailMatch ? 'Les emails correspondent' : 'Les emails ne correspondent pas'}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                        minLength={8}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-2 space-y-1 text-xs">
                        {['8 caractères minimum', 'Une majuscule', 'Une minuscule', 'Un chiffre', 'Un caractère spécial'].map((req) => (
                          <div key={req} className="flex items-center gap-2">
                            {passwordErrors.includes(req) ? (
                              <X className="h-3 w-3 text-destructive" />
                            ) : (
                              <Check className="h-3 w-3 text-green-500" />
                            )}
                            <span className={passwordErrors.includes(req) ? 'text-muted-foreground' : 'text-green-500'}>
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
