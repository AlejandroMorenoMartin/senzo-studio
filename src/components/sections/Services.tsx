import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import { servicesSection } from '../../data/content';

export default function Services() {
  return (
    <section style={{ background: 'var(--color-background)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <SectionLabel>Services</SectionLabel>
        </SectionReveal>

        <SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <p className="text-base" style={{ color: 'var(--color-neutral-500)' }}>
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
