import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import { servicesSection } from '../../data/content';

export default function Services() {
  return (
    <section style={{ background: 'var(--color-background)', borderTop: 'var(--border)', borderBottom: 'var(--border)', borderRadius: 0 }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-9) 1.5rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <SectionLabel>Services</SectionLabel>
        </SectionReveal>

        <SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <p className="text-l" style={{ color: 'var(--color-neutral-500)' }}>
              {servicesSection.description}
            </p>
            <div className="chips">
              {servicesSection.chips.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
