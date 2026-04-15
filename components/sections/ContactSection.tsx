"use client";

import { useRef } from "react";
import { WhatsAppForm } from "@/components/ui/WhatsAppForm";
import { DURATION, EASE, SCROLL_DEFAULTS, prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

interface ContactSectionProps {
  id?: string;
}

registerGSAPPlugins();

export function ContactSection({ id = "contacto" }: ContactSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.from("[data-contact-panel]", {
        y: 36,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        stagger: 0.12,
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
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div data-contact-panel>
          <h2 className="text-4xl font-bold tracking-tight text-pure-white md:text-5xl">
            ¿Listo para darle vida a tu motor?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">
            Escríbenos por WhatsApp y agenda tu diagnóstico. Respondemos en minutos.
          </p>

          <div className="mt-10 space-y-5">
            <ContactItem icon="⌖" text="Carrera 16 #8-04, Bogotá D.C." />
            <ContactItem icon="✆" text="310 561 4469" />
            <ContactItem icon="⏰" text="Lun - Vie: 8:00 AM - 6:00 PM | Sáb: 8:00 AM - 1:00 PM" />
          </div>

          <div className="mt-10 rounded-[2rem] border border-pure-white/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(184,184,184,0.04))] p-4">
            <div className="flex min-h-64 items-end rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(208,208,208,0.35),_rgba(45,45,45,0.8))] p-6">
              <span className="rounded-full bg-pure-white/12 px-4 py-2 text-sm text-pure-white backdrop-blur-sm">
                Mapa de ubicación
              </span>
            </div>
          </div>
        </div>

        <div data-contact-panel>
          <WhatsAppForm />
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
        {icon}
      </span>
      <p className="text-base leading-7 text-text-light">{text}</p>
    </div>
  );
}

export default ContactSection;
