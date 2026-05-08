import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps {
  placeholder?: string;
  type?: 'text' | 'email' | 'url' | 'number' | 'password' | 'date';
  error?: boolean;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  value?: string;
  autoComplete?: string;
}

export default function InputText({
  placeholder,
  type = 'text',
  error,
  disabled,
  registration,
  value,
  autoComplete,
}: InputTextProps) {
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
    <input
      {...registration}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autoComplete}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { setFocused(false); registration.onBlur(e); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        background: 'var(--color-input-bg)',
        border: `0.5px solid ${borderColor}`,
        borderRadius: 'var(--radius)',
        padding: 'var(--space-4) var(--space-5)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: value ? 'var(--color-input-filled)' : 'var(--color-neutral-300)',
        outline: 'none',
        transition: 'border-color var(--transition-hover)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
      }}
    />
  );
}
