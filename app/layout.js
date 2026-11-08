import {
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
  Noto_Serif_Devanagari,
} from "next/font/google";
import wedding from "./data/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
  display: "swap",
});

const noto = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-noto",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: wedding.meta.title,
  description: wedding.meta.description,
  icons: {
    icon: "/icon.webp",
    shortcut: "/icon.webp",
    apple: "/icon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ishani & Manween",
    title: wedding.meta.title,
    description: wedding.meta.description,
    images: [
      {
        url: wedding.meta.ogImage,
        width: 1280,
        height: 720,
        alt: "You're Invited — Tap to open",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.meta.title,
    description: wedding.meta.description,
    images: [wedding.meta.ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7efdf",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${noto.variable} ${greatVibes.variable}`}
    >
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
