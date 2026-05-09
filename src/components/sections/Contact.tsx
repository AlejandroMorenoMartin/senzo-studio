import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionLabel from '../SectionLabel';
import Btn from '../Btn';
import { contact } from '../../data/content';

interface ContactProps {
  onBusinessClick: () => void;
  onFreelancerClick: () => void;
}

function ContactCard({ title, description, cta, onClick }: {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        border: 'var(--border)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <p className="text-l" style={{ color: 'var(--color-neutral-100)' }}>{title}</p>
        <p className="text-base" style={{ color: 'var(--color-neutral-500)' }}>{description}</p>
      </div>

      <div style={{ alignSelf: 'flex-start' }}>
        <Btn variant="primary" onClick={onClick}>{cta}</Btn>
      </div>
    </div>
  );
}

function EmailHero() {
  const { t } = useTranslation('contact');
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const tooltipLabel = copied ? t('contact:emailTooltip.copied') : t('contact:emailTooltip.clickToCopy');

  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-7) 0' }}>
      <p className="text-s" style={{ fontSize: '1.75rem', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {t('contact:letsTalk')}
      </p>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Tooltip */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: `translateX(-50%) translateY(${hovered ? '0' : '4px'})`,
            background: copied ? 'var(--color-green)' : 'var(--color-neutral-900)',
            border: copied ? 'none' : 'var(--border)',
            color: copied ? 'var(--color-background)' : 'var(--color-neutral-300)',
            padding: '0.25rem 0.625rem',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            opacity: hovered ? 1 : 0,
            transition: 'opacity var(--transition-hover), transform var(--transition-hover), background var(--transition-hover), color var(--transition-hover)',
            pointerEvents: 'none',
          }}
        >
          {tooltipLabel}
        </div>

        <button
          onClick={handleCopy}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); }}
          className="text-xl"
          style={{
            display: 'inline-block',
            fontSize: '1.6875rem',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: hovered ? 'var(--color-accent)' : 'var(--color-neutral-100)',
            transition: 'color var(--transition-hover)',
            wordBreak: 'break-all',
            fontFamily: 'inherit',
          }}
        >
          {contact.email}
        </button>
      </div>
    </div>
  );
}

export default function Contact({ onBusinessClick, onFreelancerClick }: ContactProps) {
  const { t } = useTranslation('contact');

  return (
    <section id="contact">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <SectionLabel>{t('contact:sectionLabel')}</SectionLabel>

        <EmailHero />

        <div className="contact-grid">
          {contact.options.map((option) => (
            <ContactCard
              key={option.id}
              title={t(`contact:options.${option.id}.title`)}
              description={t(`contact:options.${option.id}.description`)}
              cta={t(`contact:options.${option.id}.cta`)}
              onClick={option.id === 'business' ? onBusinessClick : onFreelancerClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
