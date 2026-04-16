"use client";

import { useRef } from "react";
import Image from "next/image";
import { GearSVG } from "@/components/svg/GearSVG";
import { prefersReducedMotion } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

const epochs = [
  {
    year: "1999",
    title: "El Inicio",
    description:
      "Un pequeño taller en el corazón de Bogotá. Con herramientas básicas y una pasión inagotable por los motores diésel, nació Mecanismos Técnicos.",
    accent: "from-gold-dark/30 to-charcoal/90",
    label: "Taller mecánico de los inicios",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=75&auto=format&fit=crop",
  },
  {
    year: "2010",
    title: "Crecimiento y Tecnología",
    description:
      "Más de una década perfeccionando cada procedimiento. Incorporamos bancos de prueba electrónicos y diagnóstico computarizado. El taller se convirtió en centro de referencia.",
    accent: "from-silver/20 to-charcoal/85",
    label: "Equipos de diagnóstico electrónico",
    image:
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=75&auto=format&fit=crop",
  },
  {
    year: "Hoy",
    title: "Excelencia Reconocida",
    description:
      "25+ años de confianza construida motor a motor. Un equipo de más de 15 técnicos especializados y tecnología de punta al servicio de cientos de clientes.",
    accent: "from-gold/25 to-charcoal/80",
    label: "Equipo de mecánicos profesionales",
    image:
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800&q=75&auto=format&fit=crop",
  },
] as const;

export function StorySection({ id = "historia" }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-epoch-panel]");
      if (panels.length === 0) return;

      // Recalculated on every refresh so mobile address-bar changes
      // and ultrawide resizes always produce the correct distance.
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - container.clientWidth);

      // ── Horizontal scroll: pin container, scrub track left ──
      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          anticipatePin: 1,
          snap: 1 / (panels.length - 1),
          invalidateOnRefresh: true,
        },
      });

      // ── Each panel: content fades/slides in using containerAnimation ──
      panels.forEach((panel, index) => {
        const content = panel.querySelector("[data-epoch-content]");
        const year = panel.querySelector("[data-epoch-year]");

        if (content) {
          gsap.from(content, {
            x: 80,
            opacity: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 80%",
              end: "left 50%",
              scrub: true,
            },
          });
        }

        if (year) {
          gsap.from(year, {
            scale: 0.5,
            opacity: 0,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "left 55%",
              scrub: true,
            },
          });
        }

        // ── Image placeholder parallax (moves slightly slower) ──
        const img = panel.querySelector("[data-epoch-image]");
        if (img) {
          gsap.from(img, {
            x: 120,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 90%",
              end: "left 30%",
              scrub: true,
            },
          });
        }

        // ── Divider line between panels (except last) ──
        if (index < panels.length - 1) {
          const divider = panel.querySelector("[data-epoch-divider]");
          if (divider) {
            gsap.from(divider, {
              scaleY: 0,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "right 60%",
                end: "right 40%",
                scrub: true,
              },
            });
          }
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <section id={id} ref={containerRef} className="horizontal-scroll-container relative bg-charcoal story-section-clip">
      {/* Inline SVG clipPath for the wave-cut top edge.
          Uses objectBoundingBox units (0-1) so it scales to any element size.
          The wave occupies roughly the top 6% of the section; below that is fully visible. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id="wave-clip-hero-story" clipPathUnits="objectBoundingBox">
            <path d="M0,0.06 C0.15,0 0.3,0.08 0.5,0.04 C0.7,0 0.85,0.08 1,0.03 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* ── Horizontal track ── */}
      <div ref={trackRef} className="horizontal-scroll-track">
        {epochs.map((epoch, index) => (
          <div
            key={epoch.year}
            data-epoch-panel
            className="horizontal-scroll-panel noise-overlay"
          >
            {/* Full-bleed gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${epoch.accent}`} />

            {/* Decorative gear */}
            <GearSVG
              className={`pointer-events-none absolute text-gold/[0.04] ${
                index === 0
                  ? "-bottom-20 -right-10 animate-float-slow"
                  : index === 1
                    ? "-top-16 -left-12 animate-float"
                    : "bottom-10 right-[10%] animate-float-delayed"
              }`}
              size={index === 2 ? 300 : 200}
            />

            {/* Timeline dots — extra top offset to clear the wave clip-path */}
            <div className="absolute left-8 top-20 flex items-center gap-4 md:left-12 md:top-24">
              <div className="flex items-center gap-2">
                {epochs.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`h-2 rounded-full transition-all ${
                      dotIndex === index
                        ? "w-8 bg-gold"
                        : dotIndex < index
                          ? "w-2 bg-gold/40"
                          : "w-2 bg-pure-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-pure-white/40">
                {index + 1} / {epochs.length}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 grid h-full w-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-2 md:px-16 lg:px-24">
              <div data-epoch-content className={index % 2 === 1 ? "md:order-2" : ""}>
                <div
                  data-epoch-year
                  className="mb-4 font-mono text-7xl font-black tracking-tighter text-gold/20 md:text-[8rem] lg:text-[10rem] leading-none"
                >
                  {epoch.year}
                </div>
                <h3 className="text-3xl font-bold text-pure-white md:text-4xl lg:text-5xl">
                  {epoch.title}
                </h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-silver-light/70 md:text-xl">
                  {epoch.description}
                </p>
              </div>

              <div data-epoch-image className={`relative ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-pure-white/[0.06] shadow-2xl">
                  <Image
                    alt={epoch.label}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={epoch.image}
                  />
                </div>
              </div>
            </div>

            {/* Vertical divider between panels */}
            {index < epochs.length - 1 && (
              <div
                data-epoch-divider
                className="absolute right-0 top-[15%] h-[70%] w-px origin-top bg-gradient-to-b from-transparent via-gold/30 to-transparent"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default StorySection;
