import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import ToasterProvider from '@/components/ToasterProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Riad Dar Pa Labzioui — Maison d\'hôtes à Meknès',
  description:
    'Riad Dar Pa Labzioui, maison d\'hôtes traditionnelle dans la médina de Meknès. Chambres avec salle de bain privée, patio, cuisine marocaine et accueil familial authentique.',
  keywords: [
    'riad Meknès',
    'maison d\'hôtes Meknès',
    'séjour médina Meknès',
    'Dar Pa Labzioui',
    'riad Maroc',
  ],
  openGraph: {
    title: 'Riad Dar Pa Labzioui — Meknès, Maroc',
    description:
      'Maison d\'hôtes traditionnelle dans la médina de Meknès. Architecture marocaine authentique, hospitalité familiale.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}

        <ToasterProvider />
      </body>
    </html>
  );
}
