"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BrandCarousel } from "@/components/ui/BrandCarousel";
import { prefersReducedMotion } from "@/lib/animations";
import { gsap, useGSAP, registerGSAPPlugins } from "@/lib/gsap-register";

registerGSAPPlugins();

type Brand = {
  name: string;
  logo?: string;
};

type IntroScene = {
  role: string;
  name: string;
  headline: string;
  description: string;
  detail: string;
  image: string;
  label: string;
  accentClass: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  quote: string;
  metric: string;
  metricLabel: string;
  image: string;
  label: string;
  desktopPosition: string;
};

const INTRO_SCENES: readonly IntroScene[] = [
  {
    role: "Fundador",
    name: "Luis Alfredo Duque",
    headline: "La obsesión por el detalle empezó con una sola mesa de trabajo.",
    description:
      "Luis Alfredo Duque imaginó un taller ficticio donde cada bomba, inyector y transmisión se tratara como una pieza de reloj. Su método: escuchar primero, medir después y devolver sólo cuando la máquina responde con exactitud.",
    detail: "Diagnóstico fino · criterio artesanal · liderazgo técnico",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1400&q=80&auto=format&fit=crop",
    label: "Retrato ficcional del fundador Luis Alfredo Duque",
    accentClass:
      "bg-[radial-gradient(circle_at_18%_28%,_rgba(201,169,110,0.18),_transparent_34%)]",
  },
  {
    role: "Fundadora",
    name: "Arabella Cadena",
    headline: "Del oficio a la metodología: precisión, proceso y cultura de laboratorio.",
    description:
      "Arabella Cadena llevó la operación ficticia un paso más lejos: ordenó procesos, creó estándares y convirtió el conocimiento del taller en una disciplina compartida. Su visión hizo que cada reparación hablara el mismo idioma de calidad.",
    detail: "Laboratorio interno · trazabilidad · cultura de excelencia",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de la fundadora Arabella Cadena",
    accentClass:
      "bg-[radial-gradient(circle_at_78%_22%,_rgba(184,184,184,0.22),_transparent_36%)]",
  },
] as const;

const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "luis",
    name: "Luis Alfredo Duque",
    role: "Fundador · Dirección técnica",
    specialty: "Ajuste fino y criterio de diagnóstico",
    bio: "Define los estándares de prueba, escucha síntomas antes de tocar una llave y convierte casos ambiguos en rutas de solución claras para el resto del equipo.",
    quote:
      "La precisión no arranca en el banco de pruebas: arranca en cómo mirás el problema.",
    metric: "27 años",
    metricLabel: "de oficio acumulado",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Luis Alfredo Duque",
    desktopPosition: "left-[4%] top-[10%] w-[28%] aspect-[0.82]",
  },
  {
    id: "arabella",
    name: "Arabella Cadena",
    role: "Fundadora · Cultura operativa",
    specialty: "Procesos, trazabilidad y control documental",
    bio: "Toma el conocimiento del taller y lo convierte en método: checklists, flujo de laboratorio, seguimiento de piezas y una cultura donde cada paso queda respaldado.",
    quote:
      "Un taller crece de verdad cuando la excelencia deja de depender de la memoria y pasa a vivir en el sistema.",
    metric: "100%",
    metricLabel: "de trazabilidad interna",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Arabella Cadena",
    desktopPosition: "left-[36%] top-[2%] w-[24%] aspect-[0.76]",
  },
  {
    id: "mateo",
    name: "Mateo Rincón",
    role: "Banco de pruebas Common Rail",
    specialty: "Lectura de curvas, caudal y presión dinámica",
    bio: "Opera el banco como si fuera un instrumento musical: interpreta desviaciones mínimas y deja cada ciclo de prueba listo para comparación fina.",
    quote:
      "Si la curva no canta limpio, todavía no terminamos.",
    metric: "4.800+",
    metricLabel: "pruebas registradas",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Mateo Rincón",
    desktopPosition: "right-[8%] top-[12%] w-[22%] aspect-[0.82]",
  },
  {
    id: "salome",
    name: "Salomé Varela",
    role: "Diagnóstico electrónico",
    specialty: "Lectura de fallas y correlación con comportamiento real",
    bio: "Cruza códigos, síntomas y contexto mecánico para distinguir entre ruido electrónico y causa raíz. Su fuerte es encontrar lo que parece intermitente.",
    quote:
      "No todo error de pantalla merece la misma sospecha.",
    metric: "93%",
    metricLabel: "de hallazgos en primer barrido",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Salomé Varela",
    desktopPosition: "left-[11%] bottom-[12%] w-[23%] aspect-[0.8]",
  },
  {
    id: "samuel",
    name: "Samuel Cárdenas",
    role: "Transmisiones automáticas",
    specialty: "Despiece, montaje y calibración de tolerancias",
    bio: "Tiene la paciencia del relojero y la memoria del ensamblador. Se mueve cómodo en piezas complejas donde un desajuste mínimo arruina todo el conjunto.",
    quote:
      "El secreto no es armar rápido: es cerrar sin dejar preguntas.",
    metric: "1.300+",
    metricLabel: "conjuntos recuperados",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Samuel Cárdenas",
    desktopPosition: "left-[41%] bottom-[4%] w-[26%] aspect-[0.78]",
  },
  {
    id: "clara",
    name: "Clara Villamil",
    role: "Coordinación de laboratorio",
    specialty: "Secuencia operativa y liberación final",
    bio: "Orquesta entradas, pruebas, trazas y entregas para que el taller funcione como una sola cadena. Es quien garantiza que el ritmo no rompa la calidad.",
    quote:
      "La velocidad sirve sólo cuando todos avanzan con la misma claridad.",
    metric: "15 min",
    metricLabel: "promedio entre estaciones",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&q=80&auto=format&fit=crop",
    label: "Retrato ficcional de Clara Villamil",
    desktopPosition: "right-[4%] bottom-[14%] w-[24%] aspect-[0.84]",
  },
] as const;

const TEAM_STEPS = ["Fundador", "Fundadora", "Equipo interactivo"] as const;

interface TeamSectionProps {
  id?: string;
  vehicleBrands: Brand[];
}

export function TeamSection({ id = "equipo", vehicleBrands }: TeamSectionProps) {
  const [activeMemberId, setActiveMemberId] = useState(TEAM_MEMBERS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const activeMember =
    TEAM_MEMBERS.find((member) => member.id === activeMemberId) ?? TEAM_MEMBERS[0];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const stage = stageRef.current;
      if (!stage) return;

      const introScenes = gsap.utils.toArray<HTMLElement>("[data-team-intro-scene]");
      const introVisuals = gsap.utils.toArray<HTMLElement>("[data-team-intro-visual]");
      const progressFills = gsap.utils.toArray<HTMLElement>(
        "[data-team-progress-fill]",
      );
      const collageScene = stage.querySelector<HTMLElement>("[data-team-collage-scene]");
      const collageCards = gsap.utils.toArray<HTMLElement>("[data-team-member-card]");
      const collageToggles = gsap.utils.toArray<HTMLElement>(
        "[data-team-member-toggle]",
      );

      if (
        introScenes.length !== INTRO_SCENES.length ||
        introVisuals.length !== INTRO_SCENES.length ||
        !collageScene
      ) {
        return;
      }

      gsap.set([...introScenes, collageScene], { autoAlpha: 0 });
      gsap.set(introScenes[0], { autoAlpha: 1 });

      gsap.set(introVisuals[0], {
        scale: 1,
        transformOrigin: "center center",
      });
      gsap.set(introVisuals[1], {
        scale: 1.12,
        transformOrigin: "center center",
      });

      gsap.set(collageScene, {
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
        transformOrigin: "center center",
      });
      gsap.set([...collageCards, ...collageToggles], { autoAlpha: 0, y: 24 });

      gsap.set(progressFills, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      if (progressFills[0]) {
        gsap.set(progressFills[0], { scaleX: 1 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(introVisuals[0], { scale: 1.18, ease: "none" }, 0)
        .to(introScenes[0], { autoAlpha: 0, ease: "none" }, 0.28)
        .to(introScenes[1], { autoAlpha: 1, ease: "none" }, 0.28)
        .fromTo(introVisuals[1], { scale: 1.12 }, { scale: 1, ease: "none" }, 0.28)
        .to(progressFills[1], { scaleX: 1, ease: "none" }, 0.4)
        .to(introVisuals[1], { scale: 1.16, ease: "none" }, 1.14)
        .to(introScenes[1], { autoAlpha: 0, ease: "none" }, 1.44)
        .to(collageScene, { autoAlpha: 1, y: 0, scale: 1, ease: "none" }, 1.44)
        .to(progressFills[2], { scaleX: 1, ease: "none" }, 1.58)
        .to(collageCards, { autoAlpha: 1, y: 0, stagger: 0.05, ease: "none" }, 1.62)
        .to(
          collageToggles,
          { autoAlpha: 1, y: 0, stagger: 0.04, ease: "none" },
          1.72,
        );
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const detail = detailRef.current;
      if (!detail) return;

      gsap.fromTo(
        detail.querySelectorAll("[data-team-detail-animate]"),
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: prefersReducedMotion() ? 0.01 : 0.5,
          stagger: prefersReducedMotion() ? 0 : 0.06,
          ease: "power2.out",
        },
      );
    },
    {
      scope: detailRef,
      dependencies: [activeMemberId],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="noise-overlay relative overflow-hidden bg-warm-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(201,169,110,0.12),_transparent_30%),radial-gradient(circle_at_85%_28%,_rgba(184,184,184,0.14),_transparent_38%),linear-gradient(180deg,_rgba(247,245,240,0.96),_rgba(247,245,240,0.98))]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,45,45,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,45,45,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        ref={stageRef}
        className="relative min-h-[100svh] overflow-hidden motion-reduce:hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-8 md:flex-row md:items-start md:justify-between md:px-10 md:pt-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              Equipo
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              Del oficio fundador al <span className="text-gradient-gold">sistema humano</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
              Primero ves a quienes trazaron el estándar. Después, el taller se abre como una constelación interactiva donde cada perfil ocupa un rol visible.
            </p>
          </div>

          <div className="grid gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-charcoal/55 md:min-w-[19rem]">
            {TEAM_STEPS.map((step, index) => (
              <div key={step} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span>{step}</span>
                  <span className="text-charcoal/30">0{index + 1}</span>
                </div>
                <div className="h-px overflow-hidden rounded-full bg-charcoal/10">
                  <div
                    data-team-progress-fill
                    className="h-full w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/12" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[54rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-charcoal/[0.06]" />

        {INTRO_SCENES.map((scene) => (
          <article
            key={scene.name}
            data-team-intro-scene
            className="absolute inset-0"
          >
            <div className={`absolute inset-0 ${scene.accentClass}`} />

            <div className="relative z-20 mx-auto grid h-full max-w-7xl items-center gap-10 px-6 pb-20 pt-40 md:px-10 md:pb-16 md:pt-36 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
              <div className="order-2 lg:order-1">
                <div className="max-w-xl rounded-[2rem] border border-charcoal/10 bg-pure-white/72 p-7 shadow-[0_40px_120px_-60px_rgba(45,45,45,0.38)] backdrop-blur-xl md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                    {scene.role}
                  </p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
                    {scene.name}
                  </h3>
                  <p className="mt-5 text-xl leading-snug text-charcoal md:text-2xl">
                    {scene.headline}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
                    {scene.description}
                  </p>
                  <div className="mt-6 inline-flex rounded-full border border-charcoal/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-charcoal/60">
                    {scene.detail}
                  </div>
                </div>
              </div>

              <div
                data-team-intro-visual
                className="order-1 relative h-[54vh] min-h-[24rem] overflow-hidden rounded-[2.5rem] border border-charcoal/10 bg-charcoal shadow-[0_45px_140px_-70px_rgba(45,45,45,0.45)] lg:order-2 lg:h-[72vh]"
              >
                <Image
                  alt={scene.label}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  src={scene.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(45,45,45,0.18),_transparent_35%,_rgba(45,45,45,0.55)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-pure-white/15 bg-charcoal/40 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-pure-white/80 backdrop-blur-md md:left-8 md:top-8">
                  {scene.role}
                </div>
              </div>
            </div>
          </article>
        ))}

        <article data-team-collage-scene className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(201,169,110,0.14),_transparent_42%)]" />

          <div className="relative z-20 mx-auto grid h-full max-w-7xl items-center gap-8 px-6 pb-16 pt-40 md:px-10 md:pt-36 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-[4.5rem]">
            <div className="order-1">
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-3">
                  {TEAM_MEMBERS.map((member) => {
                    const isActive = member.id === activeMember.id;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        data-team-member-card
                        onClick={() => setActiveMemberId(member.id)}
                        className={`relative min-h-[10rem] overflow-hidden rounded-[1.5rem] border text-left transition-all duration-500 ${
                          isActive
                            ? "border-gold/50 shadow-[0_24px_80px_-40px_rgba(201,169,110,0.55)]"
                            : "border-charcoal/10 opacity-85 hover:opacity-100"
                        }`}
                      >
                        <Image
                          alt={member.label}
                          className={`object-cover transition-transform duration-500 ${
                            isActive ? "scale-105" : "scale-100"
                          }`}
                          fill
                          sizes="50vw"
                          src={member.image}
                        />
                        <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? "bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" : "bg-charcoal/35"}`} />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pure-white/85">
                            {member.name}
                          </p>
                          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-pure-white/60">
                            {member.role}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative hidden h-[68vh] min-h-[30rem] rounded-[2.75rem] border border-charcoal/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.64),_rgba(255,255,255,0.28))] p-4 shadow-[0_55px_140px_-80px_rgba(45,45,45,0.38)] backdrop-blur-xl md:block">
                <div className="absolute inset-6 rounded-[2.4rem] border border-charcoal/8" />

                {TEAM_MEMBERS.map((member) => {
                  const isActive = member.id === activeMember.id;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      data-team-member-card
                      onClick={() => setActiveMemberId(member.id)}
                      className={`absolute overflow-hidden rounded-[1.85rem] border text-left transition-all duration-500 ${member.desktopPosition} ${
                        isActive
                          ? "z-20 scale-[1.05] border-gold/55 shadow-[0_32px_95px_-45px_rgba(201,169,110,0.65)]"
                          : "z-10 border-charcoal/10 opacity-80 hover:-translate-y-1 hover:opacity-100 hover:border-gold/35"
                      }`}
                    >
                      <Image
                        alt={member.label}
                        className={`object-cover transition-transform duration-500 ${
                          isActive ? "scale-105" : "scale-100"
                        }`}
                        fill
                        sizes="(max-width: 1280px) 22vw, 18vw"
                        src={member.image}
                      />
                      <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? "bg-[linear-gradient(180deg,_rgba(45,45,45,0.08),_rgba(45,45,45,0.58))]" : "bg-[linear-gradient(180deg,_rgba(45,45,45,0.24),_rgba(45,45,45,0.62))]"}`} />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pure-white/80">
                          {member.name}
                        </p>
                        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-pure-white/58">
                          {member.specialty}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="order-2">
              <div className="rounded-[2rem] border border-charcoal/10 bg-pure-white/76 p-6 shadow-[0_40px_120px_-70px_rgba(45,45,45,0.38)] backdrop-blur-xl md:p-8 lg:p-10">
                <div ref={detailRef}>
                  <div key={activeMember.id} className="space-y-5">
                    <p
                      data-team-detail-animate
                      className="text-xs font-semibold uppercase tracking-[0.28em] text-gold"
                    >
                      Miembro destacado
                    </p>
                    <div data-team-detail-animate>
                      <h3 className="text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
                        {activeMember.name}
                      </h3>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/55 md:text-[0.78rem]">
                        {activeMember.role}
                      </p>
                    </div>
                    <p
                      data-team-detail-animate
                      className="text-xl leading-snug text-charcoal md:text-2xl"
                    >
                      {activeMember.specialty}
                    </p>
                    <p
                      data-team-detail-animate
                      className="text-base leading-relaxed text-text-muted md:text-lg"
                    >
                      {activeMember.bio}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                      <div
                        data-team-detail-animate
                        className="rounded-[1.5rem] border border-charcoal/10 bg-warm-white/80 px-5 py-4"
                      >
                        <p className="text-3xl font-bold tracking-tight text-gold md:text-4xl">
                          {activeMember.metric}
                        </p>
                        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-text-muted">
                          {activeMember.metricLabel}
                        </p>
                      </div>
                      <blockquote
                        data-team-detail-animate
                        className="rounded-[1.5rem] border border-charcoal/10 px-5 py-4 text-sm leading-relaxed text-charcoal/75 md:text-base"
                      >
                        “{activeMember.quote}”
                      </blockquote>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3 border-t border-charcoal/10 pt-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-charcoal/45">
                    Seleccioná un perfil
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TEAM_MEMBERS.map((member) => {
                      const isActive = member.id === activeMember.id;

                      return (
                        <button
                          key={member.id}
                          type="button"
                          data-team-member-toggle
                          aria-pressed={isActive}
                          onClick={() => setActiveMemberId(member.id)}
                          className={`rounded-[1.25rem] border px-4 py-3 text-left transition-all duration-300 ${
                            isActive
                              ? "border-charcoal bg-charcoal text-pure-white shadow-[0_20px_50px_-35px_rgba(45,45,45,0.45)]"
                              : "border-charcoal/10 bg-transparent text-charcoal hover:border-gold/45 hover:text-gold-dark"
                          }`}
                        >
                          <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                            {member.name}
                          </p>
                          <p
                            className={`mt-1 text-[0.68rem] uppercase tracking-[0.22em] ${
                              isActive ? "text-pure-white/65" : "text-text-muted"
                            }`}
                          >
                            {member.role}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="relative z-20 hidden px-6 py-20 motion-reduce:block md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              Equipo
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              El talento detrás de cada ajuste, prueba y entrega.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {INTRO_SCENES.map((scene) => (
              <article
                key={scene.name}
                className="grid gap-6 overflow-hidden rounded-[2.25rem] border border-charcoal/10 bg-pure-white/70 p-5 shadow-[0_30px_80px_-60px_rgba(45,45,45,0.35)] backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr] md:p-8"
              >
                <div className="relative min-h-[18rem] overflow-hidden rounded-[1.8rem] bg-charcoal md:min-h-[24rem]">
                  <Image
                    alt={scene.label}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    src={scene.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                    {scene.role}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
                    {scene.name}
                  </h3>
                  <p className="mt-4 text-xl leading-snug text-charcoal">
                    {scene.headline}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
                    {scene.description}
                  </p>
                </div>
              </article>
            ))}

            <div className="rounded-[2.25rem] border border-charcoal/10 bg-pure-white/70 p-5 shadow-[0_30px_80px_-60px_rgba(45,45,45,0.35)] backdrop-blur-xl md:p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight text-charcoal md:text-3xl">
                Vista colectiva
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
                En modo de movimiento reducido dejamos el tercer acto como una composición interactiva estable: podés recorrer nombres y detalles sin el pin de scroll.
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {TEAM_MEMBERS.map((member) => {
                    const isActive = member.id === activeMember.id;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => setActiveMemberId(member.id)}
                        className={`relative min-h-[10rem] overflow-hidden rounded-[1.5rem] border text-left transition-all duration-300 ${
                          isActive
                            ? "border-gold/50 shadow-[0_24px_80px_-40px_rgba(201,169,110,0.55)]"
                            : "border-charcoal/10"
                        }`}
                      >
                        <Image
                          alt={member.label}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 50vw, 20vw"
                          src={member.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pure-white/80">
                            {member.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-[1.75rem] border border-charcoal/10 bg-warm-white/75 p-5">
                  <h4 className="text-2xl font-bold tracking-tight text-charcoal">
                    {activeMember.name}
                  </h4>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/55">
                    {activeMember.role}
                  </p>
                  <p className="mt-5 text-lg leading-snug text-charcoal">
                    {activeMember.specialty}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-text-muted">
                    {activeMember.bio}
                  </p>
                  <blockquote className="mt-5 text-sm leading-relaxed text-charcoal/75">
                    “{activeMember.quote}”
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-charcoal/10 px-6 py-12 md:px-10 md:py-16">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
          Vehículos que atendemos
        </p>
        <BrandCarousel
          brands={vehicleBrands}
          direction="right"
          speed="normal"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default TeamSection;
