export interface ExperienceItem {
  id: string;
  title: string;
  region: 'Munnar' | 'Himachal';
  tag: string;
  duration: string;
  altitude: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: 'exp-01',
    title: '4x4 Off-Road Kolukkumalai Sunrise Safari',
    region: 'Munnar',
    tag: 'Highest Organic Tea Peak',
    duration: '3.5 Hours',
    altitude: '7,900 ft',
    description: 'Rugged 4x4 Jeep convoy climbing ancient tea tracks in darkness to witness golden sunrise break across the vast cloud bed at the Tamil Nadu-Kerala mountain ridge border.',
    image: '/images/kolukkumalai-jeep-safari-primary.jpg',
    imageAlt: '4x4 off-road safari jeep climbing rugged highland trail through misty tea hills towards sunrise peak in Kolukkumalai',
  },
  {
    id: 'exp-02',
    title: 'Himalayan Ridge Stargazing & Acoustic Bonfires',
    region: 'Himachal',
    tag: 'Zero Light Pollution',
    duration: 'Evening Session',
    altitude: '7,200 ft',
    description: 'Crisp high-altitude nights surrounded by century-old deodar trees. Observe deep planetary constellations with our astronomical telescope beside roaring cedar campfires.',
    image: '/images/stargazing-night-skies.jpg',
    imageAlt: 'Highland mountain night sky full of stars above silhouette of pine forest canopy in Himachal Pradesh',
  },
  {
    id: 'exp-03',
    title: 'Suryanelli Cloud Bed & Phantom Rock Ridge Hike',
    region: 'Munnar',
    tag: 'Guided Trek',
    duration: '2.5 Hours',
    altitude: '6,200 ft',
    description: 'Accompanied by native mountain marshals through mist-laden tea slopes to natural monolithic granite rocks with 360-degree views of the Western Ghats mountain amphitheater.',
    image: '/images/sunrise-cloud-treks.jpg',
    imageAlt: 'Trekker hiking along misty mountain ridge trail overlooking vast clouds and rolling hills in Suryanelli Munnar',
  },
  {
    id: 'exp-04',
    title: 'Jibhi Pine Waterfall Trail & Trout Stream Walk',
    region: 'Himachal',
    tag: 'River Trail',
    duration: '3 Hours',
    altitude: '6,400 ft',
    description: 'Walk through secluded wooden bridge paths over pristine alpine streams in Tirthan Valley, discovering hidden waterfalls and learning local Pahadi folklore.',
    image: '/images/experiences/jibhi-waterfall-bridge-trail.jpg',
    imageAlt: 'Wooden footbridge and hikers walking along the pristine pine waterfall stream trail in Jibhi Tirthan Valley Himachal',
  },
];
