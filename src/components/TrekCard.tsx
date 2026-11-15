import React from 'react';
import Image from 'next/image';
import { TrekItem } from '@/content/treks';
import { MapPin, Clock, Mountain, Check, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './common/BrandIcons';
import { waLink } from '../lib/whatsapp';

interface TrekCardProps {
  trek: TrekItem;
  onBook?: (trek: TrekItem) => void;
}

export default function TrekCard({ trek, onBook }: TrekCardProps) {
  const whatsappHref = waLink(trek.waMessage);

  const getDifficultyColor = (tone: TrekItem['difficultyTone']) => {
    switch (tone) {
      case 'easy':
        return { bg: 'rgba(34, 197, 94, 0.18)', border: '#22C55E', text: '#22C55E' };
      case 'moderate':
        return { bg: 'rgba(234, 179, 8, 0.18)', border: '#EAB308', text: '#FACC15' };
      case 'challenging':
        return { bg: 'rgba(239, 68, 68, 0.18)', border: '#EF4444', text: '#F87171' };
      default:
        return { bg: 'rgba(213, 237, 85, 0.18)', border: '#D5ED55', text: '#D5ED55' };
    }
  };

  const diffStyle = getDifficultyColor(trek.difficultyTone);

  return (
    <article
      role="article"
      aria-label={`${trek.name} — ${trek.startingPoint}`}
      style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(213, 237, 85, 0.22)',
        borderRadius: '22px',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="trek-card hover-lift"
    >
      {/* Visual Header / Cover Image */}
      <div style={{ height: '210px', position: 'relative', overflow: 'hidden', background: '#0D1A10' }}>
        <Image
          src={trek.image}
          alt={trek.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover', opacity: 0.9 }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {trek.badge && (
            <span
              style={{
                background: trek.isProposed ? '#E5A93B' : '#D5ED55',
                color: '#121613',
                fontSize: '10px',
                fontWeight: 900,
                padding: '3px 9px',
                borderRadius: '999px',
                letterSpacing: '0.3px',
              }}
            >
              {trek.badge}
            </span>
          )}
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Mountain size={11} color="#D5ED55" />
            {trek.altitude}
          </span>
        </div>

        {/* Starting Point & Duration on Bottom of Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(18, 22, 19, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              padding: '3px 9px',
              borderRadius: '999px',
              backdropFilter: 'blur(6px)',
              fontSize: '10.5px',
              fontWeight: 700,
              color: '#FFFFFF',
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
              background: 'rgba(18, 22, 19, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              padding: '3px 9px',
              borderRadius: '999px',
              backdropFilter: 'blur(6px)',
              fontSize: '10.5px',
              fontWeight: 700,
              color: '#D5ED55',
            }}
          >
            <Clock size={11} color="#D5ED55" />
            {trek.duration}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Sub-header with Difficulty Tag & Location */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: diffStyle.bg,
              border: `1px solid ${diffStyle.border}`,
              color: diffStyle.text,
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            Difficulty: {trek.difficulty}
          </span>
          <span style={{ fontSize: '11px', color: '#A2B6A6', fontWeight: 600 }}>
            {trek.region}
          </span>
        </div>

        {/* Trek Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 6px',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          {trek.name}
        </h3>

        {/* Tagline */}
        <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#D5ED55', marginBottom: '8px' }}>
          {trek.tagline}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            color: '#A2B6A6',
            lineHeight: 1.55,
            margin: '0 0 16px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {trek.description}
        </p>

        {/* Inclusions Checklist */}
        <div style={{ marginBottom: '18px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#8E9B92', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
            Package Inclusions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {trek.inclusions.map((inc, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: '#E0E7E2',
                  lineHeight: 1.4,
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'rgba(213, 237, 85, 0.15)',
                    border: '1px solid rgba(213, 237, 85, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  <Check size={10} color="#D5ED55" strokeWidth={3} />
                </span>
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Price & CTA Actions */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#8E9B92', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tariff
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 900, color: '#D5ED55', lineHeight: 1.1 }}>
              {trek.priceFormatted}{' '}
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#A2B6A6' }}>{trek.priceUnit}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${trek.name} on WhatsApp`}
              style={{
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: '10px',
                background: '#D5ED55',
                color: '#121613',
                fontSize: '12.5px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <WhatsAppIcon size={14} color="#121613" />
              <span>Enquire Trek</span>
            </a>

            {onBook && (
              <button
                type="button"
                onClick={() => onBook(trek)}
                style={{
                  minHeight: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
