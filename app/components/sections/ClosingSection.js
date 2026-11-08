"use client";

import Image from "next/image";
import wedding from "../../data/wedding";
import { DiyaGlow } from "../Atmosphere";
import FadeIn from "../FadeIn";
import { LotusOrnament, PeacockPair } from "../Ornaments";
import { FooterOverlays } from "../OverlayDecor";

export default function ClosingSection() {
  return (
    <section
      className="relative flex min-h-full flex-col overflow-x-hidden text-brown"
      style={{ backgroundColor: "#fdecd4" }}
    >
      {/* Side garlands — only over the upper text area, not the bottom image */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-[62%]"
        aria-hidden="true"
      >
        <Image
          src="/invitation/border-left.webp"
          alt=""
          width={80}
          height={1200}
          className="absolute bottom-0 left-0 top-0 h-full w-[28px] object-cover object-left select-none sm:w-[34px]"
        />
        <Image
          src="/invitation/border-right.webp"
          alt=""
          width={80}
          height={1200}
          className="absolute bottom-0 right-0 top-0 h-full w-[28px] object-cover object-right select-none sm:w-[34px]"
        />

        <div className="overlay-top-left absolute inset-y-0 left-0 w-[42%] origin-[20%_0%] opacity-90 sm:w-[36%]">
          <Image
            src="/invitation/overlay-top-decor.webp"
            alt=""
            fill
            sizes="40vw"
            className="object-contain object-left-top select-none [clip-path:inset(0_50%_0_0)]"
          />
        </div>
        <div className="overlay-top-right absolute inset-y-0 right-0 w-[42%] origin-[80%_0%] opacity-90 sm:w-[36%]">
          <Image
            src="/invitation/overlay-top-decor.webp"
            alt=""
            fill
            sizes="40vw"
            className="object-contain object-right-top select-none [clip-path:inset(0_0_0_50%)]"
          />
        </div>
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 pb-4 pt-10 text-center"
        data-invite-text
      >
        <FadeIn>
          <PeacockPair className="mx-auto h-auto w-48 opacity-80 sm:w-56" />
          <p className="mt-5 font-display text-[0.65rem] uppercase tracking-[0.34em] text-gold">
            {wedding.closing.regards}
          </p>
          <p className="mt-3 font-script text-4xl text-maroon sm:text-5xl">
            {wedding.closing.from}
          </p>
          <p className="mx-auto mt-4 max-w-xs font-serif text-sm italic leading-relaxed text-brown-soft">
            {wedding.venue.presenceLine}
          </p>
          <div className="mt-6">
            <LotusOrnament />
          </div>
          <p className="mt-6 font-script text-3xl text-maroon">
            {wedding.couple.bride} &amp; {wedding.couple.groom}
          </p>
        </FadeIn>
      </div>

      {/* Full-bleed couple art — sides only cropped, top fully visible */}
      <div className="relative z-20 mt-auto w-full shrink-0 overflow-hidden">
        <div className="relative left-1/2 w-[112%] max-w-none -translate-x-1/2">
          <Image
            src={wedding.images.coupleArt}
            alt=""
            width={1080}
            height={960}
            sizes="112vw"
            className="block h-auto w-full select-none"
            priority
          />
          <FooterOverlays />
          <DiyaGlow />
        </div>
      </div>
    </section>
  );
}
