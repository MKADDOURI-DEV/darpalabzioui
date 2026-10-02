import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function CuisineSection() {
  const dishes = [
  { id: 'dish-001', name: 'Petit-déjeuner continental', desc: 'Pain maison, msemen, amlou, confiture de figue et thé à la menthe.' },
  { id: 'dish-002', name: 'Tajine de kefta', desc: 'Boulettes de viande épicées mijotées aux tomates et œufs, recette familiale.' },
  { id: 'dish-003', name: 'Couscous du vendredi', desc: 'Sept légumes de saison, viande confite et bouillon parfumé au safran.' }];


  return (
    <section className="py-20 lg:py-28 bg-dark-brown text-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-sand mb-4">Gastronomie</p>
            <h2 className="font-serif text-section-title text-ivory font-bold mb-6">
              La cuisine marocaine, art de vivre familial
            </h2>
            <p className="text-ivory/65 leading-relaxed mb-5">
              Chaque matin, un petit-déjeuner généreux est servi dans le patio ou sur la terrasse — pain marocain fait maison, huile d&apos;argan, miel du Moyen-Atlas et thé à la menthe fraîche.
            </p>
            <p className="text-ivory/65 leading-relaxed mb-8">
              Sur demande, la famille Labzioui prépare les plats emblématiques de la cuisine marocaine : tajines parfumés, couscous du vendredi, pastilla et harira. Une expérience culinaire authentique, préparée avec les produits des souks de Meknès.
            </p>
            <ul className="space-y-4 mb-8">
              {dishes?.map((dish) =>
              <li key={dish?.id} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-ivory mb-0.5">{dish?.name}</div>
                    <div className="text-xs text-ivory/55 leading-relaxed">{dish?.desc}</div>
                  </div>
                </li>
              )}
            </ul>
            <Link href="/booking" className="btn-primary text-sm">
              Inclure un repas dans ma demande
            </Link>
          </div>

          {/* Image */}
          <div className="relative h-80 lg:h-[500px] rounded-sm overflow-hidden shadow-warm-xl">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1f8ab0115-1772250228897.png"
              alt="Tajine marocain traditionnel avec légumes colorés et herbes fraîches, servi sur plateau en cuivre"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw" />
            
          </div>
        </div>
      </div>
    </section>);

}