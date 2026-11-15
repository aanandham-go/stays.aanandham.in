import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Aanandham Stays Mountain Policy',
  description:
    'Read terms of service for booking verified experiential stays, geodesic pods, and wilderness retreats in Himachal and Munnar with Aanandham Stays.',
  alternates: {
    canonical: `${siteConfig.url}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container-narrow" style={{ padding: 'clamp(48px, 6vw, 80px) 20px' }}>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-brand-pine)',
          fontWeight: 600,
          marginBottom: '28px',
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Back to Home</span>
      </Link>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-brand-pine-light)',
          color: 'var(--color-brand-pine)',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        <FileText size={14} aria-hidden="true" />
        <span>Terms & Conditions</span>
      </div>

      <h1 style={{ marginBottom: '24px' }}>Terms of Service</h1>

      <div style={{ color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7 }}>
        <p>
          Welcome to Aanandham Stays (STAYS.AANANDHAM.GO). By reserving a dome pod, cottage, or tent stay with us, you agree to comply with the terms set forth herein.
        </p>

        <h2>1. Mountain Environment & Safety</h2>
        <p>
          Our sanctuaries are situated in high-altitude environments (5,000 ft - 7,200 ft). Guests are advised to follow the safety directions of certified mountain marshals during guided treks, 4x4 Jeep convoys, and campfire activities.
        </p>

        <h2>2. Check-In & Check-Out Times</h2>
        <p>
          Standard check-in begins at 2:00 PM and check-out is by 11:00 AM. In Munnar, 4x4 Jeep transfers from base hubs operate on scheduled convoy batches to ensure mountain trail safety.
        </p>

        <h2>3. Code of Conduct</h2>
        <p>
          We maintain strict quiet hours between 10:30 PM and 6:00 AM to preserve the natural peace, stargazing atmosphere, and respect for fellow travelers and local wildlife.
        </p>
      </div>
    </div>
  );
}
