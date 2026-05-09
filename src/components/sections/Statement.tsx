import SectionReveal from '../SectionReveal';
import { statement, markets } from '../../data/content';

export default function Statement() {
  const { slateData, mantra, body, accentPhrase } = statement;

  const bodyWithAccent = body.replace(
    accentPhrase,
    `<span class="accent-underline" style="color: var(--color-neutral-100)">${accentPhrase}</span>`
  );

  return (
    <section>
      <div>

        {/* Slate header */}
        <SectionReveal>
          <div
            className="text-xs"
            style={{
              display: 'flex',
              gap: 'var(--space-7)',
              marginBottom: 'var(--space-8)',
              paddingBottom: 'var(--space-5)',
              borderBottom: 'var(--border)',
              flexWrap: 'wrap',
              color: 'var(--color-neutral-600)',
              letterSpacing: 'var(--letter-spacing-wider)',
              textTransform: 'uppercase',
            }}
          >
            <span>{slateData.studio}</span>
            <span>{slateData.speciality}</span>
            <span>{slateData.year}</span>
            <span>{slateData.directors}</span>
          </div>
        </SectionReveal>

        {/* Mantra */}
        <SectionReveal>
          <p className="title-xl" style={{ marginBottom: 'var(--space-7)' }}>
            {mantra}
          </p>
        </SectionReveal>

        {/* Body */}
        <SectionReveal>
          <p
            className="text-base"
            style={{ lineHeight: 1.7, color: 'var(--color-neutral-400)' }}
            dangerouslySetInnerHTML={{ __html: bodyWithAccent }}
          />
        </SectionReveal>

        {/* Markets */}
        <SectionReveal>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              marginTop: 'var(--space-7)',
              paddingTop: 'var(--space-6)',
              borderTop: 'var(--border)',
            }}
          >
            {markets.map((m) => (
              <div
                key={m.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-2) var(--space-4)',
                  border: 'var(--border)',
                }}
              >
                <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                  {m.code}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
