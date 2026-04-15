type PistonSVGProps = {
  size?: number | string;
  className?: string;
};

export function PistonSVG({ size = 120, className = "" }: PistonSVGProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <span className="animate-piston-bob inline-flex h-full w-full text-gold">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_12px_24px_rgba(45,45,45,0.12)]"
        >
          <rect x="52" y="8" width="16" height="28" rx="6" className="fill-silver-light" />
          <rect x="56" y="24" width="8" height="44" rx="4" className="fill-charcoal" opacity="0.75" />
          <path d="M33 56c0-3.3 2.7-6 6-6h42c3.3 0 6 2.7 6 6v14c0 3.3-2.7 6-6 6H39c-3.3 0-6-2.7-6-6V56Z" className="fill-charcoal" />
          <path d="M29 60c0-5.5 4.5-10 10-10h42c5.5 0 10 4.5 10 10v18c0 5.5-4.5 10-10 10H39c-5.5 0-10-4.5-10-10V60Z" className="fill-gold" opacity="0.2" />
          <rect x="40" y="58" width="40" height="6" rx="3" className="fill-warm-white" opacity="0.85" />
          <rect x="37" y="82" width="46" height="9" rx="4.5" className="fill-silver" />
          <path d="M48 91h24l8 18H40l8-18Z" className="fill-charcoal" />
          <path d="M43 110h34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <circle cx="45" cy="67" r="3" className="fill-warm-white" />
          <circle cx="75" cy="67" r="3" className="fill-warm-white" />
        </svg>
      </span>
    </span>
  );
}

export default PistonSVG;
