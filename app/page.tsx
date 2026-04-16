import { NavDock } from "@/components/ui/nav-dock";
import { Footer } from "@/components/layout/Footer";
import { BrandCarousel } from "@/components/ui/BrandCarousel";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { TeamSection } from "@/components/sections/TeamSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ContactSection } from "@/components/sections/ContactSection";

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
      <NavDock />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            Section Color Map (for divider reference):
            Hero:             charcoal
            Story:            charcoal
            Brand Carousel 1: warm-white
            Services:         warm-white
            Technology:       charcoal
            Team:             warm-white
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

        {/* Technology (charcoal) → Team (warm-white) via Technology divider */}

        <TeamSection vehicleBrands={VEHICLE_BRANDS} />

        {/* Team (warm-white) → Stats: divider is INSIDE StatsSection */}

        <StatsSection />

        {/* Stats → Trust: divider is INSIDE StatsSection */}

        <TrustSection />

        {/* Trust → Contact + Footer: shared background wrapper */}

        <div className="noise-overlay relative overflow-hidden">
          {/* Shared multi-layer background */}
          <div className="absolute inset-0 bg-charcoal" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,_rgba(201,169,110,0.12),_transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_30%,_rgba(184,184,184,0.06),_transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(201,169,110,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.4) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
