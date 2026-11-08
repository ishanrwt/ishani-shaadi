"use client";

import wedding from "../../data/wedding";
import FadeIn from "../FadeIn";
import { GoldDivider, LotusOrnament } from "../Ornaments";

export default function SacredInviteSection() {
  const { sacred, blessings, couple, parents, programmeNote } = wedding;

  return (
    <section className="paper-texture relative flex min-h-full items-center overflow-hidden px-6 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url('${wedding.images.panel}')`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-lg text-center" data-invite-text>
        <FadeIn onLoad delay={0.05}>
          <p className="font-devanagari text-lg font-medium tracking-wide text-maroon sm:text-xl">
            ॥ {sacred.ganesh} ॥
          </p>
          <p className="mx-auto mt-5 max-w-md font-devanagari text-[0.95rem] leading-[1.9] text-brown-soft sm:text-base">
            {sacred.mantra}
          </p>
        </FadeIn>

        <div className="py-8">
          <GoldDivider />
        </div>

        <FadeIn>
          <p className="mx-auto max-w-sm font-serif text-base italic leading-relaxed text-brown-soft sm:text-lg">
            {blessings.grandparents}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <p className="mx-auto max-w-sm font-serif text-base leading-relaxed text-brown sm:text-lg">
            {blessings.inviteStatement}
          </p>

          <p className="mt-8 font-script text-5xl leading-none text-maroon sm:text-6xl">
            {couple.bride}
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-brown-soft sm:text-base">
            {parents.bride}
          </p>

          <p className="mt-6 font-serif text-base italic text-gold">With</p>

          <p className="mt-6 font-script text-5xl leading-none text-maroon sm:text-6xl">
            {couple.groom}
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-brown-soft sm:text-base">
            {parents.groom}
          </p>

          <p className="mt-8 font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            {programmeNote}
          </p>

          <div className="mt-8">
            <LotusOrnament />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
