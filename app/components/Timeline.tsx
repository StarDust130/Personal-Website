"use client";

import Image from "next/image";



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

  const timelineData = [
    {
      year: "2024",
      title: "Present Day",
      description:
        "Currently exploring new horizons and pushing boundaries in technology and design. Every day brings new challenges and opportunities for growth.",
      emoji: "🚀",
      images: ["/anime-girl-3.jpg", "/anime-girl-3.jpg"],
    },
    {
      year: "2023",
      title: "Year of Growth",
      description:
        "A transformative year filled with learning, challenges, and significant milestones. Expanded skills in multiple directions while taking on new responsibilities.",
      emoji: "🌱",
      images: ["/anime-girl-3.jpg", "/anime-girl-3.jpg", "/anime-girl-3.jpg"],
    },
    {
      year: "2022",
      title: "New Beginnings",
      description:
        "Started on an exciting journey of discovery and innovation. Laid the foundation for future successes through dedication and hard work.",
      emoji: "✨",
      images: ["/anime-girl-3.jpg", "/anime-girl-3.jpg"],
    },
  ];

const TimelinePage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f172a_0%,#000_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#00000000_0%,#00000080_20%,#00000080_80%,#00000000_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">my journey so far ✨</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Evolution
            </span>
          </h1>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div
                className={`
                  group relative mx-auto rounded-3xl p-6 
                  transition-all duration-500 ease-out cursor-pointer
                  ${
                    expandedIndex === index
                      ? "bg-white/10 backdrop-blur-md shadow-lg shadow-cyan-500/10"
                      : "bg-white/5 hover:bg-white/10 hover:backdrop-blur-sm"
                  }
                `}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                {/* Year label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-sm font-mono">
                    {item.year}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                </div>

                {/* Title */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
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
                      {/* Images */}
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
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-square rounded-2xl overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Timeline image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                              width={500}
                              height={500}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Connector line */}
              {index !== timelineData.length - 1 && (
                <div className="absolute -bottom-8 left-1/2 h-8 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
