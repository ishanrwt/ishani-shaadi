"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { FloatingPetals } from "./Atmosphere";
import BackgroundMusic from "./BackgroundMusic";
import InviteSplash from "./InviteSplash";
import SlideDeck from "./SlideDeck";
import HeroSection from "./sections/HeroSection";

const SacredInviteSection = dynamic(() => import("./sections/SacredInviteSection"));
const TimelineSection = dynamic(() => import("./sections/TimelineSection"));
const QuoteSection = dynamic(() => import("./sections/QuoteSection"));
const VenueSection = dynamic(() => import("./sections/VenueSection"));
const RsvpSection = dynamic(() => import("./sections/RsvpSection"));
const ClosingSection = dynamic(() => import("./sections/ClosingSection"));

export default function Invitation() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  const slides = [
    { id: "hero", label: "Invitation", render: HeroSection },
    { id: "sacred", label: "Blessings", render: SacredInviteSection },
    { id: "timeline", label: "Golden Moments", render: TimelineSection },
    { id: "quote", label: "With Love", render: QuoteSection },
    { id: "venue", label: "Venue", render: VenueSection },
    { id: "rsvp", label: "RSVP", render: RsvpSection },
    { id: "closing", label: "Closing", render: ClosingSection },
  ];

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#2a1810]">
      <div className="relative h-dvh w-full max-w-[430px] overflow-hidden bg-cream shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <BackgroundMusic />
        <InviteSplash manageOverflow={false} onComplete={handleSplashComplete} />
        {splashDone ? <FloatingPetals /> : null}
        <SlideDeck slides={slides} active={splashDone} />
      </div>
    </main>
  );
}
