import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BtnIcon from './BtnIcon';

interface ModalImageProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalImage({ src, alt, isOpen, onClose }: ModalImageProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

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
            flexDirection: 'column',
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
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 'var(--max-width-modal)', margin: '0 auto' }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius)',
                display: 'block',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
