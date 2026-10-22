"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MessageCircle,
  Phone,
} from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { Manrope, Space_Grotesk } from "next/font/google";

/* ------------------------------------------------------------------ */
/* Fonts: identical configs to Hero and the other sections              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Cal.com                                                             */
/* ------------------------------------------------------------------ */

const CAL_LINK = "Aakash-creative-studio/30min";
const CAL_NAMESPACE = "30min";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_PAGE_URL = `https://cal.com/${CAL_LINK}`;
const CAL_TIMEOUT_MS = 15000;

// Official Cal.com loader snippet, unchanged. Injected once, on the client only.
const CAL_LOADER = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_ORIGIN}/embed/embed.js", "init");`;

type CalFn = (...args: unknown[]) => void;
type CalApi = CalFn & {
  ns?: Record<string, CalFn>;
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalendarStatus = "idle" | "loading" | "ready" | "error";

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "+92 333 56736933";
const PHONE_HREF = "tel:+9233356736933";
// wa.me needs digits only: country code + number, no "+" and no leading 0.
const WHATSAPP_URL =
  "https://wa.me/9233356736933?text=Hi%2C%20I%E2%80%99d%20like%20to%20book%20a%20free%20consultation!";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const trustModules: ReadonlyArray<{ value: string; label: string }> = [
  { value: "30 min", label: "Focused consultation" },
  { value: "Free", label: "No consultation fee" },
  { value: "Direct", label: "Practical next steps" },
];

const callTopics: ReadonlyArray<string> = [
  "Your brand, offer, and current goals",
  "Creative challenges holding content back",
  "Opportunities for stronger-performing content",
  "A clear, practical next step",
];

/* ------------------------------------------------------------------ */
/* Design tokens (solid colors only, same palette as the Hero)         */
/*   Background #08070B   Surface #15121B   Recess #100D15             */
/*   Violet #9164F5   Deep violet #7A4AE6   Lavender #B9A0FF           */
/*   Text #F7F5FA   Secondary #AAA5B5                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BORDER = "border-[rgba(145,100,245,0.18)]";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#9164F5]";

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 motion-reduce:transition-none";

const PRIMARY = `${BTN} bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_0_#5B36BD,0_10px_20px_-10px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:bg-[#7A4AE6] hover:text-[#F7F5FA] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_3px_0_#4B2AA3,0_14px_24px_-10px_rgba(0,0,0,0.95)] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const SECONDARY = `${BTN} border border-[rgba(145,100,245,0.42)] bg-[#100D15] text-[#F7F5FA] shadow-[inset_0_1px_0_rgba(247,245,250,0.05),0_10px_20px_-12px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:border-[rgba(185,160,255,0.7)] hover:bg-[#15121B] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const ARROW =
  "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0";

const CARD_SHADOW: CSSProperties = {
  boxShadow: [
    "inset 0 1px 0 rgba(247,245,250,0.06)",
    "inset 0 -1px 0 rgba(0,0,0,0.5)",
    "0 1px 2px rgba(0,0,0,0.6)",
    "0 18px 36px -18px rgba(0,0,0,0.85)",
  ].join(", "),
};

/*
 * HYDRATION SAFETY
 * Nothing rendered here depends on the visitor's "reduce motion" setting or
 * any browser-only value. Entrance props are always identical, and
 * <MotionConfig reducedMotion="user"> only changes how they play. Plain CSS
 * differences use Tailwind motion-reduce: variants. matchMedia is read only
 * inside the click handler, and Cal.com is loaded only inside effects.
 */
const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Booking() {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [loadCalendar, setLoadCalendar] = useState(false);
  const [status, setStatus] = useState<CalendarStatus>("idle");

  const initialiseCalendar = useCallback(() => {
    const parentElement = calendarRef.current;
    if (!parentElement || parentElement.dataset.initialised === "true") return;
    parentElement.dataset.initialised = "true";

    try {
      if (!window.Cal) {
        const loader = document.createElement("script");
        loader.text = CAL_LOADER;
        document.head.appendChild(loader);
      }
      const Cal = window.Cal;
      if (!Cal) throw new Error("Cal.com loader unavailable");

      Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      const ns = Cal.ns?.[CAL_NAMESPACE];
      if (!ns) throw new Error("Cal.com namespace unavailable");

      ns("on", { action: "linkReady", callback: () => setStatus("ready") });
      ns("on", { action: "linkFailed", callback: () => setStatus("error") });
      ns("inline", {
        elementOrSelector: parentElement,
        calLink: CAL_LINK,
        layout: "month_view",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme: "dark",
        },
      });
      ns("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        // Match the site's violet. Unknown keys are ignored by older embeds.
        cssVarsPerTheme: {
          dark: { "cal-brand": "#9164F5" },
          light: { "cal-brand": "#9164F5" },
        },
        styles: { branding: { brandColor: "#9164F5" } },
      });
    } catch {
      parentElement.dataset.initialised = "false";
      setStatus("error");
    }
  }, []);

  // Lazy-load Cal.com when the section approaches the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setLoadCalendar(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loadCalendar) return;
    setStatus((current) => (current === "idle" ? "loading" : current));
    initialiseCalendar();
  }, [loadCalendar, initialiseCalendar]);

  // Fall back to the error state if Cal.com never becomes ready.
  useEffect(() => {
    if (status !== "loading") return undefined;
    const timeout = window.setTimeout(
      () => setStatus((current) => (current === "loading" ? "error" : current)),
      CAL_TIMEOUT_MS
    );
    return () => window.clearTimeout(timeout);
  }, [status]);

  const goToCalendar = (event: MouseEvent<HTMLAnchorElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    event.preventDefault();
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    frame.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
    frame.focus({ preventScroll: true });
  };

  const isLoading = status === "idle" || status === "loading";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="booking"
        ref={sectionRef}
        aria-labelledby={headingId}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto grid max-w-[1280px] gap-10 xl:grid-cols-[5fr_6.4fr] xl:gap-x-16 xl:gap-y-10">
          {/* Intro */}
          <header className="xl:col-start-1 xl:row-start-1">
            <motion.p
              {...reveal(0, 14)}
              className={`mb-5 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              Free creative consultation
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              id={headingId}
              className={`${display.className} text-[2.3rem] font-bold leading-[1.05] tracking-[-0.045em] text-[#F7F5FA] [text-wrap:balance] min-[400px]:text-[2.7rem] sm:text-5xl lg:text-[3.5rem]`}
            >
              <span className="block">Your next creative</span>
              <span className="block text-[#9164F5]">starts here.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mt-5 max-w-lg text-[15px] font-medium leading-7 text-[#AAA5B5] sm:mt-6 sm:text-base"
            >
              Bring your goals, offer, campaign, or creative challenge.
              We&apos;ll use 30 focused minutes to understand what you&apos;re
              trying to achieve and map out the clearest next step.
            </motion.p>
          </header>

          {/* Trust modules */}
          <ul
            aria-label="About the consultation"
            className="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[460px]:grid-cols-3 xl:col-start-1 xl:row-start-2"
          >
            {trustModules.map(({ value, label }, index) => (
              <motion.li
                key={value}
                {...reveal(0.1 + index * 0.07)}
                style={CARD_SHADOW}
                className={`flex min-w-0 items-center gap-4 rounded-[20px] border ${BORDER} bg-[#15121B] px-5 py-4 min-[460px]:flex-col min-[460px]:items-start min-[460px]:gap-2`}
              >
                <span
                  className={`${display.className} min-w-[4.5rem] text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-[#B9A0FF] min-[460px]:min-w-0`}
                >
                  {value}
                </span>
                <span className="text-[13px] font-medium leading-snug text-[#AAA5B5]">
                  {label}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* What we'll cover */}
          <div className="xl:col-start-1 xl:row-start-3">
            <motion.h3
              {...reveal(0)}
              className="mb-4 text-[12px] font-bold uppercase leading-none tracking-[0.22em] text-[#B9A0FF]"
            >
              What we&apos;ll cover
            </motion.h3>

            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {callTopics.map((topic, index) => {
                const n = String(index + 1).padStart(2, "0");
                return (
                  <motion.li
                    key={topic}
                    {...reveal(index * 0.06)}
                    style={CARD_SHADOW}
                    className={`flex min-h-[4rem] items-center gap-4 rounded-[18px] border ${BORDER} bg-[#15121B] px-4 py-3`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${display.className} grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgba(145,100,245,0.28)] bg-[#100D15] text-[15px] font-bold leading-none tabular-nums text-[#B9A0FF]`}
                    >
                      {n}
                    </span>
                    <span className="text-[15px] font-medium leading-6 text-[#F7F5FA]">
                      <span className="sr-only">{n}. </span>
                      {topic}
                    </span>
                  </motion.li>
                );
              })}
            </ol>

            <motion.p
              {...reveal(0.1)}
              className="mt-5 max-w-lg text-[14px] font-medium leading-6 text-[#AAA5B5]"
            >
              No complicated preparation needed. Choose a time and we&apos;ll
              focus on what matters to your brand.
            </motion.p>

            <motion.div {...reveal(0.14)} className="mt-6">
              <a
                href="#booking-calendar"
                onClick={goToCalendar}
                className={`${PRIMARY} h-[54px] w-full px-7 text-[15px] sm:w-auto`}
              >
                Choose a Time
                <ArrowDown
                  size={18}
                  aria-hidden="true"
                  className="xl:hidden"
                />
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="hidden xl:block"
                />
              </a>
            </motion.div>
          </div>

          {/* Booking portal */}
          <motion.div
            {...reveal(0.1, 22)}
            style={CARD_SHADOW}
            className={`min-w-0 rounded-[28px] border ${BORDER} bg-[#15121B] p-3 sm:p-5 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:self-start`}
          >
            {/* Head */}
            <div className="flex items-center gap-3.5 px-1.5 pb-4 pt-1.5 sm:gap-4">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(145,100,245,0.3)] bg-[#100D15] text-[#B9A0FF] shadow-[inset_0_1px_0_rgba(247,245,250,0.06)]"
              >
                <Calendar className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3
                  className={`${display.className} text-[1.25rem] font-bold leading-[1.15] tracking-[-0.03em] text-[#F7F5FA]`}
                >
                  Book your time
                </h3>
                <p className="mt-1 text-[13.5px] font-medium leading-snug text-[#AAA5B5]">
                  Choose a time that works for you.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="ml-auto hidden shrink-0 whitespace-nowrap rounded-full border border-[rgba(145,100,245,0.3)] bg-[#100D15] px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-[#B9A0FF] sm:inline-block"
              >
                30 min &bull; Free
              </span>
            </div>

            {/* Calendar frame.
                No fixed height: the Cal.com embed sizes itself to its content,
                so the whole calendar is visible. min-height prevents layout
                jump while it loads. */}
            <div
              id="booking-calendar"
              ref={frameRef}
              tabIndex={-1}
              aria-label="Booking calendar"
              className={`relative min-h-[640px] scroll-mt-24 overflow-hidden rounded-[20px] border ${BORDER} bg-[#100D15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#9164F5] sm:min-h-[680px]`}
            >
              <div
                ref={calendarRef}
                aria-label="Cal.com booking calendar"
                className="w-full"
              />

              {/* Loading / error overlay */}
              <div
                aria-live="polite"
                className={`absolute inset-0 grid place-items-center bg-[#100D15] p-6 text-center transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${
                  status === "ready"
                    ? "pointer-events-none invisible opacity-0"
                    : "visible opacity-100"
                }`}
              >
                {isLoading ? (
                  <div className="max-w-xs">
                    <span
                      aria-hidden="true"
                      className="mx-auto block h-11 w-11 animate-spin rounded-full border-2 border-[rgba(145,100,245,0.25)] border-t-[#9164F5] motion-reduce:animate-none"
                    />
                    <p
                      className={`${display.className} mt-5 text-[1.1rem] font-bold tracking-[-0.02em] text-[#F7F5FA]`}
                    >
                      Preparing your calendar
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-6 text-[#AAA5B5]">
                      Your available times will appear in a moment.
                    </p>
                  </div>
                ) : null}

                {status === "error" ? (
                  <div className="w-full max-w-sm">
                    <p
                      className={`${display.className} text-[1.2rem] font-bold leading-tight tracking-[-0.03em] text-[#F7F5FA]`}
                    >
                      The calendar couldn&apos;t load.
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-6 text-[#AAA5B5]">
                      That&apos;s okay. Open the booking page directly, or
                      contact me and we&apos;ll find a time.
                    </p>
                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={CAL_PAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${PRIMARY} h-[50px] px-6 text-[15px]`}
                      >
                        Open booking page
                        <ArrowUpRight
                          size={18}
                          aria-hidden="true"
                          className={ARROW}
                        />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <a
                        href={PHONE_HREF}
                        className={`${SECONDARY} h-[50px] px-6 text-[15px]`}
                      >
                        <Phone
                          size={18}
                          aria-hidden="true"
                          className="text-[#B9A0FF]"
                        />
                        Call {PHONE_DISPLAY}
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${SECONDARY} h-[50px] px-6 text-[15px]`}
                      >
                        <MessageCircle
                          size={18}
                          aria-hidden="true"
                          className="text-[#B9A0FF]"
                        />
                        Talk on WhatsApp
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Direct contact */}
            <div className="flex flex-col gap-3 px-1.5 pb-1.5 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <p className="text-[14px] font-medium leading-snug text-[#AAA5B5]">
                Prefer to talk directly?
              </p>
              <div className="flex flex-col gap-2.5 min-[460px]:flex-row">
                <a
                  href={PHONE_HREF}
                  className={`${SECONDARY} h-12 px-5 text-[14px]`}
                >
                  <Phone
                    size={16}
                    aria-hidden="true"
                    className="text-[#B9A0FF]"
                  />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${SECONDARY} h-12 px-5 text-[14px]`}
                >
                  <MessageCircle
                    size={16}
                    aria-hidden="true"
                    className="text-[#B9A0FF]"
                  />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}