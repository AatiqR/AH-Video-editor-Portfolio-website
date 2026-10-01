"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

const PROFILE_IMAGE = "/Assets/Akash.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { number: "1000+", label: "Projects Delivered" },
  { number: "100+", label: "Happy Clients" },
  { number: "2+", label: "Years Experience" },
];

const categories = [
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

const stack = [
  { name: "Premiere Pro", note: "Editing" },
  { name: "After Effects", note: "Motion" },
  { name: "HeyGen", note: "AI avatars" },
  { name: "ElevenLabs", note: "AI voice" },
  { name: "Arcads", note: "AI UGC" },
  { name: "Higgsfield.AI", note: "AI video" },
];

const formats = [
  "Performance Ads",
  "Direct Response VSLs",
  "UGC & AI UGC",
  "Meta Ads",
  "AI-Generated Creative",
  "Pixar-Style & Claymation",
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

const simpleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const categoryItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export default function AboutUs() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0, y = 28) => {
    if (reduce) {
      return {
        initial: {
          opacity: 0,
        },
        whileInView: {
          opacity: 1,
        },
        viewport: {
          once: true,
          margin: "-80px",
        },
        transition: {
          duration: 0.4,
          delay,
        },
      };
    }

    return {
      initial: {
        opacity: 0,
        y,
      },
      whileInView: {
        opacity: 1,
        y: 0,
      },
      viewport: {
        once: true,
        margin: "-80px",
      },
      transition: {
        duration: 0.9,
        delay,
        ease: EASE,
      },
    };
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden bg-[#030305] px-4 py-20 text-zinc-300 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-[18%] h-[560px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,40,217,0.16), rgba(109,40,217,0.05) 55%, transparent 80%)",
          }}
        />

        <div
          className="absolute -bottom-40 right-[-10%] h-[480px] w-[min(700px,120vw)] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.09), transparent 75%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 35%, #000 20%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 35%, #000 20%, transparent 72%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(3,3,5,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Main composition */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12 lg:gap-y-12">
          {/* Identity */}
          <motion.header
            {...reveal(0)}
            className="lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-violet-400/60 ${
                    reduce ? "" : "animate-ping"
                  }`}
                />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>

              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
                About · Creative Profile
              </span>

              <span className="h-px w-16 bg-gradient-to-r from-violet-500/50 to-transparent" />
            </div>

            <h2
              id="about-heading"
              className="text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.035em] text-white sm:text-7xl lg:text-[5.5rem]"
            >
              Akash
              <br />
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                Hanif
              </span>
            </h2>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400 sm:text-base">
              <span className="text-zinc-200">Video Editor</span>

              <span className="h-1 w-1 rounded-full bg-violet-500/70" />

              <span className="text-zinc-200">Creative Strategist</span>

              <span className="hidden h-px w-8 bg-zinc-700 sm:block" />

              <span className="text-zinc-500">Aakash Edits Lab</span>
            </p>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Performance-focused video creative for DTC and ecommerce brands,
              from first idea to scroll-stopping ad.
            </p>
          </motion.header>

          {/* Portrait */}
          <motion.div
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 40,
                    scale: 0.97,
                  }
            }
            whileInView={
              reduce
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease: EASE,
            }}
            className="mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:max-w-none lg:self-center"
            style={{
              perspective: 1400,
            }}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Back glass plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-white/[0.05] bg-[#0D0B14]/60 sm:translate-x-6 sm:translate-y-6"
                style={{
                  transform:
                    "translate3d(18px,18px,0) rotateY(-4deg)",
                }}
              />

              {/* Ambient light */}
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(124,58,237,0.28), transparent 75%)",
                }}
              />

              {/* Frame */}
              <div
                className="relative rounded-[2rem] bg-gradient-to-br from-violet-400/40 via-white/[0.06] to-transparent p-px shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                style={{
                  transform: "rotateY(-3deg) rotateX(1.5deg)",
                }}
              >
                <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#0A0A10]">
                  <div className="relative aspect-[4/5] w-full">
                    <img
                      src={PROFILE_IMAGE}
                      alt="Portrait of Akash Hanif, video editor and creative strategist"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      loading="lazy"
                    />

                    {/* Vignette */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.1) 45%, transparent 70%), radial-gradient(ellipse at 100% 0%, rgba(168,85,247,0.22), transparent 55%)",
                      }}
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_-12px_0_40px_-20px_rgba(139,92,246,0.5)]"
                    />
                  </div>

                  {/* Glass nameplate */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        Akash Hanif
                      </p>

                      <p className="truncate text-xs text-zinc-400">
                        Aakash Edits Lab
                      </p>
                    </div>

                    <span className="flex shrink-0 items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[11px] text-violet-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            {...reveal(0.1)}
            className="lg:col-span-7 lg:col-start-1 lg:row-start-2"
          >
            <div className="mb-8 h-px w-full bg-gradient-to-r from-violet-500/40 via-white/10 to-transparent" />

            <div className="max-w-2xl space-y-5 text-base leading-[1.8] text-zinc-400 sm:text-[17px]">
              <p>
                <span className="text-zinc-100">
                  I'm Akash Hanif, a performance-focused video editor and
                  creative strategist.
                </span>{" "}
                Over the past 2+ years and 1000+ projects, I've worked with
                DTC ecommerce brands across a wide range of consumer
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
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Creative formats"
            >
              {formats.map((format) => (
                <li
                  key={format}
                  className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 text-xs text-zinc-400"
                >
                  {format}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats */}
          <motion.dl
            {...reveal(0.15)}
            className="grid grid-cols-3 gap-2 sm:gap-4 lg:col-span-7 lg:col-start-1 lg:row-start-3"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={
                  reduce
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : 0.2 + index * 0.08,
                  ...(reduce ? {} : { ease: EASE }),
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-sm transition-colors duration-500 hover:border-violet-400/30 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />

                <dd className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                  {stat.number}
                </dd>

                <dt className="mt-1 text-[11px] leading-snug text-zinc-500 sm:mt-2 sm:text-sm">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* Categories */}
        <div className="mt-20 sm:mt-28">
          <motion.div
            {...reveal(0)}
            className="mb-8 flex items-end justify-between gap-6"
          >
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-violet-300/70">
                DTC categories
              </p>

              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                Industries I've worked across
              </h3>
            </div>

            <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.04,
                },
              },
            }}
            className="flex flex-wrap gap-2.5 sm:gap-3"
          >
            {categories.map((category) => (
              <motion.li
                key={category}
                variants={
                  reduce
                    ? {
                        hidden: {
                          opacity: 0,
                        },
                        show: {
                          opacity: 1,
                          transition: {
                            duration: 0.4,
                          },
                        },
                      }
                    : categoryItem
                }
                className="group relative cursor-default overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-zinc-300 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/[0.07] hover:text-white sm:px-5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative">{category}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Creative stack */}
        <div className="mt-20 sm:mt-28">
          <motion.div
            {...reveal(0)}
            className="mb-8 flex items-end justify-between gap-6"
          >
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-violet-300/70">
                Tools & technology
              </p>

              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                Creative stack
              </h3>
            </div>

            <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
          </motion.div>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {stack.map((tool, index) => (
              <motion.li
                key={tool.name}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={
                  reduce
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: reduce ? 0 : index * 0.06,
                  ...(reduce ? {} : { ease: EASE }),
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#11101A]/80 to-[#0A0A10]/80 p-4 transition-colors duration-500 hover:border-violet-400/35 sm:p-5"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/0 blur-2xl transition-colors duration-500 group-hover:bg-violet-500/20"
                />

                <p className="relative text-sm font-medium text-zinc-100 sm:text-[15px]">
                  {tool.name}
                </p>

                <p className="relative mt-1 text-xs text-zinc-500">
                  {tool.note}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Philosophy */}
        <motion.figure
          {...reveal(0, 32)}
          className="relative mt-20 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-br from-[#0D0B14] via-[#07070B] to-[#050507] p-7 sm:mt-28 sm:p-12 lg:p-16"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgba(124,58,237,0.16), transparent 75%)",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
          />

          <p className="relative mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-violet-300/70">
            Creative philosophy
          </p>

          <blockquote className="relative max-w-3xl text-xl font-medium leading-snug tracking-tight text-zinc-100 sm:text-3xl lg:text-4xl">
            A good-looking video isn't the goal. The goal is creative that
            communicates fast, holds attention, and performs.
          </blockquote>

          <figcaption className="relative mt-6 text-sm text-zinc-500">
            Akash Hanif, Aakash Edits Lab
          </figcaption>
        </motion.figure>

        {/* Micro CTA */}
        <motion.div
          {...reveal(0, 16)}
          className="mt-14 flex flex-col items-center gap-5 text-center"
        >
          <div
            aria-hidden="true"
            className="h-px w-40 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
          />

          <p className="text-sm tracking-wide text-zinc-400 sm:text-base">
            Built for attention. Edited for action.
          </p>
        </motion.div>
      </div>
    </section>
  );
}