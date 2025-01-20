import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
    <html lang="en" className="h-full">
      <body className={`${geistSans.className} antialiased h-full`}>
        <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen w-full flex flex-col font-inter relative">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
