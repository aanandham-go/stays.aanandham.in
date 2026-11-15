import React from 'react';

export const metadata = {
  title: 'About Our Mountain Stays in Himachal & Munnar | Aanandham',
  description:
    'Learn the story of Aanandham Stays — from engineering roots to verified mountain dorms from ₹249 in Kalga (Himachal) and sunrise cloud-bed domes in Munnar.',
  alternates: {
    canonical: 'https://stays.aanandham.in/about',
  },
  openGraph: {
    title: 'About Our Mountain Stays in Himachal & Munnar | Aanandham',
    description:
      'Learn the story of Aanandham Stays — from engineering roots to verified mountain dorms from ₹249 in Kalga (Himachal) and sunrise cloud-bed domes in Munnar.',
    url: 'https://stays.aanandham.in/about',
    siteName: 'Aanandham Stays',
    images: [
      {
        url: 'https://stays.aanandham.in/images/treks/parvati-valley-himachal-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Aanandham Stays mountain story — alpine valleys and sanctuaries across Himachal and Munnar',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Mountain Stays in Himachal & Munnar | Aanandham',
    description:
      'Verified mountain dorms from ₹249 in Kalga (Himachal) and sunrise cloud-bed domes in Munnar. Direct host reservations with zero OTA fees.',
    creator: '@aanandham_go',
    images: ['https://stays.aanandham.in/images/treks/parvati-valley-himachal-hero.jpg'],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: 'About Aanandham Stays — Mountain Sanctuaries in Himachal & Munnar',
      description:
        'The story behind Aanandham Stays. Budget backpacker dorms from ₹249 & sunrise suites in Kalga Village (Parvati Valley, Himachal) alongside cloud-bed domes in Munnar.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Aanandham Stays',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        founder: [
          {
            '@type': 'Person',
            name: 'Aanandham Founding Team',
          },
        ],
        foundingLocation: {
          '@type': 'Place',
          name: 'Kalga Village (Himachal) & Munnar (Kerala), India',
        },
        sameAs: [
          'https://www.instagram.com/aanandham.go',
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/about#breadcrumb`,
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
          name: 'About Us',
          item: `${siteUrl}/about`,
        },
      ],
    },
  ],
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
