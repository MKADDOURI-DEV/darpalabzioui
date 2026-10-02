import React from 'react';
import { TESTIMONIALS } from '@/lib/mockData';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-card zellige-pattern">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">Témoignages</p>
          <h2 className="font-serif text-section-title text-dark-brown font-bold mb-2">
            Ce que disent nos hôtes
          </h2>
          <p className="text-xs text-muted-foreground italic mt-2">
            Témoignages recueillis sur les plateformes de réservation. Contenu configurable par le propriétaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {TESTIMONIALS?.map((t) => (
            <div key={t?.id} className="bg-card border border-border rounded-sm p-5 shadow-warm-sm hover:shadow-warm-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 })?.map((_, i) => (
                  <Star
                    key={`${t?.id}-star-${i}`}
                    size={13}
                    className={i < t?.rating ? 'text-brass fill-brass' : 'text-border'}
                    fill={i < t?.rating ? 'var(--brass)' : 'none'}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">&ldquo;{t?.comment}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground">{t?.name}</div>
                  <div className="text-xs text-muted-foreground">{t?.country}</div>
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">{t?.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}