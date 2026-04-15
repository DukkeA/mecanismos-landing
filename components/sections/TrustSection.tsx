"use client";

import { useRef } from "react";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

interface TrustSectionProps {
  id?: string;
}

const testimonials = [
  {
    quote:
      "Llevé mi camión con problemas de inyección y lo entregaron como nuevo. Excelente servicio y muy profesionales.",
    author: "Carlos M.",
    role: "Transportador",
  },
  {
    quote:
      "Más de 10 años llevando mi flota a Mecanismos Técnicos. Siempre cumplen con los tiempos y la calidad es impecable.",
    author: "Logística del Norte",
    role: "S.A.S.",
  },
  {
    quote:
      "Me explicaron todo el proceso de la reparación de la transmisión. Transparencia total. Los recomiendo.",
    author: "Andrea P.",
    role: "Particular",
  },
] as const;

export function TrustSection({ id = "trust" }: TrustSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const container = containerRef.current;
      if (!container) return;

      // ── Section heading reveal ──
      gsap.from("[data-trust-heading]", {
        y: 50,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ── Featured testimonial (large one) ──
      gsap.from("[data-trust-featured]", {
        x: -80,
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: "[data-trust-featured]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Side testimonials stagger ──
      gsap.from("[data-trust-card]", {
        x: 60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        stagger: 0.15,
        scrollTrigger: {
          trigger: "[data-trust-grid]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── CTA block ──
      gsap.from("[data-trust-cta]", {
        y: 40,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: "[data-trust-cta]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef },
  );

  const [featured, ...rest] = testimonials;

  return (
    <section
      id={id}
      ref={containerRef}
      className="noise-overlay relative overflow-hidden bg-warm-white py-28 md:py-40"
    >
      {/* Subtle diagonal accent */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,_transparent_30%,_rgba(201,169,110,0.03)_30%,_rgba(201,169,110,0.03)_70%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Heading ── */}
        <div data-trust-heading className="mb-16 md:mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Testimonios
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            La confianza se construye{" "}
            <span className="text-gradient-gold">con resultados</span>
          </h2>
        </div>

        {/* ── Editorial layout: featured (large) + side cards ── */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* Featured testimonial — large, editorial style */}
          <div
            data-trust-featured
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-charcoal p-10 shadow-2xl md:p-14"
          >
            {/* Decorative accent */}
            <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle,_rgba(201,169,110,0.15),_transparent_70%)]" />

            {/* Oversized quote mark */}
            <div className="relative">
              <span className="text-[8rem] font-bold leading-none text-gold/10 md:text-[10rem]">
                &ldquo;
              </span>
              <p className="-mt-20 text-2xl leading-relaxed text-text-light md:text-3xl md:leading-snug">
                {featured.quote}
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-pure-white/10 pt-8">
              {/* Avatar placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-xl font-bold text-gold">
                {featured.author[0]}
              </div>
              <div>
                <p className="text-base font-semibold text-pure-white">
                  {featured.author}
                </p>
                <p className="text-sm text-silver-light/50">
                  {featured.role}
                </p>
              </div>
            </div>
          </div>

          {/* Side testimonials — stacked */}
          <div data-trust-grid className="flex flex-col gap-6">
            {rest.map((testimonial) => (
              <article
                key={testimonial.author}
                data-trust-card
                className="group relative overflow-hidden rounded-[2rem] border border-charcoal/[0.06] bg-pure-white p-8 shadow-[0_24px_70px_-45px_rgba(45,45,45,0.15)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-30px_rgba(201,169,110,0.2)] md:p-10"
              >
                {/* Accent on hover */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold to-gold-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="text-5xl font-bold leading-none text-gold/20">
                  &ldquo;
                </span>
                <p className="-mt-2 text-lg leading-relaxed text-charcoal">
                  {testimonial.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── CTA Block ── */}
        <div
          data-trust-cta
          className="mt-20 flex flex-col items-center gap-5 rounded-[2rem] border border-gold/10 bg-[linear-gradient(135deg,_rgba(201,169,110,0.06),_transparent)] px-8 py-12 text-center md:mt-28 md:flex-row md:justify-between md:px-14 md:text-left"
        >
          <div>
            <p className="text-2xl font-bold tracking-tight text-charcoal md:text-3xl">
              ¿Listo para experimentar la diferencia?
            </p>
            <p className="mt-2 text-text-muted">
              Agenda tu diagnóstico y comprobá por qué confían en nosotros.
            </p>
          </div>
          <a
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-charcoal px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-pure-white transition-all duration-300 hover:bg-gold hover:text-charcoal hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
            href="#contacto"
          >
            Agenda tu diagnóstico
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
