'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aanandham_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aanandham_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('aanandham_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '540px',
        margin: '0 auto',
        zIndex: 9999,
        backgroundColor: 'var(--color-bg-dark-card)',
        color: 'var(--color-text-light)',
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dark)',
        border: '1px solid var(--color-border-dark-medium)',
      }}
    >
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <Shield size={22} style={{ color: '#4ADE80', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-family-display)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              marginBottom: '4px',
            }}
          >
            Privacy & Cookie Preferences
          </div>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-light-muted)',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            We use essential cookies to maintain secure sessions and performance metrics in compliance with DPDP & GDPR. Non-essential cookies are only enabled upon your consent.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAccept}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="btn btn-outline"
              style={{
                padding: '8px 16px',
                fontSize: '0.8125rem',
                color: 'var(--color-text-light)',
                borderColor: 'var(--color-border-dark-medium)',
              }}
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
