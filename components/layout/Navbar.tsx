"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio", id: "inicio" },
  { href: "#historia", label: "Historia", id: "historia" },
  { href: "#servicios", label: "Servicios", id: "servicios" },
  { href: "#tecnologia", label: "Tecnología", id: "tecnologia" },
  { href: "#contacto", label: "Contacto", id: "contacto" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof NAV_LINKS)[number]["id"]>("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const current = NAV_LINKS.findLast(({ id }) => {
        const section = document.getElementById(id);

        if (!section) {
          return false;
        }

        return window.scrollY + 140 >= section.offsetTop;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const shellClass = isScrolled
    ? "border-silver/40 bg-warm-white/95 shadow-[0_12px_30px_rgba(45,45,45,0.08)] backdrop-blur-xl"
    : "border-transparent bg-transparent";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Principal"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 ${shellClass}`}
        >
          <Link href="#inicio" className="text-sm font-black tracking-[0.28em] text-charcoal uppercase sm:text-base">
            Mecanismos Técnicos
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? "text-gold" : "text-charcoal hover:text-gold"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-gold-light"
            >
              Contáctanos
            </a>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-silver/50 text-charcoal transition hover:border-gold hover:text-gold md:hidden"
          >
            <span className="sr-only">Abrir menú principal</span>
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-charcoal/35 transition md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal={isMenuOpen}
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(84vw,22rem)] flex-col bg-warm-white p-6 shadow-[-18px_0_40px_rgba(45,45,45,0.12)] transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-sm font-black tracking-[0.24em] text-charcoal uppercase">
            Menú
          </span>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-silver/50 text-charcoal"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-semibold transition-colors ${
                  isActive ? "text-gold" : "text-charcoal hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-gold-light"
        >
          Contáctanos
        </a>
      </aside>
    </>
  );
}

export default Navbar;
