import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BrandCarousel } from "@/components/ui/BrandCarousel";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AngleDivider } from "@/components/svg/SectionDividers";

const PARTS_BRANDS = [
  { name: "Bosch" },
  { name: "Zexel" },
  { name: "Delphi" },
  { name: "Denso" },
  { name: "Stanadyne" },
  { name: "CAV / Lucas" },
  { name: "Ambac" },
  { name: "Roto-Diesel" },
  { name: "Yanmar" },
  { name: "Caterpillar" },
];

const VEHICLE_BRANDS = [
  { name: "Chevrolet" },
  { name: "Cummins" },
  { name: "International" },
  { name: "SsangYong" },
  { name: "Hyundai" },
  { name: "Mitsubishi" },
  { name: "Toyota" },
  { name: "Nissan" },
  { name: "Ford" },
  { name: "Mazda" },
  { name: "Kia" },
];

/**
 * Section Transition Map — dividers are INSIDE each section as last child.
 *
 *   Hero             (charcoal)     — no divider (same bg as Story)
 *   Story            (charcoal)     — WaveDivider → warm-white (inside Story)
 *   Brand Carousel 1 (warm-white)   — no divider (same bg as Services)
 *   Services         (warm-white)   — GearToothDivider → charcoal (inside Services)
 *   Technology       (charcoal)     — WaveDivider → warm-white (inside Technology)
 *   Brand Carousel 2 (warm-white)   — AngleDivider → charcoal (inside wrapper here)
 *   Stats            (charcoal)     — DoubleWaveDivider → warm-white (inside Stats)
 *   Trust            (warm-white)   — GearToothDivider → charcoal (inside Trust)
 *   Contact          (charcoal)     — no divider (last section)
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <HeroSection />

        {/* Hero (charcoal) → Story (charcoal): same bg, no divider */}
        <StorySection />

        {/* Story has WaveDivider inside → Brand Carousel */}
        <div className="bg-warm-white px-4 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
              Marcas de repuestos con las que trabajamos
            </p>
            <BrandCarousel brands={PARTS_BRANDS} direction="left" speed="slow" />
          </div>
        </div>

        {/* Brand Carousel (warm-white) → Services (warm-white): same bg */}
        <ServicesSection />

        {/* Services has GearToothDivider inside → Technology */}
        <TechnologySection />

        {/* Technology has WaveDivider inside → Brand Carousel 2 */}
        <div className="relative overflow-hidden bg-warm-white px-4 pb-28 pt-8 md:pb-36 md:pt-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
              Marcas de vehículos que atendemos
            </p>
            <BrandCarousel brands={VEHICLE_BRANDS} direction="right" speed="normal" />
          </div>
          {/* Shaped transition to Stats (charcoal) */}
          <AngleDivider fill="var(--color-charcoal)" />
        </div>

        {/* Brand Carousel has AngleDivider inside → Stats */}
        <StatsSection />

        {/* Stats has DoubleWaveDivider inside → Trust */}
        <TrustSection />

        {/* Trust has GearToothDivider inside → Contact */}
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
