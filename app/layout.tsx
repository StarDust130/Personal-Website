import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import FloatingDots from "./components/FloatingDots";
import { ShootingStars } from "@/components/ui/shooting-stars";
import BgSvg from "./components/BgSvg";
import { displayFont, monoFont, serifFont } from "./fonts";

const geistSans = Spectral({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Chandrashekhar Yadav",
  description:
    "Official website of Chandrashekhar, a passionate developer, dreamer, and future startup founder.",
  keywords: "Chandrashekhar, web developer, frontend, startup, programmer",
  openGraph: {
    title: "Chandrashekhar - Developer & Innovator",
    description:
      "Explore sleek, functional web experiences built with creativity.",
    url: "https://chandrashekhar.life",
    siteName: "Chandrashekhar",
    images: [
      {
        url: "https://chandrashekhar.life/og-image.jpg", // Replace with your real OG image URL
        width: 1200,
        height: 630,
        alt: "Chandrashekhar - Developer Portfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${displayFont.variable} ${serifFont.variable} ${monoFont.variable} antialiased h-full`}
      >
        <main
          id="hero"
          className="   shadow-glow-purple  min-h-screen w-full flex flex-col font-inter relative"
        >
          {children}
          <Analytics />
          <BgSvg />
          <FloatingDots />
          <ShootingStars />
        </main>
      </body>
    </html>
  );
}
