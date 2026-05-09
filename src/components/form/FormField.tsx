import { useId, cloneElement, isValidElement } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, required, error, children }: FormFieldProps) {
  const id = useId();

  const childWithId = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ id?: string }>, { id })
    : children;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <label htmlFor={id} className="text-s" style={{ color: 'var(--color-neutral-400)' }}>
        {label}{required && <span style={{ color: 'var(--color-input-error)', marginLeft: '2px' }}>*</span>}
      </label>
      {childWithId}
      {error && (
        <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
