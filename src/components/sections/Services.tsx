import { useTranslation } from 'react-i18next';
import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import KittLine from '../KittLine';

export default function Services() {
  const { t } = useTranslation('services');
  const chips = t('services:chips', { returnObjects: true }) as string[];

  return (
    <section style={{ background: 'var(--color-background)' }}>
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
