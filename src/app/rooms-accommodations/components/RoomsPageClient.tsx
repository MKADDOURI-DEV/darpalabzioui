'use client';

import React, { useState, useEffect } from 'react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import RoomCard from './RoomCard';
import { ROOMS } from '@/lib/mockData';
import type { Locale } from '@/lib/i18n';

export default function RoomsPageClient() {
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
    <div className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />

      {/* Page Header */}
      <div className="relative pt-20">
        <div className="bg-dark-brown py-16 px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-sand mb-3">Hébergement</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ivory mb-4">
            Nos Chambres & Suites
          </h1>
          <p className="text-ivory/60 max-w-xl mx-auto text-sm leading-relaxed">
            Cinq chambres privées, chacune ornée d&apos;artisanat marocain authentique. Chaque chambre dispose de sa propre salle de bain privative.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-sand/30" />
            <span className="text-sand/50 text-xs tracking-widest">✦</span>
            <div className="h-px w-12 bg-sand/30" />
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-sand/20 border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-3">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Note :</strong> Les tarifs indiqués sont des tarifs de référence configurables par l&apos;établissement. La disponibilité est confirmée par le propriétaire après réception de votre demande.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {ROOMS.filter((r) => r.active).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Services Note */}
        <div className="mt-16 border border-border rounded-sm p-6 bg-card">
          <h3 className="font-serif text-lg font-semibold text-dark-brown mb-4">Services inclus dans toutes les chambres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            {[
              'Wi-Fi gratuit dans tout le riad',
              'Petit-déjeuner continental sur demande',
              'Serviettes et linge de lit fournis',
              'Salle de bain privative',
              'Accueil chaleureux 24h/24',
              'Conseils et recommandations locales',
              'Navette aéroport sur demande',
              'Cuisine marocaine sur réservation',
            ].map((service) => (
              <div key={`service-${service.substring(0, 20)}`} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}