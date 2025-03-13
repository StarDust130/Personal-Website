import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  return (
    <section id="explore" className="py-16 ">
      <div className="mx-auto max-w-screen-xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white sm:text-6xl tracking-tight">
            🚀 Explore & Discover
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Unlock my world—memories, challenges, and cool obsessions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "🌟 Memories",
              desc: "Laughs, nostalgia, and epic stories.",
              image: "/anime-girl-2.jpg",
              url: "/memories#hero",
            },
            {
              title: "❓ Quiz",
              desc: "Do you really know me? Prove it! 🧐",
              image: "/anime-girl-3.jpg",
              url: "/quiz#hero",
            },
            {
              title: "💼 Work",
              desc: "Building cool stuff, one line at a time.",
              image: "/anime-girl-4.jpg",
              url: "/work",
            },
            {
              title: "🔥 Favorites",
              desc: "Movies, anime, tech & things I love.",
              image: "/anime-girl-5.jpg",
              url: "/likes",
            },
          ].map((item, idx) => (
            <article
              key={idx}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-900/80 shadow-lg backdrop-blur-md border border-gray-700 transition-all hover:scale-[1.03] hover:shadow-2xl hover:border-gray-500"
            >
              <Link href={item.url}>
                {/* Image */}
                <div className="relative h-56 sm:h-64">
                  <Image
                    alt={item.title}
                    src={item.image}
                    className="absolute inset-0 object-cover brightness-110 transition-transform duration-300 group-hover:scale-105"
                    fill
                    quality={100}
                    priority
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 bg-gray-950/90 text-white">
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-yellow-400 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 font-light">
                    {item.desc}
                  </p>
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
