"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Manrope, Space_Grotesk } from "next/font/google";

/* Same font configs as the Hero, so Next.js reuses the same font files. */
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

const companies = Array.from({ length: 38 }, (_, index) => ({
  name: `Client ${index + 1}`,
  logo: `/client/${index + 1}.webp`,
}));

const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 110;
const LOGO_GAP = 40; // must match gap-[40px] on the track (was 48)

export default function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopDistance, setLoopDistance] = useState(0);

  useEffect(() => {
    const measureTrack = () => {
      if (!trackRef.current) return;

      // One full set including the gap after it = seamless loop
      const firstSetWidth = companies.length * (LOGO_WIDTH + LOGO_GAP);

      setLoopDistance(firstSetWidth);
    };

    measureTrack();

    window.addEventListener("resize", measureTrack);

    return () => {
      window.removeEventListener("resize", measureTrack);
    };
  }, []);

  return (
    <section
      className={`${body.className} relative w-full overflow-hidden rounded-3xl bg-[#08070B] py-10 sm:py-12 md:py-14`}
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="relative z-10 mx-auto mb-10 max-w-5xl px-5 text-center sm:mb-12 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className="
              mb-4
              inline-block
              text-[11px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[#B9A0FF]
              sm:text-xs
              md:text-sm
            "
          >
            Trusted Worldwide
          </span>

          <h2
            className={`
              ${display.className}
              pb-[0.08em]
              text-[2.75rem]
              font-bold
              uppercase
              leading-[1.04]
              tracking-[-0.03em]
              text-[#F7F5FA]
              sm:text-[3.75rem]
              md:text-[4.75rem]
              lg:text-[5.5rem]
            `}
          >
            MY <span className="text-[#9164F5]">CLIENTS</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-[15px]
              font-medium
              leading-7
              text-[#AAA5B5]
              sm:text-base
              md:text-lg
            "
          >
            Partnering with ambitious brands across the globe to build, launch,
            and scale.
          </p>
        </motion.div>
      </div>

      {/* =========================================================
          MARQUEE VIEWPORT
      ========================================================= */}

      <div className="relative w-full overflow-hidden">
        {/* LEFT: 10% fully blank, then a short soft fade (15% wide in total) */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-[15%]
          "
          style={{
            background:
              "linear-gradient(90deg, #08070B 0%, #08070B 66%, rgba(8,7,11,0.6) 85%, transparent 100%)",
          }}
        />

        {/* RIGHT: 10% fully blank, then a short soft fade (15% wide in total) */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-[15%]
          "
          style={{
            background:
              "linear-gradient(270deg, #08070B 0%, #08070B 66%, rgba(8,7,11,0.6) 85%, transparent 100%)",
          }}
        />

        {/* =======================================================
            MOVING TRACK
        ======================================================= */}

        <motion.div
          ref={trackRef}
          className="
            flex
            w-max
            items-center
            gap-[40px]
            py-2
            sm:gap-[40px]
            md:gap-[40px]
          "
          animate={{
            x: loopDistance ? [-loopDistance, 0] : 0,
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 46,
              ease: "linear",
            },
          }}
        >
          {/* =====================================================
              FIRST SET
          ===================================================== */}

          {companies.map((company, index) => (
            <Image
              key={`logo-first-${index}`}
              src={company.logo}
              alt={`${company.name} logo`}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority={index < 8}
              draggable={false}
              sizes="220px"
              className="
                block
                h-[110px]
                w-[220px]
                shrink-0
                rounded-3xl
                object-contain
                select-none
              "
            />
          ))}

          {/* =====================================================
              SECOND SET
              EXACT DUPLICATE FOR SEAMLESS LOOP
          ===================================================== */}

          {companies.map((company, index) => (
            <Image
              key={`logo-second-${index}`}
              src={company.logo}
              alt={`${company.name} logo`}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              draggable={false}
              sizes="220px"
              className="
                block
                h-[110px]
                w-[220px]
                shrink-0
                rounded-3xl
                object-contain
                select-none
              "
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}