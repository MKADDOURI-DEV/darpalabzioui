'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { ChevronDown, Search, Calendar, Users } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getTranslation(locale);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_122f5a97d-1783765387267.png"
          alt="Patio intérieur du Riad Dar Pa Labzioui avec fontaine centrale et arches traditionnelles marocaines"
          fill
          priority
          className="object-cover"
          sizes="100vw" />
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

        {/* Quick Search Widget */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-4 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Arrival */}
            <div className="flex items-center gap-2 bg-white/10 rounded-sm px-3 py-2.5">
              <Calendar size={14} className="text-sand/70 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-ivory/50 text-[10px] uppercase tracking-widest mb-0.5">
                  {t.search.arrival}
                </label>
                <input
                  type="date"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="w-full bg-transparent text-ivory text-xs outline-none placeholder-ivory/40 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Departure */}
            <div className="flex items-center gap-2 bg-white/10 rounded-sm px-3 py-2.5">
              <Calendar size={14} className="text-sand/70 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-ivory/50 text-[10px] uppercase tracking-widest mb-0.5">
                  {t.search.departure}
                </label>
                <input
                  type="date"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full bg-transparent text-ivory text-xs outline-none placeholder-ivory/40 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Guests + Search */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white/10 rounded-sm px-3 py-2.5 flex-1 min-w-0">
                <Users size={14} className="text-sand/70 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-ivory/50 text-[10px] uppercase tracking-widest mb-0.5">
                    {t.search.guests}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-ivory text-xs outline-none [color-scheme:dark]"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n} className="bg-dark-brown text-ivory">{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Link
                href={`/booking${arrival ? `?arrival=${arrival}&departure=${departure}&guests=${guests}` : ''}`}
                className="flex items-center justify-center bg-terracotta hover:bg-terracotta/90 text-ivory rounded-sm p-3 transition-colors flex-shrink-0"
                aria-label={t.search.search}
              >
                <Search size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/40 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}