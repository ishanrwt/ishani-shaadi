"use client";

import { useEffect, useState } from "react";

function getParts(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function Countdown({ target, className = "" }) {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const items = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Mins", value: parts.minutes },
    { label: "Secs", value: parts.seconds },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <p className="font-display text-xl font-medium tracking-wide text-gold sm:text-2xl">
            {String(item.value).padStart(2, "0")}
          </p>
          <p className="mt-1 font-display text-[0.55rem] uppercase tracking-[0.22em] text-brown-soft">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
