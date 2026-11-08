"use client";

import wedding from "../../data/wedding";
import FadeIn from "../FadeIn";
import { FloralCorner, GoldDivider, OrnamentalArch } from "../Ornaments";

export default function RsvpSection() {
  const { rsvp, residence } = wedding;
  const primary = rsvp.phones[0];

  return (
    <section className="paper-texture relative flex min-h-full items-center overflow-hidden px-5 py-12 pb-24 sm:py-16">
      <FloralCorner className="pointer-events-none absolute -left-4 top-12 w-28 opacity-70" />
      <FloralCorner
        flip
        className="pointer-events-none absolute -right-4 bottom-12 w-28 opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-lg text-center" data-invite-text>
        <FadeIn>
          <div className="relative mx-auto w-[min(100%,320px)]">
            <OrnamentalArch className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
            <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-12">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.34em] text-gold">
                R.S.V.P
              </p>
              <div className="mt-4 space-y-1">
                {rsvp.families.map((family) => (
                  <p
                    key={family}
                    className="font-serif text-xl text-brown sm:text-2xl"
                  >
                    {family}
                  </p>
                ))}
              </div>
              <p className="mx-auto mt-5 max-w-[14rem] font-serif text-sm leading-relaxed text-brown-soft">
                <span className="font-display text-[0.58rem] uppercase tracking-[0.2em] text-gold">
                  {residence.label}
                </span>
                <br />
                {residence.address}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="my-5">
          <GoldDivider />
        </div>

        <FadeIn>
          <div className="flex flex-col items-stretch gap-2.5 sm:mx-auto sm:max-w-md">
            {rsvp.phones.map((phone) => (
              <div
                key={phone.tel}
                className="grid grid-cols-2 gap-2 border border-gold/30 bg-ivory/70 p-2.5"
              >
                <a
                  href={`tel:${phone.tel}`}
                  className="invite-cta invite-cta-dark w-full px-2 text-[0.58rem]"
                >
                  Call {phone.display}
                </a>
                <a
                  href={phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="invite-cta invite-cta-dark w-full px-2 text-[0.58rem]"
                >
                  WhatsApp
                </a>
              </div>
            ))}
          </div>

          <a
            href={primary.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="invite-cta invite-cta-dark mt-5"
          >
            Confirm Attendance
          </a>

          <p className="mt-5 font-serif text-sm italic text-brown-soft">
            Warm Regards — {rsvp.warmRegards}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
