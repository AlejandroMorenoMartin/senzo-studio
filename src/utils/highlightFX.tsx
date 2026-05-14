import type { ReactNode } from 'react';

export function highlightFX(text: string): ReactNode {
  const parts = text.split('FX');
  return parts.map((part, i) =>
    i < parts.length - 1
      ? <span key={i}>{part}<span style={{ color: 'var(--color-red-500)' }}>FX</span></span>
      : <span key={i}>{part}</span>
  );
}
