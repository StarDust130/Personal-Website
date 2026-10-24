import { ImageResponse } from "next/og";
import OgCard from "@/components/blog/og-card";

export const alt = "Chandrashekhar Yadav";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Developer · Builder · Writer"
        title="Chandrashekhar Yadav"
        description="I build thoughtful things for the web and write about what I learn."
      />
    ),
    { ...size }
  );
}
