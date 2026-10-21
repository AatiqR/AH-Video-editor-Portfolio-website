"use client";

import { useId, type CSSProperties, type MouseEvent, type ReactElement } from "react";
import {
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
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

/* =========================================================
   Aakash HANIF / Aakash Creative Studio — CONTACT
   ========================================================= */

const whatsappUrl =
  "https://wa.me/923335673693?text=Hi%20Aakash%2C%20I%27d%20like%20to%20discuss%20a%20video%20project.";

const bookingUrl = "https://cal.com/Aakash-creative-studio/30min";

const email = "Aakashhanif.gsc@gmail.com";

const phone = "+92 333 5673693";

/* =========================================================
   CONTENT
   ========================================================= */

const services: ReadonlyArray<string> = [
  "UGC Ads",
  "VSLs",
  "Meta Ads",
  "Pixar-style Ads",
  "Claymation Ads",
  "Social Content",
];

const studioFeatures: ReadonlyArray<string> = [
  "Performance Creative",
  "AI-Powered Production",
  "Social-First Editing",
  "Creative Strategy",
];

const metrics = [
  { value: "1000+", label: "Projects" },
  { value: "2+", label: "Years" },
] as const;

type ContactEntry = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
};

const contacts: ReadonlyArray<ContactEntry> = [
  {
    label: "WhatsApp",
    value: "Message Aakash",
    href: whatsappUrl,
    external: true,
    icon: MessageCircle,
  },
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: phone,
    href: "tel:+923335673693",
    icon: Phone,
  },
  {
    label: "Book a Call",
    value: "30-minute creative call",
    href: bookingUrl,
    external: true,
    icon: CalendarDays,
  },
];

/* =========================================================
   BRAND ICONS
   ========================================================= */

type BrandIcon = () => ReactElement;

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

const LinkedinIcon: BrandIcon = () => (
  <svg {...svgProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: BrandIcon = () => (
  <svg {...svgProps}>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon: BrandIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.965 6.817H1.682l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const socials: ReadonlyArray<{
  label: string;
  handle: string;
  href: string;
  icon: BrandIcon;
}> = [
  {
    label: "Instagram",
    handle: "@Aakasheditslab",
    href: "https://instagram.com/Aakasheditslab",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    handle: "Aakash Hanif",
    href: "https://www.linkedin.com/in/Aakash-hanif-7a7a53289/",
    icon: LinkedinIcon,
  },
  {
    label: "X / Twitter",
    handle: "@Aakashhanif_",
    href: "https://x.com/Aakashhanif_",
    icon: XIcon,
  },
];

/* Optional footer nav. Only real links should be added here. */
const navLinks: ReadonlyArray<{ label: string; href: string }> = [];

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

const BTN =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 motion-reduce:transition-none";

const PRIMARY = `${BTN} bg-[#9164F5] text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_0_#5B36BD,0_10px_20px_-10px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:bg-[#7A4AE6] hover:text-[#F7F5FA] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_3px_0_#4B2AA3,0_14px_24px_-10px_rgba(0,0,0,0.95)] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const SECONDARY = `${BTN} border border-[rgba(145,100,245,0.42)] bg-[#100D15] text-[#F7F5FA] shadow-[inset_0_1px_0_rgba(247,245,250,0.05),0_10px_20px_-12px_rgba(0,0,0,0.9)] hover:-translate-y-px hover:border-[rgba(185,160,255,0.7)] hover:bg-[#15121B] active:translate-y-0 motion-reduce:hover:translate-y-0 ${FOCUS}`;

const ARROW =
  "transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0";

const CARD_SHADOW: CSSProperties = {
  boxShadow: [
    "inset 0 1px 0 rgba(247,245,250,0.06)",
    "inset 0 -1px 0 rgba(0,0,0,0.5)",
    "0 1px 2px rgba(0,0,0,0.6)",
    "0 18px 36px -18px rgba(0,0,0,0.85)",
  ].join(", "),
};

const CARD = `rounded-[24px] border ${BORDER} bg-[#15121B] p-6 sm:p-7`;

/*
 * HYDRATION SAFETY
 * Nothing rendered here depends on the visitor's "reduce motion" setting or
 * any browser-only value. Entrance props are always identical, and
 * <MotionConfig reducedMotion="user"> only changes how they play. Plain CSS
 * differences use Tailwind motion-reduce: variants. matchMedia is read only
 * inside click handlers. The copyright year is the one value that can differ
 * between server and client (around New Year), so it is marked with
 * suppressHydrationWarning.
 */
const reveal = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function MicroLabel({ children }: { children: string }) {
  return (
    <span className="block text-[11px] font-bold uppercase leading-snug tracking-[0.2em] text-[#B9A0FF]">
      {children}
    </span>
  );
}

function CardHeading({
  index,
  label,
  title,
  titleId,
  text,
}: {
  index: string;
  label: string;
  title: string;
  titleId: string;
  text: string;
}) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className={`${display.className} grid h-9 w-9 place-items-center rounded-xl border border-[rgba(145,100,245,0.28)] bg-[#100D15] text-[13px] font-bold leading-none tabular-nums text-[#B9A0FF]`}
        >
          {index}
        </span>
        <MicroLabel>{label}</MicroLabel>
      </div>
      <h3
        id={titleId}
        className={`${display.className} text-[1.6rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#F7F5FA]`}
      >
        {title}
      </h3>
      <p className="mb-6 mt-2 max-w-[19rem] text-[14px] font-medium leading-6 text-[#AAA5B5]">
        {text}
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const headingId = useId();
  const servicesHeadingId = useId();
  const contactHeadingId = useId();

  const year = new Date().getFullYear();

  /* Scroll to #booking if that section exists, otherwise open the booking page.
     The motion preference is read here, inside an event handler, never in render. */
  const handleBook = (event: MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById("booking");
    if (!section) return;
    event.preventDefault();
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    section.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <footer
        id="contact"
        aria-labelledby={headingId}
        className={`${display.variable} ${body.variable} ${body.className} relative isolate overflow-hidden border-t ${BORDER} bg-[#08070B] pb-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-20 text-[#F7F5FA] antialiased sm:px-8 sm:pt-28`}
      >
        {/* Short accent that ties the footer to the sections above it */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-[#9164F5]"
        />

        <div className="mx-auto max-w-[1280px]">
          {/* =================================================
              HERO CTA
              ================================================= */}
          <div className="flex flex-col items-center text-center">
            <motion.p
              {...reveal(0, 14)}
              className={`inline-flex items-center gap-2.5 rounded-full border ${BORDER} bg-[#15121B] px-4 py-2 text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#AAA5B5]`}
            >
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9164F5] opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
              </span>
              Available for select projects
            </motion.p>

            <motion.p
              {...reveal(0.06, 14)}
              className="mt-6 flex items-center gap-3 text-[12px] font-bold uppercase leading-none tracking-[0.26em] text-[#B9A0FF]"
            >
              <span aria-hidden="true" className="h-px w-8 bg-[#B9A0FF]" />
              Aakash Creative Studio
              <span aria-hidden="true" className="h-px w-8 bg-[#B9A0FF]" />
            </motion.p>

            <motion.h2
              {...reveal(0.12)}
              id={headingId}
              className={`${display.className} mt-5 max-w-4xl text-[2.4rem] font-bold leading-[1.04] tracking-[-0.045em] text-[#F7F5FA] [text-wrap:balance] min-[400px]:text-[2.8rem] sm:text-6xl lg:text-7xl`}
            >
              <span className="block">Your next idea deserves</span>
              <span className="block text-[#9164F5]">better creative.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.18)}
              className="mt-6 max-w-2xl text-[15px] font-medium leading-7 text-[#AAA5B5] [text-wrap:balance] sm:text-base sm:leading-8"
            >
              Video editing, performance creative and AI-powered content built
              to make brands impossible to scroll past.
            </motion.p>

            {/* Actions */}
            <motion.div
              {...reveal(0.24)}
              className="mt-9 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center"
            >
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBook}
                className={`${PRIMARY} h-[64px] justify-between gap-4 pl-3 pr-3 text-left sm:justify-center`}
              >
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[rgba(8,7,11,0.16)]"
                >
                  <CalendarDays size={19} />
                </span>
                <span className="flex min-w-0 flex-col sm:min-w-[10.5rem]">
                  <span className="text-[15px] font-bold leading-tight">
                    Book a 30-min Call
                  </span>
                  <span className="mt-1 text-[10.5px] font-bold uppercase leading-none tracking-[0.1em] opacity-70">
                    Let&apos;s talk about your project
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[rgba(8,7,11,0.16)]"
                >
                  <ArrowRight size={18} className={ARROW} />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${SECONDARY} h-[64px] px-6 text-[15px]`}
              >
                <MessageCircle
                  size={19}
                  aria-hidden="true"
                  className="text-[#B9A0FF]"
                />
                Message on WhatsApp
                <ExternalLink
                  size={14}
                  aria-hidden="true"
                  className="opacity-60"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </motion.div>

            {/* Metrics */}
            <motion.div
              {...reveal(0.3, 10)}
              role="group"
              aria-label="Studio experience"
              className="mt-10 flex items-center justify-center"
            >
              {metrics.map((metric, index) => (
                <div key={metric.label} className="flex items-center">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-6 h-8 w-px bg-[rgba(145,100,245,0.3)] sm:mx-8"
                    />
                  )}
                  <div className="flex flex-col-reverse items-center">
                    <span className="mt-1.5 text-[12px] font-bold uppercase leading-none tracking-[0.16em] text-[#AAA5B5]">
                      {metric.label}
                    </span>
                    <strong
                      className={`${display.className} text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-[#F7F5FA]`}
                    >
                      {metric.value.replace("+", "")}
                      {metric.value.endsWith("+") && (
                        <span className="text-[#B9A0FF]">+</span>
                      )}
                    </strong>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================================
              DIVIDER
              ================================================= */}
          <div
            aria-hidden="true"
            className="my-16 flex items-center gap-4 sm:my-20"
          >
            <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
            <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
          </div>

          {/* =================================================
              STUDIO INFORMATION
              ================================================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1.15fr_0.9fr_1fr] xl:gap-5">
            {/* Brand card */}
            <motion.div
              {...reveal(0, 22)}
              style={CARD_SHADOW}
              className={`${CARD} min-w-0 sm:col-span-2 xl:col-span-1`}
            >
              <div className="flex items-center gap-4">
                {/* Brand mark: raised violet slab */}
                <span
                  aria-hidden="true"
                  className={`${display.className} grid h-[4.25rem] w-[4.25rem] shrink-0 select-none place-items-center rounded-[1.1rem] bg-[#9164F5] text-[2rem] font-bold leading-none text-[#08070B] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_0_#5B36BD,0_12px_24px_-10px_rgba(0,0,0,0.9)]`}
                >
                  A
                </span>

                <div className="min-w-0">
                  <MicroLabel>Creative Studio</MicroLabel>
                  <h3
                    className={`${display.className} mt-1.5 text-[1.5rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#F7F5FA]`}
                  >
                    Aakash <span className="text-[#B9A0FF]">Creative Studio</span>
                  </h3>
                  <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#AAA5B5]">
                    Aakash Hanif <span aria-hidden="true">•</span> Video Editor
                    &amp; Creative Strategist
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-[15px] font-medium leading-7 text-[#AAA5B5]">
                Turning raw footage, ideas and offers into high-impact creative
                for modern digital platforms.
              </p>

              <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-2.5 p-0 min-[420px]:grid-cols-2">
                {studioFeatures.map((feature) => (
                  <li
                    key={feature}
                    className={`flex min-h-12 items-center gap-3 rounded-xl border ${BORDER} bg-[#100D15] px-3 py-2.5 text-[13px] font-bold leading-snug text-[#F7F5FA]`}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#9164F5] text-[#08070B]"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t ${BORDER} pt-4 text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-[#AAA5B5]`}
              >
                <span>Aakash Hanif</span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[rgba(145,100,245,0.4)]"
                />
                <span>Aakash Creative Studio</span>
              </div>
            </motion.div>

            {/* Services card */}
            <motion.section
              {...reveal(0.08, 22)}
              aria-labelledby={servicesHeadingId}
              style={CARD_SHADOW}
              className={`${CARD} min-w-0`}
            >
              <CardHeading
                index="01"
                label="What I do"
                title="Services"
                titleId={servicesHeadingId}
                text="Creative built around attention, storytelling and performance."
              />

              <ul className={`m-0 list-none border-t p-0 ${BORDER}`}>
                {services.map((service, index) => (
                  <li
                    key={service}
                    className={`group flex min-h-14 items-center gap-3 border-b px-1 py-2 ${BORDER}`}
                  >
                    <span
                      className={`${display.className} w-7 shrink-0 text-[13px] font-bold leading-none tabular-nums text-[rgba(185,160,255,0.55)] transition-colors duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover:text-[#B9A0FF]`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-bold leading-snug text-[#F7F5FA]">
                      {service}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[rgba(185,160,255,0.55)] transition-[transform,color] duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-1 [@media(hover:hover)]:group-hover:text-[#B9A0FF]"
                    />
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Contact card */}
            <motion.section
              {...reveal(0.16, 22)}
              aria-labelledby={contactHeadingId}
              style={CARD_SHADOW}
              className={`${CARD} min-w-0`}
            >
              <CardHeading
                index="02"
                label="Get in touch"
                title="Contact"
                titleId={contactHeadingId}
                text="Choose the channel that works best for you."
              />

              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {contacts.map(({ label, value, href, external, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`group flex min-h-[3.75rem] items-center gap-3 rounded-2xl border ${BORDER} bg-[#100D15] p-2.5 pr-3.5 transition-[border-color,transform] duration-300 motion-reduce:transition-none [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-[rgba(185,160,255,0.55)] motion-reduce:[@media(hover:hover)]:hover:translate-y-0 ${FOCUS}`}
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgba(145,100,245,0.3)] bg-[#15121B] text-[#B9A0FF] transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none group-hover:border-[#9164F5] group-hover:bg-[#9164F5] group-hover:text-[#08070B]"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-[#AAA5B5]">
                          {label}
                        </span>
                        <span className="mt-1.5 break-words text-[14px] font-bold leading-snug text-[#F7F5FA] [overflow-wrap:anywhere]">
                          {value}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 text-[#B9A0FF] ${ARROW}`}
                      />
                      {external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* =================================================
              SOCIAL
              ================================================= */}
          <motion.div
            {...reveal(0, 14)}
            className={`mt-10 flex flex-col gap-6 border-t pt-8 ${BORDER} lg:flex-row lg:items-center lg:justify-between`}
          >
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(145,100,245,0.3)] bg-[#100D15]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9164F5]" />
              </span>
              <div>
                <MicroLabel>Connect</MicroLabel>
                <p className="mt-1 text-[15px] font-bold leading-none text-[#F7F5FA]">
                  Follow the work
                </p>
              </div>
            </div>

            <nav aria-label="Social profiles" className="min-w-0">
              <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-end">
                {socials.map(({ label, handle, href, icon: Icon }) => (
                  <li key={label} className="min-w-0">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${handle} (opens in a new tab)`}
                      className={`group flex min-h-[3.5rem] items-center gap-3 rounded-2xl border ${BORDER} bg-[#15121B] px-3 py-2 transition-[border-color,transform] duration-300 motion-reduce:transition-none [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-[rgba(185,160,255,0.55)] motion-reduce:[@media(hover:hover)]:hover:translate-y-0 ${FOCUS}`}
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(145,100,245,0.3)] bg-[#100D15] text-[#B9A0FF] transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none group-hover:border-[#9164F5] group-hover:bg-[#9164F5] group-hover:text-[#08070B] [&_svg]:h-[17px] [&_svg]:w-[17px]"
                      >
                        <Icon />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[10.5px] font-bold uppercase leading-none tracking-[0.16em] text-[#AAA5B5]">
                          {label}
                        </span>
                        <span className="mt-1.5 truncate text-[13.5px] font-bold leading-none text-[#F7F5FA]">
                          {handle}
                        </span>
                      </span>
                      <ExternalLink
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-[rgba(185,160,255,0.6)] transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-px group-hover:translate-x-px"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* =================================================
              BOTTOM NAVIGATION
              ================================================= */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {navLinks.length > 0 ? (
              <nav aria-label="Footer">
                <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                  {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className={`inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-bold text-[#AAA5B5] transition-colors duration-300 hover:text-[#F7F5FA] motion-reduce:transition-none ${FOCUS}`}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <span className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#AAA5B5]">
                Video editing • Creative strategy • Performance content
              </span>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`${SECONDARY} h-11 w-full px-5 text-[13px] sm:w-auto`}
            >
              Back to top
              <ArrowUp size={15} aria-hidden="true" className="text-[#B9A0FF]" />
            </button>
          </div>

          {/* =================================================
              CLOSING SIGNATURE
              ================================================= */}
          <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
            <div
              aria-hidden="true"
              className="flex w-full max-w-sm items-center gap-3"
            >
              <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
              <span className="h-1 w-1 rounded-full bg-[#9164F5]" />
              <span className="h-px flex-1 bg-[rgba(145,100,245,0.18)]" />
            </div>

            <p className="m-0 text-[11px] font-bold uppercase leading-relaxed tracking-[0.26em] text-[#B9A0FF]">
              Crafted for attention. Built for impact.
            </p>

            <p className="m-0 text-[12.5px] font-medium leading-relaxed text-[#AAA5B5]">
              ©{" "}
              <span suppressHydrationWarning>{year}</span> Aakash Creative Studio ·
              Aakash Hanif. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}