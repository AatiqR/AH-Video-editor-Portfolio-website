"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as RME,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Star, ArrowRight, MessageCircle } from "lucide-react";
import { Sora, Bebas_Neue } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const WHATSAPP =
  "https://wa.me/923335673693?text=Hi%20I%20am%20interested%20in%20your%20services";

const NAV = ["Work", "Services", "Results", "Contact"];

const AVATARS = [
  "./client/31.webp",
  "./client/15.webp",
  "./client/17.webp",
  "./client/16.webp",
  "./client/36.webp",
];

const WORDS = [
  "Scroll-Stopping UGC Editor",
  "VSL & Video Ad Specialist",
];

const MARQUEE = [
  "More Views",
  "More Sales",
  "UGC That Converts",
  "Higher ROAS",
  "Scroll-Stopping Ads",
  "Direct Response VSLs",
  "Lower CPA",
  "Winning Creatives",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Canvas: twinkling stars + streaks of light travelling left -> right ---------- */
function CosmosCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !parent || !ctx) return;

    const reduce = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const fine = window.matchMedia("(pointer: fine)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = true;
    let mx = 0;
    let my = 0;
    let sx = 0;
    let sy = 0;
    let nextShot = 0.6;

    type Star = {
      x: number;
      y: number;
      r: number;
      s: number;
      p: number;
    };

    type Shot = {
      x: number;
      y: number;
      len: number;
      v: number;
      a: number;
      w: number;
      life: number;
      hue: number;
    };

    let stars: Star[] = [];
    let shots: Shot[] = [];

    const build = () => {
      const r = parent.getBoundingClientRect();
      const D = Math.min(window.devicePixelRatio || 1, 2);

      W = r.width;
      H = r.height;

      canvas.width = W * D;
      canvas.height = H * D;

      ctx.setTransform(D, 0, 0, D, 0, 0);

      const n = Math.round(Math.min(150, (W * H) / 9000));

      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.25,
        s: Math.random() * 1.6 + 0.4,
        p: Math.random() * 6.28,
      }));
    };

    const spawn = () => {
      const a = 0.32 + Math.random() * 0.2;

      shots.push({
        x: -200,
        y: Math.random() * H * 0.75,
        len: 160 + Math.random() * 200,
        v: 7 + Math.random() * 6,
        a,
        w: 1 + Math.random() * 0.8,
        life: 0,
        hue: Math.random() < 0.5 ? 265 : 290,
      });
    };

    const draw = (t: number) => {
      sx += (mx - sx) * 0.05;
      sy += (my - sy) * 0.05;

      ctx.clearRect(0, 0, W, H);

      const orb = (
        x: number,
        y: number,
        r: number,
        c0: string
      ) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);

        g.addColorStop(0, c0);
        g.addColorStop(1, "rgba(30,10,70,0)");

        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };

      const br = 1 + 0.08 * Math.sin(t * 0.6);

      orb(
        W * 0.5 + sx * 40,
        H * 0.28 + sy * 24,
        Math.max(W, H) * 0.45,
        `rgba(124,58,237,${0.28 * br})`
      );

      orb(
        W * 0.85,
        H * 1.05,
        Math.max(W, H) * 0.5,
        `rgba(192,38,211,${0.22 * br})`
      );

      orb(
        W * 0.1,
        H * 0.9,
        Math.max(W, H) * 0.35,
        "rgba(76,29,149,.3)"
      );

      for (const s of stars) {
        const tw =
          0.35 + 0.65 * Math.abs(Math.sin(t * s.s + s.p));

        ctx.globalAlpha = tw * 0.85;
        ctx.fillStyle = s.r > 1 ? "#e9d5ff" : "#ffffff";

        ctx.beginPath();

        ctx.arc(
          s.x + sx * s.r * 6,
          s.y + sy * s.r * 4,
          s.r,
          0,
          6.283
        );

        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (!reduce) {
        if (
          t > nextShot &&
          shots.length < 3
        ) {
          spawn();

          nextShot =
            t +
            1.6 +
            Math.random() * 2.2;
        }

        shots = shots.filter((s) => {
          s.life++;

          s.x += Math.cos(s.a) * s.v;
          s.y += Math.sin(s.a) * s.v;

          if (s.x - s.len > W + 50) {
            return false;
          }

          const tx =
            s.x -
            Math.cos(s.a) * s.len;

          const ty =
            s.y -
            Math.sin(s.a) * s.len;

          const g = ctx.createLinearGradient(
            tx,
            ty,
            s.x,
            s.y
          );

          g.addColorStop(
            0,
            `hsla(${s.hue},90%,70%,0)`
          );

          g.addColorStop(
            0.7,
            `hsla(${s.hue},90%,72%,.35)`
          );

          g.addColorStop(
            1,
            "rgba(255,255,255,.95)"
          );

          ctx.strokeStyle = g;
          ctx.lineWidth = s.w;
          ctx.lineCap = "round";

          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();

          const h =
            ctx.createRadialGradient(
              s.x,
              s.y,
              0,
              s.x,
              s.y,
              14
            );

          h.addColorStop(
            0,
            "rgba(255,255,255,.9)"
          );

          h.addColorStop(
            0.3,
            `hsla(${s.hue},95%,72%,.5)`
          );

          h.addColorStop(
            1,
            `hsla(${s.hue},95%,65%,0)`
          );

          ctx.fillStyle = h;

          ctx.beginPath();
          ctx.arc(
            s.x,
            s.y,
            14,
            0,
            6.283
          );
          ctx.fill();

          return true;
        });
      }
    };

    const loop = (ms: number) => {
      draw(ms / 1000);

      raf =
        visible && !document.hidden
          ? requestAnimationFrame(loop)
          : 0;
    };

    const start = () => {
      if (
        !raf &&
        !reduce &&
        visible &&
        !document.hidden
      ) {
        raf = requestAnimationFrame(loop);
      }
    };

    build();
    draw(0);
    start();

    const ro = new ResizeObserver(() => {
      build();
      draw(0);
    });

    ro.observe(parent);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;

      if (visible) {
        start();
      }
    });

    io.observe(parent);

    document.addEventListener(
      "visibilitychange",
      start
    );

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();

      mx =
        (e.clientX - r.left) / r.width - 0.5;

      my =
        (e.clientY - r.top) / r.height - 0.5;
    };

    if (fine && !reduce) {
      parent.addEventListener(
        "pointermove",
        onMove
      );
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();

      document.removeEventListener(
        "visibilitychange",
        start
      );

      parent.removeEventListener(
        "pointermove",
        onMove
      );
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(0);

  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      setSolid(y > 24);
      setHidden(
        y > last.current && y > 120
      );

      last.current = y;
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    window.addEventListener(
      "resize",
      onResize
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        onKey
      );

      window.removeEventListener(
        "resize",
        onResize
      );
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <motion.header
        animate={{
          y: hidden && !open ? -110 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: EASE,
        }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + 14px)",
        }}
      >
        <div
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 pl-5 backdrop-blur-xl transition-all duration-300 ${
            solid
              ? "border-violet-400/25 bg-[#0b0716]/80 shadow-[0_10px_40px_rgba(124,58,237,0.25)]"
              : "border-white/10 bg-white/[0.04]"
          }`}
        >
          <a
            href="#"
            className="text-lg font-extrabold tracking-tight text-white"
          >
            Akash
            <span className="text-violet-400">
              Hanif
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV.map((n, i) => (
              <a
                key={n}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(i);
                }}
                className="relative rounded-full px-4 py-2 text-[13px] font-medium text-zinc-200 transition-colors hover:text-white"
              >
                {active === i && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <span className="relative">
                  {n}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                go("booking")
              }
              className="hidden h-10 items-center rounded-full bg-gradient-to-b from-violet-400 to-violet-600 px-5 text-[13px] font-semibold text-white shadow-[0_6px_24px_rgba(139,92,246,0.5)] transition hover:brightness-110 sm:inline-flex"
            >
              Book a call
            </button>

            <button
              type="button"
              className="relative h-11 w-11 md:hidden"
              aria-label={
                open
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() =>
                setOpen((o) => !o)
              }
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-3 right-3 h-0.5 rounded bg-white transition-all duration-300"
                  style={{
                    top: open
                      ? 21
                      : 14 + i * 7,
                    opacity:
                      open && i === 1
                        ? 0
                        : 1,
                    transform: open
                      ? i === 0
                        ? "rotate(45deg)"
                        : i === 2
                        ? "rotate(-45deg)"
                        : "none"
                      : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-7 backdrop-blur-2xl"
            style={{
              background:
                "radial-gradient(120% 60% at 80% 100%, rgba(139,92,246,.35), transparent 60%), rgba(6,4,13,.94)",
              paddingBottom:
                "calc(env(safe-area-inset-bottom, 0px) + 32px)",
            }}
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.li
                  key={n}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.1 + i * 0.07,
                    duration: 0.5,
                    ease: EASE,
                  }}
                >
                  <a
                    href="#"
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`block py-2 text-[clamp(2rem,9vw,2.8rem)] font-bold tracking-tight text-white ${sora.className}`}
                  >
                    {n}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: EASE,
              }}
              onClick={() =>
                go("booking")
              }
              className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-b from-violet-400 to-violet-600 text-base font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.5)]"
            >
              Book a call
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Buttons ---------- */
function MagneticButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const ref =
    useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 200,
    damping: 18,
    mass: 0.4,
  });

  const sy = useSpring(my, {
    stiffness: 200,
    damping: 18,
    mass: 0.4,
  });

  const move = (
    e: RME<HTMLButtonElement>
  ) => {
    const r =
      ref.current?.getBoundingClientRect();

    if (!r) return;

    mx.set(
      (e.clientX -
        r.left -
        r.width / 2) *
        0.25
    );

    my.set(
      (e.clientY -
        r.top -
        r.height / 2) *
        0.25
    );
  };

  return (
    <motion.button
      ref={ref}
      style={{
        x: sx,
        y: sy,
      }}
      onMouseMove={move}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-violet-400 via-violet-500 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_36px_rgba(139,92,246,0.55)] transition-shadow duration-300 hover:shadow-[0_10px_50px_rgba(168,85,247,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
      />

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
      </span>
    </motion.button>
  );
}

function GlassButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-violet-300/30 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition-colors hover:border-violet-300/70 hover:bg-violet-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 sm:w-auto"
    >
      {children}
    </motion.a>
  );
}

/* ---------- Hero ---------- */
export default function HeroSection() {
  const scrollToBooking =
    useCallback(
      () =>
        document
          .getElementById("booking")
          ?.scrollIntoView({
            behavior: "smooth",
          }),
      []
    );

  const item = (d: number) => ({
    initial: {
      opacity: 0,
      y: 24,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    transition: {
      duration: 0.8,
      delay: d,
      ease: EASE,
    },
  });

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col overflow-hidden bg-[#06040d] ${sora.className}`}
      aria-label="Hero"
    >
      <CosmosCanvas />

      {/* vignettes + grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 45%, rgba(6,4,13,.85) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-28 text-center sm:px-6 sm:pt-32">
        {/* social proof */}
        <motion.div
          {...item(0.2)}
          className="mb-7 flex flex-col items-center gap-3"
        >
          <div
            className="flex -space-x-2.5"
            role="list"
            aria-label="Client avatars"
          >
            {AVATARS.map((src, i) => (
              <motion.div
                key={src}
                role="listitem"
                initial={{
                  scale: 0,
                  rotate: -120,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay:
                    0.3 + i * 0.07,
                }}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-violet-400/60 bg-zinc-800 shadow-[0_0_0_2px_#06040d,0_0_14px_rgba(139,92,246,0.45)] sm:h-11 sm:w-11"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Client ${i + 1}`}
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2.5">
            <div
              className="flex items-center gap-0.5"
              role="img"
              aria-label="5 star rating"
            >
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-violet-300 text-violet-300"
                  aria-hidden="true"
                />
              ))}
            </div>

            <span className="text-xs font-medium text-zinc-400 sm:text-[13px]">
              Partnering with growing brands
              to edit content that drives real
              sales.
            </span>
          </div>
        </motion.div>

        {/* headline */}
        <h1 className="mb-6 text-[clamp(2.1rem,7vw,5rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white [text-wrap:balance]">
          {WORDS.map((line, li) => (
            <span
              key={line}
              className="block"
            >
              {line
                .split(" ")
                .map((w, wi) => (
                  <motion.span
                    key={w + wi}
                    initial={{
                      y: 50,
                      opacity: 0,
                      filter:
                        "blur(12px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter:
                        "blur(0px)",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: EASE,
                      delay:
                        0.45 +
                        li * 0.25 +
                        wi * 0.08,
                    }}
                    className={`mr-[0.22em] inline-block last:mr-0 ${
                      li === 1
                        ? "shimmer"
                        : ""
                    }`}
                  >
                    {w}
                  </motion.span>
                ))}
            </span>
          ))}
        </h1>

        <motion.p
          {...item(1.1)}
          className="mx-auto mb-9 max-w-2xl text-[clamp(0.92rem,2.3vw,1.12rem)] leading-relaxed text-zinc-400"
        >
          Helping DTC brands and ecommerce
          teams turn raw footage into
          high-converting UGC ads, VSLs,
          Pixar-style ads, claymation
          Advertisements and scroll-stopping
          social content.
        </motion.p>

        <motion.div
          {...item(1.3)}
          className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <MagneticButton
            onClick={scrollToBooking}
          >
            Book a call
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </MagneticButton>

          <GlassButton href={WHATSAPP}>
            <MessageCircle
              size={16}
              aria-hidden="true"
            />
            WhatsApp Us
          </GlassButton>
        </motion.div>
      </div>

      {/* marquee */}
      <div
        className="relative z-10 w-full overflow-hidden border-y border-violet-300/20 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 py-2.5"
        aria-hidden="true"
      >
        <motion.div
          className={`flex w-max shrink-0 ${bebas.className}`}
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 28,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        >
          {[0, 1].map((k) => (
            <div
              key={k}
              className="flex shrink-0 items-center"
            >
              {MARQUEE.map((m) => (
                <div
                  key={`${m}-${k}`}
                  className="flex shrink-0 items-center"
                >
                  <span className="px-6 text-xl uppercase tracking-[0.08em] text-white md:text-2xl">
                    {m}
                  </span>

                  <span className="h-2 w-2 shrink-0 rotate-45 bg-white/80" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }

          100% {
            background-position: -200% center;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            #a78bfa 0%,
            #f0abfc 35%,
            #c084fc 55%,
            #a78bfa 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .shimmer {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}