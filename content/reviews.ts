export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  stayName: string;
  region: 'Munnar' | 'Himachal';
  rating: number;
  date: string;
  quote: string;
  highlight: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: 'rev-01',
    author: 'Aditya & Neha Sharma',
    city: 'Bengaluru',
    stayName: 'Kolukkumalai Cloudbed Dome Sanctuary',
    region: 'Munnar',
    rating: 5,
    date: 'February 2026',
    quote: 'Waking up to clouds rolling right under our dome balcony was magical. The 4x4 sunrise safari was smooth, and the campfire dinner had genuine warmth. Unlike commercial resorts, this felt like an authentic mountain sanctuary.',
    highlight: 'Spectacular Sea-of-Clouds Sunrise',
  },
  {
    id: 'rev-02',
    author: 'Karan Mehra',
    city: 'Delhi NCR',
    stayName: 'Manali Cedar Ridge Geodesic Domes',
    region: 'Himachal',
    rating: 5,
    date: 'January 2026',
    quote: 'The bukhari heater kept our dome toasty despite sub-zero outdoor weather in Old Manali. Clear night skies gave us views of the Milky Way through their telescope. Truly the pinnacle of mountain glamping.',
    highlight: 'Warm Bukhari & Stargazing',
  },
  {
    id: 'rev-03',
    author: 'Pooja Krishnan',
    city: 'Chennai',
    stayName: 'Suryanelli Valley Ridge Tents',
    region: 'Munnar',
    rating: 5,
    date: 'March 2026',
    quote: 'Spotless private bathrooms with real hot water up in the high mountains! The mountain guide was attentive, and the tea plantation sunset walk was mesmerizing.',
    highlight: 'Clean Facilities & Mountain Guides',
  },
];
