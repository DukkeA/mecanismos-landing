"use client";

import { useRef } from "react";
import { ArrowRight, Clock3, Gauge, ShieldCheck } from "lucide-react";
import {
  TestimonialsColumn,
  type TestimonialCard,
} from "@/components/ui/testimonials-columns-1";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";
import { GearToothDivider } from "@/components/svg/SectionDividers";

registerGSAPPlugins();

interface TrustSectionProps {
  id?: string;
}

const testimonials: readonly TestimonialCard[] = [
  {
    quote:
      "Entramos con una falla intermitente en inyección que nos estaba frenando la ruta. Acá nos explicaron el problema sin vueltas y el camión volvió a salir fino.",
    name: "Carlos Mejía",
    role: "Transportador de carga",
    badge: "Inyección diésel",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Lo que más valoro es que no improvisan. Te muestran criterio, tiempos claros y respaldo técnico. Para una flota eso vale oro.",
    name: "Daniela Ríos",
    role: "Jefa de mantenimiento · flota regional",
    badge: "Flotas",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Teníamos una transmisión automática golpeando cambios. El diagnóstico fue claro, la reparación prolija y la entrega exactamente cuando dijeron.",
    name: "Andrés Téllez",
    role: "Administrador de taller aliado",
    badge: "Transmisiones",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Se nota cuando un equipo trabaja con método. No fue sólo reparar: nos ayudaron a entender qué originó la falla para que no se repita.",
    name: "Salomé Vargas",
    role: "Coordinadora operativa",
    badge: "Diagnóstico",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Trajimos un vehículo particular con un historial largo de intentos fallidos. Acá dieron con la causa raíz y el cambio fue inmediato en carretera.",
    name: "Mauricio Castaño",
    role: "Cliente particular",
    badge: "Resultado en ruta",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Necesitábamos velocidad, pero con respaldo. Cumplieron con ambas: tiempos serios, comunicación constante y prueba final que da tranquilidad.",
    name: "Laura Villamil",
    role: "Compras técnicas · agroindustria",
    badge: "Cumplimiento",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "El valor no está sólo en la reparación; está en cómo documentan, explican y respaldan el proceso. Eso nos permitió confiar y seguir trabajando.",
    name: "Julián Ocampo",
    role: "Supervisor de patio",
    badge: "Trazabilidad",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Nos habían recomendado el taller por su precisión y honestidad. Después de la primera experiencia entendimos por qué tienen esa reputación.",
    name: "Mariana Suárez",
    role: "Gerente administrativa",
    badge: "Recomendación",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=320&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "Cuando el vehículo es herramienta de trabajo, no podés dejarlo en cualquier lado. Acá sentís orden, criterio y un equipo que realmente responde.",
    name: "Felipe Cardona",
    role: "Propietario de camión",
    badge: "Confianza",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=320&q=80&auto=format&fit=crop",
  },
] as const;

const trustHighlights = [
  {
    icon: Clock3,
    title: "Diagnóstico sin vueltas",
    description: "Qué tiene el vehículo, qué sigue y cómo impacta en la operación.",
  },
  {
    icon: ShieldCheck,
    title: "Proceso respaldado",
    description: "Cada intervención se explica con criterio técnico y trazabilidad.",
  },
  {
    icon: Gauge,
    title: "Resultado que se siente",
    description: "La confianza aparece cuando el vehículo vuelve a responder en ruta.",
  },
] as const;

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

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

      // ── Left editorial block ──
      gsap.from("[data-trust-intro]", {
        x: -70,
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: "[data-trust-intro]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Moving columns panel ──
      gsap.from("[data-trust-columns]", {
        x: 60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: "[data-trust-columns]",
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

  return (
    <section
      id={id}
      ref={containerRef}
      className="noise-overlay relative overflow-hidden bg-warm-white pb-32 pt-28 md:pb-44 md:pt-40"
    >
      {/* Subtle diagonal accent */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,_transparent_30%,_rgba(201,169,110,0.03)_30%,_rgba(201,169,110,0.03)_70%,_transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Heading ── */}
        <div data-trust-heading className="mx-auto mb-16 max-w-3xl md:mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Testimonios
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            La confianza se construye{" "}
            <span className="text-gradient-gold">con resultados</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted">
            Historias de taller, flota y carretera que hablan de lo mismo: criterio
            técnico, tiempos claros y un servicio que devuelve tranquilidad cuando el
            vehículo vuelve a la operación.
          </p>
        </div>

        <div data-trust-intro className="border-y border-charcoal/10 py-10 md:py-12">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between xl:gap-14">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                Lo que más repiten nuestros clientes
              </p>

              <h3 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-charcoal md:text-4xl lg:text-5xl">
                Precisión técnica, tiempos claros y una entrega que se siente en la ruta.
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                Cada caso cambia, pero el patrón se repite: diagnóstico fino,
                comunicación transparente y una ejecución que se nota cuando el vehículo
                vuelve a responder con seguridad, fuerza y precisión.
              </p>
            </div>

            <div className="grid gap-6 border-t border-charcoal/10 pt-6 sm:grid-cols-3 xl:max-w-3xl xl:flex-1 xl:pt-0 xl:border-t-0">
              {trustHighlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="space-y-3 xl:border-l xl:border-charcoal/10 xl:pl-5 xl:first:border-l-0 xl:first:pl-0">
                  <Icon className="size-5 text-gold" aria-hidden="true" />
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-charcoal">
                    {title}
                  </p>
                  <p className="text-sm leading-6 text-text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-trust-columns className="relative mt-12 md:mt-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(201,169,110,0.08),_transparent_70%)]" />
          <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="grid h-[28rem] gap-5 md:h-[34rem] md:grid-cols-2 xl:h-[38rem] xl:grid-cols-3">
              <TestimonialsColumn testimonials={firstColumn} duration={21} />
              <TestimonialsColumn
                testimonials={secondColumn}
                duration={24}
                reverse
                className="hidden md:block"
              />
              <TestimonialsColumn
                testimonials={thirdColumn}
                duration={20}
                className="hidden xl:block"
              />
            </div>
          </div>
        </div>

        {/* ── CTA Block ── */}
        <div
          data-trust-cta
          className="mt-14 flex flex-col items-center gap-5 border-t border-charcoal/10 pt-8 text-center md:mt-16 md:flex-row md:justify-between md:text-left"
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
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
