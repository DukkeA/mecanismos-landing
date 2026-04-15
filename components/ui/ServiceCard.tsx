import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={[
        "group rounded-3xl border border-gold/15 bg-warm-white p-8 shadow-[0_20px_60px_-40px_rgba(45,45,45,0.35)] transition-transform duration-300 hover:-translate-y-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-gold shadow-lg shadow-gold/10">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-semibold text-charcoal">{title}</h3>
      <p className="text-base leading-7 text-text-muted">{description}</p>
    </article>
  );
}

export default ServiceCard;
