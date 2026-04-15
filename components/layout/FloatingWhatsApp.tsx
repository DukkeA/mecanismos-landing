"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-7 w-7"
    >
      <path d="M19.1 4.9A9.9 9.9 0 0 0 3.2 16.6L2 22l5.5-1.1a9.9 9.9 0 0 0 4.7 1.2h0A9.9 9.9 0 0 0 19.1 4.9Zm-6.9 15.5h0a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.2.7.7-3.1-.2-.3a8.2 8.2 0 1 1 7.2 4Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.3 0-.4.1-.6l.4-.5.2-.4a.6.6 0 0 0 0-.5c-.1-.1-.6-1.4-.9-1.9-.2-.5-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.4 2.9 2.9 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.3 3.9 2.6 1.1 2.6.8 3.1.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");

    if (!hero) {
      const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.65);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`group fixed right-5 bottom-5 z-50 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Abrir conversación por WhatsApp"
        onClick={() => openWhatsApp()}
        className="animate-whatsapp-pulse relative inline-flex h-16 w-16 items-center justify-center rounded-full text-pure-white shadow-[0_20px_35px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105"
        style={{ backgroundColor: "#25D366" }}
      >
        <WhatsAppIcon />
      </button>

      <span className="pointer-events-none absolute right-20 top-1/2 hidden -translate-y-1/2 rounded-full bg-charcoal px-4 py-2 text-sm font-medium whitespace-nowrap text-pure-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 md:block">
        ¡Escríbenos por WhatsApp!
      </span>
    </div>
  );
}

export default FloatingWhatsApp;
