'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import BookingStepIndicator from './BookingStepIndicator';
import { ROOMS } from '@/lib/mockData';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';
import AppImage from '@/components/ui/AppImage';
import { CalendarDays, Users, Check, AlertCircle, ChevronRight, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  specialRequests: string;
  agreeToTerms: boolean;
}

function generateReference() {
  const num = Math.floor(8900 + (Date.now() % 100));
  return `DPL-2026-0${num}`;
}

export default function BookingPageClient() {
  const [locale, setLocale] = useState<Locale>('fr');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [nights, setNights] = useState(0);
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      adults: 2,
      children: 0,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');
  const adults = watch('adults');
  const watchedRoomId = watch('roomId');

  useEffect(() => {
    const saved = localStorage.getItem('dpl_locale') as Locale | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) setLocale(saved);

    // Pre-select room from URL param
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        setSelectedRoom(roomParam);
        setValue('roomId', roomParam);
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diff = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 0);
    }
  }, [checkIn, checkOut]);

  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    localStorage.setItem('dpl_locale', l);
  };

  const t = getTranslation(locale);

  const steps = [
    { number: 1, label: t.booking.step1 },
    { number: 2, label: t.booking.step2 },
    { number: 3, label: t.booking.step3 },
    { number: 4, label: t.booking.step4 },
    { number: 5, label: t.booking.step5 },
  ];

  const room = ROOMS.find((r) => r.id === (selectedRoom || watchedRoomId));
  const totalAmount = room ? room.pricePerNight * nights : 0;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Backend integration point: POST /api/bookings with data
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const ref = generateReference();
    setReference(ref);
    setCurrentStep(5);
    setIsSubmitting(false);
    toast.success('Demande envoyée avec succès !');
  };

  const nextStep = () => {
    if (currentStep === 1 && (!checkIn || !checkOut || nights <= 0)) {
      toast.error('Veuillez sélectionner des dates valides.');
      return;
    }
    if (currentStep === 3 && !selectedRoom && !watchedRoomId) {
      toast.error('Veuillez sélectionner une chambre.');
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />

      {/* Header */}
      <div className="pt-20 bg-dark-brown py-14 px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-sand mb-3">Réservation</p>
        <h1 className="font-serif text-4xl font-bold text-ivory mb-3">{t.booking.title}</h1>
        <p className="text-ivory/60 text-sm max-w-lg mx-auto">{t.booking.subtitle}</p>
      </div>

      {/* Pending Notice */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-3 flex items-center gap-2">
          <AlertCircle size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            <strong>Mode demande de réservation :</strong> Votre demande sera transmise au riad et confirmée par le propriétaire dans les meilleurs délais. Aucun paiement n&apos;est requis à ce stade.
          </p>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {currentStep < 5 && (
            <BookingStepIndicator steps={steps} currentStep={currentStep} />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Dates */}
            {currentStep === 1 && (
              <div className="bg-card border border-border rounded-sm p-8 shadow-warm-sm">
                <h2 className="font-serif text-2xl font-semibold text-dark-brown mb-2">Sélectionnez vos dates</h2>
                <p className="text-sm text-muted-foreground mb-8">Choisissez vos dates d&apos;arrivée et de départ.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="form-label">
                      <CalendarDays size={14} className="inline mr-1.5 text-terracotta" />
                      {t.booking.checkIn} <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="date"
                      min={today}
                      className="form-input"
                      {...register('checkIn', { required: 'La date d\'arrivée est requise.' })}
                    />
                    {errors.checkIn && <p className="form-error">{errors.checkIn.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">
                      <CalendarDays size={14} className="inline mr-1.5 text-terracotta" />
                      {t.booking.checkOut} <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="date"
                      min={checkIn || today}
                      className="form-input"
                      {...register('checkOut', { required: 'La date de départ est requise.' })}
                    />
                    {errors.checkOut && <p className="form-error">{errors.checkOut.message}</p>}
                  </div>
                </div>
                {nights > 0 && (
                  <div className="bg-deep-green/8 border border-deep-green/20 rounded-sm p-4 flex items-center gap-3">
                    <Check size={16} className="text-deep-green flex-shrink-0" />
                    <span className="text-sm text-deep-green font-medium">
                      Durée du séjour : <strong>{nights} nuit{nights > 1 ? 's' : ''}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Guests */}
            {currentStep === 2 && (
              <div className="bg-card border border-border rounded-sm p-8 shadow-warm-sm">
                <h2 className="font-serif text-2xl font-semibold text-dark-brown mb-2">Nombre de voyageurs</h2>
                <p className="text-sm text-muted-foreground mb-8">Indiquez le nombre d&apos;adultes et d&apos;enfants.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <Users size={14} className="inline mr-1.5 text-terracotta" />
                      {t.booking.adults} <span className="text-terracotta">*</span>
                    </label>
                    <select
                      className="form-input"
                      {...register('adults', { required: true, min: 1 })}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={`adults-${n}`} value={n}>{n} adulte{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">
                      {t.booking.children}
                    </label>
                    <select className="form-input" {...register('children')}>
                      {[0, 1, 2, 3].map((n) => (
                        <option key={`children-${n}`} value={n}>{n} enfant{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">Enfants de moins de 12 ans</p>
                  </div>
                </div>
                <div className="mt-6 bg-sand/20 border border-sand/40 rounded-sm p-4">
                  <p className="text-xs text-muted-foreground">
                    <strong>Capacité maximale :</strong> Nos chambres accueillent de 2 à 3 personnes selon la configuration. La chambre sera suggérée selon votre nombre de voyageurs à l&apos;étape suivante.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Room Selection */}
            {currentStep === 3 && (
              <div className="bg-card border border-border rounded-sm p-8 shadow-warm-sm">
                <h2 className="font-serif text-2xl font-semibold text-dark-brown mb-2">Choisissez votre chambre</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Chambres disponibles pour {adults} adulte{Number(adults) > 1 ? 's' : ''}, {nights} nuit{nights > 1 ? 's' : ''}.
                </p>
                <input type="hidden" {...register('roomId', { required: 'Veuillez sélectionner une chambre.' })} />
                <div className="space-y-4">
                  {ROOMS.filter((r) => r.active && r.capacity >= Number(adults)).map((r) => (
                    <label
                      key={r.id}
                      className={`flex gap-4 p-4 border rounded-sm cursor-pointer transition-all ${
                        selectedRoom === r.id
                          ? 'border-terracotta bg-terracotta/5 shadow-warm-sm'
                          : 'border-border hover:border-sand'
                      }`}
                      onClick={() => {
                        setSelectedRoom(r.id);
                        setValue('roomId', r.id);
                      }}
                    >
                      <div className="relative w-20 h-16 rounded-sm overflow-hidden flex-shrink-0">
                        <AppImage
                          src={r.image}
                          alt={`Chambre ${r.name}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-sm text-dark-brown">{r.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{r.bedType} · {r.size}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-terracotta tabular-nums">
                              {r.pricePerNight.toLocaleString()} MAD
                            </div>
                            <div className="text-xs text-muted-foreground">/ nuit</div>
                            {nights > 0 && (
                              <div className="text-xs font-semibold text-dark-brown mt-0.5 tabular-nums">
                                = {(r.pricePerNight * nights).toLocaleString()} MAD
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedRoom === r.id ? 'border-terracotta bg-terracotta' : 'border-border'
                      }`}>
                        {selectedRoom === r.id && <Check size={11} className="text-ivory" />}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.roomId && <p className="form-error mt-2">{errors.roomId.message}</p>}
              </div>
            )}

            {/* Step 4: Guest Details */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card border border-border rounded-sm p-8 shadow-warm-sm">
                  <h2 className="font-serif text-2xl font-semibold text-dark-brown mb-2">Vos coordonnées</h2>
                  <p className="text-sm text-muted-foreground mb-8">Renseignez vos informations pour finaliser la demande.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="form-label">Prénom <span className="text-terracotta">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Votre prénom"
                        {...register('firstName', { required: 'Le prénom est requis.' })}
                      />
                      {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Nom <span className="text-terracotta">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Votre nom de famille"
                        {...register('lastName', { required: 'Le nom est requis.' })}
                      />
                      {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="form-label">Email <span className="text-terracotta">*</span></label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="votre@email.com"
                        {...register('email', {
                          required: 'L\'email est requis.',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide.' },
                        })}
                      />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Téléphone <span className="text-terracotta">*</span></label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+33 6 00 00 00 00"
                        {...register('phone', { required: 'Le téléphone est requis.' })}
                      />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="form-label">Nationalité</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ex : Française"
                      {...register('nationality')}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="form-label">Demandes spéciales</label>
                    <p className="text-xs text-muted-foreground mb-1.5">Allergies, préférences alimentaires, heure d&apos;arrivée, etc.</p>
                    <textarea
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Indiquez toute demande particulière..."
                      {...register('specialRequests')}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-terracotta"
                        {...register('agreeToTerms', { required: 'Vous devez accepter les conditions.' })}
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        J&apos;accepte que mes données soient transmises au Riad Dar Pa Labzioui pour le traitement de ma demande de réservation. <span className="text-terracotta">*</span>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="form-error">{errors.agreeToTerms.message}</p>}
                  </div>
                </div>

                {/* Summary Sidebar */}
                <div className="bg-dark-brown text-ivory rounded-sm p-6 self-start sticky top-24">
                  <h3 className="font-serif text-lg font-semibold mb-5">Récapitulatif</h3>
                  {room && (
                    <>
                      <div className="relative h-32 rounded-sm overflow-hidden mb-4">
                        <AppImage
                          src={room.image}
                          alt={`Chambre ${room.name}`}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                      <div className="text-base font-semibold mb-1">{room.name}</div>
                      <div className="text-sm text-ivory/60 mb-4">{room.bedType}</div>
                    </>
                  )}
                  <div className="space-y-2 text-sm border-t border-ivory/15 pt-4">
                    <div className="flex justify-between">
                      <span className="text-ivory/60">Arrivée</span>
                      <span>{checkIn || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory/60">Départ</span>
                      <span>{checkOut || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory/60">Durée</span>
                      <span>{nights > 0 ? `${nights} nuit${nights > 1 ? 's' : ''}` : '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory/60">Voyageurs</span>
                      <span>{Number(adults)} adulte{Number(adults) > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  {room && nights > 0 && (
                    <div className="border-t border-ivory/15 pt-4 mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-ivory/60">{room.pricePerNight.toLocaleString()} MAD × {nights} nuits</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Estimation</span>
                        <span className="tabular-nums">{totalAmount.toLocaleString()} MAD</span>
                      </div>
                      <p className="text-xs text-ivory/40 mt-2">Tarif indicatif. Le montant définitif sera confirmé par le riad.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="bg-card border border-deep-green/30 rounded-sm p-10 shadow-warm-sm text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-deep-green/10 border-2 border-deep-green flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-deep-green" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-dark-brown mb-3">Demande envoyée !</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Votre demande de réservation a bien été reçue par le Riad Dar Pa Labzioui. Le propriétaire vous contactera dans les meilleurs délais pour confirmer votre séjour.
                </p>
                <div className="bg-muted rounded-sm p-4 mb-6">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Numéro de référence</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-xl font-bold text-dark-brown">{reference}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(reference);
                        toast.success('Référence copiée !');
                      }}
                      className="p-1.5 rounded text-muted-foreground hover:text-terracotta transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 mb-8 text-left">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <strong>Demande en attente de confirmation.</strong> Aucune chambre n&apos;est réservée définitivement avant la confirmation explicite du propriétaire. Vous recevrez une réponse par email ou par téléphone.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/212667625415?text=Bonjour%2C%20ma%20référence%20de%20demande%20est%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Contacter via WhatsApp
                  </a>
                  <a href="/" className="btn-outline-dark text-sm">
                    Retour à l&apos;accueil
                  </a>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-outline-dark text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.booking.back}
                </button>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    {t.booking.next}
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-sm flex items-center gap-2 min-w-[180px] justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      t.booking.submit
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}