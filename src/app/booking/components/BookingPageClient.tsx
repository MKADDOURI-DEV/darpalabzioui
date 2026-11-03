'use client';

import React, { useState, useEffect } from 'react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import { NOZOUL_BOOKING_URL } from '@/lib/driveImages';
import { ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export default function BookingPageClient() {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('dpl_locale') as Locale | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) setLocale(saved);
  }, []);

  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    localStorage.setItem('dpl_locale', l);
  };

  return (
    <div className="min-h-screen bg-ivory" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />

      <div className="pt-20">
        <div className="bg-dark-brown py-12 px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-sand mb-3">Réservation</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-ivory mb-3">
            Réservez votre séjour
          </h1>
          <p className="text-ivory/60 max-w-xl mx-auto text-sm leading-relaxed">
            Disponibilités et tarifs en temps réel, confirmation immédiate.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-card border border-border rounded-sm shadow-warm-sm overflow-hidden">
          <iframe
            src={NOZOUL_BOOKING_URL}
            title="Moteur de réservation - Dar Pa Labzioui"
            className="w-full border-0"
            style={{ height: '1100px', minHeight: '80vh' }}
            allow="payment"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href={NOZOUL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-dark-brown transition-colors"
          >
            Ouvrir le moteur de réservation dans un nouvel onglet
            <ExternalLink size={14} />
          </a>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
