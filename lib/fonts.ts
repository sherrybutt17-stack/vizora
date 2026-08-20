import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";

/**
 * All three families ship variable fonts. Omitting `weight` lets next/font
 * serve the single variable file per family instead of one static file per
 * weight — fewer requests and less bytes on the critical path, which is what
 * was pushing LCP out on the homepage.
 */
export const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // only used for metrics/labels, never for LCP text
});

export const fontVars = `${display.variable} ${sans.variable} ${mono.variable}`;
