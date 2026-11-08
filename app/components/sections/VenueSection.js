"use client";

import wedding from "../../data/wedding";
import Countdown from "../Countdown";
import FadeIn from "../FadeIn";
import InkDropImage from "../InkDropImage";
import { GoldDivider, LocationIcon } from "../Ornaments";

export default function VenueSection() {
  const { venue } = wedding;

  return (
    <section className="paper-texture relative flex min-h-full items-center justify-center overflow-hidden px-6 py-16 pb-24 text-brown sm:py-20">
      <div className="relative z-10 mx-auto w-full max-w-lg text-center" data-invite-text>
        <FadeIn>
          <div className="mb-3 flex justify-center">
            <LocationIcon />
          </div>
          <p className="font-display text-[0.65rem] uppercase tracking-[0.34em] text-gold">
            Venue
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-wide text-brown sm:text-4xl">
            {venue.name}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6">
          <div className="mx-auto w-[min(100%,360px)] overflow-hidden border border-gold/35 bg-ivory p-2 shadow-[0_16px_36px_rgba(20,40,28,0.1)]">
            <InkDropImage
              src={wedding.images.venue}
              alt={`${venue.name} wedding venue`}
              sizes="430px"
              aspectClass="aspect-[16/10]"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.18} className="mt-5">
          <p className="font-serif text-base leading-relaxed text-brown-soft sm:text-lg">
            {venue.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="invite-cta invite-cta-dark mt-6"
          >
            View on Google Maps
          </a>

          <p className="mx-auto mt-5 max-w-xs font-serif text-sm italic text-brown-soft">
            {venue.presenceLine}
          </p>
        </FadeIn>

        <div className="my-8">
          <GoldDivider />
        </div>

        <FadeIn>
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            Counting Down
          </p>
          <p className="mt-2 font-serif text-sm text-brown-soft">
            Until Reception of Baraat
          </p>
          <Countdown target={wedding.countdownTarget} className="mt-5" />
        </FadeIn>
      </div>
    </section>
  );
}
