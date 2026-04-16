"use client";

import { useRef } from "react";
import { StatCounter } from "@/components/ui/StatCounter";
import { StatsTestimonialsDivider } from "@/components/svg/stats-testimonials-divider";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

interface StatsSectionProps {
  id?: string;
}

const stats = [
  { end: 25, suffix: "+", label: "Años de Experiencia" },
  { end: 10000, suffix: "+", label: "Reparaciones Realizadas" },
  { end: 500, suffix: "+", label: "Clientes Satisfechos" },
  { end: 15, suffix: "+", label: "Técnicos Especializados" },
] as const;

export function StatsSection({ id = "stats" }: StatsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const container = containerRef.current;
      if (!container) return;

      // ── Parallax background layers ──
      gsap.to("[data-stats-bg-layer]", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Section heading reveal ──
      gsap.from("[data-stats-heading]", {
        y: 60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ── Counter cards float up with stagger ──
      gsap.from("[data-stat-card]", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: DURATION.slow,
        ease: EASE.smooth,
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-stats-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Floating decorative orbs ──
      gsap.to("[data-stats-orb-1]", {
        y: -40,
        x: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-stats-orb-2]", {
        y: -60,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id={id}
      ref={containerRef}
      className="noise-overlay relative overflow-hidden py-28 md:py-40"
    >
      {/* ── Angle divider flush at top — Brand Carousel → Stats ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 leading-[0]"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[60px] w-full"
        >
          <polygon points="0,0 1440,0 0,80" fill="var(--color-warm-white)" />
        </svg>
      </div>

      {/* ── Multi-layer background ── */}
      <div className="absolute inset-0 bg-charcoal" />

      {/* Parallax gradient layer */}
      <div
        data-stats-bg-layer
        className="absolute inset-x-0 -top-20 bottom-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(201,169,110,0.18),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(184,148,79,0.1),_transparent_50%)]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Floating decorative orbs ── */}
      <div
        data-stats-orb-1
        className="pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-gold/[0.05] blur-3xl"
      />
      <div
        data-stats-orb-2
        className="pointer-events-none absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full bg-silver/[0.04] blur-3xl"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Section heading */}
        <div data-stats-heading className="mb-16 max-w-3xl md:mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            En Números
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-pure-white md:text-5xl lg:text-6xl">
            Cifras que{" "}
            <span className="text-gradient-gold">hablan por nosotros</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-silver-light/60">
            Más de dos décadas resolviendo lo que otros no pueden. Cada número
            es una historia de confianza.
          </p>
        </div>

        {/* Counter grid — asymmetric layout */}
        <div
          data-stats-grid
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-stat-card
              className="group relative"
              style={{ marginTop: index % 2 === 1 ? "2rem" : 0 }}
            >
              {/* Glow behind card on hover */}
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-gold/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-[2rem] border border-pure-white/[0.06] bg-[linear-gradient(135deg,_rgba(255,255,255,0.04),_rgba(184,184,184,0.02))] p-8 backdrop-blur-sm md:p-10">
                {/* Accent line top */}
                <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                <StatCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  dark
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative separator */}
        <div className="mx-auto mt-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* ── Shape divider flush at bottom — Stats → Trust ── */}
      <StatsTestimonialsDivider />
    </section>
  );
}

export default StatsSection;
