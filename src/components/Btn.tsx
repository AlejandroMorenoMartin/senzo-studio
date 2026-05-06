import { useState } from 'react';

type BtnProps =
  | {
      variant: 'primary' | 'secondary' | 'filter' | 'accept';
      as?: 'button';
      href?: never;
      active?: boolean;
      borderless?: boolean;
      uppercase?: boolean;
      size?: 'md';
      disabled?: boolean;
      onClick?: () => void;
      children: React.ReactNode;
      type?: 'button' | 'submit';
    }
  | {
      variant: 'primary' | 'secondary' | 'filter' | 'accept';
      as: 'a';
      href: string;
      active?: boolean;
      borderless?: boolean;
      uppercase?: boolean;
      size?: 'md';
      disabled?: never;
      onClick?: never;
      children: React.ReactNode;
      type?: never;
    };

export default function Btn({ variant, as = 'button', href, active, borderless, uppercase = true, size, disabled, onClick, children, type = 'button' }: BtnProps) {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    letterSpacing: uppercase ? '0.08em' : undefined,
    textTransform: uppercase ? 'uppercase' : 'none',
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    transition: 'background var(--transition-hover), color var(--transition-hover), border-color var(--transition-hover)',
    outline: 'none',
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (variant === 'primary') {
    const style: React.CSSProperties = {
      ...base,
      padding: 'var(--space-3) var(--space-6)',
      borderRadius: 'var(--radius)',
      background: hovered ? 'var(--color-red-400)' : 'var(--color-red-500)',
      color: 'var(--color-red-950)',
    };

    if (as === 'a') {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
          {children}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} style={style} {...handlers}>
        {children}
      </button>
    );
  }

  if (variant === 'accept') {
    const style: React.CSSProperties = {
      ...base,
      padding: 'var(--space-3) var(--space-6)',
      borderRadius: 'var(--radius)',
      border: '0.5px solid transparent',
      background: hovered ? 'var(--color-green)' : 'var(--color-green)',
      color: 'var(--color-background)',
      opacity: disabled ? 0.4 : hovered ? 0.85 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    return (
      <button type={type} onClick={onClick} disabled={disabled} style={style} {...handlers}>
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    const style: React.CSSProperties = {
      ...base,
      padding: size === 'md' ? 'var(--space-3) var(--space-6)' : 'var(--space-2) var(--space-3)',
      borderRadius: 'var(--radius)',
      border: borderless ? '0.5px solid transparent' : `0.5px solid ${disabled ? 'var(--color-neutral-900)' : hovered ? 'var(--color-neutral-50)' : 'var(--color-neutral-900)'}`,
      background: active ? 'var(--color-red-900)' : 'transparent',
      color: disabled ? 'var(--color-neutral-700)' : hovered ? 'var(--color-neutral-50)' : undefined,
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    if (as === 'a') {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
          {children}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} disabled={disabled} style={style} {...handlers}>
        {children}
      </button>
    );
  }

  // filter
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...base,
        padding: 'var(--space-2) var(--space-4)',
        borderRadius: 'var(--radius)',
        border: `0.5px solid ${active ? 'var(--color-neutral-500)' : hovered ? 'var(--color-neutral-700)' : 'var(--color-neutral-900)'}`,
        background: active ? 'var(--color-neutral-950)' : 'transparent',
        color: active ? 'var(--color-neutral-100)' : hovered ? 'var(--color-neutral-400)' : 'var(--color-neutral-600)',
        fontSize: 'var(--font-size-filter)',
      }}
      {...handlers}
    >
      {children}
    </button>
  );
}
