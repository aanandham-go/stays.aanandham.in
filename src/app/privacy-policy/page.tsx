import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aanandham Stays Data Protection',
  description:
    'Our privacy policy explains how Aanandham Stays collects, protects, and handles your booking data in full compliance with DPDP Act 2023 and GDPR guidelines.',
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
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
        <ShieldCheck size={14} aria-hidden="true" />
        <span>DPDP & GDPR Compliance</span>
      </div>

      <h1 style={{ marginBottom: '24px' }}>Privacy Policy & Data Protection</h1>

      <div style={{ color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7 }}>
        <p>
          At Aanandham Stays (STAYS.AANANDHAM.GO), sub-brand of {siteConfig.parentBrand}, we value your privacy and are committed to safeguarding personal information collected when you browse our site or book accommodations in Himachal and Munnar.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We only collect personal information necessary to confirm bookings and coordinate logistics. This includes your name, phone number, email address, guest headcount, and check-in dates communicated via our booking channels or WhatsApp concierge.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          Your information is solely used to facilitate reservation confirmations, mountain jeep shuttle arrangements, emergency communication, and digital billing passes. We never sell or lease your personal data to third-party advertisers.
        </p>

        <h2>3. Data Retention & Security</h2>
        <p>
          In accordance with the Digital Personal Data Protection (DPDP) Act and GDPR standards, booking records are encrypted and retained only as long as necessary to comply with legal audit requirements and hospitality safety regulations.
        </p>

        <h2>4. Contact Us</h2>
        <p>
          For questions regarding your personal data or privacy preferences, reach out to our privacy officer at{' '}
          <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'var(--color-brand-pine)', textDecoration: 'underline' }}>
            {siteConfig.contact.email}
          </a>.
        </p>
      </div>
    </div>
  );
}
