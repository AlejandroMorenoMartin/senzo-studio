import { useTranslation } from 'react-i18next';
import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';

export default function Services() {
  const { t } = useTranslation('services');
  const chipsRaw = t('services:chips', { returnObjects: true });
  const chips: string[] = Array.isArray(chipsRaw) ? chipsRaw : [];

  return (
    <section id="services">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <SectionLabel>{t('services:sectionLabel')}</SectionLabel>
        </SectionReveal>

        <SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <p className="text-l" style={{ color: 'var(--color-neutral-500)' }}>
              {t('services:subtitle')}
            </p>
            <div className="chips">
              {chips.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
