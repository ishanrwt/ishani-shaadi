"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FALLING = [
  { left: "4%", delay: 0, duration: 16, size: 16, drift: 24, kind: "petal", color: "#D4789A" },
  { left: "11%", delay: 1.8, duration: 19, size: 18, drift: -20, kind: "leaf", color: "#2F5A3D" },
  { left: "18%", delay: 4.2, duration: 15, size: 14, drift: 16, kind: "flower", color: "#C9A14A" },
  { left: "25%", delay: 0.7, duration: 21, size: 15, drift: -14, kind: "petal", color: "#E8A0B8" },
  { left: "32%", delay: 6.1, duration: 17, size: 20, drift: 22, kind: "leaf", color: "#3F6F4A" },
  { left: "39%", delay: 2.6, duration: 18, size: 13, drift: -18, kind: "petal", color: "#F0C14B" },
  { left: "46%", delay: 8.4, duration: 20, size: 17, drift: 12, kind: "flower", color: "#E07A9A" },
  { left: "53%", delay: 1.2, duration: 14, size: 16, drift: -22, kind: "leaf", color: "#1F3D2A" },
  { left: "60%", delay: 5.5, duration: 22, size: 12, drift: 18, kind: "petal", color: "#D4789A" },
  { left: "67%", delay: 3.4, duration: 16, size: 19, drift: -16, kind: "leaf", color: "#2F5A3D" },
  { left: "74%", delay: 7.1, duration: 18, size: 15, drift: 20, kind: "flower", color: "#C9A14A" },
  { left: "81%", delay: 0.4, duration: 19, size: 14, drift: -12, kind: "petal", color: "#E8A0B8" },
  { left: "88%", delay: 9.2, duration: 15, size: 17, drift: 14, kind: "leaf", color: "#3F6F4A" },
  { left: "94%", delay: 4.8, duration: 21, size: 13, drift: -19, kind: "petal", color: "#F0C14B" },
  { left: "8%", delay: 11, duration: 17, size: 16, drift: 10, kind: "flower", color: "#D4789A" },
  { left: "22%", delay: 12.4, duration: 20, size: 18, drift: -15, kind: "leaf", color: "#2F5A3D" },
  { left: "48%", delay: 10.2, duration: 16, size: 12, drift: 17, kind: "petal", color: "#E07A9A" },
  { left: "71%", delay: 13.1, duration: 18, size: 15, drift: -11, kind: "leaf", color: "#1F3D2A" },
  { left: "36%", delay: 14.6, duration: 19, size: 14, drift: 13, kind: "flower", color: "#C9A14A" },
  { left: "85%", delay: 15.8, duration: 17, size: 16, drift: -21, kind: "petal", color: "#D4789A" },
];

function Petal({ color, size }) {
  return (
    <svg width={size} height={size * 1.45} viewBox="0 0 20 28" fill="none">
      <path
        d="M10 1.5C13.5 6 18 11.2 18 16.4C18 21.2 14.6 25.2 10 26.5C5.4 25.2 2 21.2 2 16.4C2 11.2 6.5 6 10 1.5Z"
        fill={color}
        opacity="0.78"
      />
      <path
        d="M10 4C10 4 10 22 10 25"
        stroke="#6B3E1E"
        strokeOpacity="0.18"
        strokeWidth="0.6"
      />
    </svg>
  );
}

function Leaf({ color, size }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 20 34" fill="none">
      <path
        d="M10 1.5C15.8 6.2 19 14.4 17.6 22.2C16.4 28.4 13.2 32.4 10 33C6.8 32.4 3.6 28.4 2.4 22.2C1 14.4 4.2 6.2 10 1.5Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M10 4.5C10 4.5 10 28 10 31"
        stroke="#3F5A1C"
        strokeOpacity="0.35"
        strokeWidth="0.7"
      />
      <path
        d="M10 12L14.5 16.5M10 18L5.2 22"
        stroke="#3F5A1C"
        strokeOpacity="0.28"
        strokeWidth="0.55"
      />
    </svg>
  );
}

function Flower({ color, size }) {
  return (
    <svg width={size * 1.35} height={size * 1.35} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#F6E27A" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="6.2"
          rx="2.4"
          ry="4.4"
          fill={color}
          opacity="0.82"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

function FallingPiece({ item }) {
  if (item.kind === "leaf") return <Leaf color={item.color} size={item.size} />;
  if (item.kind === "flower") return <Flower color={item.color} size={item.size} />;
  return <Petal color={item.color} size={item.size} />;
}

export function FloatingPetals() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[55] overflow-hidden"
      aria-hidden="true"
    >
      {FALLING.map((item, index) => (
        <motion.span
          key={index}
          className="absolute top-[-8%]"
          style={{ left: item.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, item.drift, -item.drift * 0.65, item.drift * 0.35],
            rotate: [0, 90, 190, 310],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FallingPiece item={item} />
        </motion.span>
      ))}
    </div>
  );
}

const DUST = Array.from({ length: 64 }, (_, i) => {
  const n = (offset) => {
    const x = Math.sin((i + 1) * 12.9898 + offset) * 43758.5453;
    return x - Math.floor(x);
  };
  const round = (value) => Math.round(value * 100) / 100;
  return {
    left: `${round(3 + n(1.1) * 94)}%`,
    top: `${round(3 + n(2.7) * 90)}%`,
    size: round(3 + n(3.3) * 3.5),
    delay: round(n(4.9) * 5),
    duration: round(6 + n(6.1) * 6),
    drift: round((n(7.4) - 0.5) * 22),
    rise: round(18 + n(8.8) * 28),
  };
});

export function GoldDust() {
  const specksRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    let frame = 0;
    const tick = () => {
      const textRoot = document.querySelector("[data-invite-text]");
      if (textRoot) {
        const rects = [];
        textRoot.querySelectorAll("p, h1, h2, a").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) return;
          rects.push({
            left: r.left - 14,
            right: r.right + 14,
            top: r.top - 12,
            bottom: r.bottom + 12,
          });
        });

        specksRef.current.forEach((el) => {
          if (!el) return;
          const p = el.getBoundingClientRect();
          const overlaps = rects.some(
            (box) =>
              p.left < box.right &&
              p.right > box.left &&
              p.top < box.bottom &&
              p.bottom > box.top,
          );
          el.style.visibility = overlaps ? "hidden" : "visible";
        });
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-2/3 overflow-hidden"
      aria-hidden="true"
    >
      {DUST.map((speck, index) => (
        <motion.span
          key={index}
          ref={(node) => {
            specksRef.current[index] = node;
          }}
          className="gold-dust-speck absolute rounded-full"
          style={{
            left: speck.left,
            top: speck.top,
            width: speck.size,
            height: speck.size,
          }}
          animate={{
            y: [0, -speck.rise, speck.rise * 0.2, -speck.rise * 0.65, 0],
            x: [0, speck.drift, -speck.drift * 0.45, speck.drift * 0.25, 0],
            opacity: [0.45, 1, 0.5, 0.95, 0.45],
            scale: [0.85, 1.15, 0.9, 1.1, 0.85],
          }}
          transition={{
            duration: speck.duration,
            delay: speck.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const DIYAS = [
  { left: "50%", top: "62%", size: 88, delay: "0s" },
  { left: "27%", top: "68%", size: 54, delay: "0.7s" },
  { left: "73%", top: "67%", size: 58, delay: "1.1s" },
  { left: "39%", top: "74%", size: 40, delay: "0.35s" },
  { left: "61%", top: "73%", size: 38, delay: "1.6s" },
];

export function DiyaGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DIYAS.map((diya, index) => (
        <span
          key={index}
          className="diya-glow absolute rounded-full"
          style={{
            left: diya.left,
            top: diya.top,
            width: diya.size,
            height: diya.size,
            animationDelay: diya.delay,
            background:
              "radial-gradient(circle, rgba(255, 186, 80, 0.55) 0%, rgba(201, 161, 74, 0.18) 42%, transparent 72%)",
          }}
        />
      ))}
    </div>
  );
}
