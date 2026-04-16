'use client';

import {
  Clock,
  Cpu,
  Home,
  Mail,
  MessageCircle,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { cn } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const NAV_ITEMS = [
  { href: '#inicio', label: 'Inicio', id: 'inicio', icon: Home },
  { href: '#historia', label: 'Historia', id: 'historia', icon: Clock },
  { href: '#servicios', label: 'Servicios', id: 'servicios', icon: Wrench },
  { href: '#tecnologia', label: 'Tecnología', id: 'tecnologia', icon: Cpu },
  { href: '#contacto', label: 'Contacto', id: 'contacto', icon: Mail },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type NavItemId = NavItem['id'];

const SPRING_CONFIG = { mass: 0.1, stiffness: 150, damping: 12 } as const;

export function NavDock() {
  const [activeSection, setActiveSection] = useState<NavItemId>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const current = NAV_ITEMS.findLast(({ id }) => {
        const section = document.getElementById(id);

        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= 150;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: NavItemId) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <DesktopNavDock activeSection={activeSection} onNavClick={handleNavClick} />
      <MobileNavDock activeSection={activeSection} onNavClick={handleNavClick} />
    </>
  );
}

function DesktopNavDock({
  activeSection,
  onNavClick,
}: Readonly<{
  activeSection: NavItemId;
  onNavClick: (event: MouseEvent<HTMLAnchorElement>, id: NavItemId) => void;
}>) {
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Navegación flotante"
      onMouseMove={(event) => mouseY.set(event.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-pure-white/[0.08] bg-charcoal/60 px-2 py-3 shadow-2xl backdrop-blur-xl md:flex"
    >
      {NAV_ITEMS.map((item) => (
        <DesktopNavIcon
          key={item.id}
          item={item}
          mouseY={mouseY}
          isActive={activeSection === item.id}
          onClick={onNavClick}
        />
      ))}

      <div className="mt-1 border-t border-pure-white/[0.08] pt-1">
        <WhatsAppDesktopIcon mouseY={mouseY} />
      </div>
    </motion.nav>
  );
}

function DesktopNavIcon({
  item,
  mouseY,
  isActive,
  onClick,
}: Readonly<{
  item: NavItem;
  mouseY: MotionValue<number>;
  isActive: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>, id: NavItemId) => void;
}>) {
  return (
    <DesktopMagneticIcon
      mouseY={mouseY}
      href={item.href}
      label={item.label}
      icon={item.icon}
      isActive={isActive}
      onClick={(event) => onClick(event, item.id)}
    />
  );
}

function WhatsAppDesktopIcon({ mouseY }: Readonly<{ mouseY: MotionValue<number> }>) {
  return (
    <DesktopMagneticIcon
      mouseY={mouseY}
      href={buildWhatsAppUrl()}
      label="WhatsApp"
      icon={MessageCircle}
      iconClassName="text-green-400 group-hover:text-green-300"
      containerClassName="bg-pure-white/[0.05]"
      target="_blank"
      rel="noreferrer"
    />
  );
}

function DesktopMagneticIcon({
  mouseY,
  href,
  label,
  icon: Icon,
  isActive = false,
  onClick,
  target,
  rel,
  iconClassName,
  containerClassName,
}: Readonly<{
  mouseY: MotionValue<number>;
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  iconClassName?: string;
  containerClassName?: string;
}>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return value - bounds.y - bounds.height / 2;
  });

  const sizeTransform = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [18, 28, 18]);

  const size = useSpring(sizeTransform, SPRING_CONFIG);
  const iconSize = useSpring(iconSizeTransform, SPRING_CONFIG);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative flex items-center justify-center rounded-xl bg-pure-white/[0.05] transition-colors',
        isActive && 'bg-gold/[0.12] shadow-[0_0_12px_rgba(201,169,110,0.5)]',
        containerClassName,
      )}
    >
      {isActive ? (
        <motion.div
          layoutId="nav-active-desktop"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute -left-0.5 h-6 w-1 rounded-full bg-gold shadow-[0_0_10px_rgba(201,169,110,0.6)]"
        />
      ) : null}

      <AnimatePresence>
        {hovered ? (
          <motion.div
            initial={{ opacity: 0, x: 8, y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, x: 4, y: '-50%' }}
            className="pointer-events-none absolute right-full top-1/2 mr-3 whitespace-nowrap rounded-lg border border-gold/20 bg-charcoal/90 px-2.5 py-1 text-xs text-warm-white backdrop-blur-sm"
          >
            {label}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className={cn(
          'flex items-center justify-center text-silver-light/60 transition-colors group-hover:text-gold',
          isActive && 'text-gold',
          iconClassName,
        )}
      >
        <Icon className="h-full w-full" strokeWidth={2} />
      </motion.div>
    </motion.a>
  );
}

function MobileNavDock({
  activeSection,
  onNavClick,
}: Readonly<{
  activeSection: NavItemId;
  onNavClick: (event: MouseEvent<HTMLAnchorElement>, id: NavItemId) => void;
}>) {
  return (
    <nav
      aria-label="Navegación flotante móvil"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-row gap-1 rounded-full border border-pure-white/[0.08] bg-charcoal/70 px-3 py-2 shadow-2xl backdrop-blur-xl md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(event) => onNavClick(event, item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-full bg-pure-white/[0.05] transition-colors',
              isActive && 'bg-gold/[0.12]',
            )}
          >
            <item.icon
              className={cn(
                'h-5 w-5 text-silver-light/60 transition-colors',
                isActive ? 'text-gold' : 'hover:text-gold',
              )}
              strokeWidth={2}
            />

            {isActive ? (
              <motion.div
                layoutId="nav-active-mobile"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute -bottom-1.5 h-1 w-4 rounded-full bg-gold shadow-[0_0_8px_rgba(201,169,110,0.5)]"
              />
            ) : null}
          </a>
        );
      })}

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-pure-white/[0.05] text-green-400 transition-colors hover:text-green-300"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={2} />
      </a>
    </nav>
  );
}
