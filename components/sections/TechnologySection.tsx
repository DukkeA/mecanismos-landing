"use client";

import { useRef } from "react";
import Image from "next/image";
import { DURATION, EASE, SCROLL_DEFAULTS, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

const features = [
  "Banco de pruebas para inyectores Common Rail",
  "Diagnóstico electrónico automotriz",
  "Equipo de ultrasonido para limpieza",
  "Software de calibración actualizado",
  "Herramientas de micrómetro de precisión",
  "Sala limpia para ensamble de inyectores",
] as const;

export function TechnologySection({ id = "tecnologia" }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const container = containerRef.current;
      if (!container) return;

      // ── Background zoom on scroll ──
      gsap.to("[data-tech-bg]", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Text reveal from left ──
      gsap.from("[data-tech-content]", {
        x: -60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: container,
          ...SCROLL_DEFAULTS,
        },
      });

      // ── Feature list stagger ──
      gsap.from("[data-tech-feature]", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: EASE.snappy,
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-tech-features]",
          ...SCROLL_DEFAULTS,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative -mt-[60px] min-h-screen overflow-visible"
    >
      {/* ── Gear-tooth divider at the top, translated upward to overlap Services ──
          The teeth inherit Technology's dark gradient via SVG linearGradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 w-full -translate-y-full leading-[0]"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[60px] w-full"
        >
          <defs>
            <linearGradient id="tech-gradient-teeth" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(45,45,45,0.95)" />
              <stop offset="50%" stopColor="rgba(45,45,45,0.80)" />
              <stop offset="100%" stopColor="rgba(45,45,45,0.40)" />
            </linearGradient>
          </defs>
          {/* warm-white background (Services color) */}
          <rect width="1440" height="80" fill="var(--color-warm-white)" />
          {/* Gear teeth filled with Technology's gradient */}
          <path
            d="M0,40 L60,40 L80,10 L120,10 L140,40 L220,40 L240,10 L280,10 L300,40 L380,40 L400,10 L440,10 L460,40 L540,40 L560,10 L600,10 L620,40 L700,40 L720,10 L760,10 L780,40 L860,40 L880,10 L920,10 L940,40 L1020,40 L1040,10 L1080,10 L1100,40 L1180,40 L1200,10 L1240,10 L1260,40 L1340,40 L1360,10 L1400,10 L1420,40 L1440,40 L1440,80 L0,80 Z"
            fill="url(#tech-gradient-teeth)"
          />
        </svg>
      </div>

      {/* ── Full-bleed background with zoom ── */}
      <div
        data-tech-bg
        className="absolute inset-0 scale-100"
      >
        <Image
          alt="Interior de taller mecánico con equipos de diagnóstico"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1581093458791-9d42e3c2fd45?w=1600&q=70&auto=format&fit=crop"
        />
        {/* Gradient overlays on top of the image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(201,169,110,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(184,184,184,0.08),_transparent_50%)]" />
      </div>

      {/* ── Dark overlay for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 md:px-10 md:py-32">
        <div data-tech-content className="max-w-2xl">
          <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Tecnología de Punta
          </span>

          <h2 className="mt-8 text-4xl font-bold tracking-tight text-pure-white md:text-5xl lg:text-6xl">
            Equipos de{" "}
            <span className="text-gradient-gold">última generación</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-silver-light/70 md:text-xl">
            Contamos con bancos de prueba electrónicos, equipos de diagnóstico
            computarizado y herramientas de precisión que nos permiten
            identificar y resolver cualquier falla con exactitud milimétrica.
          </p>

          <div data-tech-features className="mt-10 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                data-tech-feature
                className="flex items-start gap-3 rounded-xl border border-pure-white/[0.06] bg-pure-white/[0.03] px-4 py-3 backdrop-blur-sm"
              >
                <span className="mt-0.5 text-gold">✓</span>
                <span className="text-sm leading-relaxed text-text-light/80">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#contacto"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.35)]"
          >
            <span>Conoce nuestro taller</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* ── Floating label (right side) — placeholder for actual equipment photo ── */}
      <div className="pointer-events-none absolute bottom-12 right-8 z-10 md:bottom-16 md:right-16">
        <div className="rounded-2xl border border-pure-white/10 bg-charcoal/60 px-6 py-4 backdrop-blur-lg">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Equipos</p>
          <p className="mt-1 text-sm text-silver-light/60">
            Banco de pruebas Common Rail
          </p>
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;
