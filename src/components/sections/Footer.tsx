import { useState } from 'react';
import BtnIcon from '../BtnIcon';
import LinkExternal from '../LinkExternal';
import { footer } from '../../data/content';

const IconVimeo = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.9922 7.34178C21.9022 9.29178 20.5422 11.9618 17.9122 15.3618C15.1922 18.9218 12.8922 20.6718 10.9922 20.6718C9.84219 20.6718 8.85219 19.5918 8.04219 17.4218C7.49219 15.4618 6.99219 13.4818 6.43219 11.5018C5.83219 9.34178 5.19219 8.26178 4.49219 8.26178C4.35219 8.26178 3.83219 8.58178 2.93219 9.21178L1.99219 7.99178C2.99219 7.12178 3.95219 6.25178 4.91219 5.38178C6.23219 4.24178 7.22219 3.64178 7.87219 3.58178C9.43219 3.42178 10.3922 4.50178 10.7522 6.78178C11.1422 9.25178 11.4122 10.7818 11.5622 11.3818C11.9922 13.4218 12.4922 14.4218 13.0422 14.4218C13.4622 14.4218 14.0922 13.7818 14.9322 12.4518C15.7722 11.1318 16.2222 10.1218 16.2822 9.42178C16.4022 8.28178 15.9522 7.71178 14.9322 7.71178C14.4522 7.71178 13.9622 7.82178 13.4522 8.04178C14.4322 4.81178 16.3122 3.24178 19.0822 3.33178C21.1422 3.39178 22.1122 4.73178 21.9922 7.34178Z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"/>
  </svg>
);

const IconBehance = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 5C8.81251 4.99995 9.60576 5.24734 10.2742 5.70924C10.9426 6.17114 11.4546 6.82565 11.7419 7.58567C12.0292 8.34569 12.0782 9.17518 11.8824 9.96375C11.6866 10.7523 11.2554 11.4626 10.646 12C11.2554 12.5374 11.6866 13.2477 11.8824 14.0362C12.0782 14.8248 12.0292 15.6543 11.7419 16.4143C11.4546 17.1744 10.9426 17.8289 10.2742 18.2908C9.60576 18.7527 8.81251 19.0001 8 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V7C2 6.46957 2.21071 5.96086 2.58579 5.58579C2.96086 5.21071 3.46957 5 4 5H8ZM17.5 9C20.107 9 22 11.368 22 14C22 14.2449 21.91 14.4813 21.7473 14.6644C21.5845 14.8474 21.3603 14.9643 21.117 14.993L21 15H15.14C15.498 16.224 16.493 17 17.5 17C18.58 17 19.192 16.489 19.74 15.85C19.9124 15.6484 20.1578 15.5236 20.4222 15.503C20.6866 15.4824 20.9484 15.5676 21.15 15.74C21.3516 15.9124 21.4764 16.1578 21.497 16.4222C21.5177 16.6866 21.4324 16.9484 21.26 17.15L21.153 17.272L20.924 17.518C20.202 18.26 19.146 19 17.5 19C14.893 19 13 16.632 13 14C13 11.368 14.893 9 17.5 9ZM8 13H4V17H8C8.51898 17.0023 9.01855 16.8028 9.39315 16.4436C9.76776 16.0844 9.98807 15.5937 10.0075 15.0751C10.027 14.5564 9.84412 14.0506 9.49751 13.6643C9.15089 13.278 8.6677 13.0416 8.15 13.005L8 13ZM17.5 11C16.493 11 15.498 11.776 15.14 13H19.86C19.502 11.776 18.507 11 17.5 11ZM8 7H4V11H8C8.53043 11 9.03914 10.7893 9.41421 10.4142C9.78929 10.0391 10 9.53043 10 9C10 8.46957 9.78929 7.96086 9.41421 7.58579C9.03914 7.21071 8.53043 7 8 7ZM19 6C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H16C15.7348 8 15.4804 7.89464 15.2929 7.70711C15.1054 7.51957 15 7.26522 15 7C15 6.73478 15.1054 6.48043 15.2929 6.29289C15.4804 6.10536 15.7348 6 16 6H19Z" fill="currentColor"/>
  </svg>
);

const IconClutch = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19.9006 5.86965C18.6241 4.2246 16.866 3.01902 14.8715 2.42113C12.8769 1.82324 10.7455 1.86285 8.77462 2.53443C6.8037 3.20602 5.09158 4.47609 3.87712 6.16743C2.66267 7.85878 2.00646 9.88703 2.00005 11.9692C1.99364 14.0514 2.63735 16.0837 3.84137 17.7825C5.04539 19.4812 6.74967 20.7618 8.71642 21.4455C10.6832 22.1292 12.8143 22.182 14.8124 21.5964C16.8106 21.0108 18.5761 19.816 19.8627 18.1789L16.1472 15.259C15.4686 16.1226 14.5373 16.7527 13.4834 17.0616C12.4295 17.3705 11.3054 17.3427 10.2681 16.982C9.23071 16.6214 8.33179 15.946 7.69673 15.05C7.06167 14.1539 6.72215 13.082 6.72553 11.9838C6.72891 10.8855 7.07502 9.81571 7.71559 8.92361C8.35615 8.03151 9.25921 7.36162 10.2988 7.00739C11.3383 6.65316 12.4625 6.63227 13.5145 6.94763C14.5666 7.26298 15.4939 7.89886 16.1671 8.76655L19.9006 5.86965Z" fill="currentColor"/>
    <circle cx="11.9987" cy="11.9997" r="3.7409" fill="currentColor"/>
  </svg>
);

interface FooterProps {
  onPrivacyClick: () => void;
}

export default function Footer({ onPrivacyClick }: FooterProps) {
  const year = new Date().getFullYear();
  const [privacyHovered, setPrivacyHovered] = useState(false);

  const taglineParts = footer.tagline.split(footer.accentWord);

  return (
    <footer id="footer" style={{ background: 'var(--color-background)', borderTop: 'var(--border)' }}>
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: 'var(--space-7) var(--space-6)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-7)',
        }}
      >
        {/* Left — logo + tagline */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              letterSpacing: 'var(--letter-spacing-brand)',
              color: 'var(--color-neutral-50)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
            }}
          >
            Senzo Studio
          </p>
          <p className="text-s" style={{ color: 'var(--color-neutral-400)' }}>
            {taglineParts[0]}
            <span style={{ color: 'var(--color-accent)' }}>{footer.accentWord}</span>
            {taglineParts[1]}
          </p>
        </div>

        {/* Right — social icons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <BtnIcon href={footer.socials.vimeo.href} label="Vimeo">
            <IconVimeo />
          </BtnIcon>
          <BtnIcon href={footer.socials.linkedin.href} label="LinkedIn">
            <IconLinkedin />
          </BtnIcon>
          <BtnIcon href={footer.socials.behance.href} label="Behance">
            <IconBehance />
          </BtnIcon>
          <BtnIcon href={footer.socials.clutch.href} label="Clutch">
            <IconClutch />
          </BtnIcon>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: 'var(--space-5) var(--space-6)',
          borderTop: 'var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}
      >
        <p className="text-xs" style={{ color: 'var(--color-neutral-700)' }}>
          © {year} Senzo Studio · All rights reserved ·{' '}
          <button
            onClick={onPrivacyClick}
            onMouseEnter={() => setPrivacyHovered(true)}
            onMouseLeave={() => setPrivacyHovered(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: privacyHovered ? 'var(--color-neutral-50)' : 'var(--color-neutral-600)',
              padding: 0,
              font: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              transition: 'color var(--transition-hover)',
            }}
          >
            Privacy Policy
          </button>
          {' '}· By{' '}
          <LinkExternal href={footer.creditUrl}>
            {footer.credit}
          </LinkExternal>
        </p>
      </div>
    </footer>
  );
}
