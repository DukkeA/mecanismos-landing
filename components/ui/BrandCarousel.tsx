type Brand = {
  name: string;
  logo?: string;
};

type BrandCarouselProps = {
  brands: Brand[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
};

const SPEED_MAP: Record<NonNullable<BrandCarouselProps["speed"]>, string> = {
  slow: "42s",
  normal: "30s",
  fast: "20s",
};

export function BrandCarousel({
  brands,
  direction = "left",
  speed = "normal",
  className = "",
}: BrandCarouselProps) {
  const items = [...brands, ...brands];
  const animationClass =
    direction === "right" ? "animate-marquee-reverse" : "animate-marquee";

  if (brands.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-charcoal/10 py-4 ${className}`.trim()}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex min-w-max items-center gap-4 ${animationClass}`}
        style={{ animationDuration: SPEED_MAP[speed] }}
      >
        {items.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="group flex min-w-[11rem] items-center justify-center rounded-full border border-charcoal/12 bg-transparent px-6 py-3 text-center text-sm font-semibold tracking-[0.24em] text-charcoal/60 uppercase transition-all duration-300 hover:border-gold/60 hover:text-gold"
          >
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto max-w-[120px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
              />
            ) : (
              <span className="font-mono text-[0.72rem]">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarousel;
