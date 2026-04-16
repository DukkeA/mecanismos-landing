import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const FOOTER_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#historia", label: "Historia" },
  { href: "#servicios", label: "Servicios" },
  { href: "#tecnologia", label: "Tecnología" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-text-light">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
        <div>
          <p className="text-sm font-black tracking-[0.26em] text-gold uppercase">
            Mecanismos Técnicos
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-text-light/78">
            Especialistas en inyección diésel, motores diésel y transmisiones automáticas con enfoque técnico, diagnóstico preciso y atención directa.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">
            Enlaces rápidos
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-text-light/78">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-light/78">
            <li>Carrera 16 #8-04, Bogotá D.C., Colombia</li>
            <li>
              <a href="tel:+573105614469" className="transition hover:text-gold">
                +57 310 561 4469
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-gold"
              >
                Escríbenos por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-pure-white/10 px-6 py-5 text-center text-xs tracking-[0.16em] text-text-light/60 uppercase sm:px-8 lg:px-10">
        © {year} Mecanismos Técnicos. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
