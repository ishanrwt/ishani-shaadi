"use client";

import { FloatingPetals } from "./Atmosphere";
import InviteSplash from "./InviteSplash";
import SlideDeck from "./SlideDeck";
import ClosingSection from "./sections/ClosingSection";
import HeroSection from "./sections/HeroSection";
import QuoteSection from "./sections/QuoteSection";
import RsvpSection from "./sections/RsvpSection";
import SacredInviteSection from "./sections/SacredInviteSection";
import TimelineSection from "./sections/TimelineSection";
import VenueSection from "./sections/VenueSection";

const slides = [
  { id: "hero", label: "Invitation", render: HeroSection },
  { id: "sacred", label: "Blessings", render: SacredInviteSection },
  { id: "timeline", label: "Golden Moments", render: TimelineSection },
  { id: "quote", label: "With Love", render: QuoteSection },
  { id: "venue", label: "Venue", render: VenueSection },
  { id: "rsvp", label: "RSVP", render: RsvpSection },
  { id: "closing", label: "Closing", render: ClosingSection },
];

export default function Invitation() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#2a1810]">
      {/* Always render as a mobile-width invitation card */}
      <div className="relative h-dvh w-full max-w-[430px] overflow-hidden bg-cream shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <InviteSplash manageOverflow={false} />
        <FloatingPetals />
        <SlideDeck slides={slides} />
      </div>
    </main>
  );
}
