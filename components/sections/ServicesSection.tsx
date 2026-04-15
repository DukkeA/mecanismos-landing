"use client";

import { useRef } from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { DURATION, EASE, SCROLL_DEFAULTS, STAGGER, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

interface ServicesSectionProps {
  id?: string;
}

registerGSAPPlugins();

export function ServicesSection({ id = "servicios" }: ServicesSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.from("[data-service-card]", {
        y: 48,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.snappy,
        stagger: STAGGER.cards,
        scrollTrigger: {
          trigger: "[data-services-grid]",
          ...SCROLL_DEFAULTS,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id={id} ref={containerRef} className="bg-pure-white px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Servicios</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            Nuestros Servicios
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gold" />
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Soluciones integrales para sistemas diésel y transmisiones automáticas
          </p>
        </div>

        <div data-services-grid className="mt-14 grid gap-6 md:grid-cols-3">
          <div data-service-card>
            <ServiceCard
              title="Inyección Diésel"
              description="Diagnóstico, reparación y calibración de bombas e inyectores diésel. Trabajamos con sistemas Common Rail, bomba rotativa y bomba en línea de las principales marcas."
              icon={<InjectorIcon className="h-7 w-7" />}
            />
          </div>
          <div data-service-card>
            <ServiceCard
              title="Motores Diésel"
              description="Reparación integral de motores diésel para vehículos livianos y pesados. Diagnóstico computarizado, ajuste y reconstrucción con repuestos originales."
              icon={<EngineIcon className="h-7 w-7" />}
            />
          </div>
          <div data-service-card>
            <ServiceCard
              title="Transmisiones Automáticas"
              description="Servicio completo de transmisiones automáticas: diagnóstico electrónico, reparación, cambio de aceite y mantenimiento preventivo."
              icon={<TransmissionIcon className="h-7 w-7" />}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-text-muted">¿Necesitas un diagnóstico?</p>
          <a
            className="mt-4 inline-flex rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-gold-light"
            href="#contacto"
          >
            Escríbenos por WhatsApp
          </a>
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
