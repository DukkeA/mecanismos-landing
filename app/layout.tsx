import { Geist, Geist_Mono } from "next/font/google";
import { siteMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        {/* Global SVG clipPath definitions — placed in the server-rendered layout
            so every client component can reference them via clip-path: url(#id).
            Inline SVG clipPaths inside client components fail to resolve. */}
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          style={{ position: "absolute" }}
        >
          <defs>
            {/* Wave used for Story → Services transition */}
            <clipPath
              id="wave-clip-story-services"
              clipPathUnits="objectBoundingBox"
            >
              <path d="M0,0.06 C0.15,0 0.3,0.08 0.5,0.04 C0.7,0 0.85,0.08 1,0.03 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
