"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1];
const SWIPE_THRESHOLD = 40;
const NAV_COOLDOWN_MS = 700;
const AUTO_ADVANCE_MS = 5000;
const RESUME_IDLE_MS = 1600;
const FIRST_PAGE_DWELL_MS = 1000;

export default function SlideDeck({ slides, active = true }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const lockedRef = useRef(false);
  const touchStartY = useRef(0);
  const indexRef = useRef(0);
  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const armTimerRef = useRef(null);
  const userInteractingRef = useRef(false);
  const autoplayArmedRef = useRef(false);

  const total = slides.length;
  const canGo = active && total > 0;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const unlockAudio = useCallback(() => {
    document.dispatchEvent(new Event("invite-unlock-audio"));
  }, []);

  const clearAutoTimers = useCallback(() => {
    if (autoTimerRef.current) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const clearArmTimer = useCallback(() => {
    if (armTimerRef.current) {
      window.clearTimeout(armTimerRef.current);
      armTimerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (next, { fromUser = false } = {}) => {
      if (!canGo || lockedRef.current) return false;
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === indexRef.current) return false;

      if (fromUser) unlockAudio();
      lockedRef.current = true;
      setDirection(clamped > indexRef.current ? 1 : -1);
      setIndex(clamped);
      window.setTimeout(
        () => {
          lockedRef.current = false;
        },
        reduceMotion ? 180 : NAV_COOLDOWN_MS,
      );
      return true;
    },
    [canGo, reduceMotion, total, unlockAudio],
  );

  const scheduleAutoAdvance = useCallback(() => {
    if (!canGo || reduceMotion || !autoplayArmedRef.current) return;
    if (autoTimerRef.current) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (indexRef.current >= total - 1) return;

    autoTimerRef.current = window.setTimeout(() => {
      autoTimerRef.current = null;
      if (userInteractingRef.current) return;
      goTo(indexRef.current + 1, { fromUser: false });
    }, AUTO_ADVANCE_MS);
  }, [canGo, goTo, reduceMotion, total]);

  const interruptAutoplay = useCallback(() => {
    if (!canGo || reduceMotion) return;
    userInteractingRef.current = true;
    clearAutoTimers();

    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      userInteractingRef.current = false;
      scheduleAutoAdvance();
    }, RESUME_IDLE_MS);
  }, [canGo, clearAutoTimers, reduceMotion, scheduleAutoAdvance]);

  const goNext = useCallback(
    (fromUser = true) => {
      if (fromUser) interruptAutoplay();
      goTo(indexRef.current + 1, { fromUser });
    },
    [goTo, interruptAutoplay],
  );

  const goPrev = useCallback(
    (fromUser = true) => {
      if (fromUser) interruptAutoplay();
      goTo(indexRef.current - 1, { fromUser });
    },
    [goTo, interruptAutoplay],
  );

  // After splash/video ends, wait 1s on the first page before autoplay can start.
  useEffect(() => {
    if (!active || reduceMotion) {
      autoplayArmedRef.current = false;
      clearArmTimer();
      clearAutoTimers();
      return undefined;
    }

    document.body.style.overflow = "hidden";
    autoplayArmedRef.current = false;
    clearAutoTimers();
    clearArmTimer();

    armTimerRef.current = window.setTimeout(() => {
      armTimerRef.current = null;
      autoplayArmedRef.current = true;
      if (!userInteractingRef.current) scheduleAutoAdvance();
    }, FIRST_PAGE_DWELL_MS);

    return () => {
      document.body.style.overflow = "";
      clearArmTimer();
      clearAutoTimers();
      autoplayArmedRef.current = false;
    };
  }, [active, clearArmTimer, clearAutoTimers, reduceMotion, scheduleAutoAdvance]);

  // Restart 5s countdown whenever the slide changes (only once autoplay is armed).
  useEffect(() => {
    if (!canGo || reduceMotion || !autoplayArmedRef.current) return undefined;
    if (userInteractingRef.current) return undefined;
    scheduleAutoAdvance();
    return () => {
      if (autoTimerRef.current) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [canGo, index, reduceMotion, scheduleAutoAdvance]);

  useEffect(() => {
    if (!canGo) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goNext(true);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goPrev(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGo, goNext, goPrev]);

  useEffect(() => {
    if (!canGo) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      interruptAutoplay();
      if (event.deltaY > 0) goTo(indexRef.current + 1, { fromUser: true });
      else goTo(indexRef.current - 1, { fromUser: true });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [canGo, goTo, interruptAutoplay]);

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
        interruptAutoplay();
        touchStartY.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        unlockAudio();
        const delta = event.changedTouches[0].clientY - touchStartY.current;
        if (delta <= -SWIPE_THRESHOLD) goNext(true);
        else if (delta >= SWIPE_THRESHOLD) goPrev(true);
        else interruptAutoplay();
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
            onClick={() => {
              interruptAutoplay();
              goTo(i, { fromUser: true });
            }}
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
          onClick={() => goNext(true)}
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
