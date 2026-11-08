"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import wedding from "../../data/wedding";
import { GoldDivider, OrnamentalArch } from "../Ornaments";
import { HeaderOverlays } from "../OverlayDecor";

const ease = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const { couple, hero } = wedding;

  return (
    <section className="relative flex min-h-full flex-col overflow-hidden bg-cream pt-10 text-brown">
      <div
        className="pointer-events-none absolute inset-0 flex justify-center"
        aria-hidden="true"
      >
        <div className="relative flex h-full w-full max-w-[540px] flex-col overflow-hidden">
          {/* Top header art + moving overlays in original position */}
          <div className="relative z-10 w-full shrink-0">
            <Image
              src={wedding.images.heroDecor}
              alt=""
              width={1080}
              height={860}
              priority
              sizes="430px"
              className="block h-auto w-full select-none"
            />
            <HeaderOverlays />
          </div>

          {/* Repeating middle panel — continues side borders to the bottom */}
          <div
            className="relative -mt-28 min-h-0 flex-1 bg-repeat-y sm:-mt-36"
            style={{
              backgroundImage: `url('${wedding.images.panel}')`,
              backgroundSize: "100% auto",
            }}
          />

          {/* Static edge borders for continuous side line to the bottom */}
          <Image
            src="/invitation/border-left.webp"
            alt=""
            width={80}
            height={1200}
            className="absolute bottom-0 left-0 top-[12%] z-[5] h-[88%] w-[8%] object-fill select-none"
          />
          <Image
            src="/invitation/border-right.webp"
            alt=""
            width={80}
            height={1200}
            className="absolute bottom-0 right-0 top-[12%] z-[5] h-[88%] w-[8%] object-fill select-none"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-start px-5 pb-8 pt-40 text-center sm:pt-44" data-invite-text>
        <motion.p
          className="font-serif text-base italic leading-relaxed text-brown-soft sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-sm font-serif text-sm leading-relaxed text-brown-soft/80 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          {hero.inviteLine}
        </motion.p>

        <motion.div
          className="relative mx-auto mt-8 w-[min(100%,340px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          <OrnamentalArch className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
          <h1 className="relative z-10 px-8 py-10 sm:px-10 sm:py-12">
            <span className="block font-script text-[3.6rem] leading-none text-maroon sm:text-[4.6rem]">
              {couple.bride}
            </span>
            <span className="gold-shimmer my-2 block font-serif text-xl italic text-gold sm:text-2xl">
              {couple.conjunction}
            </span>
            <span className="block font-script text-[3.6rem] leading-none text-maroon sm:text-[4.6rem]">
              {couple.groom}
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
        >
          <GoldDivider />
          <p className="mt-5 font-display text-[0.68rem] font-medium uppercase tracking-[0.34em] text-gold">
            {hero.saveTheDateLabel}
          </p>
          <p className="mt-3 font-serif text-2xl text-brown sm:text-[1.75rem]">
            {hero.saveTheDate}
          </p>
          <p className="mx-auto mt-5 max-w-xs font-serif text-sm italic leading-relaxed text-brown-soft">
            {hero.closing}
          </p>
        </motion.div>
      </div>

      {/* Floral lotus border at the bottom */}
      <div className="pointer-events-none relative z-20 mt-auto w-full shrink-0 overflow-hidden" aria-hidden="true">
        <Image
          src={wedding.images.floralBorder}
          alt=""
          width={1600}
          height={400}
          sizes="430px"
          className="floral-wave block h-auto w-full select-none"
        />
      </div>
    </section>
  );
}
