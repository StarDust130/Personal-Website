import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["technology", "development", "personal"],
    icons: [
      {
        src: "/icon.png",
        sizes: "641x390",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [],
    shortcuts: [
      {
        name: "Writing",
        short_name: "Writing",
        description: "Read my latest posts",
        url: "/blog",
        icons: [{ src: "/icon.png", sizes: "641x390" }],
      },
    ],
  };
}