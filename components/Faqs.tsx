"use client";

import {
  memo,
  useCallback,
  useId,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { ArrowUpRight, MessageCircle, Minus, Plus } from "lucide-react";
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
/* Data (kept separate from presentation)                              */
/* ------------------------------------------------------------------ */

type FaqItem = {
  question: string;
  answer: string;
};

const BOOKING_URL = "https://cal.com/aakash-creative-studio/30min";
const WHATSAPP_URL =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

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
 * Nothing rendered here depends on the visitor's "reduce motion" setting.
 * Entrance props are always identical; <MotionConfig reducedMotion="user">
 * changes only how Framer Motion plays them. The accordion's transitions are
 * plain CSS classes with motion-reduce: overrides, so the markup is the same
 * on the server and on the first client render.
 */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

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

const FaqCard = memo(function FaqCard({
  faq,
  index,
  isOpen,
  baseId,
  onToggle,
}: FaqCardProps) {
  const triggerId = `${baseId}-trigger-${index}`;
  const answerId = `${baseId}-answer-${index}`;
  const paragraphs = faq.answer
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article
      style={CARD_SHADOW}
      className={`
        group/card relative overflow-hidden rounded-[22px] border bg-[#15121B]
        transition-[border-color] duration-500
        motion-reduce:transition-none
        ${
          isOpen
            ? "border-[rgba(145,100,245,0.5)]"
            : `${BORDER} [@media(hover:hover)]:hover:border-[rgba(185,160,255,0.4)]`
        }
      `}
    >
      <h3 className="m-0">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => onToggle(index)}
          className={`
            grid min-h-[4.75rem] w-full grid-cols-[auto_minmax(0,1fr)_auto]
            items-center gap-3.5 px-4 py-3.5 text-left
            [-webkit-tap-highlight-color:transparent]
            sm:min-h-[5.5rem] sm:gap-4 sm:px-5 sm:py-4
            lg:min-h-[6rem] lg:gap-5 lg:px-6
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-[-3px] focus-visible:outline-[#9164F5]
          `}
        >
          {/* Number */}
          <span
            aria-hidden="true"
            className={`
              ${display.className}
              grid h-10 w-10 shrink-0 place-items-center rounded-xl border
              text-[15px] font-bold leading-none tracking-[-0.02em] tabular-nums
              transition-[background-color,border-color,color] duration-300
              motion-reduce:transition-none
              sm:h-11 sm:w-11 sm:text-base
              ${
                isOpen
                  ? "border-[#9164F5] bg-[#9164F5] text-[#08070B]"
                  : "border-[rgba(145,100,245,0.28)] bg-[#100D15] text-[#B9A0FF]"
              }
            `}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question */}
          <span
            className={`${display.className} min-w-0 text-[clamp(1.0625rem,0.95rem+0.55vw,1.4rem)] font-bold leading-[1.25] tracking-[-0.025em] text-[#F7F5FA] [text-wrap:balance]`}
          >
            {faq.question}
          </span>

          {/* Icon */}
          <span
            aria-hidden="true"
            className={`
              grid h-10 w-10 shrink-0 place-items-center rounded-full border
              transition-[background-color,border-color,color] duration-300
              motion-reduce:transition-none
              sm:h-11 sm:w-11
              ${
                isOpen
                  ? "border-[#9164F5] bg-[#9164F5] text-[#08070B]"
                  : "border-[rgba(145,100,245,0.3)] bg-[#100D15] text-[#F7F5FA] [@media(hover:hover)]:group-hover/card:border-[rgba(185,160,255,0.7)]"
              }
            `}
          >
            {isOpen ? (
              <Minus className="h-[18px] w-[18px]" strokeWidth={2.25} />
            ) : (
              <Plus className="h-[18px] w-[18px]" strokeWidth={2.25} />
            )}
          </span>
        </button>
      </h3>

      {/* Answer: grid-rows expansion, hidden from assistive tech when closed.
          Durations are CSS only, so reduced motion never changes the markup. */}
      <div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        className={`
          grid
          [transition-property:grid-template-rows,visibility]
          [transition-timing-function:cubic-bezier(0.22,1,0.36,1),linear]
          motion-reduce:[transition-delay:0s,0s]
          motion-reduce:[transition-duration:0s,0s]
          ${
            isOpen
              ? "visible grid-rows-[1fr] [transition-delay:0s,0s] [transition-duration:600ms,0s]"
              : "invisible grid-rows-[0fr] [transition-delay:0s,600ms] [transition-duration:600ms,0s]"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`
              mx-4 border-t ${BORDER} pb-5 pt-4
              transition-[opacity,transform] duration-[400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              motion-reduce:transition-none
              sm:mx-5 sm:pb-6 sm:pl-[3.75rem] sm:pr-2
              lg:mx-6 lg:pb-7 lg:pl-[4.25rem]
              ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-[120ms]"
                  : "translate-y-2 opacity-0 delay-0"
              }
            `}
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`max-w-[62ch] text-[15px] font-medium leading-7 text-[#AAA5B5] sm:text-base ${
                  i > 0 ? "mt-4" : ""
                }`}
              >
                {paragraph}
              </p>
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

  const toggle = useCallback(
    (index: number) =>
      setOpenIndex((current) => (current === index ? null : index)),
    []
  );

  /* Scroll to #booking if that section exists, otherwise open the booking page.
     The motion preference is read here, inside an event handler, never in render. */
  const handleBook = (event: MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById("booking");
    if (!section) return;
    event.preventDefault();
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    section.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        aria-labelledby={`${instanceId}-heading`}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[5fr_7fr] lg:gap-x-16 lg:gap-y-10">
          {/* Intro */}
          <header className="lg:col-start-1 lg:row-start-1">
            <motion.p
              {...reveal(0)}
              className={`mb-5 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              FAQ
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              id={`${instanceId}-heading`}
              className={`${display.className} text-[2.4rem] font-bold leading-[1.05] tracking-[-0.045em] text-[#F7F5FA] [text-wrap:balance] sm:text-5xl lg:text-[3.5rem]`}
            >
              Questions?
              <span className="block text-[#9164F5]">I&apos;ve got answers.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mt-5 max-w-lg text-[15px] font-medium leading-7 text-[#AAA5B5] sm:mt-6 sm:text-base"
            >
              A quick read on my services, workflow, turnaround, creative
              strategy, ongoing collaboration, and the platforms I edit for, so
              you know what working together looks like.
            </motion.p>
          </header>

          {/* Accordion */}
          <div
            role="list"
            aria-label="Frequently asked questions"
            className="flex flex-col gap-3 sm:gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            {faqs.map((faq, index) => (
              <motion.div
                role="listitem"
                key={faq.question}
                {...reveal(Math.min(index, 4) * 0.07)}
              >
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
          <motion.div
            {...reveal(0.1)}
            style={CARD_SHADOW}
            className={`rounded-[24px] border ${BORDER} bg-[#15121B] p-6 sm:p-8 lg:col-start-1 lg:row-start-2 lg:self-start`}
          >
            <p className="text-[13px] font-bold leading-none text-[#B9A0FF]">
              Still have questions?
            </p>
            <p
              className={`${display.className} mt-3 text-[1.5rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#F7F5FA] [text-wrap:balance] sm:text-[1.75rem]`}
            >
              Let&apos;s talk about your next creative.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBook}
                className={`${PRIMARY} h-[52px] px-6 text-[15px]`}
              >
                Book a Creative Call
                <ArrowUpRight size={18} aria-hidden="true" className={ARROW} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${SECONDARY} h-[52px] px-6 text-[15px]`}
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  className="text-[#B9A0FF]"
                />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}