import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputCheckboxProps {
  label: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  checked: boolean;
  value?: string;
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#060000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function InputCheckbox({ label, error, disabled, registration, checked, value }: InputCheckboxProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 'var(--space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        {...registration}
        type={value !== undefined ? 'radio' : 'checkbox'}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={(e) => {
          registration.onChange(e);
        }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        flexShrink: 0,
        width: '16px',
        height: '16px',
        marginTop: '2px',
        border: `0.5px solid ${error ? 'var(--color-input-error)' : hovered ? 'var(--color-input-focus)' : 'var(--color-input-border)'}`,
        borderRadius: 'var(--radius)',
        background: checked ? 'var(--color-green)' : 'var(--color-input-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background var(--transition-hover), border-color var(--transition-hover)',
        flexDirection: 'column',
      }}>
        {checked && <CheckIcon />}
      </span>
      <span className="text-base" style={{ color: error ? 'var(--color-input-error)' : 'var(--color-neutral-400)', lineHeight: 1.5 }}>
        {label}
      </span>
    </label>
  );
}
