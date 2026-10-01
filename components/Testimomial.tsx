"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"

interface Testimonial {
  name: string
  position: string
  quote: string
  initial: string
  image?: string // Optional image URL
}

/* ------------------------------------------------------------------ */
/* Design tokens — swap these for your Hero's exact values if they differ */
/* ------------------------------------------------------------------ */
const EASE = [0.16, 1, 0.3, 1] as const

const styles = `
  .ts-section {
    --ts-violet: #8b5cf6;
    --ts-purple: #a855f7;
    --ts-fuchsia: #d946ef;
    --ts-lavender: #c4b5fd;
  }

  /* ---------- Marquee ---------- */
  .ts-row { overflow: hidden; padding: 14px 0; }
  .ts-fade {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
            mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
  }
  .ts-track {
    display: flex;
    width: max-content;
    animation-duration: var(--ts-dur, 70s);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
  .ts-track[data-dir="ltr"] { animation-name: ts-ltr; }
  .ts-track[data-dir="rtl"] { animation-name: ts-rtl; }

  /* Each group = cards + trailing gap, so two groups are exactly 2x one group
     and translating by 50% lands on an identical frame (no snap). */
  .ts-group {
    display: flex;
    flex-shrink: 0;
    gap: var(--ts-gap, 20px);
    padding-right: var(--ts-gap, 20px);
  }

  @keyframes ts-ltr { from { transform: translate3d(-50%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
  @keyframes ts-rtl { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } }


  /* ---------- Card ---------- */
  .ts-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 22px;
    background:
      linear-gradient(#0b0b0e, #08080a) padding-box,
      linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(255, 255, 255, 0.06) 45%, rgba(168, 85, 247, 0.28)) border-box;
    box-shadow:
      0 20px 44px -22px rgba(124, 58, 237, 0.5),
      0 2px 0 0 rgba(255, 255, 255, 0.04) inset;
    transform: perspective(900px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ts-card::before { /* soft light reflection, revealed on hover */
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(120% 80% at 0% 0%, rgba(196, 181, 253, 0.16), transparent 55%),
      linear-gradient(115deg, transparent 35%, rgba(217, 70, 239, 0.10) 50%, transparent 65%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .ts-card::after { /* thin top highlight for glass depth */
    content: "";
    position: absolute;
    left: 14%; right: 14%; top: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(221, 214, 254, 0.55), transparent);
  }
  @media (hover: hover) {
    .ts-card:hover {
      transform: perspective(900px) translate3d(0, -6px, 0) rotateX(2deg) rotateY(-1.5deg);
      box-shadow:
        0 28px 50px -20px rgba(139, 92, 246, 0.55),
        0 2px 0 0 rgba(255, 255, 255, 0.06) inset;
    }
    .ts-card:hover::before { opacity: 1; }
    .ts-card:hover .ts-avatar { box-shadow: 0 0 0 1px rgba(196, 181, 253, 0.9), 0 0 18px rgba(168, 85, 247, 0.55); }
  }
  .ts-avatar {
    box-shadow: 0 0 0 1px rgba(167, 139, 250, 0.55);
    transition: box-shadow 0.4s ease;
  }

  /* Reduced motion: keep it moving, just calmer (half speed, no card transitions) */
  @media (prefers-reduced-motion: reduce) {
    .ts-track { animation-duration: calc(var(--ts-dur, 70s) * 2) !important; }
    .ts-card { transition: none; }
  }
`

/* ------------------------------------------------------------------ */
/* Data — names, roles and image paths preserved. Copy refocused on    */
/* the video-editing work, using qualitative language only.            */
/* ------------------------------------------------------------------ */
const rowOneTestimonials: Testimonial[] = [
  {
    name: "Daniel Brooks",
    position: "Real Estate Consultant",
    quote:
      "My listing videos finally hold attention. The opening seconds are sharp and the pacing carries people through the whole walkthrough.",
    initial: "D",
    image: "/Assets/Reviews/user1.jpeg",
  },
  {
    name: "Sarah Mitchell",
    position: "Online Business Coach",
    quote:
      "Every cut has a reason. My short-form videos feel intentional now, and viewers stay with them instead of swiping away.",
    initial: "S",
    image: "/Assets/Reviews/user2.png",
  },
  {
    name: "Anthony Rivera",
    position: "Agency Owner",
    quote:
      "I handed over our client edits and stopped worrying about them. Clean cuts, tidy captions, and the brand look stays consistent.",
    initial: "A",
    image: "/Assets/Reviews/user3.jpeg",
  },
  {
    name: "Melissa Grant",
    position: "Personal Brand Strategist",
    quote:
      "The captions and sound design make my clips feel finished. It's the look I wanted for my social content and couldn't describe.",
    initial: "M",
    image: "/Assets/Reviews/user4.jpeg",
  },
  {
    name: "Kevin Thompson",
    position: "Fitness Program Founder",
    quote:
      "Fast, punchy and easy to follow. The edits keep the energy of my workouts without dragging anywhere.",
    initial: "K",
    image: "/Assets/Reviews/user5.jpeg",
  },
  {
    name: "Nina Patel",
    position: "Marketing Manager",
    quote:
      "Our Meta ad creatives came back with stronger hooks and a clear message. The team noticed the difference right away.",
    initial: "N",
    image: "/Assets/Reviews/user6.jpeg",
  },
  {
    name: "Omar Khalid",
    position: "E-commerce Brand Owner",
    quote:
      "The product ads look sharp and stay true to our brand. Motion graphics are tasteful, never overdone.",
    initial: "O",
    image: "/Assets/Reviews/user7.jpeg",
  },
  {
    name: "Laura Simmons",
    position: "Content Manager",
    quote:
      "Quality stays steady from one project to the next. That reliability makes planning our content calendar so much easier.",
    initial: "L",
    image: "/Assets/Reviews/user8.jpeg",
  },
  {
    name: "Jason Miller",
    position: "Startup Founder",
    quote:
      "Our product video explains the idea in seconds. The story is tight, the visuals are clear, and nothing feels padded.",
    initial: "J",
    image: "/Assets/Reviews/user9.png",
  },
  {
    name: "Emily Rogers",
    position: "Coaching Business Owner",
    quote:
      "My videos now look like my brand. The style is simple, consistent, and easy for my audience to recognise.",
    initial: "E",
    image: "/Assets/Reviews/user10.jpeg",
  },
]

const rowTwoTestimonials: Testimonial[] = [
  {
    name: "Hassan Malik",
    position: "Social Media Consultant",
    quote:
      "Built for social from the first frame. The pacing and hooks suit each platform, and my clients have noticed.",
    initial: "H",
    image: "/Assets/Reviews2/u1.jpeg",
  },
  {
    name: "Rebecca Collins",
    position: "Online Course Creator",
    quote:
      "The VSL flows like a real conversation. It leads viewers toward the offer without feeling pushy.",
    initial: "R",
    image: "/Assets/Reviews2/u2.jpeg",
  },
  {
    name: "Thomas Nguyen",
    position: "Brand Manager",
    quote:
      "Good instincts on rhythm and structure. Our message lands clearly, even in a thirty-second cut.",
    initial: "T",
    image: "/Assets/Reviews2/u3.png",
  },
  {
    name: "Ayesha Rahman",
    position: "Lifestyle Brand Founder",
    quote:
      "The AI UGC ads looked natural and matched my brand's tone. I didn't have to explain the vibe twice.",
    initial: "A",
    image: "/Assets/Reviews2/u4.jpeg",
  },
  {
    name: "Mark Evans",
    position: "Digital Product Seller",
    quote:
      "Every video is shaped around getting the viewer to act. He thinks about the goal, not just the timeline.",
    initial: "M",
    image: "/Assets/Reviews2/u5.jpeg",
  },
  {
    name: "Daniel Foster",
    position: "Entrepreneur, Creative Works",
    quote:
      "The Pixar-style video was a fun surprise. It got people talking and it still carried our message.",
    initial: "D",
    image: "/Assets/Reviews2/u6.png",
  },
  {
    name: "Sophie Taylor",
    position: "Coach, Mindset Academy",
    quote:
      "Timing is spot on. Music, captions and cuts all land together, and the feedback on my content has been lovely.",
    initial: "S",
    image: "/Assets/Reviews2/u7.jpeg",
  },
  {
    name: "Lucas Morgan",
    position: "Marketing Specialist",
    quote:
      "He delivered several ad variations that stayed on brand. That made testing creative much simpler for us.",
    initial: "L",
    image: "/Assets/Reviews2/u8.jpeg",
  },
  {
    name: "Isabella King",
    position: "Content Creator",
    quote:
      "I love how polished everything feels. The edit gives my personality room to come through.",
    initial: "I",
    image: "/Assets/Reviews2/u9.jpeg",
  },
  {
    name: "Ryan Carter",
    position: "Business Coach",
    quote:
      "My social videos look cleaner and more confident. Potential clients comment on how well they're put together.",
    initial: "R",
    image: "/Assets/Reviews2/u10.png",
  },
]

const rowThreeTestimonials: Testimonial[] = [
  {
    name: "Chloe Bennett",
    position: "Entrepreneur, Style Hive",
    quote:
      "The visuals stop the scroll without shouting. Colours, motion and type all feel like they belong together.",
    initial: "C",
    image: "/Assets/Reviews3/u1.jpeg",
  },
  {
    name: "James Walker",
    position: "Founder, Tech Solutions",
    quote:
      "Our tutorials gained clarity and pace. The motion graphics point viewers to what matters.",
    initial: "J",
    image: "/Assets/Reviews3/u2.png",
  },
  {
    name: "Sophia Martinez",
    position: "CEO, Digital Wave",
    quote:
      "The claymation ad was charming and memorable. It gave our brand a personality we hadn't shown before.",
    initial: "S",
    image: "/Assets/Reviews3/u3.jpeg",
  },
  {
    name: "Liam Anderson",
    position: "Freelancer",
    quote:
      "Consistent quality, and you can tell each video was handled with care. It's made my channel feel more established.",
    initial: "L",
    image: "/Assets/Reviews3/u4.jpeg",
  },
  {
    name: "Emma Johansson",
    position: "Founder, Creative Minds",
    quote:
      "Across every platform my videos now share one look. It's made the whole brand feel more cohesive.",
    initial: "E",
    image: "/Assets/Reviews3/u5.jpeg",
  },
]

// Desktop rows (direction + speed + spacing vary slightly for depth)
const ROWS = [
  { items: rowOneTestimonials, dir: "ltr", duration: 75, gap: 20, id: "row1" },
  { items: rowTwoTestimonials, dir: "rtl", duration: 90, gap: 24, id: "row2" },
  { items: rowThreeTestimonials, dir: "ltr", duration: 80, gap: 20, id: "row3" },
] as const

// Mobile: one mixed marquee so every testimonial is represented
const mobileTestimonials: Testimonial[] = (() => {
  const lists = [rowOneTestimonials, rowTwoTestimonials, rowThreeTestimonials]
  const max = Math.max(...lists.map((l) => l.length))
  const out: Testimonial[] = []
  for (let i = 0; i < max; i++) lists.forEach((l) => l[i] && out.push(l[i]))
  return out
})()

/* ------------------------------------------------------------------ */
/* Entrance choreography                                               */
/* ------------------------------------------------------------------ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const glowIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
}
const word: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
}
const headingWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const HEADING_WHITE = ["What", "people", "are"]
const HEADING_GRADIENT = ["saying", "about", "my", "work."]

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function TestimonialSection() {
  const reduce = useReducedMotion()
  const v = (variants: Variants): Variants | undefined => (reduce ? undefined : variants)

  return (
    <>
      <style jsx global>
        {styles}
      </style>

      <motion.section
        id="Reviews"
        aria-labelledby="testimonials-heading"
        className="ts-section relative isolate my-24 overflow-hidden bg-[#050308] py-16 text-white md:py-24"
        variants={v(stagger)}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Ambient lighting (static gradients — no animated blur) */}
        <motion.div
          aria-hidden="true"
          variants={v(glowIn)}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-[-10%] h-[520px] w-[920px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)]" />
          <div className="absolute left-[8%] top-[55%] h-[380px] w-[520px] max-w-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.12),transparent)]" />
          <div className="absolute bottom-[-8%] right-[6%] h-[360px] w-[560px] max-w-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.16),transparent)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050308] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050308] to-transparent" />
        </motion.div>

        {/* Introduction */}
        <div className="mx-auto mb-10 max-w-3xl px-5 text-center md:mb-14">
          <motion.p
            variants={v(rise)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-200"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.9)]" />
            Client experiences
          </motion.p>

          <motion.h2
            id="testimonials-heading"
            variants={v(headingWrap)}
            aria-label="What people are saying about my work."
            className="text-balance text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span aria-hidden="true">
              {HEADING_WHITE.map((w) => (
                <motion.span key={w} variants={v(word)} className="mr-[0.26em] inline-block">
                  {w}
                </motion.span>
              ))}
              {HEADING_GRADIENT.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  variants={v(word)}
                  className="mr-[0.26em] inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text pb-[0.08em] text-transparent [filter:drop-shadow(0_0_22px_rgba(168,85,247,0.35))]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          {/* Decorative accent line */}
          <motion.div
            aria-hidden="true"
            variants={v({
              hidden: { opacity: 0, scaleX: 0 },
              show: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease: EASE } },
            })}
            className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_14px_rgba(217,70,239,0.6)]"
          />

          <motion.p
            variants={v(rise)}
            className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-violet-100/65 sm:text-base"
          >
            Thoughtfully crafted video edits, scroll-stopping creatives, and visuals designed to help brands
            communicate with clarity and confidence.
          </motion.p>
        </div>

        {/* Desktop / tablet: three rows */}
        <div className="hidden md:block" role="region" aria-label="Client testimonials">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.id}
              variants={v({
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay: 0.15 + i * 0.12 } },
              })}
              className={i === 1 ? "md:translate-x-0" : undefined}
            >
              <MarqueeRow items={row.items} dir={row.dir} duration={row.duration} gap={row.gap} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: one left-to-right row */}
        <motion.div
          variants={v(rise)}
          className="md:hidden"
          role="region"
          aria-label="Client testimonials"
        >
          <MarqueeRow items={mobileTestimonials} dir="ltr" duration={150} gap={14} compact />
        </motion.div>
      </motion.section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Seamless marquee row                                                */
/* ------------------------------------------------------------------ */
function MarqueeRow({
  items,
  dir,
  duration,
  gap,
  compact = false,
}: {
  items: Testimonial[]
  dir: "ltr" | "rtl"
  duration: number
  gap: number
  compact?: boolean
}) {
  // Make sure one group is wider than a large screen so the loop never shows a gap
  const repeats = Math.max(1, Math.ceil(7 / items.length))
  const group = Array.from({ length: repeats }, () => items).flat()

  return (
    <div
      className="ts-row ts-fade"
      style={{ touchAction: "pan-y" }}
    >
      <div
        className="ts-track"
        data-dir={dir}
        style={{ ["--ts-dur" as string]: `${duration}s`, ["--ts-gap" as string]: `${gap}px` }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={`ts-group ${copy === 1 ? "ts-dup" : ""}`}
            // Only the first copy is exposed to assistive tech
            aria-hidden={copy === 1 ? true : undefined}
          >
            {group.map((t, idx) => {
              // Repeats inside the first copy are also decorative duplicates
              const isRepeat = copy === 1 || idx >= items.length
              return (
                <TestimonialCard
                  key={`${copy}-${t.name}-${idx}`}
                  testimonial={t}
                  decorative={isRepeat}
                  compact={compact}
                  eager={copy === 0 && idx < 4}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
function TestimonialCard({
  testimonial,
  decorative,
  compact,
  eager,
}: {
  testimonial: Testimonial
  decorative: boolean
  compact: boolean
  eager: boolean
}) {
  const [failed, setFailed] = useState(false)
  const showImage = testimonial.image && !failed

  return (
    <figure
      className={`ts-card flex shrink-0 flex-col justify-between ${
        compact ? "w-[280px] p-4" : "w-[320px] p-5 lg:w-[360px] lg:p-6"
      }`}
      aria-hidden={decorative ? true : undefined}
    >
      <span
        aria-hidden="true"
        className="mb-2 block bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text font-serif text-4xl leading-none text-transparent"
      >
        &ldquo;
      </span>

      <blockquote className="flex-1 text-[14px] leading-relaxed text-white/85 lg:text-[15px]">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-violet-300/10 pt-4">
        <div className="ts-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
          {showImage ? (
            <Image
              src={testimonial.image as string}
              alt={decorative ? "" : `${testimonial.name}'s profile picture`}
              fill
              sizes="48px"
              quality={80}
              loading={eager ? "eager" : "lazy"}
              onError={() => setFailed(true)}
              className="object-cover object-center"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-semibold text-white">
              {testimonial.initial}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-white">{testimonial.name}</p>
          <p className="truncate text-xs text-violet-200/55">{testimonial.position}</p>
        </div>
      </figcaption>
    </figure>
  )
}