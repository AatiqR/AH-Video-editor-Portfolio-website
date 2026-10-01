"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

type Category =
  | "meta-ads"
  | "ai-ugc"
  | "ai-pixar"
  | "claymation";

interface CategoryConfig {
  id: Category;
  label: string;
  badge: string;
  description: string;
  videos: VideoItem[];
}

/* ------------------------------------------------------------------ */
/* Video data                                                         */
/* ------------------------------------------------------------------ */

const PORTFOLIO_SHORTS: VideoItem[] = [
  {
    id: "50Owt_kxxXg",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/50Owt_kxxXg/maxresdefault.jpg",
  },
  {
    id: "fUg0ZgZOnyc",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/fUg0ZgZOnyc/maxresdefault.jpg",
  },
  {
    id: "G7KfcREU1VQ",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/G7KfcREU1VQ/maxresdefault.jpg",
  },
  {
    id: "c7LlzBb1-eo",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/c7LlzBb1-eo/maxresdefault.jpg",
  },
  {
    id: "yIzbByLYsig",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/yIzbByLYsig/maxresdefault.jpg",
  },
  {
    id: "SpPspbPXHDc",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/SpPspbPXHDc/maxresdefault.jpg",
  },
  {
    id: "hGgSnRN0tds",
    title: "Meta Ad",
    thumbnail: "https://img.youtube.com/vi/hGgSnRN0tds/maxresdefault.jpg",
  },
];

const AI_UGC: VideoItem[] = [
  {
    id: "ejcv1876aNg",
    title: "UGC",
    thumbnail: "https://img.youtube.com/vi/ejcv1876aNg/maxresdefault.jpg",
  },
  {
    id: "7vVqH4nsDoM",
    title: "AI UGC",
    thumbnail: "https://img.youtube.com/vi/7vVqH4nsDoM/maxresdefault.jpg",
  },
  {
    id: "s6SoieRCmEs",
    title: "UGC",
    thumbnail: "https://img.youtube.com/vi/s6SoieRCmEs/maxresdefault.jpg",
  },
];

const AI_PIXAR_STYLE: VideoItem[] = [
  {
    id: "UA6IilV7fyU",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/UA6IilV7fyU/maxresdefault.jpg",
  },
  {
    id: "dCINneCn-rg",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/dCINneCn-rg/maxresdefault.jpg",
  },
  {
    id: "I4_0tawK7mA",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/I4_0tawK7mA/maxresdefault.jpg",
  },
  {
    id: "o9GtYi5sezU",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/o9GtYi5sezU/maxresdefault.jpg",
  },
  {
    id: "Ol-i9Y48qls",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/Ol-i9Y48qls/maxresdefault.jpg",
  },
  {
    id: "fTmjqNj0jyg",
    title: "AI Pixar Style",
    thumbnail: "https://img.youtube.com/vi/fTmjqNj0jyg/maxresdefault.jpg",
  },
];

const CLAYMATION: VideoItem[] = [
  {
    id: "KhbNNGZCdS0",
    title: "AI Claymation",
    thumbnail: "https://img.youtube.com/vi/KhbNNGZCdS0/maxresdefault.jpg",
  },
  {
    id: "siLYCr9e5bo",
    title: "AI Claymation",
    thumbnail: "https://img.youtube.com/vi/siLYCr9e5bo/maxresdefault.jpg",
  },
  {
    id: "iqsAP32Kk1o",
    title: "AI Claymation",
    thumbnail: "https://img.youtube.com/vi/iqsAP32Kk1o/maxresdefault.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* Categories                                                         */
/* ------------------------------------------------------------------ */

const CATEGORIES: readonly CategoryConfig[] = [
  {
    id: "meta-ads",
    label: "Meta Ads",
    badge: "Meta Ads",
    description:
      "Direct response Facebook and Instagram creatives built around proven conversion frameworks, compelling hooks, and performance-focused editing.",
    videos: PORTFOLIO_SHORTS,
  },
  {
    id: "ai-ugc",
    label: "AI UGC & UGC",
    badge: "AI UGC",
    description:
      "Authentic AI-generated and UGC-style content designed to look native, relatable, and highly engaging across social platforms.",
    videos: AI_UGC,
  },
  {
    id: "ai-pixar",
    label: "AI Pixar Style",
    badge: "Pixar",
    description:
      "Unique animated advertisements inspired by Pixar-style storytelling that make brands instantly memorable and highly shareable.",
    videos: AI_PIXAR_STYLE,
  },
  {
    id: "claymation",
    label: "Claymation",
    badge: "Claymation",
    description:
      "Attention-grabbing clay animation creatives that stand out in crowded social feeds and stop the scroll.",
    videos: CLAYMATION,
  },
];

/* ------------------------------------------------------------------ */
/* Shared tokens + helpers                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;

const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
} as const;

const BRAND_GRADIENT =
  "bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040d]";

/*
 * Subtle premium starfield.
 * Kept intentionally low-opacity so the section feels darker and more luxurious.
 */
const STARS: CSSProperties = {
  backgroundImage: [
    "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,.28), transparent)",
    "radial-gradient(1px 1px at 28% 72%, rgba(216,180,254,.24), transparent)",
    "radial-gradient(1px 1px at 44% 34%, rgba(255,255,255,.22), transparent)",
    "radial-gradient(1px 1px at 63% 82%, rgba(255,255,255,.20), transparent)",
    "radial-gradient(1px 1px at 78% 22%, rgba(232,121,249,.24), transparent)",
    "radial-gradient(1px 1px at 91% 58%, rgba(255,255,255,.20), transparent)",
    "radial-gradient(1px 1px at 6% 52%, rgba(216,180,254,.20), transparent)",
    "radial-gradient(1px 1px at 55% 10%, rgba(255,255,255,.18), transparent)",
  ].join(","),
};

/*
 * Cursor-follow glow.
 * Uses CSS variables instead of React state, so pointer movement
 * does not cause component re-renders.
 */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;

  const bounds = event.currentTarget.getBoundingClientRect();

  event.currentTarget.style.setProperty(
    "--px",
    `${event.clientX - bounds.left}px`
  );

  event.currentTarget.style.setProperty(
    "--py",
    `${event.clientY - bounds.top}px`
  );
}

const POINTER_DEFAULTS = {
  "--px": "50%",
  "--py": "50%",
} as CSSProperties;

/* ------------------------------------------------------------------ */
/* Video card                                                          */
/* ------------------------------------------------------------------ */

interface VideoCardProps {
  video: VideoItem;
  badge: string;
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onStop: () => void;
}

const VideoCard = memo(function VideoCard({
  video,
  badge,
  isPlaying,
  onPlay,
  onStop,
}: VideoCardProps) {
  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    [video.id]
  );

  return (
    <article
      onPointerMove={trackPointer}
      style={POINTER_DEFAULTS}
      className="
        group relative isolate overflow-hidden
        rounded-[1.6rem]
        border border-violet-300/10
        bg-[#0b0716]/85
        shadow-[0_18px_46px_rgba(0,0,0,0.55),0_0_26px_rgba(124,58,237,0.07)]
        transition-[transform,border-color,box-shadow]
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        md:hover:-translate-y-1.5
        md:hover:scale-[1.015]
        md:hover:border-violet-300/35
        md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.68),0_0_34px_rgba(168,85,247,0.16)]
        motion-reduce:transition-none
        motion-reduce:hover:transform-none
      "
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-[#09070f]">
        {!isPlaying ? (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              width={540}
              height={960}
              loading="lazy"
              decoding="async"
              className="
                h-full w-full object-cover
                transition-transform
                duration-700
                ease-[cubic-bezier(0.16,1,0.3,1)]
                md:group-hover:scale-[1.035]
                motion-reduce:transition-none
              "
              onError={(event) => {
                event.currentTarget.style.opacity = "0";
              }}
            />

            {/* Dark cinematic overlay */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t
                from-[#05040a]/95
                via-[#05040a]/10
                to-[#05040a]/30
              "
            />

            {/* Very subtle hover glow */}
            <div
              className="
                pointer-events-none absolute inset-0
                opacity-0
                transition-opacity duration-500
                md:group-hover:opacity-100
                motion-reduce:hidden
              "
              style={{
                background:
                  "radial-gradient(220px circle at var(--px) var(--py), rgba(192,132,252,0.13), transparent 62%)",
              }}
              aria-hidden="true"
            />

            {/* Category badge */}
            <div
              className="
                absolute left-3 top-3
                rounded-full
                border border-violet-300/20
                bg-[#06040d]/65
                px-2.5 py-1
                backdrop-blur-md
              "
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-violet-200/90">
                {badge}
              </span>
            </div>

            {/* Play button */}
            <button
              type="button"
              onClick={() => onPlay(video.id)}
              aria-label={`Play ${video.title}`}
              className="
                absolute inset-0
                flex items-center justify-center
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-violet-300
              "
            >
              <span
                className="
                  relative flex h-16 w-16 items-center justify-center
                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-110
                  group-active:scale-95
                  motion-reduce:transition-none
                "
              >
                {/* Outer ring */}
                <span
                  className="
                    absolute -inset-2
                    rounded-full
                    border border-violet-300/20
                    transition-all duration-500
                    group-hover:-inset-2.5
                    group-hover:border-fuchsia-300/35
                  "
                />

                {/* Premium play surface */}
                <span
                  className="
                    relative flex h-full w-full
                    items-center justify-center
                    overflow-hidden rounded-full
                    border border-white/20
                    bg-gradient-to-br
                    from-violet-500/85
                    via-purple-500/80
                    to-fuchsia-500/80
                    text-white
                    shadow-[0_0_22px_rgba(168,85,247,0.28),inset_0_1px_0_rgba(255,255,255,0.3)]
                    backdrop-blur-md
                    transition-[filter,box-shadow]
                    duration-300
                    group-hover:brightness-110
                    group-hover:shadow-[0_0_32px_rgba(217,70,239,0.38),inset_0_1px_0_rgba(255,255,255,0.4)]
                  "
                >
                  <span
                    className="
                      pointer-events-none absolute inset-y-0 -left-full
                      w-full -skew-x-12
                      bg-gradient-to-r
                      from-transparent via-white/25 to-transparent
                      transition-transform duration-700
                      ease-out
                      group-hover:translate-x-[250%]
                      motion-reduce:hidden
                    "
                  />

                  <Play
                    className="relative ml-0.5 h-6 w-6"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </button>

            {/* Video title */}
            <footer className="pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-10">
              <p className="line-clamp-2 text-sm font-semibold leading-snug tracking-[-0.01em] text-white">
                {video.title}
              </p>
            </footer>
          </>
        ) : (
          <div className="absolute inset-0 bg-black">
            <iframe
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />

            <button
              type="button"
              onClick={onStop}
              aria-label={`Close ${video.title}`}
              className="
                absolute right-3 top-3 z-10
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-violet-300/30
                bg-[#06040d]/75
                text-white
                backdrop-blur-md
                transition-colors
                hover:border-fuchsia-300
                hover:bg-violet-500/30
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-300
              "
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
});

/* ------------------------------------------------------------------ */
/* Carousel controls                                                   */
/* ------------------------------------------------------------------ */

interface CarouselButtonProps {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}

const CarouselButton = memo(function CarouselButton({
  direction,
  disabled,
  onClick,
}: CarouselButtonProps) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? "Previous video" : "Next video"}
      className={`
        flex h-11 w-11 items-center justify-center
        rounded-full
        border border-violet-300/20
        bg-white/[0.035]
        text-violet-100
        shadow-[0_0_16px_rgba(124,58,237,0.10)]
        backdrop-blur-md
        transition-all
        duration-300
        ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:-translate-y-0.5
        hover:scale-105
        hover:border-violet-300/55
        hover:bg-violet-500/15
        hover:shadow-[0_0_22px_rgba(168,85,247,0.22)]
        active:translate-y-0
        active:scale-95
        disabled:pointer-events-none
        disabled:opacity-25
        motion-reduce:transition-none
        motion-reduce:hover:transform-none
        ${FOCUS_RING}
      `}
    >
      {isPrevious ? (
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
});

/* ------------------------------------------------------------------ */
/* Embla carousel hook                                                 */
/* ------------------------------------------------------------------ */

function usePortfolioCarousel(displayedCategory: Category) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 28,
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateControls(emblaApi);

    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);

    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  useEffect(() => {
    if (!emblaApi) return;

    const frame = window.requestAnimationFrame(() => {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
      updateControls(emblaApi);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [displayedCategory, emblaApi, updateControls]);

  const scrollPrev = useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return {
    emblaRef,
    selectedIndex,
    snapCount,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

const PortfolioSlider: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<Category>("meta-ads");

  const [displayedCategory, setDisplayedCategory] =
    useState<Category>("meta-ads");

  const [isSwitching, setIsSwitching] = useState(false);

  const [activeVideoId, setActiveVideoId] =
    useState<string | null>(null);

  const reducedMotion = useReducedMotion();

  const panelId = useId();

  const tabRefs =
    useRef<Array<HTMLButtonElement | null>>([]);

  const activeConfig = useMemo(
    () =>
      CATEGORIES.find(
        (category) => category.id === activeCategory
      ) ?? CATEGORIES[0]!,
    [activeCategory]
  );

  const displayedConfig = useMemo(
    () =>
      CATEGORIES.find(
        (category) => category.id === displayedCategory
      ) ?? CATEGORIES[0]!,
    [displayedCategory]
  );

  const {
    emblaRef,
    selectedIndex,
    snapCount,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = usePortfolioCarousel(displayedCategory);

  /* -------------------------------------------------------------- */
  /* Category transition                                             */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (activeCategory === displayedCategory) return;

    if (reducedMotion) {
      setDisplayedCategory(activeCategory);
      setIsSwitching(false);
      return;
    }

    setIsSwitching(true);

    const timer = window.setTimeout(() => {
      setDisplayedCategory(activeCategory);
      setIsSwitching(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [
    activeCategory,
    displayedCategory,
    reducedMotion,
  ]);

  const selectCategory = useCallback(
    (category: Category) => {
      // Stop currently playing video when switching categories.
      setActiveVideoId(null);
      setActiveCategory(category);
    },
    []
  );

  const stopVideo = useCallback(
    () => setActiveVideoId(null),
    []
  );

  /* -------------------------------------------------------------- */
  /* Keyboard category navigation                                   */
  /* -------------------------------------------------------------- */

  const handleTabKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      if (
        !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
          event.key
        )
      ) {
        return;
      }

      event.preventDefault();

      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? CATEGORIES.length - 1
            : (index +
                (event.key === "ArrowRight" ? 1 : -1) +
                CATEGORIES.length) %
              CATEGORIES.length;

      selectCategory(CATEGORIES[nextIndex]!.id);

      tabRefs.current[nextIndex]?.focus();
    },
    [selectCategory]
  );

  /* -------------------------------------------------------------- */
  /* Scroll reveal                                                   */
  /* -------------------------------------------------------------- */

  const reveal = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: {
            opacity: 0,
            y: 18,
          },
          whileInView: {
            opacity: 1,
            y: 0,
          },
          viewport: {
            once: true,
            margin: "-60px",
          },
          transition: {
            duration: 0.6,
            ease: EASE,
            delay,
          },
        };

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#06040d]
        px-4 py-20
        text-white
        sm:py-28
      "
      aria-labelledby="portfolio-heading"
    >
      {/* ---------------------------------------------------------- */}
      {/* Background                                                  */}
      {/* ---------------------------------------------------------- */}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Main ambient violet light - deliberately reduced */}
        <div
          className="
            absolute left-1/2 top-[-6rem]
            h-[34rem] w-[58rem]
            max-w-[140vw]
            -translate-x-1/2
            bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.13),transparent_68%)]
          "
        />

        {/* Secondary ambient light - subtle */}
        <div
          className="
            absolute bottom-[-8rem] right-[-6rem]
            h-[26rem] w-[26rem]
            bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.055),transparent_70%)]
          "
        />

        {/* Darker star field */}
        <div
          className="absolute inset-0 opacity-55"
          style={STARS}
        />

        {/* Cinematic vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(6,4,13,0.90)_100%)]
          "
        />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* -------------------------------------------------------- */}
        {/* Header                                                     */}
        {/* -------------------------------------------------------- */}

        <header className="mx-auto max-w-3xl text-center">
          <motion.p
            {...reveal(0)}
            className="
              mx-auto mb-5
              inline-flex items-center gap-2
              rounded-full
              border border-violet-300/15
              bg-white/[0.025]
              px-4 py-1.5
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-violet-200/85
              backdrop-blur-md
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-fuchsia-400/80
                shadow-[0_0_8px_rgba(232,121,249,0.55)]
              "
            />

            Portfolio
          </motion.p>

          <motion.h2
            {...reveal(0.06)}
            id="portfolio-heading"
            className="
              text-4xl
              font-extrabold
              tracking-[-0.055em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Creative Work That{" "}
            <span
              className="
                bg-gradient-to-r
                from-violet-300
                via-fuchsia-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              Stops The Scroll
            </span>
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            className="
              mx-auto mt-6
              max-w-2xl
              text-sm
              leading-7
              text-violet-100/60
              sm:text-base
            "
          >
            Explore Meta ads, AI UGC & UGC campaigns, VSLs,
            Pixar-style animations, and Claymation creatives:
            direct-response ads made to capture attention and
            drive action.
          </motion.p>
        </header>

        {/* -------------------------------------------------------- */}
        {/* Category controls                                          */}
        {/* -------------------------------------------------------- */}

        <nav
          className="mx-auto mt-10 max-w-3xl"
          aria-label="Portfolio categories"
        >
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="
              grid
              grid-cols-2
              gap-2.5
              sm:grid-cols-4
              sm:gap-3
            "
          >
            {CATEGORIES.map((category, index) => {
              const isActive =
                category.id === activeCategory;

              return (
                <motion.div
                  key={category.id}
                  {...reveal(0.18 + index * 0.06)}
                >
                  <button
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`${panelId}-tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-controls={panelId}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() =>
                      selectCategory(category.id)
                    }
                    onKeyDown={(event) =>
                      handleTabKeyDown(event, index)
                    }
                    onPointerMove={trackPointer}
                    style={POINTER_DEFAULTS}
                    className={`
                      group relative w-full min-w-0
                      rounded-2xl
                      border
                      px-4 py-3.5
                      text-left
                      transition-[transform,border-color,background-color]
                      duration-300
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      motion-reduce:transition-none
                      sm:py-4
                      ${FOCUS_RING}

                      ${
                        isActive
                          ? "-translate-y-0.5 border-white/25"
                          : "border-violet-300/12 bg-white/[0.025] hover:-translate-y-0.5 hover:scale-[1.02] hover:border-violet-300/40 hover:bg-violet-500/[0.06] motion-reduce:hover:transform-none"
                      }
                    `}
                  >
                    {/* Active category background */}
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-tab-bg"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : SPRING
                        }
                        className={`
                          absolute inset-0
                          rounded-2xl
                          ${BRAND_GRADIENT}
                          shadow-[0_0_26px_rgba(168,85,247,0.30),inset_0_1px_0_rgba(255,255,255,0.30)]
                        `}
                      >
                        <span
                          className="
                            absolute inset-0
                            overflow-hidden
                            rounded-2xl
                          "
                          aria-hidden="true"
                        >
                          {!reducedMotion && (
                            <motion.span
                              className="
                                absolute inset-y-0 left-0
                                w-1/3
                                -skew-x-12
                                bg-gradient-to-r
                                from-transparent
                                via-white/20
                                to-transparent
                              "
                              animate={{
                                x: ["-120%", "380%"],
                              }}
                              transition={{
                                duration: 1.8,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 3.2,
                              }}
                            />
                          )}
                        </span>
                      </motion.span>
                    )}

                    {/* Hover cursor glow */}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute inset-0
                          rounded-2xl
                          opacity-0
                          transition-opacity duration-300
                          motion-reduce:hidden
                          [@media(hover:hover)]:group-hover:opacity-100
                        "
                        style={{
                          background:
                            "radial-gradient(120px circle at var(--px) var(--py), rgba(192,132,252,0.15), transparent 70%)",
                        }}
                      />
                    )}

                    <span
                      className="
                        pointer-events-none
                        absolute inset-x-5 top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/30
                        to-transparent
                      "
                    />

                    {/* Number intentionally removed */}

                    <span
                      className={`
                        relative block
                        truncate
                        text-sm
                        font-semibold
                        tracking-[0.02em]
                        transition-colors
                        duration-300

                        ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 group-hover:text-white"
                        }
                      `}
                    >
                      {category.label}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="portfolio-tab-indicator"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : SPRING
                        }
                        className="
                          absolute inset-x-5 -bottom-px
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-transparent
                          via-white
                          to-transparent
                          shadow-[0_0_10px_rgba(232,121,249,0.65)]
                        "
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* -------------------------------------------------------- */}
        {/* Showcase                                                   */}
        {/* -------------------------------------------------------- */}

        <motion.div
          {...reveal(0.3)}
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${activeCategory}`}
          className="mt-10 sm:mt-12"
        >
          <p
            className="
              mx-auto mb-7
              min-h-[4.5rem]
              max-w-xl
              text-center
              text-sm
              leading-6
              text-violet-100/50
              sm:mb-8
              sm:min-h-[3rem]
              sm:text-base
            "
          >
            {activeConfig.description}
          </p>

          <motion.div
            initial={false}
            animate={
              isSwitching
                ? {
                    opacity: 0,
                    y: -6,
                    filter: "blur(6px)",
                  }
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: isSwitching ? 0.15 : 0.3,
                    ease: EASE,
                  }
            }
            className="will-change-[opacity,transform]"
          >
            <div
              className="
                relative
                rounded-[2rem]
                border border-violet-300/8
                bg-gradient-to-b
                from-white/[0.035]
                to-white/[0.008]
                p-2.5
                shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_30px_80px_rgba(0,0,0,0.52)]
                sm:p-4
              "
            >
              <div
                ref={emblaRef}
                className="overflow-hidden rounded-[1.5rem]"
              >
                <div
                  className="-ml-4 flex"
                  role="list"
                  aria-label={`${displayedConfig.label} video showcase`}
                >
                  {displayedConfig.videos.map((video) => (
                    <div
                      key={`${displayedCategory}-${video.id}`}
                      role="listitem"
                      className="
                        min-w-0
                        flex-[0_0_82%]
                        py-2 pl-4
                        sm:flex-[0_0_48%]
                        lg:flex-[0_0_33.333%]
                        xl:flex-[0_0_25%]
                      "
                    >
                      <VideoCard
                        video={video}
                        badge={displayedConfig.badge}
                        isPlaying={
                          activeVideoId === video.id
                        }
                        onPlay={setActiveVideoId}
                        onStop={stopVideo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------------ */}
          {/* Carousel controls                                       */}
          {/* ------------------------------------------------------ */}

          <div className="mt-7 flex items-center justify-center gap-5 sm:mt-8">
            <CarouselButton
              direction="previous"
              disabled={!canScrollPrev}
              onClick={scrollPrev}
            />

            <div
              className="flex min-h-3 items-center gap-2"
              role="tablist"
              aria-label={`${displayedConfig.label} video pagination`}
            >
              {Array.from(
                { length: snapCount },
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-label={`Show video group ${
                      index + 1
                    }`}
                    aria-selected={
                      selectedIndex === index
                    }
                    onClick={() => scrollTo(index)}
                    className={`
                      rounded-full
                      transition-all
                      duration-300
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${FOCUS_RING}

                      ${
                        selectedIndex === index
                          ? `
                            h-2.5 w-8
                            ${BRAND_GRADIENT}
                            shadow-[0_0_10px_rgba(192,132,252,0.45)]
                          `
                          : `
                            h-2.5 w-2.5
                            border border-violet-300/15
                            bg-white/10
                            hover:bg-violet-300/30
                            hover:shadow-[0_0_8px_rgba(192,132,252,0.25)]
                          `
                      }
                    `}
                  />
                )
              )}
            </div>

            <CarouselButton
              direction="next"
              disabled={!canScrollNext}
              onClick={scrollNext}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSlider;