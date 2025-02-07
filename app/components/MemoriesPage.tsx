"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  Rocket,
  Share2,
  ExternalLink,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MemoriesData = [
  {
    year: "2024",
    title: "Present Day",
    description:
      "Currently pushing boundaries and exploring new horizons in technology and design. Every day brings exciting challenges and opportunities for growth.",
    emoji: "🚀",
    tags: ["Technology", "Innovation", "Growth"],
    metrics: {
      projects: 12,
      achievements: 8,
      collaborations: 5,
    },
    images: ["/3.jpg", "/4.jpg"],
  },
  {
    year: "2023",
    title: "Year of Growth",
    description:
      "A transformative year filled with learning and significant milestones. Expanded skills across multiple domains while taking on new challenges.",
    emoji: "⭐",
    tags: ["Learning", "Achievement", "Milestone"],
    metrics: {
      projects: 8,
      achievements: 6,
      collaborations: 3,
    },
    images: ["/5.jpg", "/anime-girl-2.jpg", "/anime-girl-2.jpg"],
  },
  {
    year: "2022",
    title: "New Beginnings",
    description:
      "Started an exciting journey of discovery and innovation. Built the foundation for future success through dedication and continuous learning.",
    emoji: "✨",
    tags: ["Starting", "Foundation", "Discovery"],
    metrics: {
      projects: 5,
      achievements: 3,
      collaborations: 2,
    },
    images: ["/anime-girl-2.jpg"],
  },
];

const MemoriesPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f172a_0%,#000_70%)]" />
      </div>

      <div className="relative container mx-auto px-4 py-8 pb-10 md:py-12 max-w-5xl">
        {/* Parallax Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="sticky top-0 text-center mb-16 md:pt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium">Explore the Journey ✨</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              My Evolution
            </motion.span>
          </h1>
        </motion.div>

        {/* Memories */}
        <div className="space-y-12">
          {MemoriesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.div
                className={`
                  relative mx-auto rounded-3xl p-8
                  transition-all duration-500 ease-out cursor-pointer
                  ${
                    expandedIndex === index
                      ? "bg-white/10 backdrop-blur-lg shadow-xl shadow-purple-500/10"
                      : "bg-white/5 hover:bg-white/10 hover:backdrop-blur-sm"
                  }
                  border border-white/10
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                {/* Year */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-purple-400/10 text-purple-400 text-sm font-mono">
                    {item.year}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-400/50 to-transparent" />
                </div>

                {/* Title */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {item.title}
                    </span>
                    <span className="ml-2">{item.emoji}</span>
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* Images with hover effect */}
                      <div
                        className={`
                        grid gap-4 my-6
                        ${
                          item.images.length === 1
                            ? "grid-cols-1"
                            : item.images.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-2 md:grid-cols-3"
                        }
                      `}
                      >
                        {item.images.map((img, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            whileHover={{
                              scale: 1.05,
                              rotateY: 10,
                            }}
                            className="relative aspect-square rounded-2xl overflow-hidden group perspective"
                          >
                            <Dialog>
                              <DialogTrigger
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Image
                                  src={img}
                                  alt={`Moment ${imgIndex + 1}`}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-2xl z-30"
                                />
                              </DialogTrigger>
                              <DialogContent
                                onClick={(e) => e.stopPropagation()}
                              >
                                <DialogHeader className="flex flex-col gap-4 items-center text-center">
                                  <Image
                                    src={img}
                                    alt={`Moment ${imgIndex + 1}`}
                                    width={300} // Adjust size as needed
                                    height={200} // Adjust size as needed
                                    className="rounded-xl"
                                  />
                                  <DialogTitle className="text-lg font-bold">
                                    Are you absolutely sure?
                                  </DialogTitle>
                                  <DialogDescription className="text-sm text-gray-600">
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>

                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/30 to-transparent"
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <ExternalLink className="w-6 h-6 text-white/80" />
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Description with animated reveal */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Interactive buttons */}
                        <div className="flex gap-4 mt-6">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/20"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10"
                          >
                            <Rocket className="w-4 h-4" />
                            <span>Learn More</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Animated connector */}
              {index !== MemoriesData.length - 1 && (
                <motion.div
                  className="absolute -bottom-12 left-1/2 h-12 w-px bg-gradient-to-b from-purple-400/30 to-transparent"
                  animate={{
                    height: [48, 52, 48],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesPage;
