"use client";

import { useRef } from "react";
import { WhatsAppForm } from "@/components/ui/WhatsAppForm";
import { DURATION, EASE, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

interface ContactSectionProps {
  id?: string;
}

export function ContactSection({ id = "contacto" }: ContactSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const container = containerRef.current;
      if (!container) return;

      // ── Left content reveal ──
      gsap.from("[data-contact-info]", {
        x: -60,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // ── Contact items stagger ──
      gsap.from("[data-contact-item]", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: EASE.snappy,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-contact-items]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Form panel slide in from right ──
      gsap.from("[data-contact-form]", {
        x: 80,
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: "[data-contact-form]",
          start: "top 80%",
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
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Gear-tooth divider flush at top — Trust → Contact ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 leading-[0]"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-[60px] w-full"
        >
          <polygon points="0,0 1440,0 1440,40 1420,40 1400,10 1360,10 1340,40 1260,40 1240,10 1200,10 1180,40 1100,40 1080,10 1040,10 1020,40 940,40 920,10 880,10 860,40 780,40 760,10 720,10 700,40 620,40 600,10 560,10 540,40 460,40 440,10 400,10 380,40 300,40 280,10 240,10 220,40 140,40 120,10 80,10 60,40 0,40" fill="var(--color-warm-white)" />
        </svg>
      </div>

      {/* Content */}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 md:px-10 md:py-32">
        <div className="grid w-full gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-24">
          {/* ── Left: Info column ── */}
          <div data-contact-info>
            <span className="inline-flex rounded-full border border-gold/20 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Contacto
            </span>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-pure-white md:text-5xl lg:text-6xl">
              ¿Listo para darle vida{" "}
              <span className="text-gradient-gold">a tu motor?</span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-silver-light/60 md:text-xl">
              Escríbenos por WhatsApp y agenda tu diagnóstico. Respondemos en
              minutos.
            </p>

            {/* Contact details */}
            <div data-contact-items className="mt-10 space-y-4">
              <ContactItem
                icon={<LocationIcon />}
                label="Dirección"
                text="Carrera 16 #8-04, Bogotá D.C."
              />
              <ContactItem
                icon={<PhoneIcon />}
                label="Teléfono"
                text="310 561 4469"
              />
              <ContactItem
                icon={<ClockIcon />}
                label="Horario"
                text="Lun - Vie: 8:00 AM - 6:00 PM | Sáb: 8:00 AM - 1:00 PM"
              />
            </div>

            {/* Map embed */}
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-pure-white/[0.06]">
              <iframe
                className="h-56 w-full md:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0900%2C4.5940%2C-74.0800%2C4.6010&layer=mapnik&marker=4.5975%2C-74.0850"
                style={{ border: 0, filter: "grayscale(0.6) contrast(1.1)" }}
                title="Ubicación de Mecanismos Técnicos en Bogotá"
              />
            </div>
          </div>

          {/* ── Right: Form panel ── */}
          <div
            data-contact-form
            className="flex items-center"
          >
            <div className="w-full overflow-hidden rounded-[2.5rem] border border-pure-white/[0.08] bg-[linear-gradient(145deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))] p-8 shadow-2xl backdrop-blur-sm md:p-10">
              {/* Top accent line */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                Envíanos tu consulta
              </p>

              <WhatsAppForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div
      data-contact-item
      className="group flex items-start gap-4 rounded-xl border border-pure-white/[0.04] bg-pure-white/[0.02] px-5 py-4 transition-colors duration-200 hover:border-gold/10 hover:bg-pure-white/[0.04]"
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/60">
          {label}
        </p>
        <p className="mt-1 text-base leading-relaxed text-text-light/80">
          {text}
        </p>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default ContactSection;
