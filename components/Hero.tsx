"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  Menu,
  MessageCircle,
  Play,
  X,
} from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";

/* ============================================================
   FONTS
   ============================================================ */

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

/* ============================================================
   CONFIGURATION
   ============================================================ */

const BOOKING_URL = "https://cal.com/aakash-creative-studio/30min";

const WHATSAPP_URL =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

const VSL_ID = "RLxhKtkK7fc";

const VSL_TITLE = "Aakash Edits Lab studio showreel";

const CUSTOM_POSTER: string | null = null;

const POSTERS: string[] = [
  ...(CUSTOM_POSTER ? [CUSTOM_POSTER] : []),
  `https://i.ytimg.com/vi/${VSL_ID}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${VSL_ID}/hqdefault.jpg`,
];

/* ============================================================
   DESIGN SYSTEM
   ============================================================ */

const FONT_DISPLAY = "font-[family-name:var(--font-display)]";

const FONT_BODY = "font-[family-name:var(--font-body)]";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9164F5]";

const BUTTON_BASE = `
  group
  inline-flex
  items-center
  justify-center
  gap-2.5
  rounded-xl
  font-bold
  tracking-[-0.01em]
  transition-all
  duration-300
  ease-out
  motion-reduce:transition-none
  ${FOCUS}
`;

const PRIMARY = `
  ${BUTTON_BASE}
  bg-[#9164F5]
  text-[#08070B]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_3px_0_#5B36BD,0_12px_24px_-12px_rgba(0,0,0,0.9)]
  hover:-translate-y-0.5
  hover:bg-[#A27BFF]
  hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_0_#5B36BD,0_18px_30px_-12px_rgba(0,0,0,0.95)]
  active:translate-y-0
  motion-reduce:hover:translate-y-0
`;

const SECONDARY = `
  ${BUTTON_BASE}
  border
  border-[rgba(145,100,245,0.4)]
  bg-[#100D15]
  text-[#F7F5FA]
  shadow-[inset_0_1px_0_rgba(247,245,250,0.05),0_10px_20px_-12px_rgba(0,0,0,0.9)]
  hover:-translate-y-0.5
  hover:border-[#B9A0FF]
  hover:bg-[#191420]
  active:translate-y-0
  motion-reduce:hover:translate-y-0
`;

const ARROW = `
  transition-transform
  duration-300
  group-hover:-translate-y-0.5
  group-hover:translate-x-0.5
  motion-reduce:transition-none
  motion-reduce:group-hover:translate-x-0
  motion-reduce:group-hover:translate-y-0
`;

const GUTTER =
  "px-5 sm:px-8 lg:px-10";

const NAV_GUTTER =
  "px-3 sm:px-5";

/* ============================================================
   NAVIGATION CONFIGURATION
   ============================================================ */

type NavItem = {
  label: string;
  id: string;
  fallbackId?: string;
  fallbackHref?: string;
};

const NAV: NavItem[] = [
  {
    label: "Work",
    id: "work",
    fallbackId: "showreel",
  },
  {
    label: "Services",
    id: "services",
  },
  {
    label: "Results",
    id: "results",
  },
  {
    label: "Contact",
    id: "contact",
    fallbackHref: WHATSAPP_URL,
  },
];

/* ============================================================
   CLIENT-SIDE HELPERS
   ============================================================ */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}

function scrollToElement(element: HTMLElement) {
  if (typeof window === "undefined") {
    return;
  }

  const header = document.querySelector<HTMLElement>(
    "[data-site-header]"
  );

  const headerBottom = header
    ? header.getBoundingClientRect().bottom
    : 90;

  const offset = headerBottom + 14;

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function scrollToTop() {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

function getTarget(item: NavItem): HTMLElement | null {
  if (typeof document === "undefined") {
    return null;
  }

  return (
    document.getElementById(item.id) ??
    (item.fallbackId
      ? document.getElementById(item.fallbackId)
      : null)
  );
}

/* ============================================================
   BOOKING LINK
   ============================================================ */

type BookLinkProps = {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

function BookLink({
  children,
  className = "",
  onNavigate,
}: BookLinkProps) {
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    const bookingSection =
      document.getElementById("booking");

    onNavigate?.();

    if (!bookingSection) {
      return;
    }

    event.preventDefault();

    window.setTimeout(() => {
      scrollToElement(bookingSection);
    }, onNavigate ? 100 : 0);
  };

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

/* ============================================================
   NAVBAR
   Hydration-safe:
   - No Framer Motion during SSR
   - No random values
   - No client-dependent initial styles
   - Identical server/client initial markup
   ============================================================ */

function Navbar() {
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState<string | null>(
    null
  );

  const [available, setAvailable] = useState<
    Record<string, boolean>
  >({});

  const toggleRef = useRef<HTMLButtonElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const restoreFocusRef = useRef(false);

  /* ----------------------------------------------------------
     Determine available sections
     ---------------------------------------------------------- */

  useEffect(() => {
    const updateAvailability = () => {
      const next: Record<string, boolean> = {};

      NAV.forEach((item) => {
        next[item.id] = Boolean(
          getTarget(item) || item.fallbackHref
        );
      });

      setAvailable(next);
    };

    updateAvailability();

    const observer = new MutationObserver(
      updateAvailability
    );

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ----------------------------------------------------------
     Active navigation tracking
     ---------------------------------------------------------- */

  useEffect(() => {
    const updateActive = () => {
      const viewportReference =
        window.innerHeight * 0.4;

      let current: string | null = null;

      for (const item of NAV) {
        const element = getTarget(item);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (
          rect.top <= viewportReference &&
          rect.bottom >= viewportReference
        ) {
          current = item.id;
          break;
        }
      }

      setActive(current);
    };

    updateActive();

    window.addEventListener("scroll", updateActive, {
      passive: true,
    });

    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener(
        "scroll",
        updateActive
      );

      window.removeEventListener(
        "resize",
        updateActive
      );
    };
  }, []);

  /* ----------------------------------------------------------
     Mobile menu accessibility
     ---------------------------------------------------------- */

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLElement>("a[href]")
        ?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = [
        toggleRef.current,
        ...Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>(
            'a[href]:not([aria-disabled="true"]), button:not([disabled])'
          ) ?? []
        ),
      ].filter(
        (element): element is HTMLElement =>
          element !== null
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;

        window.setTimeout(() => {
          toggleRef.current?.focus();
        }, 0);
      }
    };
  }, [open]);

  /* ----------------------------------------------------------
     Navigation handler
     ---------------------------------------------------------- */

  const navigate = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      item: NavItem,
      fromMobile = false
    ) => {
      const target = getTarget(item);

      if (fromMobile) {
        restoreFocusRef.current = false;
        setOpen(false);
      }

      if (target) {
        event.preventDefault();

        window.setTimeout(
          () => scrollToElement(target),
          fromMobile ? 100 : 0
        );

        return;
      }

      if (item.fallbackHref) {
        event.preventDefault();

        window.open(
          item.fallbackHref,
          "_blank",
          "noopener,noreferrer"
        );

        return;
      }

      event.preventDefault();
    },
    []
  );

  const closeMobileMenu = useCallback(() => {
    restoreFocusRef.current = false;
    setOpen(false);
  }, []);

  return (
    <>
      <header
        className={`
          pointer-events-none
          fixed
          inset-x-0
          top-0
          z-50
          pt-[calc(env(safe-area-inset-top,0px)+10px)]
          md:pt-[calc(env(safe-area-inset-top,0px)+18px)]
          ${NAV_GUTTER}
        `}
      >
        <div className="mx-auto max-w-[1200px]">
          <div
            data-site-header
            className="
              pointer-events-auto
              grid
              h-14
              grid-cols-[1fr_auto]
              items-center
              rounded-[18px]
              border
              border-[rgba(145,100,245,0.24)]
              bg-[#15121B]
              pl-4
              pr-2
              shadow-[inset_0_1px_0_rgba(247,245,250,0.08),inset_0_-1px_0_rgba(0,0,0,0.55),0_8px_18px_-6px_rgba(0,0,0,0.75),0_24px_48px_-18px_rgba(0,0,0,0.9)]
              md:h-[72px]
              md:grid-cols-[1fr_auto_1fr]
              md:rounded-[22px]
              md:pl-6
              md:pr-3
            "
          >
            {/* LOGO */}

            <a
              href="#top"
              aria-label="Akash Hanif — Back to top"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
                closeMobileMenu();
              }}
              className={`
                group
                inline-flex
                w-fit
                items-center
                gap-2.5
                rounded-lg
                ${FOCUS}
              `}
            >
              <span
                aria-hidden="true"
                className="
                  grid
                  h-8
                  w-8
                  shrink-0
                  place-items-center
                  rounded-lg
                  bg-[#9164F5]
                  text-[#08070B]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_0_#5B36BD]
                  transition-transform
                  duration-300
                  group-hover:-rotate-6
                  motion-reduce:transition-none
                  motion-reduce:group-hover:rotate-0
                "
              >
                <Play
                  size={14}
                  fill="currentColor"
                  strokeWidth={0}
                  className="ml-0.5"
                />
              </span>

              <span
                className={`
                  ${FONT_DISPLAY}
                  whitespace-nowrap
                  text-[18px]
                  font-bold
                  leading-none
                  tracking-[-0.035em]
                  text-[#F7F5FA]
                  md:text-[20px]
                `}
              >
                Akash Hanif
              </span>

              <span
                aria-hidden="true"
                className={`
                  ${FONT_BODY}
                  hidden
                  whitespace-nowrap
                  border-l
                  border-[rgba(145,100,245,0.3)]
                  pl-2.5
                  text-[13px]
                  font-bold
                  text-[#B9A0FF]
                  xl:inline
                `}
              >
                Edits Lab
              </span>
            </a>

            {/* DESKTOP NAVIGATION */}

            <nav
              aria-label="Primary navigation"
              className="
                hidden
                items-center
                gap-1
                md:flex
                lg:gap-1.5
              "
            >
              {NAV.map((item) => {
                const isActive = active === item.id;

                const isUnavailable =
                  available[item.id] === false;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) =>
                      navigate(event, item)
                    }
                    aria-current={
                      isActive ? "location" : undefined
                    }
                    aria-disabled={
                      isUnavailable ? true : undefined
                    }
                    className={`
                      group
                      relative
                      rounded-xl
                      px-3
                      py-2.5
                      text-[14px]
                      font-bold
                      tracking-[-0.01em]
                      transition-colors
                      duration-300
                      lg:px-[18px]
                      lg:text-[15px]
                      ${FOCUS}
                      ${
                        isUnavailable
                          ? "cursor-not-allowed text-[#AAA5B5] opacity-40"
                          : isActive
                            ? "bg-[rgba(247,245,250,0.05)] text-[#F7F5FA]"
                            : "text-[#AAA5B5] hover:bg-[rgba(247,245,250,0.05)] hover:text-[#F7F5FA]"
                      }
                    `}
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`
                        absolute
                        bottom-[3px]
                        left-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        rounded-full
                        bg-[#B9A0FF]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }
                      `}
                    />
                  </a>
                );
              })}
            </nav>

            {/* NAVIGATION ACTIONS */}

            <div className="flex items-center justify-self-end">
              <BookLink
                className={`
                  ${PRIMARY}
                  hidden
                  h-12
                  px-6
                  text-[15px]
                  md:inline-flex
                `}
              >
                Book a Call

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className={ARROW}
                />
              </BookLink>

              <button
                ref={toggleRef}
                type="button"
                aria-label={
                  open ? "Close menu" : "Open menu"
                }
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => {
                  if (open) {
                    restoreFocusRef.current = true;
                  }

                  setOpen((previous) => !previous);
                }}
                className={`
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[rgba(145,100,245,0.25)]
                  bg-[#100D15]
                  text-[#F7F5FA]
                  transition-colors
                  duration-300
                  hover:border-[#B9A0FF]
                  md:hidden
                  ${FOCUS}
                `}
              >
                {open ? (
                  <X size={22} aria-hidden="true" />
                ) : (
                  <Menu size={22} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`
            fixed
            inset-0
            z-40
            bg-[rgba(8,7,11,0.88)]
            md:hidden
            ${NAV_GUTTER}
          `}
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + 74px)",
            paddingBottom:
              "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              restoreFocusRef.current = true;
              setOpen(false);
            }
          }}
        >
          <div
            ref={menuRef}
            className="
              mx-auto
              max-h-full
              max-w-[1200px]
              overflow-y-auto
              overscroll-contain
              rounded-[22px]
              border
              border-[rgba(145,100,245,0.25)]
              bg-[#15121B]
              p-3
              shadow-[0_24px_60px_rgba(0,0,0,0.8)]
            "
          >
            <nav aria-label="Mobile navigation">
              <ul>
                {NAV.map((item, index) => {
                  const isActive = active === item.id;

                  const isUnavailable =
                    available[item.id] === false;

                  return (
                    <li
                      key={item.id}
                      className={
                        index > 0
                          ? "border-t border-[rgba(145,100,245,0.18)]"
                          : ""
                      }
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(event) =>
                          navigate(event, item, true)
                        }
                        aria-current={
                          isActive
                            ? "location"
                            : undefined
                        }
                        aria-disabled={
                          isUnavailable
                            ? true
                            : undefined
                        }
                        className={`
                          ${FONT_DISPLAY}
                          flex
                          min-h-[64px]
                          items-center
                          justify-between
                          rounded-xl
                          px-3
                          text-[25px]
                          font-bold
                          tracking-[-0.04em]
                          transition-colors
                          duration-300
                          hover:bg-[rgba(247,245,250,0.04)]
                          ${FOCUS}
                          ${
                            isUnavailable
                              ? "text-[#AAA5B5] opacity-40"
                              : "text-[#F7F5FA]"
                          }
                        `}
                      >
                        <span className="flex items-center gap-3">
                          {item.label}

                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-[#B9A0FF]
                              "
                            />
                          )}
                        </span>

                        <ArrowUpRight
                          size={23}
                          aria-hidden="true"
                          className="text-[#9164F5]"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="
                mt-3
                flex
                flex-col
                gap-3
                border-t
                border-[rgba(145,100,245,0.18)]
                pt-4
              "
            >
              <BookLink
                onNavigate={closeMobileMenu}
                className={`
                  ${PRIMARY}
                  h-[54px]
                  w-full
                  text-[15px]
                `}
              >
                Book a Call

                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className={ARROW}
                />
              </BookLink>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className={`
                  ${SECONDARY}
                  h-[54px]
                  w-full
                  text-[15px]
                `}
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  className="text-[#B9A0FF]"
                />

                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   VIDEO PLAYER

   Features:
   - Responsive 16:9 aspect ratio
   - Three-dimensional bezel appearance
   - Lazy YouTube loading
   - Thumbnail fallback
   - Accessible playback button
   - No hydration-dependent rendering
   - No Framer Motion hydration mismatch
   ============================================================ */

function VslPlayer() {
  const [playing, setPlaying] = useState(false);

  const [posterIndex, setPosterIndex] = useState(0);

  const frameRef = useRef<HTMLIFrameElement>(null);

  const poster = POSTERS[posterIndex];

  const nextPoster = useCallback(() => {
    setPosterIndex((previous) =>
      Math.min(previous + 1, POSTERS.length)
    );
  }, []);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setTimeout(() => {
      frameRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [playing]);

  return (
    <div
      id="showreel"
      className="
        group
        relative
        w-full
        rounded-[16px]
        border
        border-[rgba(145,100,245,0.34)]
        bg-[#15121B]
        p-[5px]
        shadow-[inset_0_1px_0_rgba(247,245,250,0.1),0_2px_0_#211A2E,0_4px_0_#181220,0_6px_0_#100C17,0_12px_18px_-6px_rgba(0,0,0,0.7),0_28px_48px_-18px_rgba(0,0,0,0.9)]
        transition-[transform,border-color]
        duration-500
        ease-out
        hover:-translate-y-1
        hover:border-[rgba(185,160,255,0.65)]
        motion-reduce:transition-none
        motion-reduce:hover:translate-y-0
        sm:rounded-[20px]
        sm:p-[7px]
      "
    >
      <div
        className="
          relative
          aspect-video
          w-full
          overflow-hidden
          rounded-[11px]
          bg-[#100D15]
          sm:rounded-[13px]
        "
      >
        {playing ? (
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${VSL_ID}?autoplay=1&rel=0&playsinline=1`}
            title={VSL_TITLE}
            className="
              absolute
              inset-0
              h-full
              w-full
              border-0
              bg-black
            "
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${VSL_TITLE}`}
            className={`
              group/play
              absolute
              inset-0
              block
              h-full
              w-full
              cursor-pointer
              overflow-hidden
              bg-[#100D15]
              ${FOCUS}
            `}
          >
            {/* VIDEO THUMBNAIL */}

            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={poster}
                src={poster}
                alt="Thumbnail for the Aakash Edits Lab studio showreel"
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
                draggable={false}
                onError={nextPoster}
                onLoad={(event) => {
                  if (
                    event.currentTarget.naturalWidth <
                    400
                  ) {
                    nextPoster();
                  }
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover/play:scale-[1.025]
                  motion-reduce:transition-none
                  motion-reduce:group-hover/play:scale-100
                "
              />
            )}

            {/* POSTER OVERLAY */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-[rgba(8,7,11,0.32)]
                transition-colors
                duration-500
                group-hover/play:bg-[rgba(8,7,11,0.18)]
              "
            />

            {/* PLAY BUTTON */}

            <span
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <span
                className="
                  grid
                  place-items-center
                  rounded-full
                  border
                  border-[rgba(247,245,250,0.3)]
                  bg-[rgba(8,7,11,0.5)]
                  p-[7px]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover/play:scale-[1.08]
                  motion-reduce:transition-none
                  motion-reduce:group-hover/play:scale-100
                  sm:p-[9px]
                "
              >
                <span
                  className="
                    grid
                    h-[58px]
                    w-[58px]
                    place-items-center
                    rounded-full
                    bg-[#9164F5]
                    text-[#08070B]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_0_#5B36BD,0_14px_24px_-10px_rgba(0,0,0,0.95)]
                    transition-colors
                    duration-300
                    group-hover/play:bg-[#A27BFF]
                    sm:h-[68px]
                    sm:w-[68px]
                  "
                >
                  <Play
                    size={25}
                    fill="currentColor"
                    strokeWidth={0}
                    className="ml-1"
                  />
                </span>
              </span>
            </span>

            {/* VIDEO LABEL */}

            <span
              aria-hidden="true"
              className={`
                ${FONT_BODY}
                absolute
                bottom-3
                left-3
                rounded-md
                border
                border-[rgba(247,245,250,0.15)]
                bg-[rgba(8,7,11,0.78)]
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#F7F5FA]
                sm:bottom-4
                sm:left-4
                sm:text-[11px]
              `}
            >
              Studio Showreel
            </span>
          </button>
        )}

        {/* INNER SCREEN BORDER */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            rounded-[inherit]
            shadow-[inset_0_0_0_1px_rgba(145,100,245,0.2)]
          "
        />
      </div>
    </div>
  );
}

/* ============================================================
   HERO SECTION

   Hydration-safe implementation:
   - Deterministic initial render
   - CSS-only entrance animations
   - No server/client motion preference mismatch
   - No Framer Motion initial/animate style differences
   - Responsive desktop and mobile layouts
   - Functional navbar
   - Functional video
   - Functional booking and WhatsApp links
   ============================================================ */

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className={`
        ${display.variable}
        ${body.variable}
        ${FONT_BODY}
        relative
        isolate
        overflow-x-clip
        bg-[#08070B]
        text-[#F7F5FA]
        antialiased
      `}
    >
      <Navbar />

      <div
        className={`
          ${GUTTER}
          mx-auto
          max-w-[1280px]
          pb-14
          pt-[calc(env(safe-area-inset-top,0px)+90px)]
          md:pt-[calc(env(safe-area-inset-top,0px)+132px)]
          lg:pb-20
          lg:pt-[calc(env(safe-area-inset-top,0px)+145px)]
        `}
      >
        <div
          className="
            flex
            flex-col
            lg:grid
            lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]
            lg:content-center
            lg:gap-x-10
            xl:gap-x-16
          "
        >
          {/* ==================================================
              HERO TEXT
              ================================================== */}

          <div
            className="
              min-w-0
              lg:col-start-1
              lg:row-start-1
            "
          >
            {/* EYEBROW */}

            <p
              className="
                mb-4
                flex
                items-center
                gap-3
                text-[12px]
                font-bold
                leading-relaxed
                tracking-[0.005em]
                text-[#AAA5B5]
                sm:text-[13px]
                lg:mb-5
                lg:text-[14px]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-7
                  shrink-0
                  bg-[#B9A0FF]
                  sm:w-8
                "
              />

              Video editing &amp; creative production studio
            </p>

            {/* MAIN HEADLINE */}

            <h1
              id="hero-heading"
              className={`
                ${FONT_DISPLAY}
                font-bold
                leading-[1.05]
                tracking-[-0.048em]
                text-[#F7F5FA]
                text-[clamp(2.15rem,9.3vw,3.6rem)]
                sm:text-[clamp(3.5rem,7.8vw,4.75rem)]
                lg:text-[clamp(3.1rem,4.65vw,4.6rem)]
              `}
            >
              <span className="block">
                Video ads that
              </span>

              <span className="block">
                make people
              </span>

              <span className="block">
                <span className="text-[#9164F5]">
                  stop
                </span>

                <span className="text-[#B9A0FF]">
                  .
                </span>
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-[29rem]
                text-[clamp(1rem,3.8vw,1.1875rem)]
                font-medium
                leading-[1.7]
                text-[#AAA5B5]
                lg:mt-6
              "
            >
              UGC ads, VSLs, and performance-focused
              video creatives for DTC and ecommerce
              brands.
            </p>
          </div>

          {/* ==================================================
              VIDEO SHOWREEL
              ================================================== */}

          <div
            className="
              mt-8
              min-w-0
              pb-2
              lg:col-start-2
              lg:row-span-3
              lg:row-start-1
              lg:mt-0
              lg:self-center
              lg:pb-0
            "
          >
            <VslPlayer />
          </div>

          {/* ==================================================
              CALL TO ACTION BUTTONS
              ================================================== */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:flex-wrap
              lg:col-start-1
              lg:row-start-2
              lg:mt-9
            "
          >
            <BookLink
              className={`
                ${PRIMARY}
                min-h-[54px]
                px-7
                py-3
                text-[15px]
              `}
            >
              Book a Call

              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className={ARROW}
              />
            </BookLink>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${SECONDARY}
                min-h-[54px]
                px-7
                py-3
                text-[15px]
              `}
            >
              <MessageCircle
                size={18}
                aria-hidden="true"
                className="
                  text-[#B9A0FF]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  motion-reduce:transition-none
                  motion-reduce:group-hover:translate-y-0
                "
              />

              Chat on WhatsApp
            </a>
          </div>

          {/* ==================================================
              CREDIBILITY STATISTICS
              ================================================== */}

          <dl
            className="
              mt-8
              flex
              items-stretch
              gap-6
              border-t
              border-[rgba(145,100,245,0.2)]
              pt-6
              sm:gap-10
              lg:col-start-1
              lg:row-start-3
              lg:mt-11
            "
          >
            {/* PROJECTS */}

            <div className="flex min-w-0 flex-col-reverse">
              <dt
                className="
                  mt-2
                  text-[12px]
                  font-medium
                  leading-snug
                  text-[#AAA5B5]
                  sm:text-[13px]
                "
              >
                Projects delivered
              </dt>

              <dd
                className={`
                  ${FONT_DISPLAY}
                  text-[28px]
                  font-bold
                  leading-none
                  tracking-[-0.04em]
                  text-[#F7F5FA]
                  lg:text-[32px]
                `}
              >
                1000
                <span className="text-[#B9A0FF]">
                  +
                </span>
              </dd>
            </div>

            {/* DIVIDER */}

            <div
              aria-hidden="true"
              className="
                w-px
                shrink-0
                bg-[rgba(145,100,245,0.22)]
              "
            />

            {/* EXPERIENCE */}

            <div className="flex min-w-0 flex-col-reverse">
              <dt
                className="
                  mt-2
                  text-[12px]
                  font-medium
                  leading-snug
                  text-[#AAA5B5]
                  sm:text-[13px]
                "
              >
                Years of experience
              </dt>

              <dd
                className={`
                  ${FONT_DISPLAY}
                  text-[28px]
                  font-bold
                  leading-none
                  tracking-[-0.04em]
                  text-[#F7F5FA]
                  lg:text-[32px]
                `}
              >
                2
                <span className="text-[#B9A0FF]">
                  +
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}