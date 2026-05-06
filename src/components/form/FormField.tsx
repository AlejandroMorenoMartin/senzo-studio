interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <label className="text-s" style={{ color: 'var(--color-neutral-400)' }}>
        {label}{required && <span style={{ color: 'var(--color-input-error)', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: 'var(--color-input-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
