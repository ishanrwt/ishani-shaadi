"use client";

import { useEffect, useRef } from "react";
import wedding from "../data/wedding";

const START_AT = wedding.images.musicStartAt ?? 36;
const SRC = wedding.images.music ?? "/music/ishq-hai.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");

    const seekStart = () => {
      try {
        if (Number.isFinite(audio.duration) && audio.duration > START_AT) {
          if (audio.currentTime < START_AT) {
            audio.currentTime = START_AT;
          }
        }
      } catch {
        // Some browsers throw if seek happens too early.
      }
    };

    const tryPlay = async () => {
      try {
        seekStart();
        audio.muted = false;
        audio.volume = 0.7;
        await audio.play();
        startedRef.current = true;
        seekStart();
        return true;
      } catch {
        startedRef.current = false;
        return false;
      }
    };

    const onLoaded = () => {
      seekStart();
      tryPlay();
    };

    const onTimeUpdate = () => {
      // If the browser rewinds before our start point, jump forward again.
      if (audio.currentTime > 0 && audio.currentTime < START_AT - 0.25) {
        audio.currentTime = START_AT;
      }
    };

    const onEnded = () => {
      audio.currentTime = START_AT;
      tryPlay();
    };

    const unlock = () => {
      tryPlay();
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("canplay", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    // Keep listening until playback actually starts (deployed browsers block autoplay).
    const gestureOptions = { capture: true };
    window.addEventListener("pointerdown", unlock, gestureOptions);
    window.addEventListener("touchstart", unlock, gestureOptions);
    window.addEventListener("touchend", unlock, gestureOptions);
    window.addEventListener("click", unlock, gestureOptions);
    window.addEventListener("keydown", unlock, gestureOptions);
    document.addEventListener("invite-unlock-audio", unlock);

    audio.load();
    tryPlay();

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("canplay", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", unlock, gestureOptions);
      window.removeEventListener("touchstart", unlock, gestureOptions);
      window.removeEventListener("touchend", unlock, gestureOptions);
      window.removeEventListener("click", unlock, gestureOptions);
      window.removeEventListener("keydown", unlock, gestureOptions);
      document.removeEventListener("invite-unlock-audio", unlock);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={SRC}
      preload="auto"
      playsInline
      // Helps some mobile browsers treat this as inline media.
      // eslint-disable-next-line react/no-unknown-property
      webkit-playsinline="true"
    />
  );
}
