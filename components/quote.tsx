"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { PointerEvent, CSSProperties } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

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

/**
 * Framer Motion accepts cubic-bezier easing as a 4-number tuple.
 * Keeping this explicitly typed prevents TypeScript from widening it
 * to number[].
 */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mainPlans: Plan[] = [
  {
    name: "Starter",
    description:
      "For brands looking for a focused, high-quality creative batch.",
    price: "$600",
    creativeCount: "10",
    supportLine: "Ad Creatives",
    features: [
      "4 Direct Response VSL Ads",
      "2 AI UGC Ads",
      "2 Pixar-Style Ads",
      "2 Claymation-Style Ads",
      "2 revisions per creative",
      "Average 3–4 days turnaround",
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
    price: "$1,200",
    creativeCount: "18",
    supportLine: "Ad Creatives",
    featured: true,
    features: [
      "7 Direct Response VSL Ads",
      "4 AI UGC Ads",
      "4 Pixar-Style Ads",
      "3 Claymation-Style Ads",
      "3 revisions per creative",
      "Average 2–3 days turnaround",
      "Dedicated Creative Strategist",
      "Monthly Creative Performance Debrief Call",
      "Pause or cancel anytime",
    ],
    cta: "Book a Call",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const featureItem: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: EASE,
    },
  },
};

export default function Pricing() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate overflow-hidden bg-[#030303] py-24 text-white sm:py-32 lg:py-40"
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_4%,rgba(125,92,255,0.11),transparent_68%)]" />

        <div className="absolute inset-x-0 top-[38%] h-px bg-gradient-to-r from-transparent via-violet-300/[0.10] to-transparent" />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 42, -18, 0],
                  y: [0, -26, 16, 0],
                }
          }
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-56 top-[28%] h-[38rem] w-[38rem] rounded-full bg-violet-700/[0.10] blur-[150px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -34, 22, 0],
                  y: [0, 30, -20, 0],
                }
          }
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-64 top-[16%] h-[42rem] w-[42rem] rounded-full bg-indigo-600/[0.09] blur-[170px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='.55'/></svg>\")",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.45,
          }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-violet-300/[0.16] bg-violet-300/[0.045] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles
              className="h-3.5 w-3.5 text-violet-300"
              strokeWidth={1.8}
            />

            Pricing / Creative Partnership
          </motion.div>

          <motion.h2
            id="pricing-heading"
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "Sora, Inter, sans-serif",
            }}
          >
            Creative production built around{" "}
            <span className="bg-gradient-to-r from-violet-100 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              your growth.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/58 sm:text-lg"
          >
            Choose a focused creative package or start with a single pilot
            project. Every option is designed to make ongoing creative
            production simpler.
          </motion.p>
        </motion.header>

        {/* Main pricing plans */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.14,
          }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-6xl gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8"
        >
          {mainPlans.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </motion.div>

        {/* Supporting offers */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.18,
          }}
          variants={stagger}
          className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-2 lg:mt-8 lg:gap-8"
        >
          <SupportCard
            eyebrow="$100"
            title="Pilot Project"
            body="Not sure if we're a fit? Test the partnership with one ad creative before committing to a full package."
            cta="Get Your First Creative"
            reduceMotion={Boolean(reduceMotion)}
          />

          <SupportCard
            eyebrow="Tailored scope"
            title="Custom Package"
            body="Running a bigger catalog or testing at higher volume? Book a call and I'll build a package around your specific creative needs."
            cta="Book a Call"
            reduceMotion={Boolean(reduceMotion)}
          />
        </motion.div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  reduceMotion,
}: {
  plan: Plan;
  reduceMotion: boolean;
}) {
  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ): void => {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--pointer-x", `${x}%`);
    element.style.setProperty("--pointer-y", `${y}%`);
    element.style.setProperty("--pointer-opacity", "1");
  };

  const handlePointerLeave = (
    event: PointerEvent<HTMLDivElement>
  ): void => {
    event.currentTarget.style.setProperty(
      "--pointer-opacity",
      "0"
    );
  };

  const cardStyle = {
    "--pointer-x": "50%",
    "--pointer-y": "25%",
    "--pointer-opacity": 0,
  } as CSSProperties;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              scale: plan.featured ? 1.012 : 1.008,
              transition: {
                duration: 0.55,
                ease: EASE,
              },
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative min-w-0 rounded-[1.75rem] ${
        plan.featured ? "lg:-mt-3 lg:mb-[-0.75rem]" : ""
      }`}
      style={cardStyle}
    >
      {plan.featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.25rem] bg-[radial-gradient(58%_55%_at_50%_0%,rgba(132,92,246,0.24),transparent_72%)] blur-2xl"
        />
      )}

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_30px_80px_-36px_rgba(0,0,0,0.95)] sm:p-9 lg:p-10 ${
          plan.featured
            ? "border-violet-300/[0.30] bg-[linear-gradient(145deg,rgba(119,79,214,0.18),rgba(16,14,27,0.78)_33%,rgba(255,255,255,0.035)_100%)] shadow-[0_38px_100px_-40px_rgba(104,65,220,0.42)]"
            : "border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02)_42%,rgba(12,10,20,0.40)_100%)]"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--pointer-x) var(--pointer-y), rgba(192,176,255,0.13), transparent 62%)",
            opacity: "var(--pointer-opacity)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.22] to-transparent"
        />

        {plan.featured && (
          <div className="relative z-10 mb-8 flex items-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/[0.25] bg-violet-200/[0.10] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100 shadow-[0_8px_24px_-12px_rgba(167,139,250,0.75)]">
              <Sparkles
                className="h-3 w-3 text-violet-200"
                strokeWidth={2}
              />
              Most Popular
            </div>
          </div>
        )}

        <div
          className={`relative z-10 ${
            plan.featured ? "" : "pt-1"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200/80">
            {plan.name}
          </p>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">
            {plan.description}
          </p>

          <div className="mt-8 flex items-end gap-2">
            <span
              className="text-5xl font-semibold leading-none tracking-[-0.07em] text-white sm:text-6xl"
              style={{
                fontFamily: "Sora, Inter, sans-serif",
              }}
            >
              {plan.price}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span
              className="text-3xl font-semibold leading-none tracking-[-0.05em] text-violet-200"
              style={{
                fontFamily: "Sora, Inter, sans-serif",
              }}
            >
              {plan.creativeCount}
            </span>

            <div className="h-7 w-px bg-violet-200/20" />

            <span className="text-sm font-medium text-white/70">
              {plan.supportLine}
            </span>
          </div>
        </div>

        <div className="relative z-10 my-8 h-px bg-gradient-to-r from-transparent via-violet-200/[0.22] to-transparent" />

        <motion.ul
          variants={stagger}
          className="relative z-10 space-y-3.5"
          aria-label={`${plan.name} plan features`}
        >
          {plan.features.map((feature, index) => (
            <motion.li
              key={`${plan.name}-${feature}`}
              variants={featureItem}
              className="flex items-start gap-3"
            >
              <span
                className={`mt-0.5 flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full border ${
                  plan.featured && index < 4
                    ? "border-violet-200/[0.38] bg-violet-300/[0.17] text-violet-100"
                    : "border-violet-200/[0.18] bg-violet-300/[0.07] text-violet-200/90"
                }`}
              >
                <Check
                  className="h-3 w-3"
                  strokeWidth={2.5}
                />
              </span>

              <span className="text-[14px] leading-relaxed text-white/76 sm:text-[15px]">
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative z-10 mt-auto pt-9">
          <CTAButton
            label={plan.cta}
            featured={plan.featured}
          />
        </div>
      </div>
    </motion.article>
  );
}

function SupportCard({
  eyebrow,
  title,
  body,
  cta,
  reduceMotion,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              transition: {
                duration: 0.55,
                ease: EASE,
              },
            }
      }
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_55%,rgba(80,55,150,0.055))] p-7 shadow-[0_28px_72px_-38px_rgba(0,0,0,0.9)] sm:p-9"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
      />

      <div className="relative flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-200/75">
          {eyebrow}
        </p>

        <h3
          className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl"
          style={{
            fontFamily: "Sora, Inter, sans-serif",
          }}
        >
          {title}
        </h3>

        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/58">
          {body}
        </p>

        <div className="mt-8">
          <CTAButton
            label={cta}
            compact
          />
        </div>
      </div>
    </motion.article>
  );
}

function CTAButton({
  label,
  featured = false,
  compact = false,
}: {
  label: string;
  featured?: boolean;
  compact?: boolean;
}) {
  const sizing = compact
    ? "w-full sm:w-auto min-h-12 px-5 py-3"
    : "min-h-14 w-full px-6 py-4";

  return (
    <motion.button
      type="button"
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.45,
        ease: EASE,
      }}
      className={`group/button inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold outline-none transition-[box-shadow,background-color,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] ${sizing} ${
        featured
          ? "border border-violet-200/[0.38] bg-[linear-gradient(135deg,#9b7cff_0%,#6f55de_48%,#5740bd_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_34px_-15px_rgba(126,87,255,0.70)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_18px_42px_-14px_rgba(126,87,255,0.82)]"
          : "border border-violet-200/[0.20] bg-white/[0.035] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-violet-200/[0.40] hover:bg-violet-200/[0.09] hover:shadow-[0_14px_32px_-18px_rgba(139,92,246,0.48)]"
      }`}
    >
      <span>{label}</span>

      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover/button:translate-x-1" />
    </motion.button>
  );
}