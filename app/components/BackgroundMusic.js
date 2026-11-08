"use client";

import { useEffect, useRef } from "react";
import wedding from "../data/wedding";

const START_AT = wedding.images.musicStartAt ?? 36;
const SRC = wedding.images.music ?? "/music/ishq-hai.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const seekStart = () => {
      if (audio.currentTime < START_AT) {
        audio.currentTime = START_AT;
      }
    };

    const prepare = () => {
      audio.currentTime = START_AT;
    };

    const tryPlay = () => {
      seekStart();
      audio.volume = 0.7;
      return audio.play().catch(() => {});
    };

    const onTimeUpdate = () => {
      if (audio.currentTime > 0 && audio.currentTime < START_AT - 0.2) {
        audio.currentTime = START_AT;
      }
    };

    const onEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    audio.addEventListener("loadedmetadata", prepare);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    tryPlay();

    const unlock = () => {
      tryPlay();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      audio.removeEventListener("loadedmetadata", prepare);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return <audio ref={audioRef} src={SRC} preload="auto" playsInline />;
}
