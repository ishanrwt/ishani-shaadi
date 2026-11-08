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

  useEffect(() => {
    const video = videoRef.current;
    if (stage !== "video" || !video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 2;
    video.preload = "auto";
    video.load();

    const play = () => {
      video.playbackRate = 2;
      video.muted = true;
      return video.play().catch(() => setStage("done"));
    };

    play();
    return undefined;
  }, [stage]);

  const openInvite = () => {
    if (stage !== "text") return;
    // Same tap unlocks audio (browser gesture) and opens the envelope.
    document.dispatchEvent(new Event("invite-unlock-audio"));
    setStage("video");
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
          <AnimatePresence mode="wait">
            {stage === "text" ? (
              <motion.button
                key="text"
                type="button"
                onClick={openInvite}
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 border-0 bg-transparent px-8 text-center"
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
                  className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease }}
                >
                  Tap to open
                </motion.p>
              </motion.button>
            ) : (
              <motion.div
                key="video"
                className="absolute inset-0 overflow-hidden bg-cream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, ease }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => {
                    event.currentTarget.playbackRate = 2;
                  }}
                  onEnded={() => setStage("done")}
                  className="absolute -top-[10%] left-0 h-[136%] w-full object-cover"
                >
                  <source src="/envelope.mp4" type="video/mp4" />
                </video>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
