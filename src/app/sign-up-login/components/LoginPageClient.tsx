'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import { Eye, EyeOff, LogIn, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const DEMO_CREDENTIALS = {
  email: 'admin@darpalabzioui.ma',
  password: 'Riad2026!Meknes'
};

export default function LoginPageClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<LoginFormData>();

  const copyToClipboard = async (field: 'email' | 'password', value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast.success(`${field === 'email' ? 'Email' : 'Mot de passe'} copié !`);
  };

  const autofillCredentials = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    toast.success('Identifiants de démonstration renseignés.');
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Backend integration point: POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (
    data.email === DEMO_CREDENTIALS.email &&
    data.password === DEMO_CREDENTIALS.password)
    {
      localStorage.setItem('dpl_admin_auth', JSON.stringify({ email: data.email, role: 'admin', loggedIn: true }));
      toast.success('Connexion réussie. Bienvenue !');
      setTimeout(() => {
        window.location.href = '/admin-dashboard';
      }, 800);
    } else {
      setIsLoading(false);
      setError('email', {
        message: 'Identifiants incorrects — utilisez les identifiants de démonstration ci-dessous.'
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_122f5a97d-1783765387267.png"
          alt="Patio intérieur du Riad Dar Pa Labzioui avec fontaine en marbre et arches traditionnelles"
          fill
          priority
          className="object-cover"
          sizes="50vw" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-dark-brown/80 via-dark-brown/50 to-dark-brown/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <AppLogo size={36} />
            <div className="text-ivory">
              <div className="font-serif text-lg font-semibold">Riad Dar Pa Labzioui</div>
              <div className="text-xs tracking-widest text-ivory/50">Meknès · Maroc</div>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-4xl font-bold text-ivory mb-4 leading-tight">
              Espace<br />Administration
            </h2>
            <p className="text-ivory/60 text-sm leading-relaxed max-w-xs">
              Gérez vos chambres, réservations, contenus et paramètres du riad depuis votre tableau de bord sécurisé.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="h-px flex-1 bg-ivory/20" />
              <span className="text-ivory/30 text-xs tracking-widest">✦</span>
              <div className="h-px flex-1 bg-ivory/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <AppLogo size={32} />
            <div className="font-serif text-base font-semibold text-dark-brown">Riad Dar Pa Labzioui</div>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-dark-brown mb-1.5">Connexion administrateur</h1>
            <p className="text-sm text-muted-foreground">Accédez à votre tableau de bord de gestion.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="form-label">Adresse email <span className="text-terracotta">*</span></label>
              <input
                type="email"
                autoComplete="email"
                className="form-input"
                placeholder="admin@darpalabzioui.ma"
                {...register('email', {
                  required: 'L\'email est requis.',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide.' }
                })} />
              
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="form-label">Mot de passe <span className="text-terracotta">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="form-input pr-10"
                  placeholder="Votre mot de passe"
                  {...register('password', { required: 'Le mot de passe est requis.' })} />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                  
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-terracotta" {...register('remember')} />
                <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center text-sm py-3 min-h-[44px]">
              
              {isLoading ?
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg> :

              <>
                  <LogIn size={15} />
                  Se connecter
                </>
              }
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-8 border border-brass/30 rounded-sm bg-brass/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass">Identifiants de démonstration</span>
              <button
                onClick={autofillCredentials}
                className="text-xs text-terracotta hover:underline font-medium">
                
                Remplir automatiquement
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                  <div className="text-xs font-mono text-foreground">{DEMO_CREDENTIALS.email}</div>
                </div>
                <button
                  onClick={() => copyToClipboard('email', DEMO_CREDENTIALS.email)}
                  className="p-1.5 text-muted-foreground hover:text-terracotta transition-colors flex-shrink-0"
                  aria-label="Copier l'email">
                  
                  {copiedField === 'email' ? <Check size={13} className="text-deep-green" /> : <Copy size={13} />}
                </button>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Mot de passe</div>
                  <div className="text-xs font-mono text-foreground">{DEMO_CREDENTIALS.password}</div>
                </div>
                <button
                  onClick={() => copyToClipboard('password', DEMO_CREDENTIALS.password)}
                  className="p-1.5 text-muted-foreground hover:text-terracotta transition-colors flex-shrink-0"
                  aria-label="Copier le mot de passe">
                  
                  {copiedField === 'password' ? <Check size={13} className="text-deep-green" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            Authentification de démonstration. Intégration Supabase Auth à configurer pour la production.
          </p>
        </div>
      </div>
    </div>);

}