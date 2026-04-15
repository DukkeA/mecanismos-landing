"use client";

import { useRef } from "react";
import { GearSVG } from "@/components/svg/GearSVG";
import { DURATION, EASE, STAGGER, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

interface HeroSectionProps {
  id?: string;
}

registerGSAPPlugins();

export function HeroSection({ id = "inicio" }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.from("[data-hero-reveal]", {
        y: 32,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        stagger: STAGGER.text,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-charcoal px-6 py-24 text-text-light md:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.18),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.02),_transparent_55%)]" />
      <GearSVG className="absolute -left-12 -top-10 text-gold opacity-12 animate-spin [animation-duration:28s]" size={140} />
      <GearSVG className="absolute right-6 top-20 text-silver opacity-10 animate-spin [animation-direction:reverse] [animation-duration:36s]" size={88} />
      <GearSVG className="absolute -bottom-10 right-[-2rem] text-gold opacity-10 animate-spin [animation-duration:40s]" size={180} />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="max-w-4xl">
          <span
            data-hero-reveal
            className="mb-6 inline-flex rounded-full border border-gold/30 bg-pure-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold md:text-sm"
          >
            Más de 25 años de experiencia
          </span>
          <h1
            data-hero-reveal
            className="text-5xl font-bold tracking-tight text-pure-white sm:text-6xl md:text-7xl xl:text-[5.75rem]"
          >
            <span className="block">Precisión Diésel</span>
            <span className="block text-gradient-gold">en Cada Detalle</span>
          </h1>
          <p
            data-hero-reveal
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-silver-light md:text-xl"
          >
            Especialistas en sistemas de inyección, motores diésel y transmisiones automáticas con tecnología de punta
          </p>
          <div
            data-hero-reveal
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-gold-light"
              href="https://wa.me/573105614469"
              target="_blank"
              rel="noreferrer"
            >
              Agenda tu Diagnóstico
            </a>
            <a
              className="text-sm font-semibold uppercase tracking-[0.18em] text-silver-light transition hover:text-gold"
              href="#servicios"
            >
              Conoce nuestros servicios ↓
            </a>
          </div>
        </div>

        <a
          aria-label="Ir a la siguiente sección"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-silver-light transition hover:text-gold"
          href="#historia"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Deslizar</span>
          <span className="animate-bounce text-2xl">⌄</span>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
