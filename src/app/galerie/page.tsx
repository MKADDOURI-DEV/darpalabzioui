import type { Metadata } from 'next';
import GaleriePageClient from './components/GaleriePageClient';

export const metadata: Metadata = {
  title: 'Galerie — Riad Dar Pa Labzioui, Meknès',
  description: 'Découvrez en images le Riad Dar Pa Labzioui : patio, chambres, terrasses, salons marocains, architecture et la médina de Meknès.',
};

export default function GaleriePage() {
  return <GaleriePageClient />;
}
