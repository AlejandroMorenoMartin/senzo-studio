import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '../SectionReveal';
import SectionLabel from '../SectionLabel';
import { faq } from '../../data/content';

function FaqItem({ q, a }: { q: string; a: string; index?: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: open
          ? 'var(--color-red-950)'
          : hovered
          ? 'rgba(255,255,255,0.015)'
          : 'transparent',
        borderBottom: 'var(--border)',
        transition: 'background var(--transition-hover)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => setOpen(!open)}
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
          {q}
        </p>
        <span
          style={{
            color: open ? 'var(--color-accent)' : 'var(--color-neutral-600)',
            flexShrink: 0,
            transition: `color var(--transition-hover), transform var(--transition-hover)`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'var(--space-6)',
            height: 'var(--space-6)',
            fontSize: 'var(--space-6)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
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
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" style={{ background: 'var(--color-background)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <SectionLabel>FAQ'S</SectionLabel>
        </SectionReveal>

        <div style={{ border: 'var(--border)', borderBottom: 'none' }}>
          {faq.map((item, i) => (
            <SectionReveal key={i}>
              <FaqItem q={item.q} a={item.a} index={i} />
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
