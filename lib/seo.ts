import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "Mecanismos Técnicos | Especialistas en Diésel desde 1999",
  description:
    "Más de 25 años de experiencia en reparación de sistemas de inyección diésel, motores diésel y transmisiones automáticas. Equipos de última tecnología y personal altamente capacitado en Bogotá.",
  keywords: [
    "inyección diésel",
    "reparación bombas diésel",
    "inyectores diésel",
    "motores diésel",
    "transmisiones automáticas",
    "taller diésel Bogotá",
    "Mecanismos Técnicos",
    "Bosch",
    "Delphi",
    "Cummins",
  ],
  authors: [{ name: "Mecanismos Técnicos" }],
  openGraph: {
    title: "Mecanismos Técnicos | Especialistas en Diésel desde 1999",
    description:
      "Más de 25 años reparando sistemas de inyección diésel, motores y transmisiones automáticas con tecnología de punta en Bogotá.",
    locale: "es_CO",
    type: "website",
    siteName: "Mecanismos Técnicos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mecanismos Técnicos | Especialistas en Diésel",
    description:
      "Más de 25 años de precisión diésel en Bogotá. Inyección, motores y transmisiones automáticas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Mecanismos Técnicos",
    description:
      "Taller especializado en reparación de sistemas de inyección diésel, motores diésel y transmisiones automáticas con más de 25 años de experiencia.",
    url: "https://mecanismostecnicos.com",
    telephone: "+573105614469",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrera 16 #8-04",
      addressLocality: "Bogotá",
      addressRegion: "D.C.",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.6097,
      longitude: -74.0817,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Bogotá",
    },
    priceRange: "$$",
    image: "https://mecanismostecnicos.com/og-image.jpg",
    sameAs: [],
  };
}
