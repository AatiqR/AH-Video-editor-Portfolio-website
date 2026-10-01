"use client";

import { Geist } from "next/font/google";
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
import {
  type CSSProperties,
  type PointerEvent,
  type ReactElement,
  useEffect,
  useRef,
} from "react";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

/* =========================================================
   AKASH HANIF / AAKASH EDITS LAB — CONTACT
   ========================================================= */

const whatsappUrl =
  "https://wa.me/923335673693?text=Hi%20Akash%2C%20I%27d%20like%20to%20discuss%20a%20video%20project.";

const bookingUrl = "https://cal.com/aakash-creative-studio/30min";

const email = "aakashhanif.gsc@gmail.com";

const phone = "+92 333 5673693";

/* =========================================================
   SERVICES
   ========================================================= */

const services: ReadonlyArray<string> = [
  "UGC Ads",
  "VSLs",
  "Meta Ads",
  "Pixar-style Ads",
  "Claymation Ads",
  "Social Content",
];

/* =========================================================
   STUDIO FEATURES
   ========================================================= */

const studioFeatures: ReadonlyArray<string> = [
  "Performance Creative",
  "AI-Powered Production",
  "Social-First Editing",
  "Creative Strategy",
];

/* =========================================================
   METRICS
   ========================================================= */

const metrics = [
  {
    value: "1000+",
    label: "Projects",
  },
  {
    value: "2+",
    label: "Years",
  },
] as const;

/* =========================================================
   CONTACT DATA
   ========================================================= */

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
    value: "Message Akash",
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
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
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
    handle: "@aakasheditslab",
    href: "https://instagram.com/aakasheditslab",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    handle: "Akash Hanif",
    href: "https://www.linkedin.com/in/aakash-hanif-7a7a53289/",
    icon: LinkedinIcon,
  },
  {
    label: "X / Twitter",
    handle: "@aakashhanif_",
    href: "https://x.com/aakashhanif_",
    icon: XIcon,
  },
];

/* =========================================================
   OPTIONAL FOOTER NAV
   Only real links should be added here.
   ========================================================= */

const navLinks: ReadonlyArray<{
  label: string;
  href: string;
}> = [];

/* =========================================================
   TYPES
   ========================================================= */

type Delay = CSSProperties & Record<"--d", string>;

const delay = (ms: number): Delay =>
  ({
    "--d": `${ms}ms`,
  }) as Delay;

type SectionStyle = CSSProperties & {
  "--font-body": string;
};

/* =========================================================
   FOOTER
   ========================================================= */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const year = new Date().getFullYear();

  /* ---------------------------------------------------------
     Intersection reveal
     --------------------------------------------------------- */

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const reveal = () => {
      footer.classList.add("is-revealed");
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      reduceMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------
     Cleanup RAF
     --------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  /* ---------------------------------------------------------
     CTA 3D mouse movement
     --------------------------------------------------------- */

  const handleCtaMove = (
    event: PointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType !== "mouse") return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const px =
      (event.clientX - rect.left) / rect.width;

    const py =
      (event.clientY - rect.top) / rect.height;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      element.style.setProperty(
        "--mx",
        `${(px * 100).toFixed(1)}%`,
      );

      element.style.setProperty(
        "--my",
        `${(py * 100).toFixed(1)}%`,
      );

      element.style.setProperty(
        "--rx",
        `${((0.5 - py) * 5).toFixed(2)}deg`,
      );

      element.style.setProperty(
        "--ry",
        `${((px - 0.5) * 5).toFixed(2)}deg`,
      );
    });
  };

  const handleCtaLeave = (
    event: PointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType !== "mouse") return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const style = event.currentTarget.style;

    style.setProperty("--mx", "50%");
    style.setProperty("--my", "30%");
    style.setProperty("--rx", "0deg");
    style.setProperty("--ry", "0deg");
  };

  /* ---------------------------------------------------------
     Back to top
     --------------------------------------------------------- */

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const sectionStyle: SectionStyle = {
    "--font-body": geist.style.fontFamily,
  };

  return (
    <footer
      ref={footerRef}
      id="Contact"
      aria-labelledby="footer-heading"
      className={`footer ${geist.className}`}
      style={sectionStyle}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
          ===================================================== */}

      <div
        className="background-noise"
        aria-hidden="true"
      />

      <div
        className="bg-glow"
        aria-hidden="true"
      />

      <div
        className="bg-grid"
        aria-hidden="true"
      />

      <div
        className="bg-horizon"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-one"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-two"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-three"
        aria-hidden="true"
      />

      <div
        className="orbit orbit-one"
        aria-hidden="true"
      />

      <div
        className="orbit orbit-two"
        aria-hidden="true"
      />

      <div
        className="floating-chip chip-one"
        aria-hidden="true"
      >
        EDIT
      </div>

      <div
        className="floating-chip chip-two"
        aria-hidden="true"
      >
        CREATE
      </div>

      {/* =====================================================
          MAIN SHELL
          ===================================================== */}

      <div className="shell">

        {/* ===================================================
            HERO CTA
            =================================================== */}

        <section className="hero-cta">
          <div
            className="status-pill reveal"
            style={delay(0)}
          >
            <span className="status-dot" />
            <span>Available for select projects</span>
          </div>

          <p
            className="eyebrow reveal"
            style={delay(70)}
          >
            <span
              className="eyebrow-line"
              aria-hidden="true"
            />

            Aakash Edits Lab

            <span
              className="eyebrow-line reverse"
              aria-hidden="true"
            />
          </p>

          <h2
            id="footer-heading"
            className="headline reveal"
            style={delay(130)}
          >
            <span className="headline-main">
              Your next idea deserves
            </span>

            <span className="headline-gradient">
              better creative.
            </span>
          </h2>

          <p
            className="hero-copy reveal"
            style={delay(200)}
          >
            Video editing, performance creative and
            AI-powered content built to make brands
            impossible to scroll past.
          </p>

          {/* -----------------------------------------------
              PRIMARY ACTIONS
              ----------------------------------------------- */}

          <div
            className="hero-actions reveal"
            style={delay(280)}
          >
            <div className="cta-wrap">
              <div
                className="cta-glow"
                aria-hidden="true"
              />

              <a
                className="primary-cta"
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handleCtaMove}
                onPointerLeave={handleCtaLeave}
              >
                <span
                  className="cta-sheen"
                  aria-hidden="true"
                />

                <span
                  className="cta-light"
                  aria-hidden="true"
                />

                <span className="cta-icon">
                  <CalendarDays />
                </span>

                <span className="cta-content">
                  <strong>Book a 30-min Call</strong>
                  <small>Let's talk about your project</small>
                </span>

                <span
                  className="cta-arrow"
                  aria-hidden="true"
                >
                  <ArrowRight />
                </span>

                <span className="visually-hidden">
                  {" "}
                  (opens in a new tab)
                </span>
              </a>
            </div>

            <a
              className="secondary-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />

              <span>Message on WhatsApp</span>

              <ExternalLink
                aria-hidden="true"
                className="secondary-external"
              />

              <span className="visually-hidden">
                {" "}
                (opens in a new tab)
              </span>
            </a>
          </div>

          {/* -----------------------------------------------
              METRICS
              ----------------------------------------------- */}

          <div
            className="metrics reveal"
            style={delay(360)}
            aria-label="Studio experience"
          >
            {metrics.map((metric, index) => (
              <div
                className="metric"
                key={metric.label}
              >
                <strong>{metric.value}</strong>

                <span>{metric.label}</span>

                {index < metrics.length - 1 ? (
                  <span
                    className="metric-divider"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            DIVIDER
            =================================================== */}

        <div
          className="cinematic-divider"
          aria-hidden="true"
        >
          <span />
          <i />
          <span />
        </div>

        {/* ===================================================
            STUDIO INFORMATION
            =================================================== */}

        <section className="studio-grid">

          {/* -----------------------------------------------
              BRAND CARD
              ----------------------------------------------- */}

          <div
            className="brand-card glass-card reveal"
            style={delay(0)}
          >
            <div className="card-glow" />

            <div className="brand-top">
              <div className="brand-mark">
                <div className="brand-mark-back">
                  A
                </div>

                <div className="brand-mark-front">
                  A
                </div>

                <span className="brand-mark-light" />
              </div>

              <div className="brand-heading">
                <span className="micro-label">
                  CREATIVE STUDIO
                </span>

                <h3>
                  Aakash
                  <span> Edits Lab</span>
                </h3>

                <p>
                  Akash Hanif
                  <span> • </span>
                  Video Editor &amp; Creative Strategist
                </p>
              </div>
            </div>

            <p className="brand-description">
              Turning raw footage, ideas and offers into
              high-impact creative for modern digital
              platforms.
            </p>

            <div className="feature-grid">
              {studioFeatures.map((feature) => (
                <div
                  className="feature"
                  key={feature}
                >
                  <span className="feature-check">
                    <Check aria-hidden="true" />
                  </span>

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="brand-footer">
              <span>AKASH HANIF</span>

              <span
                className="brand-footer-line"
                aria-hidden="true"
              />

              <span>AAKASH EDITS LAB</span>
            </div>
          </div>

          {/* -----------------------------------------------
              SERVICES CARD
              ----------------------------------------------- */}

          <section
            className="services-card glass-card reveal"
            style={delay(100)}
            aria-labelledby="services-heading"
          >
            <div className="card-topline">
              <span className="section-index">
                01
              </span>

              <span className="micro-label">
                WHAT I DO
              </span>
            </div>

            <div className="section-heading">
              <h3 id="services-heading">
                Services
              </h3>

              <p>
                Creative built around attention,
                storytelling and performance.
              </p>
            </div>

            <ul className="service-list">
              {services.map((service, index) => (
                <li
                  key={service}
                  className="service-item"
                >
                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="service-name">
                    {service}
                  </span>

                  <ArrowRight
                    aria-hidden="true"
                    className="service-arrow"
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* -----------------------------------------------
              CONTACT CARD
              ----------------------------------------------- */}

          <section
            className="contact-card glass-card reveal"
            style={delay(180)}
            aria-labelledby="contact-heading"
          >
            <div className="card-topline">
              <span className="section-index">
                02
              </span>

              <span className="micro-label">
                GET IN TOUCH
              </span>
            </div>

            <div className="section-heading">
              <h3 id="contact-heading">
                Contact
              </h3>

              <p>
                Choose the channel that works best for
                you.
              </p>
            </div>

            <ul className="contact-list">
              {contacts.map(
                ({
                  label,
                  value,
                  href,
                  external,
                  icon: Icon,
                }) => (
                  <li key={label}>
                    <a
                      className="contact-item"
                      href={href}
                      {...(external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      <span className="contact-icon">
                        <Icon aria-hidden="true" />
                      </span>

                      <span className="contact-copy">
                        <span className="contact-label">
                          {label}
                        </span>

                        <span className="contact-value">
                          {value}
                        </span>
                      </span>

                      <ArrowRight
                        aria-hidden="true"
                        className="contact-arrow"
                      />

                      {external ? (
                        <span className="visually-hidden">
                          {" "}
                          (opens in a new tab)
                        </span>
                      ) : null}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </section>
        </section>

        {/* ===================================================
            SOCIAL / FOOTER UTILITY
            =================================================== */}

        <section
          className="utility reveal"
          style={delay(240)}
        >
          <div className="social-intro">
            <span className="social-orbit">
              <span />
            </span>

            <div>
              <span className="micro-label">
                CONNECT
              </span>

              <p>
                Follow the work
              </p>
            </div>
          </div>

          <nav
            aria-label="Social profiles"
            className="social-navigation"
          >
            <ul className="social-list">
              {socials.map(
                ({
                  label,
                  handle,
                  href,
                  icon: Icon,
                }) => (
                  <li key={label}>
                    <a
                      className="social-card"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${handle} (opens in a new tab)`}
                    >
                      <span className="social-icon">
                        <Icon />
                      </span>

                      <span className="social-copy">
                        <span className="social-label">
                          {label}
                        </span>

                        <span className="social-handle">
                          {handle}
                        </span>
                      </span>

                      <ExternalLink
                        aria-hidden="true"
                        className="social-external"
                      />
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </section>

        {/* ===================================================
            OPTIONAL NAV + BACK TO TOP
            =================================================== */}

        <div className="bottom-navigation">
          {navLinks.length > 0 ? (
            <nav
              aria-label="Footer"
              className="footer-nav"
            >
              <ul>
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <span className="bottom-note">
              Video editing • Creative strategy •
              Performance content
            </span>
          )}

          <button
            type="button"
            className="to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>

            <ArrowUp aria-hidden="true" />
          </button>
        </div>

        {/* ===================================================
            CLOSING SIGNATURE
            =================================================== */}

        <div className="closing">
          <div
            className="closing-line"
            aria-hidden="true"
          >
            <span />
            <i />
            <span />
          </div>

          <p className="signature">
            Crafted for attention. Built for impact.
          </p>

          <p className="copyright">
            © {year} Aakash Edits Lab · Akash Hanif.
            All rights reserved.
          </p>
        </div>
      </div>

      {/* =====================================================
          STYLES
          ===================================================== */}

      <style jsx>{`
        /* ===================================================
           CORE
           =================================================== */

        .footer {
          --black: #030305;
          --black-soft: #07070c;
          --surface: rgba(255, 255, 255, 0.045);
          --surface-strong: rgba(255, 255, 255, 0.065);

          --violet: #6d28d9;
          --violet-bright: #7c3aed;
          --purple: #a855f7;
          --fuchsia: #d946ef;
          --lavender: #c4b5fd;

          --white: #ffffff;
          --text: #f4f3fa;
          --muted: #9b9aad;
          --muted-strong: #c7c5d5;

          --border: rgba(255, 255, 255, 0.1);
          --border-purple: rgba(168, 85, 247, 0.28);

          --ease: cubic-bezier(0.16, 1, 0.3, 1);

          position: relative;
          isolation: isolate;
          overflow: clip;

          padding:
            clamp(5rem, 9vw, 9rem)
            clamp(1rem, 4vw, 4rem)
            2rem;

          color: var(--white);
          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(109, 40, 217, 0.12),
              transparent 38%
            ),
            var(--black);

          font-family: var(--font-body);
        }

        .shell {
          position: relative;
          z-index: 5;
          width: min(100%, 90rem);
          margin: 0 auto;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }

        /* ===================================================
           ATMOSPHERE
           =================================================== */

        .background-noise {
          position: absolute;
          inset: 0;
          z-index: -10;
          pointer-events: none;
          opacity: 0.035;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
        }

        .bg-glow {
          position: absolute;
          inset: 0;
          z-index: -8;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse 60% 34% at 50% 12%,
              rgba(124, 58, 237, 0.24),
              transparent 72%
            ),
            radial-gradient(
              ellipse 30% 28% at 92% 54%,
              rgba(217, 70, 239, 0.11),
              transparent 72%
            ),
            radial-gradient(
              ellipse 32% 28% at 2% 72%,
              rgba(109, 40, 217, 0.12),
              transparent 72%
            );
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          z-index: -7;
          pointer-events: none;
          opacity: 0.42;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.022) 1px,
              transparent 1px
            );

          background-size: 4.5rem 4.5rem;

          mask-image:
            radial-gradient(
              ellipse 70% 60% at 50% 30%,
              #000 0%,
              transparent 78%
            );
          -webkit-mask-image:
            radial-gradient(
              ellipse 70% 60% at 50% 30%,
              #000 0%,
              transparent 78%
            );
        }

        .bg-horizon {
          position: absolute;
          top: 31rem;
          left: 50%;
          z-index: -6;

          width: min(100rem, 140%);
          height: 1px;

          transform: translateX(-50%);

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(168, 85, 247, 0.55),
              rgba(217, 70, 239, 0.45),
              rgba(168, 85, 247, 0.55),
              transparent
            );

          box-shadow:
            0 0 45px 7px rgba(124, 58, 237, 0.2);
        }

        .ambient {
          position: absolute;
          z-index: -5;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(0.2px);
        }

        .ambient-one {
          top: 5%;
          right: 5%;

          width: clamp(5rem, 8vw, 8rem);
          aspect-ratio: 1;

          background:
            radial-gradient(
              circle at 30% 28%,
              rgba(255, 255, 255, 0.5),
              rgba(196, 181, 253, 0.25) 17%,
              rgba(109, 40, 217, 0.32) 48%,
              rgba(5, 5, 9, 0.95) 80%
            );

          box-shadow:
            0 0 70px rgba(124, 58, 237, 0.35),
            inset 0 0 24px rgba(217, 70, 239, 0.2);

          animation: float 16s ease-in-out infinite;
        }

        .ambient-two {
          left: -4rem;
          top: 48%;

          width: 10rem;
          aspect-ratio: 1;

          border: 1px solid rgba(168, 85, 247, 0.2);

          box-shadow:
            0 0 40px rgba(124, 58, 237, 0.1),
            inset 0 0 30px rgba(124, 58, 237, 0.06);

          transform: rotateX(68deg);
          animation: ring-drift 28s linear infinite;
        }

        .ambient-three {
          right: 4%;
          bottom: 18%;

          width: 4rem;
          aspect-ratio: 1;

          background:
            linear-gradient(
              145deg,
              rgba(217, 70, 239, 0.35),
              rgba(109, 40, 217, 0.08)
            );

          border: 1px solid rgba(196, 181, 253, 0.2);

          animation: float 20s ease-in-out -6s infinite;
        }

        .orbit {
          position: absolute;
          z-index: -4;
          pointer-events: none;
          border: 1px solid rgba(168, 85, 247, 0.12);
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        .orbit-one {
          top: 10%;
          right: -9rem;

          width: 28rem;
          height: 12rem;

          transform: rotate(-20deg);
          box-shadow: 0 0 50px rgba(109, 40, 217, 0.06);
        }

        .orbit-two {
          bottom: 7%;
          left: -12rem;

          width: 30rem;
          height: 14rem;

          transform: rotate(25deg);
        }

        .floating-chip {
          position: absolute;
          z-index: -3;

          padding: 0.45rem 0.75rem;

          border: 1px solid rgba(196, 181, 253, 0.14);
          border-radius: 999px;

          color: rgba(196, 181, 253, 0.42);

          background: rgba(10, 7, 18, 0.45);

          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.22em;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          transform: rotate(-8deg);
        }

        .chip-one {
          top: 25%;
          right: 3%;
        }

        .chip-two {
          bottom: 28%;
          left: 3%;
          transform: rotate(7deg);
        }

        /* ===================================================
           REVEAL
           =================================================== */

        .reveal {
          opacity: 0;
          transform: translate3d(0, 24px, 0);

          transition:
            opacity 0.95s var(--d, 0ms) var(--ease),
            transform 0.95s var(--d, 0ms) var(--ease);
        }

        .is-revealed .reveal {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ===================================================
           HERO CTA
           =================================================== */

        .hero-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;

          margin-bottom: 1.5rem;
          padding: 0.5rem 0.85rem;

          border: 1px solid rgba(168, 85, 247, 0.25);
          border-radius: 999px;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.07),
              rgba(255, 255, 255, 0.025)
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 30px rgba(124, 58, 237, 0.08);

          color: #c8c5d7;

          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .status-dot {
          width: 0.4rem;
          height: 0.4rem;

          border-radius: 50%;

          background: #d946ef;

          box-shadow:
            0 0 0 4px rgba(217, 70, 239, 0.1),
            0 0 14px rgba(217, 70, 239, 0.9);

          animation: pulse-dot 2.5s ease-in-out infinite;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;

          margin: 0 0 1.5rem;

          color: var(--lavender);

          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .eyebrow-line {
          width: 2.2rem;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--fuchsia)
            );

          box-shadow:
            0 0 12px rgba(217, 70, 239, 0.45);
        }

        .eyebrow-line.reverse {
          background:
            linear-gradient(
              90deg,
              var(--fuchsia),
              transparent
            );
        }

        .headline {
          max-width: 65rem;
          margin: 0;

          font-weight: 650;
          letter-spacing: -0.065em;
          line-height: 0.95;
        }

        .headline-main {
          display: block;

          font-size: clamp(
            2.65rem,
            7vw,
            6.8rem
          );
        }

        .headline-gradient {
          display: block;

          margin-top: 0.12em;

          font-size: clamp(
            2.65rem,
            7vw,
            6.8rem
          );

          background:
            linear-gradient(
              100deg,
              #ffffff 0%,
              #e9ddff 23%,
              #a855f7 58%,
              #d946ef 100%
            );

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          filter:
            drop-shadow(
              0 0 28px rgba(168, 85, 247, 0.24)
            );
        }

        .hero-copy {
          max-width: 43rem;

          margin:
            clamp(1.5rem, 3vw, 2.2rem)
            0
            0;

          color: var(--muted);

          font-size: clamp(
            0.98rem,
            1.35vw,
            1.12rem
          );

          line-height: 1.75;
          text-wrap: balance;
        }

        /* ===================================================
           HERO ACTIONS
           =================================================== */

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.8rem;

          width: 100%;

          margin-top: clamp(
            2rem,
            4vw,
            3.2rem
          );
        }

        .cta-wrap {
          position: relative;
          display: inline-flex;
        }

        .cta-glow {
          position: absolute;
          inset: 12% -10%;

          border-radius: 999px;

          background:
            radial-gradient(
              ellipse,
              rgba(168, 85, 247, 0.55),
              rgba(217, 70, 239, 0.18) 42%,
              transparent 72%
            );

          filter: blur(22px);

          pointer-events: none;
        }

        .primary-cta {
          --mx: 50%;
          --my: 30%;
          --rx: 0deg;
          --ry: 0deg;

          position: relative;

          display: inline-flex;
          align-items: center;

          gap: 0.85rem;

          min-height: 4.35rem;

          padding:
            0.75rem
            0.9rem
            0.75rem
            0.85rem;

          overflow: hidden;

          border: 1px solid
            rgba(217, 70, 239, 0.58);

          border-radius: 1.35rem;

          color: #fff;
          text-decoration: none;

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.15),
              rgba(255, 255, 255, 0) 45%
            ),
            linear-gradient(
              135deg,
              #5b21b6 0%,
              #7c3aed 52%,
              #a21caf 100%
            );

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.45),
            inset 0 -3px 0
              rgba(46, 16, 101, 0.55),
            0 18px 38px
              rgba(76, 29, 149, 0.42),
            0 0 42px
              rgba(124, 58, 237, 0.28);

          transition:
            transform 0.5s var(--ease),
            box-shadow 0.5s var(--ease),
            filter 0.5s ease;
        }

        .cta-icon {
          position: relative;
          z-index: 3;

          display: grid;
          place-items: center;

          width: 2.8rem;
          height: 2.8rem;

          border: 1px solid
            rgba(255, 255, 255, 0.23);

          border-radius: 0.95rem;

          background:
            rgba(255, 255, 255, 0.12);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.25);
        }

        .cta-icon :global(svg) {
          width: 1.1rem;
          height: 1.1rem;
        }

        .cta-content {
          position: relative;
          z-index: 3;

          display: flex;
          flex-direction: column;

          min-width: 10.5rem;

          text-align: left;
        }

        .cta-content strong {
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .cta-content small {
          margin-top: 0.16rem;

          color: rgba(255, 255, 255, 0.7);

          font-size: 0.63rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cta-arrow {
          position: relative;
          z-index: 3;

          display: grid;
          place-items: center;

          width: 2.8rem;
          height: 2.8rem;

          border: 1px solid
            rgba(255, 255, 255, 0.28);

          border-radius: 0.95rem;

          background:
            rgba(255, 255, 255, 0.13);

          transition:
            transform 0.5s var(--ease);
        }

        .cta-arrow :global(svg) {
          width: 1.1rem;
          height: 1.1rem;
        }

        .cta-light {
          position: absolute;
          inset: 0;
          z-index: 2;

          pointer-events: none;

          opacity: 0;

          background:
            radial-gradient(
              180px circle at var(--mx) var(--my),
              rgba(255, 255, 255, 0.3),
              transparent 66%
            );

          transition: opacity 0.45s ease;
        }

        .cta-sheen {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1;

          width: 35%;

          pointer-events: none;

          background:
            linear-gradient(
              105deg,
              transparent,
              rgba(255, 255, 255, 0.24),
              transparent
            );

          transform:
            translate3d(-180%, 0, 0)
            skewX(-18deg);

          animation:
            sheen 8s var(--ease) 2s infinite;
        }

        .secondary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;

          min-height: 4.35rem;

          padding:
            0 1.25rem;

          border: 1px solid
            rgba(255, 255, 255, 0.1);

          border-radius: 1.35rem;

          color: #dddbea;

          background:
            rgba(255, 255, 255, 0.035);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.07);

          font-size: 0.86rem;
          font-weight: 600;

          text-decoration: none;

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          transition:
            transform 0.45s var(--ease),
            border-color 0.45s ease,
            background 0.45s ease,
            color 0.3s ease;
        }

        .secondary-cta :global(svg:first-child) {
          width: 1.15rem;
          height: 1.15rem;
          color: #d8b4fe;
        }

        .secondary-external {
          width: 0.82rem;
          height: 0.82rem;

          opacity: 0.45;
        }

        /* ===================================================
           METRICS
           =================================================== */

        .metrics {
          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: 2.8rem;
        }

        .metric {
          position: relative;

          display: flex;
          align-items: baseline;
          gap: 0.5rem;

          padding: 0 1.4rem;
        }

        .metric strong {
          font-size: 1.05rem;
          font-weight: 750;
          letter-spacing: -0.03em;

          background:
            linear-gradient(
              100deg,
              #fff,
              #c4b5fd,
              #d946ef
            );

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;
        }

        .metric span:not(.metric-divider) {
          color: #77788c;

          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .metric-divider {
          position: absolute;
          top: 50%;
          right: 0;

          width: 1px;
          height: 1.2rem;

          transform: translateY(-50%);

          background:
            linear-gradient(
              transparent,
              rgba(196, 181, 253, 0.35),
              transparent
            );
        }

        /* ===================================================
           DIVIDER
           =================================================== */

        .cinematic-divider {
          display: flex;
          align-items: center;
          gap: 0.7rem;

          margin:
            clamp(4rem, 8vw, 7rem)
            0
            clamp(3rem, 6vw, 5rem);
        }

        .cinematic-divider span {
          flex: 1;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(168, 85, 247, 0.4)
            );
        }

        .cinematic-divider span:last-of-type {
          background:
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.4),
              transparent
            );
        }

        .cinematic-divider i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 0 0 4px rgba(168, 85, 247, 0.08),
            0 0 18px 4px rgba(217, 70, 239, 0.65);

          animation: divider-pulse 3s ease-in-out infinite;
        }

        /* ===================================================
           GLASS CARD SYSTEM
           =================================================== */

        .studio-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1.15fr)
            minmax(0, 0.9fr)
            minmax(0, 1fr);

          gap: 1rem;
        }

        .glass-card {
          position: relative;

          overflow: hidden;

          min-width: 0;

          padding: clamp(1.25rem, 2.5vw, 1.7rem);

          border:
            1px solid var(--border);

          border-radius: 1.5rem;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.065),
              rgba(255, 255, 255, 0.018)
            );

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.08),
            inset 0 -1px 0
              rgba(0, 0, 0, 0.25),
            0 24px 60px
              rgba(0, 0, 0, 0.28);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          transition:
            transform 0.6s var(--ease),
            border-color 0.5s ease,
            box-shadow 0.6s var(--ease);
        }

        .card-glow {
          position: absolute;
          top: -6rem;
          right: -5rem;

          width: 14rem;
          height: 14rem;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(168, 85, 247, 0.17),
              transparent 68%
            );

          filter: blur(10px);

          pointer-events: none;
        }

        .brand-card {
          background:
            radial-gradient(
              ellipse at 85% 0%,
              rgba(168, 85, 247, 0.11),
              transparent 42%
            ),
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.07),
              rgba(255, 255, 255, 0.018)
            );
        }

        /* ===================================================
           BRAND
           =================================================== */

        .brand-top {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand-mark {
          position: relative;

          flex: none;

          width: 4.3rem;
          height: 4.3rem;

          perspective: 700px;
        }

        .brand-mark-back,
        .brand-mark-front {
          position: absolute;
          inset: 0;

          display: grid;
          place-items: center;

          border-radius: 1.2rem;

          font-size: 2rem;
          font-weight: 750;

          line-height: 1;

          user-select: none;
        }

        .brand-mark-back {
          transform:
            translate3d(4px, 5px, -10px);

          background:
            linear-gradient(
              145deg,
              #2b0b5e,
              #0d041e
            );

          border:
            1px solid rgba(109, 40, 217, 0.35);
        }

        .brand-mark-front {
          z-index: 2;

          color: #fff;

          background:
            linear-gradient(
              150deg,
              rgba(255, 255, 255, 0.2),
              transparent 40%
            ),
            linear-gradient(
              145deg,
              rgba(168, 85, 247, 0.5),
              rgba(14, 4, 34, 0.95)
            );

          border:
            1px solid rgba(217, 70, 239, 0.5);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.42),
            inset 0 -10px 18px
              rgba(46, 16, 101, 0.58),
            0 0 35px
              rgba(124, 58, 237, 0.32);

          transform:
            rotateX(8deg)
            rotateY(-10deg);

          text-shadow:
            0 0 20px
              rgba(217, 70, 239, 0.8);

          animation:
            mark-float 10s ease-in-out infinite;
        }

        .brand-mark-light {
          position: absolute;
          top: 0.55rem;
          left: 0.65rem;
          z-index: 4;

          width: 1.3rem;
          height: 0.35rem;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.6),
              transparent
            );

          transform: rotate(-35deg);
          filter: blur(1px);
        }

        .brand-heading {
          min-width: 0;
        }

        .micro-label {
          display: block;

          color: #8d8ba0;

          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .brand-heading h3 {
          margin: 0.25rem 0 0;

          color: #fff;

          font-size: clamp(
            1.35rem,
            2vw,
            1.65rem
          );

          font-weight: 700;
          letter-spacing: -0.045em;
        }

        .brand-heading h3 span {
          color: #b88cff;
        }

        .brand-heading p {
          margin: 0.32rem 0 0;

          color: #8f8da1;

          font-size: 0.72rem;
          line-height: 1.45;
        }

        .brand-heading p span {
          color: #6f6e80;
        }

        .brand-description {
          position: relative;
          z-index: 2;

          max-width: 32rem;

          margin:
            1.65rem 0
            1.4rem;

          color: var(--muted);

          font-size: 0.91rem;
          line-height: 1.7;
        }

        .feature-grid {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 0.55rem;
        }

        .feature {
          display: flex;
          align-items: center;

          gap: 0.55rem;

          min-height: 2.7rem;

          padding:
            0.55rem
            0.65rem;

          border:
            1px solid
            rgba(196, 181, 253, 0.1);

          border-radius: 0.85rem;

          background:
            rgba(255, 255, 255, 0.025);

          color: #c7c5d5;

          font-size: 0.7rem;
          font-weight: 550;
          line-height: 1.25;
        }

        .feature-check {
          display: grid;
          place-items: center;

          flex: none;

          width: 1.25rem;
          height: 1.25rem;

          border-radius: 0.42rem;

          background:
            linear-gradient(
              145deg,
              rgba(168, 85, 247, 0.32),
              rgba(217, 70, 239, 0.1)
            );

          border:
            1px solid
            rgba(168, 85, 247, 0.28);

          color: #d8b4fe;
        }

        .feature-check :global(svg) {
          width: 0.7rem;
          height: 0.7rem;
        }

        .brand-footer {
          display: flex;
          align-items: center;
          gap: 0.6rem;

          margin-top: 1.5rem;
          padding-top: 1rem;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.07);

          color: #626174;

          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .brand-footer-line {
          width: 2rem;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.5),
              rgba(217, 70, 239, 0.1)
            );
        }

        /* ===================================================
           SECTION HEADINGS
           =================================================== */

        .card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 1.4rem;
        }

        .section-index {
          display: grid;
          place-items: center;

          width: 2rem;
          height: 2rem;

          border:
            1px solid
            rgba(168, 85, 247, 0.18);

          border-radius: 0.7rem;

          color: #9c8ac4;

          background:
            rgba(168, 85, 247, 0.07);

          font-size: 0.58rem;
          font-weight: 700;
        }

        .section-heading {
          position: relative;
          z-index: 2;
        }

        .section-heading h3 {
          margin: 0;

          color: #fff;

          font-size: 1.35rem;
          font-weight: 680;

          letter-spacing: -0.045em;
        }

        .section-heading p {
          max-width: 17rem;

          margin: 0.4rem 0 1.35rem;

          color: #777689;

          font-size: 0.75rem;
          line-height: 1.6;
        }

        /* ===================================================
           SERVICES
           =================================================== */

        .service-list {
          position: relative;
          z-index: 2;

          margin: 0;
          padding: 0;

          list-style: none;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.07);
        }

        .service-item {
          position: relative;

          display: flex;
          align-items: center;

          gap: 0.75rem;

          min-height: 3.35rem;

          padding: 0.5rem 0.2rem;

          border-bottom:
            1px solid
            rgba(255, 255, 255, 0.07);

          color: #c7c5d5;

          transition:
            padding 0.5s var(--ease),
            color 0.35s ease;
        }

        .service-item::before {
          content: "";

          position: absolute;
          inset: 0;

          z-index: -1;

          border-radius: 0.7rem;

          background:
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.11),
              transparent
            );

          opacity: 0;

          transition: opacity 0.4s ease;
        }

        .service-number {
          width: 1.65rem;

          color: #555466;

          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;

          transition: color 0.35s ease;
        }

        .service-name {
          flex: 1;

          font-size: 0.78rem;
          font-weight: 570;

          transition:
            transform 0.5s var(--ease),
            color 0.35s ease;
        }

        .service-arrow {
          width: 0.95rem;
          height: 0.95rem;

          color: #77708d;

          opacity: 0.55;

          transition:
            transform 0.5s var(--ease),
            color 0.35s ease,
            opacity 0.35s ease;
        }

        /* ===================================================
           CONTACT
           =================================================== */

        .contact-list {
          position: relative;
          z-index: 2;

          display: grid;
          gap: 0.55rem;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .contact-item {
          display: flex;
          align-items: center;

          gap: 0.7rem;

          min-height: 3.55rem;

          padding:
            0.55rem
            0.65rem;

          border:
            1px solid
            rgba(255, 255, 255, 0.07);

          border-radius: 0.95rem;

          color: inherit;

          background:
            rgba(255, 255, 255, 0.025);

          text-decoration: none;

          transition:
            transform 0.5s var(--ease),
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.5s ease;
        }

        .contact-icon {
          display: grid;
          place-items: center;

          flex: none;

          width: 2.35rem;
          height: 2.35rem;

          border:
            1px solid
            rgba(196, 181, 253, 0.18);

          border-radius: 0.75rem;

          color: #c4b5fd;

          background:
            linear-gradient(
              145deg,
              rgba(168, 85, 247, 0.18),
              rgba(109, 40, 217, 0.04)
            );

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.1);
        }

        .contact-icon :global(svg) {
          width: 0.98rem;
          height: 0.98rem;
        }

        .contact-copy {
          display: flex;
          flex-direction: column;

          min-width: 0;
          flex: 1;
        }

        .contact-label {
          color: #777587;

          font-size: 0.54rem;
          font-weight: 700;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .contact-value {
          margin-top: 0.17rem;

          overflow-wrap: anywhere;

          color: #dddbe8;

          font-size: 0.7rem;
          font-weight: 520;
          line-height: 1.35;
        }

        .contact-arrow {
          width: 0.85rem;
          height: 0.85rem;

          flex: none;

          color: #6f6c7f;

          transition:
            transform 0.45s var(--ease),
            color 0.3s ease;
        }

        /* ===================================================
           UTILITY / SOCIAL
           =================================================== */

        .utility {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 1.5rem;

          margin-top: 1rem;
          padding-top: 2rem;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.07);
        }

        .social-intro {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-intro p {
          margin: 0.15rem 0 0;

          color: #d0cedb;

          font-size: 0.8rem;
          font-weight: 600;
        }

        .social-orbit {
          position: relative;

          display: grid;
          place-items: center;

          width: 2.55rem;
          height: 2.55rem;

          border:
            1px solid
            rgba(168, 85, 247, 0.22);

          border-radius: 50%;

          transform: rotateX(65deg);
        }

        .social-orbit::before,
        .social-orbit::after {
          content: "";

          position: absolute;

          border:
            1px solid
            rgba(217, 70, 239, 0.2);

          border-radius: 50%;
        }

        .social-orbit::before {
          inset: 0.3rem;
        }

        .social-orbit::after {
          inset: -0.3rem;
        }

        .social-orbit span {
          width: 0.35rem;
          height: 0.35rem;

          border-radius: 50%;

          background: #d946ef;

          box-shadow:
            0 0 12px
              rgba(217, 70, 239, 0.85);
        }

        .social-navigation {
          min-width: 0;
        }

        .social-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;

          gap: 0.65rem;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .social-card {
          display: flex;
          align-items: center;

          gap: 0.6rem;

          min-height: 3.25rem;

          padding:
            0.45rem
            0.7rem;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

          border-radius: 1rem;

          color: inherit;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.05),
              rgba(255, 255, 255, 0.015)
            );

          text-decoration: none;

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.06);

          transition:
            transform 0.45s var(--ease),
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.45s var(--ease);
        }

        .social-icon {
          display: grid;
          place-items: center;

          width: 2.2rem;
          height: 2.2rem;

          border:
            1px solid
            rgba(168, 85, 247, 0.22);

          border-radius: 0.72rem;

          color: #c4b5fd;

          background:
            rgba(109, 40, 217, 0.08);
        }

        .social-icon :global(svg) {
          width: 0.95rem;
          height: 0.95rem;
        }

        .social-copy {
          display: flex;
          flex-direction: column;

          min-width: 0;
        }

        .social-label {
          color: #777587;

          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .social-handle {
          margin-top: 0.14rem;

          color: #d7d5e2;

          font-size: 0.66rem;
          font-weight: 550;
          white-space: nowrap;
        }

        .social-external {
          width: 0.72rem;
          height: 0.72rem;

          color: #666476;

          transition:
            transform 0.4s var(--ease),
            color 0.3s ease;
        }

        /* ===================================================
           BOTTOM NAVIGATION
           =================================================== */

        .bottom-navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 1.5rem;

          margin-top: 1rem;
          padding-top: 1rem;
        }

        .bottom-note {
          color: #565466;

          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-nav ul {
          display: flex;
          flex-wrap: wrap;

          gap: 0.35rem;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .footer-nav a {
          display: inline-flex;
          align-items: center;

          min-height: 2.6rem;

          padding: 0 0.75rem;

          border-radius: 0.7rem;

          color: #898798;

          font-size: 0.7rem;
          text-decoration: none;

          transition:
            color 0.3s ease,
            background 0.3s ease;
        }

        .to-top {
          display: inline-flex;
          align-items: center;

          gap: 0.5rem;

          min-height: 2.6rem;

          padding:
            0 0.85rem;

          border:
            1px solid
            rgba(255, 255, 255, 0.09);

          border-radius: 0.8rem;

          color: #a6a4b4;

          background:
            rgba(255, 255, 255, 0.025);

          font: inherit;
          font-size: 0.65rem;
          font-weight: 600;

          cursor: pointer;

          transition:
            transform 0.45s var(--ease),
            border-color 0.35s ease,
            color 0.3s ease,
            background 0.35s ease;
        }

        .to-top :global(svg) {
          width: 0.85rem;
          height: 0.85rem;
        }

        /* ===================================================
           CLOSING
           =================================================== */

        .closing {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 0.9rem;

          margin-top:
            clamp(2.5rem, 5vw, 4rem);

          text-align: center;
        }

        .closing-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;

          width: min(100%, 24rem);
        }

        .closing-line span {
          flex: 1;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(168, 85, 247, 0.22)
            );
        }

        .closing-line span:last-of-type {
          background:
            linear-gradient(
              90deg,
              rgba(168, 85, 247, 0.22),
              transparent
            );
        }

        .closing-line i {
          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: #a855f7;

          box-shadow:
            0 0 10px
              rgba(168, 85, 247, 0.7);
        }

        .signature {
          margin: 0;

          color: #777487;

          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .copyright {
          margin: 0;

          color: #4f4d5d;

          font-size: 0.68rem;
        }

        /* ===================================================
           FOCUS
           =================================================== */

        .primary-cta:focus-visible,
        .secondary-cta:focus-visible,
        .contact-item:focus-visible,
        .social-card:focus-visible,
        .to-top:focus-visible,
        .footer-nav a:focus-visible {
          outline:
            2px solid
            var(--lavender);

          outline-offset: 3px;
        }

        /* ===================================================
           HOVER
           =================================================== */

        @media (hover: hover) and (pointer: fine) {
          .glass-card:hover {
            border-color:
              rgba(168, 85, 247, 0.18);

            box-shadow:
              inset 0 1px 0
                rgba(255, 255, 255, 0.1),
              0 30px 70px
                rgba(0, 0, 0, 0.34),
              0 0 35px
                rgba(109, 40, 217, 0.07);
          }

          .primary-cta:hover {
            transform:
              perspective(900px)
              translate3d(0, -5px, 0)
              rotateX(var(--rx))
              rotateY(var(--ry));

            filter: brightness(1.1);

            box-shadow:
              inset 0 1px 0
                rgba(255, 255, 255, 0.55),
              inset 0 -3px 0
                rgba(46, 16, 101, 0.55),
              0 28px 55px
                rgba(76, 29, 149, 0.52),
              0 0 75px
                rgba(168, 85, 247, 0.4);
          }

          .primary-cta:hover .cta-light {
            opacity: 1;
          }

          .primary-cta:hover .cta-arrow {
            transform:
              translate3d(4px, 0, 0);
          }

          .secondary-cta:hover {
            transform:
              translate3d(0, -3px, 0);

            border-color:
              rgba(168, 85, 247, 0.35);

            color: #fff;

            background:
              rgba(168, 85, 247, 0.08);
          }

          .secondary-cta:hover
            .secondary-external {
            color: #c4b5fd;
          }

          .service-item:hover {
            padding-left: 0.5rem;
            color: #fff;
          }

          .service-item:hover::before {
            opacity: 1;
          }

          .service-item:hover
            .service-number {
            color: #a855f7;
          }

          .service-item:hover
            .service-name {
            transform:
              translate3d(5px, 0, 0);
          }

          .service-item:hover
            .service-arrow {
            opacity: 1;

            color: #d946ef;

            transform:
              translate3d(4px, 0, 0);
          }

          .contact-item:hover {
            transform:
              translate3d(0, -2px, 0);

            border-color:
              rgba(196, 181, 253, 0.25);

            background:
              rgba(168, 85, 247, 0.055);

            box-shadow:
              inset 0 1px 0
                rgba(255, 255, 255, 0.1),
              0 12px 28px
                rgba(0, 0, 0, 0.24);
          }

          .contact-item:hover
            .contact-arrow {
            color: #d946ef;

            transform:
              translate3d(3px, 0, 0);
          }

          .social-card:hover {
            transform:
              translate3d(0, -3px, 0);

            border-color:
              rgba(217, 70, 239, 0.38);

            background:
              rgba(168, 85, 247, 0.065);

            box-shadow:
              inset 0 1px 0
                rgba(255, 255, 255, 0.1),
              0 12px 28px
                rgba(0, 0, 0, 0.25),
              0 0 24px
                rgba(168, 85, 247, 0.12);
          }

          .social-card:hover
            .social-icon {
            color: #fff;

            border-color:
              rgba(217, 70, 239, 0.45);
          }

          .social-card:hover
            .social-external {
            color: #c4b5fd;

            transform:
              translate3d(2px, -2px, 0);
          }

          .to-top:hover {
            transform:
              translate3d(0, -3px, 0);

            border-color:
              rgba(168, 85, 247, 0.38);

            color: #fff;

            background:
              rgba(168, 85, 247, 0.07);
          }

          .footer-nav a:hover {
            color: #fff;
            background:
              rgba(168, 85, 247, 0.08);
          }
        }

        /* ===================================================
           ACTIVE
           =================================================== */

        .primary-cta:active {
          transform:
            translate3d(0, -1px, 0);
        }

        .social-card:active,
        .contact-item:active {
          transform:
            translate3d(0, 1px, 0);
        }

        /* ===================================================
           ANIMATIONS
           =================================================== */

        @keyframes sheen {
          0%,
          70% {
            transform:
              translate3d(-180%, 0, 0)
              skewX(-18deg);
          }

          100% {
            transform:
              translate3d(430%, 0, 0)
              skewX(-18deg);
          }
        }

        @keyframes float {
          50% {
            transform:
              translate3d(0, -18px, 0);
          }
        }

        @keyframes mark-float {
          50% {
            transform:
              rotateX(8deg)
              rotateY(-10deg)
              translate3d(0, -4px, 0);
          }
        }

        @keyframes ring-drift {
          to {
            transform:
              rotateX(68deg)
              rotate(360deg);
          }
        }

        @keyframes pulse-dot {
          50% {
            box-shadow:
              0 0 0 6px
                rgba(217, 70, 239, 0.06),
              0 0 18px
                rgba(217, 70, 239, 1);
          }
        }

        @keyframes divider-pulse {
          50% {
            box-shadow:
              0 0 0 6px
                rgba(168, 85, 247, 0.05),
              0 0 20px 5px
                rgba(217, 70, 239, 0.8);
          }
        }

        /* ===================================================
           TABLET
           =================================================== */

        @media (max-width: 70rem) {
          .studio-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .brand-card {
            grid-column: 1 / -1;
          }
        }

        /* ===================================================
           MOBILE
           =================================================== */

        @media (max-width: 52rem) {
          .footer {
            padding-top: 5rem;
          }

          .headline {
            letter-spacing: -0.055em;
          }

          .studio-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .brand-card {
            grid-column: auto;
          }

          .utility {
            flex-direction: column;
            align-items: flex-start;
          }

          .social-navigation {
            width: 100%;
          }

          .social-list {
            justify-content: flex-start;
            width: 100%;
          }

          .social-card {
            flex: 1;
          }

          .bottom-navigation {
            align-items: flex-start;
            flex-direction: column;
          }

          .to-top {
            width: 100%;
            justify-content: center;
          }

          .orbit,
          .floating-chip {
            display: none;
          }
        }

        @media (max-width: 38rem) {
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-wrap {
            width: 100%;
          }

          .primary-cta {
            width: 100%;
          }

          .secondary-cta {
            width: 100%;
          }

          .metrics {
            margin-top: 2.3rem;
          }

          .metric {
            padding: 0 1rem;
          }

          .metric strong {
            font-size: 0.95rem;
          }

          .metric span:not(.metric-divider) {
            font-size: 0.56rem;
          }

          .social-list {
            flex-direction: column;
          }

          .social-card {
            width: 100%;
          }

          .feature-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }
        }

        @media (max-width: 27rem) {
          .footer {
            padding-inline: 0.85rem;
          }

          .brand-top {
            align-items: flex-start;
          }

          .brand-mark {
            width: 3.7rem;
            height: 3.7rem;
          }

          .brand-heading h3 {
            font-size: 1.2rem;
          }

          .brand-heading p {
            font-size: 0.64rem;
          }

          .headline-main,
          .headline-gradient {
            font-size: 2.35rem;
          }

          .metric {
            padding: 0 0.7rem;
          }
        }

        /* ===================================================
           REDUCED MOTION
           =================================================== */

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .ambient-one,
          .ambient-two,
          .ambient-three,
          .brand-mark-front,
          .status-dot,
          .cinematic-divider i,
          .cta-sheen {
            animation: none !important;
          }

          .primary-cta,
          .secondary-cta,
          .glass-card,
          .service-item,
          .contact-item,
          .social-card,
          .to-top,
          .footer-nav a,
          .cta-arrow,
          .contact-arrow,
          .social-external {
            transition: none !important;
          }

          .primary-cta:hover,
          .secondary-cta:hover,
          .glass-card:hover,
          .contact-item:hover,
          .social-card:hover,
          .to-top:hover {
            transform: none !important;
          }

          .cta-light {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}