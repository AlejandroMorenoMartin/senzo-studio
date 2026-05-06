import { useState } from 'react';

type BtnIconProps =
  | { as?: 'a'; href: string; label: string; variant?: 'default' | 'outline'; style?: React.CSSProperties; children: React.ReactNode; onClick?: never }
  | { as: 'button'; href?: never; label: string; variant?: 'default' | 'outline'; style?: React.CSSProperties; children: React.ReactNode; onClick?: () => void };

export default function BtnIcon({ as = 'a', href, label, variant = 'default', style: styleProp, onClick, children }: BtnIconProps) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    padding: '6px',
    boxSizing: 'border-box',
    background: 'transparent',
    border: variant === 'outline'
      ? `0.25px solid ${hovered ? 'var(--color-neutral-400)' : 'var(--color-neutral-50)'}`
      : 'none',
    borderRadius: 'var(--radius)',
    color: hovered ? 'var(--color-red-500)' : 'var(--color-neutral-50)',
    transition: 'background var(--transition-hover), color var(--transition-hover), border-color var(--transition-hover)',
    textDecoration: 'none',
    flexShrink: 0,
    cursor: 'pointer',
    ...styleProp,
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (as === 'button') {
    return (
      <button type="button" aria-label={label} onClick={onClick} style={style} {...handlers}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={style} {...handlers}>
      {children}
    </a>
  );
}
