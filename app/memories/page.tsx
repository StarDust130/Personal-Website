import { Metadata } from "next";
// import MemoriesPage from "../components/MemoriesPage";
import Image from "next/image";

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
    // <div className="flex flex-col w-full min-h-screen bg-black text-white">
    //   {/* <MemoriesPage /> */}
    // </div>
    <div className="flex flex-col w-full min-h-screen bg-black text-white px-4 py-6 space-y-5">
      {/* Flirty Anime Girl Avatar */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mt-2 group">
        <div className="absolute inset-0  blur-xl opacity-40 animate-pulse" />
        <img
          src="/d.gif"
          alt="anime-girl"
          className="mx-auto rounded-full w-72 sm:w-80 md:w-[30vw]  transition-transform duration-300 hover:scale-110 cursor-pointer z-10 relative"
        />
      </div>

      {/* Funny Flirty Gen Z Heading */}
      <h1 className="text-center text-lg sm:text-2xl font-semibold">
        😤 Study hard, Level 7 Baddie 😏💋
        <br />
      </h1>

      {/* Vibe GIF */}
      <Image
        src="https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif"
        alt="Study Mood"
        height={400}
        width={400}
        className="rounded-xl mx-auto shadow-md max-w-[90%] sm:max-w-xs"
      />
      <span className="text-xs text-center">
        Oops 😳 You weren&apos;t supposed to see that… or were you? 💅👀
      </span>
    </div>
  );
};
export default Memories;
