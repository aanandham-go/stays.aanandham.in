import React from 'react';
import Image from 'next/image';
import { ExperienceItem } from '@/content/experiences';
import { Clock, Mountain, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/content/site';

interface ExperienceCardProps {
  experience: ExperienceItem;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello Aanandham Stays Concierge! I want to inquire about the "${experience.title}" in ${experience.region}.`
  )}`;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          backgroundColor: '#E5E7EB',
        }}
      >
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(18, 22, 19, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {experience.tag}
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            marginBottom: '8px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} aria-hidden="true" />
            <span>{experience.duration}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Mountain size={13} aria-hidden="true" />
            <span>{experience.altitude}</span>
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontWeight: 700,
              color: experience.region === 'Munnar' ? 'var(--color-brand-pine)' : 'var(--color-brand-terracotta)',
            }}
          >
            {experience.region}
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {experience.title}
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: '16px',
            flex: 1,
          }}
        >
          {experience.description}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-brand-pine)',
            fontWeight: 700,
            fontSize: '0.875rem',
            marginTop: 'auto',
          }}
          aria-label={`Inquire about ${experience.title} on WhatsApp`}
        >
          <span>Inquire Experience</span>
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
