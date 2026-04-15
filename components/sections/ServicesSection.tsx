"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { DURATION, EASE, SCROLL_DEFAULTS, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

const services = [
  {
    title: "Inyección Diésel",
    description:
      "Diagnóstico, reparación y calibración de bombas e inyectores diésel. Trabajamos con sistemas Common Rail, bomba rotativa y bomba en línea de las principales marcas.",
    icon: InjectorIcon,
    stat: "8.000+",
    statLabel: "inyectores reparados",
    image:
      "https://images.unsplash.com/photo-1635784439498-7ef9e164d09b?w=800&q=75&auto=format&fit=crop",
  },
  {
    title: "Motores Diésel",
    description:
      "Reparación integral de motores diésel para vehículos livianos y pesados. Diagnóstico computarizado, ajuste y reconstrucción con repuestos originales.",
    icon: EngineIcon,
    stat: "2.500+",
    statLabel: "motores reconstruidos",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=75&auto=format&fit=crop",
  },
  {
    title: "Transmisiones Automáticas",
    description:
      "Servicio completo de transmisiones automáticas: diagnóstico electrónico, reparación, cambio de aceite y mantenimiento preventivo.",
    icon: TransmissionIcon,
    stat: "1.200+",
    statLabel: "transmisiones reparadas",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=75&auto=format&fit=crop",
  },
] as const;

export function ServicesSection({
  id = "servicios",
  brandCarousel,
}: {
  id?: string;
  brandCarousel?: ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // ── Staggered reveal for each service block ──
      gsap.utils.toArray<HTMLElement>("[data-service-block]").forEach((block, index) => {
        const isEven = index % 2 === 0;
        gsap.from(block, {
          x: isEven ? -80 : 80,
          opacity: 0,
          duration: DURATION.reveal,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: block,
            ...SCROLL_DEFAULTS,
          },
        });
      });

      // ── Section header ──
      gsap.from("[data-services-header]", {
        y: 40,
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
    <section
      id={id}
      ref={containerRef}
      className="services-section-clip noise-overlay relative bg-warm-white py-24 md:py-36"
    >

      {/* Subtle diagonal background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_40%,_rgba(201,169,110,0.04)_40%,_rgba(201,169,110,0.04)_60%,_transparent_60%)]" />

      {/* Brand carousel sits above the services content, inside the same
          section so it inherits the diagonal gradient + noise overlay. */}
      {brandCarousel && (
        <div className="relative z-10 mb-16 w-full md:mb-20">
          {brandCarousel}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div data-services-header className="mb-20 max-w-3xl md:mb-28">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Servicios
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            Soluciones integrales para{" "}
            <span className="text-gradient-gold">cada sistema</span>
          </h2>
        </div>

        {/* Service blocks — alternating layout */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                data-service-block
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24 ${
                  isEven ? "" : "md:[direction:rtl]"
                }`}
              >
                {/* Text content */}
                <div className={isEven ? "" : "md:[direction:ltr]"}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-gold shadow-lg shadow-charcoal/20">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-6xl font-black text-charcoal/[0.06] md:text-7xl">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                  <a
                    href="#contacto"
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-dark"
                  >
                    Solicitar diagnóstico
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>

                {/* Visual card with stat */}
                <div className={isEven ? "" : "md:[direction:ltr]"}>
                  <div className="relative overflow-hidden rounded-[2rem] bg-charcoal p-1 shadow-2xl">
                    {/* Service image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                      <Image
                        alt={service.title}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        src={service.image}
                      />
                    </div>
                    {/* Floating stat badge */}
                    <div className="absolute -bottom-4 right-6 rounded-2xl border border-gold/30 bg-charcoal px-6 py-4 shadow-xl md:-bottom-6 md:right-8">
                      <div className="text-2xl font-bold text-gold md:text-3xl">
                        {service.stat}
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-silver-light/60">
                        {service.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InjectorIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M9 3h6v4l2 2v3l-4 4v5h-2v-5l-4-4V9l2-2V3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M12 16v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M10 21h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function EngineIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M4 9h11l3 3v5H6l-2-2V9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M8 9V6h5v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M18 13h2v3h-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <circle cx="9" cy="17" r="1.5" fill="currentColor" />
      <circle cx="15" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TransmissionIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.2 2.2M16.8 16.8 19 19M19 5l-2.2 2.2M5 19l2.2-2.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export default ServicesSection;
