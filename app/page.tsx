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
        {/* ══════════════════════════════════════════════════════
            Section Color Map (for divider reference):
            Hero:             charcoal
            Story:            charcoal
            Brand Carousel 1: warm-white
            Services:         warm-white
            Technology:       charcoal
            Brand Carousel 2: warm-white
            Stats:            charcoal
            Trust:            warm-white
            Contact:          charcoal
        ══════════════════════════════════════════════════════ */}

        {/* Wrapper ensures charcoal backs the Hero ↔ Story zone */}
        <div className="relative bg-charcoal">
          <HeroSection />

          {/* Hero (charcoal) → Story (charcoal): wave clip mask on Story top */}

          <StorySection />
        </div>

        {/* Services section — Brand Carousel #1 lives inside for shared bg.
            Wave divider renders inside Services at the top (absolute). */}

        <ServicesSection
          brandCarousel={
            <>
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                Marcas de repuestos con las que trabajamos
              </p>
              <BrandCarousel brands={PARTS_BRANDS} direction="left" speed="slow" />
            </>
          }
        />

        {/* Services (warm-white) → Technology: divider is INSIDE TechnologySection */}

        <TechnologySection />

        {/* Brand Carousel #2 — Vehículos */}
        <div className="bg-warm-white px-4 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
              Marcas de vehículos que atendemos
            </p>
            <BrandCarousel brands={VEHICLE_BRANDS} direction="right" speed="normal" />
          </div>
        </div>

        {/* Brand Carousel (warm-white) → Stats: divider is INSIDE StatsSection */}

        <StatsSection />

        {/* Stats → Trust: divider is INSIDE StatsSection */}

        <TrustSection />

        {/* Trust → Contact: divider is INSIDE ContactSection */}

        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
