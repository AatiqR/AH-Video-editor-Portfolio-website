"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sora, Bebas_Neue } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const companies = Array.from({ length: 38 }, (_, index) => ({
  name: `Client ${index + 1}`,
  logo: `/client/${index + 1}.webp`,
}));

const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 110;
const LOGO_GAP = 48;

export default function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopDistance, setLoopDistance] = useState(0);

  useEffect(() => {
    const measureTrack = () => {
      if (!trackRef.current) return;

      const firstSetWidth =
        companies.length * LOGO_WIDTH +
        (companies.length - 1) * LOGO_GAP;

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
      className={`${sora.className} relative w-full overflow-hidden rounded-3xl bg-[#06040D] py-10 sm:py-12 md:py-14`}
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
              font-extrabold
              uppercase
              tracking-[0.28em]
              text-[#A78BFA]
              sm:text-xs
              md:text-sm
            "
          >
            Trusted Worldwide
          </span>

          <h2
            className={`
              ${bebasNeue.className}
              text-[3.7rem]
              leading-[0.82]
              tracking-[0.025em]
              text-white
              sm:text-[4.8rem]
              md:text-[6rem]
              lg:text-[7rem]
            `}
          >
            MY{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#A78BFA]
                via-[#F0ABFC]
                to-[#8B5CF6]
                bg-clip-text
                text-transparent
              "
            >
              CLIENTS
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              font-semibold
              leading-7
              text-zinc-400
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
        {/* LEFT 15% DARK AREA */}
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
              "linear-gradient(90deg, #06040D 0%, #06040D 42%, rgba(6,4,13,0.92) 62%, rgba(6,4,13,0.45) 82%, transparent 100%)",
          }}
        />

        {/* RIGHT 15% DARK AREA */}
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
              "linear-gradient(270deg, #06040D 0%, #06040D 42%, rgba(6,4,13,0.92) 62%, rgba(6,4,13,0.45) 82%, transparent 100%)",
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
            gap-[48px]
            py-2
            sm:gap-[48px]
            md:gap-[48px]
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