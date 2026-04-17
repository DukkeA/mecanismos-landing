"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { GearSVG } from "@/components/svg/GearSVG";
import { DURATION, EASE, SCROLL_DEFAULTS } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";
import { cn } from "@/lib/utils";

registerGSAPPlugins();

export type PartsBrandItem = {
  name: string;
  logo?: string;
  orbit?: 0 | 1 | 2;
};

type EnrichedBrand = PartsBrandItem & {
  orbit: 0 | 1 | 2;
};

const BRAND_ORBITS: Record<string, 0 | 1 | 2> = {
  Bosch: 0,
  Delphi: 0,
  Denso: 0,
  Zexel: 1,
  Stanadyne: 1,
  Ambac: 1,
  "CAV / Lucas": 2,
  "Roto-Diesel": 2,
  Yanmar: 2,
  Caterpillar: 2,
};

const ORBIT_SIZES = [16.5, 24.5, 33] as const;
const ORBIT_DURATIONS = [28, 40, 56] as const;

function enrichBrand(brand: PartsBrandItem, index: number): EnrichedBrand {
  return {
    ...brand,
    orbit: brand.orbit ?? BRAND_ORBITS[brand.name] ?? ((index % 3) as 0 | 1 | 2),
  };
}

function orbitify(brands: readonly EnrichedBrand[]) {
  const grouped: EnrichedBrand[][] = [[], [], []];

  brands.forEach((brand) => {
    grouped[brand.orbit].push(brand);
  });

  return grouped;
}

function BrandLogoMark({
  brand,
  className,
}: Readonly<{
  brand: PartsBrandItem;
  className?: string;
}>) {
  if (brand.logo) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" aria-hidden="true" className={cn("h-auto w-full object-contain", className)} src={brand.logo} />
      </>
    );
  }

  return (
    <svg aria-hidden="true" className={cn("h-auto w-full", className)} fill="none" viewBox="0 0 180 48">
      {brand.name === "Bosch" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="900" letterSpacing="4" textAnchor="middle">
          BOSCH
        </text>
      ) : brand.name === "Delphi" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontStyle="italic" fontWeight="800" letterSpacing="1.5" textAnchor="middle">
          Delphi
        </text>
      ) : brand.name === "Denso" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="900" letterSpacing="2.2" textAnchor="middle">
          DENSO
        </text>
      ) : brand.name === "Zexel" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="29" fontStyle="italic" fontWeight="800" letterSpacing="1.2" textAnchor="middle">
          Zexel
        </text>
      ) : brand.name === "Stanadyne" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="800" letterSpacing="2" textAnchor="middle">
          STANADYNE
        </text>
      ) : brand.name === "Ambac" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="800" letterSpacing="2.6" textAnchor="middle">
          AMBAC
        </text>
      ) : brand.name === "CAV / Lucas" ? (
        <>
          <text x="38%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="800" letterSpacing="2" textAnchor="middle">
            CAV
          </text>
          <path d="M82 24H98" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
          <text x="69%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" fontStyle="italic" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
            Lucas
          </text>
        </>
      ) : brand.name === "Roto-Diesel" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="800" letterSpacing="1.2" textAnchor="middle">
          ROTO-DIESEL
        </text>
      ) : brand.name === "Yanmar" ? (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="900" letterSpacing="2.5" textAnchor="middle">
          YANMAR
        </text>
      ) : brand.name === "Caterpillar" ? (
        <>
          <text x="50%" y="47%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="29" fontWeight="900" letterSpacing="2.5" textAnchor="middle">
            CAT
          </text>
          <path d="M97 29L105 39H89L97 29Z" fill="#C9A96E" />
        </>
      ) : (
        <text x="50%" y="50%" dominantBaseline="middle" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="24" fontWeight="800" letterSpacing="1.6" textAnchor="middle">
          {brand.name}
        </text>
      )}
    </svg>
  );
}

export function PartsBrandsFeatureSection({
  brands,
  className,
}: Readonly<{
  brands: readonly PartsBrandItem[];
  className?: string;
}>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const enrichedBrands = useMemo(() => brands.map(enrichBrand), [brands]);
  const orbitGroups = useMemo(() => orbitify(enrichedBrands), [enrichedBrands]);

  useGSAP(
    () => {
      if (reduceMotion || !containerRef.current) return;

      gsap.from("[data-parts-copy]", {
        y: 38,
        opacity: 0,
        duration: DURATION.reveal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          ...SCROLL_DEFAULTS,
        },
      });

      gsap.from("[data-parts-orbit]", {
        x: 64,
        opacity: 0,
        duration: DURATION.slow,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          ...SCROLL_DEFAULTS,
        },
      });
    },
    { scope: containerRef },
  );

  if (enrichedBrands.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef} className={cn("relative mx-auto max-w-7xl px-6 md:px-10", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,_rgba(201,169,110,0.12),_transparent_28%),radial-gradient(circle_at_12%_18%,_rgba(184,184,184,0.08),_transparent_28%)]" />

      <div className="relative grid gap-10 md:min-h-[28rem] md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] md:items-center lg:gap-14">
        <div data-parts-copy className="relative z-10 max-w-lg md:pr-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Marcas de repuestos
          </p>

          <h3 className="mt-5 text-3xl font-bold tracking-tight text-charcoal md:text-4xl lg:text-5xl">
            Fabricantes que aparecen cuando el trabajo exige precisión real.
          </h3>

          <p className="mt-5 max-w-[31rem] text-base leading-8 text-text-muted md:text-lg">
            Plataformas que conocemos en banco, diagnóstico y reparación. Sin ruido visual,
            sin relleno: sólo referencias técnicas que importan cuando el sistema tiene que
            volver a responder bien.
          </p>
        </div>

        <div data-parts-orbit className="relative hidden h-full items-center justify-center overflow-visible md:flex">
          <div className="relative h-[34rem] w-[34rem] translate-x-[10%] lg:translate-x-[14%]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/14" />
            <GearSVG className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-charcoal/12" size={70} />

            {orbitGroups.map((group, orbitIndex) => {
              const size = ORBIT_SIZES[orbitIndex];
              const duration = ORBIT_DURATIONS[orbitIndex];
              const direction = orbitIndex % 2 === 0 ? "normal" : "reverse";

              return (
                <div
                  key={`orbit-${orbitIndex}`}
                  className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-charcoal/12"
                  style={{
                    width: `${size}rem`,
                    height: `${size}rem`,
                    marginLeft: `${-(size / 2)}rem`,
                    marginTop: `${-(size / 2)}rem`,
                    animation: reduceMotion ? undefined : `parts-orbit-spin ${duration}s linear infinite`,
                    animationDirection: direction,
                  }}
                >
                  {group.map((brand, brandIndex) => {
                    const angle = -90 + (360 / group.length) * brandIndex;
                    const angleInRadians = (angle * Math.PI) / 180;
                    const x = 50 + 50 * Math.cos(angleInRadians);
                    const y = 50 + 50 * Math.sin(angleInRadians);

                    return (
                      <div
                        key={brand.name}
                        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                        }}
                      >
                        <motion.div
                          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -4 }}
                          transition={{ type: "spring", stiffness: 280, damping: 18 }}
                          className="group relative flex w-[9rem] items-center justify-center p-2 text-charcoal/58 transition-colors duration-300 hover:text-charcoal"
                          style={{
                            animation: reduceMotion ? undefined : `parts-orbit-spin ${duration}s linear infinite`,
                            animationDirection: direction === "normal" ? "reverse" : "normal",
                          }}
                        >
                          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(201,169,110,0.18),_transparent_70%)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                          <BrandLogoMark brand={brand} />
                          <span className="sr-only">{brand.name}</span>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:hidden">
          {enrichedBrands.map((brand) => (
            <div key={brand.name} className="flex min-h-12 items-center justify-center text-charcoal/68">
              <BrandLogoMark brand={brand} className="max-w-[8rem]" />
              <span className="sr-only">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes parts-orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default PartsBrandsFeatureSection;
