import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BtnIcon from './BtnIcon';
import Btn from './Btn';

interface ModalPrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPrivacy({ isOpen, onClose }: ModalPrivacyProps) {
  const { t } = useTranslation(['contact', 'common']);
  const sectionsRaw = t('contact:modalPrivacy.sections', { returnObjects: true });
  const sections = (sectionsRaw && typeof sectionsRaw === 'object' && !Array.isArray(sectionsRaw)
    ? sectionsRaw
    : {}) as Record<string, { title: string; body?: string; items?: string[] }>;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-background)',
            overflowY: 'auto',
            zIndex: 200,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
            style={{
              maxWidth: 'var(--max-width)',
              margin: '0 auto',
            }}
          >
            {/* Top bar — title + close */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
              <h2 className="title-l">{t('contact:modalPrivacy.title')}</h2>
              <BtnIcon as="button" variant="outline" label={t('common:buttons.close')} onClick={onClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>{sections.dataController?.title}</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  {sections.dataController?.body}
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>{sections.purposeOfProcessing?.title}</p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingLeft: 'var(--space-5)' }}>
                  {(sections.purposeOfProcessing?.items ?? []).map((item, i) => (
                    <li key={i} className="text-base" style={{ lineHeight: 1.7, listStyleType: 'disc' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>{sections.privacyAndStorage?.title}</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  {sections.privacyAndStorage?.body}
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>{sections.yourRights?.title}</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  {sections.yourRights?.body}{' '}
                  <a href="mailto:info@senzostudio.com" className="link">
                    info@senzostudio.com
                  </a>
                </p>
              </section>

              {/* Accept */}
              <div>
                <Btn variant="accept" as="button" onClick={onClose}>
                  {t('common:buttons.accept')}
                </Btn>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
