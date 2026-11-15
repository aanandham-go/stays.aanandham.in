export interface SiteConfig {
  name: string;
  subBrand: string;
  parentBrand: string;
  tagline: string;
  url: string;
  ogImage: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    addressHimachal: string;
    addressMunnar: string;
  };
  social: {
    instagram: string;
    whatsapp: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Aanandham Stays',
  subBrand: 'STAYS.AANANDHAM.GO',
  parentBrand: 'Aanandham Wilderness',
  tagline: 'Curated Highland Stays & Geodesic Pods in Himachal & Munnar',
  url: 'https://stays.aanandham.in',
  ogImage: '/images/og-share-card.jpg',
  contact: {
    phone: '+919447000000',
    phoneFormatted: '+91 94470 00000',
    whatsapp: '919447000000',
    whatsappFormatted: '+91 94470 00000',
    email: 'stays@aanandham.in',
    addressHimachal: 'Old Manali Road & Jibhi Valley, Himachal Pradesh 175123',
    addressMunnar: 'Suryanelli Estate Road, Chinnakanal, Munnar, Kerala 685618',
  },
  social: {
    instagram: 'https://instagram.com/aanandham.go',
    whatsapp: 'https://wa.me/919447000000',
    youtube: 'https://youtube.com/@aanandham',
  },
};
