"use client";

import { useId, type CSSProperties, type MouseEvent } from "react";
import {
  ArrowUpRight,
  Clock3,
  Layers3,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
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
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const BOOKING_URL = "https://cal.com/Aakash-creative-studio/30min";
const WHATSAPP_URL =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

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
 * inside the click handler below.
 */
const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Feature card                                                        */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const { number, title, description, icon: Icon } = feature;
  const featured = index < FEATURED_COUNT;

  return (
    <motion.li
      {...reveal(Math.min(index, 5) * 0.07, 22)}
      className={`min-w-0 ${featured ? "sm:col-span-2" : ""}`}
    >
      <article
        style={CARD_SHADOW}
        className={`
          group relative flex h-full flex-col overflow-hidden
          rounded-[24px] border bg-[#15121B] p-6 sm:p-7
          ${featured ? "min-h-[17rem] border-[rgba(145,100,245,0.4)] sm:min-h-[16rem]" : `min-h-[18rem] ${BORDER}`}
          transition-[transform,border-color] duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          md:hover:-translate-y-1
          md:hover:border-[rgba(185,160,255,0.5)]
          motion-reduce:md:hover:translate-y-0
        `}
      >
        {/* Big index number: fully inside the card, never clipped */}
        <span
          aria-hidden="true"
          className={`
            ${display.className}
            pointer-events-none absolute right-5 top-4 select-none
            pb-[0.12em] pr-[0.04em]
            text-[5.5rem] font-bold leading-none tracking-[-0.06em] tabular-nums
            sm:right-6 sm:text-[6.5rem]
            transition-colors duration-500 motion-reduce:transition-none
            ${
              featured
                ? "text-[rgba(145,100,245,0.22)] group-hover:text-[rgba(145,100,245,0.3)]"
                : "text-[rgba(145,100,245,0.12)] group-hover:text-[rgba(145,100,245,0.2)]"
            }
          `}
        >
          {number}
        </span>

        {/* Icon */}
        <span
          aria-hidden="true"
          className="
            relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl
            border border-[rgba(145,100,245,0.3)] bg-[#100D15] text-[#B9A0FF]
            shadow-[inset_0_1px_0_rgba(247,245,250,0.06)]
            transition-[background-color,border-color,color] duration-300
            motion-reduce:transition-none
            group-hover:border-[#9164F5] group-hover:bg-[#9164F5] group-hover:text-[#08070B]
          "
        >
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
        </span>

        {/* Copy */}
        <div className="relative mt-auto pt-12 sm:pt-14">
          <h3
            className={`${display.className} max-w-[20ch] text-[1.35rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#F7F5FA] [text-wrap:balance] sm:text-[1.5rem] ${
              featured ? "lg:text-[1.9rem]" : ""
            }`}
          >
            <span className="sr-only">{number}. </span>
            {title}
          </h3>
          <p className="mt-3 max-w-[34rem] text-[15px] font-medium leading-7 text-[#AAA5B5]">
            {description}
          </p>
        </div>
      </article>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function FeaturesSection() {
  const headingId = useId();

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
        id="features"
        aria-labelledby={headingId}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto grid max-w-[1280px] gap-12 xl:grid-cols-[5fr_7fr] xl:items-start xl:gap-16">
          {/* Header + conversion block */}
          <header className="xl:sticky xl:top-28">
            <motion.p
              {...reveal(0, 14)}
              className={`mb-5 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              The Creative Advantage
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              id={headingId}
              className={`${display.className} text-[2.2rem] font-bold leading-[1.05] tracking-[-0.045em] text-[#F7F5FA] [text-wrap:balance] min-[400px]:text-[2.5rem] sm:text-5xl lg:text-[3.5rem]`}
            >
              <span className="block">More Than Editing.</span>
              <span className="block text-[#9164F5]">Built For Impact.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mt-5 max-w-lg text-[15px] font-medium leading-7 text-[#AAA5B5] sm:mt-6 sm:text-base"
            >
              I don&apos;t just cut footage. I turn ideas into strategic,
              high-quality creative assets designed to capture attention,
              communicate value, and support your brand&apos;s growth.
            </motion.p>

            <motion.div
              {...reveal(0.18)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBook}
                className={`${PRIMARY} h-[54px] px-7 text-[15px]`}
              >
                Book a Call
                <ArrowUpRight size={18} aria-hidden="true" className={ARROW} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${SECONDARY} h-[54px] px-7 text-[15px]`}
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  className="text-[#B9A0FF]"
                />
                Chat on WhatsApp
              </a>
            </motion.div>
          </header>

          {/* Cards */}
          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-5">
            {features.map((feature, index) => (
              <FeatureCard key={feature.number} feature={feature} index={index} />
            ))}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}