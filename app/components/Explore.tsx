import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  return (
    <section id="explore" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white sm:text-5xl">
            Explore and Discover 🚀
          </h2>
          <p className="mt-4 text-xs md:text-lg text-gray-400">
            Dive into my Memories, hobbies, experiences, and more.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              title: "🌟 Memories  ",
              desc: "Good times, big smiles, and zero regrets! ✨",
              image: "/anime-girl-2.jpg",
              url: "/memories#hero",
            },
            {
              title: "❓ Quiz",
              desc: "Think you know me? Take the challenge! 🤔",
              image: "/anime-girl-3.jpg",
              url: "/quiz#hero",
            },
            {
              title: "💼 Work",
              desc: "Where I hustle (fueled by snacks and dreams). 🍿✨",

              image: "/anime-girl-4.jpg",
              url: "/work",
            },
            {
              title: "🌶️ What I Like",
              desc: "Movies, anime, geopolitics... and maybe you? 😏",
              image: "/anime-girl-5.jpg",
              url: "/likes",
            },
          ].map((item, idx) => (
            <article
              key={idx}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-700"
            >
              <Link href={item.url}>
                {/* Image */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    alt={item.title}
                    src={item.image}
                    className="absolute brightness-110 object-cover hover:scale-105 transition-transform cursor-pointer"
                    fill
                    quality={100}
                    priority
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 bg-gray-900">
                  {/* Title */}
                  <h3 className="mt-2  text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm  text-gray-400">{item.desc}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
