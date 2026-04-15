"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
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
    <div
      ref={ref}
      className="rounded-3xl border border-gold/20 bg-pure-white/70 px-6 py-8 text-center shadow-[0_20px_50px_-40px_rgba(201,169,110,0.5)] backdrop-blur"
    >
      <div className="text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
        {displayValue}
      </div>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>
    </div>
  );
}

export default StatCounter;
