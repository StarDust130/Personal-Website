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
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}><Navbar />{children}</body>
    </html>
  );
}
