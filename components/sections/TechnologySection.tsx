"use client";

import { useRef } from "react";
import { DURATION, EASE, SCROLL_DEFAULTS, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

interface TechnologySectionProps {
  id?: string;
}

const features = [
  "Banco de pruebas para inyectores Common Rail",
  "Diagnóstico electrónico automotriz",
  "Equipo de ultrasonido para limpieza",
  "Software de calibración actualizado",
] as const;

registerGSAPPlugins();

export function TechnologySection({ id = "tecnologia" }: TechnologySectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.from("[data-tech-copy]", {
        x: -60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          ...SCROLL_DEFAULTS,
        },
      });

      gsap.from("[data-tech-image]", {
        x: 60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          ...SCROLL_DEFAULTS,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id={id} ref={containerRef} className="bg-charcoal px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div data-tech-copy>
          <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Tecnología de Punta
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-pure-white md:text-5xl">
            Equipos de Última Generación
          </h2>
          <p className="mt-6 text-lg leading-8 text-silver">
            Contamos con bancos de prueba electrónicos, equipos de diagnóstico computarizado y herramientas de precisión que nos permiten identificar y resolver cualquier falla con exactitud milimétrica.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-base leading-7 text-text-light">
                <span className="mt-1 text-gold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-tech-image className="rounded-[2rem] border border-pure-white/8 bg-[linear-gradient(135deg,_rgba(255,255,255,0.14),_rgba(184,184,184,0.08))] p-4 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.85)]">
          <div className="flex min-h-[24rem] items-end rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(201,169,110,0.65),_rgba(70,70,70,0.95))] p-8">
            <span className="rounded-full bg-charcoal/35 px-4 py-2 text-sm font-medium text-pure-white backdrop-blur-sm">
              Equipos de diagnóstico
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;
