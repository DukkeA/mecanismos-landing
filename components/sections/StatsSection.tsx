"use client";

import { StatCounter } from "@/components/ui/StatCounter";

interface StatsSectionProps {
  id?: string;
}

export function StatsSection({ id = "stats" }: StatsSectionProps) {
  return (
    <section
      id={id}
      className="bg-[linear-gradient(180deg,_rgba(247,245,240,1)_0%,_rgba(201,169,110,0.14)_100%)] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
          Cifras que Hablan por Nosotros
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCounter end={25} suffix="+" label="Años de Experiencia" />
          <StatCounter end={10000} suffix="+" label="Reparaciones Realizadas" />
          <StatCounter end={500} suffix="+" label="Clientes Satisfechos" />
          <StatCounter end={15} suffix="+" label="Técnicos Especializados" />
        </div>
        <div className="mx-auto mt-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
}

export default StatsSection;
