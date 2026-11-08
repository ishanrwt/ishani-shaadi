"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1];
const SWIPE_THRESHOLD = 40;
const NAV_COOLDOWN_MS = 700;

export default function SlideDeck({ slides, active = true }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const lockedRef = useRef(false);
  const touchStartY = useRef(0);

  const total = slides.length;
  const canGo = active && total > 0;

  const unlockAudio = useCallback(() => {
    document.dispatchEvent(new Event("invite-unlock-audio"));
  }, []);

  const goTo = useCallback(
    (next) => {
      if (!canGo || lockedRef.current) return;
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === index) return;

      unlockAudio();
      lockedRef.current = true;
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
      window.setTimeout(
        () => {
          lockedRef.current = false;
        },
        reduceMotion ? 180 : NAV_COOLDOWN_MS,
      );
    },
    [canGo, index, reduceMotion, total, unlockAudio],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!active) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!canGo) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGo, goNext, goPrev]);

  useEffect(() => {
    if (!canGo) return undefined;

    const onWheel = (event) => {
      // One wheel/trackpad gesture = one page (cooldown blocks repeats).
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      if (event.deltaY > 0) goNext();
      else goPrev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [canGo, goNext, goPrev]);

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir) => ({
          opacity: 0,
          y: dir > 0 ? 64 : -64,
          scale: 0.98,
        }),
        center: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        exit: (dir) => ({
          opacity: 0,
          y: dir > 0 ? -48 : 48,
          scale: 1.015,
        }),
      };

  const slide = slides[index];
  const SlideContent = slide.render;

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-cream"
      onPointerDown={unlockAudio}
      onTouchStart={(event) => {
        unlockAudio();
        touchStartY.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        unlockAudio();
        const delta = event.changedTouches[0].clientY - touchStartY.current;
        if (delta <= -SWIPE_THRESHOLD) goNext();
        else if (delta >= SWIPE_THRESHOLD) goPrev();
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduceMotion ? 0.2 : 0.72, ease }}
          className="absolute inset-0 overflow-hidden"
        >
          <SlideContent />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-y-0 right-3 z-40 flex flex-col items-center justify-center gap-2 sm:right-5">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.label}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-500 ${
              i === index
                ? "scale-125 bg-gold"
                : "bg-brown/25 hover:bg-brown/45"
            }`}
          />
        ))}
      </div>

      {index < total - 1 ? (
        <button
          type="button"
          onClick={goNext}
          className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1 text-brown/55 transition-opacity hover:text-brown"
          aria-label="Reveal next slide"
        >
          <span className="font-display text-[0.55rem] uppercase tracking-[0.28em]">
            Reveal
          </span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg leading-none text-gold"
          >
            ⌄
          </motion.span>
        </button>
      ) : null}
    </div>
  );
}
