import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { ROOMS } from '@/lib/mockData';
import { Users, BedDouble, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

interface RoomsPreviewSectionProps {
  locale: Locale;
}

export default function RoomsPreviewSection({ locale }: RoomsPreviewSectionProps) {
  const t = getTranslation(locale);
  const previewRooms = ROOMS.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-ivory zellige-pattern">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">Hébergement</p>
          <h2 className="font-serif text-section-title text-dark-brown font-bold mb-4">{t.rooms.title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.rooms.subtitle}</p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {previewRooms.map((room, idx) => (
            <div key={room.id} className="card-hover group bg-card rounded-sm overflow-hidden shadow-warm-sm border border-border">
              <div className="room-image-zoom relative h-56 overflow-hidden">
                <AppImage
                  src={room.image}
                  alt={room.images[0]?.alt || `Chambre ${room.name} du Riad Dar Pa Labzioui`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx === 0}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-dark-brown/80 text-ivory text-xs px-2.5 py-1 rounded-sm font-medium">
                    {t.rooms.from} {room.pricePerNight.toLocaleString()} MAD{t.rooms.perNight}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-dark-brown mb-2">{room.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{room.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {t.rooms.capacity} : {room.capacity}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={13} />
                    {room.bedType.split('(')[0].trim()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span key={`${room.id}-amenity-${amenity}`} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
                <Link
                  href="/rooms-accommodations"
                  className="flex items-center gap-2 text-sm font-medium text-terracotta hover:text-dark-brown transition-colors group-hover:gap-3"
                >
                  Voir la chambre
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/rooms-accommodations" className="btn-outline-dark">
            Voir toutes les chambres
          </Link>
        </div>
      </div>
    </section>
  );
}