import { LocationData } from './types';

export const locationsData: LocationData[] = [
  {
    id: 'kalga',
    slug: 'kalga',
    name: 'Kalga Village',
    regionId: 'himachal',
    district: 'Kullu',
    altitudeFt: 7900,
    coordinates: {
      lat: 31.9984,
      lng: 77.4526
    },
    primaryKeyword: 'stays in kalga village kasol',
    targetKeywords: [
      'budget stays in kalga',
      'kalga village homestays',
      'homestays near barshaini dam',
      'kalga apple orchard stays',
      'parvati valley offbeat homestays',
      'kheerganga trek basecamp stay'
    ],
    seoTitle: 'Boutique Stays in Kalga Village, Kasol | Aanandham Stays',
    seoDescription: 'Find solar-powered boutique stays, dorm beds, and sunrise balcony suites in Kalga Village, Kasol. Clean western washrooms and homecooked Pahadi meals.',
    description: 'A serene apple-orchard village above Barshaini where motorized roads end. Perched at 7,900 FT overlooking snow peaks and deodar ridges in Parvati Valley.',
    heroImage: {
      url: '/images/high-altitude-ridge-tent.jpg',
      alt: 'Kalga village pine forest and wooden alpine cottages overlooking Parvati Valley',
      width: 1200,
      height: 630
    },
    howToReach: [
      {
        fromCity: 'Delhi',
        transitMode: 'Overnight Volvo Bus + Cab',
        routeDescription: 'Take an overnight HRTC or private Volvo bus from Delhi (ISBT Kashmiri Gate) to Bhuntar/Kasol, take a local cab or bus to Barshaini dam, followed by a scenic 20-minute pine-trail walk up into Kalga.',
        distanceKm: 520
      },
      {
        fromCity: 'Chandigarh',
        transitMode: 'Bus or Private Taxi',
        routeDescription: 'Drive or take a semi-sleeper bus from Chandigarh via Bilaspur and Mandi to Bhuntar, continue up the Parvati road to Barshaini, then complete the brief 20-minute mountain trail to Kalga.',
        distanceKm: 285
      }
    ],
    bestTimeToVisit: {
      seasons: 'April to June & September to November',
      summary: 'Pleasant alpine summers with clear skies and lush apple blossoms, followed by crisp autumn foliage and pristine Himalayan snow-peak vistas.'
    },
    nearbyAttractions: ['Kheerganga Hot Springs Trek', 'Tosh Village & Waterfall', 'Pulga Fairy Forest', 'Chalal Riverside Walk'],
    status: 'approved'
  },
  {
    id: 'kasol',
    slug: 'kasol',
    name: 'Kasol',
    regionId: 'himachal',
    district: 'Kullu',
    altitudeFt: 5180,
    coordinates: {
      lat: 32.0100,
      lng: 77.3150
    },
    primaryKeyword: 'mountain stays in kasol parvati valley',
    targetKeywords: [
      'budget hostels in kasol',
      'riverside stays in kasol',
      'dorms in kasol under 500',
      'backpacker accommodation parvati valley'
    ],
    seoTitle: 'Mountain Stays in Kasol, Parvati | Aanandham Stays',
    seoDescription: 'Book authentic mountain stays and riverside retreats across Kasol and Parvati Valley. Experience crisp pine air, campfire evenings, and local hospitality.',
    description: 'The scenic basecamp of Parvati Valley flanked by roaring river streams, Israeli cafes, and soaring Himalayan pine trees.',
    heroImage: {
      url: '/images/experienced-local-guides.jpg',
      alt: 'Scenic pine river banks and mountain valley around Kasol Himachal Pradesh',
      width: 1200,
      height: 630
    },
    howToReach: [
      {
        fromCity: 'Delhi',
        transitMode: 'Overnight Bus',
        routeDescription: 'Board a direct Volvo bus from Delhi to Kasol (stops at Kasol main market), journey takes roughly 12 to 14 hours.',
        distanceKm: 505
      },
      {
        fromCity: 'Chandigarh',
        transitMode: 'Bus or Car',
        routeDescription: 'Scenic highway drive via NH154 past Mandi and Kullu to Bhuntar, then turning right into Parvati Valley road to Kasol.',
        distanceKm: 270
      }
    ],
    bestTimeToVisit: {
      seasons: 'March to June & October to December',
      summary: 'Spring brings blooming wildflowers and fresh river streams, while autumn and winter offer chilly stargazing nights by woodfire pits.'
    },
    nearbyAttractions: ['Chalal Suspension Bridge', 'Manikaran Sahib Gurudwara', 'Grahan Village Trek', 'Malana Gate Trail'],
    status: 'approved'
  },
  {
    id: 'suryanelli',
    slug: 'suryanelli',
    name: 'Suryanelli',
    regionId: 'munnar',
    district: 'Idukki',
    altitudeFt: 6070,
    coordinates: {
      lat: 10.0261,
      lng: 77.1420
    },
    primaryKeyword: 'ridge stays in suryanelli munnar',
    seoTitle: 'Ridge Stays in Suryanelli Munnar | Aanandham Stays',
    seoDescription: 'Stay on panoramic tea plantation ridges in Suryanelli Munnar. Alpine camping, modern clean washrooms, campfire live BBQ, and guided tea plantation walks.',
    description: 'A pristine high-altitude plantation hamlet situated along the southeastern flank of Munnar, serving as the official basecamp for Kolukkumalai sunrise treks.',
    heroImage: {
      url: '/images/high-altitude-ridge-tent.jpg',
      alt: 'High altitude tea garden campsite and ridge tents in Suryanelli Munnar',
      width: 1200,
      height: 630
    },
    howToReach: [
      {
        fromCity: 'Kochi',
        transitMode: 'Cab or KSRTC Bus',
        routeDescription: 'Drive from Cochin International Airport (COK) or Aluva via NH85 through Kothamangalam and Munnar Town, then branch towards Suryanelli (approx 4 hours).',
        distanceKm: 135
      },
      {
        fromCity: 'Madurai',
        transitMode: 'Cab or Bus',
        routeDescription: 'Drive via Theni and Bodimettu Ghat road climbing up into Chinnakanal and Suryanelli (approx 3.5 hours).',
        distanceKm: 125
      }
    ],
    bestTimeToVisit: {
      seasons: 'September to March',
      summary: 'Post-monsoon emerald greens and winter cloud beds blanket the valleys, with crisp night temperatures dipping into single digits.'
    },
    nearbyAttractions: ['Kolukkumalai Sunrise Peak', 'Phantom Hills', 'Anaerangal Lake', 'Meesapulimala Viewpoints'],
    status: 'approved'
  },
  {
    id: 'kolukkumalai',
    slug: 'kolukkumalai',
    name: 'Kolukkumalai',
    regionId: 'munnar',
    district: 'Idukki',
    altitudeFt: 7100,
    coordinates: {
      lat: 10.0815,
      lng: 77.1950
    },
    primaryKeyword: 'dome stay in kolukkumalai munnar',
    seoTitle: 'Dome Stays in Kolukkumalai Munnar | Aanandham Stays',
    seoDescription: 'Experience high-altitude sky deck glamping and geodesic domes in Kolukkumalai. Includes 4x4 Jeep sunrise safari above the clouds and private bath suites.',
    description: 'Home to the highest orthodox tea plantations in the world, famed for dramatic golden sunrise vistas where clouds blanket the Tamil Nadu plains below.',
    heroImage: {
      url: '/images/teddy/teddy-dome-1.jpg',
      alt: 'Geodesic dome glamping pod overlooking misty sunrise clouds at Kolukkumalai ridge',
      width: 1200,
      height: 630
    },
    howToReach: [
      {
        fromCity: 'Kochi',
        transitMode: 'Cab + 4x4 Off-Road Jeep',
        routeDescription: 'Drive from Kochi to Suryanelli basecamp, then board our authorized 4x4 mountain safari Jeep for the rugged 14 km off-road tea-estate climb.',
        distanceKm: 148
      }
    ],
    bestTimeToVisit: {
      seasons: 'October to February',
      summary: 'Crisp clear early mornings with maximum probability of observing the legendary unbroken sea of clouds at sunrise.'
    },
    nearbyAttractions: ['World Highest Tea Factory (1935)', 'Tiger Rock Viewpoint', 'Singapara Peak', 'Jagged Ridge Trek'],
    status: 'approved'
  },
  {
    id: 'vattavada',
    slug: 'vattavada',
    name: 'Vattavada',
    regionId: 'munnar',
    district: 'Idukki',
    altitudeFt: 6800,
    coordinates: {
      lat: 10.1830,
      lng: 77.2600
    },
    primaryKeyword: 'timber cabins in vattavada munnar',
    seoTitle: 'Timber Cabins in Vattavada Munnar | Aanandham Stays',
    seoDescription: 'Peaceful handcrafted timber cabins nestled in the terraced step-farming valley of Vattavada. Strawberry farm walks, campfire dinners, and direct booking.',
    description: 'An idyllic terraced agricultural village renowned for its cool microclimate, organic strawberry cultivation, eucalyptus hills, and timber cabins.',
    heroImage: {
      url: '/images/mini-mexico/mini-mexico-main.jpg',
      alt: 'Handcrafted timber cabins and stepped strawberry farm slopes in Vattavada Munnar',
      width: 1200,
      height: 630
    },
    howToReach: [
      {
        fromCity: 'Kochi',
        transitMode: 'Cab via Top Station',
        routeDescription: 'Drive from Kochi through Munnar Town, proceed past Mattupetty Dam, Kundala Lake, and Top Station to reach Vattavada valley (approx 4.5 hours).',
        distanceKm: 160
      }
    ],
    bestTimeToVisit: {
      seasons: 'October to May',
      summary: 'Strawberry harvesting season starts from December through April with pleasant daytime sun and cool starlit mountain evenings.'
    },
    nearbyAttractions: ['Top Station Viewpoint', 'Pampadum Shola National Park', 'Organic Strawberry Farms', 'Kurinjimala Sanctuary'],
    status: 'approved'
  }
];
