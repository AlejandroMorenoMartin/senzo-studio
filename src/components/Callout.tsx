export default function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        margin: 0,
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--color-red-950)',
        borderRadius: 0,
        borderLeft: '2px solid var(--color-accent)',
        color: 'var(--color-neutral-400)',
        lineHeight: 1.6,
      }}
    >
      {children}
    </blockquote>
  );
}
