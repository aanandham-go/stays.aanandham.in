import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CampsDirectoryClient from '../CampsDirectoryClient';
import { INITIAL_ALL_CAMPS } from '@/lib/campsData';
import { waLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'Stays in Kalga Himachal & Kasol: The Nest | Aanandham Stays',
  description:
    'Book verified stays in Kalga Himachal from ₹249. Backpacker dorms & balcony suites at The Nest Kalga with apple orchard views, Siddu dining & Kheerganga access.',
  alternates: {
    canonical: 'https://stays.aanandham.in/camps/himachal',
  },
  openGraph: {
    title: 'Stays in Kalga Himachal & Kasol: The Nest | Aanandham Stays',
    description:
      'Book verified stays in Kalga Himachal from ₹249. Backpacker dorms & balcony suites at The Nest Kalga with apple orchard views, Siddu dining & Kheerganga access.',
    url: 'https://stays.aanandham.in/camps/himachal',
    siteName: 'Aanandham Stays',
    images: [
      {
        url: 'https://stays.aanandham.in/images/treks/parvati-valley-himachal-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Himachal stays in Kalga village overlooking Parvati Valley pine forests',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stays in Kalga Himachal & Kasol: The Nest | Aanandham Stays',
    description:
      'Affordable dorms from ₹249, balcony rooms & scenic homestays in Kalga & Kasol with Aanandham Stays.',
    images: ['https://stays.aanandham.in/images/treks/parvati-valley-himachal-hero.jpg'],
  },
};

function HimachalStayGuide() {
  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(48px, 6vw, 84px) clamp(20px, 4vw, 48px)' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Header Badge */}
        <div className="star-badge" style={{ marginBottom: '14px' }}>
          <span className="star-icon">★</span> North Himachal & Parvati Valley Field Guide
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: '800', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
          The Highland Sanctuaries: Kalga Village, Kasol & High Alpine Ridges
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#2A312C', margin: '0 0 32px' }}>
          North Himachal Pradesh unfolds along the rushing glaciers of the Parvati River. While Kasol at 5,180 FT buzzes with cafes, backpacker hubs, and mountain markets, the true Himalayan serenity resides 40 minutes further up the valley in Kalga Village (7,900 FT). Here, the motorable road terminates at Barshaini. Across the river and up a 20-minute deodar pine trail lies an orchard sanctuary untouched by vehicular traffic — home to traditional Kath-Kuni cedar architecture, crisp sub-alpine air, and our flagship Himalayan basecamp:{' '}
          <Link href="/camps/the-nest-kalga" style={{ color: '#166534', fontWeight: '800', textDecoration: 'underline' }}>The Nest Kalga</Link>.
        </p>

        {/* Visual Feature: Apple Orchard Basecamp */}
        <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '24px', overflow: 'hidden', marginBottom: '40px', border: '1px solid rgba(18,22,19,0.1)' }}>
          <Image
            src="/images/the-nest-kalga-apple-orchard.jpg"
            alt="The Nest Kalga wooden alpine sanctuary nestled in high Parvati Valley apple orchards"
            fill
            sizes="(max-width: 1080px) 100vw, 1080px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,22,19,0.85) 0%, rgba(18,22,19,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#FFFFFF' }}>
            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1.2px', textTransform: 'uppercase', background: '#D5ED55', color: '#121613', padding: '4px 12px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>
              Kalga Elevation · 7,900 FT
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px, 2.4vw, 24px)', fontWeight: '800', margin: '0 0 4px', color: '#FFFFFF' }}>
              The Nest Kalga — Traditional Cedarwood Haven
            </h3>
            <p style={{ fontSize: '13.5px', color: '#D6E2D8', margin: 0, maxWidth: '640px' }}>
              Surrounded by whispering pines, organic apple orchards, and panoramic views of snow-dusted Himalayan peaks.
            </p>
          </div>
        </div>

        {/* Elevation Profile Comparison */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          Parvati Valley Altitude & Trail Hierarchy
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#59655D', margin: '0 0 24px' }}>
          Understanding your altitude is vital for acclimatization and choosing the right North Himachal experience. Kalga sits at the sweet spot — high enough for clean alpine nights and panoramic horizons, yet easily accessible without multi-day expedition trekking.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '14px', marginBottom: '44px' }}>
          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '900', color: '#59655D', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Valley Roadhead</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Kasol Market</h3>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#166534', marginBottom: '8px' }}>5,180 FT</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Israeli cafes, ATM kiosks, gear shops, and riverbanks along the Parvati River.
            </p>
          </div>
          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '900', color: '#59655D', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Road End Point</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Barshaini Dam</h3>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#166534', marginBottom: '8px' }}>7,200 FT</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              The vehicular terminus where cab rides conclude and forest trailheads begin.
            </p>
          </div>
          <div style={{ background: '#EFF6E0', border: '1.5px solid #166534', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '900', color: '#166534', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Our Basecamp</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 6px', color: '#121613' }}>Kalga Village</h3>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#166534', marginBottom: '8px' }}>7,900 FT</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#2A312C', margin: 0 }}>
              The Nest Kalga basecamp: peaceful apple orchards, zero vehicle noise, and sunrise balconies.
            </p>
          </div>
          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '900', color: '#59655D', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Hot Sulphur Springs</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Kheerganga</h3>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#166534', marginBottom: '8px' }}>9,700 FT</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Natural therapeutic hot springs and high alpine meadows 12 km trail from Kalga.
            </p>
          </div>
        </div>

        {/* Accommodation Breakdown */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          The Nest Kalga: Accommodation Choices
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#59655D', margin: '0 0 28px' }}>
          Engineered for every travel style — from student backpackers hunting India&apos;s best value mountain bunk to digital nomads and couples seeking private cedarwood balconies.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '20px', marginBottom: '44px' }}>
          
          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.1)', borderRadius: '20px', padding: '26px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#166534', letterSpacing: '1px', textTransform: 'uppercase' }}>Affordable Backpacker</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹249 <small style={{ fontSize: '12px', color: '#59655D', fontWeight: '400' }}>/bed</small></span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', margin: '0 0 8px' }}>10-Bed Mountain Dorm</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#59655D', margin: '0 0 16px', flex: 1 }}>
              Bunk reading lights, USB charging sockets, clean mountain bedding, shared hot water geyser showers, high-speed Wi-Fi, and smart TV in the common room. Perfect for solo travellers, trekking squads, and college groups.
            </p>
            <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#2A312C' }}>
              <li>✓ Shared Hot Showers & 24/7 Geysers</li>
              <li>✓ Common Room & Guitar Acoustic Corner</li>
              <li>✓ High-Speed Wi-Fi for Workations</li>
            </ul>
            <Link href="/camps/the-nest-kalga" className="btn-lime" style={{ padding: '10px 18px', fontSize: '13px', fontWeight: '800', textAlign: 'center', textDecoration: 'none', borderRadius: '10px' }}>
              Book Dorm Bed (₹249) →
            </Link>
          </div>

          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.1)', borderRadius: '20px', padding: '26px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#166534', letterSpacing: '1px', textTransform: 'uppercase' }}>Scenic · Balcony View</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹1,499 <small style={{ fontSize: '12px', color: '#59655D', fontWeight: '400' }}>/night</small></span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', margin: '0 0 8px' }}>Deluxe Balcony Room</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#59655D', margin: '0 0 16px', flex: 1 }}>
              Twin comfy beds, mountain-view panoramic windows, private scenic balcony facing sunrise peaks, hot shower geyser, and wooden work desk. Wake up above the valley mist and enjoy hot Pahadi chai on your private deck.
            </p>
            <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#2A312C' }}>
              <li>✓ Private Sunrise Balcony</li>
              <li>✓ Dedicated Work Desk & Wi-Fi</li>
              <li>✓ Ensuite Hot Water Bathroom</li>
            </ul>
            <Link href="/camps/the-nest-kalga" className="btn-lime" style={{ padding: '10px 18px', fontSize: '13px', fontWeight: '800', textAlign: 'center', textDecoration: 'none', borderRadius: '10px' }}>
              Book Balcony Room (₹1,499) →
            </Link>
          </div>

          <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.1)', borderRadius: '20px', padding: '26px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#166534', letterSpacing: '1px', textTransform: 'uppercase' }}>Comfort Suite</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹1,199 <small style={{ fontSize: '12px', color: '#59655D', fontWeight: '400' }}>/night</small></span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', margin: '0 0 8px' }}>Deluxe Suite</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#59655D', margin: '0 0 16px', flex: 1 }}>
              Generous king-sized wooden bed, ensuite bathroom, warm woolen blankets, daily housekeeping, and space for up to 3 guests. An ideal and tranquil base for couples and families exploring North Himachal.
            </p>
            <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#2A312C' }}>
              <li>✓ King Bed with Warm Woolens</li>
              <li>✓ High-Speed Wi-Fi & Power Backup</li>
              <li>✓ Daily Housekeeping & Campfire Access</li>
            </ul>
            <Link href="/camps/the-nest-kalga" className="btn-lime" style={{ padding: '10px 18px', fontSize: '13px', fontWeight: '800', textAlign: 'center', textDecoration: 'none', borderRadius: '10px' }}>
              Book Deluxe Suite (₹1,199) →
            </Link>
          </div>

        </div>

        {/* Guided Parvati Valley Treks Section */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          Direct Alpine Treks from Kalga Village Basecamp
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#59655D', margin: '0 0 28px' }}>
          One of the greatest advantages of staying at The Nest Kalga is eliminating morning transit hassles. The trailheads to Himachal&apos;s most celebrated alpine meadows and ridges start right at your doorstep.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '20px', marginBottom: '44px' }}>
          
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.12)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '180px' }}>
              <Image
                src="/images/treks/kheerganga-trek-parvati-valley.jpg"
                alt="Trekkers with backpacks and hiking gear climbing the scenic high-altitude mountain trail in Parvati Valley"
                fill
                sizes="(max-width: 600px) 100vw, 350px"
                style={{ objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#D5ED55', color: '#121613', fontSize: '12px', fontWeight: '900', padding: '4px 10px', borderRadius: '999px' }}>
                ₹900 / person
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>2 Days / 1 Night · Easy to Moderate</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>Kheerganga Trek</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: '0 0 12px' }}>
                Hike 12 km through dense pine canopies and gushing waterfalls to soak in sacred natural hot sulphur springs with 360° Himalayan panoramas.
              </p>
              <div style={{ fontSize: '12.5px', color: '#121613', fontWeight: '700', marginBottom: '14px' }}>
                Includes: Trek guide, overnight accommodation, dinner & breakfast.
              </div>
              <Link href="/treks#kheerganga" style={{ fontSize: '13px', fontWeight: '800', color: '#166534' }}>
                View Kheerganga details →
              </Link>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.12)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '180px' }}>
              <Image
                src="/images/treks/bhun-buni-thatch-alpine-camp.jpg"
                alt="Trekkers traversing the panoramic alpine ridge trail towards Bhun Buni Thatch surrounded by Himalayan snow peaks"
                fill
                sizes="(max-width: 600px) 100vw, 350px"
                style={{ objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#D5ED55', color: '#121613', fontSize: '12px', fontWeight: '900', padding: '4px 10px', borderRadius: '999px' }}>
                ₹3,000 / person
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>2 Days / 1 Night · Moderate</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>Bhun Buni Thatch Trek</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: '0 0 12px' }}>
                A raw, untouched ridge trek starting right from Kalga village ascending to 10,500 FT with breathtaking views over the entire Parvati mountain range.
              </p>
              <div style={{ fontSize: '12.5px', color: '#121613', fontWeight: '700', marginBottom: '14px' }}>
                Includes: Trek guide, camping tents, sleeping bags, dinner & breakfast.
              </div>
              <Link href="/treks#bhun-buni" style={{ fontSize: '13px', fontWeight: '800', color: '#166534' }}>
                View Bhun Buni details →
              </Link>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.12)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '180px' }}>
              <Image
                src="/images/treks/bhandak-thach-pulga-forest.jpg"
                alt="Backpackers with hiking packs and trekking poles journeying through the mountain path towards Bhandak Thach"
                fill
                sizes="(max-width: 600px) 100vw, 350px"
                style={{ objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#D5ED55', color: '#121613', fontSize: '12px', fontWeight: '900', padding: '4px 10px', borderRadius: '999px' }}>
                ₹3,999 / person
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>2 Days / 1 Night · Moderate to Difficult</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>Bhandak Thach Trek</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: '0 0 12px' }}>
                Known as the &quot;Switzerland of Himachal&quot;, this scenic route winds through Pulga&apos;s ancient fairy forest to an immense hidden alpine grassland at 11,100 FT.
              </p>
              <div style={{ fontSize: '12.5px', color: '#121613', fontWeight: '700', marginBottom: '14px' }}>
                Includes: Certified guide, alpine dome tent, sleeping bag, dinner & breakfast.
              </div>
              <Link href="/treks#bhandak-thach" style={{ fontSize: '13px', fontWeight: '800', color: '#166534' }}>
                View Bhandak Thach details →
              </Link>
            </div>
          </div>

        </div>

        {/* Pahadi Dining & Fireside Culture */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          Authentic Pahadi Flavors & Evening Mountain Routine
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#2A312C', margin: '0 0 20px' }}>
          Mountain journeys are incomplete without nourishing home-cooked food. At The Nest Kalga, every stay includes a warming Himalayan welcome drink followed by hot evening dinners and wholesome mountain breakfasts. We celebrate Himachal Pradesh culinary heritage:
        </p>

        <div style={{ background: '#F8F9F5', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '20px', padding: '28px', marginBottom: '44px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px', color: '#166534' }}>
                Steamed Pahadi Siddu with Desi Ghee
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#59655D', margin: 0 }}>
                Traditional fermented wheat dough stuffed with crushed walnuts, poppy seeds, and roasted mountain herbs, served piping hot with pure clarified butter.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px', color: '#166534' }}>
                Pahadi Rajma Madra & Local Dal
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#59655D', margin: 0 }}>
                Slow-cooked red kidney beans stewed in seasoned curd gravy with cardamom and cloves, paired with steamed rice and crisp organic orchard salads.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px', color: '#166534' }}>
                Campfire Evenings & Starlit Melodies
              </h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#59655D', margin: 0 }}>
                As night falls across the valley, gather around the crackling pine-wood fire. Acoustic guitar sessions, shared traveler stories, and Milky Way stargazing create lifelong memories.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Transit Logistics */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          Route Logistics: How to Reach Kalga Village & Kasol
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#59655D', margin: '0 0 24px' }}>
          Reaching Kalga is straightforward when following this verified transit sequence from Delhi, Chandigarh, or Bhuntar:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '44px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: '#121613', color: '#D5ED55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>1</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', margin: '0 0 4px' }}>Delhi / Chandigarh to Bhuntar or Kasol</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
                Board an overnight AC Volvo / Scania bus from ISBT Kashmiri Gate (Delhi) or Sector 43 (Chandigarh) toward Manali. Disembark at Bhuntar (approx. 11 hours). Alternatively, take a direct semi-sleeper bus directly to Kasol.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: '#121613', color: '#D5ED55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>2</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', margin: '0 0 4px' }}>Kasol to Barshaini (Road End)</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
                From Kasol or Bhuntar, take a local HRTC bus or private shared taxi heading to Barshaini via Manikaran. Barshaini is the motorable terminus of Parvati Valley (approx. 40 minutes from Kasol).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: '#121613', color: '#D5ED55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px' }}>3</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', margin: '0 0 4px' }}>Barshaini to Kalga Pine Trail Climb</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
                From Barshaini bridge, follow the pedestrian stone stairway up through the deodar pine forest. A gentle 20-minute scenic walk leads you into Kalga village. Our team can coordinate porter assistance for heavy baggage upon request.
              </p>
            </div>
          </div>
        </div>

        {/* Season by Season Highland Guide */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(21px, 2.6vw, 30px)', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
          Season-by-Season Highland Guide for North Himachal
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#59655D', margin: '0 0 24px' }}>
          Kalga and Parvati Valley present distinct charms across the four Himalayan seasons:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '14px', marginBottom: '44px' }}>
          <div style={{ background: '#F8F9F5', borderRadius: '16px', padding: '20px', border: '1px solid rgba(18,22,19,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>Apr – Jun</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px' }}>Spring & Summer</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Pink apple blossoms blanket the village. Mild daytime weather (18°C–25°C), cool evenings, and prime conditions for Kheerganga and Bhun Buni treks.
            </p>
          </div>
          <div style={{ background: '#F8F9F5', borderRadius: '16px', padding: '20px', border: '1px solid rgba(18,22,19,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>Jul – Aug</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px' }}>Monsoon Mist</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Valley turns vibrant emerald green with cascading seasonal waterfalls. Quiet atmosphere favored by authors, remote workers, and peaceful workations.
            </p>
          </div>
          <div style={{ background: '#F8F9F5', borderRadius: '16px', padding: '20px', border: '1px solid rgba(18,22,19,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>Sep – Nov</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px' }}>Autumn Harvest</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Crisp blue skies and golden leaves. Juicy red royal apples harvested across the orchard, with crystal clear nights for high-altitude astrophotography.
            </p>
          </div>
          <div style={{ background: '#F8F9F5', borderRadius: '16px', padding: '20px', border: '1px solid rgba(18,22,19,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '900', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>Dec – Mar</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', margin: '0 0 6px' }}>Winter Snowscape</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#59655D', margin: 0 }}>
              Snow-covered wooden roofs, cozy Bukhari tandoor room heating, steaming hot chai, and therapeutic hot water bathing at snowy Kheerganga.
            </p>
          </div>
        </div>

        {/* December Snowfall, Christmas & New Year Special Section */}
        <div style={{ background: '#121613', color: '#FFFFFF', borderRadius: '24px', padding: ' clamp(24px, 4vw, 36px)', marginBottom: '44px', border: '1px solid rgba(213, 237, 85, 0.2)' }}>
          <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: '900', letterSpacing: '1.2px', textTransform: 'uppercase', background: '#D5ED55', color: '#121613', padding: '4px 12px', borderRadius: '999px', marginBottom: '12px' }}>
            Winter Peak · December Snowfall · Christmas & New Year 2026/27
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '800', margin: '0 0 12px', color: '#FFFFFF' }}>
            Winter in Kalga: Snow-Covered Orchards, Bukhari Heating & New Year Fires
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#A2B6A6', margin: '0 0 20px' }}>
            While central Kasol experiences cold winds, Kalga Village at 7,900 FT transforms into a serene snow paradise from mid-December. With zero motor engines, the snow blankets the deodar forests and wooden balconies in pure, undisturbed white. Celebrate Christmas Eve and ring in the New Year around our roaring pine-wood fires with live acoustic music, hot Pahadi Siddu with desi ghee, and clear Milky Way winter skies.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px', marginBottom: '22px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#D5ED55', marginBottom: '4px' }}>Bukhari & Geyser Heated</div>
              <p style={{ fontSize: '12.5px', color: '#D6E2D8', margin: 0, lineHeight: 1.55 }}>Wood-burning Bukhari stoves, thermal quilts & 24/7 hot water geysers keep rooms warm down to -5°C.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#D5ED55', marginBottom: '4px' }}>Winter Kheerganga Hot Springs</div>
              <p style={{ fontSize: '12.5px', color: '#D6E2D8', margin: 0, lineHeight: 1.55 }}>Trek through snow-dusted pines to soak in 42°C natural hot sulphur pools surrounded by snow peaks.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#D5ED55', marginBottom: '4px' }}>Christmas & New Year Celebrations</div>
              <p style={{ fontSize: '12.5px', color: '#D6E2D8', margin: 0, lineHeight: 1.55 }}>Acoustic guitar gatherings, fireside feasts, and midnight stargazing with no commercial club noise.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/camps/the-nest-kalga" className="btn-lime" style={{ padding: '10px 22px', fontSize: '13.5px', fontWeight: '800', textDecoration: 'none', borderRadius: '999px' }}>
              Reserve Winter Stay (Dorms ₹249 · Rooms ₹1,499) →
            </Link>
            <Link href="/blog/kasol-kalga-december-snowfall-christmas-new-year-guide" style={{ color: '#D5ED55', fontSize: '13.5px', fontWeight: '800', textDecoration: 'underline' }}>
              Read the December Snow & New Year Guide →
            </Link>
          </div>
        </div>

        {/* Read More Guides & Internal Linking */}
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#2A312C', margin: '0 0 28px' }}>
          Explore more about our Himalayan journeys: read our in-depth guides on{' '}
          <Link href="/blog/kasol-kalga-december-snowfall-christmas-new-year-guide" style={{ color: '#166534', fontWeight: '800' }}>Kasol & Kalga in December & Snowfall</Link>,{' '}
          <Link href="/blog/kheerganga-trek-guide-cost-route-parvati-valley" style={{ color: '#166534', fontWeight: '800' }}>Kheerganga Trek Guide</Link>,{' '}
          <Link href="/blog/affordable-dorm-stays-kasol-kalga-himachal-guide" style={{ color: '#166534', fontWeight: '800' }}>Affordable Dorm Stays in Kasol–Kalga</Link>{' '}
          and{' '}
          <Link href="/blog/best-scenic-stays-parvati-valley-himachal" style={{ color: '#166534', fontWeight: '800' }}>The Most Scenic Stays in Parvati Valley</Link>,{' '}
          or browse our{' '}
          <Link href="/treks" style={{ color: '#166534', fontWeight: '800' }}>Guided Alpine Treks</Link>{' '}
          and{' '}
          <Link href="/camps/munnar" style={{ color: '#166534', fontWeight: '800' }}>Munnar Cloud-Bed Stays</Link>.
        </p>

        {/* Call to Action Card */}
        <div style={{ background: '#121613', borderRadius: '24px', padding: '32px 36px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 6px' }}>
              Experience The Nest Kalga at 7,900 FT
            </div>
            <p style={{ fontSize: '14px', color: '#A2B6A6', margin: '0' }}>
              Dorm bunks from ₹249 & private balcony suites bookable with zero OTA commissions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/camps/the-nest-kalga" className="btn-lime" style={{ padding: '13px 26px', fontSize: '14px', fontWeight: '900', textDecoration: 'none', borderRadius: '999px' }}>
              Book Kalga Stay →
            </Link>
            <a
              href={waLink('Hi Aanandham! I want to enquire about booking The Nest Kalga in Himachal Pradesh.')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '13px 26px', fontSize: '14px', fontWeight: '800', textDecoration: 'none', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function HimachalCampsPage() {
  const activeCamps = INITIAL_ALL_CAMPS.filter(c => !c.archived);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';
  const liveHimachal = INITIAL_ALL_CAMPS.filter((c) => c.region === 'Himachal' && !c.archived);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Camps', item: `${siteUrl}/camps` },
      { '@type': 'ListItem', position: 3, name: 'North Himachal', item: `${siteUrl}/camps/himachal` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified North Himachal Stays — Dorms, Rooms & Scenic Mountain Stays',
    description: 'Live bookable North Himachal stays in Kalga & Kasol with verified hosts, meals and alpine trek support.',
    itemListElement: liveHimachal.map((camp, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'LodgingBusiness',
        name: camp.title,
        description: camp.description,
        url: `${siteUrl}/camps/${camp.id}`,
        image: camp.image?.startsWith('http') ? camp.image : `${siteUrl}${camp.image}`,
        priceRange: `₹${camp.price} - ₹${camp.originalPrice || 1500}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (camp.rating || 4.9).toString(),
          reviewCount: '164',
          bestRating: '5',
          worstRating: '1',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kalga Village, Kasol',
          addressRegion: 'Himachal Pradesh',
          postalCode: '175105',
          addressCountry: 'IN',
        },
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are there affordable dorm stays in Kasol and Kalga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Nest Kalga offers 10-bed backpacker mountain dorms from ₹249 per bed with shared hot showers, high-speed Wi-Fi, bunk reading lights and panoramic sunrise deck views — the most affordable verified stay in Parvati Valley.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I stay in Kalga Village rather than central Kasol?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Central Kasol is a crowded vehicular market, whereas Kalga Village sits at 7,900 FT across the river from Barshaini with zero vehicular noise, fresh deodar pine air, traditional Kath-Kuni cedar architecture, and direct trailhead access to Kheerganga, Bhun Buni, and Bhandak Thach.',
        },
      },
      {
        '@type': 'Question',
        name: 'What private rooms are available at The Nest Kalga for couples or families?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Nest Kalga offers the Deluxe Balcony Room (₹1,499/night) with mountain-facing private balcony and work desk, and the Deluxe Suite (₹1,199/night) with king-size bed and ensuite bathroom.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is food included with stays at The Nest Kalga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, bookings include a traditional welcome drink plus hot Pahadi dinners and wholesome breakfasts, along with fireside tea and on-ground host support.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I reach Kalga Village from Delhi or Chandigarh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Take an overnight semi-sleeper Volvo bus from Delhi or Chandigarh to Bhuntar or Kasol, take a local cab or bus to Barshaini (roadhead), and take the scenic 20-minute deodar pine trail climb up to Kalga village.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book guided alpine treks starting directly from Kalga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Aanandham organizes guided treks starting right from Kalga Village: Kheerganga Trek (₹900/person), Bhun Buni Thatch Trek (₹3,000/person), and Bhandak Thach Trek (₹3,999/person) with certified local mountain guides.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Kalga Village get snowfall in December?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Kalga Village sits at 7,900 FT and regularly receives fresh snowfall from mid-December through February, turning its pine groves and apple orchards into a white winter wonderland.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are stays at The Nest Kalga heated for December and winter temperatures?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Nest Kalga is equipped with traditional wood-burning Bukhari stoves, electric heating, warm thermal fleece quilts, and 24/7 hot water geysers for comfortable sub-zero stays.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are Christmas and New Year celebrated in Kalga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kalga hosts intimate, soul-stirring Christmas and New Year gatherings: crackling pine-wood campfires, live acoustic guitar music, steaming hot Siddu with desi ghee, stargazing, and zero commercial party chaos.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CampsDirectoryClient
        initialCamps={activeCamps}
        initialRegion="Himachal"
        comingSoon={false}
        heroBadge="★ NORTH HIMACHAL · PARVATI VALLEY · KALGA AT 7,900 FT"
        heroTitle={<>North Himachal Stays: <span style={{ color: '#D5ED55' }}>Kalga Village & Kasol Basecamps</span></>}
        heroSubtitle="High alpine pine sanctuaries at 7,900 FT — backpacker dorms from ₹249, sunrise balcony suites, Kath-Kuni wooden architecture, Pahadi fireside dining, and direct trailhead access to Kheerganga, Bhun Buni Thatch & Bhandak Thach."
        extraContent={<HimachalStayGuide />}
      />
    </>
  );
}
