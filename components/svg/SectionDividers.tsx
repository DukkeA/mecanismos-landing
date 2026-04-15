/**
 * SVG Shape Dividers — organic/mechanical transitions between sections.
 *
 * ARCHITECTURE: Each divider renders a full-width SVG with TWO fills:
 *   - topColor: the background color of the UPPER (source) section
 *   - bottomColor: the background color of the LOWER (destination) section
 *
 * The SVG viewBox is fully filled. A background rect uses `topColor`,
 * and the shaped path uses `bottomColor`. The path traces the decorative
 * boundary (wave, gear-teeth, diagonal, etc.) from somewhere mid-height
 * down to the bottom of the viewBox. This creates a seamless visual
 * transition — NO transparent gaps, NO bg-* classes needed on the wrapper.
 *
 * Usage:
 *   <WaveDivider topColor="var(--color-charcoal)" bottomColor="var(--color-warm-white)" />
 */

type DividerProps = {
  /** Background color of the section ABOVE this divider */
  topColor: string;
  /** Background color of the section BELOW this divider */
  bottomColor: string;
  className?: string;
  flip?: boolean;
};

/** Organic wave — gentle, flowing transition */
export function WaveDivider({
  topColor,
  bottomColor,
  className = "",
  flip = false,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`section-divider ${flip ? "section-divider-flip" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top section background fills entire viewBox */}
        <rect width="1440" height="120" fill={topColor} />
        {/* Bottom section color rises up in a wave shape */}
        <path
          d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

/** Diagonal cut — sharp, industrial feel */
export function AngleDivider({
  topColor,
  bottomColor,
  className = "",
  flip = false,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`section-divider ${flip ? "section-divider-flip" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={topColor} />
        <polygon points="0,80 1440,0 1440,80" fill={bottomColor} />
      </svg>
    </div>
  );
}

/** Gear-tooth edge — mechanical, brand-aligned */
export function GearToothDivider({
  topColor,
  bottomColor,
  className = "",
  flip = false,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`section-divider ${flip ? "section-divider-flip" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={topColor} />
        <path
          d="M0,40 L60,40 L80,10 L120,10 L140,40 L220,40 L240,10 L280,10 L300,40 L380,40 L400,10 L440,10 L460,40 L540,40 L560,10 L600,10 L620,40 L700,40 L720,10 L760,10 L780,40 L860,40 L880,10 L920,10 L940,40 L1020,40 L1040,10 L1080,10 L1100,40 L1180,40 L1200,10 L1240,10 L1260,40 L1340,40 L1360,10 L1400,10 L1420,40 L1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

/** Double wave — more complex organic flow */
export function DoubleWaveDivider({
  topColor,
  bottomColor,
  className = "",
  flip = false,
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`section-divider ${flip ? "section-divider-flip" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="100" fill={topColor} />
        {/* Subtle translucent wave layer for depth */}
        <path
          d="M0,50 C180,80 360,20 540,50 C720,80 900,20 1080,50 C1200,68 1360,42 1440,50 L1440,100 L0,100 Z"
          fill={bottomColor}
          opacity="0.5"
        />
        {/* Main solid wave on top */}
        <path
          d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,100 L0,100 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
