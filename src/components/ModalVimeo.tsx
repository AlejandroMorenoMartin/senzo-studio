import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BtnIcon from './BtnIcon';

interface ModalVimeoProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalVimeo({ url, isOpen, onClose }: ModalVimeoProps) {
  const vimeoId = url.split('/').pop();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!vimeoId) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          {/* Close */}
          <div style={{ position: 'absolute', top: 'var(--space-6)', right: 'var(--space-6)' }} onClick={(e) => e.stopPropagation()}>
            <BtnIcon as="button" label="Cerrar" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </BtnIcon>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 'var(--max-width-modal)', aspectRatio: '16/9', padding: '0 var(--space-6)' }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ display: 'block', borderRadius: 'var(--radius)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
