import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial');

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

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
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value) {
      setPasswordMatch(password === value);
    } else {
      setPasswordMatch(null);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(passwordResult.error.errors[0].message);
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Mot de passe mis à jour avec succès !');
      navigate('/dashboard');
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
          <p className="text-muted-foreground">Réinitialiser votre mot de passe</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau mot de passe</CardTitle>
            <CardDescription>
              Entrez votre nouveau mot de passe ci-dessous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="new-password"
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    required
                    className="pr-10"
                  />
                  {passwordMatch !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {passwordMatch ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
                {passwordMatch !== null && (
                  <p className={`text-xs ${passwordMatch ? 'text-green-500' : 'text-destructive'}`}>
                    {passwordMatch ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas'}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Mettre à jour le mot de passe'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
