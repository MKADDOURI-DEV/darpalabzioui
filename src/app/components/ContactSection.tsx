import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark-brown text-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Info */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-sand mb-4">Contact & Accès</p>
            <h2 className="font-serif text-section-title text-ivory font-bold mb-6">
              Venez nous rendre visite
            </h2>
            <p className="text-ivory/65 leading-relaxed mb-8">
              Notre riad est situé dans le cœur historique de Dar Lakbira, à deux pas de Bab Mansour et de la Place El Hedim. Notre équipe vous guidera jusqu&apos;à l&apos;entrée discrète du riad.
            </p>
            <div className="space-y-4 mb-8">
              <a href="tel:+212667625415" className="flex items-center gap-3 text-ivory/70 hover:text-terracotta transition-colors">
                <div className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </div>
                <span className="text-sm">+212 667 625 415</span>
              </a>
              <a
                href="https://wa.me/212667625415?text=Bonjour%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20le%20Riad%20Dar%20Pa%20Labzioui."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory/70 hover:text-terracotta transition-colors"
              >
                <div className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} />
                </div>
                <span className="text-sm">WhatsApp : +212 667 625 415</span>
              </a>
              <a href="mailto:maisondhotesdarpalabzioui@gmail.com" className="flex items-center gap-3 text-ivory/70 hover:text-terracotta transition-colors">
                <div className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <span className="text-sm break-all">maisondhotesdarpalabzioui@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-ivory/70">
                <div className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="text-sm">81 Ksar Chaachaa, Dar Lakbira, Meknès 50000, Maroc</span>
              </div>
            </div>
            <div className="border border-ivory/15 rounded-sm p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ivory/40 mb-3">Informations pratiques</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-ivory/40 text-xs mb-1">Arrivée</div>
                  <div className="text-ivory/80">À partir de 14h00</div>
                </div>
                <div>
                  <div className="text-ivory/40 text-xs mb-1">Départ</div>
                  <div className="text-ivory/80">Avant 12h00</div>
                </div>
                <div>
                  <div className="text-ivory/40 text-xs mb-1">Wi-Fi</div>
                  <div className="text-ivory/80">Gratuit</div>
                </div>
                <div>
                  <div className="text-ivory/40 text-xs mb-1">Navette</div>
                  <div className="text-ivory/80">Sur demande</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-sm overflow-hidden border border-ivory/15 h-80 lg:h-auto min-h-[320px] bg-ivory/5 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin size={32} className="text-terracotta mx-auto mb-3" />
              <p className="text-ivory/50 text-sm mb-2">Carte interactive</p>
              <p className="text-ivory/30 text-xs">Intégration OpenStreetMap à configurer</p>
              <a
                href="https://maps.google.com/?q=81+Ksar+Chaachaa+Dar+Lakbira+Meknes+Morocco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs text-sand hover:text-terracotta transition-colors"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}