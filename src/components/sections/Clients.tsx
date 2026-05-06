import { useState } from 'react';
import SectionLabel from '../SectionLabel';

import Logo20 from '../../assets/clients/20.svg?react';
import LogoDC from '../../assets/clients/dc.svg?react';
import LogoDisney from '../../assets/clients/disney.svg?react';
import LogoFolks from '../../assets/clients/folks.svg?react';
import LogoHBO from '../../assets/clients/hbo.svg?react';
import LogoMPC from '../../assets/clients/mpc.svg?react';
import LogoNetflix from '../../assets/clients/netflix.svg?react';
import LogoPrime from '../../assets/clients/prime.svg?react';
import LogoUniversal from '../../assets/clients/universal.svg?react';
import LogoWarner from '../../assets/clients/warner.svg?react';

const CLIENTS = [
  { id: '20',        name: '20th Century Studios', href: 'https://www.20thcenturystudios.com/', Logo: Logo20 },
  { id: 'dc',        name: 'DC',                   href: 'https://www.dc.com/',                 Logo: LogoDC },
  { id: 'disney',    name: 'Disney',                href: 'https://www.disney.com/',             Logo: LogoDisney },
  { id: 'folks',     name: 'Folks VFX',             href: 'https://folksvfx.com/',               Logo: LogoFolks },
  { id: 'hbo',       name: 'HBO Max',               href: 'https://www.hbomax.com/',             Logo: LogoHBO },
  { id: 'mpc',       name: 'MPC',                   href: 'https://www.mpcvfx.com/',             Logo: LogoMPC },
  { id: 'netflix',   name: 'Netflix',                href: 'https://www.netflix.com/',            Logo: LogoNetflix },
  { id: 'prime',     name: 'Amazon Prime',           href: 'https://www.primevideo.com/',         Logo: LogoPrime },
  { id: 'universal', name: 'Universal Pictures',     href: 'https://www.universalpictures.com/',  Logo: LogoUniversal },
  { id: 'warner',    name: 'Warner Bros',            href: 'https://www.warnerbros.com/',         Logo: LogoWarner },
];

function ClientLogo({ name, href, Logo }: { name: string; href: string; Logo: React.FC<React.SVGProps<SVGSVGElement>> }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '240px',
        height: '96px',
        color: hovered ? 'var(--color-accent)' : 'var(--color-neutral-400)',
        transition: 'color var(--transition-hover)',
        textDecoration: 'none',
      }}
    >
      <Logo width="100%" height="100%" style={{ objectFit: 'contain', transition: 'fill var(--transition-hover)' }} />
    </a>
  );
}

export default function Clients() {
  const [paused, setPaused] = useState(false);
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clients">
      <div style={{ marginBottom: 'var(--space-7)' }}>
        <SectionLabel>Clients</SectionLabel>
      </div>

      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-5)',
            width: 'max-content',
            animation: 'scroll-infinite 48s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {doubled.map((client, i) => (
            <ClientLogo key={`${client.id}-${i}`} name={client.name} href={client.href} Logo={client.Logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
