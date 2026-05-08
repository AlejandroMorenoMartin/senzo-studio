interface KittLineProps {
  position: 'top' | 'bottom';
  delay?: number;
}

export default function KittLine({ position, delay = 0 }: KittLineProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        [position]: 0,
        width: '100%',
        height: '0.5px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '200px',
          height: '100%',
          background: 'linear-gradient(to right, transparent, var(--color-red-500), transparent)',
          filter: 'blur(1px)',
          animation: `kitt-scan 3s linear ${delay}s infinite`,
        }}
      />
    </div>
  );
}
