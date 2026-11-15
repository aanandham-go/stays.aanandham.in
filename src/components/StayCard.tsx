import React from 'react';
import Image from 'next/image';
import { StayItem } from '@/content/stays';
import { siteConfig } from '@/content/site';
import { MapPin, Star, ShieldCheck, Mountain, Users, ArrowUpRight } from 'lucide-react';

interface StayCardProps {
  stay: StayItem;
}

export default function StayCard({ stay }: StayCardProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello Aanandham Stays Concierge! I want to check availability for "${stay.name}" (${stay.regionLabel}) at ₹${stay.pricePerNight}/night.`
  )}`;

  return (
    <article
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      }}
      className="stay-card"
    >
      {/* Visual Header / Cover Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          backgroundColor: '#E5E7EB',
          overflow: 'hidden',
        }}
      >
        <Image
          src={stay.coverImage}
          alt={stay.coverImageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Region & Altitude Floating Chips */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(18, 22, 19, 0.75)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            <Mountain size={13} aria-hidden="true" />
            <span>{stay.altitudeFt.toLocaleString('en-IN')} ft</span>
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: stay.region === 'munnar' ? 'rgba(27, 77, 62, 0.9)' : 'rgba(194, 65, 12, 0.9)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {stay.region === 'munnar' ? 'Munnar' : 'Himachal'}
          </span>
        </div>

        {/* Verified Stay Badge */}
        {stay.verifiedStay && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              color: 'var(--color-brand-pine)',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
            title="Aanandham Verified Mountain Stay"
          >
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Stay Content Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Location & Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <MapPin size={14} aria-hidden="true" />
            <span>{stay.location}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            <Star size={14} style={{ fill: '#EAB308', color: '#EAB308' }} aria-hidden="true" />
            <span>{stay.rating.toFixed(2)}</span>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>
              ({stay.reviewCount})
            </span>
          </div>
        </div>

        {/* Heading: H3 following strict hierarchy */}
        <h3
          style={{
            fontSize: '1.1875rem',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '8px',
          }}
        >
          {stay.name}
        </h3>

        {/* Tagline / Subtitle */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: '16px',
            flex: 1,
          }}
        >
          {stay.tagline}
        </p>

        {/* Key Amenities Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
          }}
        >
          {stay.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-subtle)',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              {amenity}
            </span>
          ))}
          <span
            style={{
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-bg-subtle)',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Users size={12} aria-hidden="true" />
            <span>{stay.capacity}</span>
          </span>
        </div>

        {/* Footer: Price & Booking Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>From</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: 'var(--color-brand-pine)',
                }}
              >
                ₹{stay.pricePerNight.toLocaleString('en-IN')}
              </span>
              <span
                style={{
                  fontSize: '0.8125rem',
                  textDecoration: 'line-through',
                  color: 'var(--color-text-muted)',
                }}
              >
                ₹{stay.originalPricePerNight.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/ night</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.875rem',
              gap: '6px',
            }}
            aria-label={`Reserve ${stay.name} via WhatsApp Concierge`}
          >
            <span>Book Stay</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .stay-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </article>
  );
}
