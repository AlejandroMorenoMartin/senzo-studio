import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LangSelectorProps {
  borderless?: boolean;
  inline?: boolean;
}

interface LangOption {
  code: string;
  label: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'Русский' },
];

export default function LangSelector({ borderless = false, inline = false }: LangSelectorProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language.split('-')[0].toLowerCase();
  const activeCode = LANGUAGES.some((l) => l.code === currentLang) ? currentLang : 'en';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(code: string) {
    void i18n.changeLanguage(code);
    localStorage.setItem('i18n_lang', code);
    document.documentElement.lang = code;
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDownButton(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    }
  }

  function handleKeyDownOption(e: React.KeyboardEvent<HTMLDivElement>, code: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(code);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    outline: 'none',
    outlineOffset: '0px',
    padding: 'var(--space-2) var(--space-3)',
    borderRadius: 'var(--radius)',
    border: borderless
      ? '0.5px solid transparent'
      : `0.5px solid ${hovered ? 'var(--color-neutral-50)' : 'var(--color-neutral-900)'}`,
    background: 'transparent',
    color: hovered ? 'var(--color-neutral-50)' : undefined,
    fontWeight: 400,
    textShadow: hovered ? '0 0 0.5px currentColor' : 'none',
    transition: 'background var(--transition-hover), color var(--transition-hover), border-color var(--transition-hover)',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '150%',
    right: 0,
    marginTop: 'var(--space-1)',
    background: 'rgba(6,0,0,0.96)',
    backdropFilter: 'blur(8px)',
    border: 'var(--border)',
    borderRadius: 'var(--radius)',
    minWidth: '120px',
    zIndex: 100,
    overflow: 'hidden',
  };

  if (inline) {
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {LANGUAGES.map(({ code, label }) => {
          const isActive = code === activeCode;
          return (
            <button
              key={code}
              type="button"
              onClick={() => handleSelect(code)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'var(--space-2) var(--space-3)',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-accent)' : 'var(--color-neutral-500)',
                transition: 'color var(--transition-hover)',
                outline: 'none',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        ref={buttonRef}
        type="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="lang-listbox"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={handleKeyDownButton}
        style={triggerStyle}
      >
        {activeCode.toUpperCase()}
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={listboxRef}
            id="lang-listbox"
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={dropdownStyle}
          >
            {LANGUAGES.map(({ code, label }) => {
              const isActive = code === activeCode;
              const isHovered = hoveredCode === code;

              return (
                <div
                  key={code}
                  role="option"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => handleSelect(code)}
                  onMouseEnter={() => setHoveredCode(code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  onKeyDown={(e) => handleKeyDownOption(e, code)}
                  style={{
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    letterSpacing: 'normal',
                    textTransform: 'none',
                    color: isActive
                      ? 'var(--color-accent)'
                      : isHovered
                        ? 'var(--color-neutral-50)'
                        : undefined,
                    background: isHovered && !isActive ? 'var(--color-neutral-950)' : 'transparent',
                    transition: 'background var(--transition-hover), color var(--transition-hover)',
                  }}
                >
                  {label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
