import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import ModalVimeo from '../ModalVimeo';
import Btn from '../Btn';
import { hero } from '../../data/content';

const OVERLAY_INSET = 'var(--space-6)';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const { t } = useTranslation(['hero', 'common']);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: 'var(--hero-height)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Top gradient — ensures navbar legibility over video */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '32rem',
          background: 'linear-gradient(to bottom, rgba(6,0,0,0.6) 0%, transparent 12.5%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Cover while video loads */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-background)',
          zIndex: 1,
          opacity: videoReady ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => setVideoReady(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      >
        <source src={hero.videoSrc} type="video/mp4" />
      </video>



      {/* Localized overlay — bottom-left text area only */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 0% 100%, rgba(6,0,0,0.7) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* CTA — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'absolute',
          bottom: OVERLAY_INSET,
          left: OVERLAY_INSET,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--space-5)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 400,
              letterSpacing: 'var(--letter-spacing-wide)',
              color: 'var(--color-neutral-50)',
              textTransform: 'uppercase',
              lineHeight: 1,
              WebkitTextStroke: '1px var(--color-red-500)',
              margin: 0,
            }}
          >
            Senzo Studio
          </h1>
          <p className="text-xl" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Trans i18nKey="hero:tagline" components={{ red: <span style={{ color: 'var(--color-red-500)' }} /> }} />
          </p>
          <p className="text-base" style={{ maxWidth: '36rem', lineHeight: 1.6 }}>
            {t('hero:description')}
          </p>
        </div>

        <Btn variant="primary" onClick={() => setReelOpen(true)}>
          {t('hero:ctaLabel')}
        </Btn>
      </motion.div>

      <ModalVimeo
        url={hero.reelUrl}
        isOpen={reelOpen}
        onClose={() => setReelOpen(false)}
      />
    </section>
  );
}
