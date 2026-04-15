import type { SVGProps } from "react";

interface GearSVGProps {
  size?: number;
  className?: string;
}

export function GearSVG({ size = 120, className }: GearSVGProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 120 120"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <GearTooth d="M55 4H65L68 18H52L55 4Z" />
      <GearTooth d="M55 102H65L68 116H52L55 102Z" />
      <GearTooth d="M102 55V65L116 68V52L102 55Z" />
      <GearTooth d="M4 55V65L18 68V52L4 55Z" />
      <GearTooth d="M85.5 13.4L94.2 22.1L84.5 32.3L75 22.7L85.5 13.4Z" />
      <GearTooth d="M25.8 97.9L34.5 106.6L45 97.3L35.5 87.7L25.8 97.9Z" />
      <GearTooth d="M97.9 94.2L106.6 85.5L97.3 75L87.7 84.5L97.9 94.2Z" />
      <GearTooth d="M13.4 34.5L22.1 25.8L32.3 35.5L22.7 45L13.4 34.5Z" />

      <circle cx="60" cy="60" opacity="0.28" r="34" stroke="currentColor" strokeWidth="10" />
      <circle cx="60" cy="60" opacity="0.75" r="16" stroke="currentColor" strokeWidth="8" />
      <circle cx="60" cy="60" fill="currentColor" opacity="0.18" r="6" />
    </svg>
  );
}

function GearTooth(props: SVGProps<SVGPathElement>) {
  return <path fill="currentColor" opacity="0.22" {...props} />;
}

export default GearSVG;
