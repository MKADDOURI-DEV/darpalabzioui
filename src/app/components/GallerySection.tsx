'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_122f5a97d-1783765387267.png',
  alt: 'Patio central du Riad Dar Pa Labzioui avec fontaine et arches traditionnelles marocaines',
  category: 'patio'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_4a58aaa5d-1790934921462.png",
  alt: 'Chambre Zellige ornée de mosaïques artisanales et lit double en bois de cèdre',
  category: 'chambres'
},
{
  src: "https://images.unsplash.com/photo-1734418563367-48d19df3a3cf",
  alt: 'Chambre Moucharabieh avec fenêtres en bois sculpté filtrant la lumière en dentelle',
  category: 'chambres'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d8409c-1775414439447.png",
  alt: 'Chambre Terrasse avec accès privatif et vue panoramique sur les toits de Meknès',
  category: 'chambres'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_419dd81f3-1790934920092.png",
  alt: 'Suite Patio spacieuse ouvrant directement sur le patio central avec sa fontaine',
  category: 'patio'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_13bed87c4-1773214096147.png",
  alt: 'Terrasse panoramique du riad avec vue sur les minarets et les toits de la médina de Meknès',
  category: 'terrasses'
},
{
  src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1af59c0d8-1774730920282.png',
  alt: 'Vue panoramique depuis la terrasse du riad sur la médina historique de Meknès',
  category: 'terrasses'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f01e49fd-1772210725810.png",
  alt: 'Détail des zellige marocains artisanaux ornant les murs du riad',
  category: 'architecture'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d5b9d53f-1772248726457.png",
  alt: 'Détail architectural des arches et moucharabiehs en bois sculpté du riad',
  category: 'architecture'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_123f55966-1776112343112.png",
  alt: 'Chambre Argan avec décoration en bois naturel et ambiance chaleureuse',
  category: 'chambres'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_19886b805-1772485129561.png",
  alt: 'Salle de bain privative avec carrelage traditionnel marocain et douche à l\'italienne',
  category: 'architecture'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_171f81f90-1783587013511.png",
  alt: 'Salon marocain avec canapés traditionnels, coussins brodés et lanterne en laiton',
  category: 'salons'
}];


const CATEGORIES = [
{ key: 'all', label: 'Tout' },
{ key: 'patio', label: 'Patio' },
{ key: 'chambres', label: 'Chambres' },
{ key: 'terrasses', label: 'Terrasses' },
{ key: 'architecture', label: 'Architecture' },
{ key: 'salons', label: 'Salons' }];


export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
  activeCategory === 'all' ?
  GALLERY_IMAGES :
  GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">
            Galerie
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-dark-brown mb-4">
            Le Riad en Images
          </h2>
          <div className="arch-decoration mx-auto mb-6" style={{ width: '60px' }} />
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Découvrez l&apos;architecture traditionnelle, les chambres ornées d&apos;artisanat marocain et les espaces de vie du Riad Dar Pa Labzioui.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) =>
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
            activeCategory === cat.key ?
            'bg-terracotta text-ivory' : 'bg-sand/30 text-dark-brown hover:bg-sand/60'}`
            }>
            
              {cat.label}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, idx) =>
          <button
            key={`${img.src}-${idx}`}
            onClick={() => openLightbox(idx)}
            className={`relative overflow-hidden rounded-sm group cursor-pointer ${
            idx % 7 === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`
            }>
            
              <AppImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            
              <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-ivory text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  Voir
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null &&
      <div
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={closeLightbox}>
        
          {/* Close */}
          <button
          className="absolute top-5 right-5 text-ivory/70 hover:text-ivory transition-colors z-10"
          onClick={closeLightbox}
          aria-label="Fermer">
          
            <X size={28} />
          </button>

          {/* Prev */}
          <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-ivory transition-colors z-10 p-2"
          onClick={(e) => {e.stopPropagation();prevImage();}}
          aria-label="Image précédente">
          
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
          className="relative w-full max-w-4xl max-h-[85vh] mx-16"
          onClick={(e) => e.stopPropagation()}>
          
            <div className="relative aspect-[4/3]">
              <AppImage
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority />
            
            </div>
            <p className="text-ivory/60 text-xs text-center mt-3 tracking-wide">
              {filtered[lightboxIndex].alt}
            </p>
            <p className="text-ivory/40 text-xs text-center mt-1">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/70 hover:text-ivory transition-colors z-10 p-2"
          onClick={(e) => {e.stopPropagation();nextImage();}}
          aria-label="Image suivante">
          
            <ChevronRight size={36} />
          </button>
        </div>
      }
    </section>);

}