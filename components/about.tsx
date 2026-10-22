"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
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
/* Assets                                                              */
/* ------------------------------------------------------------------ */

const PROFILE_IMAGE = "/aakash.webp";

/*
 * TOOL LOGOS
 * Files live in /public/icon and are named 1.webp to 6.webp.
 * If a file is missing, that item shows a large lettered mark instead of a
 * broken image, so nothing ever looks broken.
 */
const ICON_DIR = "/icon";

const BOOKING_URL = "https://cal.com/aakash-creative-studio/30min";
const WHATSAPP_URL =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const stats = [
  { number: "1000+", label: "Projects Delivered" },
  { number: "100+", label: "Happy Clients" },
  { number: "2+", label: "Years Experience" },
] as const;

const categories: ReadonlyArray<string> = [
  "Beauty & Skincare",
  "Fashion & Apparel",
  "Supplements & Nutrition",
  "Health & Wellness",
  "Pet Products & Pet Food",
  "Haircare",
  "Fitness & Sports Products",
  "Food, Snacks & Beverages",
  "Home & Furniture",
  "Consumer Electronics & Gadgets",
  "Footwear",
  "Baby & Kids Products",
  "Jewelry & Accessories",
  "Personal Care / Grooming",
  "Home & Household Products",
];

type Tool = {
  name: string;
  note: string;
  /** WebP file name inside ICON_DIR. */
  file: string;
};

const stack: ReadonlyArray<Tool> = [
  { name: "Premiere Pro", note: "Editing", file: "1.webp" },
  { name: "After Effects", note: "Motion", file: "2.webp" },
  { name: "HeyGen", note: "AI avatars", file: "3.webp" },
  { name: "ElevenLabs", note: "AI voice", file: "4.webp" },
  { name: "Arcads", note: "AI UGC", file: "5.webp" },
  { name: "Higgsfield.AI", note: "AI video", file: "6.webp" },
];

const formats: ReadonlyArray<string> = [
  "Performance Ads",
  "Direct Response VSLs",
  "UGC & AI UGC",
  "Meta Ads",
  "AI-Generated Creative",
  "Pixar-Style & Claymation",
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

const FRAME_SHADOW: CSSProperties = {
  boxShadow: [
    "0 0 0 1px rgba(145,100,245,0.32)",
    "0 12px 24px -8px rgba(0,0,0,0.7)",
    "0 40px 90px -24px rgba(0,0,0,0.95)",
  ].join(", "),
};

/*
 * HYDRATION SAFETY
 * Nothing rendered here depends on the visitor's "reduce motion" setting or
 * any browser-only value. Entrance and floating props are always identical,
 * and <MotionConfig reducedMotion="user"> only changes how they play (it
 * switches the floating motion off for visitors who prefer reduced motion).
 * Plain CSS differences use Tailwind motion-reduce: variants. matchMedia is
 * read only inside the click handler.
 */
const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/** Slow, gentle up-and-down drift. Each caller passes its own duration and delay. */
const float = (distance: number, duration: number, delay = 0) => ({
  animate: { y: [0, -distance, 0] },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

/** "1000+" -> 1000 in Porcelain with a lavender "+". */
function StatNumber({ value }: { value: string }) {
  const hasPlus = value.endsWith("+");
  return (
    <>
      {hasPlus ? value.slice(0, -1) : value}
      {hasPlus && <span className="text-[#B9A0FF]">+</span>}
    </>
  );
}

function Eyebrow({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.p
      {...reveal(delay, 14)}
      className="mb-3 flex items-center gap-3 text-[12px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF]"
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#B9A0FF]" />
      {children}
    </motion.p>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <motion.h3
        {...reveal(0.06)}
        className={`${display.className} text-[1.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#F7F5FA] [text-wrap:balance] sm:text-4xl`}
      >
        {title}
      </motion.h3>
    </div>
  );
}

/**
 * Freestanding tool logo: no box, no card.
 * Depth comes from a slight 3D tilt (which settles flat on hover), layered
 * dark drop shadows, a slow float, and a soft floor mark that breathes in
 * time with the float. If the file is missing a large lettered mark is shown.
 */
function ToolLogo({ tool, index }: { tool: Tool; index: number }) {
  const [failed, setFailed] = useState(false);

  const duration = 5.2 + (index % 3) * 0.8;
  const delay = index * 0.35;

  return (
    <div aria-hidden="true" className="flex flex-col items-center">
      <motion.div
        {...float(10, duration, delay)}
        whileHover={{ scale: 1.08 }}
        className="relative"
      >
        <div className="[transform:perspective(700px)_rotateX(7deg)_rotateY(-9deg)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:perspective(700px)_rotateX(0deg)_rotateY(0deg)]">
          {failed ? (
            <span
              className={`${display.className} grid h-24 w-24 place-items-center text-[4.5rem] font-bold leading-none text-[#9164F5] sm:h-28 sm:w-28 lg:h-32 lg:w-32 lg:text-[5rem]`}
            >
              {tool.name.charAt(0)}
            </span>
          ) : (
            <Image
              src={encodeURI(`${ICON_DIR}/${tool.file}`)}
              alt=""
              width={192}
              height={192}
              sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
              draggable={false}
              onError={() => setFailed(true)}
              className="h-24 w-24 select-none object-contain [filter:drop-shadow(0_2px_0_rgba(0,0,0,0.45))_drop-shadow(0_18px_16px_rgba(0,0,0,0.6))] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
            />
          )}
        </div>
      </motion.div>

      {/* Floor mark: shrinks as the logo floats up, like a real shadow */}
      <motion.span
        animate={{ scaleX: [1, 0.78, 1], opacity: [0.9, 0.55, 0.9] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-5 block h-2 w-16 rounded-full bg-[rgba(145,100,245,0.22)] sm:w-20"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function AboutUs() {
  const [portraitFailed, setPortraitFailed] = useState(false);

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
        id="about"
        aria-labelledby="about-heading"
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28 lg:py-32`}
      >
        <div className="mx-auto max-w-7xl">
          {/* ===========================================================
              MAIN COMPOSITION
              =========================================================== */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12 lg:gap-y-12">
            {/* Identity */}
            <header className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <motion.p
                {...reveal(0, 14)}
                className={`mb-7 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-2 text-[11px] font-bold uppercase leading-none tracking-[0.22em] text-[#B9A0FF] sm:text-xs`}
              >
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9164F5] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
                </span>
                About · Creative Profile
              </motion.p>

              <motion.h2
                {...reveal(0.06)}
                id="about-heading"
                className={`${display.className} text-[3.1rem] font-bold leading-[0.98] tracking-[-0.05em] text-[#F7F5FA] min-[400px]:text-[3.6rem] sm:text-7xl lg:text-[5.75rem]`}
              >
                <span className="block">Aakash</span>
                <span className="block text-[#9164F5]">Hanif</span>
              </motion.h2>

              <motion.p
                {...reveal(0.12)}
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[15px] font-bold leading-snug text-[#F7F5FA] sm:text-base"
              >
                <span>Video Editor</span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#9164F5]"
                />
                <span>Creative Strategist</span>
                <span
                  aria-hidden="true"
                  className="hidden h-px w-8 bg-[rgba(145,100,245,0.4)] sm:block"
                />
                <span className="text-[#B9A0FF]">Aakash Creative Studio</span>
              </motion.p>

              <motion.p
                {...reveal(0.18)}
                className="mt-7 max-w-xl text-[1.1rem] font-medium leading-[1.65] text-[#F7F5FA] sm:text-[1.3rem]"
              >
                Performance-focused video creative for DTC and ecommerce
                brands, from first idea to scroll-stopping ad.
              </motion.p>
            </header>

            {/* Portrait: a little smaller and shorter than before */}
            <motion.div
              {...reveal(0.1, 32)}
              className="mx-auto w-full max-w-[290px] sm:max-w-[330px] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:max-w-[360px] lg:self-center lg:justify-self-center"
            >
              <motion.div {...float(7, 8)} className="relative">
                {/* Back plate */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border ${BORDER} bg-[#15121B] sm:translate-x-4 sm:translate-y-4`}
                />

                {/* Frame */}
                <div
                  style={FRAME_SHADOW}
                  className="relative overflow-hidden rounded-[1.75rem] bg-[#100D15]"
                >
                  <div className="relative aspect-[5/6] w-full">
                    {portraitFailed ? (
                      <span
                        aria-hidden="true"
                        className={`${display.className} absolute inset-0 grid place-items-center text-[5rem] font-bold leading-none text-[rgba(145,100,245,0.4)]`}
                      >
                        AH
                      </span>
                    ) : (
                      <Image
                        src={PROFILE_IMAGE}
                        alt="Portrait of Aakash Hanif, video editor and creative strategist"
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 330px, 290px"
                        draggable={false}
                        onError={() => setPortraitFailed(true)}
                        className="object-cover object-top"
                      />
                    )}

                    {/* Flat tint so the nameplate stays legible on any photo */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-24 bg-[rgba(8,7,11,0.55)]"
                    />
                  </div>

                  {/* Nameplate */}
                  <div
                    className={`absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border ${BORDER} bg-[#08070B] px-3.5 py-2.5 sm:inset-x-3.5 sm:bottom-3.5`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`${display.className} truncate text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#F7F5FA]`}
                      >
                        Aakash Hanif
                      </p>
                      <p className="mt-0.5 truncate text-[11.5px] font-medium text-[#AAA5B5]">
                        Aakash Creative Studio
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2 rounded-full border border-[rgba(145,100,245,0.32)] bg-[#15121B] px-2.5 py-1.5 text-[11px] font-bold leading-none text-[#B9A0FF]">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
                      />
                      Available
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bio */}
            <motion.div
              {...reveal(0.1)}
              className="lg:col-span-7 lg:col-start-1 lg:row-start-2"
            >
              <div
                aria-hidden="true"
                className="mb-8 h-px w-full bg-[rgba(145,100,245,0.18)]"
              />

              <div className="max-w-2xl space-y-5 text-[16px] font-medium leading-[1.8] text-[#AAA5B5] sm:text-[17px]">
                <p>
                  <strong className="font-bold text-[#F7F5FA]">
                    I&apos;m Aakash Hanif, a performance-focused video editor
                    and creative strategist.
                  </strong>{" "}
                  Over the past 2+ years and 1000+ projects, I&apos;ve worked
                  with DTC ecommerce brands across a wide range of consumer
                  categories, creating work designed to capture attention,
                  communicate value quickly, and move viewers toward action.
                </p>

                <p>
                  My craft spans performance ads, Direct Response VSLs, UGC and
                  AI UGC, Meta ads, AI-generated creative, Pixar-style and
                  claymation concepts, and social content, with static creative
                  where it fits.
                </p>
              </div>

              <ul
                aria-label="Creative formats"
                className="m-0 mt-7 flex list-none flex-wrap gap-2 p-0"
              >
                {formats.map((format) => (
                  <li
                    key={format}
                    className={`rounded-full border ${BORDER} bg-[#15121B] px-3.5 py-1.5 text-[12.5px] font-bold leading-none text-[#F7F5FA]`}
                  >
                    {format}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats */}
            <dl className="m-0 grid grid-cols-3 gap-2.5 sm:gap-4 lg:col-span-7 lg:col-start-1 lg:row-start-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...reveal(0.15 + index * 0.08)}
                  style={CARD_SHADOW}
                  className={`flex min-w-0 flex-col-reverse justify-end rounded-[20px] border ${BORDER} bg-[#15121B] p-4 sm:p-6`}
                >
                  <dt className="mt-2 text-[11.5px] font-bold leading-snug text-[#AAA5B5] sm:mt-3 sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd
                    className={`${display.className} m-0 text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-[#F7F5FA] sm:text-[2.6rem]`}
                  >
                    <StatNumber value={stat.number} />
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* ===========================================================
              CATEGORIES
              =========================================================== */}
          <div className="mt-20 sm:mt-28">
            <SectionTitle
              eyebrow="DTC categories"
              title="Industries I've worked across"
            />

            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0 sm:gap-3">
              {categories.map((category, index) => (
                <motion.li
                  key={category}
                  {...reveal(Math.min(index, 8) * 0.04, 12)}
                  className={`cursor-default rounded-full border ${BORDER} bg-[#15121B] px-4 py-2.5 text-[14px] font-bold leading-none text-[#F7F5FA] transition-[border-color,transform] duration-300 motion-reduce:transition-none sm:px-5 sm:text-[15px] [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-[rgba(185,160,255,0.55)] motion-reduce:[@media(hover:hover)]:hover:translate-y-0`}
                >
                  {category}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ===========================================================
              CREATIVE STACK: big freestanding logos, no boxes
              =========================================================== */}
          <div className="mt-20 sm:mt-28">
            <SectionTitle eyebrow="Tools & technology" title="Creative stack" />

            <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-14 p-0 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
              {stack.map((tool, index) => (
                <motion.li
                  key={tool.name}
                  {...reveal(index * 0.07, 26)}
                  className="group flex min-w-0 flex-col items-center text-center"
                >
                  <ToolLogo tool={tool} index={index} />

                  <p
                    className={`${display.className} mt-5 text-[1.15rem] font-bold leading-tight tracking-[-0.03em] text-[#F7F5FA] sm:text-[1.3rem]`}
                  >
                    {tool.name}
                  </p>
                  <p className="mt-2 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-[#B9A0FF]">
                    {tool.note}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ===========================================================
              PHILOSOPHY
              =========================================================== */}
          <motion.figure
            {...reveal(0, 24)}
            style={CARD_SHADOW}
            className={`relative m-0 mt-20 overflow-hidden rounded-[28px] border ${BORDER} bg-[#15121B] p-7 sm:mt-28 sm:p-12 lg:p-16`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-8 left-0 w-1 rounded-r-full bg-[#9164F5] sm:inset-y-12"
            />

            <p className="mb-5 text-[12px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF]">
              Creative philosophy
            </p>

            <blockquote
              className={`${display.className} m-0 max-w-3xl text-[1.5rem] font-bold leading-[1.2] tracking-[-0.035em] text-[#F7F5FA] [text-wrap:balance] sm:text-[2.1rem] lg:text-[2.6rem]`}
            >
              A good-looking video isn&apos;t the goal. The goal is creative
              that communicates fast, holds attention, and{" "}
              <span className="text-[#9164F5]">performs.</span>
            </blockquote>

            <figcaption className="mt-6 text-[14px] font-bold text-[#AAA5B5]">
              Aakash Hanif, Aakash Creative Studio
            </figcaption>
          </motion.figure>

          {/* ===========================================================
              CLOSING CTA
              =========================================================== */}
          <motion.div
            {...reveal(0, 16)}
            className="mt-14 flex flex-col items-center gap-6 text-center"
          >
            <div
              aria-hidden="true"
              className="flex w-full max-w-xs items-center gap-3"
            >
              <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
              <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
            </div>

            <p
              className={`${display.className} text-[1.25rem] font-bold leading-snug tracking-[-0.03em] text-[#F7F5FA] sm:text-[1.5rem]`}
            >
              Built for attention. Edited for action.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}