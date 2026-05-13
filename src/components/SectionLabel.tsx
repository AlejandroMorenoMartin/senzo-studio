interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div style={{ position: 'relative' }}>
      <p className="title-l" style={{ textTransform: 'uppercase' }}>{children}</p>
      <div style={{ marginTop: 'var(--space-3)', overflow: 'hidden', padding: '4px 0' }}>
        <div style={{ height: '1px', background: 'var(--color-border)', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-400px',
            transform: 'translateY(-50%)',
            width: '120px',
            height: 'clamp(2px, 0.5vw, 3.5px)',
            background: 'linear-gradient(to right, transparent, var(--color-red-500), transparent)',
            filter: 'blur(1px)',
            animation: 'kitt-scan 5s linear infinite',
          }} />
        </div>
      </div>
    </div>
  );
}
