"use client";

import { useRef } from "react";
import { GearSVG } from "@/components/svg/GearSVG";
import { PistonSVG } from "@/components/svg/PistonSVG";
import { DURATION, EASE, STAGGER, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

export function HeroSection({ id = "inicio" }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const container = containerRef.current;
      if (!container) return;

      // ── Entrance: staggered reveal ──
      gsap.from("[data-hero-reveal]", {
        y: 60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        stagger: STAGGER.text,
        delay: 0.3,
      });

      // ── Parallax: gears move at different speeds on scroll ──
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.5");
        gsap.to(el, {
          y: () => speed * 200,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Zoom-out on scroll: hero content shrinks slightly for depth ──
      gsap.to("[data-hero-content]", {
        scale: 0.92,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Background gradient shift on scroll ──
      gsap.to("[data-hero-gradient]", {
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "center center",
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
      className="noise-overlay relative flex min-h-screen items-center overflow-hidden bg-charcoal"
    >
      {/* ── Layered background gradients ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(201,169,110,0.22),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,_rgba(184,148,79,0.1),_transparent_50%)]" />
      <div
        data-hero-gradient
        className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_60%,_rgba(45,45,45,0.95))] opacity-40"
      />

      {/* ── Parallax decorative layer: gears at different depths ── */}
      <GearSVG
        data-parallax="-0.3"
        className="pointer-events-none absolute -left-16 -top-16 text-gold/[0.08] animate-float-slow"
        size={220}
      />
      <GearSVG
        data-parallax="0.2"
        className="pointer-events-none absolute right-[8%] top-[12%] text-silver/[0.07] [animation-direction:reverse] animate-float"
        size={140}
      />
      <GearSVG
        data-parallax="0.5"
        className="pointer-events-none absolute -bottom-20 right-[-5%] text-gold/[0.06] animate-float-delayed"
        size={280}
      />
      <GearSVG
        data-parallax="-0.15"
        className="pointer-events-none absolute bottom-[20%] left-[5%] text-silver/[0.05] animate-float"
        size={100}
      />
      <PistonSVG
        data-parallax="0.35"
        className="pointer-events-none absolute right-[15%] bottom-[10%] opacity-[0.04]"
        size={160}
      />

      {/* ── Subtle grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content with parallax zoom-out ── */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center md:px-10"
      >
        <span
          data-hero-reveal
          className="mb-8 inline-flex rounded-full border border-gold/25 bg-pure-white/[0.05] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm md:text-sm"
        >
          Más de 25 años de experiencia
        </span>

        <h1
          data-hero-reveal
          className="text-5xl font-bold leading-[1.05] tracking-tight text-pure-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]"
        >
          <span className="block">Precisión Diésel</span>
          <span className="block text-gradient-gold mt-1">en Cada Detalle</span>
        </h1>

        <p
          data-hero-reveal
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-silver-light/80 md:text-xl"
        >
          Especialistas en sistemas de inyección, motores diésel y transmisiones
          automáticas con tecnología de punta
        </p>

        <div
          data-hero-reveal
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
        >
          <a
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.4)]"
            href="https://wa.me/573105614469"
            target="_blank"
            rel="noreferrer"
          >
            <span className="relative z-10">Agenda tu Diagnóstico</span>
            <span className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            className="text-sm font-semibold uppercase tracking-[0.2em] text-silver-light/70 transition-colors hover:text-gold"
            href="#servicios"
          >
            Conoce nuestros servicios ↓
          </a>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          aria-label="Ir a la siguiente sección"
          className="flex flex-col items-center gap-2 text-silver-light/50 transition-colors hover:text-gold"
          href="#historia"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.35em]">Deslizar</span>
          <span className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
