import SectionLabel from '../SectionLabel';
import Btn from '../Btn';
import LinkExternal from '../LinkExternal';
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
        <p className="text-base" style={{ color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>{description}</p>
      </div>

      <div style={{ alignSelf: 'flex-start' }}>
        <Btn variant="primary" onClick={onClick}>{cta}</Btn>
      </div>
    </div>
  );
}

export default function Contact({ onBusinessClick, onFreelancerClick }: ContactProps) {
  return (
    <section id="contact">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <SectionLabel>Contact</SectionLabel>

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

        <p className="text-base" style={{ color: 'var(--color-neutral-500)' }}>
          Direct contact:{' '}
          <LinkExternal href={`mailto:${contact.email}`}>
            {contact.email}
          </LinkExternal>
        </p>
      </div>
    </section>
  );
}
