import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import { highlightFX } from '../../utils/highlightFX';

const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    style={{
      flexShrink: 0,
      transition: 'transform var(--transition-hover)',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      color: 'var(--color-neutral-600)',
    }}
  >
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered ? 'rgba(255,255,255,0.015)' : 'transparent',
        borderBottom: 'var(--border)',
        transition: 'background var(--transition-hover)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--space-5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-5)',
          textAlign: 'left',
        }}
      >
        <p className="text-l" style={{ color: 'var(--color-neutral-200)', fontWeight: 400 }}>
          {highlightFX(q)}
        </p>
        <IconChevron open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="text-base"
              style={{
                padding: '0 var(--space-5) var(--space-5)',
                color: 'var(--color-neutral-400)',
                lineHeight: 1.6,
              }}
            >
              {highlightFX(a)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const { t } = useTranslation('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = t('faq:items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <section id="faq">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <SectionLabel>{t('faq:sectionLabel')}</SectionLabel>
        </SectionReveal>

        <div style={{ border: 'var(--border)', borderBottom: 'none' }}>
          {items.map((item, i) => (
            <SectionReveal key={i}>
              <FaqItem
                q={item.question}
                a={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
