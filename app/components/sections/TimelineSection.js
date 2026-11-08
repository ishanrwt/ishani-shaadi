"use client";

import { motion } from "framer-motion";
import wedding from "../../data/wedding";
import FadeIn from "../FadeIn";
import { EventIcon, FloralCorner, GoldDivider } from "../Ornaments";

const ease = [0.22, 1, 0.36, 1];

export default function TimelineSection() {
  return (
    <section className="paper-texture relative flex min-h-full items-center overflow-hidden px-5 py-16 pb-24 text-brown sm:py-20">
      <FloralCorner className="pointer-events-none absolute -left-6 top-10 w-24 opacity-55 sm:w-32" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-6 bottom-10 w-24 opacity-55 sm:w-32"
      />

      <div className="relative z-10 mx-auto max-w-lg">
        <FadeIn className="text-center">
          <p className="font-display text-[0.65rem] font-medium uppercase tracking-[0.34em] text-gold">
            Programme
          </p>
          <h2 className="mt-3 font-script text-5xl text-maroon sm:text-6xl">
            Golden Moments
          </h2>
          <div className="mt-5">
            <GoldDivider />
          </div>
        </FadeIn>

        <ol className="relative mt-12 space-y-6">
          <div
            className="absolute bottom-4 left-[1.65rem] top-4 w-px bg-gradient-to-b from-gold/15 via-gold/50 to-gold/15 sm:left-[1.85rem]"
            aria-hidden="true"
          />

          {wedding.events.map((event, index) => (
            <motion.li
              key={event.id}
              className="relative grid grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[4rem_1fr] sm:gap-4"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, delay: index * 0.08, ease }}
            >
              <div className="relative z-10 flex justify-center pt-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ivory sm:h-14 sm:w-14">
                  <EventIcon type={event.icon} />
                </div>
              </div>

              <article className="border border-gold/30 bg-ivory/70 px-4 py-5 sm:px-5">
                <h3 className="font-script text-3xl leading-none text-maroon sm:text-[2.1rem]">
                  {event.name}
                </h3>
                <p className="mt-3 font-serif text-base text-brown">{event.date}</p>
                <p className="mt-1 font-display text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                  {event.time}
                </p>
                {event.venue ? (
                  <p className="mt-3 font-serif text-sm leading-relaxed text-brown-soft">
                    {event.venue}
                  </p>
                ) : null}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
