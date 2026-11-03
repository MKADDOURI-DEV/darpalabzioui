import { driveImg, ROOM_FOLDERS } from './driveImages';

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
  slug: 'chambre-double',
  name: 'Chambre Double',
  nameFr: 'Chambre Double',
  nameEn: 'Double Room',
  nameAr: 'غرفة مزدوجة',
  description: 'Une chambre double chaleureuse au cœur du riad, idéale pour un séjour en couple. Décoration traditionnelle marocaine et confort moderne.',
  bedType: 'Lit double',
  capacity: 2,
  pricePerNight: 0,
  image: driveImg(ROOM_FOLDERS.double[0], 1200),
  images: ROOM_FOLDERS.double.map((id, i) => ({ src: driveImg(id, 1600), alt: `Chambre Double du Riad Dar Pa Labzioui, photo ${i + 1}` })),
  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Serviettes fournies'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '',
  size: '',
  active: true
},
{
  id: 'room-002',
  slug: 'chambre-twin',
  name: 'Chambre Twin',
  nameFr: 'Chambre Twin',
  nameEn: 'Twin Room',
  nameAr: 'غرفة بسريرين منفصلين',
  description: 'Une chambre twin avec deux lits séparés, parfaite pour des amis ou des collègues voyageant ensemble, dans une ambiance authentique de riad.',
  bedType: '2 lits simples',
  capacity: 2,
  pricePerNight: 0,
  image: driveImg(ROOM_FOLDERS.twin[0], 1200),
  images: ROOM_FOLDERS.twin.map((id, i) => ({ src: driveImg(id, 1600), alt: `Chambre Twin du Riad Dar Pa Labzioui, photo ${i + 1}` })),
  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Serviettes fournies'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '',
  size: '',
  active: true
},
{
  id: 'room-003',
  slug: 'chambre-triple',
  name: 'Chambre Triple',
  nameFr: 'Chambre Triple',
  nameEn: 'Triple Room',
  nameAr: 'غرفة ثلاثية',
  description: 'Une chambre triple spacieuse, pensée pour les petits groupes et les familles, avec tout le charme du riad.',
  bedType: '3 couchages',
  capacity: 3,
  pricePerNight: 0,
  image: driveImg(ROOM_FOLDERS.triple[0], 1200),
  images: ROOM_FOLDERS.triple.map((id, i) => ({ src: driveImg(id, 1600), alt: `Chambre Triple du Riad Dar Pa Labzioui, photo ${i + 1}` })),
  amenities: ['Wi-Fi gratuit', 'Climatisation', 'Salle de bain privée', 'Serviettes fournies'],
  hasAC: true,
  hasPrivateBath: true,
  floor: '',
  size: '',
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
  roomId: 'room-001',
  roomName: 'Chambre Double',
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
  roomName: 'Chambre Twin',
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
  roomId: 'room-002',
  roomName: 'Chambre Twin',
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
  roomName: 'Chambre Double',
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
  roomName: 'Chambre Triple',
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
  roomId: 'room-001',
  roomName: 'Chambre Double',
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
  roomName: 'Chambre Twin',
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
  roomId: 'room-002',
  roomName: 'Chambre Twin',
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
  roomName: 'Chambre Double',
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
  roomName: 'Chambre Triple',
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
  roomId: 'room-001',
  roomName: 'Chambre Double',
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
  roomName: 'Chambre Twin',
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