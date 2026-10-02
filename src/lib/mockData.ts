export interface Room {
  id: string;
  slug: string;
  name: string;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  description: string;
  bedType: string;
  capacity: number;
  pricePerNight: number;
  image: string;
  images: {src: string;alt: string;}[];
  amenities: string[];
  hasAC: boolean;
  hasPrivateBath: boolean;
  floor: string;
  size: string;
  active: boolean;
}

export interface BookingRequest {
  id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestNationality: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  amount: number;
  status: 'nouvelle' | 'attente' | 'confirmee' | 'refusee' | 'annulee' | 'terminee';
  source: string;
  specialRequests: string;
  createdAt: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
}

export const ROOMS: Room[] = [
{
  id: 'room-001',
  slug: 'chambre-zellige',
  name: 'Chambre Zellige',
  nameFr: 'Chambre Zellige',
  nameEn: 'Zellige Room',
  nameAr: 'غرفة الزليج',
  description: 'Une chambre d\'exception ornée de zellige artisanal, baignée de lumière naturelle. Ses murs décorés de mosaïques traditionnelles témoignent du savoir-faire marocain transmis de génération en génération.',
  bedType: 'Lit double (160×200)',
  capacity: 2,
  pricePerNight: 850,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1667f3ed4-1785927081180.png",
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1dce45a39-1776113140890.png", alt: 'Chambre Zellige vue principale avec mosaïques artisanales et lit double' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_11ca16856-1778777379683.png", alt: 'Détail des zellige marocains sur les murs de la chambre' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_107331a3c-1772090782446.png", alt: 'Salle de bain privative de la chambre Zellige' }],

  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Serviettes fournies', 'Vue sur patio', 'Coffre-fort', 'Prises USB'],
  hasAC: true,
  hasPrivateBath: true,
  floor: 'Rez-de-chaussée',
  size: '22 m²',
  active: true
},
{
  id: 'room-002',
  slug: 'chambre-moucharabieh',
  name: 'Chambre Moucharabieh',
  nameFr: 'Chambre Moucharabieh',
  nameEn: 'Moucharabieh Room',
  nameAr: 'غرفة المشربية',
  description: 'Sous ses fenêtres en bois sculpté moucharabieh filtrant la lumière en dentelle d\'ombre, cette chambre offre une atmosphère unique mêlant intimité et élégance traditionnelle.',
  bedType: 'Lit double (180×200)',
  capacity: 2,
  pricePerNight: 950,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1481f5d-1785497247236.png",
  images: [
  { src: "https://images.unsplash.com/photo-1604214796723-c05b9b67cec8", alt: 'Chambre Moucharabieh avec fenêtres en bois sculpté filtrant la lumière' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_123f55966-1776112343112.png", alt: 'Lit double en bois de cèdre sculpté dans la chambre Moucharabieh' },
  { src: "https://images.unsplash.com/photo-1594983616828-5f72da47ecf6", alt: 'Détail du moucharabieh en bois sculpté de la chambre' }],

  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Baignoire', 'Peignoirs', 'Minibar', 'Bureau en cèdre'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '1er étage',
  size: '28 m²',
  active: true
},
{
  id: 'room-003',
  slug: 'chambre-argan',
  name: 'Chambre Argan',
  nameFr: 'Chambre Argan',
  nameEn: 'Argan Room',
  nameAr: 'غرفة الأركان',
  description: 'Inspirée par les arganiers du Maroc profond, cette chambre chaleureuse aux teintes de terre et de bois offre un cocon de sérénité au cœur de la médina.',
  bedType: '2 lits simples (90×200)',
  capacity: 2,
  pricePerNight: 780,
  image: "https://images.unsplash.com/photo-1725998340512-d4ca0294b9d4",
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_42344a6b2-1790934443384.png", alt: 'Chambre Argan avec deux lits simples et décoration en bois naturel' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_48f53fa9e-1790934502296.png", alt: 'Vue de la fenêtre de la chambre Argan sur la médina' }],

  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Serviettes', 'Plateau thé/café', 'Penderie'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '1er étage',
  size: '20 m²',
  active: true
},
{
  id: 'room-004',
  slug: 'suite-patio',
  name: 'Suite Patio',
  nameFr: 'Suite Patio',
  nameEn: 'Patio Suite',
  nameAr: 'جناح الفناء',
  description: 'La chambre la plus spacieuse du riad, ouvrant directement sur le patio central avec sa fontaine. Une expérience immersive au cœur de l\'architecture marocaine traditionnelle.',
  bedType: 'Lit king size (200×200)',
  capacity: 3,
  pricePerNight: 1200,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_122f5a97d-1783765387267.png",
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_4ba2a6325-1790934448278.png", alt: 'Suite Patio spacieuse avec vue sur le patio central et sa fontaine' },
  { src: "https://images.unsplash.com/photo-1605951246205-10db5881aaee", alt: 'Salon privé de la Suite Patio avec canapés marocains' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_4f96495ad-1790934443679.png", alt: 'Salle de bain de la Suite Patio avec douche à l\'italienne' }],

  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Salon privatif', 'Vue sur patio', 'Baignoire', 'Peignoirs', 'Minibar', 'Service en chambre'],
  hasAC: true,
  hasPrivateBath: true,
  floor: 'Rez-de-chaussée',
  size: '38 m²',
  active: true
},
{
  id: 'room-005',
  slug: 'chambre-terrasse',
  name: 'Chambre Terrasse',
  nameFr: 'Chambre Terrasse',
  nameEn: 'Terrace Room',
  nameAr: 'غرفة التراس',
  description: 'Nichée au dernier étage, cette chambre possède son accès privatif à l\'une des terrasses du riad. Réveillez-vous face aux toits de Meknès et aux minarets de la médina.',
  bedType: 'Lit double (160×200)',
  capacity: 2,
  pricePerNight: 1050,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_4fa5a0b60-1790934444734.png",
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a4d8409c-1775414439447.png", alt: 'Chambre Terrasse avec accès privatif à la terrasse vue sur les toits de Meknès' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1af59c0d8-1774730920282.png", alt: 'Terrasse privée de la chambre avec vue panoramique sur la médina' }],

  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Terrasse privée', 'Vue panoramique', 'Plateau thé/café', 'Serviettes de plage'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '2ème étage',
  size: '25 m²',
  active: true
}];


export const BOOKING_REQUESTS: BookingRequest[] = [
{
  id: 'bk-001',
  reference: 'DPL-2026-0891',
  guestName: 'Sophie Marchand',
  guestEmail: 'sophie.marchand@gmail.com',
  guestPhone: '+33 6 12 34 56 78',
  guestNationality: 'France',
  roomId: 'room-004',
  roomName: 'Suite Patio',
  checkIn: '2026-10-15',
  checkOut: '2026-10-19',
  adults: 2,
  children: 0,
  nights: 4,
  amount: 4800,
  status: 'nouvelle',
  source: 'Site web',
  specialRequests: 'Chambre calme si possible, allergie aux plumes.',
  createdAt: '2026-10-02T07:14:22Z',
  notes: ''
},
{
  id: 'bk-002',
  reference: 'DPL-2026-0890',
  guestName: 'Karim El Fassi',
  guestEmail: 'k.elfassi@outlook.com',
  guestPhone: '+212 661 234 567',
  guestNationality: 'Maroc',
  roomId: 'room-002',
  roomName: 'Chambre Moucharabieh',
  checkIn: '2026-10-10',
  checkOut: '2026-10-13',
  adults: 2,
  children: 1,
  nights: 3,
  amount: 2850,
  status: 'confirmee',
  source: 'Site web',
  specialRequests: 'Lit bébé si disponible.',
  createdAt: '2026-09-28T14:30:00Z',
  notes: 'Confirmé par téléphone. Acompte reçu.'
},
{
  id: 'bk-003',
  reference: 'DPL-2026-0889',
  guestName: 'Thomas & Claire Weber',
  guestEmail: 'thomas.weber@web.de',
  guestPhone: '+49 172 345 6789',
  guestNationality: 'Allemagne',
  roomId: 'room-005',
  roomName: 'Chambre Terrasse',
  checkIn: '2026-10-20',
  checkOut: '2026-10-25',
  adults: 2,
  children: 0,
  nights: 5,
  amount: 5250,
  status: 'attente',
  source: 'Booking.com',
  specialRequests: 'Arrivée tardive vers 22h.',
  createdAt: '2026-09-30T09:45:00Z',
  notes: 'En attente confirmation disponibilité chambre terrasse.'
},
{
  id: 'bk-004',
  reference: 'DPL-2026-0888',
  guestName: 'Isabelle Fontaine',
  guestEmail: 'i.fontaine@yahoo.fr',
  guestPhone: '+33 7 89 01 23 45',
  guestNationality: 'France',
  roomId: 'room-001',
  roomName: 'Chambre Zellige',
  checkIn: '2026-10-08',
  checkOut: '2026-10-10',
  adults: 1,
  children: 0,
  nights: 2,
  amount: 1700,
  status: 'confirmee',
  source: 'Site web',
  specialRequests: '',
  createdAt: '2026-09-25T16:20:00Z',
  notes: 'Voyageuse solo, première visite au Maroc.'
},
{
  id: 'bk-005',
  reference: 'DPL-2026-0887',
  guestName: 'Mehdi Benali',
  guestEmail: 'mehdi.benali@gmail.com',
  guestPhone: '+212 655 987 654',
  guestNationality: 'Maroc',
  roomId: 'room-003',
  roomName: 'Chambre Argan',
  checkIn: '2026-10-05',
  checkOut: '2026-10-07',
  adults: 2,
  children: 0,
  nights: 2,
  amount: 1560,
  status: 'terminee',
  source: 'WhatsApp',
  specialRequests: 'Petit-déjeuner marocain traditionnel.',
  createdAt: '2026-09-20T11:00:00Z',
  notes: 'Séjour terminé. Très satisfait.'
},
{
  id: 'bk-006',
  reference: 'DPL-2026-0886',
  guestName: 'Anna Kowalski',
  guestEmail: 'anna.kowalski@wp.pl',
  guestPhone: '+48 501 234 567',
  guestNationality: 'Pologne',
  roomId: 'room-004',
  roomName: 'Suite Patio',
  checkIn: '2026-11-01',
  checkOut: '2026-11-05',
  adults: 2,
  children: 0,
  nights: 4,
  amount: 4800,
  status: 'nouvelle',
  source: 'Site web',
  specialRequests: 'Anniversaire de mariage, décoration surprise possible?',
  createdAt: '2026-10-01T18:55:00Z',
  notes: ''
},
{
  id: 'bk-007',
  reference: 'DPL-2026-0885',
  guestName: 'Pierre-Antoine Duval',
  guestEmail: 'pa.duval@sfr.fr',
  guestPhone: '+33 6 98 76 54 32',
  guestNationality: 'France',
  roomId: 'room-002',
  roomName: 'Chambre Moucharabieh',
  checkIn: '2026-10-12',
  checkOut: '2026-10-14',
  adults: 2,
  children: 0,
  nights: 2,
  amount: 1900,
  status: 'refusee',
  source: 'Site web',
  specialRequests: '',
  createdAt: '2026-09-22T08:30:00Z',
  notes: 'Chambre non disponible sur ces dates.'
},
{
  id: 'bk-008',
  reference: 'DPL-2026-0884',
  guestName: 'Laura Esposito',
  guestEmail: 'laura.esposito@gmail.it',
  guestPhone: '+39 333 456 7890',
  guestNationality: 'Italie',
  roomId: 'room-005',
  roomName: 'Chambre Terrasse',
  checkIn: '2026-10-28',
  checkOut: '2026-11-02',
  adults: 2,
  children: 0,
  nights: 5,
  amount: 5250,
  status: 'attente',
  source: 'Airbnb',
  specialRequests: 'Végétarienne, sans gluten.',
  createdAt: '2026-10-01T21:10:00Z',
  notes: 'Demande reçue via Airbnb, à confirmer.'
},
{
  id: 'bk-009',
  reference: 'DPL-2026-0883',
  guestName: 'Hassan Tahiri',
  guestEmail: 'h.tahiri@hotmail.com',
  guestPhone: '+212 670 112 233',
  guestNationality: 'Maroc',
  roomId: 'room-001',
  roomName: 'Chambre Zellige',
  checkIn: '2026-10-18',
  checkOut: '2026-10-20',
  adults: 2,
  children: 0,
  nights: 2,
  amount: 1700,
  status: 'confirmee',
  source: 'Téléphone',
  specialRequests: '',
  createdAt: '2026-09-27T10:15:00Z',
  notes: 'Confirmé directement par appel.'
},
{
  id: 'bk-010',
  reference: 'DPL-2026-0882',
  guestName: 'Margot & Luc Petit',
  guestEmail: 'margot.petit@free.fr',
  guestPhone: '+33 6 11 22 33 44',
  guestNationality: 'France',
  roomId: 'room-003',
  roomName: 'Chambre Argan',
  checkIn: '2026-11-10',
  checkOut: '2026-11-14',
  adults: 2,
  children: 0,
  nights: 4,
  amount: 3120,
  status: 'nouvelle',
  source: 'Site web',
  specialRequests: 'Voyage de noces.',
  createdAt: '2026-10-02T06:30:00Z',
  notes: ''
},
{
  id: 'bk-011',
  reference: 'DPL-2026-0881',
  guestName: 'Yuki Tanaka',
  guestEmail: 'yuki.tanaka@gmail.com',
  guestPhone: '+81 90 1234 5678',
  guestNationality: 'Japon',
  roomId: 'room-004',
  roomName: 'Suite Patio',
  checkIn: '2026-10-22',
  checkOut: '2026-10-26',
  adults: 2,
  children: 0,
  nights: 4,
  amount: 4800,
  status: 'attente',
  source: 'Trip.com',
  specialRequests: 'Pas de nourriture épicée.',
  createdAt: '2026-09-29T13:40:00Z',
  notes: ''
},
{
  id: 'bk-012',
  reference: 'DPL-2026-0880',
  guestName: 'Fatima Zahra Alaoui',
  guestEmail: 'fz.alaoui@gmail.com',
  guestPhone: '+212 662 445 566',
  guestNationality: 'Maroc',
  roomId: 'room-002',
  roomName: 'Chambre Moucharabieh',
  checkIn: '2026-10-07',
  checkOut: '2026-10-09',
  adults: 2,
  children: 2,
  nights: 2,
  amount: 1900,
  status: 'annulee',
  source: 'WhatsApp',
  specialRequests: 'Deux enfants en bas âge.',
  createdAt: '2026-09-18T09:00:00Z',
  notes: 'Annulée par la cliente pour raisons personnelles.'
}];


export const TESTIMONIALS: Testimonial[] = [
{
  id: 'tst-001',
  name: 'Sophie M.',
  country: 'France',
  rating: 5,
  comment: 'Un séjour absolument enchanteur. Le patio avec sa fontaine, les salons marocains, l\'accueil chaleureux de la famille — tout était parfait. Je recommande vivement.',
  date: '2026-09-15',
  source: 'Booking.com'
},
{
  id: 'tst-002',
  name: 'Thomas W.',
  country: 'Allemagne',
  rating: 5,
  comment: 'Wunderschönes Riad mitten in der Medina. Die Zimmer sind wunderschön dekoriert, das Frühstück war köstlich und die Familie sehr herzlich. Absolut empfehlenswert!',
  date: '2026-08-28',
  source: 'TripAdvisor'
},
{
  id: 'tst-003',
  name: 'Karim B.',
  country: 'Maroc',
  rating: 5,
  comment: 'Un vrai havre de paix au cœur de Meknès. L\'architecture est magnifique, les détails artisanaux sont soignés. On se sent comme chez soi mais dans un palais.',
  date: '2026-09-02',
  source: 'Google'
},
{
  id: 'tst-004',
  name: 'Laura E.',
  country: 'Italie',
  rating: 4,
  comment: 'Bellissimo riad nel cuore della medina. Camera fantastica con bagno privato. Colazione marocchina deliziosa. Posizione perfetta per visitare Meknès.',
  date: '2026-07-19',
  source: 'Airbnb'
}];


export const BOOKING_STATS = {
  totalRequests: 12,
  pending: 3,
  confirmed: 3,
  upcoming7Days: 2,
  unreadMessages: 5,
  occupancyRate: 68
};

export const WEEKLY_BOOKINGS = [
{ week: 'S38', requests: 3, confirmed: 2 },
{ week: 'S39', requests: 5, confirmed: 3 },
{ week: 'S40', requests: 2, confirmed: 1 },
{ week: 'S41', requests: 7, confirmed: 4 },
{ week: 'S42', requests: 4, confirmed: 3 },
{ week: 'S43', requests: 6, confirmed: 4 },
{ week: 'S44', requests: 3, confirmed: 2 }];