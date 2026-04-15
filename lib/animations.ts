export const EASE = {
  smooth: "power2.out",
  snappy: "power3.out",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  reveal: 1.0,
} as const;

export const SCROLL_DEFAULTS = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none none",
} as const;

export const STAGGER = {
  cards: 0.15,
  text: 0.08,
  items: 0.1,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
