
"use client";

import { type CSSProperties, type ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";

/* ------------------------------------------------------------------ */
/* Fonts: identical configs to Hero, LogoSlider and PortfolioSlider    */
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
/* Types and data                                                      */
/* ------------------------------------------------------------------ */

export type Service = {
  number: string;
  /** Use "\n" to break the title into two lines. */
  title: string;
  description: string;
  featured?: boolean;
  /** Only set a real, existing anchor or route. Without it the card is static. */
  href?: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Direct Response\nMeta Ads",
    description:
      "Performance-led creatives shaped around the hook, message, and moment of conversion.",
    featured: true,
  },
  {
    number: "02",
    title: "AI UGC\nAds",
    description:
      "Native-feeling paid-social creative, built for a modern attention economy.",
  },
  {
    number: "03",
    title: "VSL & Sales\nVideos",
    description:
      "Long-form edits that guide a clear story with rhythm, structure, and visual intent.",
  },
  {
    number: "04",
    title: "Short-Form\nContent",
    description:
      "Reels, TikToks, and Shorts cut for retention without losing the brand’s point of view.",
  },
];

export type ServicesSectionProps = {
  /** Supply only a real, existing portfolio anchor or route. */
  portfolioHref?: string;
  /** Add real service destinations here when they exist in the parent site. */
  services?: Service[];
};

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
 * The server cannot know the visitor's "reduce motion" setting. If markup or
 * props depend on it during render, the server HTML and the first client
 * render differ and React throws a hydration error. So the entrance props
 * below are ALWAYS the same, and <MotionConfig reducedMotion="user"> (which
 * only changes how animations play, never what is rendered) makes Framer
 * Motion skip transform animation for visitors who prefer reduced motion.
 * Pure CSS differences use Tailwind's motion-reduce: variants.
 */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Service card                                                        */
/* ------------------------------------------------------------------ */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const lines = service.title
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const plainTitle = lines.join(" ");
  const isLink = Boolean(service.href);
  const featured = Boolean(service.featured);

  const cardClass = `
    group relative flex h-full min-h-[20rem] flex-col overflow-hidden
    rounded-[24px] border bg-[#15121B]
    p-6 sm:min-h-[22rem] sm:p-8 lg:min-h-[24rem]
    ${featured ? "border-[rgba(145,100,245,0.42)]" : BORDER}
    transition-[transform,border-color] duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    motion-reduce:transition-none
    md:hover:-translate-y-1
    md:hover:border-[rgba(185,160,255,0.5)]
    motion-reduce:md:hover:translate-y-0
    ${FOCUS}
  `;

  const content: ReactNode = (
    <>
      {/* Big index number: fully inside the card, never clipped */}
      <span
        aria-hidden="true"
        className={`
          ${display.className}
          pointer-events-none absolute right-6 top-5 z-0 select-none
          pb-[0.12em] pr-[0.04em]
          text-[6.5rem] font-bold leading-none tracking-[-0.06em] tabular-nums
          sm:right-8 sm:top-6 sm:text-[8rem]
          lg:text-[9.5rem]
          transition-colors duration-500 motion-reduce:transition-none
          ${
            featured
              ? "text-[rgba(145,100,245,0.22)] group-hover:text-[rgba(145,100,245,0.3)]"
              : "text-[rgba(145,100,245,0.12)] group-hover:text-[rgba(145,100,245,0.2)]"
          }
        `}
      >
        {service.number}
      </span>

      {/* Top label */}
      <span className="relative z-10 flex items-center gap-2.5 text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#AAA5B5]">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#9164F5]"
        />
        Creative format
      </span>

      {/* Copy */}
      <div className="relative z-10 mb-7 mt-auto pt-24 sm:pt-28">
        <h3
          className={`${display.className} text-[clamp(1.9rem,8.4vw,2.4rem)] font-bold leading-[1.04] tracking-[-0.045em] text-[#F7F5FA] sm:text-[2.35rem] lg:text-[2.9rem]`}
        >
          {lines.map((line, lineIndex) => (
            <span
              key={`${line}-${lineIndex}`}
              className={`block ${
                lineIndex === lines.length - 1 && lines.length > 1
                  ? "text-[#B9A0FF]"
                  : ""
              }`}
            >
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-4 max-w-[27rem] text-[15px] font-medium leading-7 text-[#AAA5B5] sm:text-base">
          {service.description}
        </p>
      </div>

      {/* Action row */}
      <span
        className={`relative z-10 flex min-h-12 items-center justify-between gap-4 border-t pt-4 ${BORDER}`}
      >
        <span className="text-[13px] font-bold leading-none tracking-[-0.005em] text-[#B9A0FF]">
          {isLink ? "Explore work" : "Selected creative"}
        </span>

        {isLink ? (
          <span
            aria-hidden="true"
            className="
              grid h-10 w-10 shrink-0 place-items-center rounded-full
              border border-[rgba(145,100,245,0.3)] bg-[#100D15] text-[#F7F5FA]
              transition-[background-color,border-color,color,transform] duration-300
              motion-reduce:transition-none
              group-hover:border-[#9164F5] group-hover:bg-[#9164F5] group-hover:text-[#08070B]
            "
          >
            <ArrowUpRight
              className="
                h-[18px] w-[18px] transition-transform duration-300
                motion-reduce:transition-none
                group-hover:-translate-y-px group-hover:translate-x-px
                motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0
              "
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[#9164F5]"
          />
        )}
      </span>
    </>
  );

  return (
    <motion.div {...reveal(Math.min(index, 3) * 0.08)} className="h-full">
      {isLink ? (
        <a
          href={service.href}
          aria-label={`Explore ${plainTitle} work`}
          style={CARD_SHADOW}
          className={`${cardClass} text-left no-underline`}
        >
          {content}
        </a>
      ) : (
        <article style={CARD_SHADOW} className={cardClass}>
          {content}
        </article>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function ServicesSection({
  portfolioHref,
  services = SERVICES,
}: ServicesSectionProps) {
  const outroClass = `
    inline-flex items-center gap-2.5 rounded-full border ${BORDER}
    bg-[#15121B] px-5 py-3
    text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-[#B9A0FF]
  `;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        aria-labelledby="services-heading"
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <motion.p
              {...reveal(0)}
              className={`
                mx-auto mb-5 inline-flex items-center gap-2.5
                rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5
                text-[11px] font-bold uppercase leading-none tracking-[0.24em]
                text-[#B9A0FF] sm:text-xs
              `}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              Services
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              id="services-heading"
              className={`
                ${display.className}
                text-[2rem] font-bold leading-[1.05] tracking-[-0.045em]
                text-[#F7F5FA] [text-wrap:balance]
                min-[400px]:text-[2.4rem] sm:text-5xl lg:text-[3.75rem]
              `}
            >
              <span className="block">Built for attention</span>
              <span className="block text-[#9164F5]">Designed to perform.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-7 text-[#AAA5B5] sm:mt-6 sm:text-base"
            >
              Creative direction and post-production for paid ads, sales
              stories, social content, and cinematic brand moments.
            </motion.p>
          </header>

          {/* Grid */}
          <div
            role="list"
            aria-label="Creative services"
            className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-5"
          >
            {services.map((service, index) => (
              <div
                role="listitem"
                key={`${service.number}-${service.title}`}
                className="min-w-0"
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

          {/* Outro */}
          <motion.div
            {...reveal(0.1)}
            className="mt-12 flex justify-center sm:mt-16"
          >
            {portfolioHref ? (
              <a
                href={portfolioHref}
                className={`${outroClass} transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-[rgba(185,160,255,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS}`}
              >
                Explore the work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <p className={`m-0 ${outroClass}`}>
                Selected work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}