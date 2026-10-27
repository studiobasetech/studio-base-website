"use client";

import Image from "next/image";
import Link from "@/components/LangLink";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";

import { consultationHref, navLinks as links } from "@/data/site";
import { useLang, stripLang } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

const menuList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const menuItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Navbar() {
  const pathname = usePathname();
  const { t, tr } = useLang();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  /* Scroll behavior: glass background after scrolling, hide when scrolling
     down, show again when scrolling up */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(y > 20);
    setHiddenOnScroll(y > previous && y > 160);
  });

  const hidden = hiddenOnScroll && !open;

  /* Close the mobile menu when the page changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Stop the page from scrolling behind the open mobile menu */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? stripLang(pathname) === "/" : stripLang(pathname).startsWith(href);

  const activeHref = links.find((l) => isActive(l.href))?.href ?? null;
  const pillHref = hovered ?? activeHref;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={`
            relative
            grid
            w-full
            grid-cols-[1fr_auto]
            items-center
            px-6
            transition-all
            duration-500
            lg:grid-cols-[1fr_auto_1fr]
            lg:gap-x-3
            lg:px-8
            xl:px-12
            ${
              scrolled
                ? "bg-black/70 py-2 shadow-[0_10px_40px_-20px_rgba(59,130,246,0.35)] backdrop-blur-xl"
                : "bg-black/30 py-3 backdrop-blur-md"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center justify-self-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Image
                src="/images/studio-base-logo-v2.png"
                alt="Studio Base"
                width={240}
                height={50}
                className="h-7 w-auto object-contain xl:h-8"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop menu: centered glass capsule with a sliding highlight */}
          <div
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md lg:flex"
          >
            {links.map((link) => {
              const highlighted = pillHref === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className="relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium xl:px-4 xl:text-sm"
                >
                  {highlighted && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-blue-500/40 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      highlighted ? "text-blue-500" : "text-zinc-300"
                    }`}
                  >
                    {t(link.label)}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Language switch + CTA button */}
          <div className="hidden items-center gap-2 justify-self-end lg:flex xl:gap-3">
            <LanguageToggle />
            <MotionLink
              href={consultationHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-blue-500 px-4 py-2 text-[13px] font-medium xl:px-5 xl:text-sm text-blue-500 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            >
              {/* Light sweep */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                animate={{ x: ["-120%", "420%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />

              <span className="relative whitespace-nowrap">{tr("Book a Consultation", "Agenda una consulta")}</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </MotionLink>
          </div>

          {/* Mobile: language switch + menu button */}
          <div className="flex items-center gap-3 justify-self-end lg:hidden">
            <LanguageToggle layoutId="lang-pill-mobile" />
            <button
              aria-label={open ? tr("Close menu", "Cerrar menú") : tr("Open menu", "Abrir menú")}
              className="text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Bottom edge: faint line, moving light, scroll progress */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/10">
            <motion.div
              className="h-px w-1/4 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              animate={{ x: ["-100%", "500%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          />
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-black/95 px-8 backdrop-blur-xl lg:hidden"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

            <motion.div
              variants={menuList}
              initial="hidden"
              animate="show"
              className="relative flex flex-col gap-2"
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={menuItem}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                  >

                    <span
                      className={`text-3xl font-semibold transition-colors group-hover:text-blue-500 ${
                        isActive(link.href) ? "text-blue-500" : "text-white"
                      }`}
                    >
                      {t(link.label)}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <MotionLink
                href={consultationHref}
                onClick={() => setOpen(false)}
                variants={menuItem}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-4 font-semibold text-white"
              >
                {tr("Book a Consultation", "Agenda una consulta")}
                <ArrowRight size={18} />
              </MotionLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}