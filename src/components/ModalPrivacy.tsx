import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BtnIcon from './BtnIcon';
import Btn from './Btn';

interface ModalPrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPrivacy({ isOpen, onClose }: ModalPrivacyProps) {
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
              <h2 className="title-l">Privacy Policy</h2>
              <BtnIcon as="button" variant="outline" label="Close" onClick={onClose} style={{ flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </BtnIcon>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>Data Controller</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  Senzo Studio is the sole data controller responsible for the processing of personal data collected through this website.
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>Purpose of Processing</p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingLeft: 'var(--space-5)' }}>
                  <li className="text-base" style={{ lineHeight: 1.7, listStyleType: 'disc' }}>
                    Freelancer Application: To evaluate your professional profile, portfolio, and availability to join our talent roster and contact you for future productions.
                  </li>
                  <li className="text-base" style={{ lineHeight: 1.7, listStyleType: 'disc' }}>
                    Business Inquiries: To manage your project request, process Non-Disclosure Agreements (NDAs), and maintain relevant commercial communication.
                  </li>
                </ul>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>Privacy and Storage</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  Your data is strictly for internal use. We do not sell, rent, or share your information with third parties. The data and links provided are stored in our internal management systems under secure protocols.
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <p className="text-l" style={{ textTransform: 'uppercase', marginBottom: 'var(--space-3)', borderBottom: 'var(--border)', paddingBottom: 'var(--space-3)', borderRadius: 0 }}>Your Rights</p>
                </div>
                <p className="text-base" style={{ lineHeight: 1.7 }}>
                  You can request access to, modification, or permanent deletion of your data and materials at any time. To exercise these rights, please contact us at:{' '}
                  <a href="mailto:info@senzostudio.com" className="link">
                    info@senzostudio.com
                  </a>
                </p>
              </section>

              {/* Accept */}
              <div>
                <Btn variant="accept" as="button" onClick={onClose}>
                  Accept
                </Btn>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
