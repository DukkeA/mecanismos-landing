"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
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
  collageClass: string;
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
    collageClass: "col-start-1 row-start-1 col-span-5 row-span-4",
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
    collageClass: "col-start-6 row-start-1 col-span-4 row-span-3",
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
    collageClass: "col-start-10 row-start-1 col-span-3 row-span-3",
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
    collageClass: "col-start-1 row-start-5 col-span-5 row-span-3",
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
    collageClass: "col-start-6 row-start-4 col-span-4 row-span-4",
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
    collageClass: "col-start-10 row-start-4 col-span-3 row-span-4",
  },
] as const;

const TEAM_STEPS = ["Fundador", "Fundadora", "Equipo interactivo"] as const;

type TeamFlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type TeamMemberFlight = {
  memberId: string;
  startRect: TeamFlightRect;
  endRect: TeamFlightRect;
};

function getRectSnapshot(element: HTMLElement): TeamFlightRect {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

interface TeamSectionProps {
  id?: string;
  vehicleBrands: Brand[];
}

export function TeamSection({ id = "equipo", vehicleBrands }: TeamSectionProps) {
  const [activeMemberId, setActiveMemberId] = useState(TEAM_MEMBERS[0].id);
  const [memberFlight, setMemberFlight] = useState<TeamMemberFlight | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailVisualSlotRef = useRef<HTMLDivElement>(null);
  const collageVisualRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeMember =
    TEAM_MEMBERS.find((member) => member.id === activeMemberId) ?? TEAM_MEMBERS[0];
  const incomingMember = memberFlight
    ? TEAM_MEMBERS.find((member) => member.id === memberFlight.memberId) ?? null
    : null;

  const registerCollageVisual = useCallback(
    (memberId: string) => (node: HTMLDivElement | null) => {
      collageVisualRefs.current[memberId] = node;
    },
    [],
  );

  const handleSelectMember = useCallback(
    (memberId: string) => {
      if (memberId === activeMemberId || memberFlight) return;

      if (prefersReducedMotion()) {
        setActiveMemberId(memberId);
        return;
      }

      const sourceVisual = collageVisualRefs.current[memberId];
      const targetVisual = detailVisualSlotRef.current;

      if (!sourceVisual || !targetVisual) {
        setActiveMemberId(memberId);
        return;
      }

      setMemberFlight({
        memberId,
        startRect: getRectSnapshot(sourceVisual),
        endRect: getRectSnapshot(targetVisual),
      });
    },
    [activeMemberId, memberFlight],
  );

  const finishMemberFlight = useCallback(() => {
    if (!memberFlight) return;

    setActiveMemberId(memberFlight.memberId);
    setMemberFlight(null);
  }, [memberFlight]);

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
      gsap.set(collageCards, { autoAlpha: 0, y: 24 });

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
        .to(collageCards, { autoAlpha: 1, y: 0, stagger: 0.05, ease: "none" }, 1.62);
    },
    { scope: sectionRef },
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
               Primero ves a quienes trazaron el estándar. Después, el taller se abre como un mural interactivo donde cada perfil salta del collage hacia su lectura detallada.
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
              <TeamCollage
                activeMemberId={activeMember.id}
                flightMemberId={memberFlight?.memberId ?? null}
                enableRevealData
                onSelectMember={handleSelectMember}
                registerVisual={registerCollageVisual}
              />
            </div>

            <div className="order-2">
              <TeamDetailPanel
                activeMember={activeMember}
                enableMotion
                hideVisual={Boolean(memberFlight)}
                incomingMember={incomingMember}
                isTextTransitioning={Boolean(memberFlight)}
                slotRef={detailVisualSlotRef}
              />
            </div>
          </div>

          <AnimatePresence>
            {memberFlight ? (
              <TeamMemberFlightOverlay
                key={memberFlight.memberId}
                member={incomingMember ?? activeMember}
                onComplete={finishMemberFlight}
                rects={memberFlight}
              />
            ) : null}
          </AnimatePresence>
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

            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight text-charcoal md:text-3xl">
                Vista colectiva
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
                En modo de movimiento reducido dejamos el tercer acto como una composición estable: un mural más armónico a la izquierda y la lectura ampliada a la derecha, sin pin ni sobresaltos.
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div>
                  <TeamCollage
                    activeMemberId={activeMember.id}
                    onSelectMember={handleSelectMember}
                  />
                </div>

                <div>
                  <TeamDetailPanel activeMember={activeMember} />
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

function TeamCollage({
  activeMemberId,
  flightMemberId,
  onSelectMember,
  registerVisual,
  enableRevealData = false,
}: Readonly<{
  activeMemberId: string;
  flightMemberId?: string | null;
  onSelectMember: (memberId: string) => void;
  registerVisual?: (memberId: string) => (node: HTMLDivElement | null) => void;
  enableRevealData?: boolean;
}>) {
  return (
    <>
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.id}
              className="min-h-[10.75rem]"
              compact
              enableRevealData={enableRevealData}
              isInFlight={member.id === flightMemberId}
              isActive={member.id === activeMemberId}
              member={member}
              onSelectMember={onSelectMember}
              registerVisual={registerVisual}
              sizes="50vw"
            />
          ))}
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="pointer-events-none absolute -left-8 top-6 h-40 w-40 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute bottom-6 right-4 h-52 w-52 rounded-full border border-charcoal/10" />
        <div className="pointer-events-none absolute inset-x-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />

        <div className="grid h-[42rem] grid-cols-12 grid-rows-7 gap-4 xl:h-[44rem]">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.id}
              className={member.collageClass}
              enableRevealData={enableRevealData}
              isInFlight={member.id === flightMemberId}
              isActive={member.id === activeMemberId}
              member={member}
              onSelectMember={onSelectMember}
              registerVisual={registerVisual}
              sizes="(max-width: 1280px) 22vw, 18vw"
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TeamMemberCard({
  member,
  isActive,
  onSelectMember,
  sizes,
  className,
  compact = false,
  isInFlight = false,
  enableRevealData = false,
  registerVisual,
}: Readonly<{
  member: TeamMember;
  isActive: boolean;
  onSelectMember: (memberId: string) => void;
  sizes: string;
  className: string;
  compact?: boolean;
  isInFlight?: boolean;
  enableRevealData?: boolean;
  registerVisual?: (memberId: string) => (node: HTMLDivElement | null) => void;
}>) {
  const frameClassName = compact ? "rounded-[1.55rem]" : "rounded-[1.9rem]";
  const overlayClassName = compact
    ? "bg-[linear-gradient(180deg,_rgba(45,45,45,0.08),_rgba(45,45,45,0.74))]"
    : "bg-[linear-gradient(180deg,_rgba(45,45,45,0.12),_rgba(45,45,45,0.72))]";

  return (
    <button
      type="button"
      data-team-member-card={enableRevealData ? true : undefined}
      aria-pressed={isActive}
      onClick={() => onSelectMember(member.id)}
      className={`${className} group relative h-full min-h-[11rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-4 focus-visible:ring-offset-warm-white`}
    >
      <motion.div
        ref={registerVisual?.(member.id)}
        className={`relative h-full overflow-hidden border bg-charcoal transition-[border-color,box-shadow,opacity,transform] duration-500 ${frameClassName} ${
          isActive
            ? "border-gold/55 shadow-[0_34px_95px_-48px_rgba(201,169,110,0.62)]"
            : "border-charcoal/10 opacity-90 shadow-[0_28px_85px_-55px_rgba(45,45,45,0.3)] group-hover:-translate-y-1 group-hover:border-gold/35 group-hover:opacity-100"
        } ${isInFlight ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          alt={member.label}
          className={`object-cover transition-transform duration-700 ${
            isActive ? "scale-[1.03]" : "scale-100 group-hover:scale-[1.04]"
          }`}
          fill
          sizes={sizes}
          src={member.image}
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />

        <div className={`absolute inset-x-0 bottom-0 ${compact ? "p-3" : "p-4 xl:p-5"}`}>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`font-semibold uppercase text-pure-white/86 ${
                  compact ? "text-[0.68rem] tracking-[0.2em]" : "text-[0.72rem] tracking-[0.24em]"
                }`}
              >
                {member.name}
              </p>
              <p
                className={`mt-1 uppercase leading-relaxed text-pure-white/62 ${
                  compact ? "text-[0.58rem] tracking-[0.18em]" : "text-[0.62rem] tracking-[0.2em]"
                }`}
              >
                {compact ? member.role : member.specialty}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                isActive
                  ? "border-gold/40 bg-charcoal/55 text-gold-light"
                  : "border-pure-white/14 bg-charcoal/40 text-pure-white/74"
              }`}
            >
              {isActive ? "Activo" : "Abrir"}
            </span>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

function TeamDetailPanel({
  activeMember,
  incomingMember = null,
  enableMotion = false,
  hideVisual = false,
  isTextTransitioning = false,
  slotRef,
}: Readonly<{
  activeMember: TeamMember;
  incomingMember?: TeamMember | null;
  enableMotion?: boolean;
  hideVisual?: boolean;
  isTextTransitioning?: boolean;
  slotRef?: RefObject<HTMLDivElement | null>;
}>) {
  const staticContent = (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        Miembro destacado
      </p>

      <TeamMemberDetailVisual member={activeMember} hidden={hideVisual} slotRef={slotRef} />

      <TeamMemberDetailBody member={activeMember} />
    </>
  );

  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-pure-white/76 p-5 shadow-[0_40px_120px_-70px_rgba(45,45,45,0.38)] backdrop-blur-xl md:p-7 lg:p-8">
      {enableMotion ? (
        <div className="space-y-6">
          <motion.p
            animate={
              isTextTransitioning
                ? { opacity: 0.42, y: -6, filter: "blur(4px)" }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{ duration: isTextTransitioning ? 0.28 : 0.32, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-gold"
            style={{ willChange: "opacity, transform, filter" }}
          >
            Miembro destacado
          </motion.p>

          <TeamMemberDetailVisual member={activeMember} hidden={hideVisual} slotRef={slotRef} />

          <TeamMemberDetailTextTransition
            currentMember={activeMember}
            incomingMember={incomingMember}
            isTransitioning={isTextTransitioning}
          />
        </div>
      ) : (
        <div className="space-y-6">{staticContent}</div>
      )}
    </div>
  );
}

function TeamMemberDetailTextTransition({
  currentMember,
  incomingMember,
  isTransitioning,
}: Readonly<{
  currentMember: TeamMember;
  incomingMember: TeamMember | null;
  isTransitioning: boolean;
}>) {
  if (!incomingMember || incomingMember.id === currentMember.id) {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="space-y-5"
      >
        <TeamMemberDetailBody member={currentMember} />
      </motion.div>
    );
  }

  return (
    <div className="grid">
      <motion.div
        aria-hidden="true"
        animate={
          isTransitioning
            ? { opacity: 0, y: -20, filter: "blur(10px)", scale: 0.985 }
            : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
        }
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="space-y-5 [grid-area:1/1]"
        style={{ willChange: "opacity, transform, filter" }}
      >
        <TeamMemberDetailBody member={currentMember} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22, filter: "blur(14px)", scale: 0.985 }}
        animate={
          isTransitioning
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
        }
        transition={{ duration: 0.46, delay: 0.1, ease: "easeOut" }}
        className="space-y-5 [grid-area:1/1]"
        style={{ willChange: "opacity, transform, filter" }}
      >
        <TeamMemberDetailBody member={incomingMember} />
      </motion.div>
    </div>
  );
}

function TeamMemberDetailVisual({
  member,
  hidden = false,
  slotRef,
}: Readonly<{
  member: TeamMember;
  hidden?: boolean;
  slotRef?: RefObject<HTMLDivElement | null>;
}>) {
  const className =
    "relative aspect-[1.08] overflow-hidden rounded-[1.85rem] border border-charcoal/10 bg-charcoal shadow-[0_32px_90px_-60px_rgba(45,45,45,0.42)]";

  return (
    <div ref={slotRef} className={className}>
      <div
        className={`absolute inset-0 transition-opacity duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          alt={member.label}
          className="object-cover"
          fill
          sizes="(max-width: 1024px) 100vw, 34vw"
          src={member.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(45,45,45,0.14),_rgba(45,45,45,0.22)_38%,_rgba(45,45,45,0.78)_100%)]" />
        <div className="absolute left-4 top-4 max-w-[80%] rounded-full border border-pure-white/16 bg-charcoal/46 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-pure-white/82 backdrop-blur-md md:left-5 md:top-5 md:text-[0.66rem]">
          {member.role}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-pure-white/76">
            {member.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamMemberDetailBody({ member }: Readonly<{ member: TeamMember }>) {
  return (
    <>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
          {member.name}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/55 md:text-[0.78rem]">
          {member.role}
        </p>
      </div>

      <p className="text-xl leading-snug text-charcoal md:text-2xl">{member.specialty}</p>

      <p className="text-base leading-relaxed text-text-muted md:text-lg">{member.bio}</p>

      <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
        <div className="rounded-[1.5rem] border border-charcoal/10 bg-warm-white/80 px-5 py-4">
          <p className="text-3xl font-bold tracking-tight text-gold md:text-4xl">
            {member.metric}
          </p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-text-muted">
            {member.metricLabel}
          </p>
        </div>

        <blockquote className="rounded-[1.5rem] border border-charcoal/10 px-5 py-4 text-sm leading-relaxed text-charcoal/75 md:text-base">
          “{member.quote}”
        </blockquote>
      </div>
    </>
  );
}

function TeamMemberFlightOverlay({
  member,
  rects,
  onComplete,
}: Readonly<{
  member: TeamMember;
  rects: TeamMemberFlight;
  onComplete: () => void;
}>) {
  const duration = 0.76;
  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] [perspective:2200px]"
      initial={{
        x: rects.startRect.left,
        y: rects.startRect.top,
        width: rects.startRect.width,
        height: rects.startRect.height,
      }}
      animate={{
        x: rects.endRect.left,
        y: rects.endRect.top,
        width: rects.endRect.width,
        height: rects.endRect.height,
        transition: { duration, ease: easing },
      }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180, transition: { duration, ease: easing } }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.85rem] border border-gold/35 bg-charcoal shadow-[0_34px_95px_-48px_rgba(201,169,110,0.45)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image
            alt={member.label}
            className="object-cover"
            fill
            sizes="100vw"
            src={member.image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(45,45,45,0.12),_rgba(45,45,45,0.22)_38%,_rgba(45,45,45,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-pure-white/84">
              {member.name}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-[1.85rem] border border-gold/45 bg-charcoal shadow-[0_40px_120px_-60px_rgba(201,169,110,0.5)] [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image
            alt={member.label}
            className="object-cover"
            fill
            sizes="100vw"
            src={member.image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(45,45,45,0.08),_rgba(45,45,45,0.18)_30%,_rgba(45,45,45,0.78)_100%)]" />
          <div className="absolute left-4 top-4 rounded-full border border-pure-white/16 bg-charcoal/46 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-pure-white/82 backdrop-blur-md md:left-5 md:top-5 md:px-4 md:text-[0.64rem]">
            {member.role}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-pure-white/80">
              {member.name}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
