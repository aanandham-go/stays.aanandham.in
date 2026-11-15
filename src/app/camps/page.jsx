import React from 'react';
import CampsDirectoryClient from './CampsDirectoryClient';
import { INITIAL_ALL_CAMPS, DEPRECATED_CAMP_IDS } from '@/lib/campsData';

export const metadata = {
  title: "Himachal & Munnar Mountain Stays | Aanandham Stays",
  description:
    'Explore verified mountain stays, Kalga dorms from ₹249 & high-altitude dome pods in Himachal & Munnar. Instant WhatsApp booking inquiries.',
  alternates: {
    canonical: 'https://stays.aanandham.in/camps',
  },
  openGraph: {
    title: "Himachal & Munnar Mountain Stays | Aanandham Stays",
    description:
      'Explore verified mountain stays, Kalga dorms from ₹249 & high-altitude dome pods in Himachal & Munnar. Instant WhatsApp booking inquiries.',
    url: 'https://stays.aanandham.in/camps',
    siteName: 'Aanandham Stays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Aanandham Stays Mountain Sanctuaries in Himachal and Munnar',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Himachal & Munnar Mountain Stays | Aanandham Stays",
    description: 'Explore verified Kalga dorms from ₹249, mountain homestays & high-altitude dome pods across Himachal & Munnar.',
    images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function CampsPage() {
  const activeCamps = INITIAL_ALL_CAMPS.filter(camp => !camp.archived && !DEPRECATED_CAMP_IDS.has(camp.id));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Aanandham Stays — Verified Mountain Stays, Dorms & Sanctuaries',
        description: 'Verified high-altitude mountain homestays, backpacker dorms, and boutique retreats across Himachal Pradesh and Munnar.',
        itemListElement: activeCamps.map((camp, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Campground',
            name: camp.title,
            url: `${siteUrl}/camps/${camp.slug || camp.id}`,
            image: camp.image ? (camp.image.startsWith('http') ? camp.image : `${siteUrl}${camp.image}`) : undefined,
            description: camp.description,
            address: {
              '@type': 'PostalAddress',
              addressLocality: camp.location || camp.region || 'Kalga Village',
              addressRegion: camp.region === 'Himachal' ? 'Himachal Pradesh' : 'Kerala',
              addressCountry: 'IN',
            },
            priceRange: `₹${camp.price}`,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Wilderness Campsites',
            item: `${siteUrl}/camps`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampsDirectoryClient initialCamps={activeCamps} />
    </>
  );
}
