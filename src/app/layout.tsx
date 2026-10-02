```tsx
import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

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
      <body>
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-sans)',
            },
          }}
        />

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdarpalabzi1312back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
        />

        <script
          type="module"
          defer
          src="https://static.rocket.new/rocket-shot.js?v=0.0.3"
        />
      </body>
    </html>
  );
}
```
