"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeaderOverlays() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      <div className="overlay-chandelier absolute inset-0 origin-top">
        <Image
          src="/invitation/overlay-chandelier.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-fill select-none"
        />
      </div>

      <div className="overlay-top-left absolute inset-0 origin-[22%_0%]">
        <Image
          src="/invitation/overlay-top-decor.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-fill select-none [clip-path:inset(0_50%_0_0)]"
        />
      </div>
      <div className="overlay-top-right absolute inset-0 origin-[78%_0%]">
        <Image
          src="/invitation/overlay-top-decor.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-fill select-none [clip-path:inset(0_0_0_50%)]"
        />
      </div>
    </div>
  );
}

const LIGHTS = [
  { clip: "inset(78% 71% 6% 18%)", left: "23.4%", top: "86.5%" },
  { clip: "inset(82% 66% 0% 23%)", left: "28.7%", top: "92%" },
  { clip: "inset(81% 26% 0% 63%)", left: "68.7%", top: "92.2%" },
  { clip: "inset(70% 18% 6% 70%)", left: "75.7%", top: "82.1%" },
];

function randomTiming() {
  return {
    duration: `${(0.75 + Math.random() * 1.15).toFixed(2)}s`,
    delay: `${(Math.random() * 1.8).toFixed(2)}s`,
  };
}

export function FooterOverlays() {
  const [timings, setTimings] = useState(() =>
    LIGHTS.map(() => ({ duration: "1.1s", delay: "0s" })),
  );

  useEffect(() => {
    setTimings(LIGHTS.map(() => randomTiming()));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
      <Image
        src="/invitation/overlay-light.webp"
        alt=""
        fill
        sizes="(max-width: 540px) 100vw, 540px"
        className="object-fill select-none mix-blend-screen opacity-30 blur-[3px]"
      />

      {LIGHTS.map((light, index) => (
        <div
          key={`spot-${index}`}
          className="overlay-light-spot absolute inset-0 mix-blend-screen"
          style={{
            clipPath: light.clip,
            animationDuration: timings[index].duration,
            animationDelay: timings[index].delay,
          }}
        >
          <Image
            src="/invitation/overlay-light.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-fill select-none"
          />
        </div>
      ))}

      {LIGHTS.map((light, index) => (
        <span
          key={`glow-${index}`}
          className="overlay-light-glow"
          style={{
            left: light.left,
            top: light.top,
            animationDuration: timings[index].duration,
            animationDelay: timings[index].delay,
          }}
        />
      ))}
    </div>
  );
}
