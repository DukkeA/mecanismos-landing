"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
  /** Use light text colors (for dark backgrounds) */
  dark?: boolean;
}

function formatValue(value: number): string {
  return new Intl.NumberFormat("es-CO").format(value);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  duration = 1.8,
  className = "",
  dark = false,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setHasAnimated(true);
        observer.disconnect();

        // Skip animation if user prefers reduced motion — show final value immediately
        if (prefersReducedMotion()) {
          setValue(end);
          return;
        }

        const start = performance.now();
        const total = duration * 1000;

        const frame = (timestamp: number) => {
          const progress = Math.min((timestamp - start) / total, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setValue(Math.round(end * eased));

          if (progress < 1) {
            window.requestAnimationFrame(frame);
          }
        };

        window.requestAnimationFrame(frame);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, end, hasAnimated]);

  const displayValue = useMemo(
    () => `${prefix}${formatValue(hasAnimated ? value : 0)}${suffix}`,
    [hasAnimated, prefix, suffix, value],
  );

  return (
    <div ref={ref} className={`text-center ${className}`.trim()}>
      <div
        className={`text-4xl font-bold tracking-tight md:text-5xl ${
          dark ? "text-gold" : "text-charcoal"
        }`}
      >
        {displayValue}
      </div>
      <p
        className={`mt-3 text-sm font-medium uppercase tracking-[0.2em] ${
          dark ? "text-silver-light/50" : "text-text-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default StatCounter;
