'use client';

import React, { useState } from 'react';
import { StayItem } from '@/content/stays';
import StayCard from './StayCard';
import { Mountain, Compass } from 'lucide-react';

interface RegionFilterSectionProps {
  stays: StayItem[];
}

export default function RegionFilterSection({ stays }: RegionFilterSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'munnar' | 'himachal'>('all');

  const filteredStays = stays.filter((stay) => {
    if (activeFilter === 'all') return true;
    return stay.region === activeFilter;
  });

  return (
    <section
      id="stays"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
      aria-labelledby="stays-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-brand-pine-light)',
              color: 'var(--color-brand-pine)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '14px',
            }}
          >
            <Compass size={15} aria-hidden="true" />
            <span>Curated Sanctuaries</span>
          </div>

          <h2
            id="stays-heading"
            style={{
              marginBottom: '16px',
              color: 'var(--color-text-primary)',
            }}
          >
            Explore Highland Stays in Munnar & Himachal
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
            From high-altitude tea ridge domes above Munnar&apos;s cloud bed to alpine cedar lodges in Himachal&apos;s ancient deodar forests.
          </p>
        </div>

        {/* Filter Tablist */}
        <div
          role="tablist"
          aria-label="Filter stays by highland region"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              backgroundColor: activeFilter === 'all' ? 'var(--color-brand-pine)' : 'var(--color-bg-secondary)',
              color: activeFilter === 'all' ? 'var(--color-text-light)' : 'var(--color-text-primary)',
              border: '1px solid',
              borderColor: activeFilter === 'all' ? 'var(--color-brand-pine)' : 'var(--color-border-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            All Mountain Stays ({stays.length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'munnar'}
            onClick={() => setActiveFilter('munnar')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              backgroundColor: activeFilter === 'munnar' ? 'var(--color-brand-pine)' : 'var(--color-bg-secondary)',
              color: activeFilter === 'munnar' ? 'var(--color-text-light)' : 'var(--color-text-primary)',
              border: '1px solid',
              borderColor: activeFilter === 'munnar' ? 'var(--color-brand-pine)' : 'var(--color-border-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Munnar Cloudbeds ({stays.filter((s) => s.region === 'munnar').length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'himachal'}
            onClick={() => setActiveFilter('himachal')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              backgroundColor: activeFilter === 'himachal' ? 'var(--color-brand-pine)' : 'var(--color-bg-secondary)',
              color: activeFilter === 'himachal' ? 'var(--color-text-light)' : 'var(--color-text-primary)',
              border: '1px solid',
              borderColor: activeFilter === 'himachal' ? 'var(--color-brand-pine)' : 'var(--color-border-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Himachal Cedars ({stays.filter((s) => s.region === 'himachal').length})
          </button>
        </div>

        {/* Stays Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredStays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      </div>
    </section>
  );
}
