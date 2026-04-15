/**
 * SVG Section Dividers — shaped transitions between sections.
 *
 * ARCHITECTURE:
 * Each divider is rendered as the LAST CHILD inside the upper section,
 * positioned absolute at the bottom, protruding downward over the next
 * section via `transform: translateY(99%)`.
 *
 * The SVG viewBox is split into two zones:
 *   - TOP zone: fully transparent — the parent section's real background
 *     (gradients, images, noise, everything) shows through naturally.
 *   - BOTTOM zone: filled with `nextSectionColor` — matches the next
 *     section's background, creating a seamless shaped transition.
 *
 * The `fill` prop should be the background color of the NEXT section.
 *
 * The parent section MUST have `position: relative` (for absolute positioning)
 * and `overflow: visible` or the divider will be clipped.
 *
 * Usage (inside a section component):
 *   <section className="relative overflow-visible ...">
 *     {content}
 *     <WaveDivider fill="var(--color-warm-white)" />
 *   </section>
 */

type DividerProps = {
  /** Background color of the NEXT (lower) section */
  fill?: string;
  className?: string;
};

/** Organic wave — gentle, flowing transition */
export function WaveDivider({
  fill = "currentColor",
  className = "",
}: DividerProps) {
  return (
    <div aria-hidden="true" className={`section-divider ${className}`.trim()}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** Diagonal cut — sharp, industrial feel */
export function AngleDivider({
  fill = "currentColor",
  className = "",
}: DividerProps) {
  return (
    <div aria-hidden="true" className={`section-divider ${className}`.trim()}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,80 1440,0 1440,80" fill={fill} />
      </svg>
    </div>
  );
}

/** Gear-tooth edge — mechanical, brand-aligned */
export function GearToothDivider({
  fill = "currentColor",
  className = "",
}: DividerProps) {
  return (
    <div aria-hidden="true" className={`section-divider ${className}`.trim()}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 L60,40 L80,10 L120,10 L140,40 L220,40 L240,10 L280,10 L300,40 L380,40 L400,10 L440,10 L460,40 L540,40 L560,10 L600,10 L620,40 L700,40 L720,10 L760,10 L780,40 L860,40 L880,10 L920,10 L940,40 L1020,40 L1040,10 L1080,10 L1100,40 L1180,40 L1200,10 L1240,10 L1260,40 L1340,40 L1360,10 L1400,10 L1420,40 L1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** Double wave — more complex organic flow */
export function DoubleWaveDivider({
  fill = "currentColor",
  className = "",
}: DividerProps) {
  return (
    <div aria-hidden="true" className={`section-divider ${className}`.trim()}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 C180,80 360,20 540,50 C720,80 900,20 1080,50 C1200,68 1360,42 1440,50 L1440,100 L0,100 Z"
          fill={fill}
          opacity="0.5"
        />
        <path
          d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
