"use client";

import { useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import { MotionConfig, motion, type MotionProps } from "framer-motion";
import { Manrope, Space_Grotesk } from "next/font/google";

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const BORDER = "border-[rgba(145,100,245,0.18)]";

/* Client photos: /public/Assets/Clients/client1.webp ... client30.webp (one per review, in order) */
const AVATAR_BASE = "/Assets/Clients";

const reveal = (delay = 0, y = 18): MotionProps => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Marquee CSS: static string, uniquely prefixed, no global selectors. */
/* Two identical copies + translate by -50% = perfectly seamless loop. */
/* ------------------------------------------------------------------ */
const MARQUEE_CSS = `
  .aelr-track {
    animation-duration: var(--aelr-dur, 60s);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: running;
    will-change: transform;
    backface-visibility: hidden;
  }
  .aelr-down { animation-name: aelr-down; }
  .aelr-up { animation-name: aelr-up; }

  @keyframes aelr-down {
    from { transform: translate3d(0, -50%, 0); }
    to { transform: translate3d(0, 0, 0); }
  }
  @keyframes aelr-up {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(0, -50%, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .aelr-track { animation-duration: calc(var(--aelr-dur, 60s) * 2.5); }
  }
`;

/* Soft top/bottom fade in the page color (alpha mask, no colored glow) */
const FADE_MASK =
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)]";

/* ------------------------------------------------------------------ */
/* Data. Review text is preserved exactly as provided.                 */
/* ------------------------------------------------------------------ */
interface RawReview {
  title: string;
  rating: number;
  quote: string;
}

interface Review extends RawReview {
  id: string;
  name: string;
  avatar: string;
}

/* PLACEHOLDER first names: replace with the real reviewers' names when you have them. */
const NAMES: readonly string[] = [
  "Ethan", "Sophia", "Liam", "Olivia", "Noah",
  "Emma", "Lucas", "Ava", "Mason", "Mia",
  "Logan", "Amelia", "Jacob", "Harper", "Elijah",
  "Layla", "Daniel", "Zara", "Henry", "Nora",
  "Owen", "Chloe", "Caleb", "Isla", "Ryan",
  "Leah", "Adrian", "Maya", "Nathan", "Ruby",
];

/* Add more entries (up to 30 or beyond) and everything adapts automatically. */
const RAW_REVIEWS: readonly RawReview[] = [
  {
    title: "Facebook Ads Setup and Management",
    rating: 5.0,
    quote:
      "Great communication, clear plan of action, already seeing results. 5 Stars!",
  },
  {
    title: "Short Form AI Video Creator - Must Speak English",
    rating: 5.0,
    quote: "Great freelancer! Don't hesitate to hire.",
  },
  {
    title: "Video Editor Needed for Ecom Ads & VSLs",
    rating: 5.0,
    quote: "Thanks for your great work",
  },
  {
    title: "Video Editor for Meta Ads, E-commerce Product Video",
    rating: 5.0,
    quote: "Great work, Completed the job well. Would hire again!!!",
  },
  {
    title: "AI Content Creator/Editor",
    rating: 4.5,
    quote:
      "This was our paid test project, and overall, Aakash delivered. What was missing, and why we are closing this contract, is the lack of creativity compared to the price. For that price per video, we would expect a significantly higher level of creativity.",
  },
  {
    title: "I need a 20-30 second marketing video (AI generated)",
    rating: 5.0,
    quote:
      "Aakash is a truly gifted AI video generator who does not stop until you are 100% happy with the result. His commitment to his work is incredibly inspiring to see, only matched by his video generation skills! Will definitely be using his services for any future video generation tasks that we have. Thanks a milion Aakash!!!",
  },
  {
    title: "swellgone.com | create AI product videos",
    rating: 5.0,
    quote: "Great work, Completed the job well.",
  },
  {
    title: "Animation Video for Commercial Handwash Technology",
    rating: 5.0,
    quote: "Great freelancer! Great communication, doing a great job.",
  },
  {
    title: "project 4 - video editing- four visions UGC scripts (no ai)",
    rating: 5.0,
    quote: "Aakash did a great job.",
  },
  {
    title: "Direct Response Video Editor (UGC / AI / Viral Ads)",
    rating: 5.0,
    quote: "Right person for a DTC brands and Aakash doing a great job.",
  },
  {
    title:
      "AI & Video Editor – Meta Ad Creatives – Higgsfield, AI Tools & Traditional Editing",
    rating: 5.0,
    quote:
      "Top rated customer service, very professional, attention to detail, positive feedback, on-time delivery.",
  },
  {
    title: "AI Commercial",
    rating: 5.0,
    quote: "Aakash is great to work with. Communicative and good quality output",
  },
  {
    title: "Ai Video Editor for Meta Ads",
    rating: 5.0,
    quote: "Amazing work.",
  },
  {
    title: "AI UGC Workflow Operator Needed",
    rating: 5.0,
    quote:
      "Aakash was amazing to work with. I plan on working with him again. He is detail oriented, responsive and sticks to his commitments all while providing excellent service.",
  },
  {
    title: "DTC Ad Creative Video Editor - with expertise in AI remixing",
    rating: 4.0,
    quote:
      "The videos produced were good. I would have liked for a bit more of a quality check before presenting to me to catch AI errors misplaced name on product item. Overall, his video output was good.",
  },
];

const REVIEWS: readonly Review[] = RAW_REVIEWS.map((r, i) => ({
  ...r,
  id: String(i + 1),
  name: NAMES[i] ?? `Client ${i + 1}`,
  avatar: `${AVATAR_BASE}/client${i + 1}.webp`,
}));

/* Derived from the data above, never hard-coded */
const AVERAGE = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
).toFixed(2);
const FIVE_STAR = REVIEWS.filter((r) => r.rating === 5).length;

const DIRECTIONS = ["down", "up", "down"] as const;
const OFFSET_FRACTIONS = [0.1, 0.45, 0.75] as const;

const distribute = (items: readonly Review[], columns: number): Review[][] => {
  const out: Review[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    out[i % columns]?.push(item);
  });
  return out;
};

/* Deterministic height estimate (SSR-safe) used to pick loop length and speed */
const estimateHeight = (items: readonly Review[]): number =>
  items.reduce((sum, r) => sum + 230 + Math.ceil(r.quote.length / 40) * 28 + 24, 0);

const SPEED_PX_PER_SECOND = 30;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */
const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5 shrink-0">
            <svg viewBox="0 0 24 24" className="absolute inset-0 h-3.5 w-3.5 fill-[#2A2433]">
              <path d={STAR_PATH} />
            </svg>
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 max-w-none fill-[#B9A0FF]">
                <path d={STAR_PATH} />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Avatar({ src, name, eager }: { src: string; name: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1C1824] ring-1 ring-white/15 ring-offset-2 ring-offset-[#100D15]">
      {failed ? (
        <span className={`${display.className} text-xl text-[#F7F5FA]`}>
          {name.charAt(0)}
        </span>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="64px"
          quality={85}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="object-cover object-center"
        />
      )}
    </span>
  );
}

function ReviewCard({ review, eager }: { review: Review; eager: boolean }) {
  return (
    <figure className="m-0 flex w-full shrink-0 flex-col rounded-3xl bg-[#100D15] p-7 transition-colors duration-300 motion-reduce:transition-none sm:p-8 [@media(hover:hover)]:hover:bg-[#15121B]">
      <div className="flex items-center gap-2">
        <Stars rating={review.rating} />
        <span className={`${display.className} text-xs tracking-[-0.02em] text-[#AAA5B5]`}>
          {review.rating.toFixed(1)}
        </span>
      </div>

      <blockquote className="m-0 mt-4 text-[16px] font-medium leading-[1.7] text-[#F7F5FA] [overflow-wrap:anywhere] sm:text-[17px]">
        {review.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-4">
        <Avatar src={review.avatar} name={review.name} eager={eager} />
        <span className="min-w-0">
          <span className={`${display.className} block text-[17px] leading-[1.2] tracking-[-0.02em] text-[#F7F5FA]`}>
            {review.name}
          </span>
          <span className="mt-1 line-clamp-2 block text-[12px] font-medium leading-[1.45] text-[#AAA5B5] [overflow-wrap:anywhere]">
            {review.title}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

interface MarqueeColumnProps {
  items: readonly Review[];
  direction: "down" | "up";
  offsetFraction: number; // 0..1 head start so columns never line up
  className?: string;
}

function MarqueeColumn({
  items,
  direction,
  offsetFraction,
  className = "",
}: MarqueeColumnProps) {
  /* Repeat items until one group is comfortably taller than the viewport */
  const estimated = Math.max(1, estimateHeight(items));
  const repeats = Math.max(1, Math.ceil(1100 / estimated));
  const group = Array.from({ length: repeats }, () => items).flat();
  const duration = Math.round((estimated * repeats) / SPEED_PX_PER_SECOND);

  const trackStyle = {
    "--aelr-dur": `${duration}s`,
    animationDelay: `-${Math.round(duration * offsetFraction)}s`,
  } as CSSProperties;

  return (
    <div
      className={`group relative h-[640px] overflow-hidden sm:h-[720px] lg:h-[800px] ${FADE_MASK} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`aelr-track ${
          direction === "down" ? "aelr-down" : "aelr-up"
        } flex flex-col [@media(hover:hover)]:group-hover:[animation-play-state:paused]`}
        style={trackStyle}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-6 pb-6">
            {group.map((r, idx) => (
              <ReviewCard
                key={`${copy}-${r.id}-${idx}`}
                review={r}
                eager={copy === 0 && idx < 6}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ClientReviews() {
  const headingId = useId();
  const columns = distribute(REVIEWS, 3);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="results"
        aria-labelledby={headingId}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-28 lg:px-0`}
      >
        <style>{MARQUEE_CSS}</style>

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            {...reveal(0)}
            className={`inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.24em] text-[#B9A0FF] sm:text-xs`}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
            Testimonials
          </motion.p>

          <motion.h2
            {...reveal(0.08)}
            id={headingId}
            className={`${display.className} mt-6 text-[2rem] font-bold leading-[1.05] tracking-[-0.045em] [text-wrap:balance] min-[400px]:text-[2.4rem] sm:text-5xl lg:text-[3.75rem]`}
          >
            Hear from our <span className="text-[#9164F5]">Clients</span>
          </motion.h2>

          <motion.p
            {...reveal(0.16)}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#AAA5B5] sm:text-sm"
          >
            <span>{REVIEWS.length} projects reviewed</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#9164F5]" />
            <span>{AVERAGE} / 5.0 average rating</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#9164F5]" />
            <span>{FIVE_STAR} five-star reviews</span>
          </motion.p>
        </div>

        {/* Screen-reader list: the animated copies are aria-hidden */}
        <ul className="sr-only">
          {REVIEWS.map((r) => (
            <li key={r.id}>
              {r.name}, {r.title}. Rating {r.rating.toFixed(1)} out of 5.0. {r.quote}
            </li>
          ))}
        </ul>

        {/* Marquee area: 90% wide on desktop, 5% blank on each side */}
        <motion.div
          {...reveal(0.2, 24)}
          className="mx-auto mt-12 w-full max-w-xl sm:mt-16 lg:w-[90%] lg:max-w-[1800px]"
        >
          {/* Phones and tablets: one column, bottom to top */}
          <MarqueeColumn
            items={REVIEWS}
            direction="up"
            offsetFraction={0}
            className="lg:hidden"
          />

          {/* Desktop: three columns, down / up / down */}
          <div className="hidden gap-6 lg:grid lg:grid-cols-3 xl:gap-8">
            {columns.map((items, i) => (
              <MarqueeColumn
                key={i}
                items={items}
                direction={DIRECTIONS[i] ?? "down"}
                offsetFraction={OFFSET_FRACTIONS[i] ?? 0}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}