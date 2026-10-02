import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const site = {
  name: "Chandrashekhar Yadav",
  domain: "https://csyadav.vercel.app",
  github: "https://github.com/StarDust130",
  linkedin: "https://www.linkedin.com/",
};

const description =
  "The digital home of Chandrashekhar Yadav. He builds things, writes software, explores AI, reads philosophy, meditates, and tries to understand the world a little more deeply.";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),

  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },

  description,

  authors: [
    {
      name: site.name,
      url: site.domain,
    },
  ],

  creator: site.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: site.domain,
    siteName: site.name,
    title: site.name,
    description,
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: site.name,
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.domain,
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Software",
    "Artificial Intelligence",
    "Philosophy",
    "Meditation",
    "Technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="bg-ink font-sans text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {children}

        <Analytics />
      </body>
    </html>
  );
}