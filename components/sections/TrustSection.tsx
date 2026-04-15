interface TrustSectionProps {
  id?: string;
}

const testimonials = [
  {
    quote:
      "Llevé mi camión con problemas de inyección y lo entregaron como nuevo. Excelente servicio y muy profesionales.",
    author: "Carlos M., Transportador",
  },
  {
    quote:
      "Más de 10 años llevando mi flota a Mecanismos Técnicos. Siempre cumplen con los tiempos y la calidad es impecable.",
    author: "Logística del Norte S.A.S.",
  },
  {
    quote:
      "Me explicaron todo el proceso de la reparación de la transmisión. Transparencia total. Los recomiendo.",
    author: "Andrea P., Particular",
  },
] as const;

export function TrustSection({ id = "trust" }: TrustSectionProps) {
  return (
    <section id={id} className="bg-pure-white px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Testimonios</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            La Confianza se Construye con Resultados
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="rounded-[2rem] bg-warm-white p-8 shadow-[0_24px_70px_-45px_rgba(45,45,45,0.35)]"
            >
              <div className="text-5xl leading-none text-gold">“</div>
              <p className="mt-4 text-lg leading-8 text-charcoal">{testimonial.quote}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                {testimonial.author}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-text-muted">¿Listo para experimentar la diferencia?</p>
          <a
            className="mt-4 inline-flex rounded-full border border-gold bg-charcoal px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-pure-white transition hover:bg-gold hover:text-charcoal"
            href="#contacto"
          >
            Agenda tu diagnóstico
          </a>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
