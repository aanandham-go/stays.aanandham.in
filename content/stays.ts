export interface StayAmenity {
  name: string;
  iconName: string;
}

export interface StayItem {
  id: string;
  slug: string;
  name: string;
  region: 'munnar' | 'himachal';
  regionLabel: string;
  location: string;
  altitudeFt: number;
  pricePerNight: number;
  originalPricePerNight: number;
  tagline: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  galleryImages: { url: string; alt: string }[];
  amenities: string[];
  inclusions: string[];
  capacity: string;
  rating: number;
  reviewCount: number;
  verifiedStay: boolean;
  featured: boolean;
}

export const staysData: StayItem[] = [
  {
    id: 'stay-munnar-01',
    slug: 'kolukkumalai-cloudbed-dome-stay',
    name: 'Kolukkumalai Cloudbed Dome Sanctuary',
    region: 'munnar',
    regionLabel: 'Munnar, Kerala',
    location: 'Upper Suryanelli Ridge, Munnar',
    altitudeFt: 7130,
    pricePerNight: 4200,
    originalPricePerNight: 5500,
    tagline: 'Perched above the clouds overlooking lush tea hills and sunrise ridges',
    description: 'Immerse yourself in high-altitude serenity inside thermal-insulated panoramic geodesic domes. Wake up to endless sea-of-clouds roll beneath your private viewing deck with 4x4 sunrise summit access included.',
    coverImage: '/images/kolukkumalai-cloudbed-dome.webp',
    coverImageAlt: 'Geodesic dome glamping pod overlooking misty tea mountains and golden sunrise sky in Kolukkumalai Munnar',
    galleryImages: [
      {
        url: '/images/kolukkumalai-sunrise-peak-glow.jpg',
        alt: 'Golden sunrise cresting over misty tea plantation peaks in Kolukkumalai',
      },
      {
        url: '/images/kolukkumalai-cozy-tent-stay.jpg',
        alt: 'Interior view of luxury highland glamping tent with plush bedding and mountain panorama',
      },
      {
        url: '/images/acoustic-campfires-bbq.jpg',
        alt: 'Starlit evening campfire circle with travelers enjoying live mountain barbecue',
      },
    ],
    amenities: ['Panoramic View Deck', 'Ensuite Heated Bath', '4x4 Off-Road Access', 'Campfire Circle', 'Full Board Meals'],
    inclusions: ['4x4 Off-road ridge jeep transfer', 'Sunset hike to Phantom Rock', 'Acoustic campfire with BBQ', 'Highland breakfast buffet'],
    capacity: '2 - 3 Guests',
    rating: 4.94,
    reviewCount: 148,
    verifiedStay: true,
    featured: true,
  },
  {
    id: 'stay-himachal-01',
    slug: 'manali-cedar-ridge-geodesic-domes',
    name: 'Manali Cedar Ridge Geodesic Domes',
    region: 'himachal',
    regionLabel: 'Himachal Pradesh',
    location: 'Old Manali Apple Orchards, Manali',
    altitudeFt: 7200,
    pricePerNight: 4800,
    originalPricePerNight: 6200,
    tagline: 'Starlit Himalayan geodesic domes nestled within century-old deodar forests',
    description: 'Breathe pure Himalayan mountain air inside architectural geodesic domes perched on serene cedar slopes. Includes stargazing telescope, wood-fired bukhari stove, and panoramic snow-peak vistas of the Pir Panjal range.',
    coverImage: '/images/high-altitude-ridge-tent.jpg',
    coverImageAlt: 'High altitude geodesic alpine dome surrounded by tall cedar pine trees and distant snow peaks in Manali Himachal Pradesh',
    galleryImages: [
      {
        url: '/images/stargazing-night-skies.jpg',
        alt: 'Milky Way galaxy stretching across crisp Himalayan mountain night skies',
      },
      {
        url: '/images/treks/parvati-valley-himachal-hero.jpg',
        alt: 'Trekkers navigating scenic Himalayan mountain trails and snow peaks in Himachal Pradesh',
      },
    ],
    amenities: ['Bukhari Wood Heater', 'Stargazing Telescope', 'Apple Orchard Walk', 'Artisanal Himalayan Cafe', 'High-Speed Wi-Fi'],
    inclusions: ['Warm welcome spiced kahwa', 'Guided forest ridge trail', 'Evening barbecue & bonfire', 'Organic farm breakfast'],
    capacity: '2 - 4 Guests',
    rating: 4.96,
    reviewCount: 182,
    verifiedStay: true,
    featured: true,
  },
  {
    id: 'stay-munnar-02',
    slug: 'suryanelli-valley-ridge-tents',
    name: 'Suryanelli Valley Ridge Tents',
    region: 'munnar',
    regionLabel: 'Munnar, Kerala',
    location: 'Suryanelli Valley Viewpoint, Munnar',
    altitudeFt: 5800,
    pricePerNight: 2800,
    originalPricePerNight: 3600,
    tagline: 'Waterproof double-layered highland tents fronting rolling tea hills',
    description: 'Authentic wilderness glamping positioned right along the Suryanelli ridge line. Enjoy serene valley breezes, curated guided plantation treks, and twilight campfires under starry skies.',
    coverImage: '/images/kolukkumalai-cozy-tent-stay.jpg',
    coverImageAlt: 'Highland safari tent perched on mountain edge overlooking tea estate valleys in Suryanelli Munnar',
    galleryImages: [
      {
        url: '/images/sunrise-cloud-treks.jpg',
        alt: 'Misty mountain ridge trek through high elevation tea estates in Suryanelli',
      },
      {
        url: '/images/acoustic-campfires-bbq.jpg',
        alt: 'Evening campfire gathering with live grilled barbecue in Suryanelli camp',
      },
    ],
    amenities: ['Thermal Sleeping Bags', 'Clean Private Bathrooms', 'Power Outlets', 'Plantation Trail Access', 'Tea Tasting'],
    inclusions: ['Guided tea plantation hike', 'Campfire dinner & barbecue', 'Authentic Kerala breakfast', 'Luggage support'],
    capacity: '2 - 3 Guests',
    rating: 4.88,
    reviewCount: 114,
    verifiedStay: true,
    featured: false,
  },
  {
    id: 'stay-himachal-02',
    slug: 'jibhi-valley-pine-river-retreat',
    name: 'Jibhi Valley Pine River Retreat',
    region: 'himachal',
    regionLabel: 'Himachal Pradesh',
    location: 'Tirthan Valley Riverbank, Jibhi',
    altitudeFt: 6400,
    pricePerNight: 3900,
    originalPricePerNight: 5000,
    tagline: 'Handcrafted alpine pine cottages beside crystal mountain trout streams',
    description: 'Experience deep mountain tranquility in traditional Himachali kath-kuni wooden cottages. Located right beside the gushing river stream in Jibhi, surrounded by lush deodar groves and pine scent.',
    coverImage: '/images/home-hero-landing.jpg',
    coverImageAlt: 'Alpine wooden mountain cottage beside pristine pine forests and crystal mountain river in Jibhi Himachal Pradesh',
    galleryImages: [
      {
        url: '/images/high-altitude-ridge-tent.jpg',
        alt: 'Traditional wooden balcony overlooking forest streams in Jibhi Himachal',
      },
      {
        url: '/images/stargazing-night-skies.jpg',
        alt: 'Clear dark night sky with shimmering stars over Jibhi pine valley',
      },
    ],
    amenities: ['River Stream Access', 'Fireplace Hearth', 'Balcony Mountain Views', 'Angling Guidance', 'Local Pahadi Meals'],
    inclusions: ['Jibhi waterfall guided walk', 'Riverside afternoon tea', 'Evening bonfire circle', 'Himachali Siddu & dinner buffet'],
    capacity: '2 - 5 Guests',
    rating: 4.92,
    reviewCount: 96,
    verifiedStay: true,
    featured: false,
  },
  {
    id: 'stay-munnar-03',
    slug: 'anaerangal-lake-alpine-cabins',
    name: 'Anaerangal Lake Alpine Cabins',
    region: 'munnar',
    regionLabel: 'Munnar, Kerala',
    location: 'Anaerangal Lake Basin, Chinnakanal',
    altitudeFt: 5400,
    pricePerNight: 3600,
    originalPricePerNight: 4700,
    tagline: 'Lakeside cedar cabins framing glistening waters and spice estates',
    description: 'Private timber cabins nestled on the banks of tranquil Anaerangal Lake. Savor peaceful kayaking, cardamom garden walks, and breathtaking evening sunset vistas over emerald waters.',
    coverImage: '/images/anayirangal-elephant-lake.jpg',
    coverImageAlt: 'Scenic lake basin surrounded by emerald rolling hills and tea gardens in Chinnakanal Munnar',
    galleryImages: [
      {
        url: '/images/chinnakanal-waterfalls.jpg',
        alt: 'Cascading pristine waterfall near Chinnakanal tea estates in Munnar',
      },
      {
        url: '/images/acoustic-campfires-bbq.jpg',
        alt: 'Evening campfire with mountain lake reflection in background',
      },
    ],
    amenities: ['Lake View Veranda', 'Kayaking Access', 'Spice Plantation Walk', 'Hot Showers', 'Traditional Dining'],
    inclusions: ['Boating / Kayaking session', 'Guided spice garden tour', 'Campfire dinner with grilled delicacies', 'Breakfast'],
    capacity: '2 - 4 Guests',
    rating: 4.90,
    reviewCount: 88,
    verifiedStay: true,
    featured: false,
  },
  {
    id: 'stay-himachal-03',
    slug: 'kasol-alpine-riverside-sanctuary',
    name: 'Kasol Alpine Riverside Sanctuary',
    region: 'himachal',
    regionLabel: 'Himachal Pradesh',
    location: 'Chalal Trail, Parvati Valley',
    altitudeFt: 5380,
    pricePerNight: 3200,
    originalPricePerNight: 4200,
    tagline: 'Secluded riverside glamping amidst majestic coniferous forests',
    description: 'Escape the tourist bustle across the suspension bridge in scenic Parvati Valley. Luxury safari tents and glass cottages set against towering pine hills, listening to the eternal sound of the Parvati River.',
    coverImage: '/images/experienced-local-guides.jpg',
    coverImageAlt: 'Alpine mountain glamping nestled among majestic pine trees along the Parvati river valley in Himachal',
    galleryImages: [
      {
        url: '/images/stargazing-night-skies.jpg',
        alt: 'Deep starry sky above Parvati valley pine trees at night',
      },
      {
        url: '/images/acoustic-campfires-bbq.jpg',
        alt: 'Campfire gathering with acoustic guitar session in Kasol camp',
      },
    ],
    amenities: ['Riverside Hammocks', 'Israeli & Indian Dining', 'Cafe Lounge', 'Forest Trail Access', 'Thermal Bedding'],
    inclusions: ['Chalal scenic walk guide', 'Hot soup & welcome drinks', 'Open-air acoustic campfire', 'Multi-cuisine breakfast'],
    capacity: '2 - 3 Guests',
    rating: 4.87,
    reviewCount: 122,
    verifiedStay: true,
    featured: false,
  },
];
