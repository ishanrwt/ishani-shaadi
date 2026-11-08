"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function InviteSplash({
  manageOverflow = true,
  onComplete,
}) {
  const [stage, setStage] = useState("text");
  const videoRef = useRef(null);
  const completedRef = useRef(false);
  const videoReadyRef = useRef(false);

  useEffect(() => {
    if (!manageOverflow) return undefined;

    document.body.style.overflow = "hidden";

    if (stage === "done") {
      const unlock = window.setTimeout(() => {
        document.body.style.overflow = "";
      }, 1200);
      return () => window.clearTimeout(unlock);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [stage, manageOverflow]);

  useEffect(() => {
    if (stage !== "done" || completedRef.current) return undefined;
    completedRef.current = true;
    const t = window.setTimeout(() => {
      onComplete?.();
    }, 200);
    return () => window.clearTimeout(t);
  }, [stage, onComplete]);

  // Warm the video while the invite text is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const markReady = () => {
      videoReadyRef.current = true;
    };

    video.muted = true;
    video.defaultMuted = true;
    video.preload = "auto";
    video.load();

    if (video.readyState >= 3) markReady();
    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("loadeddata", markReady);

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("loadeddata", markReady);
    };
  }, []);

  useEffect(() => {
    if (stage !== "loading" && stage !== "video") return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const startPlayback = () => {
      video.playbackRate = 2;
      video.muted = true;
      setStage("video");
      video.play().catch(() => setStage("done"));
    };

    if (video.readyState >= 3 || videoReadyRef.current) {
      startPlayback();
      return undefined;
    }

    const onReady = () => {
      videoReadyRef.current = true;
      startPlayback();
    };

    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("loadeddata", onReady);
    video.load();

    const fallback = window.setTimeout(() => {
      startPlayback();
    }, 8000);

    return () => {
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("loadeddata", onReady);
      window.clearTimeout(fallback);
    };
  }, [stage]);

  const openInvite = () => {
    if (stage !== "text") return;
    document.dispatchEvent(new Event("invite-unlock-audio"));
    setStage(videoReadyRef.current ? "video" : "loading");
  };

  const visible = stage !== "done";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute inset-0 z-[80] overflow-hidden bg-cream"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(14px)",
            scale: 1.04,
          }}
          transition={{ duration: 1.15, ease }}
        >
          {/* Preload / play envelope off-screen until ready to show */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 2;
            }}
            onEnded={() => setStage("done")}
            className={`absolute -top-[10%] left-0 h-[136%] w-full object-cover transition-opacity duration-500 ${
              stage === "video" ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <source src="/envelope.mp4" type="video/mp4" />
          </video>

          <AnimatePresence mode="wait">
            {stage === "text" ? (
              <motion.button
                key="text"
                type="button"
                onClick={openInvite}
                className="relative z-10 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-5 border-0 bg-transparent px-8 text-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                <motion.p
                  className="font-serif text-[3.15rem] font-medium italic leading-tight text-brown sm:text-[4rem]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.15, ease }}
                >
                  You&apos;re Invited
                </motion.p>
                <motion.p
                  className="font-display text-[0.95rem] font-bold uppercase tracking-[0.32em] text-gold sm:text-[1.05rem]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease }}
                >
                  Tap to open
                </motion.p>
              </motion.button>
            ) : null}

            {stage === "loading" ? (
              <motion.div
                key="loading"
                className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 bg-cream px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                <motion.div
                  className="h-10 w-10 rounded-full border-[1.5px] border-gold/25 border-t-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                <div className="text-center">
                  <p className="font-serif text-2xl italic text-brown sm:text-[1.75rem]">
                    Opening your invite
                  </p>
                  <p className="mt-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-gold">
                    Please wait
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
