"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from "lucide-react";
import { Manrope, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

type CategoryId =
  | "meta-ads"
  | "ai-ugc"
  | "ai-pixar"
  | "claymation";

type Video = {
  id: string;
  title: string;
};

type Category = {
  id: CategoryId;
  label: string;
  badge: string;
  description: string;
  videos: Video[];
};

type ModalState = {
  category: CategoryId;
  index: number;
};

const CATEGORIES: Category[] = [
  {
    id: "meta-ads",
    label: "Meta Ads",
    badge: "Meta Ads",
    description:
      "Direct response Facebook and Instagram creatives built around proven conversion frameworks, compelling hooks, and performance-focused editing.",
    videos: [
      { id: "50Owt_kxxXg", title: "Meta Ad" },
      { id: "fUg0ZgZOnyc", title: "Meta Ad" },
      { id: "G7KfcREU1VQ", title: "Meta Ad" },
      { id: "c7LlzBb1-eo", title: "Meta Ad" },
      { id: "yIzbByLYsig", title: "Meta Ad" },
      { id: "SpPspbPXHDc", title: "Meta Ad" },
      { id: "hGgSnRN0tds", title: "Meta Ad" },
    ],
  },
  {
    id: "ai-ugc",
    label: "AI UGC & UGC",
    badge: "AI UGC",
    description:
      "Authentic AI-generated and UGC-style content designed to look native, relatable, and highly engaging across social platforms.",
    videos: [
      { id: "ejcv1876aNg", title: "UGC" },
      { id: "7vVqH4nsDoM", title: "AI UGC" },
      { id: "s6SoieRCmEs", title: "UGC" },
    ],
  },
  {
    id: "ai-pixar",
    label: "AI Pixar Style",
    badge: "Pixar",
    description:
      "Unique animated advertisements inspired by Pixar-style storytelling that make brands instantly memorable and highly shareable.",
    videos: [
      { id: "UA6IilV7fyU", title: "AI Pixar Style" },
      { id: "dCINneCn-rg", title: "AI Pixar Style" },
      { id: "I4_0tawK7mA", title: "AI Pixar Style" },
      { id: "o9GtYi5sezU", title: "AI Pixar Style" },
      { id: "Ol-i9Y48qls", title: "AI Pixar Style" },
      { id: "fTmjqNj0jyg", title: "AI Pixar Style" },
    ],
  },
  {
    id: "claymation",
    label: "Claymation",
    badge: "Claymation",
    description:
      "Attention-grabbing clay animation creatives that stand out in crowded social feeds and stop the scroll.",
    videos: [
      { id: "KhbNNGZCdS0", title: "AI Claymation" },
      { id: "siLYCr9e5bo", title: "AI Claymation" },
      { id: "iqsAP32Kk1o", title: "AI Claymation" },
    ],
  },
];

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9164F5]";

function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((item) => item.id === id) ?? CATEGORIES[0];
}

function Poster({
  video,
  className = "",
}: {
  video: Video;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const sources = [
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
  ];

  useEffect(() => {
    setIndex(0);
  }, [video.id]);

  const src = sources[index];

  if (!src) {
    return (
      <div
        className={`grid place-items-center bg-[#15121B] ${className}`}
      >
        <Play className="h-10 w-10 text-[#9164F5]" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={`${video.id}-${index}`}
      src={src}
      alt=""
      width={540}
      height={960}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => {
        setIndex((current) =>
          Math.min(current + 1, sources.length)
        );
      }}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth < 200) {
          setIndex((current) =>
            Math.min(current + 1, sources.length)
          );
        }
      }}
      className={className}
    />
  );
}

function VideoCard({
  video,
  badge,
  onOpen,
}: {
  video: Video;
  badge: string;
  onOpen: () => void;
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[rgba(145,100,245,0.2)]
        bg-[#15121B]
        shadow-[inset_0_1px_0_rgba(247,245,250,0.06),0_14px_28px_-14px_rgba(0,0,0,0.85)]
        transition-[transform,border-color]
        duration-500
        hover:-translate-y-1
        hover:border-[rgba(185,160,255,0.5)]
        motion-reduce:transition-none
        motion-reduce:hover:translate-y-0
      "
    >
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Play ${video.title}`}
        className={`block w-full text-left ${FOCUS}`}
      >
        <span className="relative block aspect-[9/16] overflow-hidden bg-[#100D15]">
          <Poster
            video={video}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.035]
              motion-reduce:transition-none
              motion-reduce:group-hover:scale-100
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[rgba(8,7,11,0.25)]
              transition-colors
              duration-300
              group-hover:bg-[rgba(8,7,11,0.12)]
            "
          />

          <span
            className="
              absolute
              left-3
              top-3
              rounded-full
              border
              border-[rgba(145,100,245,0.35)]
              bg-[#08070B]
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#B9A0FF]
            "
          >
            {badge}
          </span>

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                grid
                place-items-center
                rounded-full
                border
                border-[rgba(247,245,250,0.3)]
                bg-[rgba(8,7,11,0.5)]
                p-1.5
                transition-transform
                duration-300
                group-hover:scale-110
                motion-reduce:transition-none
                motion-reduce:group-hover:scale-100
              "
            >
              <span
                className="
                  grid
                  h-14
                  w-14
                  place-items-center
                  rounded-full
                  bg-[#9164F5]
                  text-[#08070B]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_0_#5B36BD,0_12px_24px_-10px_rgba(0,0,0,0.9)]
                  transition-colors
                  duration-300
                  group-hover:bg-[#A27BFF]
                "
              >
                <Play
                  size={23}
                  fill="currentColor"
                  strokeWidth={0}
                  className="ml-1"
                />
              </span>
            </span>
          </span>
        </span>

        <span
          className="
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[rgba(145,100,245,0.18)]
            px-4
            py-4
          "
        >
          <span
            className={`${display.className} truncate text-[15px] font-bold text-[#F7F5FA]`}
          >
            {video.title}
          </span>

          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold text-[#B9A0FF]">
            Watch
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>
      </button>
    </article>
  );
}

function VideoLightbox({
  category,
  index,
  onClose,
  onStep,
}: {
  category: Category;
  index: number;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const video = category.videos[index];

  const count = category.videos.length;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]'
        ) ?? []
      );

      if (elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [onClose, onStep]);

  if (!video) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${category.label}: ${video.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className={`
        ${body.className}
        fixed
        inset-0
        z-[100]
        flex
        flex-col
        bg-[rgba(8,7,11,0.98)]
        px-4
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
        pt-[max(0.75rem,env(safe-area-inset-top))]
        text-[#F7F5FA]
        sm:px-6
      `}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-full border border-[rgba(145,100,245,0.35)] bg-[#15121B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#B9A0FF]">
            {category.badge}
          </span>

          <span
            className={`${display.className} truncate text-[16px] font-bold sm:text-[18px]`}
          >
            {video.title}
          </span>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className={`
            grid
            h-11
            w-11
            shrink-0
            place-items-center
            rounded-full
            border
            border-[rgba(145,100,245,0.35)]
            bg-[#15121B]
            transition-colors
            hover:border-[#B9A0FF]
            ${FOCUS}
          `}
        >
          <X size={21} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          key={video.id}
          className="
            relative
            aspect-[9/16]
            max-h-full
            max-w-full
            overflow-hidden
            rounded-[18px]
            border
            border-[rgba(145,100,245,0.35)]
            bg-[#100D15]
            shadow-[0_25px_70px_rgba(0,0,0,0.9)]
          "
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "100%",
            aspectRatio: "9 / 16",
          }}
        >
          <iframe
            key={video.id}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      {count > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-6 pt-4">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous video"
            className={`
              grid
              h-12
              w-12
              place-items-center
              rounded-full
              border
              border-[rgba(145,100,245,0.35)]
              bg-[#15121B]
              transition-colors
              hover:border-[#B9A0FF]
              ${FOCUS}
            `}
          >
            <ChevronLeft size={22} />
          </button>

          <span
            aria-live="polite"
            className="min-w-[65px] text-center text-[14px] font-bold tabular-nums text-[#AAA5B5]"
          >
            <span className="text-[#F7F5FA]">{index + 1}</span>
            {" / "}
            {count}
          </span>

          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next video"
            className={`
              grid
              h-12
              w-12
              place-items-center
              rounded-full
              border
              border-[rgba(145,100,245,0.35)]
              bg-[#15121B]
              transition-colors
              hover:border-[#B9A0FF]
              ${FOCUS}
            `}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function PortfolioSlider() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>("meta-ads");

  const [modal, setModal] = useState<ModalState | null>(null);

  const [mounted, setMounted] = useState(false);

  const [slide, setSlide] = useState(0);

  const [visibleCount, setVisibleCount] = useState(1);

  const sectionId = useId();

  const viewportRef = useRef<HTMLDivElement>(null);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const triggerRef = useRef<HTMLElement | null>(null);

  const category = getCategory(activeCategory);

  const total = category.videos.length;

  const maxSlide = Math.max(0, total - visibleCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setVisibleCount(4);
      } else if (width >= 1024) {
        setVisibleCount(3);
      } else if (width >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    setSlide((current) => Math.min(current, maxSlide));
  }, [maxSlide]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const slides = viewport.querySelectorAll<HTMLElement>(
        "[data-portfolio-slide]"
      );

      const target = slides[index];

      if (!target) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      viewport.scrollTo({
        left: target.offsetLeft - slides[0].offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });

      setSlide(index);
    },
    []
  );

  const changeCategory = useCallback((id: CategoryId) => {
    setActiveCategory(id);
    setSlide(0);

    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
  }, []);

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (
        !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
          event.key
        )
      ) {
        return;
      }

      event.preventDefault();

      let next = index;

      if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = CATEGORIES.length - 1;
      } else if (event.key === "ArrowRight") {
        next = (index + 1) % CATEGORIES.length;
      } else {
        next =
          (index - 1 + CATEGORIES.length) % CATEGORIES.length;
      }

      changeCategory(CATEGORIES[next].id);

      tabRefs.current[next]?.focus();
    },
    [changeCategory]
  );

  const openVideo = useCallback(
    (index: number) => {
      triggerRef.current =
        document.activeElement as HTMLElement | null;

      setModal({
        category: activeCategory,
        index,
      });
    },
    [activeCategory]
  );

  const closeVideo = useCallback(() => {
    setModal(null);

    window.setTimeout(() => {
      triggerRef.current?.focus({ preventScroll: true });
    }, 0);
  }, []);

  const stepVideo = useCallback((direction: number) => {
    setModal((current) => {
      if (!current) {
        return null;
      }

      const videos = getCategory(current.category).videos;

      const count = videos.length;

      if (count === 0) {
        return current;
      }

      return {
        ...current,
        index: (current.index + direction + count) % count,
      };
    });
  }, []);

  return (
    <section
      id="work"
      aria-labelledby="portfolio-heading"
      className={`
        ${body.className}
        relative
        isolate
        overflow-hidden
        bg-[#08070B]
        px-4
        py-20
        text-[#F7F5FA]
        antialiased
        sm:px-6
        sm:py-28
      `}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-[rgba(145,100,245,0.2)]
              bg-[#15121B]
              px-4
              py-2
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#B9A0FF]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
            Portfolio
          </p>

          <h2
            id="portfolio-heading"
            className={`
              ${display.className}
              text-[clamp(2rem,6vw,3.75rem)]
              font-bold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#F7F5FA]
            `}
          >
            Creative Work That{" "}
            <span className="text-[#9164F5]">
              Stops The Scroll
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-7 text-[#AAA5B5] sm:text-base">
            Explore Meta ads, AI UGC &amp; UGC campaigns,
            VSLs, Pixar-style animations, and Claymation
            creatives: direct-response ads made to capture
            attention and drive action.
          </p>
        </header>

        <nav
          aria-label="Portfolio categories"
          className="mx-auto mt-11 max-w-3xl"
        >
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
          >
            {CATEGORIES.map((item, index) => {
              const active = activeCategory === item.id;

              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`${sectionId}-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`${sectionId}-panel`}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => changeCategory(item.id)}
                  onKeyDown={(event) =>
                    handleTabKeyDown(event, index)
                  }
                  className={`
                    relative
                    min-h-[54px]
                    min-w-0
                    rounded-2xl
                    border
                    px-3
                    py-3.5
                    text-center
                    text-[13px]
                    font-bold
                    transition-[background-color,border-color,color,transform]
                    duration-300
                    sm:text-[14px]
                    ${FOCUS}
                    ${
                      active
                        ? "border-[#9164F5] bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_0_#5B36BD]"
                        : "border-[rgba(145,100,245,0.2)] bg-[#15121B] text-[#AAA5B5] hover:-translate-y-0.5 hover:border-[#B9A0FF] hover:text-[#F7F5FA]"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          id={`${sectionId}-panel`}
          role="tabpanel"
          aria-labelledby={`${sectionId}-tab-${activeCategory}`}
          className="mt-10 sm:mt-12"
        >
          <p className="mx-auto mb-8 min-h-[72px] max-w-xl text-center text-[15px] font-medium leading-7 text-[#AAA5B5] sm:min-h-[56px] sm:text-base">
            {category.description}
          </p>

          <div
            className="
              relative
              rounded-[26px]
              border
              border-[rgba(145,100,245,0.2)]
              bg-[#100D15]
              p-2.5
              shadow-[inset_0_1px_0_rgba(247,245,250,0.05),0_30px_60px_-30px_rgba(0,0,0,0.85)]
              sm:p-4
            "
          >
            <div
              ref={viewportRef}
              onScroll={(event) => {
                const element = event.currentTarget;

                const firstSlide =
                  element.querySelector<HTMLElement>(
                    "[data-portfolio-slide]"
                  );

                if (!firstSlide) {
                  return;
                }

                const secondSlide =
                  firstSlide.nextElementSibling as HTMLElement | null;

                const step = secondSlide
                  ? secondSlide.offsetLeft - firstSlide.offsetLeft
                  : firstSlide.offsetWidth;

                if (step <= 0) {
                  return;
                }

                const current = Math.round(element.scrollLeft / step);

                setSlide(Math.min(Math.max(0, current), maxSlide));
              }}
              className="
                relative
                flex
                snap-x
                snap-mandatory
                gap-4
                overflow-x-auto
                rounded-[18px]
                scroll-smooth
                overscroll-x-contain
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
              aria-label={`${category.label} video showcase`}
            >
              {category.videos.map((video, index) => (
                <div
                  key={`${activeCategory}-${video.id}`}
                  data-portfolio-slide
                  className="
                    min-w-0
                    flex-[0_0_calc(82%-0px)]
                    snap-start
                    py-2
                    sm:flex-[0_0_calc(50%-8px)]
                    lg:flex-[0_0_calc(33.333%-11px)]
                    xl:flex-[0_0_calc(25%-12px)]
                  "
                >
                  <VideoCard
                    video={video}
                    badge={category.badge}
                    onOpen={() => openVideo(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollToSlide(Math.max(0, slide - 1))}
              disabled={slide <= 0}
              aria-label="Previous videos"
              className={`
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-full
                border
                border-[rgba(145,100,245,0.3)]
                bg-[#15121B]
                text-[#F7F5FA]
                transition-colors
                hover:border-[#B9A0FF]
                disabled:cursor-not-allowed
                disabled:opacity-30
                ${FOCUS}
              `}
            >
              <ChevronLeft size={21} />
            </button>

            <div
              role="group"
              aria-label="Portfolio pagination"
              className="flex min-h-6 items-center justify-center"
            >
              {Array.from(
                { length: maxSlide + 1 },
                (_, index) => {
                  const selected = slide === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => scrollToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={
                        selected ? "true" : undefined
                      }
                      className={`
                        group
                        flex
                        h-7
                        items-center
                        justify-center
                        rounded-full
                        px-1
                        ${FOCUS}
                      `}
                    >
                      <span
                        className={`
                          block
                          h-2
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            selected
                              ? "w-8 bg-[#9164F5]"
                              : "w-2 bg-[rgba(170,165,181,0.4)] group-hover:bg-[#B9A0FF]"
                          }
                        `}
                      />
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                scrollToSlide(Math.min(maxSlide, slide + 1))
              }
              disabled={slide >= maxSlide}
              aria-label="Next videos"
              className={`
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-full
                border
                border-[rgba(145,100,245,0.3)]
                bg-[#15121B]
                text-[#F7F5FA]
                transition-colors
                hover:border-[#B9A0FF]
                disabled:cursor-not-allowed
                disabled:opacity-30
                ${FOCUS}
              `}
            >
              <ChevronRight size={21} />
            </button>
          </div>
        </div>
      </div>

      {mounted &&
        modal &&
        createPortal(
          <VideoLightbox
            category={getCategory(modal.category)}
            index={modal.index}
            onClose={closeVideo}
            onStep={stepVideo}
          />,
          document.body
        )}
    </section>
  );
}