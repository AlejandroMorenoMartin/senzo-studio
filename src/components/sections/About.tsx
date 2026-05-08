import SectionLabel from '../SectionLabel';
import Btn from '../Btn';
import BtnIcon from '../BtnIcon';
import KittLine from '../KittLine';
import { about } from '../../data/content';

const IconLinkedin = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"/>
  </svg>
);

function WaveformSvg() {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    x: i * 12,
    height: Math.abs(Math.sin(i * 0.7) * 30 + Math.sin(i * 1.3) * 15) + 4,
  }));

  return (
    <svg
      width="480"
      height="60"
      viewBox="0 60 480 60"
      style={{ position: 'absolute', bottom: 16, right: 0, opacity: 0.06, pointerEvents: 'none' }}
      aria-hidden
    >
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={90 - bar.height / 2}
          width={4}
          height={bar.height}
          fill="var(--color-neutral-400)"
        />
      ))}
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--color-background)' }}>
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <SectionLabel>About</SectionLabel>

        <p
          className="text-base"
          style={{ color: 'var(--color-neutral-400)', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: about.body }}
        />

        <div className="crew-grid">
          {about.crew.map((member) => (
            <div key={member.id} style={{ position: 'relative', border: 'var(--border)', overflow: 'hidden' }}>
              {/* Photo */}
              <div style={{ overflow: 'hidden', background: '#0D0000', aspectRatio: '4/3' }}>
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'relative' }}>
                <WaveformSvg />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <p className="text-l" style={{ color: 'var(--color-neutral-100)' }}>
                    {member.name}
                  </p>
                  <p className="text-s" style={{ color: 'var(--color-neutral-500)' }}>
                    {member.role.split('FX').map((part, i, arr) =>
                      i < arr.length - 1
                        ? <span key={i}>{part}<span style={{ color: 'var(--color-red-500)' }}>FX</span></span>
                        : <span key={i}>{part}</span>
                    )}
                  </p>
                </div>

                <p className="text-base" style={{ color: 'var(--color-neutral-400)', lineHeight: 1.6 }}>
                  {member.bio}
                </p>

                <div>
                  <Btn variant="primary" as="a" href={member.reel}>Watch Reel</Btn>
                </div>

                <BtnIcon
                  href={member.linkedin}
                  label="LinkedIn"
                  style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                >
                  <IconLinkedin />
                </BtnIcon>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
