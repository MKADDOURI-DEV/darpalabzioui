import React from 'react';
import AppImage from '@/components/ui/AppImage';

const LANDMARKS = [
{
  id: 'landmark-001',
  name: 'Bab Mansour',
  desc: 'La porte monumentale la plus impressionnante du Maroc, chef-d\'œuvre de l\'architecture mérinide.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb29ba93-1769188433041.png",
  alt: 'Bab Mansour porte monumentale de Meknès avec arches décorées de zellige et calligraphie arabe'
},
{
  id: 'landmark-002',
  name: 'Place El Hedim',
  desc: 'La place vivante de Meknès, cœur de la vie sociale, face à Bab Mansour.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_4dc49ac88-1790934443717.png",
  alt: 'Place El Hedim de Meknès avec commerces animés et architecture traditionnelle marocaine'
},
{
  id: 'landmark-003',
  name: 'Médina impériale',
  desc: 'Classée patrimoine mondial UNESCO, la médina de Meknès conserve son authenticité intacte.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_42bd85a49-1790934444019.png",
  alt: 'Ruelle de la médina de Meknès avec artisans et architecture mérinide'
}];


export default function MeknesSection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta mb-4">Découverte</p>
          <h2 className="font-serif text-section-title text-dark-brown font-bold mb-4">
            Meknès, ville impériale
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            À quelques pas du riad, les trésors de la médina classée UNESCO vous attendent. Monuments historiques, souks artisanaux et culture vivante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDMARKS?.map((landmark) =>
          <div key={landmark?.id} className="card-hover group relative rounded-sm overflow-hidden shadow-warm-sm h-72">
              <AppImage
              src={landmark?.image}
              alt={landmark?.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-dark-brown/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-lg font-semibold text-ivory mb-2">{landmark?.name}</h3>
                <p className="text-xs text-ivory/70 leading-relaxed">{landmark?.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}