"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function InkDropImage({
  src,
  alt,
  className = "",
  sizes = "320px",
  aspectClass = "aspect-[4/3]",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`relative w-full ${aspectClass} ${
          reduceMotion ? "" : "cloud-reveal"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-center"
        />
      </div>
      {!reduceMotion ? (
        <>
          <span className="cloud-veil cloud-veil-a" aria-hidden="true" />
          <span className="cloud-veil cloud-veil-b" aria-hidden="true" />
          <span className="cloud-veil cloud-veil-c" aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}
