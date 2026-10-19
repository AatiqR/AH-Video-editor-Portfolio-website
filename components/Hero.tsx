"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, Play, X } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";

/* ────────────────────────────────────────────────────────────
   FONTS — only the weights actually used are downloaded
   Space Grotesk 700 → headings / wordmark / numerals
   Manrope 700       → navbar + buttons
   Manrope 500       → descriptions
   ──────────────────────────────────────────────────────────── */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-body",
  display: "swap",
});

/* ────────────────────────────────────────────────────────────
   CONFIGURATION
   ──────────────────────────────────────────────────────────── */
const BOOKING_URL = "https://cal.com/aakash-creative-studio/30min";
const WHATSAPP_URL =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

const VSL_ID = "RLxhKtkK7fc";
const VSL_TITLE = "Aakash Edits Lab studio showreel";

/**
 * Your custom 16:9 VSL thumbnail.
 * Put the file in /public and set its real path here, e.g. "/vsl-thumbnail.jpg".
 * While this is null, the YouTube thumbnail is used as the fallback.
 */
const CUSTOM_POSTER: string | null = null;

const POSTERS = [
  CUSTOM_POSTER,
  `https://i.ytimg.com/vi/${VSL_ID}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${VSL_ID}/hqdefault.jpg`,
].filter((src): src is string => Boolean(src));

type NavItem = {
  label: string;
  id: string;
  /** Used when the real section is not on the page. */
  fallbackId?: string;
  fallbackHref?: string;
};

const NAV: NavItem[] = [
  { label: "Work", id: "work", fallbackId: "showreel" },
  { label: "Services", id: "services" },
  { label: "Results", id: "results" },
  { label: "Contact", id: "contact", fallbackHref: WHATSAPP_URL },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ────────────────────────────────────────────────────────────
   DESIGN TOKENS (solid colors only — no gradients anywhere)
   Obsidian        #08070B   page background
   Imperial Violet #9164F5   primary accent  (deep hover #7A4AE6)
   Soft Lavender   #B9A0FF   small accents + selected type only
   Porcelain       #F7F5FA   primary text
   Silver          #AAA5B5   secondary text
   Surface         #15121B   raised surface (navbar, menu, video bezel)
   Recess          #100D15   sunken surface (buttons, poster base)
   Obsidian text on Violet = 5.1:1, Porcelain on deep hover violet = 5.3:1 (AA)
   ──────────────────────────────────────────────────────────── */
const FONT_DISPLAY = "font-[family-name:var(--font-display)]";
const FONT_BODY = "font-[family-name:var(--font-body)]";

const BORDER = "border-[rgba(145,100,245,0.18)]";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#9164F5]";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 motion-reduce:transition-none";

const PRIMARY = `${BTN} bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_0_#5B36BD,0_10px_20px_-10px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:bg-[#7A4AE6] hover:text-[#F7F5FA] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_3px_0_#4B2AA3,0_14px_24px_-10px_rgba(0,0,0,0.95)] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const SECONDARY = `${BTN} border border-[rgba(145,100,245,0.42)] bg-[#100D15] text-[#F7F5FA] shadow-[inset_0_1px_0_rgba(247,245,250,0.05),0_10px_20px_-12px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:border-[rgba(185,160,255,0.7)] hover:bg-[#15121B] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const ARROW =
  "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0";

const GUTTER =
  "pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))]";

/** Slightly tighter side margin so the floating navbar reads as suspended, not docked. */
const NAV_GUTTER =
  "pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] md:pl-[max(1.25rem,env(safe-area-inset-left))] md:pr-[max(1.25rem,env(safe-area-inset-right))]";

/** Layered elevation: top highlight, bottom edge, contact shadow, ambient shadow. */
const FLOAT_SHADOW: CSSProperties = {
  boxShadow: [
    "inset 0 1px 0 rgba(247,245,250,0.07)",
    "inset 0 -1px 0 rgba(0,0,0,0.55)",
    "0 1px 2px rgba(0,0,0,0.7)",
    "0 6px 14px -4px rgba(0,0,0,0.6)",
    "0 18px 36px -12px rgba(0,0,0,0.8)",
    "0 36px 64px -28px rgba(0,0,0,0.9)",
  ].join(", "),
};

/** Solid stepped edge gives the video bezel a slab thickness without any 3D transform. */
const SLAB_SHADOW: CSSProperties = {
  boxShadow: [
    "inset 0 1px 0 rgba(247,245,250,0.09)",
    "0 1px 0 #1E192A",
    "0 2px 0 #181321",
    "0 3px 0 #120E1A",
    "0 4px 0 #0D0A13",
    "0 8px 12px -3px rgba(0,0,0,0.6)",
    "0 22px 36px -14px rgba(0,0,0,0.85)",
    "0 48px 80px -36px rgba(0,0,0,0.95)",
  ].join(", "),
};

/* ────────────────────────────────────────────────────────────
   NAVIGATION HELPERS
   ──────────────────────────────────────────────────────────── */
function scrollToEl(el: HTMLElement, smooth: boolean) {
  // The navbar floats, so measure its real bottom edge instead of assuming a height.
  const bar = document.querySelector<HTMLElement>("[data-site-header]");
  const offset = (bar ? bar.getBoundingClientRect().bottom : 90) + 14;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
}

type Target =
  | { kind: "scroll"; el: HTMLElement }
  | { kind: "external"; href: string }
  | null;

/** Decides, at click time, where a nav item really goes. */
function resolveTarget(item: NavItem): Target {
  const el =
    document.getElementById(item.id) ??
    (item.fallbackId ? document.getElementById(item.fallbackId) : null);
  if (el) return { kind: "scroll", el };
  if (item.fallbackHref) return { kind: "external", href: item.fallbackHref };
  return null;
}

/** Scrolls to #booking when that section exists, otherwise opens the real booking page. */
function BookLink({
  smooth,
  className,
  children,
  onNavigate,
}: {
  smooth: boolean;
  className: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        onNavigate?.();
        const section = document.getElementById("booking");
        if (section) {
          e.preventDefault();
          window.setTimeout(() => scrollToEl(section, smooth), onNavigate ? 80 : 0);
        }
      }}
    >
      {children}
    </a>
  );
}

/* ────────────────────────────────────────────────────────────
   NAVBAR — floating capsule, fixed while scrolling
   ──────────────────────────────────────────────────────────── */
function Navbar({ smooth }: { smooth: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const refocusToggle = useRef(true);

  /* Which links have a real destination + which section is in view */
  useEffect(() => {
    const flags: Record<string, boolean> = {};
    const watched = new Map<Element, string>();
    NAV.forEach((n) => {
      const target = resolveTarget(n);
      flags[n.id] = target === null;
      if (target?.kind === "scroll") watched.set(target.el, n.id);
    });
    setUnavailable(flags);
    if (!watched.size) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = watched.get(entry.target);
          if (!id) return;
          if (entry.isIntersecting) setActive(id);
          else setActive((cur) => (cur === id ? null : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    watched.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Mobile menu: scroll lock, Escape, focus trap, focus return */
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    refocusToggle.current = true;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href],button") ?? []),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (refocusToggle.current) toggleRef.current?.focus();
    };
  }, [open]);

  const go = (e: MouseEvent<HTMLAnchorElement>, item: NavItem, fromMenu: boolean) => {
    e.preventDefault();
    const target = resolveTarget(item);
    if (fromMenu) {
      refocusToggle.current = false;
      setOpen(false);
    }
    if (!target) return;
    if (target.kind === "external") {
      window.open(target.href, "_blank", "noopener,noreferrer");
    } else if (fromMenu) {
      window.setTimeout(() => scrollToEl(target.el, smooth), 80);
    } else {
      scrollToEl(target.el, smooth);
    }
  };

  const closeForLink = () => {
    refocusToggle.current = false;
    setOpen(false);
  };

  return (
    <>
      {/* Fixed track: ignores pointer events so only the capsule is interactive */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 pt-[calc(env(safe-area-inset-top,0px)+10px)] md:pt-[calc(env(safe-area-inset-top,0px)+18px)] ${NAV_GUTTER}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            data-site-header
            initial={smooth ? { y: -18, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={FLOAT_SHADOW}
            className="pointer-events-auto grid h-14 grid-cols-[1fr_auto] items-center rounded-[18px] border border-[rgba(145,100,245,0.22)] bg-[#15121B] pl-4 pr-2 md:h-[72px] md:grid-cols-[1fr_auto_1fr] md:rounded-[22px] md:pl-6 md:pr-3"
          >
            {/* Wordmark */}
            <a
              href="#top"
              aria-label="Akash Hanif — back to top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
              }}
              className={`group inline-flex w-fit items-center gap-2.5 rounded-lg ${FOCUS}`}
            >
              <span
                aria-hidden="true"
                className="grid h-[28px] w-[28px] shrink-0 place-items-center rounded-lg bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_0_#5B36BD] transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 md:h-[32px] md:w-[32px]"
              >
                <Play size={13} fill="currentColor" strokeWidth={0} className="ml-px" />
              </span>
              <span
                className={`${FONT_DISPLAY} whitespace-nowrap text-[18px] font-bold leading-none tracking-[-0.035em] text-[#F7F5FA] md:text-[20px]`}
              >
                Akash Hanif
              </span>
              <span
                aria-hidden="true"
                className={`${FONT_BODY} hidden whitespace-nowrap border-l border-[rgba(145,100,245,0.3)] pl-2.5 text-[13px] font-bold leading-none text-[#B9A0FF] xl:inline`}
              >
                Edits Lab
              </span>
            </a>

            {/* Links */}
            <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex lg:gap-1.5">
              {NAV.map((n) => {
                const isActive = active === n.id;
                const isOff = Boolean(unavailable[n.id]);
                return (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={(e) => go(e, n, false)}
                    aria-current={isActive ? "location" : undefined}
                    aria-disabled={isOff || undefined}
                    title={isOff ? "This section isn’t on the page yet" : undefined}
                    className={`group relative rounded-xl px-3.5 py-2.5 text-[15px] font-bold tracking-[-0.01em] transition-[color,background-color] duration-300 motion-reduce:transition-none lg:px-[18px] lg:text-[15.5px] ${
                      isOff
                        ? "cursor-not-allowed text-[#AAA5B5] opacity-40"
                        : isActive
                          ? "bg-[rgba(247,245,250,0.04)] text-[#F7F5FA]"
                          : "text-[#AAA5B5] hover:bg-[rgba(247,245,250,0.05)] hover:text-[#F7F5FA]"
                    } ${FOCUS}`}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B9A0FF] transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* CTA + menu toggle */}
            <div className="flex items-center justify-self-end">
              <BookLink
                smooth={smooth}
                className={`${PRIMARY} hidden h-12 px-6 text-[15px] md:inline-flex`}
              >
                Book a Call
                <ArrowUpRight size={16} aria-hidden="true" className={ARROW} />
              </BookLink>
              <button
                ref={toggleRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(145,100,245,0.22)] bg-[#100D15] text-[#F7F5FA] transition-colors duration-300 hover:border-[rgba(185,160,255,0.55)] motion-reduce:transition-none md:hidden ${FOCUS}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "close" : "menu"}
                    initial={smooth ? { opacity: 0, rotate: -45 } : false}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={smooth ? { opacity: 0, rotate: 45 } : { opacity: 0 }}
                    transition={{ duration: smooth ? 0.18 : 0, ease: EASE }}
                    className="grid place-items-center"
                  >
                    {open ? (
                      <X size={21} aria-hidden="true" />
                    ) : (
                      <Menu size={21} aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile menu: a floating panel that drops from beneath the capsule */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: smooth ? 0.25 : 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
            className={`fixed inset-0 z-40 bg-[rgba(8,7,11,0.82)] md:hidden ${NAV_GUTTER}`}
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px + 56px + 8px)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
            }}
          >
            <motion.div
              ref={menuRef}
              initial={smooth ? { opacity: 0, y: -10, scale: 0.985 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={smooth ? { opacity: 0, y: -8, scale: 0.985 } : { opacity: 0 }}
              transition={{ duration: smooth ? 0.35 : 0, ease: EASE }}
              style={{ ...FLOAT_SHADOW, transformOrigin: "top center" }}
              className="mx-auto max-h-full max-w-[1200px] overflow-y-auto overscroll-contain rounded-[22px] border border-[rgba(145,100,245,0.22)] bg-[#15121B] p-2.5"
            >
              <nav aria-label="Mobile">
                <ul>
                  {NAV.map((n, i) => {
                    const isOff = Boolean(unavailable[n.id]);
                    const isActive = active === n.id;
                    return (
                      <motion.li
                        key={n.id}
                        initial={smooth ? { opacity: 0, y: 10 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: smooth ? 0.08 + i * 0.05 : 0,
                          ease: EASE,
                        }}
                        className={i > 0 ? `border-t ${BORDER}` : undefined}
                      >
                        <a
                          href={`#${n.id}`}
                          onClick={(e) => go(e, n, true)}
                          aria-disabled={isOff || undefined}
                          aria-current={isActive ? "location" : undefined}
                          className={`${FONT_DISPLAY} flex min-h-[60px] items-center justify-between rounded-xl px-3 text-[26px] font-bold leading-none tracking-[-0.04em] transition-colors duration-300 active:bg-[rgba(247,245,250,0.05)] motion-reduce:transition-none ${
                            isOff ? "text-[#AAA5B5] opacity-40" : "text-[#F7F5FA]"
                          } ${FOCUS}`}
                        >
                          <span className="flex items-center gap-3">
                            {n.label}
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-[#B9A0FF]"
                              />
                            )}
                          </span>
                          <ArrowUpRight size={24} aria-hidden="true" className="text-[#9164F5]" />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={smooth ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: smooth ? 0.3 : 0, ease: EASE }}
                className={`mt-2 flex flex-col gap-2.5 border-t pt-3.5 ${BORDER}`}
              >
                <BookLink
                  smooth={smooth}
                  onNavigate={closeForLink}
                  className={`${PRIMARY} h-[52px] w-full text-[15px]`}
                >
                  Book a Call
                  <ArrowUpRight size={17} aria-hidden="true" className={ARROW} />
                </BookLink>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeForLink}
                  className={`${SECONDARY} h-[52px] w-full text-[15px]`}
                >
                  <MessageCircle size={17} aria-hidden="true" className="text-[#B9A0FF]" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   VSL PLAYER — dimensional bezel, poster first, iframe only after a click
   Depth comes from stepped solid edges + layered shadows. No rotation,
   no perspective, no cropping: the video stays an exact 16:9.
   ──────────────────────────────────────────────────────────── */
function VslPlayer({ smooth }: { smooth: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [posterIdx, setPosterIdx] = useState(0);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const nextPoster = useCallback(() => setPosterIdx((i) => i + 1), []);
  const poster = POSTERS[posterIdx];

  return (
    <div
      id="showreel"
      style={SLAB_SHADOW}
      className="group relative w-full rounded-xl border border-[rgba(145,100,245,0.3)] bg-[#15121B] p-1 transition-[transform,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-[rgba(185,160,255,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:rounded-2xl sm:p-1.5"
    >
      {/* Screen */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#100D15] sm:rounded-[10px]">
        {playing && (
          <iframe
            ref={frameRef}
            className="absolute inset-0 h-full w-full border-0 bg-black"
            src={`https://www.youtube-nocookie.com/embed/${VSL_ID}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
            title={VSL_TITLE}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        <AnimatePresence>
          {!playing && (
            <motion.button
              key="poster"
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${VSL_TITLE}`}
              exit={{ opacity: 0 }}
              transition={{ duration: smooth ? 0.45 : 0, ease: EASE }}
              className={`group/play absolute inset-0 block h-full w-full bg-[#100D15] ${FOCUS} focus-visible:outline-offset-[-3px]`}
            >
              {poster && (
                // Plain <img> keeps remote YouTube fallbacks working without next.config changes.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt="Thumbnail for the Aakash Edits Lab studio showreel"
                  width={1280}
                  height={720}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                  onError={nextPoster}
                  onLoad={(e) => {
                    // YouTube serves a tiny placeholder when maxres is missing.
                    if (e.currentTarget.naturalWidth < 400) nextPoster();
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/play:scale-[1.012] motion-reduce:transition-none motion-reduce:group-hover/play:scale-100"
                />
              )}

              {/* Flat tint keeps the play control legible on any thumbnail */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[rgba(8,7,11,0.28)] transition-colors duration-500 group-hover/play:bg-[rgba(8,7,11,0.14)] motion-reduce:transition-none"
              />

              {/* Custom play control: ringed, raised violet disc */}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className="grid place-items-center rounded-full border border-[rgba(247,245,250,0.28)] bg-[rgba(8,7,11,0.45)] p-1.5 transition-[transform,border-color] duration-500 ease-out group-hover/play:scale-[1.06] group-hover/play:border-[rgba(185,160,255,0.75)] motion-reduce:transition-none motion-reduce:group-hover/play:scale-100 sm:p-2"
                >
                  <span className="grid h-[56px] w-[56px] place-items-center rounded-full bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_0_#5B36BD,0_12px_24px_-10px_rgba(0,0,0,0.9)] transition-[background-color,color] duration-300 group-hover/play:bg-[#7A4AE6] group-hover/play:text-[#F7F5FA] motion-reduce:transition-none sm:h-[72px] sm:w-[72px]">
                    <Play size={24} fill="currentColor" strokeWidth={0} className="ml-1" />
                  </span>
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Inner hairline: seats the screen into the bezel */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(145,100,245,0.18)]"
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   HERO
   DOM order is the mobile order:
   navbar → eyebrow → headline → description → VSL → CTAs → credibility
   On lg+, CSS grid places text left and the VSL right.
   Entrance order: navbar → headline → description → video → CTAs → stats
   ──────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const smooth = !useReducedMotion();

  const reveal = (delay: number, extra: { y?: number; scale?: number } = {}): MotionProps =>
    smooth
      ? {
          initial: { opacity: 0, y: extra.y ?? 14, scale: extra.scale ?? 1 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.75, delay, ease: EASE },
        }
      : {};

  const line = (delay: number): MotionProps =>
    smooth
      ? {
          initial: { y: "105%" },
          animate: { y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        }
      : {};

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className={`${display.variable} ${body.variable} ${FONT_BODY} relative overflow-x-clip bg-[#08070B] text-[#F7F5FA] antialiased`}
    >
      <Navbar smooth={smooth} />

      <div
        className={`mx-auto max-w-[1280px] pb-14 pt-[calc(env(safe-area-inset-top,0px)+88px)] md:pt-[calc(env(safe-area-inset-top,0px)+132px)] lg:pb-20 lg:pt-[calc(env(safe-area-inset-top,0px)+140px)] ${GUTTER}`}
      >
        <div className="flex flex-col lg:grid lg:grid-cols-[476fr_524fr] lg:content-center lg:gap-x-12 xl:gap-x-16">
          {/* 1 · Eyebrow, 2 · headline, 3 · description */}
          <div className="lg:col-start-1 lg:row-start-1">
            <motion.p
              {...reveal(0.16, { y: 8 })}
              className="mb-3.5 flex items-center gap-3 text-[13px] font-bold tracking-[0.005em] text-[#AAA5B5] lg:mb-5 lg:text-sm"
            >
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#B9A0FF]" />
              Video editing &amp; creative production studio
            </motion.p>

            <h1
              id="hero-heading"
              className={`${FONT_DISPLAY} text-[clamp(2rem,9.8vw,3.4rem)] font-bold leading-[1.03] tracking-[-0.045em] text-[#F7F5FA] sm:text-[clamp(3.25rem,8vw,4.75rem)] lg:text-[clamp(3.1rem,4.7vw,4.6rem)]`}
            >
              {["Video ads that", "make people"].map((text, i) => (
                <span key={text} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                  <motion.span {...line(0.2 + i * 0.08)} className="block">
                    {text}
                  </motion.span>
                </span>
              ))}
              <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                <motion.span {...line(0.36)} className="block">
                  <span className="text-[#9164F5]">stop</span>
                  <span className="text-[#B9A0FF]">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...reveal(0.46)}
              className="mt-4 max-w-[28rem] text-[clamp(1.0625rem,4.2vw,1.1875rem)] font-medium leading-[1.6] text-[#AAA5B5] lg:mt-6"
            >
              UGC ads, VSLs, and performance-focused video creatives for DTC and ecommerce brands.
            </motion.p>
          </div>

          {/* 4 · Landscape VSL */}
          <motion.div
            {...reveal(0.56, { y: 22, scale: 0.985 })}
            className="mt-6 min-w-0 pb-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center lg:pb-0"
          >
            <VslPlayer smooth={smooth} />
          </motion.div>

          {/* 5 · CTAs */}
          <motion.div
            {...reveal(0.68)}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-start-1 lg:row-start-2 lg:mt-9"
          >
            <BookLink smooth={smooth} className={`${PRIMARY} h-[54px] px-7 text-[15px]`}>
              Book a Call
              <ArrowUpRight size={18} aria-hidden="true" className={ARROW} />
            </BookLink>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${SECONDARY} h-[54px] px-7 text-[15px]`}
            >
              <MessageCircle
                size={18}
                aria-hidden="true"
                className="text-[#B9A0FF] transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* 6 · Credibility */}
          <motion.dl
            {...reveal(0.78, { y: 8 })}
            className={`mt-7 flex items-stretch gap-8 border-t pt-5 sm:gap-10 lg:col-start-1 lg:row-start-3 lg:mt-11 ${BORDER}`}
          >
            <div className="flex flex-col-reverse">
              <dt className="mt-1.5 text-[13px] font-medium text-[#AAA5B5]">Projects delivered</dt>
              <dd
                className={`${FONT_DISPLAY} text-[28px] font-bold leading-none tracking-[-0.04em] text-[#F7F5FA] lg:text-[30px]`}
              >
                1000<span className="text-[#B9A0FF]">+</span>
              </dd>
            </div>
            <div aria-hidden="true" className="w-px bg-[rgba(145,100,245,0.18)]" />
            <div className="flex flex-col-reverse">
              <dt className="mt-1.5 text-[13px] font-medium text-[#AAA5B5]">Years of experience</dt>
              <dd
                className={`${FONT_DISPLAY} text-[28px] font-bold leading-none tracking-[-0.04em] text-[#F7F5FA] lg:text-[30px]`}
              >
                2<span className="text-[#B9A0FF]">+</span>
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}