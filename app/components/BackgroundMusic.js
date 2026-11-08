"use client";

import { useEffect, useRef } from "react";
import wedding from "../data/wedding";

const START_AT = wedding.images.musicStartAt ?? 0;
const SRC = wedding.images.music ?? "/music/ishq-hai-loop.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");

    const seekStart = () => {
      try {
        if (START_AT > 0 && Number.isFinite(audio.duration) && audio.duration > START_AT) {
          if (audio.currentTime < START_AT) audio.currentTime = START_AT;
        }
      } catch {
        // ignore
      }
    };

    const tryPlay = async () => {
      try {
        seekStart();
        audio.muted = false;
        audio.volume = 0.7;
        await audio.play();
        seekStart();
        return true;
      } catch {
        return false;
      }
    };

    const onEnded = () => {
      audio.currentTime = START_AT;
      tryPlay();
    };

    const onTimeUpdate = () => {
      if (START_AT > 0 && audio.currentTime > 0 && audio.currentTime < START_AT - 0.25) {
        audio.currentTime = START_AT;
      }
    };

    // Called from the envelope tap — same user gesture, so browsers allow sound.
    const unlock = () => {
      tryPlay();
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    document.addEventListener("invite-unlock-audio", unlock);

    // Warm the buffer without forcing audible autoplay.
    audio.load();

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("invite-unlock-audio", unlock);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={SRC}
      preload="auto"
      playsInline
      // eslint-disable-next-line react/no-unknown-property
      webkit-playsinline="true"
    />
  );
}
