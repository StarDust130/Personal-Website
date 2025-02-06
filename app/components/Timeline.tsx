"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const timelineData = [
  {
    year: "2000",
    title: "Newborn",
    emoji: "👶",

    description: "Hello world! Born in the digital age",
    images: ["/anime-girl-3.jpg", "/anime-girl-2.jpg"],
  },
  {
    year: "2010",
    title: "Tech Enthusiast",
    emoji: "💻",
    images: ["/anime-girl-3.jpg", "/anime-girl-2.jpg", "/anime-girl-2.jpg"],
  },
  {
    year: "2020",
    title: "Developer ",
    emoji: "🚀",
    description: "Started coding journey, built first website",
    images: ["/anime-girl-3.jpg", "/anime-girl-2.jpg"],
  },
  {
    year: "2024",
    title: "Pro Coder ",
    emoji: "😎",
    description: "Creating awesome projects daily",
    images: [
      "/anime-girl-3.jpg",
      "/anime-girl-2.jpg",
      "/anime-girl-2.jpg",
      "/anime-girl-2.jpg",
    ],
  },
];

export default function TimelinePage() {
  return (
    <div className=" bg-black text-white scroll-smooth">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,transparent_70%)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-5 md:py-8 sm:px-8 lg:px-12 max-w-6xl">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-extrabold text-center md:mb-20 mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent tracking-tight"
        >
          My Evolution
        </motion.h1>

        {/* Timeline */}
        <div className="relative space-y-20 lg:space-y-24">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Content Card */}
              <div className="relative mx-auto bg-zinc-900/60 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 border border-white/10 lg:w-3/4">
                {/* Image Grid */}
                <div
                  className={`mb-6 grid gap-3 cursor-pointer ${
                    item.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  } md:grid-cols-${Math.min(item.images.length, 4)}`}
                >
                  {item.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative aspect-square  rounded-3xl overflow-hidden transition-all hover:scale-[1.05] hover:shadow-lg"
                    >
                      <Image
                        src={img}
                        alt={`Timeline image ${imgIndex}`}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-pink-400" />
                    <span className="text-cyan-400 font-mono text-sm">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                      {item.title}
                    </span>{" "}
                    {item.emoji}
                  </h3>

                  <p className="text-zinc-300 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Decorative Line */}
              {index !== timelineData.length - 1 && (
                <div className="absolute -bottom-20 left-1/2 h-20 w-px bg-gradient-to-b from-cyan-400/50 to-pink-400/50 transform -translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
