"use client";

import { useEffect, useRef } from "react";

type WebPoint = {
  x: number;
  y: number;
  time: number;
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;

    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointerMedia = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const motionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let enabled = false;
    let visible = false;
    let hovering = false;
    let clicking = false;
    let animationId = 0;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = { x: -100, y: -100 };
    const follower = { x: -100, y: -100 };

    const web: WebPoint[] = [];

    const WEB_LIFETIME = 520;
    const MAX_POINTS = 22;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setVisible = (value: boolean) => {
      visible = value;

      dot.style.opacity = value ? "1" : "0";
      ring.style.opacity = value ? "1" : "0";

      if (!value) web.length = 0;
    };

    const handleMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return;

      const x = event.clientX;
      const y = event.clientY;

      if (!visible) {
        follower.x = x;
        follower.y = y;
      }

      mouse.x = x;
      mouse.y = y;

      setVisible(true);

      const target = event.target;

      hovering =
        target instanceof Element &&
        Boolean(
          target.closest(
            "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
          )
        );

      if (motionMedia.matches) return;

      const last = web[web.length - 1];

      const distance = last
        ? Math.hypot(x - last.x, y - last.y)
        : Infinity;

      if (distance >= 7) {
        if (distance > 140) {
          web.length = 0;
        }

        web.push({
          x,
          y,
          time: performance.now(),
        });

        if (web.length > MAX_POINTS) {
          web.shift();
        }
      }
    };

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      clicking = true;
    };

    const handleUp = () => {
      clicking = false;
    };

    const handleOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        setVisible(false);
      }
    };

    const drawWeb = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (!visible || motionMedia.matches) {
        web.length = 0;
        return;
      }

      while (
        web.length &&
        now - web[0].time > WEB_LIFETIME
      ) {
        web.shift();
      }

      if (web.length < 2) return;

      const alphaFor = (point: WebPoint) => {
        const age = now - point.time;

        return Math.max(
          0,
          1 - age / WEB_LIFETIME
        );
      };

      // Main silk thread following the cursor.
      for (let i = 1; i < web.length; i++) {
        const a = web[i - 1];
        const b = web[i];

        const opacity =
          Math.min(alphaFor(a), alphaFor(b)) * 0.55;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 0.85;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Spiderweb connections.
      // These create small triangular silk structures.
      for (let i = 2; i < web.length; i += 2) {
        const a = web[i - 2];
        const b = web[i - 1];
        const c = web[i];

        const opacity =
          Math.min(
            alphaFor(a),
            alphaFor(b),
            alphaFor(c)
          ) * 0.34;

        const dx = c.x - a.x;
        const dy = c.y - a.y;

        const length = Math.hypot(dx, dy);

        if (length < 12 || length > 100) continue;

        const normalX = -dy / length;
        const normalY = dx / length;

        const spread = Math.min(length * 0.32, 15);

        const midpointX =
          (a.x + c.x) / 2 + normalX * spread;

        const midpointY =
          (a.y + c.y) / 2 + normalY * spread;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);

        ctx.quadraticCurveTo(
          midpointX,
          midpointY,
          c.x,
          c.y
        );

        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();

        // A tiny connecting strand creates the web shape.
        ctx.beginPath();

        ctx.moveTo(b.x, b.y);

        ctx.lineTo(midpointX, midpointY);

        ctx.strokeStyle = `rgba(210,190,255,${opacity * 0.75})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      // Tiny silk intersections.
      for (let i = 2; i < web.length; i += 3) {
        const point = web[i];

        const opacity = alphaFor(point) * 0.45;

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          0.9,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
    };

    const animate = (now: number) => {
      if (!enabled) {
        animationId = 0;
        return;
      }

      const smoothing = motionMedia.matches ? 1 : 0.19;

      follower.x +=
        (mouse.x - follower.x) * smoothing;

      follower.y +=
        (mouse.y - follower.y) * smoothing;

      dot.style.transform = `
        translate3d(${mouse.x}px, ${mouse.y}px, 0)
        translate(-50%, -50%)
        scale(${clicking ? 0.7 : 1})
      `;

      ring.style.transform = `
        translate3d(${follower.x}px, ${follower.y}px, 0)
        translate(-50%, -50%)
        scale(${clicking ? 0.78 : hovering ? 1.55 : 1})
      `;

      ring.style.borderColor = hovering
        ? "rgba(180,140,255,0.9)"
        : "rgba(255,255,255,0.72)";

      ring.style.background = hovering
        ? "rgba(180,140,255,0.035)"
        : "rgba(255,255,255,0.015)";

      drawWeb(now);

      animationId = requestAnimationFrame(animate);
    };

    const updatePointer = () => {
      enabled = pointerMedia.matches;

      dot.style.display = enabled ? "block" : "none";
      ring.style.display = enabled ? "block" : "none";
      canvas.style.display = enabled ? "block" : "none";

      if (enabled) {
        if (!animationId) {
          animationId = requestAnimationFrame(animate);
        }
      } else {
        cancelAnimationFrame(animationId);
        animationId = 0;

        setVisible(false);
        ctx.clearRect(0, 0, width, height);
      }
    };

    const handleBlur = () => {
      setVisible(false);
      clicking = false;
    };

    resize();
    updatePointer();

    window.addEventListener("pointermove", handleMove, {
      passive: true,
    });

    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("blur", handleBlur);

    document.addEventListener("mouseout", handleOut);

    window.addEventListener("resize", resize);

    pointerMedia.addEventListener("change", updatePointer);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("blur", handleBlur);

      document.removeEventListener("mouseout", handleOut);

      window.removeEventListener("resize", resize);

      pointerMedia.removeEventListener(
        "change",
        updatePointer
      );
    };
  }, []);

  return (
    <>
      {/* Spiderweb trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997]"
        style={{
          opacity: 1,
        }}
      />

      {/* Luxury white follower ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.72)",
          background: "rgba(255,255,255,0.015)",
          boxShadow:
            "0 0 12px rgba(255,255,255,0.055)",
          opacity: 0,
          willChange: "transform",
          transition:
            "opacity 180ms ease, border-color 220ms ease, background 220ms ease",
        }}
      />

      {/* Pearl-white cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          opacity: 0,
          background:
            "radial-gradient(circle at 30% 25%, #FFFFFF 0%, #FFFFFF 32%, #EDE7FF 72%, #B6A8D8 100%)",
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.9),
            0 0 8px rgba(255,255,255,0.35),
            0 0 18px rgba(180,140,255,0.12)
          `,
          willChange: "transform",
          transition: "opacity 180ms ease",
        }}
      />

      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          html,
          body,
          a,
          button,
          input,
          textarea,
          select,
          [role="button"],
          [data-cursor-hover] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}