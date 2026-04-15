"use client";

import { useRef } from "react";
import { DURATION, EASE, SCROLL_DEFAULTS, prefersReducedMotion } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

interface StorySectionProps {
  id?: string;
}

const storyBeats = [
  {
    title: "Nuestra Historia",
    description:
      "Desde 1999, Mecanismos Técnicos ha sido referente en el diagnóstico y reparación de sistemas diésel en Bogotá. Lo que comenzó como un pequeño taller se ha convertido en un centro de servicio especializado.",
    label: "Foto del taller",
  },
  {
    title: "Experiencia que Respalda",
    description:
      "Más de dos décadas perfeccionando cada procedimiento. Nuestro equipo combina conocimiento técnico profundo con las herramientas más avanzadas del mercado.",
    label: "Equipo de trabajo",
  },
  {
    title: "Compromiso con la Excelencia",
    description:
      "Cada motor que entra a nuestro taller recibe el mismo nivel de atención al detalle. No hacemos reparaciones a medias: hacemos las cosas bien.",
    label: "Zona de diagnóstico",
  },
] as const;

registerGSAPPlugins();

export function StorySection({ id = "historia" }: StorySectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      const blocks = gsap.utils.toArray<HTMLElement>("[data-story-block]");

      blocks.forEach((block, index) => {
        gsap.from(block, {
          x: index % 2 === 0 ? -64 : 64,
          y: 24,
          opacity: 0,
          duration: DURATION.reveal,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: block,
            ...SCROLL_DEFAULTS,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <section id={id} ref={containerRef} className="bg-warm-white px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Trayectoria</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            Una historia construida con precisión, experiencia y confianza.
          </h2>
        </div>

        <div className="space-y-10 md:space-y-14">
          {storyBeats.map((beat, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div key={beat.title}>
                <div
                  data-story-block
                  className={[
                    "grid items-center gap-8 rounded-[2rem] bg-pure-white p-6 shadow-[0_30px_80px_-50px_rgba(45,45,45,0.25)] md:grid-cols-2 md:p-10",
                    isReversed ? "" : "",
                  ].join(" ")}
                >
                  <div className={isReversed ? "md:order-2" : undefined}>
                    <div className="flex min-h-72 items-end rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(201,169,110,0.8),_rgba(45,45,45,0.9))] p-6">
                      <span className="rounded-full bg-pure-white/12 px-4 py-2 text-sm font-medium text-pure-white backdrop-blur-sm">
                        {beat.label}
                      </span>
                    </div>
                  </div>

                  <div className={isReversed ? "md:order-1" : undefined}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">0{index + 1}</p>
                    <h3 className="mt-4 text-3xl font-semibold text-charcoal">{beat.title}</h3>
                    <p className="mt-5 text-lg leading-8 text-text-muted">{beat.description}</p>
                  </div>
                </div>

                {index < storyBeats.length - 1 ? (
                  <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent md:mt-10" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StorySection;
