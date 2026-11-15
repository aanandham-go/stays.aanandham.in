import React from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';

export const metadata = {
  title: 'Guided Alpine Treks in Parvati Valley | Aanandham Stays',
  description:
    'Book guided 2D/1N alpine treks in Parvati Valley from ₹900. Kheerganga hot springs, Bhun Buni Thatch & Bhandak Thach with certified guides & hearty meals.',
  alternates: {
    canonical: `${siteUrl}/treks`,
  },
  openGraph: {
    title: 'Guided Alpine Treks in Parvati Valley | Aanandham Stays',
    description:
      'Book guided 2D/1N alpine treks in Parvati Valley from ₹900. Kheerganga hot springs, Bhun Buni Thatch & Bhandak Thach with certified guides & hearty meals.',
    url: `${siteUrl}/treks`,
    siteName: 'Aanandham Stays',
    images: [
      {
        url: `${siteUrl}/images/treks/parvati-valley-himachal-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Guided Himalayan alpine treks in Parvati Valley starting from Kalga and Pulga villages',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guided Alpine Treks in Parvati Valley | Aanandham Stays',
    description:
      'Book guided 2D/1N alpine treks in Parvati Valley from ₹900. Kheerganga hot springs, Bhun Buni Thatch & Bhandak Thach with certified guides & hearty meals.',
    images: [`${siteUrl}/images/treks/parvati-valley-himachal-hero.jpg`],
  },
};

export default function TreksLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
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
            name: 'Guided Alpine Treks',
            item: `${siteUrl}/treks`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/treks#list`,
        name: 'Parvati Valley Guided Treks & Himalayan Trails',
        description: 'Guided 2D/1N alpine expeditions starting from Kalga and Pulga basecamps.',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'TouristTrip',
              name: 'Kheerganga Trek',
              description: 'Ascend from Kalga village through apple orchards and pine woods to natural geothermal hot water springs.',
              offers: {
                '@type': 'Offer',
                price: 900,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'TouristTrip',
              name: 'Bhun Buni Thatch Trek',
              description: 'Secluded high-altitude ridge expedition climbing directly from Kalga into panoramic 360° snow peak meadows.',
              offers: {
                '@type': 'Offer',
                price: 3000,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'TouristTrip',
              name: 'Bhandak Thach Trek',
              description: 'Untouched high alpine pasture expedition commencing from Pulga fairy forest village.',
              offers: {
                '@type': 'Offer',
                price: 3999,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            },
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
      {children}
    </>
  );
}
