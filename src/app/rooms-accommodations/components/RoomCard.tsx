'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import { Users, BedDouble, Maximize2, Snowflake, Bath, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Room } from '@/lib/mockData';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [imageIdx, setImageIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIdx((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = room.images[imageIdx] || room.images[0];

  return (
    <div className="bg-card border border-border rounded-sm shadow-warm-sm overflow-hidden card-hover">
      {/* Image Gallery */}
      <div className="relative h-64 group overflow-hidden">
        <AppImage
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-brown/60 text-ivory rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-brown/80"
              aria-label="Image précédente"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-brown/60 text-ivory rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-brown/80"
              aria-label="Image suivante"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {room.images.map((_, i) => (
                <div
                  key={`${room.id}-dot-${i}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imageIdx ? 'bg-ivory' : 'bg-ivory/40'}`}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-terracotta text-ivory text-xs px-2.5 py-1 rounded-sm font-medium">
            À partir de {room.pricePerNight.toLocaleString()} MAD / nuit
          </span>
        </div>
        {room.hasAC && (
          <div className="absolute top-3 right-3">
            <span className="bg-dark-brown/70 text-ivory text-xs px-2 py-1 rounded-sm flex items-center gap-1">
              <Snowflake size={11} /> Climatisée
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-dark-brown mb-2">{room.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {expanded ? room.description : `${room.description.substring(0, 120)}...`}
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-terracotta text-xs hover:underline"
          >
            {expanded ? 'Réduire' : 'Lire plus'}
          </button>
        </p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center border border-border rounded-sm py-2">
            <Users size={14} className="mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Capacité</div>
            <div className="text-sm font-semibold text-foreground">{room.capacity} pers.</div>
          </div>
          <div className="text-center border border-border rounded-sm py-2">
            <Maximize2 size={14} className="mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Surface</div>
            <div className="text-sm font-semibold text-foreground">{room.size}</div>
          </div>
          <div className="text-center border border-border rounded-sm py-2">
            <Bath size={14} className="mx-auto mb-1 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Salle de bain</div>
            <div className="text-sm font-semibold text-foreground">Privée</div>
          </div>
        </div>

        {/* Bed type */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <BedDouble size={14} className="text-terracotta" />
          <span>{room.bedType}</span>
          <span className="text-border">·</span>
          <span className="text-xs">{room.floor}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.map((amenity) => (
            <span key={`${room.id}-am-${amenity}`} className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
              <Check size={10} className="text-deep-green" />
              {amenity}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Link
            href={`/booking?room=${room.id}`}
            className="btn-primary flex-1 justify-center text-xs py-2.5"
          >
            Demander une réservation
          </Link>
        </div>
      </div>
    </div>
  );
}