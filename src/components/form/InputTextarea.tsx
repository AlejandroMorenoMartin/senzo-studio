import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextareaProps {
  id?: string;
  placeholder?: string;
  maxLength?: number;
  error?: boolean;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  watchValue?: string;
  rows?: number;
}

export default function InputTextarea({
  id,
  placeholder,
  maxLength,
  error,
  disabled,
  registration,
  watchValue = '',
  rows = 6,
}: InputTextareaProps) {
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
      <textarea
        {...registration}
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); registration.onBlur(e); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          resize: 'none',
          background: 'var(--color-input-bg)',
          border: `0.5px solid ${borderColor}`,
          borderRadius: 'var(--radius)',
          padding: 'var(--space-4) var(--space-5)',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-neutral-300)',
          outline: 'none',
          transition: 'border-color var(--transition-hover)',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          lineHeight: 1.6,
        }}
      />
      {maxLength && (
        <span className="text-xs" style={{
          position: 'absolute',
          bottom: 'var(--space-3)',
          right: 'var(--space-5)',
          color: watchValue.length >= maxLength ? 'var(--color-input-error)' : 'var(--color-neutral-700)',
          pointerEvents: 'none',
        }}>
          {watchValue.length} / {maxLength}
        </span>
      )}
    </div>
  );
}
