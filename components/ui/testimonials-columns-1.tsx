"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type TestimonialCard = {
  quote: string;
  image: string;
  name: string;
  role: string;
  badge: string;
};

interface TestimonialsColumnProps {
  className?: string;
  testimonials: readonly TestimonialCard[];
  duration?: number;
  reverse?: boolean;
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 18,
  reverse = false,
}: Readonly<TestimonialsColumnProps>) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { translateY: reverse ? "-50%" : "0%" },
        animate: { translateY: reverse ? "0%" : "-50%" },
        transition: {
          duration,
          repeat: Infinity,
          ease: "linear" as const,
          repeatType: "loop" as const,
        },
      };

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div
        {...motionProps}
        className="flex flex-col gap-4 pb-4"
      >
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <Fragment key={groupIndex}>
            {testimonials.map((testimonial) => (
              <article
                key={`${groupIndex}-${testimonial.name}`}
                className="group relative w-full overflow-hidden rounded-[1.75rem] border border-charcoal/[0.08] bg-pure-white/95 p-5 shadow-[0_28px_80px_-52px_rgba(45,45,45,0.28)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute right-0 top-0 h-24 w-24 bg-[radial-gradient(circle,_rgba(201,169,110,0.18),_transparent_70%)]" />

                <div className="relative flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-gold/20 bg-gold/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    {testimonial.badge}
                  </span>
                  <Quote className="size-4 text-gold/80" aria-hidden="true" />
                </div>

                <p className="relative mt-5 text-[1rem] leading-7 text-charcoal">
                  {testimonial.quote}
                </p>

                <div className="relative mt-6 flex items-center gap-4 border-t border-charcoal/[0.08] pt-5">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gold/25 bg-warm-white">
                    <Image
                      src={testimonial.image}
                      alt={`Retrato de ${testimonial.name}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal">
                      {testimonial.name}
                    </p>
                    <p className="text-sm leading-5 text-text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}
