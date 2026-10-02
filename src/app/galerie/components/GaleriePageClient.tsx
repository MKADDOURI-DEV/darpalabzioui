'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  span?: 'wide' | 'tall' | 'large' | 'normal';
}

const GALLERY_IMAGES: GalleryImage[] = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_448ad6292-1790935445838.png",
  alt: 'Patio central du Riad Dar Pa Labzioui avec fontaine et arches traditionnelles marocaines',
  category: 'patio',
  span: 'large'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_419dd81f3-1790934920092.png',
  alt: 'Suite Patio spacieuse ouvrant directement sur le patio central avec sa fontaine',
  category: 'patio',
  span: 'tall'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_4a58aaa5d-1790934921462.png',
  alt: 'Chambre Zellige ornée de mosaïques artisanales et lit double en bois de cèdre',
  category: 'chambres',
  span: 'wide'
},
{
  src: 'https://images.unsplash.com/photo-1734418563367-48d19df3a3cf',
  alt: 'Chambre Moucharabieh avec fenêtres en bois sculpté filtrant la lumière en dentelle',
  category: 'chambres',
  span: 'normal'
},
{
  src: "https://images.unsplash.com/photo-1697043316895-4db826f75f0e",
  alt: 'Chambre Terrasse avec accès privatif et vue panoramique sur les toits de Meknès',
  category: 'chambres',
  span: 'normal'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_123f55966-1776112343112.png',
  alt: 'Chambre Argan avec décoration en bois naturel et ambiance chaleureuse',
  category: 'chambres',
  span: 'tall'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13bed87c4-1773214096147.png',
  alt: 'Terrasse panoramique du riad avec vue sur les minarets et les toits de la médina de Meknès',
  category: 'terrasses',
  span: 'large'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d8409c-1775414439447.png",
  alt: 'Vue panoramique depuis la terrasse du riad sur la médina historique de Meknès',
  category: 'terrasses',
  span: 'wide'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_171f81f90-1783587013511.png',
  alt: 'Salon marocain avec canapés traditionnels, coussins brodés et lanterne en laiton',
  category: 'salons',
  span: 'wide'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f01e49fd-1772210725810.png',
  alt: 'Détail des zellige marocains artisanaux ornant les murs du riad',
  category: 'details',
  span: 'normal'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d5b9d53f-1772248726457.png',
  alt: 'Détail architectural des arches et moucharabiehs en bois sculpté du riad',
  category: 'details',
  span: 'tall'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19886b805-1772485129561.png',
  alt: 'Salle de bain privative avec carrelage traditionnel marocain et douche à l\'italienne',
  category: 'details',
  span: 'normal'
}];


const CATEGORIES = [
{ key: 'all', labelFr: 'Tout voir', labelEn: 'All', labelAr: 'الكل' },
{ key: 'patio', labelFr: 'Le Patio', labelEn: 'Patio', labelAr: 'الفناء' },
{ key: 'chambres', labelFr: 'Chambres', labelEn: 'Rooms', labelAr: 'الغرف' },
{ key: 'terrasses', labelFr: 'Terrasses', labelEn: 'Terraces', labelAr: 'الأسطح' },
{ key: 'salons', labelFr: 'Salons', labelEn: 'Lounges', labelAr: 'الصالونات' },
{ key: 'details', labelFr: 'Détails & Architecture', labelEn: 'Architecture', labelAr: 'العمارة' }];


function getCategoryLabel(cat: typeof CATEGORIES[0], locale: Locale) {
  if (locale === 'en') return cat.labelEn;
  if (locale === 'ar') return cat.labelAr;
  return cat.labelFr;
}

function getSpanClass(span?: string) {
  switch (span) {
    case 'wide':return 'col-span-2';
    case 'tall':return 'row-span-2';
    case 'large':return 'col-span-2 row-span-2';
    default:return '';
  }
}

export default function GaleriePageClient() {
  const [locale, setLocale] = useState<Locale>('fr');
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const filtered =
  activeCategory === 'all' ?
  GALLERY_IMAGES :
  GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsAnimating(true);
    setTimeout(() => {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
      setIsAnimating(false);
    }, 150);
  }, [lightboxIndex, filtered.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsAnimating(true);
    setTimeout(() => {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
      setIsAnimating(false);
    }, 150);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  const pageTitle = locale === 'en' ? 'Gallery' : locale === 'ar' ? 'معرض الصور' : 'Galerie';
  const pageSubtitle =
  locale === 'en' ? 'Discover the beauty of Riad Dar Pa Labzioui through our curated photography' :
  locale === 'ar' ? 'اكتشف جمال رياض دار با لبزيوي من خلال صورنا المختارة' : 'Découvrez la beauté du Riad Dar Pa Labzioui à travers notre sélection photographique';

  return (
    <div className="min-h-screen bg-ivory" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <PublicNav locale={locale} onLocaleChange={handleLocaleChange} />

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_122f5a97d-1783765387267.png"
          alt="Vue du patio du Riad Dar Pa Labzioui"
          fill
          priority
          className="object-cover"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-dark-brown/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sand/70 mb-3">
            Riad Dar Pa Labzioui
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ivory mb-4">
            {pageTitle}
          </h1>
          <div className="h-px w-16 bg-sand/40 mx-auto" />
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-16">
        {/* Subtitle */}
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
          {pageSubtitle}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) =>
          <button
            key={cat.key}
            onClick={() => {setActiveCategory(cat.key);setLightboxIndex(null);}}
            className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all duration-300 ${
            activeCategory === cat.key ?
            'bg-terracotta text-ivory shadow-sm' :
            'bg-sand/20 text-dark-brown hover:bg-sand/50 border border-sand/30'}`
            }>
            
              {getCategoryLabel(cat, locale)}
            </button>
          )}
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {filtered.map((img, idx) =>
          <button
            key={`${img.src}-${idx}`}
            onClick={() => openLightbox(idx)}
            className={`relative overflow-hidden rounded-sm group cursor-pointer ${getSpanClass(img.span)}`}
            aria-label={`Voir : ${img.alt}`}>
            
              <AppImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            
              {/* Overlay */}
              <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/40 transition-all duration-400 flex items-end justify-start p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <ZoomIn size={14} className="text-ivory" />
                    <span className="text-ivory text-xs uppercase tracking-widest font-medium">
                      {locale === 'en' ? 'View' : locale === 'ar' ? 'عرض' : 'Voir'}
                    </span>
                  </div>
                </div>
              </div>
              {/* Category badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-terracotta/80 text-ivory text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">
                  {CATEGORIES.find((c) => c.key === img.category) ?
                getCategoryLabel(CATEGORIES.find((c) => c.key === img.category)!, locale) :
                img.category}
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Count */}
        <p className="text-center text-muted-foreground text-xs mt-8 tracking-wide">
          {filtered.length} {locale === 'en' ? 'photos' : locale === 'ar' ? 'صورة' : 'photos'}
        </p>
      </main>

      <PublicFooter />

      {/* Lightbox */}
      {lightboxIndex !== null &&
      <div
        className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center"
        onClick={closeLightbox}>
        
          {/* Close */}
          <button
          className="absolute top-5 right-5 text-ivory/60 hover:text-ivory transition-colors z-10 p-2 hover:bg-white/10 rounded-sm"
          onClick={closeLightbox}
          aria-label="Fermer">
          
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-ivory/50 text-xs tracking-widest">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors z-10 p-3 hover:bg-white/10 rounded-sm"
          onClick={(e) => {e.stopPropagation();prevImage();}}
          aria-label="Image précédente">
          
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div
          className={`relative w-full max-w-5xl max-h-[85vh] mx-20 transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          onClick={(e) => e.stopPropagation()}>
          
            <div className="relative" style={{ aspectRatio: '4/3' }}>
              <AppImage
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority />
            
            </div>
            <div className="mt-4 text-center">
              <p className="text-ivory/70 text-sm leading-relaxed max-w-2xl mx-auto">
                {filtered[lightboxIndex].alt}
              </p>
              <span className="inline-block mt-2 text-terracotta/70 text-[10px] uppercase tracking-widest">
                {CATEGORIES.find((c) => c.key === filtered[lightboxIndex].category) ?
              getCategoryLabel(CATEGORIES.find((c) => c.key === filtered[lightboxIndex].category)!, locale) :
              filtered[lightboxIndex].category}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors z-10 p-3 hover:bg-white/10 rounded-sm"
          onClick={(e) => {e.stopPropagation();nextImage();}}
          aria-label="Image suivante">
          
            <ChevronRight size={32} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs overflow-hidden">
            {filtered.slice(Math.max(0, lightboxIndex - 2), lightboxIndex + 3).map((img, i) => {
            const realIdx = Math.max(0, lightboxIndex - 2) + i;
            return (
              <button
                key={`thumb-${realIdx}`}
                onClick={(e) => {e.stopPropagation();setLightboxIndex(realIdx);}}
                className={`relative w-10 h-10 flex-shrink-0 rounded-sm overflow-hidden transition-all duration-200 ${
                realIdx === lightboxIndex ? 'ring-2 ring-terracotta opacity-100' : 'opacity-40 hover:opacity-70'}`
                }>
                
                  <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="40px" />
                </button>);

          })}
          </div>
        </div>
      }
    </div>);

}