import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import FloatingDots from "./components/FloatingDots";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Footer from "./components/Footer";

const geistSans = Spectral({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Chandrashekhar",
  description:
    "The personal space of Chandrashekhar—a passionate developer, dreamer, and future startup founder. Crafting sleek, functional web experiences with a touch of creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased h-full`}>
        <main
          id="hero"
          className="bg-black   shadow-glow-purple text-white min-h-screen w-full flex flex-col font-inter relative"
        >
          <Navbar />
          {children}
          <Analytics />
          <FloatingDots />
          <ShootingStars />
          <Footer />
        </main>
      </body>
    </html>
  );
}
