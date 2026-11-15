'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/content/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        backgroundColor: 'var(--color-bg-subtle)',
      }}
      aria-labelledby="faq-section-title"
    >
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            <HelpCircle size={15} aria-hidden="true" />
            <span>Highland Stay Guidelines</span>
          </div>

          <h2
            id="faq-section-title"
            style={{
              marginBottom: '16px',
              color: 'var(--color-text-primary)',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
            Everything you need to know about weather, logistics, packing, and 4x4 access for your mountain getaway.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={faq.question}
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 24px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-normal)',
                        color: 'var(--color-brand-pine)',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{
                    padding: isOpen ? '0 24px 20px' : '0 24px',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
