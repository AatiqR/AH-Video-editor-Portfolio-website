"use client";

import { useId, type CSSProperties, type MouseEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
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

type Plan = {
  name: string;
  description: string;
  price: string;
  creativeCount: string;
  supportLine: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

type SupportOffer = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const BOOKING_URL = "https://cal.com/Aakash-creative-studio/30min";

const mainPlans: Plan[] = [
  {
    name: "Starter",
    description:
      "For brands looking for a focused, high-quality creative batch.",
    price: "$800",
    creativeCount: "10",
    supportLine: "Ad Creatives",
    features: [
      "4 Direct Response VSL Ads",
      "2 AI UGC Ads",
      "2 Pixar-Style Ads",
      "2 Claymation-Style Ads",
      "2 revisions per creative",
      "Average 6–8 days turnaround",
      "Direct communication",
      "Easy payment (PayPal / Bank Transfer)",
      "Pause or cancel anytime",
    ],
    cta: "Book a Call",
  },
  {
    name: "Growth",
    description:
      "For brands that need greater creative variety and strategic support.",
    price: "$1,600",
    creativeCount: "18",
    supportLine: "Ad Creatives",
    featured: true,
    features: [
      "7 Direct Response VSL Ads",
      "4 AI UGC Ads",
      "4 Pixar-Style Ads",
      "3 Claymation-Style Ads",
      "3 revisions per creative",
      "Average 12–14 days turnaround",
      "Dedicated Creative Strategist",
      "Monthly Creative Performance Debrief Call",
      "Pause or cancel anytime",
    ],
    cta: "Book a Call",
  },
];

const supportOffers: SupportOffer[] = [
  {
    eyebrow: "$100",
    title: "Pilot Project",
    body: "Not sure if we're a fit? Test the partnership with one ad creative before committing to a full package.",
    cta: "Get Your First Creative",
  },
  {
    eyebrow: "Tailored scope",
    title: "Custom Package",
    body: "Running a bigger catalog or testing at higher volume? Book a call and I'll build a package around your specific creative needs.",
    cta: "Book a Call",
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
 * Nothing rendered here depends on the visitor's "reduce motion" setting or
 * any browser-only value. Entrance props are always identical, and
 * <MotionConfig reducedMotion="user"> only changes how they play. Plain CSS
 * differences use Tailwind motion-reduce: variants. matchMedia is read only
 * inside the click handler.
 */
const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

type BookHandler = (event: MouseEvent<HTMLAnchorElement>) => void;

/* ------------------------------------------------------------------ */
/* Plan card                                                           */
/* ------------------------------------------------------------------ */

function PlanCard({
  plan,
  index,
  onBook,
}: {
  plan: Plan;
  index: number;
  onBook: BookHandler;
}) {
  const featured = Boolean(plan.featured);

  return (
    <motion.article
      {...reveal(index * 0.1, 22)}
      style={CARD_SHADOW}
      className={`
        relative flex h-full min-w-0 flex-col overflow-hidden
        rounded-[28px] border bg-[#15121B] p-6 sm:p-8 lg:p-9
        ${featured ? "border-[rgba(145,100,245,0.55)]" : BORDER}
      `}
    >
      {/* Name + badge */}
      <div className="flex min-h-[28px] items-center justify-between gap-3">
        <p className="text-[12px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF]">
          {plan.name}
        </p>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9164F5] px-3 py-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-[#08070B]">
            Most Popular
          </span>
        )}
      </div>

      <p className="mt-3 max-w-sm text-[15px] font-medium leading-7 text-[#AAA5B5]">
        {plan.description}
      </p>

      {/* Price */}
      <p
        className={`${display.className} mt-7 text-[3.25rem] font-bold leading-none tracking-[-0.05em] text-[#F7F5FA] sm:text-[4rem]`}
      >
        {plan.price}
      </p>

      <div className="mt-5 flex items-center gap-3">
        <span
          className={`${display.className} text-[1.85rem] font-bold leading-none tracking-[-0.04em] tabular-nums text-[#B9A0FF]`}
        >
          {plan.creativeCount}
        </span>
        <span
          aria-hidden="true"
          className="h-6 w-px bg-[rgba(145,100,245,0.3)]"
        />
        <span className="text-[15px] font-bold leading-none text-[#F7F5FA]">
          {plan.supportLine}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="my-7 h-px bg-[rgba(145,100,245,0.18)] sm:my-8"
      />

      {/* Features */}
      <ul
        aria-label={`${plan.name} plan features`}
        className="m-0 flex list-none flex-col gap-3.5 p-0"
      >
        {plan.features.map((feature) => (
          <li key={`${plan.name}-${feature}`} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                featured
                  ? "border-[#9164F5] bg-[#9164F5] text-[#08070B]"
                  : "border-[rgba(145,100,245,0.35)] bg-[#100D15] text-[#B9A0FF]"
              }`}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[15px] font-medium leading-6 text-[#F7F5FA]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-9">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onBook}
          aria-label={`${plan.cta}: ${plan.name} plan`}
          className={`${featured ? PRIMARY : SECONDARY} h-[54px] w-full px-6 text-[15px]`}
        >
          {plan.cta}
          <ArrowUpRight size={18} aria-hidden="true" className={ARROW} />
        </a>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Support card                                                        */
/* ------------------------------------------------------------------ */

function SupportCard({
  offer,
  index,
  onBook,
}: {
  offer: SupportOffer;
  index: number;
  onBook: BookHandler;
}) {
  return (
    <motion.article
      {...reveal(index * 0.1, 22)}
      style={CARD_SHADOW}
      className={`flex h-full min-w-0 flex-col rounded-[24px] border ${BORDER} bg-[#15121B] p-6 sm:p-8`}
    >
      <p className="text-[12px] font-bold uppercase leading-none tracking-[0.22em] text-[#B9A0FF]">
        {offer.eyebrow}
      </p>

      <h3
        className={`${display.className} mt-3 text-[1.6rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#F7F5FA] sm:text-[1.9rem]`}
      >
        {offer.title}
      </h3>

      <p className="mt-4 max-w-lg text-[15px] font-medium leading-7 text-[#AAA5B5]">
        {offer.body}
      </p>

      <div className="mt-auto pt-8">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onBook}
          className={`${SECONDARY} h-[52px] w-full px-6 text-[15px] sm:w-auto`}
        >
          {offer.cta}
          <ArrowUpRight size={18} aria-hidden="true" className={ARROW} />
        </a>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  const headingId = useId();

  /* Scroll to #booking if that section exists, otherwise open the booking page.
     The motion preference is read here, inside an event handler, never in render. */
  const handleBook: BookHandler = (event) => {
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
        id="pricing"
        aria-labelledby={headingId}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <motion.p
              {...reveal(0, 14)}
              className={`mx-auto mb-5 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              Pricing
            </motion.p>

            <motion.h2
              {...reveal(0.06)}
              id={headingId}
              className={`${display.className} text-[2.2rem] font-bold leading-[1.05] tracking-[-0.045em] text-[#F7F5FA] [text-wrap:balance] min-[400px]:text-[2.5rem] sm:text-5xl lg:text-[3.75rem]`}
            >
              Creative production built around{" "}
              <span className="text-[#9164F5]">your growth.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="mx-auto mt-5 max-w-2xl text-[15px] font-medium leading-7 text-[#AAA5B5] sm:mt-6 sm:text-base"
            >
              Choose a focused creative package or start with a single pilot
              project. Every option is designed to make ongoing creative
              production simpler.
            </motion.p>
          </header>

          {/* Main plans */}
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2 lg:gap-8">
            {mainPlans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                index={index}
                onBook={handleBook}
              />
            ))}
          </div>

          {/* Supporting offers */}
          <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2 lg:mt-8 lg:gap-8">
            {supportOffers.map((offer, index) => (
              <SupportCard
                key={offer.title}
                offer={offer}
                index={index}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}