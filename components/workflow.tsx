"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

interface Step {
  id: number;
  number: string;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    number: "01",
    title: "Tell Me What You Need",
    subtitle:
      "Share your goals, product, and current ads. We'll audit what's working, what's not, and uncover the biggest creative opportunities for your brand.",
  },
  {
    id: 2,
    number: "02",
    title: "I Create Your Creatives",
    subtitle:
      "I produce high-converting Meta ads, UGC, AI UGC, Direct Response VSLs, and static creatives tailored to your brand and offer.",
  },
  {
    id: 3,
    number: "03",
    title: "Review & Approve",
    subtitle:
      "Review your creatives and request any revisions. I'll refine everything until every ad feels right for your brand and is ready to launch.",
  },
  {
    id: 4,
    number: "04",
    title: "Launch & Scale",
    subtitle:
      "Launch your new creatives, test them against your current winners, and scale your budget on the ads that perform best.",
  },
];

const AUTOPLAY_DELAY = 4000;
const INTERACTION_PAUSE_DELAY = 9000;
const LAST = STEPS.length - 1;

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

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Smooth 0..1 "how active is step i" curve driven by progress. */
const tent = (v: number, i: number) => {
  const t = clamp01(1 - Math.abs(v * LAST - i));
  return t * t * (3 - 2 * t);
};

/*
 * HYDRATION SAFETY
 * The server cannot know the visitor's "reduce motion" setting, so nothing
 * that is RENDERED may depend on it. Entrance props are always identical and
 * <MotionConfig reducedMotion="user"> changes only how animations play.
 * `useReducedMotion()` below is used ONLY inside effects and event handlers,
 * which never affect the server/client markup.
 */
const enter = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.8, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Rail                                                                */
/* ------------------------------------------------------------------ */

function Rail({
  progress,
  vertical,
}: {
  progress: MotionValue<number>;
  vertical: boolean;
}) {
  const fill = useTransform(progress, (v) => clamp01(v));
  const travel = useTransform(progress, (v) => `${clamp01(v) * 100}%`);
  const orbScale = useTransform(progress, [0.75, 1], [1, 1.2]);

  const box = vertical
    ? "absolute left-[9px] top-[29px] -ml-px h-[calc(75%+18px)] w-[2px] lg:hidden"
    : "absolute left-[12.5%] right-[12.5%] top-[29px] hidden h-[2px] lg:block";

  return (
    <div className={box} aria-hidden="true">
      {/* Track */}
      <motion.span
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
        className={`absolute inset-0 rounded-full bg-[rgba(145,100,245,0.2)] ${
          vertical ? "origin-top" : "origin-left"
        }`}
      />

      {/* Progress fill */}
      <motion.span
        style={vertical ? { scaleY: fill } : { scaleX: fill }}
        className={`absolute inset-0 rounded-full bg-[#9164F5] will-change-transform ${
          vertical ? "origin-top" : "origin-left"
        }`}
      />

      {/* Traveling marker */}
      <motion.div
        style={vertical ? { y: travel } : { x: travel }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className={`absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 ${
            vertical ? "left-1/2 top-0" : "left-0 top-1/2"
          }`}
        >
          <motion.div style={{ scale: orbScale }} className="relative h-full w-full">
            <span className="absolute inset-0 animate-pulse rounded-full bg-[rgba(145,100,245,0.22)] motion-reduce:animate-none" />
            <span className="absolute inset-[13px] rounded-full bg-[#9164F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_0_3px_rgba(8,7,11,1),0_0_0_4px_rgba(185,160,255,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Node                                                                */
/* ------------------------------------------------------------------ */

function Node({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const a = useTransform(progress, (v) => tent(v, index));
  const lit = useTransform(progress, (v) => clamp01(v * LAST - index + 1));
  const halo = useTransform(
    progress,
    (v) => 0.25 * clamp01(v * LAST - index + 1) + 0.75 * tent(v, index)
  );
  const ring = useTransform(lit, [0, 1], [0, 1]);
  const coreScale = useTransform(a, [0, 1], [1, 1.2]);

  return (
    <div className="relative h-[18px] w-[18px]">
      <motion.span
        style={{ opacity: halo }}
        className="absolute -inset-3.5 rounded-full bg-[rgba(145,100,245,0.16)]"
      />
      <motion.span style={{ opacity: a }} className="absolute -inset-3">
        <span className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-[rgba(185,160,255,0.5)] motion-reduce:animate-none" />
      </motion.span>
      <span
        className={`absolute -inset-[5px] rounded-full border ${BORDER} bg-[#08070B]`}
      />
      <motion.span
        style={{ opacity: ring }}
        className="absolute -inset-[5px] rounded-full border border-[#9164F5]"
      />
      <span className="absolute inset-[5.5px] rounded-full bg-[rgba(170,165,181,0.4)]" />
      <motion.span
        style={{ opacity: lit, scale: coreScale }}
        className="absolute inset-[5px] rounded-full bg-[#9164F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step card                                                           */
/* ------------------------------------------------------------------ */

interface ItemProps {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  wide: boolean;
  onSelect: (index: number) => void;
}

const StepItem = memo(function StepItem({
  step,
  index,
  progress,
  active,
  wide,
  onSelect,
}: ItemProps) {
  const a = useTransform(progress, (v) => tent(v, index));
  const scale = useTransform(a, [0, 1], [0.985, 1.02]);
  const y = useTransform(a, [0, 1], [0, -8]);
  const opacity = useTransform(a, [0, 1], [0.8, 1]);
  const numOpacity = useTransform(a, [0, 1], [0.55, 1]);
  const line = useTransform(a, [0, 1], [0.3, 1]);

  const cardDelay = wide ? 0.9 + index * 0.12 : 0.05;
  const nodeDelay = wide ? 0.7 + index * 0.12 : 0.05;

  return (
    <motion.article {...enter(cardDelay)} className="relative min-w-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: nodeDelay }}
        className="absolute -left-10 top-5 z-10 lg:static lg:flex lg:h-[58px] lg:w-full lg:items-center lg:justify-center"
        aria-hidden="true"
      >
        <Node progress={progress} index={index} />
      </motion.div>

      <motion.div
        style={{ scale, y, opacity }}
        className="relative h-full will-change-transform"
      >
        <button
          type="button"
          onClick={() => onSelect(index)}
          aria-current={active ? "step" : undefined}
          aria-label={`Select step ${step.number}: ${step.title}`}
          className={`group relative block h-full w-full overflow-hidden rounded-[24px] text-left lg:min-h-[340px] ${FOCUS}`}
        >
          {/* Surface */}
          <span
            aria-hidden="true"
            style={CARD_SHADOW}
            className={`absolute inset-0 rounded-[inherit] border ${BORDER} bg-[#15121B] transition-colors duration-500 motion-reduce:transition-none [@media(hover:hover)]:group-hover:border-[rgba(185,160,255,0.45)]`}
          />

          {/* Active state */}
          <motion.span
            style={{ opacity: a }}
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] border border-[#9164F5] bg-[rgba(145,100,245,0.06)]"
          />

          {/* Big number: fully inside the card, never clipped */}
          <motion.span
            style={{ opacity: numOpacity }}
            aria-hidden="true"
            className={`${display.className} pointer-events-none absolute right-5 top-5 select-none pb-[0.12em] pr-[0.04em] text-[5.5rem] font-bold leading-none tracking-[-0.06em] tabular-nums text-[rgba(145,100,245,0.2)] lg:right-6 lg:top-6 lg:text-[clamp(5.5rem,8vw,7.25rem)]`}
          >
            {step.number}
          </motion.span>

          {/* Content */}
          <span className="relative flex h-full min-h-[inherit] flex-col p-6 lg:p-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#B9A0FF]">
              <span className="text-[#AAA5B5]">Step</span> {step.number}
            </span>

            <span className="mt-auto block pt-24 lg:pt-28">
              <span
                className={`${display.className} block max-w-[15ch] text-[1.5rem] font-bold leading-[1.06] tracking-[-0.04em] text-[#F7F5FA] lg:text-[clamp(1.35rem,1.9vw,1.7rem)]`}
              >
                {step.title}
              </span>
              <span className="mt-3.5 block text-[14.5px] font-medium leading-[1.65] text-[#AAA5B5] lg:text-[clamp(13.5px,1vw,15px)]">
                {step.subtitle}
              </span>
            </span>

            <span aria-hidden="true" className="mt-6 flex items-center">
              <motion.span
                style={{ scaleX: line }}
                className="block h-[2px] w-12 origin-left rounded-full bg-[#9164F5]"
              />
            </span>
          </span>
        </button>
      </motion.div>
    </motion.article>
  );
});

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const WORDS = ["How", "I", "work"];

const WorkflowTimeline = () => {
  // Effects and handlers only. Never use this value to change rendered output.
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [wide, setWide] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.25 });

  // Scroll -> target -> spring. Autoplay and clicks also write to `target`,
  // so there is a single source of truth and nothing fights.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const target = useMotionValue(0);
  const progress = useSpring(target, { stiffness: 90, damping: 24, mass: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = clamp01(v);
    target.set(next);
    if (reduced) progress.jump(next);
    pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_DELAY;
  });

  // React state only changes when the step index changes (not per frame).
  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.round(clamp01(v) * LAST);
    if (i !== activeRef.current) {
      activeRef.current = i;
      setActiveStep(i);
    }
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || !inView) return undefined;
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      target.set(((activeRef.current + 1) % STEPS.length) / LAST);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(id);
  }, [reduced, inView, target]);

  const selectStep = useCallback(
    (index: number) => {
      pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_DELAY;
      const v = index / LAST;
      target.set(v);
      if (reduced) progress.jump(v);
    },
    [target, progress, reduced]
  );

  const currentNumber = STEPS[activeStep]?.number ?? STEPS[0]?.number ?? "01";
  const totalLabel = String(STEPS.length).padStart(2, "0");

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="workflow-heading"
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28`}
      >
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Header */}
          <header className="text-center">
            <motion.p
              {...enter(0.1, 14)}
              className={`mx-auto mb-5 inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9164F5]"
              />
              Workflow Process
            </motion.p>

            <h2
              id="workflow-heading"
              className={`${display.className} text-[clamp(2.5rem,8.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[#F7F5FA]`}
            >
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
                >
                  <motion.span
                    initial={{ y: "105%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      ease: EASE,
                      delay: 0.2 + i * 0.08,
                    }}
                    className={`inline-block ${
                      i === WORDS.length - 1 ? "text-[#9164F5]" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </header>

          {/* Current stage */}
          <div
            className="my-10 flex items-baseline justify-center gap-3 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-[#AAA5B5] lg:my-14"
            aria-live="polite"
          >
            <span>Current stage</span>
            <span
              className={`${display.className} text-[15px] tracking-[0.02em] text-[#B9A0FF]`}
            >
              {currentNumber} / {totalLabel}
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            <Rail progress={progress} vertical={false} />
            <Rail progress={progress} vertical />

            <div className="relative grid auto-rows-fr grid-cols-1 gap-6 pl-10 lg:grid-cols-4 lg:gap-7 lg:pl-0">
              {STEPS.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  index={index}
                  progress={progress}
                  active={index === activeStep}
                  wide={wide}
                  onSelect={selectStep}
                />
              ))}
            </div>
          </div>

          {/* Step dots */}
          <div
            className="mt-10 flex justify-center gap-2 sm:mt-12"
            role="group"
            aria-label="Workflow navigation"
          >
            {STEPS.map((step, index) => {
              const isCurrent = index === activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-label={`Go to step ${step.number}: ${step.title}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`group grid h-6 w-8 place-items-center rounded-full ${FOCUS}`}
                >
                  <span
                    className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      isCurrent
                        ? "w-8 bg-[#9164F5]"
                        : "w-2 bg-[rgba(170,165,181,0.35)] group-hover:bg-[#B9A0FF]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default WorkflowTimeline;