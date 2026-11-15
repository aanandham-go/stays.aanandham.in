"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import { treksData } from '@/content/treks';
import { waLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/common/BrandIcons';
import {
  MapPin,
  Clock,
  Mountain,
  Check,
  Footprints,
  ShieldCheck,
  Flame,
  ArrowRight,
  ChevronRight,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';

const CONTAINER = { maxWidth: '1440px', margin: '0 auto', width: '100%' };

export default function TreksPage() {
  const [selectedVillage, setSelectedVillage] = useState('All');

  const filteredTreks = treksData.filter(trek => {
    if (selectedVillage === 'Kalga') return trek.startingPoint.toLowerCase().includes('kalga');
    if (selectedVillage === 'Pulga') return trek.startingPoint.toLowerCase().includes('pulga');
    return true;
  });

  return (
    <div style={{ backgroundColor: '#070D09', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader transparentOnTop={false} activePage="treks" />

      <main id="main-content" style={{ flex: 1 }}>
        {/* ── HERO BANNER ── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(90px, 10vw, 130px) clamp(20px, 4vw, 48px) clamp(50px, 6vw, 70px)',
            background: 'linear-gradient(180deg, #070D09 0%, #0D1711 100%)',
            borderBottom: '1px solid rgba(213,237,85,0.12)',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(213,237,85,0.08) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={CONTAINER}>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
              <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#8E9B92' }}>
                <li>
                  <Link href="/" style={{ color: '#A2B6A6', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight size={13} color="#8E9B92" />
                </li>
                <li>
                  <span style={{ color: '#D5ED55', fontWeight: 700 }} aria-current="page">
                    Guided Alpine Treks
                  </span>
                </li>
              </ol>
            </nav>

            <div style={{ maxWidth: '820px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(213,237,85,0.12)',
                  border: '1px solid rgba(213,237,85,0.3)',
                  borderRadius: '999px',
                  padding: '6px 16px',
                  marginBottom: '18px'
                }}
              >
                <Footprints size={14} color="#D5ED55" />
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#D5ED55', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Parvati Valley Himalayan Basecamp · 7,900 FT to 11,500 FT
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 5.5vw, 54px)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 16px',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.15
                }}
              >
                Guided Alpine Treks in Parvati Valley
              </h1>

              <p
                style={{
                  fontSize: 'clamp(15px, 1.6vw, 17px)',
                  color: '#A2B6A6',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  maxWidth: '720px'
                }}
              >
                Step straight out of our Kalga and Pulga basecamps into the untouched Himalayas. Authentic 2 Days / 1 Night alpine expeditions to natural hot springs, panoramic ridge meadows, and virgin high-altitude pastures with local certified mountain guides, alpine gear, and hot meals included.
              </p>

              {/* Trust Badges Row */}
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
                  <ShieldCheck size={16} color="#D5ED55" />
                  <span>Certified Local Guides</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
                  <Flame size={16} color="#D5ED55" />
                  <span>Warm Meals &amp; Campfires</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
                  <Compass size={16} color="#D5ED55" />
                  <span>Zero Middleman Tariffs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TREKS LISTING & FILTER BAR ── */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)', background: '#09120C' }}>
          <div style={CONTAINER}>
            {/* Filter Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '36px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 4px' }}>
                  Explore Our 3 Signature Trails
                </h2>
                <p style={{ fontSize: '13px', color: '#8E9B92', margin: 0 }}>
                  All packages include guide, accommodation, dinner, and breakfast
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                  { id: 'All', label: 'All Trails (3)' },
                  { id: 'Kalga', label: 'Starts Kalga Village (2)' },
                  { id: 'Pulga', label: 'Starts Pulga Village (1)' }
                ].map(filter => {
                  const isCurrent = selectedVillage === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setSelectedVillage(filter.id)}
                      style={{
                        minHeight: '44px',
                        padding: '0 18px',
                        borderRadius: '999px',
                        border: isCurrent ? '1px solid #D5ED55' : '1px solid rgba(255,255,255,0.14)',
                        background: isCurrent ? '#D5ED55' : 'rgba(255,255,255,0.06)',
                        color: isCurrent ? '#121613' : '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Treks Detailed Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '28px' }}>
              {filteredTreks.map((trek) => {
                const diffColor = trek.difficultyTone === 'easy'
                  ? { bg: 'rgba(34, 197, 94, 0.16)', border: '#22C55E', text: '#22C55E' }
                  : trek.difficultyTone === 'moderate'
                  ? { bg: 'rgba(234, 179, 8, 0.16)', border: '#EAB308', text: '#FACC15' }
                  : { bg: 'rgba(239, 68, 68, 0.16)', border: '#EF4444', text: '#F87171' };

                return (
                  <article
                    key={trek.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(213, 237, 85, 0.22)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                    }}
                    className="hover-lift"
                  >
                    {/* Image Header with Altitude & Duration Badges */}
                    <div style={{ height: '230px', position: 'relative', overflow: 'hidden', background: '#0D1A10' }}>
                      <Image
                        src={trek.image}
                        alt={trek.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover', opacity: 0.9 }}
                        loading="lazy"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />

                      {/* Top Badges */}
                      <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {trek.badge && (
                          <span
                            style={{
                              background: trek.isProposed ? '#E5A93B' : '#D5ED55',
                              color: '#121613',
                              fontSize: '10.5px',
                              fontWeight: 900,
                              padding: '4px 10px',
                              borderRadius: '999px',
                              letterSpacing: '0.3px'
                            }}
                          >
                            {trek.badge}
                          </span>
                        )}
                        <span
                          style={{
                            background: 'rgba(0,0,0,0.65)',
                            color: '#FFFFFF',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Mountain size={12} color="#D5ED55" />
                          {trek.altitude}
                        </span>
                      </div>

                      {/* Bottom Image Info */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '14px',
                          right: '14px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '6px'
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(18,22,19,0.88)',
                            border: '1px solid rgba(255,255,255,0.16)',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            backdropFilter: 'blur(6px)',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#FFFFFF'
                          }}
                        >
                          <MapPin size={11} color="#D5ED55" />
                          Starts: {trek.startingPoint}
                        </span>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(18,22,19,0.88)',
                            border: '1px solid rgba(255,255,255,0.16)',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            backdropFilter: 'blur(6px)',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            color: '#D5ED55'
                          }}
                        >
                          <Clock size={11} color="#D5ED55" />
                          {trek.duration}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(213,237,85,0.14)',
                            border: '1px solid rgba(213,237,85,0.35)',
                            color: '#D5ED55',
                            fontSize: '10.5px',
                            fontWeight: 900,
                            padding: '3px 9px',
                            borderRadius: '999px'
                          }}
                        >
                          <Check size={9} color="#D5ED55" strokeWidth={3.5} />
                          Aanandham Mountain Marshal
                        </span>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: diffColor.bg,
                            border: `1px solid ${diffColor.border}`,
                            color: diffColor.text,
                            fontSize: '10.5px',
                            fontWeight: 800,
                            padding: '3px 9px',
                            borderRadius: '999px'
                          }}
                        >
                          {trek.difficulty}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '22px',
                          fontWeight: 900,
                          color: '#FFFFFF',
                          margin: '0 0 4px',
                          lineHeight: 1.25,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {trek.name}
                      </h2>

                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#D5ED55', marginBottom: '10px' }}>
                        {trek.tagline}
                      </div>

                      <p
                        style={{
                          fontSize: '13.5px',
                          color: '#A2B6A6',
                          lineHeight: 1.6,
                          margin: '0 0 18px'
                        }}
                      >
                        {trek.description}
                      </p>

                      {/* Package Inclusions Box */}
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '14px',
                          padding: '12px 14px',
                          marginBottom: '20px'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            color: '#8E9B92',
                            textTransform: 'uppercase',
                            letterSpacing: '0.6px',
                            marginBottom: '8px'
                          }}
                        >
                          Package Inclusions (2D / 1N)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {trek.inclusions.map((inc, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#E2E8E4', lineHeight: 1.35 }}>
                              <span
                                style={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '50%',
                                  background: 'rgba(213,237,85,0.15)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                <Check size={9} color="#D5ED55" strokeWidth={3} />
                              </span>
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tariff & Action Button */}
                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B8A72', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Trek Package Tariff
                          </div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 900, color: '#D5ED55', lineHeight: 1.1 }}>
                            {trek.priceFormatted}{' '}
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#A2B6A6' }}>{trek.priceUnit}</span>
                          </div>
                        </div>

                        <a
                          href={waLink(trek.waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Enquire about ${trek.name} on WhatsApp`}
                          style={{
                            minHeight: '44px',
                            padding: '0 20px',
                            borderRadius: '10px',
                            background: '#D5ED55',
                            color: '#121613',
                            fontSize: '13px',
                            fontWeight: 900,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <WhatsAppIcon size={14} color="#121613" />
                          <span>Book / Enquire</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BASECAMP ACCOMMODATION CALLOUT ── */}
        <section style={{ padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px)', background: '#0E1711', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={CONTAINER}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(27,77,62,0.3) 0%, rgba(18,22,19,0.7) 100%)',
                border: '1px solid rgba(213,237,85,0.25)',
                borderRadius: '28px',
                padding: 'clamp(32px, 5vw, 48px)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(213,237,85,0.14)', borderRadius: '999px', padding: '4px 12px', marginBottom: '12px' }}>
                  <Sparkles size={12} color="#D5ED55" />
                  <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#D5ED55', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Trek Basecamp Homestay
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', lineHeight: 1.2 }}>
                  Need a Basecamp Before or After Your Trek?
                </h2>
                <p style={{ fontSize: '14.5px', color: '#A2B6A6', lineHeight: 1.65, margin: 0 }}>
                  Stay right at the trailhead at <strong>The Nest Kalga</strong>. Backpacker dorm beds from ₹249/night, private sunrise balcony suites, clean hot water washrooms, and Pahadi Siddu dining overlooking snow peaks.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/camps/the-nest-kalga"
                  style={{
                    minHeight: '44px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    background: '#D5ED55',
                    color: '#121613',
                    fontSize: '13.5px',
                    fontWeight: 900,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Explore The Nest Kalga</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="https://wa.me/919074858014?text=Hi%20Aanandham!%20I%20want%20to%20plan%20a%20trek%20plus%20stay%20in%20Kalga%20Village,%20Parvati%20Valley."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    minHeight: '44px',
                    padding: '0 22px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <WhatsAppIcon size={14} color="#25D366" />
                  <span>Custom Trek + Stay Quote</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── TREK PREPARATION & GUIDELINES ── */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)', background: '#070D09' }}>
          <div style={CONTAINER}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(213,237,85,0.12)', borderRadius: '999px', padding: '4px 14px', marginBottom: '12px' }}>
                <Info size={12} color="#D5ED55" />
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#D5ED55', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Mountain Etiquette &amp; Gear
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px' }}>
                Trail Advice from Our Mountain Marshals
              </h2>
              <p style={{ fontSize: '14px', color: '#A2B6A6', lineHeight: 1.6, margin: 0 }}>
                Essential guidance to ensure a safe, joyful, and environmentally conscious journey in Parvati Valley.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Footwear & Layers',
                  desc: 'Wear sturdy trekking shoes with good grip. High-altitude evenings drop below 8°C — bring a warm fleece jacket, thermal inner, and rain poncho.'
                },
                {
                  title: 'Leave No Trace',
                  desc: 'Parvati Valley alpine meadows are sacred ecological heritage. Carry all personal trash and plastic back down to the village basecamp.'
                },
                {
                  title: 'Acclimatization & Pace',
                  desc: 'Kalga Village sits at 7,900 FT. Spend one night relaxing at the basecamp before beginning higher climbs to Bhun Buni (10,800 FT) or Bhandak (11,500 FT).'
                },
                {
                  title: 'Hydration & Nutrition',
                  desc: 'Carry a reusable water bottle. Hot nutritious dinners and breakfasts are prepared by our trek team at the campsite.'
                },
                {
                  title: 'Winter Snow Trails (Dec–Feb)',
                  desc: 'Kheerganga and Pulga trails receive crisp Himalayan snowfall. Microspikes, gaiters, and insulated sub-zero camping gear are arranged by our local guides.'
                },
                {
                  title: 'Christmas & New Year Holidays',
                  desc: 'Holiday trekking and campfire slots for Christmas and New Year fill rapidly. Book in advance to secure certified guides and heated Kalga dorm/room basecamps.'
                }
              ].map((tip, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '18px',
                    padding: '22px 20px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                    {tip.title}
                  </div>
                  <p style={{ fontSize: '13px', color: '#A2B6A6', lineHeight: 1.6, margin: 0 }}>
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
