import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LangSelectorProps {
  borderless?: boolean;
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

export default function LangSelector({ borderless = false }: LangSelectorProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setOpen(false);
  }

  const triggerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    outline: 'none',
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
    top: '100%',
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

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={triggerStyle}
      >
        {activeCode.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
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
                <li
                  key={code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(code)}
                  onMouseEnter={() => setHoveredCode(code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
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
                  <span style={{ width: '0.75rem', display: 'inline-block' }}>
                    {isActive ? '✓' : ''}
                  </span>
                  {label}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
