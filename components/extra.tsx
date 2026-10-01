// "use client";

// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   type CSSProperties,
// } from "react";

// /** Replace this one URL with the client's YouTube watch, share, or embed URL. */
// const YOUTUBE_URL = "https://www.youtube.com/watch?v=M7lc1UVf-VE";
// const BRAND_NAME = "AATIQ.";

// const navigation = ["Work", "Services", "Process", "About"] as const;

// function createYoutubeEmbedUrl(source: string): string {
//   try {
//     const url = new URL(source);
//     const host = url.hostname.replace("www.", "");
//     let videoId = "";

//     if (host === "youtu.be") videoId = url.pathname.slice(1);
//     if (host.endsWith("youtube.com")) {
//       videoId =
//         url.searchParams.get("v") ??
//         (url.pathname.startsWith("/embed/")
//           ? url.pathname.split("/")[2] ?? ""
//           : "");
//     }

//     if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
//       return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
//     }
//   } catch {
//     // A malformed replacement URL simply falls back to the supplied value below.
//   }

//   return source;
// }

// export default function Hero() {
//   const heroRef = useRef<HTMLElement>(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const animationFrameRef = useRef<number | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   const closeMenu = useCallback(() => setIsMenuOpen(false), []);

//   useEffect(() => {
//     if (!isMenuOpen) return;

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") closeMenu();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [closeMenu, isMenuOpen]);

//   useEffect(() => {
//     const heroElement = heroRef.current;
//     if (!heroElement || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
//       return;
//     }
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

//     let nextX = 0;
//     let nextY = 0;
//     const updateParallax = () => {
//       heroElement.style.setProperty("--pointer-x", String(nextX));
//       heroElement.style.setProperty("--pointer-y", String(nextY));
//       animationFrameRef.current = null;
//     };
//     const handlePointerMove = (event: PointerEvent) => {
//       nextX = (event.clientX / window.innerWidth - 0.5) * 2;
//       nextY = (event.clientY / window.innerHeight - 0.5) * 2;
//       if (animationFrameRef.current === null) {
//         animationFrameRef.current = window.requestAnimationFrame(updateParallax);
//       }
//     };

//     window.addEventListener("pointermove", handlePointerMove, { passive: true });
//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//       if (animationFrameRef.current !== null) {
//         window.cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   const heroStyle = {
//     "--pointer-x": 0,
//     "--pointer-y": 0,
//     fontFamily: 'Satoshi, "Helvetica Neue", Helvetica, Arial, sans-serif',
//   } as CSSProperties;

//   return (
//     <section
//       ref={heroRef}
//       aria-label="Introduction"
//       data-hero
//       style={heroStyle}
//       className="relative isolate min-h-[100svh] overflow-hidden bg-[#050505] text-[#F7F7F7]"
//     >
//       <div aria-hidden="true" className="hero-orb hero-orb-primary" />
//       <div aria-hidden="true" className="hero-orb hero-orb-secondary" />
//       <div aria-hidden="true" className="hero-light-sweep" />
//       <div aria-hidden="true" className="hero-grain" />
//       <div aria-hidden="true" className="hero-arc" />

//       <header className="relative z-50 mx-auto w-full max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
//         <nav
//           aria-label="Primary navigation"
//           className="hero-enter flex min-h-16 items-center justify-between rounded-[1.35rem] border border-white/[0.09] bg-[#090909]/75 px-4 shadow-[0_14px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:min-h-[4.5rem] sm:px-5 lg:px-6"
//         >
//           <a
//             href="#top"
//             aria-label={`${BRAND_NAME} home`}
//             className="group relative z-50 inline-flex min-h-11 items-center text-sm font-extrabold tracking-[-0.08em] text-white transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
//           >
//             {BRAND_NAME}
//             <span className="ml-1 text-[#7C3AED] transition-transform duration-300 group-hover:translate-x-0.5">✦</span>
//           </a>

//           <div className="hidden items-center gap-1 lg:flex">
//             {navigation.map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="nav-link relative rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 outline-none transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-violet-400"
//               >
//                 {item}
//               </a>
//             ))}
//           </div>

//           <a
//             href="#contact"
//             className="hidden min-h-11 items-center rounded-xl border border-violet-300/20 bg-violet-600 px-4 text-sm font-bold text-white shadow-[0_0_24px_rgba(124,58,237,0.18)] transition duration-300 hover:scale-[1.025] hover:bg-violet-500 hover:shadow-[0_0_28px_rgba(124,58,237,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] active:scale-[0.985] lg:inline-flex"
//           >
//             Let&apos;s Work Together <span className="ml-1.5 text-base leading-none">↗</span>
//           </a>

//           <button
//             type="button"
//             onClick={() => setIsMenuOpen((open) => !open)}
//             aria-expanded={isMenuOpen}
//             aria-controls="mobile-navigation"
//             aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//             className="relative z-50 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white outline-none transition hover:border-violet-300/30 hover:bg-violet-500/10 focus-visible:ring-2 focus-visible:ring-violet-400 lg:hidden"
//           >
//             <span className="sr-only">Menu</span>
//             <span className="relative block h-[18px] w-5" aria-hidden="true">
//               <span className={`menu-line absolute left-0 top-0 ${isMenuOpen ? "translate-y-[8px] rotate-45" : ""}`} />
//               <span className={`menu-line absolute left-0 top-[8px] ${isMenuOpen ? "opacity-0" : ""}`} />
//               <span className={`menu-line absolute bottom-0 left-0 ${isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
//             </span>
//           </button>
//         </nav>
//       </header>

//       <div
//         id="mobile-navigation"
//         aria-hidden={!isMenuOpen}
//         className={`fixed inset-0 z-40 bg-[#050505] px-6 pt-28 transition-[visibility,opacity] duration-300 lg:hidden ${isMenuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
//       >
//         <div aria-hidden="true" className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
//         <nav aria-label="Mobile navigation" className="relative flex min-h-[calc(100dvh-10rem)] flex-col justify-between pb-8">
//           <div className="flex flex-col">
//             {navigation.map((item, index) => (
//               <a
//                 key={item}
//                 tabIndex={isMenuOpen ? 0 : -1}
//                 href={`#${item.toLowerCase()}`}
//                 onClick={closeMenu}
//                 style={{ transitionDelay: isMenuOpen ? `${70 + index * 55}ms` : "0ms" }}
//                 className={`border-b border-white/[0.09] py-4 text-[clamp(2.1rem,11vw,4.2rem)] font-extrabold leading-[0.96] tracking-[-0.065em] text-white transition-[transform,opacity,color] duration-500 hover:text-violet-300 focus-visible:outline-none focus-visible:text-violet-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//           <a
//             tabIndex={isMenuOpen ? 0 : -1}
//             href="#contact"
//             onClick={closeMenu}
//             style={{ transitionDelay: isMenuOpen ? "310ms" : "0ms" }}
//             className={`inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-violet-600 px-5 text-center text-base font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.22)] transition-[transform,opacity,background-color] duration-500 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:scale-[0.985] ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
//           >
//             Let&apos;s Work Together <span className="ml-2">↗</span>
//           </a>
//         </nav>
//       </div>

//       <main id="top" className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:min-h-[calc(100svh-6.75rem)] lg:px-8 lg:pb-16 lg:pt-10">
//         <section className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(460px,0.92fr)] lg:gap-[clamp(3rem,6vw,8rem)] xl:grid-cols-[minmax(0,1fr)_minmax(520px,0.94fr)]">
//           <div className="max-w-[720px] lg:pb-2">
//             <p className="hero-enter hero-enter-delay-1 mb-5 flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-zinc-400 sm:mb-7 sm:text-xs">
//               <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FF2DA6] shadow-[0_0_12px_rgba(255,45,166,0.95)]" />
//               VIDEO EDITOR <span className="text-zinc-600">·</span> META ADS <span className="text-zinc-600">·</span> UGC <span className="text-zinc-600">·</span> VSL
//             </p>
//             <h1 className="hero-enter hero-enter-delay-2 max-w-[770px] text-[clamp(3.25rem,11.1vw,9.55rem)] font-extrabold leading-[0.84] tracking-[-0.085em] text-[#F7F7F7]">
//               <span className="block">I EDIT VIDEOS</span>
//               <span className="block">THAT MAKE PEOPLE</span>
//               <span className="accent-word mt-[0.09em] block w-fit pr-[0.08em] text-[#7C3AED]">STOP.</span>
//             </h1>
//             <p className="hero-enter hero-enter-delay-3 mt-7 max-w-[34rem] text-base leading-relaxed text-zinc-400 sm:mt-9 sm:text-lg">
//               Helping DTC brands and ecommerce teams turn raw footage into high-converting UGC ads, VSLs, and scroll-stopping social content.
//             </p>
//             <div className="hero-enter hero-enter-delay-4 mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
//               <a
//                 href="#contact"
//                 className="group inline-flex min-h-14 items-center justify-center rounded-xl bg-[#F7F7F7] px-6 text-[15px] font-extrabold text-[#080808] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(247,247,247,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:translate-y-0 active:scale-[0.985]"
//               >
//                 Start a Project <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
//               </a>
//               <a
//                 href="https://wa.me/923460918797"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.03] px-6 text-[15px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-violet-500/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:translate-y-0 active:scale-[0.985]"
//               >
//                 WhatsApp Me
//               </a>
//             </div>
//           </div>

//           <div className="hero-enter hero-enter-delay-video w-full lg:justify-self-end">
//             <div className="group relative overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-[#0b0b0d] shadow-[0_28px_80px_rgba(0,0,0,0.36),0_0_58px_rgba(124,58,237,0.1)] transition-transform duration-500 ease-out hover:scale-[1.012]">
//               <div className="aspect-video w-full">
//                 {isVideoLoaded ? (
//                   <iframe
//                     ref={iframeRef}
//                     className="h-full w-full"
//                     src={createYoutubeEmbedUrl(YOUTUBE_URL)}
//                     title="Aatiq video editing showreel"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     allowFullScreen
//                     onLoad={() => iframeRef.current?.focus()}
//                   />
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setIsVideoLoaded(true)}
//                     aria-label="Play Aatiq video editing showreel"
//                     className="video-preview relative block h-full w-full overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300"
//                   >
//                     <span aria-hidden="true" className="preview-grid absolute inset-0" />
//                     <span aria-hidden="true" className="preview-vignette absolute inset-0" />
//                     <span aria-hidden="true" className="absolute -left-[18%] top-[14%] h-[72%] w-[66%] rotate-[-18deg] rounded-full bg-violet-600/35 blur-[75px] transition-transform duration-700 group-hover:translate-x-4 group-hover:scale-110" />
//                     <span aria-hidden="true" className="absolute bottom-[9%] right-[8%] h-[38%] w-[30%] rounded-full bg-[#FF2DA6]/15 blur-[52px]" />
//                     <span className="absolute inset-x-[7%] top-[9%] flex items-start justify-between">
//                       <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] font-bold tracking-[0.17em] text-white/75 backdrop-blur-sm sm:text-[10px]">SELECTED WORK / 2027</span>
//                       <span className="font-mono text-[10px] tracking-wider text-white/55">01:24</span>
//                     </span>
//                     <span className="absolute bottom-[10%] left-[8%] max-w-[75%] text-[clamp(1.65rem,4.5vw,3.8rem)] font-extrabold leading-[0.88] tracking-[-0.075em] text-white">
//                       PERFORMANCE<br />IN MOTION.
//                     </span>
//                     <span className="absolute bottom-[10%] right-[8%] grid h-16 w-16 place-items-center rounded-full border border-violet-200/35 bg-[#0b0b0d]/65 shadow-[0_0_32px_rgba(124,58,237,0.42)] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-violet-200/60 group-hover:bg-violet-600/70 sm:h-[4.5rem] sm:w-[4.5rem]">
//                       <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white sm:border-y-[10px] sm:border-l-[16px]" />
//                     </span>
//                     <span aria-hidden="true" className="absolute bottom-0 left-[8%] h-px w-[84%] bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
//                   </button>
//                 )}
//               </div>
//             </div>
//             <p className="mt-3 flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-zinc-500">
//               <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
//               WATCH THE SHOWREEL
//             </p>
//           </div>
//         </section>
//       </main>

//       <style jsx>{`
//         .menu-line {
//           height: 1.5px;
//           width: 20px;
//           border-radius: 999px;
//           background: currentColor;
//           transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
//         }
//         .nav-link::after {
//           content: "";
//           position: absolute;
//           bottom: 3px;
//           left: 50%;
//           height: 1px;
//           width: 0;
//           background: #a78bfa;
//           box-shadow: 0 0 12px rgba(124, 58, 237, 0.9);
//           transform: translateX(-50%);
//           transition: width 220ms ease;
//         }
//         .nav-link:hover { transform: translateY(-1px); }
//         .nav-link:hover::after, .nav-link:focus-visible::after { width: calc(100% - 24px); }
//         .hero-orb, .hero-light-sweep, .hero-grain, .hero-arc { pointer-events: none; position: absolute; }
//         .hero-orb { border-radius: 999px; filter: blur(80px); will-change: transform, opacity; }
//         .hero-orb-primary {
//           top: -18rem; right: -13rem; width: min(58vw, 54rem); height: min(58vw, 54rem);
//           background: rgba(124, 58, 237, 0.16);
//           transform: translate3d(calc(var(--pointer-x) * 13px), calc(var(--pointer-y) * 10px), 0);
//           animation: orb-primary 18s ease-in-out infinite alternate;
//         }
//         .hero-orb-secondary {
//           bottom: -22rem; left: -20rem; width: min(52vw, 43rem); height: min(52vw, 43rem);
//           background: rgba(255, 45, 166, 0.075);
//           filter: blur(105px);
//           transform: translate3d(calc(var(--pointer-x) * -9px), calc(var(--pointer-y) * -7px), 0);
//           animation: orb-secondary 22s ease-in-out infinite alternate;
//         }
//         .hero-light-sweep {
//           inset: -40%;
//           opacity: 0.32;
//           background: linear-gradient(118deg, transparent 42%, rgba(167, 139, 250, 0.04) 49%, transparent 56%);
//           transform: translate3d(-8%, 0, 0) rotate(-8deg);
//           animation: light-sweep 20s ease-in-out infinite alternate;
//         }
//         .hero-grain {
//           inset: 0;
//           z-index: 1;
//           opacity: 0.14;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
//           mix-blend-mode: soft-light;
//         }
//         .hero-arc {
//           top: 48%; right: -14rem; width: 37rem; height: 37rem;
//           border: 1px solid rgba(255,255,255,0.055); border-radius: 50%;
//           box-shadow: inset 0 0 0 4.5rem rgba(255,255,255,0.008), inset 0 0 0 9rem rgba(255,255,255,0.006);
//           transform: rotate(18deg);
//         }
//         .accent-word {
//           background: linear-gradient(105deg, #7c3aed 5%, #a78bfa 65%, #ff2da6 130%);
//           -webkit-background-clip: text;
//           background-clip: text;
//           color: transparent;
//           text-shadow: 0 0 35px rgba(124,58,237,0.17);
//         }
//         .preview-grid {
//           opacity: 0.38;
//           background-image: linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px);
//           background-size: clamp(34px, 4vw, 58px) clamp(34px, 4vw, 58px);
//           mask-image: linear-gradient(to bottom, black, transparent 88%);
//         }
//         .preview-vignette { background: radial-gradient(circle at 58% 45%, transparent 0 25%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.52) 100%); }
//         .hero-enter { animation: hero-enter 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
//         .hero-enter-delay-1 { animation-delay: 75ms; }
//         .hero-enter-delay-2 { animation-delay: 135ms; }
//         .hero-enter-delay-3 { animation-delay: 210ms; }
//         .hero-enter-delay-4 { animation-delay: 270ms; }
//         .hero-enter-delay-video { animation-delay: 180ms; }
//         @keyframes hero-enter { from { opacity: 0; transform: translate3d(0, 15px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
//         @keyframes orb-primary { from { transform: translate3d(calc(var(--pointer-x) * 13px - 3%), calc(var(--pointer-y) * 10px - 2%), 0) scale(0.96); opacity: .72; } to { transform: translate3d(calc(var(--pointer-x) * 13px + 4%), calc(var(--pointer-y) * 10px + 5%), 0) scale(1.08); opacity: 1; } }
//         @keyframes orb-secondary { from { transform: translate3d(calc(var(--pointer-x) * -9px - 2%), calc(var(--pointer-y) * -7px + 4%), 0) scale(0.98); opacity: .56; } to { transform: translate3d(calc(var(--pointer-x) * -9px + 5%), calc(var(--pointer-y) * -7px - 2%), 0) scale(1.08); opacity: 1; } }
//         @keyframes light-sweep { from { transform: translate3d(-9%, -2%, 0) rotate(-8deg); } to { transform: translate3d(9%, 3%, 0) rotate(-8deg); } }
//         @media (prefers-reduced-motion: reduce) {
//           *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 1ms !important; }
//           .hero-orb-primary, .hero-orb-secondary, .hero-light-sweep { animation: none; transform: none; }
//         }
//         @media (max-width: 374px) { .hero-arc { display: none; } }
//       `}</style>
//     </section>
//   );
// }




// 2nd one this 
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * ============================================================================
 * CONFIGURATION & CONSTANTS
 * ============================================================================
 * Easily replace the client's video URL, social links, and brand details below.
 * Everything is centralized for effortless maintenance.
 */
const YOUTUBE_URL = "https://www.youtube.com/watch?v=ScMzIvxBSi4";
const WHATSAPP_URL = "https://wa.me/923460918797";
const BRAND_NAME = "AATIQ";
const BRAND_TAGLINE = "CREATIVE DIRECTOR · VSL";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

/**
 * Helper to safely extract YouTube video ID from various standard YouTube URL formats:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 */
function getYouTubeId(url: string): string {
  try {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "ScMzIvxBSi4";
  } catch {
    return "ScMzIvxBSi4";
  }
}

export interface HeroProps {
  youtubeUrl?: string;
  whatsappUrl?: string;
  brandName?: string;
  brandTagline?: string;
}

/**
 * ============================================================================
 * MAIN COMPONENT: Hero
 * ============================================================================
 * A world-class 2027 editorial hero section for performance video editors,
 * Meta Ads specialists, UGC creators, and VSL directors.
 *
 * Designed mobile-first, zero layout shifts (CLS: 0), delayed YouTube loading
 * for peak Lighthouse performance (100/100 target), and pure CSS-driven animations.
 */
export default function Hero({
  youtubeUrl = YOUTUBE_URL,
  whatsappUrl = WHATSAPP_URL,
  brandName = BRAND_NAME,
  brandTagline = BRAND_TAGLINE,
}: HeroProps) {
  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Performance-first video state: YouTube iframe is NEVER rendered on initial load.
  // It loads dynamically ONLY after user clicks the play affordance.
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  // Parallax container ref (updates CSS variables directly to avoid React re-renders)
  const heroRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = getYouTubeId(youtubeUrl);
  const posterUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  /**
   * Handle locking body scroll when mobile menu is active, and listen for Escape key.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  /**
   * High-performance pointer parallax for desktop ambient glow.
   * Modifies CSS custom properties via requestAnimationFrame without triggering React state updates.
   * Completely disabled on touch devices and if prefers-reduced-motion is active.
   */
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Check media query for touch devices & prefers-reduced-motion
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isPointerFine || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 25; // max 25px subtle offset
      targetY = y * 25;

      if (!rafId) {
        const loop = () => {
          currentX += (targetX - currentX) * 0.08;
          currentY += (targetY - currentY) * 0.08;

          heroEl.style.setProperty("--parallax-x", `${currentX.toFixed(2)}px`);
          heroEl.style.setProperty("--parallax-y", `${currentY.toFixed(2)}px`);

          if (
            Math.abs(targetX - currentX) > 0.1 ||
            Math.abs(targetY - currentY) > 0.1
          ) {
            rafId = requestAnimationFrame(loop);
          } else {
            rafId = null;
          }
        };
        rafId = requestAnimationFrame(loop);
      }
    };

    heroEl.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      heroEl.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStartPlay = useCallback(() => {
    setIsVideoPlaying(true);
    // Autofocus iframe when ready for keyboard navigation
    setTimeout(() => {
      iframeRef.current?.focus();
    }, 150);
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Performance Video Editor Hero"
      className="relative min-h-[100dvh] w-full bg-[#050505] text-[#F7F7F7] overflow-x-hidden selection:bg-[#7C3AED] selection:text-white font-['Satoshi',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]"
      style={
        {
          "--parallax-x": "0px",
          "--parallax-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* ==================================================================== */}
      {/* 1. EMBEDDED STYLES: Keyframes, Staggers, Reduced Motion Handling    */}
      {/* ==================================================================== */}
      <style>{`
        @keyframes heroFadeUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes ambientFloatOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(30px, -40px, 0) scale(1.1);
          }
        }

        @keyframes ambientFloatTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-35px, 30px, 0) scale(1.08);
          }
        }

        @keyframes subtlePulse {
          0%, 100% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.28;
          }
        }

        /* Staggered entrance classes */
        .anim-nav {
          animation: heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-eyebrow {
          animation: heroFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }
        .anim-headline {
          animation: heroFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.18s forwards;
          opacity: 0;
        }
        .anim-subtext {
          animation: heroFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s forwards;
          opacity: 0;
        }
        .anim-cta {
          animation: heroFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s forwards;
          opacity: 0;
        }
        .anim-video {
          animation: heroFadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
          opacity: 0;
        }

        /* Background atmospheric glow animations */
        .bg-orb-violet {
          animation: ambientFloatOne 16s ease-in-out infinite alternate, subtlePulse 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .bg-orb-pink {
          animation: ambientFloatTwo 20s ease-in-out infinite alternate;
          will-change: transform;
        }

        /* Accessibility: Strict Reduced Motion handling */
        @media (prefers-reduced-motion: reduce) {
          .anim-nav,
          .anim-eyebrow,
          .anim-headline,
          .anim-subtext,
          .anim-cta,
          .anim-video {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .bg-orb-violet,
          .bg-orb-pink {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ==================================================================== */}
      {/* 2. CINEMATIC AMBIENT BACKGROUND (Lightweight CSS, No Heavy Canvas)   */}
      {/* ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        {/* Subtle SVG micro-noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Primary Ambient Orb: Electric Violet (#7C3AED) */}
        <div
          className="bg-orb-violet absolute -top-[12%] -left-[8%] w-[38rem] sm:w-[52rem] h-[38rem] sm:h-[52rem] rounded-full bg-[#7C3AED] opacity-20 blur-[130px] sm:blur-[170px]"
          style={{
            transform:
              "translate3d(calc(var(--parallax-x) * 1.2), calc(var(--parallax-y) * 1.2), 0)",
          }}
        />

        {/* Secondary Accent Orb: Hot Pink (#FF2DA6) */}
        <div
          className="bg-orb-pink absolute top-[28%] -right-[10%] w-[26rem] sm:w-[38rem] h-[26rem] sm:h-[38rem] rounded-full bg-[#FF2DA6] opacity-[0.11] blur-[120px] sm:blur-[160px]"
          style={{
            transform:
              "translate3d(calc(var(--parallax-x) * -0.8), calc(var(--parallax-y) * -0.8), 0)",
          }}
        />

        {/* Architectural Grid Lines (Subtle editorial texture) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        {/* Bottom dark vignette feather */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* ==================================================================== */}
      {/* 3. 2027 FLOATING CAPSULE NAVBAR                                      */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-50 w-full pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 anim-nav">
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0A0A0A]/80 px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14]"
          >
            {/* Brand Logo / Monogram */}
            <a
              href="#"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-full p-1"
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#FF2DA6] p-[1px]">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-[#050505] text-xs sm:text-sm font-black tracking-tighter text-[#F7F7F7] transition-all duration-300 group-hover:bg-transparent">
                  {brandName.slice(0, 2).toUpperCase()}
                </span>
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-[#F7F7F7] transition-colors duration-200 group-hover:text-white">
                  {brandName}
                </span>
                <span className="text-[10px] font-medium tracking-widest text-[#A1A1AA] uppercase">
                  {brandTagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative py-1 text-sm font-medium text-[#A1A1AA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-md px-1"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#FF2DA6] opacity-0 shadow-[0_0_8px_#7C3AED] transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#7C3AED] px-5 py-2.5 text-xs lg:text-sm font-bold text-[#F7F7F7] shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#6D28D9] hover:shadow-[0_0_35px_rgba(124,58,237,0.55)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2DA6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <span>Let&apos;s Work Together</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="flex md:hidden relative z-50 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#F7F7F7] transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
            >
              <div className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? "translate-y-[7px] rotate-45"
                      : "translate-y-0"
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ease-out ${
                    isMobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : "translate-y-0"
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 4. FULL-SCREEN MOBILE OVERLAY MENU (100dvh safe, locks body scroll)  */}
      {/* ==================================================================== */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#050505]/98 px-6 py-24 backdrop-blur-2xl md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[100dvh] ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Subtle violet ambient light inside mobile menu */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#7C3AED] opacity-25 blur-[90px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col space-y-6 pt-6">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#A1A1AA] uppercase">
            Menu Navigation
          </p>
          <ul className="flex flex-col space-y-5">
            {NAV_LINKS.map((link, idx) => (
              <li
                key={link.label}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${idx * 60 + 100}ms` : "0ms",
                }}
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              >
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-3xl font-extrabold tracking-tight text-[#F7F7F7] hover:text-[#7C3AED] transition-colors duration-200 py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Action Buttons */}
        <div className="relative z-10 flex flex-col space-y-3 pt-8 border-t border-white/[0.08]">
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] py-4 text-center font-bold text-[#F7F7F7] shadow-[0_0_25px_rgba(124,58,237,0.4)] active:scale-[0.98] transition-all"
          >
            <span>Let&apos;s Work Together</span>
            <span>↗</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-4 text-center font-semibold text-[#F7F7F7] transition-all hover:bg-white/[0.08] active:scale-[0.98]"
          >
            <span>WhatsApp Direct</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. MAIN HERO CONTENT: Split-Screen Editorial Composition             */}
      {/* ==================================================================== */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 md:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          
          {/* ---------------------------------------------------------------- */}
          {/* LEFT COLUMN: Typography, Positioning, CTAs                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col items-start lg:col-span-7 xl:col-span-7">
            
            {/* Eyebrow with live pulse indicator */}
            <div className="anim-eyebrow mb-4 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#0A0A0A]/90 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C3AED] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C3AED]" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#A1A1AA] uppercase">
                VIDEO EDITOR · META ADS · UGC · VSL
              </span>
            </div>

            {/* Oversized Headline */}
            <h1 className="anim-headline text-balance font-extrabold tracking-[-0.035em] text-[#F7F7F7] leading-[0.94] text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem]">
              I EDIT VIDEOS
              <br />
              THAT MAKE PEOPLE
              <br />
              <span className="relative inline-block mt-1">
                {/* Refined Electric Violet -> Subtle Hot Pink gradient highlight */}
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#FF2DA6] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(124,58,237,0.35)]">
                  STOP.
                </span>
                {/* Ultra-subtle underglow line */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C3AED]/70 via-[#FF2DA6]/40 to-transparent rounded-full"
                />
              </span>
            </h1>

            {/* Supporting Pitch Paragraph */}
            <p className="anim-subtext mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#A1A1AA]">
              Helping DTC brands and ecommerce teams turn raw footage into
              high-converting UGC ads, VSLs, and scroll-stopping social content.
            </p>

            {/* CTA Action Cluster */}
            <div className="anim-cta mt-8 sm:mt-10 flex w-full flex-col sm:w-auto sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA */}
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-8 py-4 text-center text-sm sm:text-base font-bold text-[#F7F7F7] shadow-[0_0_28px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#6D28D9] hover:shadow-[0_0_45px_rgba(124,58,237,0.6)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2DA6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                <span>Start a Project</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              {/* Secondary CTA: Real Anchor to WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-4 text-center text-sm sm:text-base font-semibold text-[#F7F7F7] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.24] hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                {/* Minimalist WhatsApp glyph */}
                <svg
                  className="h-4 w-4 fill-current text-[#25D366] transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp Me</span>
              </a>
            </div>

            {/* Performance Social Proof / DTC Conversion Metric Badges */}
            <div className="anim-cta mt-10 pt-8 border-t border-white/[0.08] w-full grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#F7F7F7] tracking-tight">
                  $14M+
                </span>
                <span className="block text-[11px] sm:text-xs text-[#A1A1AA] uppercase tracking-wider font-medium mt-0.5">
                  Ad Revenue
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#F7F7F7] tracking-tight">
                  3.8x
                </span>
                <span className="block text-[11px] sm:text-xs text-[#A1A1AA] uppercase tracking-wider font-medium mt-0.5">
                  Avg. ROAS
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#F7F7F7] tracking-tight">
                  48h
                </span>
                <span className="block text-[11px] sm:text-xs text-[#A1A1AA] uppercase tracking-wider font-medium mt-0.5">
                  Turnaround
                </span>
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Cinematic Video Showcase Frame                     */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-5 anim-video">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              
              {/* Subtle background glow radiating behind the video frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#7C3AED]/40 to-[#FF2DA6]/20 opacity-60 blur-xl transition-all duration-500 group-hover:opacity-90"
              />

              {/* Main 16:9 Aspect Video Container (Zero CLS layout guarantee) */}
              <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0A0A0A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:scale-[1.015]">
                
                {/* 
                  PERFORMANCE CORE: 
                  If video has NOT been clicked yet, render purely lightweight poster container.
                  NO YouTube iframe overhead or third-party JS executes during initial render!
                */}
                {!isVideoPlaying ? (
                  <div className="relative h-full w-full">
                    
                    {/* Fallback CSS gradient in case thumbnail takes time or fails */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#121217] via-[#0A0A0E] to-[#050505]" />

                    {/* YouTube High-Res Poster Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={posterUrl}
                      alt="VSL and Meta Ads Showreel Video Preview"
                      loading="eager"
                      onLoad={() => setIsPosterLoaded(true)}
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        isPosterLoaded
                          ? "opacity-85 scale-100 filter-none"
                          : "opacity-0 scale-105"
                      } group-hover:scale-105`}
                    />

                    {/* Dark gradient film tint over the preview poster */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-widest text-[#F7F7F7] backdrop-blur-md uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF2DA6]" />
                        2027 SHOWREEL
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono font-medium text-[#A1A1AA] backdrop-blur-md">
                        4K UHD · 60FPS
                      </span>
                    </div>

                    {/* Bottom Metadata bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">
                          HIGH-RETENTION VSL CUT
                        </p>
                        <p className="text-[11px] text-[#A1A1AA]">
                          Duration: 01:24 · Conversion Focused
                        </p>
                      </div>
                    </div>

                    {/* Interactive Play Affordance Button */}
                    <button
                      type="button"
                      onClick={handleStartPlay}
                      aria-label="Play showreel video"
                      className="absolute inset-0 m-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/20 bg-[#050505]/75 text-white backdrop-blur-md shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-110 hover:border-[#7C3AED] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C3AED]"
                    >
                      {/* CSS Play Icon Triangle */}
                      <span
                        className="ml-1 inline-block h-0 w-0 border-y-[10px] sm:border-y-[12px] border-y-transparent border-l-[18px] sm:border-l-[22px] border-l-white transition-all duration-200 group-hover:border-l-[#F7F7F7]"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : (
                  /* Dynamically loaded YouTube iframe after user interaction */
                  <iframe
                    ref={iframeRef}
                    className="h-full w-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title="Performance Video Showreel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Editorial Frame Accent Description */}
              <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-[#A1A1AA] font-mono">
                <span>[DIRECTOR&apos;S CUT]</span>
                <span>META ADS / DTC PERFORMANCE</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </section>
  );
}


// 3rd

"use client";

import { useEffect, useRef, useState } from "react";

const BRAND_NAME = "VIOLET//FRAME";
const YOUTUBE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const WHATSAPP_NUMBER = "923460918797";

const NAVIGATION_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const videoId =
      parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v") ??
          parsed.pathname.split("/").filter(Boolean).pop();

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : url;
  } catch {
    return url;
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (!mediaQuery.matches || !heroRef.current) return;

      const bounds = heroRef.current.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      heroRef.current.style.setProperty("--pointer-x", x.toFixed(3));
      heroRef.current.style.setProperty("--pointer-y", y.toFixed(3));
    };

    const resetPointer = () => {
      heroRef.current?.style.setProperty("--pointer-x", "0");
      heroRef.current?.style.setProperty("--pointer-y", "0");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-label={`${BRAND_NAME} creative agency introduction`}
    >
      <div className="hero__ambient hero__ambient--violet" aria-hidden="true" />
      <div className="hero__ambient hero__ambient--pink" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb" aria-hidden="true" />
      <div className="hero__ring" aria-hidden="true" />
      <div className="hero__panel" aria-hidden="true" />
      <div className="hero__shard" aria-hidden="true" />

      <nav className="nav" aria-label="Primary navigation">
        <a className="nav__brand" href="/" aria-label={`${BRAND_NAME} home`}>
          <span className="nav__mark" aria-hidden="true">
            V/
          </span>
          <span>{BRAND_NAME}</span>
        </a>

        <div className="nav__links">
          {NAVIGATION_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav__cta" href="#contact">
          Let&apos;s Work Together <span aria-hidden="true">↗</span>
        </a>

        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu__inner">
          <p className="mobile-menu__label">Navigate</p>
          <div className="mobile-menu__links">
            {NAVIGATION_ITEMS.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                style={{ transitionDelay: `${100 + index * 55}ms` }}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </div>
          <a
            className="mobile-menu__cta"
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            Let&apos;s Work Together <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="hero__content">
        <div className="hero__copy">
          <p className="eyebrow">
            VIDEO EDITOR <i /> META ADS <i /> UGC <i /> VSL
          </p>

          <h1>
            EDITING THAT
            <br />
            MAKES PEOPLE <span>STOP.</span>
          </h1>

          <p className="hero__description">
            Helping DTC brands and ecommerce teams turn raw footage into
            high-converting UGC ads, VSLs, and scroll-stopping social content.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Start a Project <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button--secondary"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="video-wrap">
          <div className="video-frame">
            <div className="video-frame__topline">
              <span>VSL / 001</span>
              <span className="live-dot">Showreel</span>
            </div>

            {videoLoaded ? (
              <iframe
                className="video-frame__iframe"
                src={getYouTubeEmbedUrl(YOUTUBE_URL)}
                title={`${BRAND_NAME} showreel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                className="video-poster"
                type="button"
                aria-label="Play agency showreel"
                onClick={() => setVideoLoaded(true)}
              >
                <span className="video-poster__grain" aria-hidden="true" />
                <span className="video-poster__light" aria-hidden="true" />
                <span className="video-poster__type">
                  PERFORMANCE
                  <br />
                  IN MOTION
                </span>
                <span className="play-button" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 7.5 17 12l-8 4.5v-9Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="video-poster__caption">
                  Play showreel <b>01:14</b>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          --pointer-x: 0;
          --pointer-y: 0;
          position: relative;
          isolation: isolate;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #050505;
          color: #f5f5f5;
          font-family: Satoshi, "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          z-index: -5;
          opacity: 0.24;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, transparent 76%);
        }

        .hero__ambient {
          position: absolute;
          z-index: -4;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(12px);
          will-change: transform;
        }

        .hero__ambient--violet {
          width: clamp(420px, 52vw, 860px);
          aspect-ratio: 1;
          top: -26%;
          right: -10%;
          opacity: 0.86;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, 0.2) 0%,
            rgba(124, 58, 237, 0.075) 34%,
            transparent 66%
          );
          transform: translate3d(
            calc(var(--pointer-x) * 14px),
            calc(var(--pointer-y) * 10px),
            0
          );
          animation: breathe 14s ease-in-out infinite alternate;
        }

        .hero__ambient--pink {
          width: 380px;
          aspect-ratio: 1;
          bottom: -21%;
          left: 28%;
          opacity: 0.8;
          background: radial-gradient(
            circle,
            rgba(255, 45, 166, 0.1),
            transparent 64%
          );
          transform: translate3d(
            calc(var(--pointer-x) * -9px),
            calc(var(--pointer-y) * -8px),
            0
          );
        }

        .hero__orb,
        .hero__ring,
        .hero__panel,
        .hero__shard {
          position: absolute;
          z-index: -2;
          pointer-events: none;
        }

        .hero__orb {
          top: 27%;
          right: 7%;
          width: clamp(50px, 5vw, 88px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(
            circle at 32% 28%,
            rgba(255, 255, 255, 0.78),
            rgba(173, 120, 255, 0.55) 15%,
            rgba(124, 58, 237, 0.26) 42%,
            transparent 70%
          );
          filter: blur(1px);
          box-shadow: 0 0 48px rgba(124, 58, 237, 0.45);
          transform: translate3d(
            calc(var(--pointer-x) * -20px),
            calc(var(--pointer-y) * -15px),
            0
          );
          animation: float 9s ease-in-out infinite;
        }

        .hero__ring {
          width: clamp(155px, 17vw, 270px);
          aspect-ratio: 1;
          right: -6%;
          bottom: 4%;
          border: 1px solid rgba(238, 225, 255, 0.3);
          border-left-color: rgba(124, 58, 237, 0.85);
          border-radius: 50%;
          box-shadow:
            inset 10px 0 18px rgba(124, 58, 237, 0.1),
            0 0 40px rgba(124, 58, 237, 0.1);
          transform: perspective(700px) rotateX(67deg) rotateZ(-24deg)
            translate3d(
              calc(var(--pointer-x) * -10px),
              calc(var(--pointer-y) * -8px),
              0
            );
          animation: ring-turn 17s linear infinite;
        }

        .hero__panel {
          width: clamp(115px, 13vw, 220px);
          height: clamp(135px, 15vw, 255px);
          top: 15%;
          left: -3%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 22px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.09),
            rgba(124, 58, 237, 0.015) 52%,
            rgba(255, 45, 166, 0.05)
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 20px 70px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          transform: perspective(800px) rotateY(46deg) rotateX(-10deg)
            translate3d(
              calc(var(--pointer-x) * 8px),
              calc(var(--pointer-y) * 8px),
              0
            );
          animation: panel-float 12s ease-in-out infinite alternate;
        }

        .hero__shard {
          width: 26px;
          height: 72px;
          top: 18%;
          right: 27%;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          background: linear-gradient(
            155deg,
            rgba(255, 255, 255, 0.24),
            rgba(124, 58, 237, 0.05)
          );
          box-shadow: 0 0 25px rgba(255, 45, 166, 0.15);
          transform: rotate(34deg) translate3d(
            calc(var(--pointer-x) * -13px),
            calc(var(--pointer-y) * -12px),
            0
          );
          animation: float 11s ease-in-out infinite reverse;
        }

        .nav {
          position: absolute;
          z-index: 20;
          top: max(18px, env(safe-area-inset-top));
          left: 50%;
          width: min(calc(100% - 32px), 940px);
          min-height: 52px;
          padding: 5px 7px 5px 15px;
          display: flex;
          align-items: center;
          gap: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          background:
            linear-gradient(105deg, rgba(255, 255, 255, 0.065), transparent 34%),
            rgba(10, 10, 10, 0.65);
          box-shadow:
            0 16px 45px rgba(0, 0, 0, 0.32),
            0 0 30px rgba(124, 58, 237, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          transform: translateX(-50%);
          animation: nav-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both 0.1s;
        }

        .nav__brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          color: #f5f5f5;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-decoration: none;
        }

        .nav__mark {
          display: grid;
          width: 25px;
          aspect-ratio: 1;
          place-items: center;
          border-radius: 50%;
          color: #fff;
          background: linear-gradient(135deg, #8b5cf6, #5b21b6);
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.48);
          font-size: 0.62rem;
          letter-spacing: -0.08em;
        }

        .nav__links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 2vw, 30px);
          margin-left: auto;
        }

        .nav__links a,
        .nav__cta {
          position: relative;
          color: #b8b8c0;
          font-size: 0.77rem;
          font-weight: 600;
          text-decoration: none;
          transition:
            color 180ms ease,
            transform 180ms ease;
        }

        .nav__links a::after {
          position: absolute;
          right: 0;
          bottom: -5px;
          left: 0;
          height: 1px;
          background: #a78bfa;
          content: "";
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 180ms ease;
        }

        .nav__links a:hover,
        .nav__links a:focus-visible {
          color: #fff;
          transform: translateY(-1px);
        }

        .nav__links a:hover::after,
        .nav__links a:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav__cta {
          overflow: hidden;
          padding: 10px 13px;
          border: 1px solid rgba(167, 139, 250, 0.34);
          border-radius: 999px;
          color: #fff;
          background: rgba(124, 58, 237, 0.18);
        }

        .nav__cta:hover,
        .nav__cta:focus-visible {
          border-color: rgba(196, 181, 253, 0.75);
          background: rgba(124, 58, 237, 0.31);
          box-shadow: 0 0 22px rgba(124, 58, 237, 0.25);
          transform: translateY(-1px);
        }

        .menu-button {
          display: none;
          width: 40px;
          height: 40px;
          margin-left: auto;
          padding: 0;
          place-content: center;
          gap: 4px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 50%;
          color: white;
          background: rgba(255, 255, 255, 0.045);
          cursor: pointer;
        }

        .menu-button span {
          display: block;
          width: 15px;
          height: 1px;
          margin: 0 auto;
          background: currentColor;
          transition:
            transform 230ms ease,
            opacity 180ms ease;
        }

        .menu-button.is-open span:nth-child(1) {
          transform: translateY(5px) rotate(45deg);
        }

        .menu-button.is-open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0.3);
        }

        .menu-button.is-open span:nth-child(3) {
          transform: translateY(-5px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          z-index: 15;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 100px 28px 32px;
          opacity: 0;
          visibility: hidden;
          background: rgba(5, 5, 5, 0.88);
          backdrop-filter: blur(24px);
          transition:
            opacity 250ms ease,
            visibility 250ms ease;
        }

        .mobile-menu.is-open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu__inner {
          width: min(100%, 430px);
        }

        .mobile-menu__label {
          margin: 0 0 20px;
          color: #a78bfa;
          font-size: 0.67rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .mobile-menu__links {
          display: grid;
          gap: 3px;
        }

        .mobile-menu__links a {
          display: flex;
          align-items: baseline;
          gap: 16px;
          color: #f5f5f5;
          font-size: clamp(2rem, 9vw, 3.35rem);
          font-weight: 750;
          letter-spacing: -0.065em;
          line-height: 1.05;
          text-decoration: none;
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 380ms ease,
            transform 380ms cubic-bezier(0.16, 1, 0.3, 1),
            color 180ms ease;
        }

        .mobile-menu.is-open .mobile-menu__links a {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu__links a span {
          color: #8b5cf6;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0;
        }

        .mobile-menu__links a:hover,
        .mobile-menu__links a:focus-visible {
          color: #c4b5fd;
        }

        .mobile-menu__cta {
          display: inline-flex;
          gap: 8px;
          margin-top: 34px;
          padding: 13px 16px;
          border: 1px solid rgba(167, 139, 250, 0.45);
          border-radius: 10px;
          color: #fff;
          background: rgba(124, 58, 237, 0.18);
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
        }

        .hero__content {
          width: min(100% - 48px, 1240px);
          margin: auto;
          padding-top: 84px;
          display: grid;
          grid-template-columns: minmax(0, 0.84fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(38px, 6vw, 106px);
        }

        .hero__copy {
          position: relative;
          z-index: 2;
          padding: clamp(12px, 2vw, 24px) 0;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 clamp(17px, 2vw, 26px);
          color: #adadb7;
          font-size: clamp(0.57rem, 0.66vw, 0.67rem);
          font-weight: 800;
          letter-spacing: 0.135em;
          line-height: 1.5;
          opacity: 0;
          animation: rise-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both 0.2s;
        }

        .eyebrow i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px #8b5cf6;
        }

        h1 {
          max-width: 610px;
          margin: 0;
          color: #f5f5f5;
          font-size: clamp(2.45rem, 4.55vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.07em;
          line-height: 0.94;
          text-wrap: balance;
          opacity: 0;
          animation: rise-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both 0.3s;
        }

        h1 span {
          background: linear-gradient(105deg, #9f7aea 20%, #d946ef 105%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero__description {
          max-width: 500px;
          margin: clamp(18px, 2.2vw, 29px) 0 0;
          color: #a1a1aa;
          font-size: clamp(0.85rem, 1vw, 1rem);
          font-weight: 500;
          line-height: 1.6;
          opacity: 0;
          animation: rise-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both 0.45s;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: clamp(22px, 2.6vw, 34px);
          opacity: 0;
          animation: rise-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both 0.55s;
        }

        .button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 46px;
          padding: 0 16px;
          border: 1px solid transparent;
          border-radius: 9px;
          color: #fff;
          font-size: 0.73rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            transform 190ms ease,
            border-color 190ms ease,
            box-shadow 190ms ease,
            background 190ms ease;
        }

        .button::before {
          position: absolute;
          z-index: -1;
          top: -100%;
          width: 45%;
          height: 300%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.23),
            transparent
          );
          content: "";
          transform: rotate(24deg) translateX(-260%);
          transition: transform 550ms ease;
        }

        .button:hover::before,
        .button:focus-visible::before {
          transform: rotate(24deg) translateX(420%);
        }

        .button:hover,
        .button:focus-visible {
          transform: translateY(-2px);
        }

        .button--primary {
          border-color: rgba(196, 181, 253, 0.55);
          background: linear-gradient(120deg, #6d28d9, #8b5cf6);
          box-shadow:
            0 10px 28px rgba(124, 58, 237, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .button--primary:hover,
        .button--primary:focus-visible {
          box-shadow:
            0 14px 34px rgba(124, 58, 237, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.32);
        }

        .button--secondary {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.035);
        }

        .button--secondary:hover,
        .button--secondary:focus-visible {
          border-color: rgba(196, 181, 253, 0.58);
          background: rgba(124, 58, 237, 0.12);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.22);
        }

        .video-wrap {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(18px);
          animation: video-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both 0.36s;
        }

        .video-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: clamp(15px, 1.6vw, 23px);
          background: #0d0d10;
          box-shadow:
            18px 28px 70px rgba(0, 0, 0, 0.52),
            0 0 65px rgba(124, 58, 237, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          transform: perspective(1200px) rotateY(-2deg) rotateX(1deg)
            translate3d(
              calc(var(--pointer-x) * 5px),
              calc(var(--pointer-y) * -5px),
              0
            );
          transition: transform 180ms ease-out;
        }

        .video-frame::before {
          position: absolute;
          z-index: 3;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
          content: "";
          pointer-events: none;
        }

        .video-frame::after {
          position: absolute;
          z-index: 4;
          top: -110%;
          left: -45%;
          width: 28%;
          height: 340%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          content: "";
          transform: rotate(26deg);
          pointer-events: none;
          animation: glass-sweep 10s ease-in-out infinite;
        }

        .video-frame__topline {
          position: absolute;
          z-index: 5;
          top: 14px;
          right: 16px;
          left: 16px;
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(0.5rem, 0.62vw, 0.62rem);
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .live-dot {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .live-dot::before {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d946ef;
          box-shadow: 0 0 9px #ff2da6;
          content: "";
        }

        .video-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          padding: 0;
          overflow: hidden;
          border: 0;
          color: #fff;
          background:
            radial-gradient(circle at 75% 43%, rgba(124, 58, 237, 0.78), transparent 12%),
            radial-gradient(circle at 48% 80%, rgba(255, 45, 166, 0.22), transparent 31%),
            linear-gradient(118deg, #111116 0%, #0a0810 47%, #16101c 100%);
          cursor: pointer;
          text-align: left;
        }

        .video-poster__grain {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.23) 0.6px,
            transparent 0.7px
          );
          background-size: 5px 5px;
          mix-blend-mode: soft-light;
        }

        .video-poster__light {
          position: absolute;
          width: 76%;
          aspect-ratio: 1;
          top: -36%;
          left: 26%;
          border-radius: 50%;
          border: 1px solid rgba(235, 225, 255, 0.18);
          box-shadow:
            0 0 0 16px rgba(124, 58, 237, 0.04),
            0 0 0 46px rgba(124, 58, 237, 0.025);
          transform: rotate(-23deg);
        }

        .video-poster__type {
          position: absolute;
          left: clamp(20px, 4vw, 42px);
          bottom: clamp(28px, 5vw, 53px);
          color: rgba(255, 255, 255, 0.92);
          font-size: clamp(1.25rem, 3vw, 2.65rem);
          font-weight: 800;
          letter-spacing: -0.07em;
          line-height: 0.88;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          display: grid;
          width: clamp(48px, 5vw, 70px);
          aspect-ratio: 1;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.44);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          box-shadow:
            0 0 0 9px rgba(255, 255, 255, 0.045),
            0 10px 32px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
          transform: translate(-50%, -50%);
          transition:
            transform 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .play-button svg {
          width: 28%;
          margin-left: 3px;
        }

        .video-poster:hover .play-button,
        .video-poster:focus-visible .play-button {
          background: rgba(124, 58, 237, 0.68);
          box-shadow:
            0 0 0 11px rgba(124, 58, 237, 0.13),
            0 0 32px rgba(124, 58, 237, 0.5);
          transform: translate(-50%, -50%) scale(1.08);
        }

        .video-poster__caption {
          position: absolute;
          right: clamp(18px, 3vw, 29px);
          bottom: clamp(17px, 3vw, 25px);
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(0.54rem, 0.68vw, 0.66rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .video-poster__caption b {
          margin-left: 7px;
          color: #d8b4fe;
          font-weight: 800;
        }

        .video-frame__iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        :global(a:focus-visible),
        :global(button:focus-visible) {
          outline: 2px solid #c4b5fd;
          outline-offset: 3px;
        }

        @keyframes nav-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes rise-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes video-in {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes breathe {
          from {
            scale: 0.94;
            opacity: 0.65;
          }
          to {
            scale: 1.07;
            opacity: 0.92;
          }
        }

        @keyframes float {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: -16px;
          }
        }

        @keyframes ring-turn {
          from {
            rotate: 0deg;
          }
          to {
            rotate: 360deg;
          }
        }

        @keyframes panel-float {
          from {
            margin-top: 0;
          }
          to {
            margin-top: 22px;
          }
        }

        @keyframes glass-sweep {
          0%,
          55% {
            transform: rotate(26deg) translateX(-180%);
          }
          74%,
          100% {
            transform: rotate(26deg) translateX(720%);
          }
        }

        @media (max-width: 820px) {
          .hero {
            display: block;
            min-height: 100svh;
            padding: 92px 0 max(20px, env(safe-area-inset-bottom));
          }

          .nav {
            width: calc(100% - 28px);
            min-height: 50px;
            padding-left: 13px;
          }

          .nav__links,
          .nav__cta {
            display: none;
          }

          .menu-button {
            display: grid;
          }

          .hero__content {
            width: min(100% - 40px, 560px);
            min-height: calc(100svh - 112px);
            padding: 0;
            grid-template-columns: 1fr;
            align-content: center;
            gap: clamp(20px, 3vh, 30px);
          }

          .hero__copy {
            padding: 0;
          }

          .eyebrow {
            margin-bottom: 13px;
          }

          h1 {
            max-width: 450px;
            font-size: clamp(2.2rem, 10.5vw, 3.9rem);
            line-height: 0.91;
          }

          .hero__description {
            max-width: 470px;
            margin-top: 16px;
            font-size: clamp(0.81rem, 3.4vw, 0.95rem);
            line-height: 1.5;
          }

          .hero__actions {
            margin-top: 19px;
          }

          .video-wrap {
            width: min(100%, 540px);
          }

          .video-frame {
            transform: perspective(1000px) rotateY(-1deg) rotateX(0.5deg);
          }

          .hero__panel {
            top: 12%;
            left: -16%;
            opacity: 0.58;
          }

          .hero__orb {
            top: auto;
            right: 1%;
            bottom: 6%;
            opacity: 0.58;
          }

          .hero__ring {
            right: -17%;
            bottom: -3%;
            opacity: 0.65;
          }

          .hero__shard {
            top: 13%;
            right: 7%;
            opacity: 0.55;
          }
        }

        @media (max-width: 430px) {
          .hero {
            padding-top: 82px;
          }

          .hero__content {
            width: calc(100% - 32px);
            min-height: calc(100svh - 98px);
            gap: 19px;
          }

          .nav {
            top: max(12px, env(safe-area-inset-top));
            width: calc(100% - 24px);
          }

          .nav__brand {
            font-size: 0.62rem;
          }

          .hero__actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .button {
            min-height: 43px;
            padding: 0 10px;
            font-size: 0.63rem;
            letter-spacing: 0.055em;
          }

          .video-frame__topline {
            top: 11px;
            right: 12px;
            left: 12px;
          }
        }

        @media (max-height: 740px) and (min-width: 821px) {
          .hero__content {
            width: min(100% - 64px, 1160px);
            gap: 60px;
            padding-top: 62px;
          }

          h1 {
            font-size: clamp(2.8rem, 4.15vw, 4.2rem);
          }

          .hero__description {
            margin-top: 17px;
          }

          .hero__actions {
            margin-top: 21px;
          }
        }

        @media (max-height: 760px) and (max-width: 820px) {
          .hero__content {
            gap: 15px;
          }

          .eyebrow {
            margin-bottom: 10px;
          }

          h1 {
            font-size: clamp(2rem, 9.2vw, 2.7rem);
          }

          .hero__description {
            margin-top: 12px;
            font-size: 0.8rem;
          }

          .hero__actions {
            margin-top: 14px;
          }

          .button {
            min-height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }

          .video-frame,
          .hero__ambient,
          .hero__orb,
          .hero__ring,
          .hero__panel,
          .hero__shard {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}


// 4th 

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* -------------------------------------------------------------------------- */
/*  Editable configuration                                                     */
/* -------------------------------------------------------------------------- */

/*  The single source of truth for the featured video. Swap this one constant
    and the click-to-load facade, embed URL and play handler all update.      */
const YOUTUBE_URL = "https://www.youtube.com/watch?v=ysz5S6PUM-U";

/*  Lightweight local poster rendered before any YouTube code is requested.
    Set to `null` to use the built-in CSS-only poster instead of an asset.    */
const POSTER_SRC: string | null = "/images/hero-poster.jpg";

const VIDEO_TITLE = "Evergreen VSL — Featured Work";
const VIDEO_DURATION = "02:41";

const WHATSAPP_URL =
  "https://wa.me/923460918797?text=Hi%20Arslan%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20talk%20about%20video%20creative%20for%20my%20brand.";
const CONTACT_HREF = "#contact";

const BRAND_NAME = "ARSLAN";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
] as const;

const FONT_STACK =
  'Satoshi, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

/* -------------------------------------------------------------------------- */
/*  Derived values + tiny helpers                                              */
/* -------------------------------------------------------------------------- */

type CSSVarStyle = CSSProperties & Record<`--${string}`, string>;

const withDelay = (ms: number): CSSVarStyle => ({ "--d": `${ms}ms` });

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,20})/
  );
  return match ? match[1] : null;
}

const YOUTUBE_ID = getYouTubeId(YOUTUBE_URL);

/*  Performance-critical: this embed URL is only ever assigned to an <iframe>
    AFTER a deliberate user gesture, so zero third-party YouTube JavaScript is
    requested on initial page load (LCP / INP stay untouched).                */
const EMBED_URL = YOUTUBE_ID
  ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`
  : null;

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

/* -------------------------------------------------------------------------- */
/*  Inline icons (no icon-library dependency)                                  */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };

function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function IconPlay({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9.2 7.65c0-.98 1.08-1.58 1.93-1.06l7.02 4.35a1.25 1.25 0 0 1 0 2.12l-7.02 4.35a1.25 1.25 0 0 1-1.93-1.06z" />
    </svg>
  );
}

function IconWhatsApp({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1.5-1 .8a4.7 4.7 0 0 1-1.7-1.7l.8-1-1.5-2z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animation stylesheet (hoisted to <head> by React, deduped by href).        */
/*  Every animation lives behind `prefers-reduced-motion: no-preference` —     */
/*  with reduced motion the markup renders in its final state instantly.       */
/* -------------------------------------------------------------------------- */

const HERO_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .hero-scope .hero-fade-in {
    opacity: 0;
    animation: hero-fade-in 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
    animation-delay: var(--d, 0ms);
  }
  .hero-scope .hero-nav-in {
    opacity: 0;
    animation: hero-nav-in 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.06s forwards;
  }
  .hero-scope .hero-video-in {
    opacity: 0;
    animation: hero-video-in 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
    animation-delay: var(--d, 0ms);
  }
  .hero-scope .hero-underline-x {
    transform: scaleX(0);
    transform-origin: left;
    animation: hero-underline-x 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) 0.9s forwards;
  }
  .hero-scope .hero-orb-a {
    animation: hero-orb-a 17s ease-in-out infinite alternate;
    will-change: transform;
  }
  .hero-scope .hero-orb-b {
    animation: hero-orb-b 22s ease-in-out infinite alternate;
    will-change: transform;
  }
  .hero-scope .hero-orb-c {
    animation: hero-orb-c 36s linear infinite;
    will-change: transform;
  }
  .hero-scope .hero-accent-pan {
    background-size: 200% 100%;
    animation: hero-accent-pan 9s ease-in-out infinite alternate;
  }
  .hero-scope .hero-dot-ping {
    animation: hero-dot-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .hero-scope .hero-play-pulse {
    animation: hero-play-pulse 3.2s ease-out infinite;
  }
  .hero-scope .hero-scroll-beam {
    animation: hero-scroll-beam 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }
}

@keyframes hero-fade-in {
  from { opacity: 0; transform: translate3d(0, 22px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hero-nav-in {
  from { opacity: 0; transform: translate3d(0, -14px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hero-video-in {
  from { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.985); }
  to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hero-underline-x {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes hero-orb-a {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to   { transform: translate3d(5vw, 4vh, 0) scale(1.12); }
}
@keyframes hero-orb-b {
  from { transform: translate3d(0, 0, 0) scale(1.06); }
  to   { transform: translate3d(-4vw, -3vh, 0) scale(1); }
}
@keyframes hero-orb-c {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes hero-accent-pan {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}
@keyframes hero-dot-ping {
  0%        { transform: scale(1); opacity: 0.8; }
  70%, 100% { transform: scale(2.6); opacity: 0; }
}
@keyframes hero-play-pulse {
  0%        { transform: scale(1); opacity: 0.55; }
  70%, 100% { transform: scale(1.55); opacity: 0; }
}
@keyframes hero-scroll-beam {
  from { transform: translateY(-100%); }
  to   { transform: translateY(200%); }
}

/* Reduced motion: keep every state change, remove the motion. */
@media (prefers-reduced-motion: reduce) {
  .hero-scope *,
  .hero-scope *::before,
  .hero-scope *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
`;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const parallax = useRef({ x: 0, y: 0, frame: 0 });

  /* Mobile menu: Escape support + body scroll lock (restored on close). */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /* Extremely subtle pointer parallax for the ambient glow. Desktop/fine
     pointers only, no React state — writes two CSS variables through a
     rAF-throttled handler, so there are zero re-renders and ~zero cost. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!finePointer.matches || !motionOk.matches) return;

    const state = parallax.current;

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      state.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      state.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      if (state.frame) return;
      state.frame = window.requestAnimationFrame(() => {
        state.frame = 0;
        root.style.setProperty("--px", state.x.toFixed(3));
        root.style.setProperty("--py", state.y.toFixed(3));
      });
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      if (state.frame) window.cancelAnimationFrame(state.frame);
    };
  }, []);

  /* Once the iframe is mounted (post-gesture), hand it keyboard focus. */
  useEffect(() => {
    if (videoActive) iframeRef.current?.focus();
  }, [videoActive]);

  const handlePlay = () => {
    if (EMBED_URL) {
      setVideoActive(true);
    } else {
      /* Error-resistant fallback: never trap the user on a dead facade. */
      window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      ref={rootRef}
      className="hero-scope relative isolate min-h-[100svh] overflow-x-clip bg-[#050505] text-[#F7F7F7] antialiased selection:bg-[#7C3AED]/40 selection:text-white"
      style={{ fontFamily: FONT_STACK, "--px": "0", "--py": "0" } as CSSVarStyle}
    >
      <style href="hero-motion-css" precedence="high">
        {HERO_CSS}
      </style>

      {/* -------------------------------- Ambient background -------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Editorial container hairlines */}
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-[1320px] -translate-x-1/2 border-x border-white/[0.04] lg:block" />

        {/* Primary violet orb — slow drift + inverse parallax wrapper */}
        <div
          className="absolute inset-0"
          style={{ transform: "translate3d(calc(var(--px) * 24px), calc(var(--py) * 16px), 0)" }}
        >
          <div
            className="hero-orb-a absolute -top-[14%] left-[-6%] h-[46vw] w-[46vw] min-h-[400px] min-w-[400px] rounded-full opacity-75 blur-[64px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(124,58,237,0.30), rgba(124,58,237,0.08) 55%, transparent 72%)",
            }}
          />
        </div>

        {/* Secondary hot-pink atmospheric glow, video side */}
        <div
          className="absolute inset-0"
          style={{ transform: "translate3d(calc(var(--px) * -14px), calc(var(--py) * -10px), 0)" }}
        >
          <div
            className="hero-orb-b absolute right-[-14%] top-[36%] h-[30vw] w-[30vw] min-h-[280px] min-w-[280px] rounded-full opacity-80 blur-[72px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,45,166,0.14), rgba(124,58,237,0.07) 58%, transparent 74%)",
            }}
          />
        </div>

        {/* Slow rotating light sheen (transform-only) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="hero-orb-c h-[150vmax] w-[150vmax] opacity-60"
            style={{
              background:
                "conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(124,58,237,0.05) 42deg, transparent 96deg, transparent 180deg, rgba(255,45,166,0.03) 226deg, transparent 282deg)",
            }}
          />
        </div>

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{ backgroundImage: NOISE_BG, backgroundSize: "160px 160px" }}
        />

        {/* Readability vignettes */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050505]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* -------------------------------- Floating navbar -------------------------------- */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <nav
          aria-label="Primary"
          className="hero-nav-in relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-white/[0.08] bg-[#0A0A0D]/75 py-2 pl-5 pr-2 backdrop-blur-xl"
        >
          {/* Brand */}
          <a
            href="#top"
            aria-label={`${BRAND_NAME} — back to top`}
            className="group flex items-center gap-2.5 rounded-full py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0D]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-[13px] font-black tracking-tight text-white shadow-[0_0_18px_rgba(124,58,237,0.45)]">
              {BRAND_NAME.charAt(0)}
            </span>
            <span className="text-[13px] font-bold uppercase tracking-[0.24em] text-white/90 transition-colors duration-300 group-hover:text-white">
              {BRAND_NAME}
              <span className="text-[#7C3AED]">.</span>
            </span>
          </a>

          {/* Center links (desktop) */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative block rounded-full px-4 py-2 text-[13px] font-medium text-[#A1A1AA] transition-all duration-300 hover:-translate-y-[1px] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/70"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 bottom-[3px] h-px origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] to-[#FF2DA6] transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:shadow-[0_0_10px_rgba(124,58,237,0.9)]"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <a
            href={CONTACT_HREF}
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] py-2.5 pl-5 pr-4 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_0_26px_-4px_rgba(124,58,237,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0D] active:scale-[0.99] md:inline-flex"
          >
            Let&apos;s Work Together
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
          </a>

          {/* Hamburger (mobile) — three lines morphing into an X */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/80 md:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-[18px]">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out ${
                  menuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* --------------------------- Full-screen mobile menu --------------------------- */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#050505]" />
        <div aria-hidden="true" className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-[90px]" />
        <div aria-hidden="true" className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[#FF2DA6]/10 blur-[80px]" />

        <nav aria-label="Mobile" className="relative flex h-[100svh] flex-col justify-center px-8">
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.label}
                style={{ transitionDelay: menuOpen ? `${150 + index * 70}ms` : "0ms" }}
                className={`transition-all duration-500 ease-out ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
                }`}
              >
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-baseline gap-4 py-1.5 text-[clamp(2.3rem,9.5vw,3.4rem)] font-black uppercase leading-none tracking-tight text-[#9C9CA4] transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  <span aria-hidden="true" className="text-[12px] font-bold tracking-[0.2em] text-[#7C3AED]">
                    0{index + 1}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{ transitionDelay: menuOpen ? `${190 + NAV_LINKS.length * 70}ms` : "0ms" }}
            className={`mt-10 transition-all duration-500 ease-out ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
            }`}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="group inline-flex items-center gap-3 rounded-full border border-[#7C3AED]/50 bg-[#7C3AED]/15 px-7 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:bg-[#7C3AED]/30 hover:shadow-[0_0_32px_-6px_rgba(124,58,237,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
            >
              Let&apos;s Work Together
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#62626B]">
              Usually replies within a few hours
            </p>
          </div>
        </nav>
      </div>

      {/* -------------------------------- Hero content -------------------------------- */}
      <main id="top" className="relative">
        <section
          aria-labelledby="hero-heading"
          className="relative mx-auto flex min-h-[100svh] w-full max-w-[1320px] flex-col justify-center px-5 pb-20 pt-28 sm:px-8 md:pt-32 lg:px-12"
        >
          <div className="grid items-center gap-14 sm:gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16">
            {/* Left — positioning copy */}
            <div>
              <p
                className="hero-fade-in inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
                style={withDelay(70)}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="hero-dot-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#A1A1AA]">
                  Available for new projects
                </span>
              </p>

              <p
                className="hero-fade-in mt-7 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7C7C80]"
                style={withDelay(150)}
              >
                Video Editor <span className="mx-0.5 text-[#7C3AED]">·</span> Meta Ads{" "}
                <span className="mx-0.5 text-[#7C3AED]">·</span> UGC <span className="mx-0.5 text-[#FF2DA6]">·</span>{" "}
                VSL
              </p>

              <h1
                id="hero-heading"
                className="mt-5 text-[clamp(1.95rem,9.6vw,3.8rem)] font-black uppercase leading-[0.97] tracking-[-0.03em] text-white sm:tracking-[-0.028em] lg:text-[3.05rem] xl:text-[3.8rem] 2xl:text-[4.3rem]"
              >
                <span className="hero-fade-in block" style={withDelay(230)}>
                  I edit videos
                </span>
                <span className="hero-fade-in block whitespace-nowrap" style={withDelay(320)}>
                  that make people
                </span>
                <span className="hero-fade-in block" style={withDelay(410)}>
                  <span className="relative inline-block">
                    <span className="hero-accent-pan bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#FF2DA6] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(124,58,237,0.35)]">
                      Stop.
                    </span>
                    <span
                      aria-hidden="true"
                      className="hero-underline-x absolute -bottom-[0.04em] left-[0.02em] block h-[0.05em] w-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#FF2DA6]"
                    />
                  </span>
                </span>
              </h1>

              <p
                className="hero-fade-in mt-7 max-w-[46ch] text-[15px] leading-[1.75] text-[#A1A1AA] sm:text-[15.5px]"
                style={withDelay(500)}
              >
                Helping DTC brands and ecommerce teams turn raw footage into{" "}
                <span className="text-[#EDEDEF]">high-converting UGC ads</span>,{" "}
                <span className="text-[#EDEDEF]">VSLs</span>, and scroll-stopping social content.
              </p>

              <div className="hero-fade-in mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center" style={withDelay(580)}>
                <a
                  href={CONTACT_HREF}
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#7C3AED] to-[#9333EA] px-8 text-[14px] font-bold text-white shadow-[0_10px_36px_-12px_rgba(124,58,237,0.65)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_46px_-10px_rgba(124,58,237,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:translate-y-0 active:scale-[0.99]"
                >
                  Start a Project
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Arslan on WhatsApp (opens in a new tab)"
                  className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.02] px-8 text-[14px] font-semibold text-[#E7E7EA] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-[#7C3AED]/60 hover:bg-[#7C3AED]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:translate-y-0 active:scale-[0.99]"
                >
                  <IconWhatsApp className="h-[18px] w-[18px] text-[#A78BFA] transition-colors duration-300 group-hover:text-[#C4B5FD]" />
                  WhatsApp Me
                </a>
              </div>
            </div>

            {/* Right — click-to-load cinematic video showcase */}
            <div className="hero-video-in relative" style={withDelay(340)}>
              {/* Soft violet ambiance behind the frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-7 rounded-[2rem] opacity-80 blur-2xl"
                style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.22), transparent 75%)" }}
              />

              {/* Viewfinder corner marks */}
              <span aria-hidden="true" className="absolute -left-3 -top-3 h-5 w-5 border-l-[1.5px] border-t-[1.5px] border-white/25" />
              <span aria-hidden="true" className="absolute -right-3 -top-3 h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-white/25" />
              <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-5 w-5 border-b-[1.5px] border-l-[1.5px] border-white/25" />
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-5 w-5 border-b-[1.5px] border-r-[1.5px] border-[#7C3AED]/60" />

              <div
                className={`group relative aspect-video overflow-hidden rounded-2xl border bg-[#0A0A0D] shadow-[0_36px_90px_-32px_rgba(0,0,0,0.9)] transition-[transform,border-color] duration-500 ease-out will-change-transform ${
                  videoActive
                    ? "border-white/10"
                    : "border-white/10 hover:scale-[1.015] hover:border-white/[0.16]"
                }`}
              >
                {videoActive && EMBED_URL ? (
                  <iframe
                    ref={iframeRef}
                    src={EMBED_URL}
                    title={VIDEO_TITLE}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <>
                    {/* Facade: local poster, or a CSS-only poster if none is set */}
                    {POSTER_SRC ? (
                      <Image
                        src={POSTER_SRC}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 44vw, (min-width: 640px) 92vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(120% 90% at 72% 18%, rgba(124,58,237,0.30), transparent 55%), radial-gradient(80% 70% at 18% 88%, rgba(255,45,166,0.13), transparent 60%), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 72px), #0A0A0D",
                        }}
                      />
                    )}

                    {/* Cinematic scrims + light grain */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.09] mix-blend-screen"
                      style={{ backgroundImage: NOISE_BG, backgroundSize: "140px 140px" }}
                    />

                    {/* Play — the entire facade is the hit area */}
                    <button
                      type="button"
                      onClick={handlePlay}
                      aria-label={`Play video: ${VIDEO_TITLE}`}
                      className="absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-none"
                    >
                      <span className="relative grid h-[74px] w-[74px] place-items-center rounded-full border border-white/25 bg-black/55 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#7C3AED]/70 group-hover:bg-[#7C3AED]/25 group-hover:shadow-[0_0_38px_-4px_rgba(124,58,237,0.8)] group-focus-visible:border-[#A78BFA] group-focus-visible:ring-2 group-focus-visible:ring-[#A78BFA]/70 sm:h-[84px] sm:w-[84px]">
                        <span aria-hidden="true" className="hero-play-pulse absolute inset-0 rounded-full border border-[#7C3AED]/50" />
                        <IconPlay className="relative ml-1 h-7 w-7 text-white transition-colors duration-300 group-hover:text-[#E9D5FF]" />
                      </span>
                    </button>

                    {/* Frame chrome — title, reel label, duration */}
                    <div aria-hidden="true" className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 backdrop-blur-md sm:left-5 sm:top-5">
                      <span className="h-1.5 w-1.5 rounded-sm bg-[#7C3AED]" />
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-white/85">Featured VSL</span>
                    </div>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A78BFA]">
                          Showreel &rsquo;27
                        </p>
                        <p className="mt-1.5 text-[13px] font-semibold leading-snug text-white/95 sm:text-sm">
                          {VIDEO_TITLE}
                        </p>
                      </div>
                      <span className="rounded-md border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/80 backdrop-blur-md">
                        {VIDEO_DURATION}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Scroll cue (desktop, decorative) */}
          <div
            aria-hidden="true"
            className="hero-fade-in pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
            style={withDelay(950)}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#5D5D66]">Scroll</span>
            <span className="relative block h-11 w-px overflow-hidden bg-white/[0.08]">
              <span className="hero-scroll-beam absolute left-0 top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-[#7C3AED] to-[#FF2DA6]" />
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
// blue one 

"use client";

/**
 * HeroSection — "Light moving through a dark creative studio"
 *
 * Design tokens (do not introduce colors outside this set):
 *   Base black     #030303   Deep black   #050307
 *   Violet         #8B5CF6   Bright       #A855F7
 *   Highlight      #C084FC   Soft         #DDD6FE
 *   Text           #F5F5F5   Muted        #A1A1AA
 *   Atmosphere-only magenta   #E879F9  (used at ~5% opacity, background only)
 *
 * Background is a CSS-only ribbed/PVC wall system (no canvas/WebGL): a base
 * groove texture, a slow tonal-drift layer, two independent light sweeps,
 * a breathing studio key-light, a magenta atmosphere layer and six vertical
 * light-travel accents. Everything continuous runs on CSS keyframes so the
 * main thread stays free; Framer Motion is reserved for the page-load
 * sequence and for the pointer-driven video tilt / magnetic buttons, which
 * are genuine interactions rather than ambient decoration.
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, MessageCircle, Play } from "lucide-react";

/** Change only this object when the final reel/VSL is available. */
const VIDEO = {
  /** "youtube" accepts a video URL or id. "direct" accepts an .mp4/.webm URL. */
  type: "youtube" as "youtube" | "direct",
  url: "",
  /** Optional image URL, shown before the video is played. */
  poster: "",
  label: "Creative reel",
};

const WHATSAPP_URL = "https://wa.me/923460918797";

const NAV_LINKS = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["About", "#about"],
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/** Vertical light-travel accents on the ribbed wall — deliberately unsynchronized. */
const ACCENT_LINES = [
  { left: "7%", duration: 13, delay: -4.5 },
  { left: "18%", duration: 16.5, delay: -9.2 },
  { left: "33%", duration: 11.5, delay: -1.8 },
  { left: "58%", duration: 15, delay: -11.4 },
  { left: "77%", duration: 12.5, delay: -6.1 },
  { left: "91%", duration: 17.5, delay: -0.6 },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return finePointer;
}

function youTubeEmbedUrl(url: string) {
  const videoId = url.match(/(?:youtu\.be\/|v=|embed\/)([^?&/]+)/)?.[1] || url;
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------------ */
/* Background — the ribbed architectural wall                                */
/* ------------------------------------------------------------------------ */

function RibbedWall({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="vf-ribs absolute inset-0" />
      {!reduced && <div className="vf-flicker absolute inset-0" />}
      {!reduced && <div className="vf-sweep-a absolute inset-0" />}
      {!reduced && <div className="vf-sweep-b absolute inset-0" />}
      <div className="vf-breathe absolute inset-0" />
      <div className="vf-haze-magenta absolute inset-0" />
      {!reduced && (
        <div className="absolute inset-0">
          {ACCENT_LINES.map((line, index) => (
            <span
              key={index}
              className="vf-accent-line absolute top-[-20%] h-[55%] w-px"
              style={{
                left: line.left,
                animationDuration: `${line.duration}s`,
                animationDelay: `${line.delay}s`,
              }}
            />
          ))}
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 74% 64% at 60% 38%, transparent 26%, #030303 90%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,3,3,0) 0%, rgba(3,3,3,.5) 74%, #030303 100%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Navigation                                                                 */
/* ------------------------------------------------------------------------ */

function BrandMark() {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5 rounded-md p-1 text-[13px] font-bold tracking-[-.01em] text-[#f5f5f5] transition-[letter-spacing] duration-300 hover:tracking-[.01em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc]"
    >
      <span className="grid h-6 w-6 place-items-center rounded-[6px] border border-white/10 bg-gradient-to-br from-[#c084fc] via-[#a855f7] to-[#8b5cf6] text-[10px] font-black text-[#0b0714] shadow-[0_0_16px_rgba(139,92,246,.4)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(168,85,247,.6)]">
        V
      </span>
      <span>
        VELVET<span className="text-[#a855f7]">/</span>FRAME
      </span>
    </a>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative rounded-md px-1 py-1.5 text-[11px] font-medium uppercase tracking-[.14em] text-[#a1a1aa] transition-colors duration-300 hover:text-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc]"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-1 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#c084fc] to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </a>
  );
}

function Navigation({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 260);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const menuItemVariants: Variants = reduced
    ? { closed: { opacity: 0 }, open: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        closed: { y: 24, opacity: 0, filter: "blur(6px)" },
        open: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
      };

  return (
    <>
      <nav
        className="relative z-50 grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/[.08] bg-[#0a0a0c]/60 px-3 py-2.5 shadow-[0_16px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:px-4"
        aria-label="Main navigation"
      >
        <BrandMark />
        <div className="hidden justify-center gap-7 lg:flex">
          {NAV_LINKS.map(([label, href]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => scrollToId("#booking")}
            className="hidden items-center gap-1.5 rounded-[10px] border border-[#c084fc]/20 bg-[#8b5cf6] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.1em] text-[#0b0714] shadow-[0_6px_22px_rgba(139,92,246,.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9d6ef7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c084fc] lg:inline-flex"
          >
            Start a project <ArrowUpRight size={13} />
          </button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls={menuId}
            className="relative grid h-10 w-10 place-items-center rounded-[10px] border border-white/[.08] bg-white/[.03] text-white transition-colors hover:bg-white/[.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c084fc] lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "bottom-[8px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#030303] lg:hidden"
          >
            <RibbedWall reduced={reduced} />
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{ closed: {}, open: { transition: { staggerChildren: 0.08, delayChildren: 0.14 } } }}
              className="relative z-10 mx-auto flex min-h-[100svh] w-[min(100%-3rem,30rem)] flex-col justify-center gap-0.5 px-1"
            >
              {NAV_LINKS.map(([label, href], index) => (
                <motion.div key={href} variants={menuItemVariants} className="border-b border-white/[.08]">
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={close}
                    className="block py-4 text-[clamp(2.25rem,10vw,3.75rem)] font-bold leading-none tracking-[-.04em] text-[#f5f5f5] transition-colors duration-300 hover:text-[#c084fc]"
                  >
                    {label}
                  </a>
                </motion.div>
              ))}
              <motion.button
                variants={menuItemVariants}
                onClick={() => {
                  close();
                  scrollToId("#booking");
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#8b5cf6] px-5 py-4 text-sm font-bold uppercase tracking-[.08em] text-[#0b0714] shadow-[0_10px_32px_rgba(139,92,246,.32)]"
              >
                Start a project <ArrowUpRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Buttons                                                                    */
/* ------------------------------------------------------------------------ */

function PrimaryButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 340, damping: 20, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 340, damping: 20, mass: 0.28 });
  const [hovered, setHovered] = useState(false);

  const move = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.15);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={move}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={leave}
      whileTap={{ scale: 0.97 }}
      onClick={() => scrollToId("#booking")}
      className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-[10px] px-5 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#0b0714] shadow-[0_9px_32px_rgba(139,92,246,.34)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(168,85,247,.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #c084fc 0%, #a855f7 55%, #8b5cf6 100%)" }}
      />
      <motion.span
        aria-hidden="true"
        animate={hovered ? { x: ["-155%", "260%"] } : { x: "-155%" }}
        transition={{ duration: 0.56, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/2 -skew-x-12 bg-white/35"
      />
      <span className="relative">Start a project</span>
      <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.button>
  );
}

function WhatsAppButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    ref.current?.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };
  return (
    <a
      ref={ref}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/[.12] bg-white/[.035] px-5 text-[11px] font-bold uppercase tracking-[.12em] text-[#f5f5f5] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#c084fc]/50 hover:bg-white/[.065] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(120px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(168,85,247,.28), transparent 70%)" }}
      />
      <MessageCircle size={15} className="relative text-[#c084fc]" />
      <span className="relative">WhatsApp me</span>
    </a>
  );
}

/* ------------------------------------------------------------------------ */
/* Eyebrow — production label                                                */
/* ------------------------------------------------------------------------ */

function ProductionLabel() {
  return (
    <span className="vf-label-sweep relative inline-flex items-center gap-2.5 overflow-hidden rounded-[6px] border border-white/[.1] bg-black/40 px-3 py-1.5 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c084fc] opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc]" />
      </span>
      <span className="relative text-[10px] font-semibold uppercase tracking-[.18em] text-[#c084fc]">
        Video editor · Meta ads · UGC · VSL
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Video monitor                                                             */
/* ------------------------------------------------------------------------ */

function VideoMonitor({ reduced, finePointer }: { reduced: boolean; finePointer: boolean }) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-2.2, 2.2]), { stiffness: 55, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [1.7, -1.7]), { stiffness: 55, damping: 18 });
  const echoRotateY = useTransform(rotateY, (value) => value * 0.45);
  const echoRotateX = useTransform(rotateX, (value) => value * 0.45);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!finePointer || reduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const leave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  const canPlay = Boolean(VIDEO.url);
  const interactive = finePointer && !reduced;

  return (
    <div
      className="relative mx-auto w-full max-w-[36rem] [perspective:1300px]"
      onMouseMove={move}
      onMouseLeave={leave}
      ref={containerRef}
    >
      <div className={`vf-video-glow absolute -inset-6 rounded-[2rem] bg-[#8b5cf6]/[.14] blur-3xl ${reduced ? "opacity-40" : ""}`} />
      <motion.div
        aria-hidden="true"
        className="absolute inset-2 translate-x-3 translate-y-3 rounded-[20px] border border-[#c084fc]/[.12] bg-[#8b5cf6]/[.03]"
        style={{ rotateX: interactive ? echoRotateX : -1, rotateY: interactive ? echoRotateY : 1 }}
      />
      <div className={reduced ? "" : "vf-video-float"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.965, rotateX: 6, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          style={{ rotateY: interactive ? rotateY : 1.2, rotateX: interactive ? rotateX : undefined, transformStyle: "preserve-3d" }}
          className="relative aspect-video overflow-hidden rounded-[18px] border border-white/[.14] bg-[#0b0a10] shadow-[0_26px_70px_rgba(0,0,0,.58),0_0_0_1px_rgba(139,92,246,.1),inset_0_1px_0_rgba(255,255,255,.12)]"
        >
          {playing && VIDEO.type === "youtube" ? (
            <iframe
              src={youTubeEmbedUrl(VIDEO.url)}
              title={VIDEO.label}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : playing && VIDEO.type === "direct" ? (
            <video src={VIDEO.url} className="absolute inset-0 h-full w-full object-cover" controls autoPlay playsInline />
          ) : (
            <>
              {VIDEO.poster ? (
                <img src={VIDEO.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg,#100e18 0%,#08080a 55%,#140f22 100%)" }}
                >
                  <span className="absolute left-6 top-6 h-3 w-3 border-l border-t border-white/25 sm:left-8 sm:top-8" />
                  <span className="absolute right-6 top-6 h-3 w-3 border-r border-t border-white/25 sm:right-8 sm:top-8" />
                  <span className="absolute bottom-6 left-6 h-3 w-3 border-b border-l border-white/25 sm:bottom-8 sm:left-8" />
                  <span className="absolute bottom-6 right-6 h-3 w-3 border-b border-r border-white/25 sm:bottom-8 sm:right-8" />
                  <div className="absolute left-[9%] top-[13%] font-mono text-[8px] uppercase tracking-[.26em] text-[#c084fc]/60">
                    Creative reel / Direct response
                  </div>
                  <div className="absolute bottom-[19%] left-[9%] text-[clamp(1.1rem,2.8vw,2rem)] font-bold leading-[.95] tracking-[-.05em] text-white/85">
                    RAW FOOTAGE.
                    <br />
                    <span className="text-[#c084fc]">CUT TO CONVERT.</span>
                  </div>
                  <div className="absolute bottom-[12%] left-[9%] right-[9%] flex items-center gap-[3px]">
                    {Array.from({ length: 26 }, (_, index) => (
                      <span key={index} className="h-[2px] flex-1 bg-white/[.14]" style={{ opacity: index < 9 ? 0.75 : 0.3 }} />
                    ))}
                  </div>
                  <div className="absolute bottom-[7%] right-[9%] font-mono text-[8px] tracking-[.2em] text-white/40">00:00 / 01:12</div>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(115deg, rgba(255,255,255,.1), transparent 28%, transparent 66%, rgba(192,132,252,.08))" }}
              />
              {canPlay && (
                <button
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${VIDEO.label}`}
                  className="group absolute left-1/2 top-1/2 grid h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[.22] bg-white/[.06] text-white backdrop-blur-xl transition-all duration-500 hover:border-[#c084fc]/70 hover:bg-[#8b5cf6]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-[-10px] rounded-full border border-white/[.08] opacity-0 transition-all duration-500 group-hover:inset-[-16px] group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(168,85,247,.5), transparent 70%)" }}
                  />
                  <Play size={22} className="relative ml-1 fill-current text-[#ddd6fe] transition-transform duration-500 group-hover:translate-x-0.5" />
                </button>
              )}
            </>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,.14),inset_0_0_32px_rgba(139,92,246,.07)]"
          />
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-1 -top-5 hidden rounded-md border border-white/[.1] bg-[#0a0a0c]/70 px-2 py-1 font-mono text-[8px] tracking-[.14em] text-[#c084fc]/60 backdrop-blur-md sm:block"
      >
        FRAME 024
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-4 right-1 hidden items-center gap-2 rounded-md border border-white/[.1] bg-[#0a0a0c]/70 px-2 py-1 font-mono text-[8px] tracking-[.14em] text-white/45 backdrop-blur-md sm:flex"
      >
        <i className="h-1.5 w-1.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
        VSL / CREATIVE 01
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Hero                                                                       */
/* ------------------------------------------------------------------------ */

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const cursorSpringX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const contentSpringX = useSpring(useTransform(pointerX, [-0.5, 0.5], [6, -6]), { stiffness: 40, damping: 20 });
  const contentSpringY = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), { stiffness: 40, damping: 20 });
  const wallRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [0.6, -0.6]), { stiffness: 30, damping: 20 });
  const wallRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-0.6, 0.6]), { stiffness: 30, damping: 20 });

  const onMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!finePointer || reduced) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
      pointerX.set(x / rect.width - 0.5);
      pointerY.set(y / rect.height - 0.5);
    },
    [cursorX, cursorY, pointerX, pointerY, finePointer, reduced],
  );

  const onLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const headlineVariants: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 34, filter: "blur(9px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
      };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] overflow-hidden bg-[#030303] text-[#f5f5f5] [font-family:var(--font-satoshi,Inter,ui-sans-serif,system-ui,sans-serif)]"
      aria-label="Video editor introduction"
    >
      <style>{`
        .vf-ribs {
          background-color: #050307;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px,
            rgba(0,0,0,.55) 1px, rgba(0,0,0,.68) 5px,
            rgba(255,255,255,.022) 5px, rgba(255,255,255,.022) 6px,
            rgba(0,0,0,.42) 6px, rgba(0,0,0,.3) 13px
          );
        }
        .vf-flicker {
          background-image: repeating-linear-gradient(90deg,
            rgba(139,92,246,.07) 0px, rgba(139,92,246,.07) 46px,
            transparent 46px, transparent 182px);
          background-size: 420% 100%;
          mix-blend-mode: screen;
          opacity: .55;
          animation: vf-flicker-shift 46s linear infinite;
          will-change: background-position;
        }
        @keyframes vf-flicker-shift { 0% { background-position: 0% 0; } 100% { background-position: -100% 0; } }

        .vf-sweep-a {
          background: linear-gradient(102deg, transparent 34%, rgba(168,85,247,.15) 47%, rgba(192,132,252,.24) 50%, rgba(168,85,247,.15) 53%, transparent 66%);
          background-size: 280% 100%;
          mix-blend-mode: screen;
          animation: vf-sweep-a-move 27s cubic-bezier(.45,0,.55,1) infinite;
          animation-delay: -9s;
          will-change: background-position;
        }
        @keyframes vf-sweep-a-move { 0% { background-position: 132% 0; } 50% { background-position: -32% 0; } 100% { background-position: 132% 0; } }

        .vf-sweep-b {
          background: linear-gradient(-96deg, transparent 40%, rgba(221,214,254,.09) 50%, transparent 60%);
          background-size: 320% 100%;
          mix-blend-mode: screen;
          animation: vf-sweep-b-move 34s cubic-bezier(.45,0,.55,1) infinite;
          animation-delay: -4s;
          will-change: background-position;
        }
        @keyframes vf-sweep-b-move { 0% { background-position: -40% 0; } 50% { background-position: 140% 0; } 100% { background-position: -40% 0; } }

        .vf-breathe {
          background: radial-gradient(ellipse 52% 58% at 74% 30%, rgba(139,92,246,.24), transparent 64%);
          animation: vf-breathe-pulse 19s ease-in-out infinite;
        }
        @keyframes vf-breathe-pulse { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: .88; transform: scale(1.07); } }

        .vf-haze-magenta {
          background: radial-gradient(ellipse 60% 55% at 20% 84%, rgba(232,121,249,.06), transparent 68%);
          animation: vf-haze-drift 24s ease-in-out infinite;
        }
        @keyframes vf-haze-drift { 0%, 100% { opacity: .4; } 50% { opacity: .78; } }

        .vf-accent-line {
          background: linear-gradient(180deg, transparent, rgba(192,132,252,.85), transparent);
          opacity: 0;
          animation-name: vf-line-travel;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes vf-line-travel {
          0% { transform: translateY(-12%); opacity: 0; }
          15% { opacity: .75; }
          85% { opacity: .3; }
          100% { transform: translateY(240%); opacity: 0; }
        }

        .vf-label-sweep::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 40%, rgba(255,255,255,.16) 50%, transparent 60%);
          background-size: 240% 100%;
          animation: vf-label-sweep-move 9s ease-in-out infinite;
        }
        @keyframes vf-label-sweep-move { 0%, 100% { background-position: 140% 0; } 50% { background-position: -40% 0; } }

        .vf-video-glow { animation: vf-glow-pulse 7s ease-in-out infinite; }
        @keyframes vf-glow-pulse { 0%, 100% { opacity: .38; transform: scale(.97); } 50% { opacity: .6; transform: scale(1.03); } }

        .vf-video-float { animation: vf-video-float-move 12s ease-in-out infinite; }
        @keyframes vf-video-float-move { 0%, 100% { transform: translateY(0) rotateZ(0deg); } 50% { transform: translateY(-6px) rotateZ(.15deg); } }

        @media (prefers-reduced-motion: reduce) {
          .vf-flicker, .vf-sweep-a, .vf-sweep-b, .vf-breathe, .vf-haze-magenta,
          .vf-accent-line, .vf-label-sweep::after, .vf-video-float, .vf-video-glow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 [perspective:1600px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-6%]"
          style={
            finePointer && !reduced
              ? { rotateX: wallRotateX, rotateY: wallRotateY, transformStyle: "preserve-3d" }
              : undefined
          }
        >
          <RibbedWall reduced={reduced} />
        </motion.div>
      </div>

      {finePointer && !reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 hidden h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.09),transparent_67%)] blur-md lg:block"
          style={{ x: cursorSpringX, y: cursorSpringY }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        className="relative z-30 mx-auto max-w-[88rem] px-4 pb-6 pt-4 sm:px-6 sm:pt-6 lg:px-8"
      >
        <Navigation reduced={reduced} />
      </motion.div>

      <motion.div
        style={finePointer && !reduced ? { x: contentSpringX, y: contentSpringY } : undefined}
        className="relative z-20 mx-auto grid w-[min(100%-2rem,82rem)] grid-cols-1 gap-y-9 gap-x-12 pb-10 pt-4 sm:w-[min(100%-3rem,82rem)] sm:pb-14 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[43fr_57fr] lg:items-start lg:gap-x-16 lg:gap-y-10 lg:pb-20 lg:pt-2"
      >
        <div className="flex flex-col gap-5 sm:gap-6 lg:col-start-1 lg:row-start-1 lg:max-w-[34rem]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.3, ease: EASE }}>
            <ProductionLabel />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
            className="text-[clamp(2.75rem,5vw,4.75rem)] font-extrabold leading-[.9] tracking-[-.055em] text-[#f5f5f5]"
          >
            {["EDITING", "THAT MAKES"].map((line) => (
              <motion.span key={line} variants={headlineVariants} className="block">
                {line}
              </motion.span>
            ))}
            <motion.span
              variants={headlineVariants}
              className="block bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#ddd6fe] bg-clip-text text-transparent"
            >
              PEOPLE STOP.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="max-w-[30rem] text-[15px] leading-relaxed text-[#a1a1aa] sm:text-[16px]"
          >
            Helping DTC brands and ecommerce teams turn raw footage into{" "}
            <span className="font-medium text-[#f5f5f5]">high-converting UGC ads, VSLs,</span> and scroll-stopping social content.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
        >
          <VideoMonitor reduced={reduced} finePointer={finePointer} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
          className="flex flex-col gap-3 sm:flex-row lg:col-start-1 lg:row-start-2 lg:max-w-[34rem]"
        >
          <PrimaryButton />
          <WhatsAppButton />
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 text-[8px] font-bold uppercase tracking-[.2em] text-white/35 lg:flex"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}



