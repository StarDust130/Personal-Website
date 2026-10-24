import { ImageResponse } from "next/og";
import OgCard from "@/components/blog/og-card";
import { siteConfig } from "@/lib/site";

export const alt = "Writing — Chandrashekhar Yadav";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Writing"
        title="Things I've been thinking about."
        description={siteConfig.writingDescription}
        footerLabel="Read the writing →"
      />
    ),
    { ...size }
  );
}
