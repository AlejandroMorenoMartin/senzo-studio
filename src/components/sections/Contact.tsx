import { useState } from 'react';
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
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-7) 0' }}>
      <p className="text-s" style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Fastest way to reach us
      </p>
      <a
        href={`mailto:${contact.email}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.25rem, 5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: hovered ? 'var(--color-accent)' : 'var(--color-neutral-100)',
          transition: 'color var(--transition-hover)',
          wordBreak: 'break-all',
        }}
      >
        {contact.email}
      </a>
    </div>
  );
}

export default function Contact({ onBusinessClick, onFreelancerClick }: ContactProps) {
  return (
    <section id="contact" style={{ background: 'var(--color-background)', borderTop: 'var(--border)', borderBottom: 'var(--border)', borderRadius: 0 }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-9) 1.5rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <SectionLabel>Contact</SectionLabel>

        <EmailHero />

        <div className="contact-grid">
          {contact.options.map((option) => (
            <ContactCard
              key={option.id}
              title={option.title}
              description={option.description}
              cta={option.cta}
              onClick={option.id === 'business' ? onBusinessClick : onFreelancerClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
