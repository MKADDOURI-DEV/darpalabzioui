'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Phone, Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'rooms', href: '/rooms-accommodations' },
  { key: 'galerie', href: '/galerie' },
  { key: 'contact', href: '/contact' },
];

interface PublicNavProps {
  locale?: Locale;
  onLocaleChange?: (l: Locale) => void;
}

export default function PublicNav({ locale = 'fr', onLocaleChange }: PublicNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = getTranslation(locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkMap: Record<string, string> = {
    home: t.nav.home,
    rooms: t.nav.rooms,
    galerie: t.nav.gallery,
    contact: t.nav.contact,
  };

  const locales: { code: Locale; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'glass-nav scrolled' : 'glass-nav'
        }`}
        style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <AppLogo size={56} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={`nav-${link.key}`}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-sm ${
                    scrolled
                      ? 'text-dark-brown hover:text-terracotta' :'text-ivory/90 hover:text-ivory'
                  }`}
                >
                  {navLinkMap[link.key]}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors duration-200 ${
                    scrolled ? 'text-dark-brown hover:text-terracotta' : 'text-ivory/80 hover:text-ivory'
                  }`}
                >
                  <Globe size={15} />
                  <span className="uppercase">{locale}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded shadow-warm-md py-1 min-w-[80px] z-10 animate-scale-in">
                    {locales.map((l) => (
                      <button
                        key={`lang-${l.code}`}
                        onClick={() => { onLocaleChange?.(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          locale === l.code ? 'text-terracotta font-semibold' : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/212667625415"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  scrolled ? 'text-dark-brown hover:text-terracotta' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                <Phone size={15} />
                <span>WhatsApp</span>
              </a>

              <Link href="/booking" className="btn-primary text-xs px-5 py-2.5">
                {t.hero.bookBtn}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded transition-colors ${
                scrolled ? 'text-dark-brown' : 'text-ivory'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-dark-brown/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-card shadow-warm-xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="font-serif text-base font-semibold text-foreground">Riad Dar Pa Labzioui</div>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 py-4 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={`mobile-nav-${link.key}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm font-medium text-foreground hover:text-terracotta hover:bg-muted/50 transition-colors"
                >
                  {navLinkMap[link.key]}
                </Link>
              ))}
              <div className="px-6 pt-4 border-t border-border mt-4">
                <div className="flex gap-2 mb-4">
                  {locales.map((l) => (
                    <button
                      key={`mobile-lang-${l.code}`}
                      onClick={() => { onLocaleChange?.(l.code); setMobileOpen(false); }}
                      className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                        locale === l.code
                          ? 'bg-terracotta text-ivory border-terracotta' :'border-border text-muted-foreground hover:border-terracotta hover:text-terracotta'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-xs"
                >
                  {t.hero.bookBtn}
                </Link>
              </div>
            </div>
            <div className="p-5 border-t border-border">
              <a href="tel:+212667625415" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta transition-colors">
                <Phone size={14} />
                +212 667 625 415
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}