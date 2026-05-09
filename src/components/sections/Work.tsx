import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import SectionReveal from '../SectionReveal';
import Btn from '../Btn';
import BtnIcon from '../BtnIcon';
import SectionLabel from '../SectionLabel';
import { useHover } from '../../hooks/useHover';
import { work, WORK_TAGS } from '../../data/content';
import type { WorkTag } from '../../data/content';

type Filter = 'All' | WorkTag;

interface WorkCardProps {
  src: string;
  title: string;
  onClick: () => void;
}

function WorkCard({ src, title, onClick }: WorkCardProps) {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={title}
      style={{
        cursor: 'pointer',
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        borderRadius: 'var(--radius)',
        background: 'var(--color-surface)',
        border: 'none',
        padding: 0,
        width: '100%',
        display: 'block',
      }}
    >
      {/* Image */}
      <img
        src={src}
        alt={title}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: hovered ? 1 : 0.25,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Default text overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 'var(--space-2)',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <p className="text-l">{title}</p>
      </div>
    </button>
  );
}

export default function Work() {
  const { t } = useTranslation('work');
  const FILTERS: Filter[] = ['All', ...WORK_TAGS];
  const filterLabels: Record<Filter, string> = {
    All: t('work:filters.all'),
    Film: t('work:filters.film'),
    Advertising: t('work:filters.advertising'),
    'TV Series': t('work:filters.tvSeries'),
  };

  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'All' ? work : work.filter((p) => p.tag === activeFilter);

  const closeModal = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + work.length) % work.length : null));
  }, []);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % work.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, closeModal, prev, next]);

  return (
    <section id="work">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

        <SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <SectionLabel>{t('work:sectionLabel')}</SectionLabel>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <Btn
                  key={f}
                  variant="secondary"
                  uppercase={false}
                  active={f === activeFilter}
                  onClick={() => setActiveFilter(f)}
                >
                  {filterLabels[f]}
                </Btn>
              ))}
            </div>
          </div>
        </SectionReveal>

        <div className="work-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <WorkCard
                  src={project.src}
                  title={project.title}
                  onClick={() => setLightboxIndex(work.findIndex((p) => p.id === project.id))}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'color-mix(in srgb, var(--color-background) 92%, transparent)',
              backdropFilter: 'blur(12px)',
              display: 'grid',
              placeItems: 'center',
              overflowY: 'auto',
            }}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 'var(--max-width)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
              }}
            >
              {/* Top bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <BtnIcon as="button" variant="outline" label="Anterior" onClick={prev}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </BtnIcon>
                  <BtnIcon as="button" variant="outline" label="Siguiente" onClick={next}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </BtnIcon>
                  <span className="text-s" style={{ color: 'var(--color-neutral-700)', fontVariantNumeric: 'tabular-nums', marginLeft: 'var(--space-2)' }}>
                    {String(lightboxIndex + 1).padStart(2, '0')} / {String(work.length).padStart(2, '0')}
                  </span>
                </div>
                <BtnIcon as="button" variant="outline" label="Cerrar" onClick={closeModal}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </BtnIcon>
              </div>

              {/* Imagen */}
              <img
                src={work[lightboxIndex].src}
                alt={work[lightboxIndex].title}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '16/9',
                  maxHeight: 'calc(100vh - 280px)',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius)',
                }}
              />

              {/* Texto */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <p className="text-l">{work[lightboxIndex].subtitle ? `${work[lightboxIndex].title} – ${work[lightboxIndex].subtitle}` : work[lightboxIndex].title}</p>
                <p className="text-base" style={{ lineHeight: 1.6 }}>
                  <Trans
                    i18nKey={`work:projects.${work[lightboxIndex].id}.description`}
                    components={{ bold: <strong /> }}
                  />
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
