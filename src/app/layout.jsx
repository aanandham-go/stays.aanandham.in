import './globals.css';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
import GlobalActionHub from '@/components/common/GlobalActionHub';
import PmsAnalyticsTracker from '@/components/common/PmsAnalyticsTracker';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_RATING } from '@/lib/seoKeywords';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#1B4D3E',
  colorScheme: 'light dark',
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Himachal & Munnar Mountain Stays | Aanandham Stays',
    template: '%s | Aanandham Stays'
  },
  description: 'Book verified dorms from ₹249 & alpine suites in Kalga (Himachal) alongside sky deck domes in Munnar. Direct host booking with zero commission.',
  authors: [{ name: 'Aanandham Stays' }],
  creator: 'Aanandham Stays',
  publisher: 'Aanandham Stays',
  alternates: {
    canonical: 'https://stays.aanandham.in',
  },
  openGraph: {
    title: 'Himachal & Munnar Mountain Stays | Aanandham Stays',
    description: 'Book verified dorms from ₹249 & alpine suites in Kalga (Himachal) alongside sky deck domes in Munnar. Direct host booking with zero commission.',
    url: siteUrl,
    siteName: 'Aanandham Stays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Highland geodesic dome stay overlooking morning mountain clouds in Munnar and Himachal',
      },
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: 'Aanandham Stays Brand Logo',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Stays in Munnar & Himachal | Aanandham Stays',
    description: 'Book luxury geodesic domes, high-altitude camps, and alpine cottages in Munnar & Himachal. Enjoy 4x4 sunrise treks, heated suites, and mountain hospitality.',
    creator: '@aanandham_go',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&h=630&q=80',
      `${siteUrl}/logo.png`
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png?v=2' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png?v=2' },
    ],
  },
  other: {
    'geo.region': 'IN-KL, IN-HP',
    'geo.placename': 'Munnar, Suryanelli, Kolukkumalai, Vattavada, Kalga, Kasol, Parvati Valley',
    'geo.position': '10.0261;77.1420',
    'ICBM': '10.0261, 77.1420',
  },
  manifest: '/site.webmanifest?v=2',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'JGDIH7jk1TNyNCKm6PRveZc5VIoWPCuj4ShHzpEwn1U',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LodgingBusiness', 'Organization'],
  name: 'Aanandham Stays — Boutique Highland Stays (Himachal & Munnar)',
  alternateName: 'Aanandham Stays',
  description: 'Owner-operated boutique mountain stays in Himachal Pradesh (Kalga Village, Parvati Valley, Kasol) and Munnar (Suryanelli, Kolukkumalai, Vattavada). Verified rooms, clean modern washrooms, homecooked dining, and direct host WhatsApp booking.',
  image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
  logo: `${siteUrl}/logo.png`,
  '@id': `${siteUrl}/#organization`,
  url: siteUrl,
  telephone: process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ? `+${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP}` : '+919074858014',
  email: 'bookings@aanandham.in',
  priceRange: '₹249 - ₹2,299',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kolukkumalai Road, Suryanelli Basecamp',
    addressLocality: 'Suryanelli, Munnar',
    addressRegion: 'Kerala',
    postalCode: '685618',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.0261,
    longitude: 77.1420
  },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=10.0261,77.1420',
  department: [
    {
      '@type': 'LodgingBusiness',
      name: 'The Nest Kalga by Aanandham.Go',
      description: 'Solar-powered alpine retreat at 7,900 FT in Parvati Valley with panoramic east-facing sunrise deck, 10-bed backpacker dorms, deluxe balcony suites, and guided alpine ridge treks.',
      url: `${siteUrl}/camps/the-nest-kalga`,
      telephone: '+919074858014',
      priceRange: '₹249 - ₹1,499',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kalga Village (above Barshaini Trail)',
        addressLocality: 'Kasol, Parvati Valley',
        addressRegion: 'Himachal Pradesh',
        postalCode: '175105',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.9984,
        longitude: 77.4526
      }
    },
    {
      '@type': 'LodgingBusiness',
      name: "Kolukkumalai Teddy's Campsite & Sky Deck",
      description: 'Elevated sky deck and weather-insulated geodesic domes overlooking Suryanelli tea valleys with 4x4 Jeep sunrise safari to Kolukkumalai summit peak at 7,100 FT.',
      url: `${siteUrl}/camps/pkg-kolukkumalai-teddy-domes`,
      telephone: '+919074858014',
      priceRange: 'from ₹2,299',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kolukkumalai Tea Estate Ridge',
        addressLocality: 'Suryanelli, Munnar',
        addressRegion: 'Kerala',
        postalCode: '685618',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 10.0261,
        longitude: 77.1420
      }
    }
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '06:00',
      closes: '22:00'
    }
  ],
  sameAs: [
    'https://www.instagram.com/aanandham.go',
    'https://www.facebook.com/aanandham.go',
    'https://twitter.com/aanandham_go',
    'https://www.linkedin.com/company/aanandhamgo',
    'https://youtube.com/@aanandhamgo'
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: '4x4 Offroad Mountain Jeep Transfers (Munnar)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Panoramic Sunrise Decks (Kalga & Kolukkumalai)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Campfire & Live BBQ / Pahadi Dinner', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Clean Modern Western Washrooms with Hot Water', value: true },
    { '@type': 'LocationFeatureSpecification', name: '10-Bed Backpacker Dorms & Private Balcony Rooms', value: true }
  ],
  aggregateRating: SITE_RATING
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif', backgroundColor: '#F8F9F5', color: '#121613' }}>
        <SmoothScroll />
        {children}
        <GlobalActionHub />
        <PmsAnalyticsTracker />
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 (GA4) with Non-Blocking Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-D7B74EEL0Z'}`}
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-D7B74EEL0Z'}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

