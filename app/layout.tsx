import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Abhi Wadhwa — Applied Mathematics, Game Theory, Optimization",
  description:
    "Applied Mathematics at USC. Researching game theory, optimization, and market design. Previously at Optiver, Iron Pillar Fund, The World Bank, and RBC Capital Markets.",
  openGraph: {
    title: "Abhi Wadhwa",
    description:
      "Applied Math @ USC · Game Theory · Optimization · Market Design",
    url: "https://abhiw.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhi Wadhwa",
    description: "Applied Math @ USC · Game Theory · Optimization",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${satoshi.variable}`}>
      <body>{children}</body>
    </html>
  );
}
