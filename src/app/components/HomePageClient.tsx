'use client';

import React, { useState, useEffect } from 'react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from './HeroSection';
import RoomsPreviewSection from './RoomsPreviewSection';
import PatioSection from './PatioSection';
import CuisineSection from './CuisineSection';
import MeknesSection from './MeknesSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import GallerySection from './GallerySection';
import type { Locale } from '@/lib/i18n';

export default function HomePageClient() {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('dpl_locale') as Locale | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLocale(saved);
    }
  }, []);

  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    localStorage.setItem('dpl_locale', l);
  };

  return (
    <div
      className="min-h-screen"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      lang={locale}
    >
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />
      <main>
        <HeroSection locale={locale} />

        {/* Family History Section */}
        <section className="py-20 lg:py-24 bg-card">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">Notre histoire</p>
              <h2 className="font-serif text-3xl font-bold text-dark-brown mb-6">
                La famille Labzioui vous accueille
              </h2>
              <div className="arch-decoration mx-auto mb-6" style={{ width: '60px' }} />
              <p className="text-muted-foreground leading-relaxed mb-5">
                Niché au cœur de Dar Lakbira, le quartier historique de Meknès, notre riad est bien plus qu&apos;un hébergement : c&apos;est une maison familiale ouverte aux voyageurs du monde entier. La famille Labzioui perpétue les traditions de l&apos;hospitalité marocaine dans un cadre architectural d&apos;exception.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cinq chambres privées, chacune ornée d&apos;artisanat marocain authentique, un patio baigné de lumière, deux terrasses panoramiques et des salons marocains — chaque recoin du riad raconte l&apos;histoire de Meknès impériale.
              </p>
            </div>
          </div>
        </section>

        <RoomsPreviewSection locale={locale} />
        <PatioSection />
        <CuisineSection />
        <MeknesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <PublicFooter />
    </div>
  );
}