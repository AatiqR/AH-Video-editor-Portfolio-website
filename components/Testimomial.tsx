"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { MotionConfig, motion, type MotionProps } from "framer-motion";
import { Manrope, Space_Grotesk } from "next/font/google";

/* ------------------------------------------------------------------ */
/* Fonts + tokens                                                       */
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Avatars live in /public/Reviews/1.webp ... /public/Reviews/30.webp.
   Folder name is case-sensitive on Linux hosts (Vercel): keep "Reviews". */
const AVATAR_BASE = "/Reviews";

const reveal = (delay = 0, y = 18): MotionProps => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Marquee CSS: static string, uniquely prefixed, no global selectors.  */
/* Two identical copies + translate by -50% = perfectly seamless loop.  */
/* Pauses on hover (pointer devices) and while the section is offscreen. */
/* ------------------------------------------------------------------ */
const MARQUEE_CSS = `
  .aelr-track {
    animation-duration: var(--aelr-dur, 80s);
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

  .aelr-root[data-paused="true"] .aelr-track { animation-play-state: paused; }

  @media (hover: hover) {
    .aelr-col:hover .aelr-track { animation-play-state: paused; }
  }

  @media (prefers-reduced-motion: reduce) {
    .aelr-track { animation-duration: calc(var(--aelr-dur, 80s) * 2.5); }
  }
`;

/* Soft top/bottom fade (alpha mask only, no colored glow) */
const FADE_MASK =
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/*                                                                      */
/* Reviews 1-15: real client words, preserved exactly as provided.      */
/* Reviews 16-30: DRAFT placeholders (draft: true). Replace each one    */
/* with the client's real words before launch, and swap the placeholder */
/* first names for the real reviewers' names. The avatar for review N   */
/* is always /Reviews/N.webp, so keep the order matching your photos.   */
/* ------------------------------------------------------------------ */
interface RawReview {
  name: string;
  service: string;
  project: string;
  rating: number;
  quote: string;
  draft?: true;
}

interface Review extends RawReview {
  id: string;
  avatar: string;
}

const RAW_REVIEWS: readonly RawReview[] = [
  /* ---- 1 to 15: real reviews ---- */
  {
    name: "Ethan",
    service: "Meta Ads Management",
    project: "Facebook Ads Setup and Management",
    rating: 5.0,
    quote: "Great communication, clear plan of action, already seeing results. 5 Stars!",
  },
  {
    name: "Sophia",
    service: "AI Short-Form Video",
    project: "Short Form AI Video Creator - Must Speak English",
    rating: 5.0,
    quote: "Great freelancer! Don't hesitate to hire.",
  },
  {
    name: "Liam",
    service: "Ecom Ads & VSL Editing",
    project: "Video Editor Needed for Ecom Ads & VSLs",
    rating: 5.0,
    quote: "Thanks for your great work",
  },
  {
    name: "Olivia",
    service: "Meta Ad Video Editing",
    project: "Video Editor for Meta Ads, E-commerce Product Video",
    rating: 5.0,
    quote: "Great work, Completed the job well. Would hire again!!!",
  },
  {
    name: "Noah",
    service: "AI Content Editing",
    project: "AI Content Creator/Editor",
    rating: 4.5,
    quote:
      "This was our paid test project, and overall, Aakash delivered. What was missing, and why we are closing this contract, is the lack of creativity compared to the price. For that price per video, we would expect a significantly higher level of creativity.",
  },
  {
    name: "Emma",
    service: "AI Marketing Video",
    project: "I need a 20-30 second marketing video (AI generated)",
    rating: 5.0,
    quote:
      "Aakash is a truly gifted AI video generator who does not stop until you are 100% happy with the result. His commitment to his work is incredibly inspiring to see, only matched by his video generation skills! Will definitely be using his services for any future video generation tasks that we have. Thanks a milion Aakash!!!",
  },
  {
    name: "Lucas",
    service: "AI Product Videos",
    project: "swellgone.com | create AI product videos",
    rating: 5.0,
    quote: "Great work, Completed the job well.",
  },
  {
    name: "Ava",
    service: "Commercial Animation",
    project: "Animation Video for Commercial Handwash Technology",
    rating: 5.0,
    quote: "Great freelancer! Great communication, doing a great job.",
  },
  {
    name: "Mason",
    service: "UGC Video Editing",
    project: "project 4 - video editing- four visions UGC scripts (no ai)",
    rating: 5.0,
    quote: "Aakash did a great job.",
  },
  {
    name: "Mia",
    service: "Direct Response Ads",
    project: "Direct Response Video Editor (UGC / AI / Viral Ads)",
    rating: 5.0,
    quote: "Right person for a DTC brands and Aakash doing a great job.",
  },
  {
    name: "Logan",
    service: "Meta Ad Creatives",
    project:
      "AI & Video Editor – Meta Ad Creatives – Higgsfield, AI Tools & Traditional Editing",
    rating: 5.0,
    quote:
      "Top rated customer service, very professional, attention to detail, positive feedback, on-time delivery.",
  },
  {
    name: "Amelia",
    service: "AI Commercial",
    project: "AI Commercial",
    rating: 5.0,
    quote: "Aakash is great to work with. Communicative and good quality output",
  },
  {
    name: "Jacob",
    service: "AI Meta Ad Editing",
    project: "Ai Video Editor for Meta Ads",
    rating: 5.0,
    quote: "Amazing work.",
  },
  {
    name: "Harper",
    service: "AI UGC Workflow",
    project: "AI UGC Workflow Operator Needed",
    rating: 5.0,
    quote:
      "Aakash was amazing to work with. I plan on working with him again. He is detail oriented, responsive and sticks to his commitments all while providing excellent service.",
  },
  {
    name: "Elijah",
    service: "DTC Ad Creatives",
    project: "DTC Ad Creative Video Editor - with expertise in AI remixing",
    rating: 4.0,
    quote:
      "The videos produced were good. I would have liked for a bit more of a quality check before presenting to me to catch AI errors misplaced name on product item. Overall, his video output was good.",
  },

  /* ---- 16 to 30: DRAFT placeholders, replace with real client words ---- */
  {
    name: "Layla",
    service: "YouTube Long-Form Editing",
    project: "Weekly YouTube Editor for a Business Channel",
    rating: 5.0,
    quote:
      "Aakash took over our weekly YouTube edits and the pacing finally feels right. He cuts the dead air without making it feel rushed, and most episodes need one round of notes, not five.",
    draft: true,
  },
  {
    name: "Daniel",
    service: "Podcast Clips & Reels",
    project: "Podcast Clips for Instagram Reels and Shorts",
    rating: 5.0,
    quote:
      "I handed Aakash a long podcast recording and asked for clips people would actually stop scrolling for. He picked moments I would have skipped, and the captions were clean from the first draft.",
    draft: true,
  },
  {
    name: "Zara",
    service: "Motion Graphics",
    project: "Motion Graphics for a SaaS Explainer",
    rating: 5.0,
    quote:
      "The explainer had to make a boring product look simple. Aakash got it straight away. The motion is clean, nothing flashy for the sake of it, and he stayed patient through my annoying amount of tweaks.",
    draft: true,
  },
  {
    name: "Henry",
    service: "VSL Editing",
    project: "VSL Editor for a Coaching Offer",
    rating: 5.0,
    quote:
      "He edited our VSL from a rough script and a folder of b-roll. Aakash knew where to slow down and where to hit harder. Delivered on the day he promised.",
    draft: true,
  },
  {
    name: "Nora",
    service: "Color Grading",
    project: "Color Grade for a Brand Film",
    rating: 4.5,
    quote:
      "Our footage came from two different cameras and it showed. Aakash graded everything so it finally feels like one film. One shot needed a second pass and he fixed it the same day, no fuss.",
    draft: true,
  },
  {
    name: "Owen",
    service: "Subtitles & Captions",
    project: "Captions for a Course Video Library",
    rating: 5.0,
    quote:
      "I needed subtitles on a big backlog of course videos, fast. Aakash was quick, the timing was accurate, and he flagged two spots where the audio was unclear instead of guessing.",
    draft: true,
  },
  {
    name: "Chloe",
    service: "Ecom Product Videos",
    project: "Product Videos for a Skincare Brand",
    rating: 5.0,
    quote:
      "Aakash made our product videos look like they came from a much bigger brand. Great eye for detail. He even caught a typo on our packaging shot before I did.",
    draft: true,
  },
  {
    name: "Caleb",
    service: "Meta Ad Hook Testing",
    project: "Ad Variations for Meta Testing",
    rating: 5.0,
    quote:
      "I asked for several hook variations of one ad to test. Each one actually felt different, not just a swapped first line. Replies were fast and I never had to chase him.",
    draft: true,
  },
  {
    name: "Isla",
    service: "Talking-Head Editing",
    project: "Talking-Head Editor for Founder Content",
    rating: 5.0,
    quote:
      "I hate watching myself on camera and Aakash made it bearable. Tight cuts, good captions, and a style that still sounds like me. We have kept working together since.",
    draft: true,
  },
  {
    name: "Ryan",
    service: "Brand Promo Video",
    project: "Promo Video for a Local Business",
    rating: 5.0,
    quote:
      "Simple brief, but Aakash took it seriously. The promo came back sharp, on brand, and with music that fit. Customers keep mentioning it to us.",
    draft: true,
  },
  {
    name: "Leah",
    service: "AI Video Generation",
    project: "AI Generated Ad for a Product Launch",
    rating: 5.0,
    quote:
      "I wanted a 15 second AI ad for a launch and Aakash kept iterating until the hands and the text looked right. A lot of people skip that step. He did not.",
    draft: true,
  },
  {
    name: "Adrian",
    service: "Webinar & Course Editing",
    project: "Webinar Recording Edit",
    rating: 5.0,
    quote:
      "He turned a two hour webinar recording into something people can actually sit through. Clear chapters, clean audio, and a short highlight cut I could post right away.",
    draft: true,
  },
  {
    name: "Maya",
    service: "UGC Ad Editing",
    project: "UGC Ad Editor for a DTC Brand",
    rating: 5.0,
    quote:
      "Aakash understands what a UGC ad is supposed to feel like. Raw enough to feel real, polished enough to run. I stopped writing long briefs because he just gets it.",
    draft: true,
  },
  {
    name: "Nathan",
    service: "Ongoing Editing Support",
    project: "Monthly Video Editing Support",
    rating: 5.0,
    quote:
      "We have worked with Aakash for months now. He knows our style, hits deadlines, and tells me honestly when an idea will not work. That honesty is rare.",
    draft: true,
  },
  {
    name: "Ruby",
    service: "Shorts Editing",
    project: "YouTube Shorts Editor",
    rating: 5.0,
    quote:
      "Quick turnaround, good taste, and he actually watches the content before cutting it. Aakash is the first editor I have not had to micromanage.",
    draft: true,
  },
];

const clampRating = (n: number): number =>
  Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;

const REVIEWS: readonly Review[] = RAW_REVIEWS.map((r, i) => ({
  ...r,
  rating: clampRating(r.rating),
  id: String(i + 1),
  avatar: `${AVATAR_BASE}/${i + 1}.webp`,
}));

/* Derived from the data above, never hard-coded */
const AVERAGE =
  REVIEWS.length > 0
    ? (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(2)
    : "0.00";
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

const COLUMNS = distribute(REVIEWS, 3);

/* Deterministic height estimate (SSR-safe), used only for loop length and speed */
const estimateHeight = (items: readonly Review[]): number =>
  items.reduce((sum, r) => sum + 280 + Math.ceil(r.quote.length / 44) * 30 + 24, 0);

const SPEED_PX_PER_SECOND = 28;

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */
const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z";

const QUOTE_PATH =
  "M9.6 4C5.4 5.9 3 9.2 3 13.6V20h7.5v-7.2H6.6c.2-2.3 1.5-4 3.9-5.1L9.6 4zm10.5 0c-4.2 1.9-6.6 5.2-6.6 9.6V20H21v-7.2h-3.9c.2-2.3 1.5-4 3.9-5.1L20.1 4z";

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

/* The initial sits underneath the photo, so if a file is missing or slow
   the circle is never empty. The photo covers it as soon as it loads. */
function Avatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1C1824]">
      <span aria-hidden="true" className={`${display.className} text-xl text-[#B9A0FF]`}>
        {name.charAt(0)}
      </span>
      {failed ? null : (
        <Image
          src={src}
          alt=""
          fill
          sizes="64px"
          quality={85}
          loading="lazy"
          onError={() => setFailed(true)}
          className="object-cover object-center"
        />
      )}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative m-0 flex w-full shrink-0 flex-col overflow-hidden rounded-[28px] bg-[#0E0C13] p-7 transition-colors duration-500 motion-reduce:transition-none sm:p-9 [@media(hover:hover)]:hover:bg-[#14111B]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-6 right-7 h-20 w-20 fill-[#9164F5] opacity-[0.07]"
      >
        <path d={QUOTE_PATH} />
      </svg>

      <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-2.5">
          <Stars rating={review.rating} />
          <span className={`${display.className} text-xs tracking-[-0.02em] text-[#AAA5B5]`}>
            {review.rating.toFixed(1)}
          </span>
        </div>
        <span className="max-w-full truncate rounded-full bg-[#1A1622] px-3.5 py-1.5 text-xs font-bold leading-none text-[#B9A0FF]">
          {review.service}
        </span>
      </div>

      <blockquote className="relative m-0 mt-6 text-[16px] font-medium leading-[1.75] text-[#F7F5FA] [overflow-wrap:anywhere] sm:text-[18px]">
        {`\u201C${review.quote}\u201D`}
      </blockquote>

      <figcaption className="relative mt-8 flex items-center gap-4">
        <Avatar src={review.avatar} name={review.name} />
        <span className="min-w-0">
          <span
            className={`${display.className} block text-[18px] leading-[1.2] tracking-[-0.02em] text-[#F7F5FA]`}
          >
            {review.name}
          </span>
          <span className="mt-1 line-clamp-2 block text-[12.5px] font-medium leading-[1.5] text-[#AAA5B5] [overflow-wrap:anywhere]">
            {review.project}
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
  const { group, duration } = useMemo(() => {
    const estimated = Math.max(1, estimateHeight(items));
    const repeats = Math.max(1, Math.ceil(1200 / estimated));
    return {
      group: Array.from({ length: repeats }, () => items).flat(),
      duration: Math.max(20, Math.round((estimated * repeats) / SPEED_PX_PER_SECOND)),
    };
  }, [items]);

  if (items.length === 0) return null;

  const trackStyle = {
    "--aelr-dur": `${duration}s`,
    animationDelay: `-${Math.round(duration * offsetFraction)}s`,
  } as CSSProperties;

  return (
    <div
      className={`aelr-col relative h-[680px] overflow-hidden sm:h-[760px] lg:h-[860px] ${FADE_MASK} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`aelr-track ${direction === "down" ? "aelr-down" : "aelr-up"} flex flex-col`}
        style={trackStyle}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-6 pb-6 xl:gap-8 xl:pb-8">
            {group.map((r, idx) => (
              <ReviewCard key={`${copy}-${r.id}-${idx}`} review={r} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */
export default function ClientReviews() {
  const headingId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  /* Pause the loops while the section is offscreen. If IntersectionObserver
     is unavailable the animation simply keeps running. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1];
        if (last) setVisible(last.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Development reminder so placeholder reviews never ship by accident */
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const drafts = REVIEWS.filter((r) => r.draft).length;
    if (drafts > 0) {
      console.warn(
        `[ClientReviews] ${drafts} review(s) are draft placeholders. Replace them with real client quotes before launch.`,
      );
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={rootRef}
        id="results"
        aria-labelledby={headingId}
        data-paused={visible ? "false" : "true"}
        className={`aelr-root ${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden bg-[#08070B] py-24 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] text-[#F7F5FA] antialiased sm:px-8 sm:py-32 lg:px-0`}
      >
        <style>{MARQUEE_CSS}</style>

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            {...reveal(0)}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#15121B] px-4 py-2 text-xs font-bold leading-none text-[#B9A0FF] sm:text-[13px]"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
            Testimonials
          </motion.p>

          <motion.h2
            {...reveal(0.08)}
            id={headingId}
            className={`${display.className} mt-7 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.045em] [text-wrap:balance] min-[400px]:text-[2.5rem] sm:text-5xl lg:text-[4rem]`}
          >
            Hear from <span className="text-[#9164F5]">Aakash&rsquo;s</span> Clients
          </motion.h2>

          <motion.p
            {...reveal(0.14)}
            className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-[1.7] text-[#AAA5B5] sm:text-base"
          >
            Straight from the brands, founders and creators Aakash has edited, animated
            and produced video for.
          </motion.p>

          <motion.p
            {...reveal(0.2)}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#AAA5B5] sm:text-sm"
          >
            <span>{REVIEWS.length} client reviews</span>
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
              {r.name} on Aakash&rsquo;s {r.service} work ({r.project}). Rating{" "}
              {r.rating.toFixed(1)} out of 5.0. {r.quote}
            </li>
          ))}
        </ul>

        {/* Marquee area: wide on desktop, 3% blank on each side */}
        <motion.div
          {...reveal(0.24, 24)}
          className="mx-auto mt-14 w-full max-w-2xl sm:mt-20 lg:w-[94%] lg:max-w-[1920px]"
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
            {COLUMNS.map((items, i) => (
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