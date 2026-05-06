export default function CropMarks() {
  const size = 20;
  const gap = 24;
  const color = 'var(--color-zinc-700)';
  const thickness = '0.5px';

  const cornerStyle = (top: boolean, left: boolean): React.CSSProperties => ({
    position: 'fixed',
    top: top ? gap : 'auto',
    bottom: !top ? gap : 'auto',
    left: left ? gap : 'auto',
    right: !left ? gap : 'auto',
    width: size,
    height: size,
    borderTop: top ? `${thickness} solid ${color}` : 'none',
    borderBottom: !top ? `${thickness} solid ${color}` : 'none',
    borderLeft: left ? `${thickness} solid ${color}` : 'none',
    borderRight: !left ? `${thickness} solid ${color}` : 'none',
    pointerEvents: 'none',
    zIndex: 50,
  });

  return (
    <>
      <div className="crop-marks" style={cornerStyle(true, true)} />
      <div className="crop-marks" style={cornerStyle(true, false)} />
      <div className="crop-marks" style={cornerStyle(false, true)} />
      <div className="crop-marks" style={cornerStyle(false, false)} />
    </>
  );
}
