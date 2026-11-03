'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { HERO_VIDEO_URL, HERO_POSTER } from '@/lib/driveImages';
import { ChevronDown } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getTranslation(locale);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEO_URL ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={HERO_VIDEO_URL}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <AppImage
            src={HERO_POSTER}
            alt="Patio et espaces du Riad Dar Pa Labzioui à Meknès"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
        )}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        {/* Ornamental line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-sand/50" />
          <span className="text-sand/70 text-xs tracking-[0.3em] uppercase">Meknès · Maroc</span>
          <div className="h-px w-16 bg-sand/50" />
        </div>

        <h1 className="font-serif text-hero-xl text-ivory font-bold mb-6 text-balance leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-ivory/75 text-lg mb-10 tracking-wide">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/booking" className="btn-primary text-sm px-8 py-3.5">
            {t.hero.bookBtn}
          </Link>
          <Link href="/rooms-accommodations" className="btn-secondary text-sm px-8 py-3.5">
            {t.hero.discoverBtn}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/40 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}