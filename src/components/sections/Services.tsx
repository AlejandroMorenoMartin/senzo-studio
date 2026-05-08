import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import KittLine from '../KittLine';
import { servicesSection } from '../../data/content';

export default function Services() {
  return (
    <section style={{ background: 'var(--color-background)' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

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
