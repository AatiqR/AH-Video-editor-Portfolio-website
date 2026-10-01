"use client";

import { memo, useCallback, useId, useState, type PointerEvent } from "react";
import { Bebas_Neue } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

type FaqItem = {
  question: string;
  answer: string;
};

/* ------------------------------------------------------------------ */
/* Data (kept separate from presentation)                              */
/* ------------------------------------------------------------------ */
const faqs: FaqItem[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "I work with DTC brands, ecommerce stores, agencies, startups, coaches, consultants, and online businesses that want their video content to communicate clearly.",
  },
  {
    question: "What video editing and creative services do you offer?",
    answer:
      "Short-form edits, Meta ads, AI UGC ads, Video Sales Letters (VSLs), Pixar-style and claymation ads, motion graphics, captions, and sound design, all shaped around your brand.",
  },
  {
    question: "How quickly can you deliver a project?",
    answer:
      "Most projects are delivered within 24–48 hours, depending on complexity. Larger projects are scoped up front so you know the timeline before we start.",
  },
  {
    question: "Can you help with creative strategy and hooks?",
    answer:
      "Yes. I can help with hooks, angles, competitor research, offer positioning, and testing frameworks, so the creative is built around what you want viewers to do.",
  },
  {
    question: "Can we work together on an ongoing basis?",
    answer:
      "Absolutely. Many clients work with me on long-term creative partnerships and monthly content production, which keeps the visual style consistent over time.",
  },
  {
    question: "Which platforms and formats do you create content for?",
    answer:
      "Facebook, Instagram, TikTok, YouTube, landing pages, and ecommerce ad campaigns, with each edit formatted for where it will run.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const glow: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const sharpen: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const numberIn: Variants = {
  hidden: { opacity: 0.15, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.55 + i * 0.09 },
  }),
};

/* ------------------------------------------------------------------ */
/* Pointer handlers (write CSS variables directly: no re-renders)      */
/* ------------------------------------------------------------------ */
const MAX_TILT = 1; // degrees

function handlePointerMove(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  const x = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width);
  const y = Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height);

  card.style.setProperty("--faq-pointer-x", `${x}px`);
  card.style.setProperty("--faq-pointer-y", `${y}px`);
  card.style.setProperty("--faq-tilt-x", `${((0.5 - y / bounds.height) * MAX_TILT).toFixed(2)}deg`);
  card.style.setProperty("--faq-tilt-y", `${((x / bounds.width - 0.5) * MAX_TILT).toFixed(2)}deg`);
}

function handlePointerLeave(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  ["--faq-pointer-x", "--faq-pointer-y", "--faq-tilt-x", "--faq-tilt-y"].forEach((p) =>
    card.style.removeProperty(p),
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
type FaqCardProps = {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  baseId: string;
  onToggle: (index: number) => void;
};

const FaqCard = memo(function FaqCard({ faq, index, isOpen, baseId, onToggle }: FaqCardProps) {
  const reduce = useReducedMotion();
  const triggerId = `${baseId}-trigger-${index}`;
  const answerId = `${baseId}-answer-${index}`;
  const numberMotion = reduce ? {} : { variants: numberIn, custom: index };

  return (
    <article
      className={`portfolio-faq-card ${isOpen ? "portfolio-faq-card--open" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span aria-hidden="true" className="portfolio-faq-strip" />
      <span aria-hidden="true" className="portfolio-faq-rail" />

      <h3 className="portfolio-faq-item-heading">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => onToggle(index)}
          className="portfolio-faq-trigger"
        >
          <motion.span aria-hidden="true" className="portfolio-faq-index-wrap" {...numberMotion}>
            <span className={`${bebasNeue.className} portfolio-faq-index`}>
              <span className="portfolio-faq-index-text">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </motion.span>

          <span className="portfolio-faq-question">{faq.question}</span>

          <span aria-hidden="true" className="portfolio-faq-icon">
            <span className="portfolio-faq-icon__line" />
            <span className="portfolio-faq-icon__line portfolio-faq-icon__line--vertical" />
          </span>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        className={`portfolio-faq-answer ${isOpen ? "portfolio-faq-answer--open" : ""}`}
      >
        <div className="portfolio-faq-answer-clip">
          <div className="portfolio-faq-answer-content">
            {faq.answer.split(/\n\s*\n/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const instanceId = useId();
  const reduce = useReducedMotion();

  const toggle = useCallback(
    (index: number) => setOpenIndex((current) => (current === index ? null : index)),
    [],
  );

  // With reduced motion, skip the choreography entirely (content stays visible)
  const v = (variants: Variants): Variants | undefined => (reduce ? undefined : variants);

  return (
    <section
      id="faq"
      aria-labelledby={`${instanceId}-heading`}
      className="portfolio-faq relative isolate overflow-hidden bg-[#030207] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1180px]"
        variants={v(container)}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.12 }}
      >
        {/* Atmosphere */}
        <motion.div aria-hidden="true" variants={v(glow)} className="portfolio-faq-atmosphere">
          <div className="portfolio-faq-ambient portfolio-faq-ambient--top" />
          <div className="portfolio-faq-ambient portfolio-faq-ambient--side" />
          <div className="portfolio-faq-ambient portfolio-faq-ambient--bottom" />
        </motion.div>

        {/* Intro */}
        <header className="mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            variants={v(rise)}
            className="mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-violet-200/70"
          >
            <span aria-hidden="true" className="portfolio-faq-eyebrow-dot" />
            <span>FAQ</span>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-violet-400 to-fuchsia-400/0" />
            <span>Common questions</span>
          </motion.div>

          <motion.h2
            id={`${instanceId}-heading`}
            variants={v(sharpen)}
            className="leading-none"
          >
            <span
              className={`${bebasNeue.className} block text-[3.6rem] leading-[0.86] tracking-wide text-white sm:text-7xl md:text-8xl lg:text-[7rem]`}
            >
              Questions?
            </span>
            <span className="portfolio-faq-gradient-text mt-3 block pb-1 text-[2.1rem] font-bold tracking-[-0.04em] sm:mt-4 sm:text-5xl md:text-6xl">
              I&apos;ve got answers.
            </span>
          </motion.h2>

          <motion.p
            variants={v(rise)}
            className="mt-6 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-violet-100/60 sm:text-base lg:text-lg"
          >
            A quick read on my services, workflow, turnaround, creative strategy, ongoing collaboration,
            and the platforms I edit for, so you know what working together looks like.
          </motion.p>
        </header>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={faq.question} variants={v(cardIn)} className="portfolio-faq-perspective">
              <FaqCard
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                baseId={instanceId}
                onToggle={toggle}
              />
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div variants={v(rise)} className="portfolio-faq-cta">
          <div className="min-w-0">
            <p className="text-sm font-medium text-violet-200/70">Still have questions?</p>
            <p className="mt-1 text-balance text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
              Let&apos;s talk about your next creative.
            </p>
          </div>
          <a href="#booking" className="portfolio-faq-cta-button">
            Book a Creative Call <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .portfolio-faq {
          --faq-violet: #8b5cf6;
          --faq-purple: #a855f7;
          --faq-fuchsia: #d946ef;
          --faq-lavender: #c4b5fd;
          --faq-ease: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ---------- Background ---------- */
        .portfolio-faq::before {
          position: absolute;
          inset: 0;
          z-index: 0;
          content: "";
          pointer-events: none;
          opacity: 0.4;
          background-image:
            linear-gradient(rgba(196, 181, 253, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 181, 253, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
          mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
        }
        .portfolio-faq-atmosphere {
          position: absolute;
          inset: -12rem -50vw;
          z-index: -1;
          pointer-events: none;
        }
        .portfolio-faq-ambient {
          position: absolute;
          border-radius: 9999px;
        }
        .portfolio-faq-ambient--top {
          top: 0;
          left: 50%;
          width: 52rem;
          height: 36rem;
          transform: translateX(-50%);
          background: radial-gradient(closest-side, rgba(139, 92, 246, 0.22), transparent);
        }
        .portfolio-faq-ambient--side {
          top: 38%;
          left: 50%;
          width: 30rem;
          height: 30rem;
          margin-left: -36rem;
          background: radial-gradient(closest-side, rgba(217, 70, 239, 0.1), transparent);
          animation: portfolio-faq-drift 22s ease-in-out infinite alternate;
        }
        .portfolio-faq-ambient--bottom {
          bottom: 0;
          left: 50%;
          width: 36rem;
          height: 30rem;
          margin-left: 6rem;
          background: radial-gradient(closest-side, rgba(124, 58, 237, 0.16), transparent);
        }
        @keyframes portfolio-faq-drift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(12rem, 3rem, 0); }
        }
        .portfolio-faq-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--faq-fuchsia);
          box-shadow: 0 0 10px rgba(232, 121, 249, 0.9);
        }
        .portfolio-faq-gradient-text {
          background: linear-gradient(95deg, #a78bfa 0%, #c084fc 45%, #e879f9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ---------- Card ---------- */
        .portfolio-faq-perspective { perspective: 1200px; }

        .portfolio-faq-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.12);
          border-radius: 1.4rem;
          background: linear-gradient(130deg, rgba(139, 92, 246, 0.07) 0%, rgba(14, 9, 24, 0.94) 40%, rgba(4, 2, 9, 0.98) 100%);
          box-shadow:
            0 18px 40px -16px rgba(0, 0, 0, 0.7),
            0 2px 8px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            inset 0 -1px 0 rgba(139, 92, 246, 0.08);
          transform: translate3d(0, 0, 0);
          transition:
            transform 560ms var(--faq-ease),
            border-color 460ms var(--faq-ease),
            background 460ms var(--faq-ease),
            box-shadow 460ms var(--faq-ease);
        }
        .portfolio-faq-card::before,
        .portfolio-faq-card::after {
          position: absolute;
          inset: 0;
          z-index: -1;
          content: "";
          pointer-events: none;
        }
        /* cursor-following light */
        .portfolio-faq-card::before {
          opacity: 0;
          background: radial-gradient(
            24rem circle at var(--faq-pointer-x, 50%) var(--faq-pointer-y, 0%),
            rgba(168, 85, 247, 0.2),
            transparent 46%
          );
          transition: opacity 400ms var(--faq-ease);
        }
        /* static glass reflection */
        .portfolio-faq-card::after {
          opacity: 0.7;
          background: linear-gradient(118deg, rgba(255, 255, 255, 0.07), transparent 26%, transparent 74%, rgba(217, 70, 239, 0.05));
        }

        /* Active accents */
        .portfolio-faq-strip {
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 1px;
          opacity: 0;
          background: linear-gradient(90deg, transparent, #c4b5fd, #e879f9, transparent);
          transition: opacity 460ms var(--faq-ease);
        }
        .portfolio-faq-rail {
          position: absolute;
          top: 14%;
          bottom: 14%;
          left: 0;
          width: 2px;
          border-radius: 9999px;
          background: linear-gradient(180deg, #8b5cf6, #d946ef);
          box-shadow: 0 0 14px rgba(168, 85, 247, 0.75);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 560ms var(--faq-ease);
        }

        .portfolio-faq-card--open {
          border-color: rgba(168, 85, 247, 0.45);
          background: linear-gradient(130deg, rgba(168, 85, 247, 0.14) 0%, rgba(24, 12, 42, 0.95) 46%, rgba(6, 3, 12, 0.98) 100%);
          box-shadow:
            0 26px 60px -18px rgba(0, 0, 0, 0.75),
            0 0 48px -12px rgba(139, 92, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(217, 70, 239, 0.14);
        }
        .portfolio-faq-card--open::before { opacity: 0.5; }
        .portfolio-faq-card--open .portfolio-faq-strip { opacity: 1; }
        .portfolio-faq-card--open .portfolio-faq-rail { transform: scaleY(1); }

        .portfolio-faq-item-heading { margin: 0; }

        /* ---------- Trigger: number | question | icon ---------- */
        .portfolio-faq-trigger {
          position: relative;
          z-index: 1;
          display: grid;
          width: 100%;
          min-height: 4.75rem;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 0.875rem;
          border: 0;
          padding: 0.875rem;
          color: #fff;
          cursor: pointer;
          background: transparent;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }
        .portfolio-faq-trigger:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 2px rgba(196, 181, 253, 0.95), inset 0 0 0 4px rgba(3, 2, 7, 0.8);
          border-radius: 1.4rem;
        }

        .portfolio-faq-index-wrap { display: block; }
        .portfolio-faq-index {
          display: grid;
          width: 2.75rem;
          height: 2.75rem;
          place-items: center;
          border: 1px solid rgba(196, 181, 253, 0.16);
          border-radius: 0.9rem;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.12), rgba(255, 255, 255, 0.02));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 6px 14px rgba(0, 0, 0, 0.35);
          color: rgba(237, 233, 254, 0.5);
          font-size: 1.5rem;
          line-height: 1;
          letter-spacing: 0.06em;
          transition:
            color 380ms var(--faq-ease),
            transform 500ms var(--faq-ease),
            border-color 380ms var(--faq-ease),
            box-shadow 500ms var(--faq-ease),
            background 380ms var(--faq-ease);
        }

        .portfolio-faq-question {
          min-width: 0;
          font-size: clamp(1.0625rem, 0.92rem + 0.85vw, 1.5rem);
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.02em;
          text-wrap: balance;
          color: rgba(255, 255, 255, 0.92);
          transition: color 380ms var(--faq-ease), transform 380ms var(--faq-ease);
        }

        /* ---------- Icon ---------- */
        .portfolio-faq-icon {
          position: relative;
          display: grid;
          width: 2.5rem;
          height: 2.5rem;
          flex: none;
          place-items: center;
          border: 1px solid rgba(196, 181, 253, 0.2);
          border-radius: 9999px;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(139, 92, 246, 0.05));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 6px 16px rgba(0, 0, 0, 0.3);
          transition:
            transform 500ms var(--faq-ease),
            border-color 380ms var(--faq-ease),
            background 380ms var(--faq-ease),
            box-shadow 380ms var(--faq-ease);
        }
        .portfolio-faq-icon__line {
          position: absolute;
          width: 0.8rem;
          height: 1.5px;
          border-radius: 9999px;
          background: #fff;
          transition: transform 500ms var(--faq-ease), opacity 320ms ease;
        }
        .portfolio-faq-icon__line--vertical { transform: rotate(90deg) scaleX(1); }

        .portfolio-faq-card--open .portfolio-faq-question { color: #fff; }
        .portfolio-faq-card--open .portfolio-faq-index {
          transform: translateY(-2px) scale(1.06);
          border-color: rgba(232, 121, 249, 0.6);
          background: linear-gradient(145deg, rgba(168, 85, 247, 0.32), rgba(217, 70, 239, 0.12));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 10px 24px -6px rgba(168, 85, 247, 0.65);
        }
        .portfolio-faq-card--open .portfolio-faq-icon {
          border-color: rgba(232, 121, 249, 0.6);
          background: linear-gradient(145deg, rgba(168, 85, 247, 0.3), rgba(217, 70, 239, 0.12));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 8px 22px -4px rgba(168, 85, 247, 0.6);
          transform: rotate(180deg) scale(1.04);
        }
        .portfolio-faq-card--open .portfolio-faq-icon__line--vertical {
          transform: rotate(90deg) scaleX(0);
          opacity: 0;
        }

        /* ---------- Answer (grid-rows expansion, hidden from AT when closed) ---------- */
        .portfolio-faq-answer {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-rows: 0fr;
          visibility: hidden;
          transition:
            grid-template-rows 620ms var(--faq-ease),
            visibility 0s linear 620ms;
        }
        .portfolio-faq-answer--open {
          grid-template-rows: 1fr;
          visibility: visible;
          transition-delay: 0s, 0s;
        }
        .portfolio-faq-answer-clip { min-height: 0; overflow: hidden; }
        .portfolio-faq-answer-content {
          padding: 0 1rem 1.25rem 1rem;
          color: rgba(237, 233, 254, 0.7);
          font-size: 0.9375rem;
          line-height: 1.75;
          opacity: 0;
          filter: blur(6px);
          transform: translate3d(0, 10px, 0);
          transition:
            opacity 300ms var(--faq-ease),
            transform 500ms var(--faq-ease),
            filter 420ms var(--faq-ease);
        }
        .portfolio-faq-answer-content p { max-width: 62ch; }
        .portfolio-faq-answer-content p + p { margin-top: 1rem; }
        .portfolio-faq-answer--open .portfolio-faq-answer-content {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0);
          transition-delay: 120ms;
        }

        /* ---------- CTA ---------- */
        .portfolio-faq-cta {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2.5rem;
          padding: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(196, 181, 253, 0.16);
          border-radius: 1.6rem;
          background:
            radial-gradient(60% 140% at 100% 50%, rgba(217, 70, 239, 0.16), transparent 70%),
            linear-gradient(130deg, rgba(139, 92, 246, 0.12), rgba(8, 4, 16, 0.95) 60%);
          box-shadow: 0 24px 60px -24px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .portfolio-faq-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: none;
          padding: 0.95rem 1.6rem;
          border-radius: 9999px;
          background: linear-gradient(95deg, #7c3aed, #a855f7 55%, #d946ef);
          color: #fff;
          font-weight: 600;
          letter-spacing: -0.01em;
          box-shadow: 0 10px 30px -8px rgba(168, 85, 247, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: transform 400ms var(--faq-ease), box-shadow 400ms var(--faq-ease);
        }
        .portfolio-faq-cta-button:focus-visible {
          outline: 2px solid #c4b5fd;
          outline-offset: 3px;
        }

        /* ---------- Breakpoints ---------- */
        @media (min-width: 640px) {
          .portfolio-faq-trigger {
            min-height: 5.5rem;
            gap: 1.25rem;
            padding: 1.1rem 1.25rem;
          }
          .portfolio-faq-index { width: 3.25rem; height: 3.25rem; font-size: 1.85rem; }
          .portfolio-faq-icon { width: 2.75rem; height: 2.75rem; }
          .portfolio-faq-answer-content {
            padding: 0 1.25rem 1.5rem calc(1.25rem + 3.25rem + 1.25rem);
            font-size: 1rem;
          }
          .portfolio-faq-cta {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 2rem 2.25rem;
          }
        }
        @media (min-width: 1024px) {
          .portfolio-faq-trigger { min-height: 6.25rem; padding: 1.25rem 1.75rem; gap: 1.6rem; }
          .portfolio-faq-index { width: 3.75rem; height: 3.75rem; font-size: 2.1rem; }
          .portfolio-faq-answer-content {
            padding: 0 1.75rem 1.75rem calc(1.75rem + 3.75rem + 1.6rem);
            font-size: 1.0625rem;
          }
        }
        @media (max-width: 380px) {
          .portfolio-faq-trigger { gap: 0.7rem; padding: 0.8rem; }
          .portfolio-faq-index { width: 2.4rem; height: 2.4rem; font-size: 1.3rem; }
          .portfolio-faq-icon { width: 2.25rem; height: 2.25rem; }
        }

        /* ---------- Hover: mouse only, never on touch ---------- */
        @media (hover: hover) and (pointer: fine) {
          .portfolio-faq-card:hover {
            border-color: rgba(196, 181, 253, 0.3);
            box-shadow:
              0 30px 60px -20px rgba(0, 0, 0, 0.8),
              0 0 36px -14px rgba(139, 92, 246, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              inset 0 -1px 0 rgba(217, 70, 239, 0.1);
            transform: translate3d(0, -3px, 12px)
              rotateX(var(--faq-tilt-x, 0deg))
              rotateY(var(--faq-tilt-y, 0deg));
          }
          .portfolio-faq-card:hover::before { opacity: 1; }
          .portfolio-faq-card:hover .portfolio-faq-question { transform: translateX(2px); color: #fff; }
          .portfolio-faq-card:not(.portfolio-faq-card--open):hover .portfolio-faq-index {
            color: rgba(237, 233, 254, 0.85);
            border-color: rgba(196, 181, 253, 0.34);
          }
          .portfolio-faq-card--open:hover { border-color: rgba(232, 121, 249, 0.6); }
          .portfolio-faq-cta-button:hover {
            transform: translate3d(0, -2px, 0);
            box-shadow: 0 14px 36px -8px rgba(217, 70, 239, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          }
        }

        /* Gradient numerals when open */
        .portfolio-faq-card--open .portfolio-faq-index-text {
          background-image: linear-gradient(145deg, #e9d5ff, #e879f9);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 8px rgba(217, 70, 239, 0.7));
        }

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .portfolio-faq *,
          .portfolio-faq *::before,
          .portfolio-faq *::after {
            transition-duration: 1ms !important;
            transition-delay: 0ms !important;
            animation: none !important;
          }
          .portfolio-faq-card:hover { transform: none !important; }
          .portfolio-faq-card::before { display: none; }
          .portfolio-faq-answer-content { filter: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}