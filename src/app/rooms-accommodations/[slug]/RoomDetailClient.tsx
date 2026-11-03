'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { ROOMS } from '@/lib/mockData';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, BedDouble, Snowflake, Bath, Check, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

export default function RoomDetailClient({ slug }: { slug: string }) {
  const room = ROOMS.find((r) => r.slug === slug)!;
  const others = ROOMS.filter((r) => r.active && r.slug !== slug);
  const [locale, setLocale] = useState<Locale>('fr');
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dpl_locale') as Locale | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) setLocale(saved);
  }, []);

  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    localStorage.setItem('dpl_locale', l);
  };

  const n = room.images.length;
  const prev = () => setIdx((i) => (i === 0 ? n - 1 : i - 1));
  const next = () => setIdx((i) => (i === n - 1 ? 0 : i + 1));
  const current = room.images[idx];

  return (
    <div className="min-h-screen bg-ivory" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />

      <main className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-28 pb-16">
        <Link href="/rooms-accommodations" className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-dark-brown transition-colors mb-6">
          <ArrowLeft size={14} /> Toutes les chambres
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-sm overflow-hidden bg-muted cursor-zoom-in" onClick={() => setLightbox(true)}>
              <AppImage src={current.src} alt={current.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" priority />
              {n > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-brown/60 text-ivory rounded-sm flex items-center justify-center hover:bg-dark-brown/80" aria-label="Photo précédente"><ChevronLeft size={18} /></button>
                  <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-brown/60 text-ivory rounded-sm flex items-center justify-center hover:bg-dark-brown/80" aria-label="Photo suivante"><ChevronRight size={18} /></button>
                  <span className="absolute bottom-3 right-3 bg-dark-brown/70 text-ivory text-xs px-2.5 py-1 rounded-sm">{idx + 1} / {n}</span>
                </>
              )}
            </div>
            {n > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
                {room.images.map((img, i) => (
                  <button key={`${room.id}-thumb-${i}`} onClick={() => setIdx(i)} className={`relative h-16 sm:h-20 rounded-sm overflow-hidden border-2 transition-colors ${i === idx ? 'border-terracotta' : 'border-transparent opacity-70 hover:opacity-100'}`} aria-label={`Photo ${i + 1}`}>
                    <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-3">Hébergement</p>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-dark-brown mb-4">{room.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{room.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 border border-border rounded-sm p-3 text-sm"><Users size={16} className="text-terracotta" />{room.capacity} pers.</div>
              <div className="flex items-center gap-2 border border-border rounded-sm p-3 text-sm"><BedDouble size={16} className="text-terracotta" />{room.bedType}</div>
              {room.hasAC && <div className="flex items-center gap-2 border border-border rounded-sm p-3 text-sm"><Snowflake size={16} className="text-terracotta" />Climatisée</div>}
              {room.hasPrivateBath && <div className="flex items-center gap-2 border border-border rounded-sm p-3 text-sm"><Bath size={16} className="text-terracotta" />Salle de bain privée</div>}
            </div>

            <h2 className="font-serif text-lg font-semibold text-dark-brown mb-3">Équipements</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {room.amenities.map((a) => (
                <span key={`${room.id}-a-${a}`} className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm">
                  <Check size={11} className="text-deep-green" />{a}
                </span>
              ))}
            </div>

            <Link href="/booking" className="btn-primary w-full justify-center text-sm py-3">Réserver cette chambre</Link>
          </div>
        </div>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-dark-brown mb-6">Autres chambres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {others.map((o) => (
                <Link key={o.id} href={`/rooms-accommodations/${o.slug}`} className="group block bg-card border border-border rounded-sm overflow-hidden card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <AppImage src={o.image} alt={o.images[0]?.alt || o.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                  </div>
                  <div className="p-4 font-serif text-lg font-semibold text-dark-brown">{o.name}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-ivory p-2" aria-label="Fermer" onClick={() => setLightbox(false)}><X size={26} /></button>
          {n > 1 && <button className="absolute left-4 text-ivory p-2" aria-label="Précédente" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft size={32} /></button>}
          <div className="relative w-[92vw] h-[82vh]" onClick={(e) => e.stopPropagation()}>
            <AppImage src={current.src} alt={current.alt} fill className="object-contain" sizes="92vw" />
          </div>
          {n > 1 && <button className="absolute right-4 text-ivory p-2" aria-label="Suivante" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight size={32} /></button>}
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
