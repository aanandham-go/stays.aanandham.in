import { RegionData } from './types';

export const regionsData: RegionData[] = [
  {
    id: 'himachal',
    slug: 'himachal',
    name: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    primaryKeyword: 'boutique stays in himachal pradesh',
    targetKeywords: [
      'budget stays in himachal pradesh',
      'himachal homestays in parvati valley',
      'backpacker dorms himachal',
      'himachal mountain retreats',
      'workation stays in himachal with wifi'
    ],
    seoTitle: 'Boutique Stays in Himachal Pradesh | Aanandham Stays',
    seoDescription: 'Discover verified boutique mountain stays, backpacker dorms, and alpine cottages in Kalga and Kasol. Direct host booking with zero commission.',
    description: 'Boutique mountain retreats, sunrise balconies, and backpacker dorms tucked within uncommercialized pine villages of Parvati Valley.',
    weight: 1, // Himachal-first priority
    heroImage: {
      url: '/images/high-altitude-ridge-tent.jpg',
      alt: 'Scenic pine forest valley and Himalayan peaks in Himachal Pradesh',
      width: 1200,
      height: 630
    },
    status: 'approved'
  },
  {
    id: 'munnar',
    slug: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    primaryKeyword: 'boutique stays in munnar kerala',
    targetKeywords: [
      'geodesic dome stay munnar',
      'suryanelli camping and tent stay',
      'kolukkumalai sunrise stays',
      'kerala mountain ridge stays'
    ],
    seoTitle: 'Boutique Stays & Domes in Munnar | Aanandham Stays',
    seoDescription: 'Book verified high-altitude geodesic domes, tea valley ridge stays, and timber cabins across Munnar and Suryanelli with direct host WhatsApp.',
    description: 'High-altitude geodesic glamping domes, tea estate ridge stays, and stepped timber cabins overlooking morning cloud beds in the Western Ghats.',
    weight: 2, // Secondary priority
    heroImage: {
      url: '/images/services/munnar-hero-landing.jpg',
      alt: 'Misty green tea plantation valleys and sunrise cloud beds in Munnar Kerala',
      width: 1200,
      height: 630
    },
    status: 'approved'
  }
];
