"use client";

import { Geist } from "next/font/google";
import {
  Clock3,
  Layers3,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useRef,
} from "react";

// Variable font: all weights available.
const geist = Geist({ subsets: ["latin"] });

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: ReadonlyArray<Feature> = [
  {
    number: "01",
    title: "Built To Drive Results",
    description:
      "Every edit has a job: earn attention, make the value clear, and guide viewers toward taking action.",
    icon: Target,
  },
  {
    number: "02",
    title: "Fast Turnaround Without The Stress",
    description:
      "Deadlines stay predictable. Polished creatives arrive on schedule, so your campaigns never lose momentum.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "More Creative Variations",
    description:
      "Test more hooks, angles, and formats without slowing production, and find what resonates sooner.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "Built To Scale With Your Brand",
    description:
      "One campaign or ongoing creative support, the process is designed to grow alongside your business.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Clear Communication",
    description:
      "No tangled processes or endless back-and-forth. You always know where things stand and what comes next.",
    icon: MessageSquare,
  },
  {
    number: "06",
    title: "Strategic Creative Thinking",
    description:
      "Beyond execution, I bring ideas, research, and creative insight that help your content improve over time.",
    icon: Sparkles,
  },
];

const FEATURED_COUNT = 2;
const MAX_TILT = 2; // degrees

type PointerFrame = {
  element: HTMLLIElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

type SectionStyle = CSSProperties & Record<"--font-display", string>;
type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pendingRef = useRef<PointerFrame | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveal = () => section.classList.add("is-revealed");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
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
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (event.pointerType !== "mouse") return;

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    pendingRef.current = {
      element,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      width: bounds.width,
      height: bounds.height,
    };

    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const frame = pendingRef.current;
      if (!frame) return;
      const { element: target, x, y, width, height } = frame;
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
      target.style.setProperty(
        "--tilt-x",
        `${((0.5 - y / height) * MAX_TILT).toFixed(2)}deg`,
      );
      target.style.setProperty(
        "--tilt-y",
        `${((x / width - 0.5) * MAX_TILT).toFixed(2)}deg`,
      );
    });
  };

  const handlePointerLeave = (event: PointerEvent<HTMLLIElement>) => {
    if (event.pointerType !== "mouse") return;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    pendingRef.current = null;
    const style = event.currentTarget.style;
    style.setProperty("--mouse-x", "50%");
    style.setProperty("--mouse-y", "50%");
    style.setProperty("--tilt-x", "0deg");
    style.setProperty("--tilt-y", "0deg");
  };

  // Moon Walk is expected to be declared globally via @font-face
  // (font-family: "Moon Walk"). If it isn't loaded, Geist is used instead.
  const sectionStyle: SectionStyle = {
    "--font-display": `"Moon Walk", ${geist.style.fontFamily}`,
  };

  return (
    <section
      ref={sectionRef}
      className={`features-section ${geist.className}`}
      aria-labelledby="benefits-heading"
      style={sectionStyle}
    >
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="features-shell">
        <header className="section-header">
          <p className="eyebrow reveal-item" style={{ "--reveal-delay": "0ms" } as RevealStyle}>
            <span className="eyebrow-line" aria-hidden="true" />
            The Creative Advantage
          </p>
          <h2 id="benefits-heading" className="reveal-item" style={{ "--reveal-delay": "90ms" } as RevealStyle}>
            <span className="h2-main">More Than Editing.</span>
            <span className="h2-display">Built For Impact.</span>
          </h2>
          <p className="intro reveal-item" style={{ "--reveal-delay": "180ms" } as RevealStyle}>
            I don&apos;t just cut footage. I turn ideas into strategic,
            high-quality creative assets designed to capture attention,
            communicate value, and support your brand&apos;s growth.
          </p>
          <div className="header-detail reveal-item" style={{ "--reveal-delay": "260ms" } as RevealStyle} aria-hidden="true">
            <span className="glow-line" />
            <span className="micro-label">Creative system &bull; Strategy &bull; Execution</span>
          </div>
        </header>

        <ol className="feature-grid">
          {features.map(({ number, title, description, icon: Icon }, index) => {
            const featured = index < FEATURED_COUNT;
            const style: RevealStyle = {
              "--reveal-delay": `${300 + index * 75}ms`,
            } as RevealStyle;

            return (
              <li
                key={number}
                className={`feature-card${featured ? " is-featured" : ""}`}
                style={style}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <div className="card-surface">
                  <span className="edge" aria-hidden="true" />
                  <span className="feature-number" data-n={number} aria-hidden="true">
                    {number}
                  </span>
                  <div className="icon-chamber">
                    <Icon aria-hidden="true" strokeWidth={1.55} />
                  </div>
                  <div className="card-copy">
                    <h3>
                      <span className="visually-hidden">{number}. </span>
                      {title}
                    </h3>
                    <p>{description}</p>
                  </div>
                  <span className="corner-mark" aria-hidden="true" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <style jsx>{`
        .features-section {
          --black: #000;
          --near-black: #050507;
          --violet: #6d28d9;
          --purple: #a855f7;
          --fuchsia: #d946ef;
          --lavender: #c4b5fd;
          --gray: #9a9bb0;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          isolation: isolate;
          overflow: clip;
          background: var(--near-black);
          color: #fff;
          padding: clamp(5.5rem, 9vw, 10rem) clamp(1rem, 4vw, 4rem);
        }
        .atmosphere {
          position: absolute;
          z-index: -2;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 42% at 72% 46%, rgba(109, 40, 217, 0.16), transparent 70%),
            radial-gradient(ellipse 30% 22% at 0% 100%, rgba(217, 70, 239, 0.09), transparent 75%),
            radial-gradient(ellipse 40% 25% at 12% 6%, rgba(168, 85, 247, 0.07), transparent 75%),
            linear-gradient(180deg, var(--black) 0%, var(--near-black) 50%, var(--black) 100%);
        }
        .grain {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
          background-size: 4.5rem 4.5rem;
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 60% 45%, #000, transparent 75%);
          mask-image: radial-gradient(ellipse 70% 60% at 60% 45%, #000, transparent 75%);
        }
        .features-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(3rem, 6vw, 5rem);
          max-width: 88rem;
          margin: 0 auto;
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        /* Header */
        .reveal-item {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 0.9s var(--reveal-delay) var(--ease),
            transform 0.9s var(--reveal-delay) var(--ease);
        }
        .is-revealed .reveal-item {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin: 0 0 1.6rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          background: linear-gradient(90deg, var(--lavender), var(--fuchsia));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .eyebrow-line {
          width: 2.4rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--purple), var(--fuchsia));
          box-shadow: 0 0 10px rgba(217, 70, 239, 0.5);
          transform-origin: left;
          animation: line-breathe 5s ease-in-out infinite;
        }
        h2 {
          margin: 0;
          font-weight: 600;
          line-height: 1;
        }
        .h2-main {
          display: block;
          font-size: clamp(2.6rem, 5.4vw, 5.2rem);
          letter-spacing: -0.06em;
          text-wrap: balance;
        }
        .h2-display {
          display: block;
          margin-top: 0.35em;
          padding-bottom: 0.12em;
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 3.1vw, 3rem);
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1.12;
          background: linear-gradient(100deg, #fff 0%, var(--lavender) 30%, var(--purple) 62%, var(--fuchsia) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 22px rgba(168, 85, 247, 0.28));
          text-wrap: balance;
        }
        .intro {
          max-width: 30rem;
          margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
          color: var(--gray);
          font-size: clamp(1rem, 1.3vw, 1.12rem);
          line-height: 1.7;
        }
        .header-detail {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: clamp(2rem, 4vw, 3rem);
        }
        .glow-line {
          width: min(14rem, 60%);
          height: 1px;
          background: linear-gradient(90deg, var(--fuchsia), var(--purple) 40%, transparent);
          box-shadow: 0 0 14px rgba(168, 85, 247, 0.55);
        }
        .micro-label {
          color: rgba(196, 181, 253, 0.6);
          font-size: 0.66rem;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        /* Grid */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(0.85rem, 1.6vw, 1.4rem);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .feature-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          min-width: 0;
          opacity: 0;
          filter: blur(6px);
          transform: translate3d(0, 28px, 0) scale(0.98);
          transition:
            opacity 0.9s var(--reveal-delay) var(--ease),
            transform 0.9s var(--reveal-delay) var(--ease),
            filter 0.9s var(--reveal-delay) var(--ease);
        }
        .is-revealed .feature-card {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0) scale(1);
        }
        .feature-card.is-featured {
          grid-column: 1 / -1;
        }

        .card-surface {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 19rem;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.1);
          border-radius: 1.5rem;
          background:
            linear-gradient(145deg, rgba(168, 85, 247, 0.09), rgba(255, 255, 255, 0.015) 38%, rgba(109, 40, 217, 0.05) 100%),
            rgba(5, 5, 9, 0.72);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.09),
            inset 0 0 40px rgba(109, 40, 217, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5),
            0 24px 50px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(109, 40, 217, 0.06);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          transition:
            transform 0.45s var(--ease),
            border-color 0.6s ease,
            box-shadow 0.6s ease;
        }
        .is-featured .card-surface {
          min-height: 17rem;
        }
        /* cursor light */
        .card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), rgba(196, 181, 253, 0.11), transparent 45%),
            radial-gradient(360px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.16), rgba(217, 70, 239, 0.05) 50%, transparent 70%);
          transition: opacity 0.5s ease;
        }
        /* inner reflection */
        .card-surface::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(115deg, rgba(255, 255, 255, 0.05) 0%, transparent 28%);
          border-radius: inherit;
        }
        /* moving edge light: a rotating gradient seen only through a 1px ring */
        .edge {
          position: absolute;
          inset: 0;
          z-index: 2;
          padding: 1px;
          border-radius: inherit;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.45;
          transition: opacity 0.6s ease;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
        }
        .edge::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 220%;
          aspect-ratio: 1;
          translate: -50% -50%;
          background: conic-gradient(from 0deg, transparent 0deg, transparent 230deg, var(--violet) 280deg, var(--fuchsia) 320deg, var(--lavender) 338deg, transparent 360deg);
          animation: edge-spin 11s linear infinite;
        }

        /* 3D index number */
        .feature-number {
          position: absolute;
          z-index: 0;
          top: 0.6rem;
          right: 1.1rem;
          font-family: var(--font-display);
          font-size: clamp(4.4rem, 7.2vw, 7rem);
          line-height: 1;
          letter-spacing: -0.04em;
          transform: perspective(600px) rotateX(10deg) rotateY(-10deg) translate3d(0, 0, 0);
          transform-origin: 100% 0;
          transition: transform 0.7s var(--ease), opacity 0.7s ease;
          opacity: 0.5;
          background: linear-gradient(170deg, var(--lavender) 0%, var(--purple) 45%, var(--fuchsia) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.22));
          -webkit-mask-image: linear-gradient(180deg, #000 30%, rgba(0, 0, 0, 0.45) 100%);
          mask-image: linear-gradient(180deg, #000 30%, rgba(0, 0, 0, 0.45) 100%);
        }
        /* extrusion / depth layer */
        .feature-number::before {
          content: attr(data-n);
          position: absolute;
          inset: 0;
          z-index: -1;
          translate: 4px 5px;
          background: linear-gradient(180deg, rgba(76, 29, 149, 0.9), rgba(24, 6, 48, 0.4));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .icon-chamber {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 3.7rem;
          height: 3.7rem;
          margin: 1.7rem 1.8rem 2rem;
          border: 1px solid rgba(196, 181, 253, 0.3);
          border-radius: 1.05rem;
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.1), transparent 45%),
            linear-gradient(145deg, rgba(168, 85, 247, 0.26), rgba(109, 40, 217, 0.07));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            inset 0 -6px 12px rgba(76, 29, 149, 0.3),
            0 10px 22px rgba(0, 0, 0, 0.4),
            0 0 26px rgba(168, 85, 247, 0.12);
          color: var(--lavender);
          transition:
            transform 0.6s var(--ease),
            box-shadow 0.6s ease;
        }
        .icon-chamber :global(svg) {
          width: 1.65rem;
          height: 1.65rem;
          filter: drop-shadow(0 0 8px rgba(217, 70, 239, 0.4));
        }

        .card-copy {
          position: relative;
          z-index: 1;
          margin-top: auto;
          padding: 0 1.8rem 1.9rem;
        }
        .card-copy h3 {
          margin: 0 0 0.8rem;
          max-width: 18em;
          color: #fff;
          font-size: clamp(1.3rem, 1.8vw, 1.6rem);
          font-weight: 650;
          letter-spacing: -0.04em;
          line-height: 1.15;
          text-wrap: balance;
        }
        .is-featured .card-copy h3 {
          font-size: clamp(1.55rem, 2.4vw, 2.1rem);
        }
        .card-copy p {
          margin: 0;
          max-width: 34rem;
          color: #b4b5c6;
          font-size: 0.97rem;
          line-height: 1.65;
        }
        .corner-mark {
          position: absolute;
          z-index: 1;
          right: 1.1rem;
          bottom: 1.1rem;
          width: 0.5rem;
          height: 0.5rem;
          border-right: 1px solid var(--fuchsia);
          border-bottom: 1px solid var(--fuchsia);
          opacity: 0.6;
          filter: drop-shadow(0 0 4px rgba(217, 70, 239, 0.7));
        }

        /* Desktop hover (mouse only) */
        @media (hover: hover) and (pointer: fine) {
          .feature-card:hover .card-surface {
            border-color: rgba(196, 181, 253, 0.28);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.14),
              inset 0 0 50px rgba(109, 40, 217, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5),
              0 36px 70px rgba(0, 0, 0, 0.55),
              0 14px 44px rgba(124, 58, 237, 0.16);
            transform: perspective(1100px) translate3d(0, -6px, 0) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
          }
          .feature-card:hover .card-surface::before { opacity: 1; }
          .feature-card:hover .edge { opacity: 0.95; }
          .feature-card:hover .icon-chamber {
            transform: translate3d(0, -5px, 0) rotate(-3deg);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.28),
              inset 0 -6px 12px rgba(76, 29, 149, 0.3),
              0 16px 28px rgba(0, 0, 0, 0.45),
              0 0 36px rgba(217, 70, 239, 0.28);
          }
          .feature-card:hover .feature-number {
            opacity: 0.95;
            transform: perspective(600px) rotateX(6deg) rotateY(-6deg) translate3d(-4px, 4px, 0) scale(1.04);
          }
          .feature-card:hover .card-copy h3 {
            background: linear-gradient(100deg, #fff 40%, var(--lavender));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        }

        @keyframes edge-spin { to { transform: rotate(1turn); } }
        @keyframes line-breathe { 50% { opacity: 0.5; transform: scaleX(0.7); } }

        /* Desktop: split composition */
        @media (min-width: 75rem) {
          .features-shell {
            grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
            gap: clamp(3rem, 5vw, 6rem);
            align-items: start;
          }
          .section-header {
            position: sticky;
            top: 7rem;
          }
        }

        /* Tablet */
        @media (min-width: 42.01rem) and (max-width: 74.99rem) {
          .section-header { max-width: 40rem; }
          .intro { max-width: 36rem; }
          .card-surface { min-height: 18rem; }
          .feature-number { font-size: 5.2rem; }
        }

        /* Mobile */
        @media (max-width: 42rem) {
          .features-section { padding-inline: 1rem; }
          .feature-grid { grid-template-columns: 1fr; gap: 0.85rem; }
          .card-surface {
            min-height: 0;
            border-radius: 1.25rem;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }
          .is-featured .card-surface { min-height: 0; }
          .icon-chamber { width: 3.6rem; height: 3.6rem; margin: 1.4rem 1.35rem 1.6rem; }
          .card-copy { padding: 0 1.35rem 1.6rem; }
          .feature-number { top: 0.9rem; right: 1.1rem; font-size: 4.4rem; opacity: 0.65; transform: none; }
          .h2-main { font-size: clamp(2.4rem, 11vw, 3.2rem); }
          .h2-display { font-size: clamp(1.5rem, 6.6vw, 2rem); }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-item,
          .feature-card,
          .card-surface,
          .icon-chamber,
          .feature-number,
          .eyebrow-line {
            transition: none !important;
            animation: none !important;
          }
          .reveal-item,
          .feature-card {
            opacity: 1;
            filter: none;
            transform: none;
          }
          .edge::before { animation: none; }
          .edge { opacity: 0.3; }
          .card-surface::before { display: none; }
          .feature-card:hover .card-surface,
          .feature-card:hover .icon-chamber,
          .feature-card:hover .feature-number { transform: none; }
          .feature-number { transform: none; }
        }
      `}</style>
    </section>
  );
}