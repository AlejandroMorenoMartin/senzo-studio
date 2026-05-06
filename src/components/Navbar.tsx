import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Btn from './Btn';

const NAV_LINKS = [
  { label: 'Work',     href: 'work' },
  { label: 'Services', href: 'services' },
  { label: 'About',    href: 'about' },
  { label: "FAQ's",    href: 'faq' },
  { label: 'Clients',  href: 'clients' },
  { label: 'Contact',  href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const TRACKED = ['hero', 'work', 'services', 'about', 'faq', 'clients', 'footer'];

    function updateActive() {
      const middle = window.innerHeight * 0.4;
      let current = 'hero';
      for (const id of TRACKED) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= middle) current = id;
      }
      setActive(current === 'hero' ? '' : current === 'footer' ? 'contact' : current);
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  function scrollTo(id: string) {
    const target = id === 'contact' ? 'footer' : id;
    const el = document.getElementById(target);
    if (!el) return;
    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--space-8')) * 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setMenuOpen(false);
  }

  const navBg = scrolled || menuOpen ? 'rgba(6,0,0,0.96)' : 'transparent';
  const navBorder = scrolled || menuOpen ? 'var(--border)' : '0.5px solid transparent';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-6)',
          height: 'var(--height-nav)',
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: scrolled || menuOpen ? 'blur(8px)' : 'none',
          transition: 'background var(--transition-hover), border-color var(--transition-hover)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActive(''); setMenuOpen(false); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-base-size, 1rem)',
            letterSpacing: 'var(--letter-spacing-brand)',
            color: 'var(--color-neutral-50)',
            textTransform: 'uppercase',
            transition: 'color var(--transition-hover)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-neutral-50)'; }}
        >
          Senzo Studio
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            {NAV_LINKS.map((link) => (
              <Btn
                key={link.href}
                variant="secondary"
                active={active === link.href}
                borderless={!scrolled}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}
              </Btn>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-3)',
              color: 'var(--color-neutral-50)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              gap: '5px', width: '36px', height: '36px',
            }}
          >
            <span style={{
              display: 'block', width: '100%', height: '0.5px',
              background: 'currentColor',
              transform: menuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none',
              transition: 'transform var(--transition-hover)',
            }} />
            <span style={{
              display: 'block', width: '100%', height: '0.5px',
              background: 'currentColor',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity var(--transition-hover)',
            }} />
            <span style={{
              display: 'block', width: '100%', height: '0.5px',
              background: 'currentColor',
              transform: menuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
              transition: 'transform var(--transition-hover)',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--height-nav)',
              left: 0, right: 0, bottom: 0,
              zIndex: 49,
              background: 'rgba(6,0,0,0.96)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-7) var(--space-6)',
              gap: 'var(--space-2)',
              borderTop: 'var(--border)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                  padding: 'var(--space-4) 0',
                  borderBottom: 'var(--border)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  letterSpacing: 'var(--letter-spacing-brand)',
                  textTransform: 'uppercase',
                  color: active === link.href ? 'var(--color-accent)' : 'var(--color-neutral-50)',
                  transition: 'color var(--transition-hover)',
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
