import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  placeholder?: string;
  options: Option[];
  error?: boolean;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ pointerEvents: 'none' }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function InputSelect({ placeholder, options, error, disabled, registration, autoComplete }: InputSelectProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = error
    ? 'var(--color-input-error)'
    : focused
    ? 'var(--color-input-focus)'
    : hovered
    ? 'var(--color-input-hover)'
    : 'var(--color-input-border)';

  return (
    <div style={{ position: 'relative' }}>
      <select
        {...registration}
        disabled={disabled}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); registration.onBlur(e); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          appearance: 'none',
          background: 'var(--color-input-bg)',
          border: `0.5px solid ${borderColor}`,
          borderRadius: 'var(--radius)',
          padding: 'var(--space-4) var(--space-5)',
          paddingRight: 'var(--space-8)',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-neutral-300)',
          outline: 'none',
          transition: 'border-color var(--transition-hover)',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {placeholder && (
          <option value="" disabled hidden style={{ color: 'var(--color-placeholder)' }}>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: 'var(--color-surface)', color: 'var(--color-neutral-200)' }}>
            {opt.label}
          </option>
        ))}
      </select>
      <span style={{
        position: 'absolute',
        right: 'var(--space-5)',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-neutral-600)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <ChevronDown />
      </span>
    </div>
  );
}
