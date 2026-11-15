export interface TrekItem {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  price: number;
  priceFormatted: string;
  priceUnit: string;
  isProposed?: boolean;
  duration: string;
  isProvisional?: boolean;
  startingPoint: string;
  difficulty: 'Easy to Moderate' | 'Moderate' | 'Moderate to difficult';
  difficultyTone: 'easy' | 'moderate' | 'challenging';
  altitude: string;
  region: string;
  tagline: string;
  description: string;
  inclusions: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  waMessage: string;
}

export const treksData: TrekItem[] = [
  {
    id: 'kheerganga-trek',
    slug: 'kheerganga-trek',
    name: 'Kheerganga Trek',
    badge: 'Most Popular Trail',
    price: 900,
    priceFormatted: '₹900',
    priceUnit: '/ person',
    duration: '2 Days / 1 Night',
    startingPoint: 'Kalga Village',
    difficulty: 'Easy to Moderate',
    difficultyTone: 'easy',
    altitude: '9,700 FT',
    region: 'Parvati Valley, Himachal',
    tagline: 'Natural Geothermal Hot Springs & Alpine Pine Woods',
    description: 'A classic Himalayan pilgrimage ascending straight from Kalga village through apple orchards, moss-covered pine woods, and roaring mountain streams to the healing geothermal hot water springs of Kheerganga under open alpine skies.',
    inclusions: [
      'Experienced mountain trek guide',
      'Overnight accommodation',
      'Warm dinner & mountain breakfast',
      'Scenic trail access via Kalga Village'
    ],
    highlights: [
      'Natural Hot Water Springs',
      'Starts from Kalga Village',
      'Pine Forest Trail',
      'Hot Meals Included'
    ],
    image: '/images/treks/kheerganga-trek-parvati-valley.jpg',
    imageAlt: 'Panoramic campsite and alpine meadow of Kheerganga surrounded by towering pine trees in Parvati Valley Himachal',
    waMessage: 'Hi Aanandham! I want to enquire about the Kheerganga Trek (₹900/person) starting from Kalga Village.'
  },
  {
    id: 'bhun-buni-thatch-trek',
    slug: 'bhun-buni-thatch-trek',
    name: 'Bhun Buni Thatch Trek',
    badge: 'Offbeat Alpine Ridge',
    price: 3000,
    priceFormatted: '₹3,000',
    priceUnit: '/ person',
    duration: '2 Days / 1 Night',
    startingPoint: 'Kalga Village',
    difficulty: 'Moderate',
    difficultyTone: 'moderate',
    altitude: '10,800 FT',
    region: 'Parvati Valley, Himachal',
    tagline: 'Panoramic 360° Snow Peak Meadow with Zero Commercial Crowds',
    description: 'An uncrowded high-altitude ridge expedition climbing directly from Kalga through dense deodar canopies into vast highland meadows (Thatch). Experience complete solace, a starlit ridge camp, and panoramic views of Himalayan giants.',
    inclusions: [
      'Professional highland trek guide',
      'High-altitude camping accommodation',
      'Weatherproof alpine tent & sleeping bag',
      'Nutritious mountain dinner & breakfast',
      'Evening campfire under dark skies'
    ],
    highlights: [
      '360° Himalayan Snow Peaks',
      'High-Altitude Ridge Camping',
      'Tent & Sleeping Bag Included',
      'Uncrowded Wilderness Solace'
    ],
    image: '/images/treks/bhun-buni-thatch-alpine-camp.jpg',
    imageAlt: 'High alpine snow peaks and mountain ridges above Kalga village along the Bhun Buni Thatch trek in Parvati Valley',
    waMessage: 'Hi Aanandham! I want to enquire about the Bhun Buni Thatch Trek (₹3,000/person) starting from Kalga Village.'
  },
  {
    id: 'bhandak-thach-trek',
    slug: 'bhandak-thach-trek',
    name: 'Bhandak Thach Trek',
    badge: 'Proposed · Provisional',
    price: 3999,
    priceFormatted: '₹3,999',
    priceUnit: '/ person (proposed)',
    isProposed: true,
    duration: '2 Days / 1 Night (provisional)',
    isProvisional: true,
    startingPoint: 'Pulga village',
    difficulty: 'Moderate to difficult',
    difficultyTone: 'challenging',
    altitude: '11,500 FT',
    region: 'Parvati Valley, Himachal',
    tagline: 'Untouched High Alpine Pasture & Ancient Fairy Forest Ridge',
    description: 'A deep wilderness expedition commencing from Pulga fairy forest village, navigating ancient wooden paths and dramatic river valleys to reach the pristine alpine amphitheater of Bhandak Thach with sweeping high-glacier vistas.',
    inclusions: [
      'Expert certified trek guide',
      'High-altitude camping accommodation',
      'Thermal tent & insulated sleeping bag',
      'Freshly prepared dinner & hot breakfast',
      'First-aid & wilderness safety kit'
    ],
    highlights: [
      'Starts from Pulga Fairy Forest',
      'High Alpine Meadow (11,500 FT)',
      'Tent & Sleeping Bag Included',
      'Raw Himalayan Wilderness'
    ],
    image: '/images/treks/bhandak-thach-pulga-forest.jpg',
    imageAlt: 'Ancient mossy pine trunks and enchanted trail of Fairy Forest in Pulga village leading to Bhandak Thach meadow',
    waMessage: 'Hi Aanandham! I want to enquire about the Bhandak Thach Trek (₹3,999/person, proposed) starting from Pulga village.'
  }
];
