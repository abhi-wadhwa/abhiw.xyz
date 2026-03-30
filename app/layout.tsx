import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
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
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakarta.variable}`}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
