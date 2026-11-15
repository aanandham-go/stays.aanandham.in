import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Aanandham Stays Mountain Refund',
  description:
    'Transparent cancellation and refund terms for high-altitude geodesic domes and wilderness retreats in Himachal and Munnar with Aanandham Stays.',
  alternates: {
    canonical: `${siteConfig.url}/cancellation-policy`,
  },
};

export default function CancellationPolicyPage() {
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
        <RefreshCw size={14} aria-hidden="true" />
        <span>Transparent Refunds</span>
      </div>

      <h1 style={{ marginBottom: '24px' }}>Cancellation & Refund Policy</h1>

      <div style={{ color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7 }}>
        <p>
          We understand mountain weather conditions and travel schedules can occasionally shift. Our cancellation policy is designed to be fair and transparent:
        </p>

        <h2>1. Cancellation Windows</h2>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>7+ Days Prior to Check-in:</strong> 100% refund or 100% credit voucher valid for 12 months across any Himachal or Munnar property.
          </li>
          <li>
            <strong>3 to 7 Days Prior to Check-in:</strong> 50% refund or 75% credit voucher valid for 6 months.
          </li>
          <li>
            <strong>Less than 72 Hours Prior to Check-in:</strong> Non-refundable due to mountain staff allocation and advance provisioning.
          </li>
        </ul>

        <h2>2. Severe Weather & Landslide Policy</h2>
        <p>
          If access routes are closed due to extreme mountain landslides or official government travel advisories, bookings will be rescheduled with zero fee penalty or converted to full value lifetime vouchers.
        </p>
      </div>
    </div>
  );
}
