"use client";

import wedding from "../../data/wedding";
import FadeIn from "../FadeIn";
import InkDropImage from "../InkDropImage";
import { FloralCorner } from "../Ornaments";

export default function QuoteSection() {
  return (
    <section className="paper-texture relative flex min-h-full items-center justify-center overflow-hidden px-6 py-16 pb-24 sm:py-20">
      <FloralCorner className="pointer-events-none absolute -left-2 top-8 w-28 opacity-80 sm:w-36" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-2 bottom-6 w-28 opacity-80 sm:w-36"
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center"
        data-invite-text
      >
        <FadeIn className="mb-5">
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            With Love
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="w-full">
          <div className="relative mx-auto w-[min(100%,320px)] rotate-[-1deg]">
            <div className="border border-gold/40 bg-ivory p-3 shadow-[0_18px_40px_rgba(20,40,28,0.12)]">
              <InkDropImage
                src={wedding.images.story}
                alt={`${wedding.couple.bride} and ${wedding.couple.groom} as children`}
                sizes="320px"
              />
              <p className="mt-3 font-script text-2xl text-maroon sm:text-3xl">
                {wedding.couple.bride} &amp; {wedding.couple.groom}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-6">
          <blockquote className="mx-auto max-w-md px-2 font-serif text-base italic leading-relaxed text-brown-soft sm:text-lg">
            {wedding.quote}
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
