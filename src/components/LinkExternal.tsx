interface LinkExternalProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function LinkExternal({ href, children, className, style }: LinkExternalProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-external${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
        style={{ display: 'inline-block', flexShrink: 0, marginLeft: 1 }}
      >
        <path
          d="M2 2h6v6M8 2L2 8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
    </a>
  );
}
