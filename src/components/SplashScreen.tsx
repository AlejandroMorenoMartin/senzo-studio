import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KITT_DUR = 1.6;

export default function SplashScreen() {
  const [visible,   setVisible]   = useState(true);
  const [showText,  setShowText]  = useState(false);
  const [showKitt,  setShowKitt]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true),  800);
    const t2 = setTimeout(() => setShowKitt(true), 1600);
    const t3 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--color-background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 'fit-content' }}>

            {/* Text */}
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.125rem, 3vw, 1.875rem)',
                  letterSpacing: 'var(--letter-spacing-brand)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-50)',
                  margin: 0,
                }}
              >
                Senzo Studio
              </motion.p>
            </div>

            {/* Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--color-border)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {showKitt && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '-200px',
                    transform: 'translateY(-50%)',
                    width: '120px',
                    height: 'clamp(2px, 0.5vw, 3.5px)',
                    background: 'linear-gradient(to right, transparent, var(--color-red-500), transparent)',
                    filter: 'blur(1px)',
                    animation: `kitt-scan ${KITT_DUR}s linear 0s 1 forwards`,
                  }}
                />
              )}
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
