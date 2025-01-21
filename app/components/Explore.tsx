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
            Dive into my timeline, hobbies, experiences, and more.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Timeline",
              desc: "Discover my journey from the start to now.",
              date: "2023",
              image:
                "https://images.unsplash.com/photo-1657815555962-297100ce4b0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Hobbies",
              desc: "Explore the things I love to do.",
              date: "2022",
              image:
                "https://images.unsplash.com/photo-1657815555962-297100ce4b0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Experience",
              desc: "Learn about my professional background.",
              date: "2021",
              image:
                "https://images.unsplash.com/photo-1657815555962-297100ce4b0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((item, idx) => (
            <article
              key={idx}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg border border-gray-700"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56">
                <Image
                  alt={item.title}
                  src={item.image}
                  className="absolute inset-0 h-full w-full object-cover"
                  width={300}
                  height={300}
                  priority
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 bg-gray-900">
                {/* Date */}
                <time
                  dateTime={item.date}
                  className="text-xs font-semibold uppercase text-gray-500"
                >
                  {item.date} - Now
                </time>

                {/* Title */}
                <h3 className="mt-2 text-lg font-bold text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>

                {/* Button */}
                <div className="mt-auto pt-4">
                  <Link
                    href="#"
                    className="block text-center text-sm font-bold uppercase text-yellow-400 hover:text-yellow-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
