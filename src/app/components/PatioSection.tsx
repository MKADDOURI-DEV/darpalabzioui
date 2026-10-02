import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function PatioSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Images Composition */}
          <div className="relative">
            <div className="relative h-96 lg:h-[520px] rounded-sm overflow-hidden shadow-warm-xl">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f01e49fd-1772210725810.png"
                alt="Patio central du Riad Dar Pa Labzioui avec fontaine en marbre et orangers en pot"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
            </div>
            <div className="absolute -bottom-6 -right-4 w-48 h-36 rounded-sm overflow-hidden border-4 border-card shadow-warm-lg hidden lg:block">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1a4d8409c-1775414439447.png"
                alt="Terrasse du riad avec vue sur les toits de la médina de Meknès"
                fill
                className="object-cover"
                sizes="200px" />
              
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">Espaces communs</p>
            <h2 className="font-serif text-section-title text-dark-brown font-bold mb-6">
              Le patio, cœur vivant du riad
            </h2>
            <div className="arch-decoration" />
            <p className="text-muted-foreground leading-relaxed mb-5">
              Dès votre arrivée, le patio central vous accueille de son murmure d&apos;eau et de ses parfums de jasmin. Architecture en arcs traditionnels, zellige artisanal et fontaine en marbre — un espace hors du temps au cœur de la médina de Meknès.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nos deux terrasses offrent une vue imprenable sur les toits de la médina et les minarets historiques. Le coin thé du patio invite à la dégustation du thé à la menthe fraîche, tradition de l&apos;hospitalité marocaine.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
              { value: '2', label: 'Terrasses panoramiques' },
              { value: '1', label: 'Patio avec fontaine' },
              { value: '3', label: 'Salons marocains' },
              { value: '5', label: 'Chambres privées' }]?.
              map((stat) =>
              <div key={`patio-stat-${stat?.label}`} className="border border-border rounded-sm p-4">
                  <div className="font-serif text-2xl font-bold text-terracotta tabular-nums">{stat?.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}