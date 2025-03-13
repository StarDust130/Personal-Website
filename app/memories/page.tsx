import { Metadata } from "next";
import MemoriesPage from "../components/MemoriesPage";

export const metadata: Metadata = {
  title: "Memories - Chandrashekhar",
  description:
    "Explore Chandrashekhar's memories, experiences, and journey as a developer.",
  keywords:
    "Chandrashekhar, memories, developer journey, experiences, projects",
  openGraph: {
    title: "Memories - Chandrashekhar",
    description: "Discover key moments that shaped my journey.",
    url: "https://chandrashekhar.life/memories",
    siteName: "Chandrashekhar",
    images: [
      {
        url: "https://chandrashekhar.life/memories-og.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Memories - Chandrashekhar",
      },
    ],
    type: "article",
  },
};


const Memories = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      <MemoriesPage />
    </div>
  );
};
export default Memories;
