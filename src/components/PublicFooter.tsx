import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Phone, Mail, MapPin } from 'lucide-react';

// Inline SVG icons for social media
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function PublicFooter() {
  return (
    <footer className="bg-dark-brown text-ivory/80" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Moroccan divider */}
      <div className="moroccan-divider opacity-30" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <AppLogo size={36} />
              <div>
                <div className="font-serif text-xl font-semibold text-ivory">Riad Dar Pa Labzioui</div>
                <div className="text-xs tracking-widest uppercase text-ivory/50">Meknès · Maroc</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ivory/60 max-w-xs mb-6">
              Maison d&apos;hôtes traditionnelle dans la médina impériale de Meknès. Architecture marocaine authentique, hospitalité familiale et art de vivre raffiné.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/darpalabzioui.meknes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/riad_dar_pa_labzioui"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-sm border border-ivory/20 flex items-center justify-center hover:border-terracotta hover:text-terracotta transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ivory/40 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Chambres', href: '/rooms-accommodations' },
                { label: 'Réservation', href: '/booking' },
                { label: 'Contact', href: '/contact' },
              ]?.map((item) => (
                <li key={`footer-nav-${item?.href}`}>
                  <Link href={item?.href} className="text-sm text-ivory/60 hover:text-terracotta transition-colors">
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ivory/40 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+212667625415" className="flex items-start gap-2.5 text-sm text-ivory/60 hover:text-terracotta transition-colors">
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  +212 667 625 415
                </a>
              </li>
              <li>
                <a href="mailto:maisondhotesdarpalabzioui@gmail.com" className="flex items-start gap-2.5 text-sm text-ivory/60 hover:text-terracotta transition-colors break-all">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  maisondhotesdarpalabzioui@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-ivory/60">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>81 Ksar Chaachaa, Dar Lakbira, Meknès 50000, Maroc</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/30">
            © 2026 Riad Dar Pa Labzioui. Tous droits réservés.
          </p>
          <p className="text-xs text-ivory/30">
            81 Ksar Chaachaa, Dar Lakbira, Meknès 50000, Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}