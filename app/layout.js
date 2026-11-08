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
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const noto = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata = {
  title: wedding.meta.title,
  description: wedding.meta.description,
  icons: {
    icon: "/background-art.webp",
    shortcut: "/background-art.webp",
    apple: "/background-art.webp",
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
