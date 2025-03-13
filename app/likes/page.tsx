import { Metadata } from "next";
import LikesPage from "../components/LikesPage"

export const metadata: Metadata = {
  title: "Likes - Chandrashekhar",
  description:
    "A collection of my favorite books, movies, tech, and inspirations. See what I love!",
  keywords: "Chandrashekhar, Favorite Books, Movies, Tech, Inspirations, Likes",
  openGraph: {
    title: "Likes - Things I Enjoy | Chandrashekhar",
    description:
      "A collection of my favorite books, movies, tech, and inspirations. See what I love!",
    url: "https://chandrashekhar.life/likes",
    siteName: "Chandrashekhar",
    images: [
      {
        url: "https://chandrashekhar.life/likes-og.jpg", // Add a proper OG image
        width: 1200,
        height: 630,
        alt: "Likes - Things I Enjoy",
      },
    ],
    type: "website",
  },
};


const page = () => {
  return (
    <LikesPage />
  )
}
export default page