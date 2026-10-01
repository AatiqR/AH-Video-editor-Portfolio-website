"use client";

import { Geist } from "next/font/google";
import { ArrowRight, Calendar, MessageCircle, Phone } from "lucide-react";
import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const geist = Geist({ subsets: ["latin"] });

/* ------------------------------------------------------------------ */
/* Cal.com                                                             */
/* ------------------------------------------------------------------ */
const CAL_LINK = "aakash-creative-studio/30min";
const CAL_NAMESPACE = "30min";
const CAL_ORIGIN = "https://app.cal.com";

// Official Cal.com loader snippet, unchanged. Injected once, on the client only.
const CAL_LOADER = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_ORIGIN}/embed/embed.js", "init");`;

type CalFn = (...args: unknown[]) => void;
type CalApi = CalFn & { ns?: Record<string, CalFn>; config?: Record<string, unknown> };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const phoneDisplay = "+92 3125993603";
const phoneHref = "tel:+923125993603";
// Same WhatsApp destination used in the Footer.
const whatsappUrl =
  "https://wa.me/+9203125993603?text=Hi,%20I%E2%80%99d%20like%20to%20book%20a%20free%20consultation!";

type CalendarStatus = "idle" | "loading" | "ready" | "error";

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

type Delay = CSSProperties & Record<"--d", string>;
const delay = (ms: number): Delay => ({ "--d": `${ms}ms` }) as Delay;
type SectionStyle = CSSProperties & Record<"--font-display", string>;

type GlowFrame = { el: HTMLElement; x: number; y: number; w: number; h: number };
const MAX_TILT = 1; // degrees

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const glowTargetRef = useRef<HTMLElement | null>(null);
  const pendingRef = useRef<GlowFrame | null>(null);
  const rafRef = useRef<number | null>(null);
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
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" },
      });
      ns("ui", { hideEventTypeDetails: false, layout: "month_view" });
    } catch {
      parentElement.dataset.initialised = "false";
      setStatus("error");
    }
  }, []);

  // Lazy-load Cal.com when the section approaches the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Scroll reveal.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveal = () => section.classList.add("is-revealed");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
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
    if (status !== "loading") return;
    const timeout = window.setTimeout(
      () => setStatus((current) => (current === "loading" ? "error" : current)),
      15000,
    );
    return () => window.clearTimeout(timeout);
  }, [status]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const resetGlow = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const handleGlowMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
    const el = event.target.closest<HTMLElement>("[data-glow]");
    if (!el) return;
    if (glowTargetRef.current && glowTargetRef.current !== el) resetGlow(glowTargetRef.current);
    glowTargetRef.current = el;
    const rect = el.getBoundingClientRect();
    pendingRef.current = {
      el,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const f = pendingRef.current;
      if (!f) return;
      f.el.style.setProperty("--mx", `${f.x}px`);
      f.el.style.setProperty("--my", `${f.y}px`);
      f.el.style.setProperty("--rx", `${((0.5 - f.y / f.h) * MAX_TILT * 2).toFixed(2)}deg`);
      f.el.style.setProperty("--ry", `${((f.x / f.w - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
    });
  };

  const handleGlowLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    resetGlow(glowTargetRef.current);
    glowTargetRef.current = null;
  };

  const goToCalendar = (event: MouseEvent<HTMLAnchorElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frame.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    frame.focus({ preventScroll: true });
  };

  const sectionStyle: SectionStyle = {
    "--font-display": `"Moon Walk", ${geist.style.fontFamily}`,
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      aria-labelledby="booking-heading"
      className={`booking ${geist.className}`}
      style={sectionStyle}
    >
      {/* Atmosphere */}
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-horizon" aria-hidden="true" />
      <span className="orb orb-a" aria-hidden="true" />
      <span className="orb orb-b" aria-hidden="true" />
      <span className="ring" aria-hidden="true" />
      <span className="spark" aria-hidden="true" />

      <div className="shell" onPointerMove={handleGlowMove} onPointerLeave={handleGlowLeave}>
        <header className="intro">
          <p className="eyebrow reveal" style={delay(60)}>
            <span className="pulse" aria-hidden="true" />
            Free creative consultation
          </p>
          <h2 id="booking-heading" className="headline reveal" style={delay(140)}>
            <span className="headline-main">Your next creative</span>
            <span className="headline-display">starts here.</span>
          </h2>
          <p className="lede reveal" style={delay(220)}>
            Bring your goals, offer, campaign, or creative challenge. We&apos;ll use
            30 focused minutes to understand what you&apos;re trying to achieve and map
            out the clearest next step.
          </p>
        </header>

        <ul className="trust" aria-label="About the consultation">
          {trustModules.map(({ value, label }, i) => (
            <li key={value} className="module reveal" style={delay(300 + i * 80)} data-glow>
              <span className="module-value">{value}</span>
              <span className="module-label">{label}</span>
            </li>
          ))}
        </ul>

        <div className="cover">
          <h3 className="cover-title reveal" style={delay(380)}>
            What we&apos;ll cover
          </h3>
          <ol className="cover-list">
            {callTopics.map((topic, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <li key={topic} className="topic reveal" style={delay(440 + i * 80)} data-glow>
                  <span className="num" data-n={n} aria-hidden="true">
                    {n}
                  </span>
                  <span className="topic-text">
                    <span className="visually-hidden">{n}. </span>
                    {topic}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="note reveal" style={delay(780)}>
            No complicated preparation needed. Choose a time and we&apos;ll focus on what matters to your brand.
          </p>
          <a className="cta reveal" style={delay(840)} href="#booking-calendar" onClick={goToCalendar}>
            <span className="cta-shine" aria-hidden="true" />
            <span className="cta-label">Choose a Time</span>
            <span className="cta-arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        </div>

        {/* Consultation portal */}
        <div className="portal-wrap reveal" style={delay(520)}>
          <div className="portal">
            <span className="portal-edge" aria-hidden="true" />
            <div className="portal-head">
              <span className="chamber" aria-hidden="true">
                <Calendar />
              </span>
              <div>
                <h3>Book your time</h3>
                <p>Choose a time that works for you.</p>
              </div>
              <span className="chip" aria-hidden="true">
                30 min &bull; Free
              </span>
            </div>

            <div
              id="booking-calendar"
              ref={frameRef}
              tabIndex={-1}
              className="calendar-frame"
              aria-label="Booking calendar"
            >
              <div ref={calendarRef} className="calendar" aria-label="Cal.com booking calendar" />
              <div className="overlay" data-state={status} aria-live="polite">
                {status === "idle" || status === "loading" ? (
                  <div className="state">
                    <span className="loader" aria-hidden="true">
                      <span />
                    </span>
                    <p className="state-title">Preparing your consultation space</p>
                    <p className="state-copy">Your available times will appear shortly.</p>
                    <span className="shimmer" aria-hidden="true" />
                  </div>
                ) : null}
                {status === "error" ? (
                  <div className="state">
                    <p className="state-title">Your calendar couldn&apos;t load.</p>
                    <p className="state-copy">
                      That&apos;s okay &mdash; you can contact me directly and we&apos;ll find a suitable time.
                    </p>
                    <div className="state-actions">
                      <a className="btn btn-solid" href={phoneHref}>
                        <Phone aria-hidden="true" />
                        Call {phoneDisplay}
                      </a>
                      <a className="btn btn-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle aria-hidden="true" />
                        Talk on WhatsApp
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="direct">
              <p>Prefer to talk directly?</p>
              <div className="direct-links">
                <a href={phoneHref}>
                  <Phone aria-hidden="true" />
                  {phoneDisplay}
                  <ArrowRight aria-hidden="true" className="go" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  WhatsApp
                  <ArrowRight aria-hidden="true" className="go" />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking {
          --black: #000;
          --near: #050507;
          --violet: #6d28d9;
          --purple: #a855f7;
          --fuchsia: #d946ef;
          --lavender: #c4b5fd;
          --gray: #9a9bb0;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          isolation: isolate;
          overflow: clip;
          background: var(--near);
          color: #fff;
          padding: clamp(4.5rem, 8vw, 9rem) clamp(1rem, 4vw, 4rem);
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        /* Atmosphere */
        .bg-glow {
          position: absolute;
          z-index: -3;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.6s var(--ease);
          background:
            radial-gradient(ellipse 55% 40% at 75% 40%, rgba(109, 40, 217, 0.2), transparent 70%),
            radial-gradient(ellipse 30% 25% at 4% 85%, rgba(217, 70, 239, 0.1), transparent 75%),
            linear-gradient(180deg, var(--black), var(--near) 50%, var(--black));
        }
        .is-revealed .bg-glow { opacity: 1; }
        .bg-grid {
          position: absolute;
          z-index: -2;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 4.5rem 4.5rem;
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 65% 45%, #000, transparent 75%);
          mask-image: radial-gradient(ellipse 70% 60% at 65% 45%, #000, transparent 75%);
        }
        .bg-horizon {
          position: absolute;
          z-index: -2;
          top: 0;
          left: 50%;
          width: min(80rem, 130%);
          height: 1px;
          translate: -50% 0;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.55), rgba(217, 70, 239, 0.45), transparent);
          box-shadow: 0 0 36px 4px rgba(124, 58, 237, 0.22);
          pointer-events: none;
        }
        .orb, .ring, .spark { position: absolute; z-index: -1; pointer-events: none; }
        .orb { border-radius: 50%; }
        .orb-a {
          top: 12%;
          right: -4rem;
          width: clamp(12rem, 26vw, 24rem);
          aspect-ratio: 1;
          background: radial-gradient(circle at 35% 30%, rgba(196, 181, 253, 0.25), rgba(109, 40, 217, 0.3) 40%, transparent 70%);
          filter: blur(14px);
          animation: drift 18s ease-in-out infinite;
        }
        .orb-b {
          bottom: 10%;
          left: 2%;
          width: clamp(6rem, 12vw, 11rem);
          aspect-ratio: 1;
          background: radial-gradient(circle at 35% 30%, rgba(217, 70, 239, 0.3), rgba(109, 40, 217, 0.12) 50%, transparent 72%);
          filter: blur(10px);
          animation: drift 14s ease-in-out -5s infinite;
        }
        .ring {
          top: 46%;
          right: 5%;
          width: clamp(8rem, 16vw, 15rem);
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.22);
          transform: rotateX(68deg) rotate(0deg);
          animation: ring-spin 28s linear infinite;
        }
        .spark {
          top: 30%;
          left: 46%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--lavender);
          box-shadow: 0 0 12px 3px rgba(196, 181, 253, 0.6);
          animation: drift 10s ease-in-out -2s infinite;
        }

        /* Layout */
        .shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(2rem, 4vw, 3rem);
          max-width: 88rem;
          margin: 0 auto;
        }
        .reveal {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition:
            opacity 1s var(--d, 0ms) var(--ease),
            transform 1s var(--d, 0ms) var(--ease);
        }
        .is-revealed .reveal { opacity: 1; transform: translate3d(0, 0, 0); }

        /* Header */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin: 0 0 1.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          background: linear-gradient(90deg, var(--lavender), var(--fuchsia));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .pulse {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--fuchsia);
          box-shadow: 0 0 12px rgba(217, 70, 239, 0.9);
        }
        .pulse::after {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid rgba(217, 70, 239, 0.6);
          animation: pulse 3.2s ease-out infinite;
        }
        .headline { margin: 0; font-weight: 600; }
        .headline-main {
          display: block;
          font-size: clamp(2.7rem, 7vw, 6rem);
          letter-spacing: -0.065em;
          line-height: 0.98;
          text-wrap: balance;
        }
        .headline-display {
          display: block;
          margin-top: 0.3em;
          padding-bottom: 0.12em;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4.2vw, 3.6rem);
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1.12;
          background: linear-gradient(100deg, #fff 0%, var(--lavender) 28%, var(--purple) 62%, var(--fuchsia) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 24px rgba(168, 85, 247, 0.3));
        }
        .lede {
          max-width: 34rem;
          margin: clamp(1.4rem, 3vw, 2rem) 0 0;
          color: var(--gray);
          font-size: clamp(1rem, 1.3vw, 1.12rem);
          line-height: 1.7;
        }

        /* Trust modules */
        .trust {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .module, .topic {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.11);
          background:
            linear-gradient(145deg, rgba(168, 85, 247, 0.08), rgba(255, 255, 255, 0.015) 45%),
            rgba(5, 5, 9, 0.7);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 14px 30px rgba(0, 0, 0, 0.35);
          transition:
            opacity 1s var(--d, 0ms) var(--ease),
            transform 1s var(--d, 0ms) var(--ease),
            border-color 0.5s ease,
            box-shadow 0.5s ease;
        }
        .module::before, .topic::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(240px circle at var(--mx) var(--my), rgba(168, 85, 247, 0.18), transparent 65%);
          transition: opacity 0.5s ease;
        }
        .module {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 1.15rem 1.1rem;
          border-radius: 1.15rem;
        }
        .module-value {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          font-weight: 650;
          letter-spacing: -0.045em;
          line-height: 1;
          background: linear-gradient(170deg, #fff 30%, var(--lavender));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .module-label { color: #a9aabd; font-size: 0.8rem; line-height: 1.4; }

        /* What we'll cover */
        .cover-title {
          margin: 0 0 1.25rem;
          color: var(--lavender);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .cover-list { display: grid; gap: 0.6rem; margin: 0; padding: 0; list-style: none; }
        .topic {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          min-height: 4.25rem;
          padding: 0.6rem 1.1rem 0.6rem 0.9rem;
          border-radius: 1.1rem;
        }
        .topic::after {
          content: "";
          position: absolute;
          left: 1.1rem;
          right: 1.1rem;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--fuchsia), var(--purple), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.7s var(--ease);
        }
        .num {
          position: relative;
          flex: none;
          width: 3.4rem;
          font-family: var(--font-display);
          font-size: 2rem;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(170deg, var(--lavender), var(--purple) 50%, var(--fuchsia));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: 0.75;
          filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.3));
          transition: transform 0.5s var(--ease), opacity 0.5s ease, filter 0.5s ease;
        }
        .num::before {
          content: attr(data-n);
          position: absolute;
          inset: 0;
          z-index: -1;
          translate: 2px 3px;
          background: linear-gradient(180deg, rgba(76, 29, 149, 0.95), rgba(24, 6, 48, 0.4));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .topic-text { position: relative; color: #e2e3ee; font-size: 1rem; line-height: 1.45; }
        .note { margin: 1.25rem 0 0; color: #8d8fa6; font-size: 0.9rem; line-height: 1.6; }

        /* Primary CTA */
        .cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          min-height: 3.75rem;
          margin-top: 1.75rem;
          padding: 0.75rem 0.8rem 0.75rem 1.7rem;
          overflow: hidden;
          border: 1px solid rgba(217, 70, 239, 0.55);
          border-radius: 1.25rem;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          text-decoration: none;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 48%),
            linear-gradient(135deg, #5b21b6 0%, #7c3aed 55%, #a21caf 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.42),
            inset 0 -3px 0 rgba(46, 16, 101, 0.55),
            0 12px 26px rgba(76, 29, 149, 0.45),
            0 0 30px rgba(124, 58, 237, 0.3);
          transition:
            opacity 1s var(--d, 0ms) var(--ease),
            transform 0.5s var(--ease),
            box-shadow 0.5s var(--ease),
            filter 0.5s ease;
        }
        .cta-label { position: relative; z-index: 1; text-shadow: 0 1px 10px rgba(46, 16, 101, 0.6); }
        .cta-arrow {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.85rem;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.26);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition: transform 0.5s var(--ease);
        }
        .cta-arrow :global(svg) { width: 1.15rem; height: 1.15rem; }
        .cta-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.22) 50%, transparent 70%);
          transform: translate3d(-110%, 0, 0);
          transition: transform 1s var(--ease);
        }

        /* Portal */
        .portal-wrap { perspective: 1400px; min-width: 0; }
        .portal {
          position: relative;
          padding: clamp(0.9rem, 2vw, 1.4rem);
          border: 1px solid rgba(196, 181, 253, 0.13);
          border-radius: 1.9rem;
          background:
            linear-gradient(150deg, rgba(168, 85, 247, 0.1), rgba(255, 255, 255, 0.015) 35%, rgba(109, 40, 217, 0.06)),
            rgba(5, 5, 9, 0.78);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            inset 0 0 60px rgba(109, 40, 217, 0.06),
            0 40px 90px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(109, 40, 217, 0.12);
        }
        .portal-edge {
          position: absolute;
          inset: 0;
          z-index: 2;
          padding: 1px;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.4;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
        }
        .portal-edge::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          aspect-ratio: 1;
          translate: -50% -50%;
          background: conic-gradient(from 0deg, transparent 0deg, transparent 240deg, var(--violet) 290deg, var(--fuchsia) 325deg, transparent 360deg);
          animation: spin 14s linear infinite;
        }
        .portal-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.4rem 0.4rem 1.1rem;
        }
        .portal-head h3 { margin: 0; font-size: 1.3rem; font-weight: 650; letter-spacing: -0.035em; line-height: 1.2; }
        .portal-head p { margin: 0.2rem 0 0; color: var(--gray); font-size: 0.9rem; }
        .chamber {
          flex: none;
          display: grid;
          place-items: center;
          width: 3rem;
          height: 3rem;
          border: 1px solid rgba(196, 181, 253, 0.3);
          border-radius: 1rem;
          color: var(--lavender);
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.1), transparent 50%),
            linear-gradient(145deg, rgba(168, 85, 247, 0.26), rgba(109, 40, 217, 0.07));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 18px rgba(0, 0, 0, 0.35), 0 0 22px rgba(168, 85, 247, 0.15);
        }
        .chamber :global(svg) { width: 1.3rem; height: 1.3rem; }
        .chip {
          margin-left: auto;
          padding: 0.4rem 0.75rem;
          border: 1px solid rgba(196, 181, 253, 0.2);
          border-radius: 999px;
          color: var(--lavender);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
          background: rgba(168, 85, 247, 0.08);
        }

        .calendar-frame {
          position: relative;
          height: 650px;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.16);
          border-radius: 1.3rem;
          background: #07050d;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.35), 0 20px 50px rgba(0, 0, 0, 0.45);
        }
        .calendar-frame:focus-visible { outline: 2px solid var(--lavender); outline-offset: 4px; }
        .calendar { width: 100%; height: 100%; overflow: auto; }
        .overlay {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 1.5rem;
          text-align: center;
          background:
            radial-gradient(ellipse 70% 50% at 50% 40%, rgba(109, 40, 217, 0.25), transparent 70%),
            #07050d;
          transition: opacity 0.7s var(--ease), visibility 0.7s;
        }
        .overlay[data-state="ready"] { opacity: 0; visibility: hidden; pointer-events: none; }
        .state { position: relative; max-width: 22rem; overflow: hidden; }
        .state-title { margin: 1.1rem 0 0; font-size: 1.1rem; font-weight: 650; letter-spacing: -0.02em; }
        .state-copy { margin: 0.5rem 0 0; color: var(--gray); font-size: 0.92rem; line-height: 1.6; }
        .loader {
          position: relative;
          display: block;
          width: 3.4rem;
          height: 3.4rem;
          margin: 0 auto;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        .loader span {
          position: absolute;
          inset: -1px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-top-color: var(--fuchsia);
          border-right-color: var(--purple);
          animation: spin 1.6s linear infinite;
        }
        .shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 35%, rgba(196, 181, 253, 0.08) 50%, transparent 65%);
          transform: translate3d(-100%, 0, 0);
          animation: shimmer 2.6s ease-in-out infinite;
        }
        .state-actions { display: grid; gap: 0.7rem; margin-top: 1.4rem; }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          min-height: 2.9rem;
          padding: 0 1.2rem;
          border-radius: 0.95rem;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.4s var(--ease), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .btn :global(svg) { width: 1rem; height: 1rem; }
        .btn-solid {
          color: #fff;
          border: 1px solid rgba(217, 70, 239, 0.5);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent 50%), linear-gradient(135deg, #5b21b6, #7c3aed 60%, #a21caf);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 22px rgba(76, 29, 149, 0.4);
        }
        .btn-ghost { color: var(--lavender); border: 1px solid rgba(196, 181, 253, 0.25); background: rgba(255, 255, 255, 0.04); }

        .direct {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem 1.5rem;
          padding: 1.1rem 0.4rem 0.2rem;
        }
        .direct p { margin: 0; color: #8d8fa6; font-size: 0.9rem; }
        .direct-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .direct-links a {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 2.75rem;
          padding: 0 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          color: #d9daea;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: transform 0.4s var(--ease), border-color 0.4s ease, color 0.3s ease;
        }
        .direct-links a :global(svg) { width: 0.95rem; height: 0.95rem; color: var(--lavender); }
        .direct-links a :global(.go) { transition: transform 0.4s var(--ease); }

        .cta:focus-visible,
        .btn:focus-visible,
        .direct-links a:focus-visible { outline: 2px solid var(--lavender); outline-offset: 3px; }

        /* Hover (mouse only) */
        @media (hover: hover) and (pointer: fine) {
          .module:hover, .topic:hover {
            border-color: rgba(196, 181, 253, 0.3);
            transform: perspective(1000px) translate3d(0, -3px, 0) rotateX(var(--rx)) rotateY(var(--ry));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 20px 40px rgba(0, 0, 0, 0.45), 0 0 26px rgba(124, 58, 237, 0.16);
          }
          .module:hover::before, .topic:hover::before { opacity: 1; }
          .topic:hover::after { transform: scaleX(1); }
          .topic:hover .num { opacity: 1; transform: translate3d(0, -3px, 0); filter: drop-shadow(0 0 16px rgba(217, 70, 239, 0.5)); }
          .cta:hover {
            transform: translate3d(0, -3px, 0) scale(1.01);
            filter: brightness(1.12);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -3px 0 rgba(46, 16, 101, 0.55), 0 22px 44px rgba(76, 29, 149, 0.55), 0 0 60px rgba(168, 85, 247, 0.45);
          }
          .cta:hover .cta-arrow { transform: translate3d(5px, 0, 0); }
          .cta:hover .cta-shine { transform: translate3d(110%, 0, 0); }
          .btn:hover, .direct-links a:hover { transform: translate3d(0, -3px, 0); }
          .btn-solid:hover { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 16px 30px rgba(76, 29, 149, 0.55); }
          .btn-ghost:hover, .direct-links a:hover { border-color: rgba(196, 181, 253, 0.45); color: #fff; }
          .direct-links a:hover :global(.go) { transform: translate3d(4px, 0, 0); }
        }

        @keyframes spin { to { transform: rotate(1turn); } }
        @keyframes ring-spin { to { transform: rotateX(68deg) rotate(360deg); } }
        @keyframes drift { 50% { transform: translate3d(0, -22px, 0); } }
        @keyframes pulse { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes shimmer { to { transform: translate3d(100%, 0, 0); } }

        /* Tablet */
        @media (min-width: 48rem) and (max-width: 74.99rem) {
          .shell { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); column-gap: 2rem; }
          .intro { grid-column: 1 / -1; max-width: 40rem; }
          .trust { grid-column: 1; grid-row: 2; grid-template-columns: minmax(0, 1fr); align-self: start; }
          .module { flex-direction: row; align-items: center; gap: 1rem; }
          .module-value { flex: none; min-width: 4.5rem; }
          .cover { grid-column: 1; grid-row: 3; }
          .portal-wrap { grid-column: 2; grid-row: 2 / span 2; align-self: start; }
          .ring, .orb-b { display: none; }
        }
        /* Desktop: asymmetric */
        @media (min-width: 75rem) {
          .shell {
            grid-template-columns: minmax(0, 5fr) minmax(0, 6.4fr);
            column-gap: clamp(3rem, 5vw, 6rem);
            row-gap: 2.5rem;
          }
          .intro { grid-column: 1; grid-row: 1; }
          .trust { grid-column: 1; grid-row: 2; }
          .cover { grid-column: 1; grid-row: 3; }
          .portal-wrap {
            grid-column: 2;
            grid-row: 1 / span 3;
            position: sticky;
            top: 5rem;
            align-self: start;
          }
        }
        /* Mobile */
        @media (max-width: 47.99rem) {
          .calendar-frame { height: 620px; border-radius: 1.1rem; }
          .portal { border-radius: 1.5rem; }
          .chip { display: none; }
          .cta { width: 100%; min-height: 3.6rem; }
          .ring, .spark { display: none; }
        }
        @media (max-width: 28rem) {
          .trust { grid-template-columns: minmax(0, 1fr); }
          .module { flex-direction: row; align-items: center; gap: 1rem; padding: 1rem; }
          .module-value { flex: none; min-width: 4.5rem; }
          .num { width: 2.8rem; font-size: 1.7rem; }
          .direct-links a { flex: 1 1 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .bg-glow { opacity: 1 !important; transform: none !important; transition: none !important; }
          .orb, .ring, .spark, .pulse::after, .portal-edge::before, .loader span, .shimmer { animation: none !important; }
          .portal-edge { opacity: 0.25; }
          .module, .topic, .cta, .btn, .direct-links a, .cta-arrow, .num { transition: none !important; }
          .module:hover, .topic:hover, .cta:hover, .btn:hover, .direct-links a:hover,
          .topic:hover .num, .cta:hover .cta-arrow, .cta:hover .cta-shine { transform: none !important; }
          .module::before, .topic::before { display: none; }
          .overlay { transition: none; }
        }
      `}</style>
    </section>
  );
}