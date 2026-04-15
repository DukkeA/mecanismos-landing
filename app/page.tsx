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
import {
  WaveDivider,
  AngleDivider,
  GearToothDivider,
  DoubleWaveDivider,
} from "@/components/svg/SectionDividers";

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

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <HeroSection />

        {/* Hero → Story: organic wave transition */}
        <WaveDivider fill="var(--color-warm-white)" className="-mt-1 bg-charcoal" />

        <StorySection />

        {/* Story → Brand Carousel: angle cut */}
        <AngleDivider fill="var(--color-warm-white)" className="-mt-1 bg-charcoal" />

        {/* Brand Carousel #1 — Repuestos */}
        <div className="bg-warm-white px-4 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
              Marcas de repuestos con las que trabajamos
            </p>
            <BrandCarousel brands={PARTS_BRANDS} direction="left" speed="slow" />
          </div>
        </div>

        <ServicesSection />

        {/* Services → Technology: gear tooth (mechanical feel) */}
        <GearToothDivider fill="var(--color-charcoal)" className="-mb-1 bg-warm-white" />

        <TechnologySection />

        {/* Technology → Brand Carousel: wave transition */}
        <WaveDivider fill="var(--color-warm-white)" className="-mt-1 bg-charcoal" />

        {/* Brand Carousel #2 — Vehículos */}
        <div className="bg-warm-white px-4 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
              Marcas de vehículos que atendemos
            </p>
            <BrandCarousel brands={VEHICLE_BRANDS} direction="right" speed="normal" />
          </div>
        </div>

        {/* Brand Carousel → Stats: angle cut to dark section */}
        <AngleDivider fill="var(--color-charcoal)" className="-mb-1 bg-warm-white" />

        <StatsSection />

        {/* Stats → Trust: double wave (dark to light) */}
        <DoubleWaveDivider fill="var(--color-warm-white)" className="-mt-1 bg-charcoal" />

        <TrustSection />

        {/* Trust → Contact: gear tooth (light to dark) */}
        <GearToothDivider fill="var(--color-charcoal)" className="-mb-1 bg-warm-white" />

        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
