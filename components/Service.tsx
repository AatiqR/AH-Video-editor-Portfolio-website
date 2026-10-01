"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Service = {
  number: string;
  title: string;
  description: string;
  accent: "violet" | "indigo" | "fuchsia" | "orchid" | "iris" | "plum";
  featured?: boolean;
  href?: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Direct Response\nMeta Ads",
    description: "Performance-led creatives shaped around the hook, message, and moment of conversion.",
    accent: "violet",
    featured: true,
  },
  {
    number: "02",
    title: "AI UGC\nAds",
    description: "Native-feeling paid-social creative, built for a modern attention economy.",
    accent: "indigo",
  },
  {
    number: "03",
    title: "VSL & Sales\nVideos",
    description: "Long-form edits that guide a clear story with rhythm, structure, and visual intent.",
    accent: "fuchsia",
  },
  {
    number: "04",
    title: "Short-Form\nContent",
    description: "Reels, TikToks, and Shorts cut for retention without losing the brand’s point of view.",
    accent: "orchid",
  },
  {
    number: "05",
    title: "YouTube\nEditing",
    description: "Long-form storytelling with pacing, visual polish, and reasons to keep watching.",
    accent: "iris",
  },
  {
    number: "06",
    title: "Motion\nGraphics",
    description: "Typography, product moments, transitions, and animation that clarify the idea.",
    accent: "plum",
  },
];

export type ServicesSectionProps = {
  /** Supply only a real, existing portfolio anchor or route. */
  portfolioHref?: string;
  /** Add real service destinations here when they exist in the parent site. */
  services?: Service[];
};

function ServicePanel({ service, index }: { service: Service; index: number }) {
  const frame = useRef<number | null>(null);

  const setPointerPosition = (event: ReactPointerEvent<HTMLElement | HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      element.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      element.style.setProperty("--tilt-x", `${((0.5 - y) * 1.2).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${((x - 0.5) * 1.3).toFixed(2)}deg`);
    });
  };

  const resetPointerPosition = (event: ReactPointerEvent<HTMLElement | HTMLAnchorElement>) => {
    if (frame.current) cancelAnimationFrame(frame.current);
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  const sharedProps = {
    className: `service-panel service-panel--${service.accent}${service.featured ? " service-panel--featured" : ""}`,
    onPointerMove: setPointerPosition,
    onPointerLeave: resetPointerPosition,
    style: { "--delay": `${index * 90}ms` } as CSSProperties,
  };

  const inner = <>
    <span className="service-panel__number" aria-hidden="true">{service.number}</span>
    <span className="service-panel__topline">
      <span>Creative format</span>
      <span className="service-panel__dot" aria-hidden="true" />
    </span>
    <div className="service-panel__copy">
      <h3>{service.title.split("\n").map((line, lineIndex) => <span key={lineIndex}>{line}</span>)}</h3>
      <p>{service.description}</p>
    </div>
    <span className="service-panel__action" aria-hidden="true">
      <span>{service.href ? "Explore work" : "Selected creative"}</span><b>↗</b>
    </span>
  </>;

  if (service.href) {
    return <a {...sharedProps} href={service.href} aria-label={`Explore ${service.title.replace("\n", " ")} work`}>{inner}</a>;
  }

  return <article {...sharedProps}>{inner}</article>;
}

export default function ServicesSection({ portfolioHref, services = SERVICES }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className={`services-section ${visible ? "services-section--visible" : ""}`} aria-labelledby="services-heading">
      <div className="services-section__atmosphere" aria-hidden="true" />
      <div className="services-section__inner">
        <header className="services-intro">
          <p className="services-eyebrow"><span /> Services</p>
          <h2 id="services-heading">Built for attention.<br /><em>Designed to perform.</em></h2>
          <p className="services-intro__copy">Creative direction and post-production for paid ads, sales stories, social content, and cinematic brand moments.</p>
        </header>

        <div className="services-grid" aria-label="Creative services">
          {services.map((service, index) => <ServicePanel key={`${service.number}-${service.title}`} service={service} index={index} />)}
        </div>

        <div className="services-outro">
          {portfolioHref ? (
            <a className="services-outro__link" href={portfolioHref}>Explore the work <span aria-hidden="true">↓</span></a>
          ) : (
            <p className="services-outro__label">Selected work <span aria-hidden="true">↓</span></p>
          )}
        </div>
      </div>

      {/* Global scope is intentional: ServicePanel is a child component, so styled-jsx
          scoped selectors would not reach its internal title, copy, and action nodes. */}
      <style jsx global>{`
        .services-section { --ink: #f6f3ff; position: relative; overflow: clip; isolation: isolate; background: #050506; color: var(--ink); padding: clamp(7.5rem, 13vw, 13.5rem) 1.25rem clamp(6rem, 11vw, 11rem); }
        .services-section__inner { width: min(100%, 78rem); margin: 0 auto; position: relative; z-index: 1; }
        .services-section__atmosphere { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(40rem 25rem at 50% 12%, rgba(114, 57, 208, .11), transparent 67%), radial-gradient(38rem 35rem at 15% 65%, rgba(70, 31, 132, .075), transparent 72%), radial-gradient(32rem 28rem at 86% 78%, rgba(178, 44, 180, .05), transparent 72%); }
        .services-intro { max-width: 57rem; margin: 0 auto clamp(3.5rem, 6.5vw, 5.75rem); text-align: center; }
        .services-eyebrow { width: fit-content; display: inline-flex; align-items: center; gap: .55rem; margin: 0 0 1.6rem; padding: .48rem .8rem .48rem .7rem; color: #d8cff0; border: 1px solid rgba(181, 143, 255, .22); border-radius: 999px; background: rgba(15, 11, 20, .72); box-shadow: inset 0 1px rgba(255,255,255,.05), 0 0 1.7rem rgba(121, 65, 224, .08); font-size: .65rem; font-weight: 650; letter-spacing: .16em; line-height: 1; text-transform: uppercase; opacity: 0; transform: translateY(12px); }
        .services-eyebrow span { width: .35rem; height: .35rem; border-radius: 50%; background: #b88cff; box-shadow: 0 0 .75rem #a76cff; }
        h2 { margin: 0; color: #fbfaff; font-size: clamp(3rem, 6.3vw, 6.35rem); font-weight: 650; letter-spacing: -.074em; line-height: .91; }
        h2 em { color: #b99aff; font-style: normal; }
        .services-intro__copy { max-width: 39rem; margin: 1.65rem auto 0; color: #a49eae; font-size: clamp(1rem, 1.35vw, 1.18rem); letter-spacing: -.02em; line-height: 1.55; opacity: 0; transform: translateY(14px); }
        .services-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(.75rem, 1.5vw, 1.15rem); perspective: 1400px; }
        .service-panel { --pointer-x: 50%; --pointer-y: 50%; --tilt-x: 0deg; --tilt-y: 0deg; position: relative; min-height: clamp(20.5rem, 28vw, 24.5rem); display: flex; flex-direction: column; overflow: hidden; padding: clamp(1.55rem, 2.5vw, 2.35rem); border: 1px solid rgba(229, 218, 255, .13); border-radius: clamp(1.4rem, 2.2vw, 1.9rem); background: #0a0a0d; box-shadow: inset 0 1px rgba(255,255,255,.035), inset 0 -2.8rem 4rem rgba(0,0,0,.16), 0 1.2rem 3.8rem rgba(0,0,0,.12); color: inherit; text-decoration: none; transform: translate3d(0, 18px, 0) rotateX(0deg) rotateY(0deg); opacity: 0; transition: transform 700ms cubic-bezier(.16,1,.3,1), border-color 600ms ease, box-shadow 700ms ease; animation-delay: var(--delay); }
        .service-panel::before { content: ""; position: absolute; inset: 0; opacity: .72; pointer-events: none; background: radial-gradient(30rem 24rem at var(--pointer-x) var(--pointer-y), rgba(208, 184, 255, .105), transparent 34%), radial-gradient(26rem 18rem at 90% -4%, var(--accent), transparent 55%); transition: opacity 700ms ease, background-position 90ms linear; }
        .service-panel::after { content: ""; position: absolute; inset: 1px; border-radius: inherit; pointer-events: none; background: linear-gradient(135deg, rgba(255,255,255,.045), transparent 25%, transparent 70%, rgba(255,255,255,.015)); }
        .service-panel--violet { --accent: rgba(116, 77, 243, .47); } .service-panel--indigo { --accent: rgba(55, 84, 218, .42); } .service-panel--fuchsia { --accent: rgba(192, 56, 190, .38); } .service-panel--orchid { --accent: rgba(142, 72, 203, .41); } .service-panel--iris { --accent: rgba(91, 91, 211, .38); } .service-panel--plum { --accent: rgba(143, 50, 166, .37); }
        .service-panel--featured { border-color: rgba(185, 151, 255, .22); }
        .service-panel__number { position: absolute; z-index: 0; top: -.1em; right: .03em; color: rgba(203, 180, 255, .095); font-size: clamp(8rem, 14vw, 12.5rem); font-weight: 700; letter-spacing: -.11em; line-height: .78; user-select: none; }
        .service-panel__topline, .service-panel__copy, .service-panel__action { position: relative; z-index: 1; }
        .service-panel__topline { display: flex; align-items: center; justify-content: space-between; color: rgba(226,219,240,.54); font-size: .61rem; font-weight: 650; letter-spacing: .13em; line-height: 1; text-transform: uppercase; }
        .service-panel__dot { width: .35rem; height: .35rem; border-radius: 50%; background: #bea1ff; box-shadow: 0 0 .7rem rgba(183, 140, 255, .9); }
        .service-panel__copy { margin: auto 0 1.6rem; max-width: 28rem; }
        .service-panel h3 { display: grid; margin: 0; font-size: clamp(2rem, 3.35vw, 3.7rem); font-weight: 590; letter-spacing: -.07em; line-height: .91; text-wrap: balance; }
        .service-panel h3 span:last-child { color: #c5aaff; }
        .service-panel p { max-width: 29rem; margin: 1.2rem 0 0; color: #aaa5b1; font-size: clamp(.9rem, 1.13vw, 1rem); letter-spacing: -.02em; line-height: 1.5; }
        .service-panel__action { display: flex; align-items: center; justify-content: space-between; min-height: 2.75rem; padding-top: 1rem; border-top: 1px solid rgba(230,220,255,.10); color: #d6cae9; font-size: .69rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
        .service-panel__action b { display: grid; width: 2.25rem; height: 2.25rem; place-items: center; border: 1px solid rgba(222,209,255,.16); border-radius: 50%; color: #f7f2ff; font-size: 1rem; font-weight: 400; transition: transform 550ms cubic-bezier(.16,1,.3,1), background 550ms ease, border-color 550ms ease; }
        .services-outro { display: flex; justify-content: center; padding-top: clamp(4rem, 7vw, 6.5rem); opacity: 0; transform: translateY(12px); }
        .services-outro__label, .services-outro__link { display: inline-flex; align-items: center; gap: .65rem; margin: 0; padding: .66rem .88rem; border: 1px solid rgba(213, 196, 247, .17); border-radius: 999px; background: rgba(11,10,14,.72); color: #d7cfe3; font-size: .67rem; font-weight: 650; letter-spacing: .11em; text-decoration: none; text-transform: uppercase; transition: border-color 300ms ease, background 300ms ease; }
        .services-outro__link:hover { border-color: rgba(198, 165, 255, .46); background: rgba(39, 23, 62, .7); }
        .services-outro__link:focus-visible, .service-panel:focus-visible { outline: 2px solid #c09aff; outline-offset: 4px; }
        .services-section--visible .services-eyebrow { animation: arrive 700ms cubic-bezier(.16,1,.3,1) forwards; } .services-section--visible h2 { animation: arrive 760ms 70ms cubic-bezier(.16,1,.3,1) forwards; } .services-section--visible .services-intro__copy { animation: arrive 700ms 150ms cubic-bezier(.16,1,.3,1) forwards; } .services-section--visible .service-panel { animation: panel-in 850ms var(--delay) cubic-bezier(.16,1,.3,1) forwards; } .services-section--visible .services-outro { animation: arrive 700ms 580ms cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes arrive { to { opacity: 1; transform: translateY(0); } } @keyframes panel-in { to { opacity: 1; transform: translate3d(0, 0, 0); } }
        @media (hover: hover) and (pointer: fine) { .service-panel:hover { z-index: 2; border-color: rgba(205, 180, 255, .34); box-shadow: inset 0 1px rgba(255,255,255,.07), inset 0 -2.8rem 4rem rgba(0,0,0,.16), 0 1.9rem 4.5rem rgba(0,0,0,.32), 0 0 3rem rgba(104, 61, 180, .10); transform: translate3d(0, -6px, 0) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(1.006); } .service-panel:hover::before { opacity: 1; } .service-panel:hover .service-panel__action b { transform: translate(3px, -3px); border-color: rgba(213, 190, 255, .37); background: rgba(175, 130, 255, .12); } .service-panel:hover h3 { color: #fff; } }
        @media (max-width: 640px) { .services-section { padding-inline: 1rem; } .services-intro { margin-bottom: 2.75rem; } h2 { font-size: clamp(2.45rem, 12vw, 3.5rem); line-height: .94; } .services-intro__copy { margin-top: 1.35rem; font-size: .98rem; } .services-grid { grid-template-columns: 1fr; gap: .75rem; } .service-panel { min-height: 17.75rem; padding: 1.4rem; } .service-panel__number { font-size: 8.5rem; } .service-panel h3 { font-size: clamp(2rem, 10vw, 2.8rem); } .service-panel p { max-width: 23rem; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } .services-eyebrow, .services-intro__copy, .service-panel, .services-outro { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
