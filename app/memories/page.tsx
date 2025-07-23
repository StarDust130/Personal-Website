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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black text-white space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        📚 Study Hard, LEVEL 7 Baddie 😉💙
      </h1>
      <Image
        src={"https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif"}
        alt="Study Hard Baddie"
        height={500}
        width={500}
        className="rounded-2xl shadow-lg"
      />
    </div>
  );
};
export default Memories;
