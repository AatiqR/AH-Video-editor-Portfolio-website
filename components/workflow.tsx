"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
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
import { ArrowRight } from "lucide-react";

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

const EASE = [0.16, 1, 0.3, 1] as const;
const LAST = STEPS.length - 1;
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040d]";
const BRAND = "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
// Smooth 0..1 "how active is step i" curve driven by scroll progress.
const tent = (v: number, i: number) => {
  const t = clamp01(1 - Math.abs(v * LAST - i));
  return t * t * (3 - 2 * t);
};

// Viewport-entry animation (blur -> sharp). Returns nothing for reduced motion.
type Vars = Record<string, string | number>;
const enter = (reduced: boolean | null, delay = 0, from: Vars = {}, to: Vars = {}) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 30, scale: 0.96, filter: "blur(12px)", ...from },
        whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ...to },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: { duration: 0.8, ease: EASE, delay },
      };

const tile = (dots: string[], size: number): CSSProperties => ({
  backgroundImage: dots
    .map((d) => {
      const [x, y, c] = d.split("|");
      return `radial-gradient(1.2px 1.2px at ${x}px ${y}px, ${c}, transparent)`;
    })
    .join(","),
  backgroundSize: `${size}px ${size}px`,
});
const STARS_A = tile(
  ["30|40|rgba(255,255,255,.75)", "150|210|rgba(255,255,255,.5)", "270|90|rgba(216,180,254,.7)", "90|300|rgba(255,255,255,.4)", "310|280|rgba(255,255,255,.55)"],
  340,
);
const STARS_B = tile(
  ["60|120|rgba(232,121,249,.6)", "240|40|rgba(255,255,255,.5)", "400|330|rgba(196,181,253,.7)", "180|440|rgba(255,255,255,.4)", "470|180|rgba(255,255,255,.55)"],
  520,
);
const PARTICLES = [
  { l: "12%", t: "22%", d: "0s" },
  { l: "82%", t: "16%", d: "1.2s" },
  { l: "70%", t: "72%", d: "2.1s" },
  { l: "22%", t: "80%", d: "0.6s" },
];

function trackPointer(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const b = el.getBoundingClientRect();
  const x = (event.clientX - b.left) / b.width;
  const y = (event.clientY - b.top) / b.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--rx", `${((0.5 - y) * 2).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${((x - 0.5) * 2).toFixed(2)}deg`);
}
function resetPointer(event: ReactPointerEvent<HTMLElement>) {
  const s = event.currentTarget.style;
  ["--mx", "--my", "--rx", "--ry"].forEach((p) => s.removeProperty(p));
}

/* ---------------------------- Background ---------------------------- */

function Cosmos({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean | null }) {
  const starsA = useTransform(progress, [0, 1], [0, -70]);
  const starsB = useTransform(progress, [0, 1], [0, -130]);
  const glowX = useTransform(progress, [0, 1], ["-22%", "22%"]);
  const glowY = useTransform(progress, [0, 1], ["-6%", "10%"]);
  const glowScale = useTransform(progress, [0, 0.75, 1], [1, 1, 1.25]);
  const fade = reduced ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 1.4 } };

  return (
    <motion.div {...fade} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: glowX, y: glowY, scale: glowScale }}
        className="absolute left-1/2 top-1/2 -ml-[30rem] -mt-[23rem] h-[46rem] w-[60rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.26),rgba(217,70,239,0.08)_45%,transparent_70%)] will-change-transform"
      />
      <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(217,70,239,0.10),transparent_68%)]" />
      <motion.div style={{ y: starsA }} className="absolute -inset-y-40 inset-x-0 will-change-transform">
        <div className="h-full w-full animate-pulse opacity-80 [animation-duration:4s] motion-reduce:animate-none" style={STARS_A} />
      </motion.div>
      <motion.div style={{ y: starsB }} className="absolute -inset-y-40 inset-x-0 will-change-transform">
        <div className="h-full w-full animate-pulse opacity-70 [animation-duration:7s] motion-reduce:animate-none" style={STARS_B} />
      </motion.div>
      {PARTICLES.map((p) => (
        <span
          key={p.l}
          style={{ left: p.l, top: p.t, animationDelay: p.d }}
          className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-violet-200/80 shadow-[0_0_14px_4px_rgba(168,85,247,0.45)] [animation-duration:5s] motion-reduce:animate-none"
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,4,13,0.9)_100%)]" />
    </motion.div>
  );
}

/* ------------------------------- Rail ------------------------------- */

function Rail({ progress, vertical, reduced }: { progress: MotionValue<number>; vertical: boolean; reduced: boolean | null }) {
  const fill = useTransform(progress, (v) => clamp01(v));
  const travel = useTransform(progress, (v) => `${clamp01(v) * 100}%`);
  const orbScale = useTransform(progress, [0.75, 1], [1, 1.35]);

  const box = vertical
    ? "absolute left-[9px] top-[29px] -ml-px h-[calc(75%+18px)] w-[2px] lg:hidden"
    : "absolute left-[12.5%] right-[12.5%] top-[29px] hidden h-[2px] lg:block";

  return (
    <div className={box} aria-hidden="true">
      <motion.span
        className={`absolute inset-0 rounded-full bg-white/[0.12] ${vertical ? "origin-top" : "origin-left"}`}
        {...(reduced ? {} : { initial: vertical ? { scaleY: 0 } : { scaleX: 0 }, whileInView: vertical ? { scaleY: 1 } : { scaleX: 1 }, viewport: { once: true }, transition: { duration: 1.1, ease: EASE, delay: 0.9 } })}
      />
      <motion.span
        style={vertical ? { scaleY: fill } : { scaleX: fill }}
        className={`absolute inset-0 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] will-change-transform ${vertical ? "origin-top bg-gradient-to-b" : "origin-left"}`}
      >
        {!reduced && (
          <motion.span
            className={`absolute bg-white/70 blur-[2px] ${vertical ? "inset-x-0 h-1/4" : "inset-y-0 w-1/4"}`}
            animate={vertical ? { y: ["-100%", "500%"] } : { x: ["-100%", "500%"] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
          />
        )}
      </motion.span>
      <motion.div style={vertical ? { y: travel } : { x: travel }} className="absolute inset-0 will-change-transform">
        <div className={`absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 ${vertical ? "left-1/2 top-0" : "left-0 top-1/2"}`}>
          <motion.div style={{ scale: orbScale }} className="relative h-full w-full">
            <span className="absolute inset-0 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.45),transparent_68%)] motion-reduce:animate-none" />
            <span className="absolute inset-[13px] rounded-full bg-[radial-gradient(circle,#fff_0,#fff_22%,#a78bfa_46%,#a855f7_72%)] shadow-[0_0_18px_6px_rgba(168,85,247,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------- Node ------------------------------- */

function Node({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const a = useTransform(progress, (v) => tent(v, index));
  const lit = useTransform(progress, (v) => clamp01(v * LAST - index + 1));
  const glow = useTransform(progress, (v) => 0.2 * clamp01(v * LAST - index + 1) + 0.8 * tent(v, index));
  const ring = useTransform(lit, [0, 1], [0, 0.95]);
  const coreScale = useTransform(a, [0, 1], [1, 1.25]);

  return (
    <div className="relative h-[18px] w-[18px]">
      <motion.span style={{ opacity: glow }} className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.55),rgba(217,70,239,0.18)_55%,transparent_70%)]" />
      <motion.span style={{ opacity: a }} className="absolute -inset-3">
        <span className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full border border-dashed border-violet-300/50 motion-reduce:animate-none" />
        <span className="absolute inset-0 animate-ping rounded-full border border-fuchsia-400/40 [animation-duration:2.6s] motion-reduce:animate-none" />
      </motion.span>
      <span className="absolute -inset-[5px] rounded-full border border-white/25 bg-[#06040d]" />
      <motion.span style={{ opacity: ring }} className="absolute -inset-[5px] rounded-full border border-violet-300 shadow-[0_0_14px_rgba(168,85,247,0.55)]" />
      <span className="absolute inset-[5.5px] rounded-full bg-white/50" />
      <motion.span style={{ opacity: lit, scale: coreScale }} className="absolute inset-[5px] rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_0_12px_3px_rgba(168,85,247,0.7)]" />
    </div>
  );
}

/* -------------------------------- Item -------------------------------- */

interface ItemProps {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  wide: boolean;
  reduced: boolean | null;
  onSelect: (index: number) => void;
}

const StepItem = memo(function StepItem({ step, index, progress, active, wide, reduced, onSelect }: ItemProps) {
  const a = useTransform(progress, (v) => tent(v, index));
  const scale = useTransform(a, [0, 1], [0.985, 1.03]);
  const y = useTransform(a, [0, 1], [0, -10]);
  const opacity = useTransform(a, [0, 1], [0.66, 1]);
  const numOpacity = useTransform(a, [0, 1], [0.4, 1]);
  const numScale = useTransform(a, [0, 1], [1, 1.06]);
  const numY = useTransform(a, [0, 1], [0, -4]);
  const titleY = useTransform(a, [0, 1], [0, -2]);
  const titleOp = useTransform(a, [0, 1], [0.8, 1]);
  const descOp = useTransform(a, [0, 1], [0.55, 0.88]);
  const line = useTransform(a, [0, 1], [0.4, 1]);

  const cardDelay = wide ? 1.2 + index * 0.12 : 0.05;
  const nodeDelay = wide ? 1 + index * 0.12 : 0.05;

  return (
    <motion.article {...enter(reduced, cardDelay)} className="relative min-w-0">
      <motion.div
        {...(reduced ? {} : { initial: { opacity: 0, scale: 0.4 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.6, ease: EASE, delay: nodeDelay } })}
        className="absolute -left-10 top-5 z-10 lg:static lg:flex lg:h-[58px] lg:w-full lg:items-center lg:justify-center"
        aria-hidden="true"
      >
        <Node progress={progress} index={index} />
      </motion.div>

      <motion.div style={{ scale, y, opacity }} className="relative h-full will-change-transform lg:mt-0">
        <motion.span style={{ opacity: a }} aria-hidden="true" className="pointer-events-none absolute -inset-3 rounded-[34px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.34),transparent_70%)]" />
        <button
          type="button"
          onClick={() => onSelect(index)}
          onPointerMove={trackPointer}
          onPointerLeave={resetPointer}
          aria-pressed={active}
          aria-current={active ? "step" : undefined}
          aria-label={`Select step ${step.number}: ${step.title}`}
          className={`group relative block h-full w-full overflow-hidden rounded-[22px] text-left transition-transform duration-300 ease-out [--rx:0deg] [--ry:0deg] [transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))] motion-reduce:transition-none lg:min-h-[340px] ${FOCUS}`}
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] border border-violet-200/15 bg-[#0d0a1a]/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_30%,rgba(124,58,237,0.07))] shadow-[0_24px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm" />
          <motion.span style={{ opacity: a }} aria-hidden="true" className="absolute inset-0 rounded-[inherit] border border-violet-300/70 bg-[linear-gradient(145deg,rgba(167,139,250,0.16),rgba(217,70,239,0.08)_50%,rgba(124,58,237,0.14))] shadow-[inset_0_0_32px_rgba(168,85,247,0.14)]" />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 motion-reduce:hidden [@media(hover:hover)]:group-hover:opacity-100"
            style={{ background: "radial-gradient(280px circle at var(--mx,50%) var(--my,0%), rgba(192,132,252,0.20), transparent 65%), linear-gradient(118deg, transparent 25%, rgba(255,255,255,0.06) 45%, transparent 60%)" }}
          />
          <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <motion.span style={{ opacity: numOpacity, scale: numScale, y: numY }} aria-hidden="true" className="pointer-events-none absolute right-4 top-10 select-none text-[84px] font-black leading-[0.78] tracking-[-0.1em] text-transparent [-webkit-text-stroke:1px_rgba(196,181,253,0.4)] lg:text-[clamp(76px,8vw,116px)]">
            {step.number}
            <motion.span style={{ opacity: a }} className="absolute inset-0 bg-gradient-to-b from-violet-300/45 to-fuchsia-500/35 bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(232,121,249,0.85)]">
              {step.number}
            </motion.span>
          </motion.span>

          <span className="relative flex h-full min-h-[inherit] flex-col p-6 lg:p-7">
            <motion.span style={{ opacity: titleOp }} className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase leading-none tracking-[0.17em] text-violet-300">
              <span className="text-white/40">Step</span> {step.number}
            </motion.span>
            <span className="mt-auto block pt-16 lg:pt-20">
              <motion.span style={{ y: titleY, opacity: titleOp }} className="block max-w-[15ch] text-[22px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white lg:text-[clamp(20px,1.8vw,27px)]">
                {step.title}
              </motion.span>
              <motion.span style={{ opacity: descOp }} className="mt-3.5 block text-[13px] font-medium leading-[1.62] tracking-[-0.01em] text-violet-50 lg:text-[clamp(12px,0.95vw,14px)]">
                {step.subtitle}
              </motion.span>
            </span>
            <span aria-hidden="true" className="mt-5 flex items-center gap-3">
              <motion.span style={{ scaleX: line }} className="block h-px w-12 origin-left bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(192,132,252,0.7)]" />
              <span className="text-[10px] font-extrabold tracking-[0.14em] text-white/35">{String(index + 1).padStart(2, "0")}</span>
            </span>
          </span>
        </button>
      </motion.div>
    </motion.article>
  );
});

/* ------------------------------- Section ------------------------------- */

const WORDS = ["How", "I", "work"];

const WorkflowTimeline = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [wide, setWide] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.25 });

  // Scroll -> target -> spring. Autoplay/clicks also write to `target`,
  // so there is a single source of truth and nothing fights.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.75", "end 0.55"] });
  const target = useMotionValue(0);
  const progress = useSpring(target, { stiffness: 90, damping: 24, mass: 0.5 });
  const ctaGlow = useTransform(progress, [0.6, 1], [0.3, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.set(clamp01(v));
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
    if (reduced || !inView) return;
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
    [target, progress, reduced],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#06040d] px-4 py-24 text-white sm:px-8 lg:py-32"
      aria-labelledby="workflow-heading"
    >
      <Cosmos progress={progress} reduced={reduced} />

      <div className="mx-auto w-full max-w-[1400px]">
        <header className="text-center">
          <motion.p {...enter(reduced, 0.3)} className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-violet-300 [text-shadow:0_0_18px_rgba(167,139,250,0.55)]">
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.9)]"
            />
            Workflow Process
          </motion.p>

          <h2 id="workflow-heading" className="relative text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.95]">
            <motion.span
              aria-hidden="true"
              {...(reduced ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 1.6, delay: 0.9 } })}
              className="pointer-events-none absolute inset-x-[15%] top-1/4 -z-10 h-1/2 bg-[radial-gradient(ellipse,rgba(168,85,247,0.5),transparent_70%)] blur-2xl"
            />
            {WORDS.map((word, i) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-2 last:mr-0">
                <motion.span
                  {...enter(reduced, 0.45 + i * 0.09, { y: "60%", scale: 1, letterSpacing: "0em" }, { letterSpacing: "-0.06em" })}
                  className={`inline-block bg-clip-text text-transparent ${i === 2 ? "bg-gradient-to-r from-violet-300 via-fuchsia-300 to-purple-400 tracking-[-0.06em]" : "bg-gradient-to-b from-white to-violet-200 tracking-[-0.06em]"}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.span
            aria-hidden="true"
            {...(reduced ? {} : { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true }, transition: { duration: 0.9, ease: EASE, delay: 0.9 } })}
            className="mx-auto mt-6 block h-[2px] w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-500 shadow-[0_0_14px_rgba(192,132,252,0.8)]"
          />
        </header>

        <div className="my-10 flex items-baseline justify-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/40 lg:my-12" aria-live="polite">
          <span>Current stage</span>
          <span className="text-[11px] text-fuchsia-300">{STEPS[activeStep]!.number} / 04</span>
        </div>

        <div className="relative">
          <Rail progress={progress} vertical={false} reduced={reduced} />
          <Rail progress={progress} vertical reduced={reduced} />
          <div className="relative grid auto-rows-fr grid-cols-1 gap-6 pl-10 lg:grid-cols-4 lg:gap-7 lg:pl-0">
            {STEPS.map((step, index) => (
              <StepItem key={step.id} step={step} index={index} progress={progress} active={index === activeStep} wide={wide} reduced={reduced} onSelect={selectStep} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2" role="group" aria-label="Workflow navigation">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => selectStep(index)}
              aria-label={`Go to step ${step.number}: ${step.title}`}
              aria-current={index === activeStep ? "step" : undefined}
              className={`grid h-5 w-7 place-items-center rounded-full ${FOCUS}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  index === activeStep ? `w-7 ${BRAND} shadow-[0_0_12px_rgba(192,132,252,0.75)]` : "w-1.5 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>

   
      </div>
    </section>
  );
};

export default WorkflowTimeline;