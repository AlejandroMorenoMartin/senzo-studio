interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div>
      <p className="title-l" style={{ textTransform: 'uppercase' }}>{children}</p>
      <div style={{ marginTop: 'var(--space-3)', borderBottom: 'var(--border)', borderRadius: 0 }} />
    </div>
  );
}
