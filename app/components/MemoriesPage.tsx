
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Memory {
  id: number;
  src: string;
  caption: string;
  shortTitle: string;
  category: string;
  year: string;
  color: string;
}

const MemoriesPage = () => {
  const [selectedImage, setSelectedImage] = useState<Memory | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const memories: Memory[] = [
    {
      id: 1,
      src: "/3.jpg",
      caption: "Summer vibes in California 🌴",
      shortTitle: "Summer '23",
      category: "adventures",
      year: "2023",
      color: "from-orange-400 to-pink-500",
    },
    {
      id: 2,
      src: "/4.jpg",
      caption: "Midnight coding sessions ☕",
      shortTitle: "Code Night",
      category: "lifestyle",
      year: "2023",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: 3,
      src: "/5.jpg",
      caption: "Mountain adventures 🏔️",
      shortTitle: "Peak Views",
      category: "adventures",
      year: "2023",
      color: "from-green-400 to-teal-500",
    },
    {
      id: 4,
      src: "/6.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
  ];

  const categories = [
    { id: "all", emoji: "✨", label: "All Vibes" },
    { id: "adventures", emoji: "🏔️", label: "Adventures" },
    { id: "lifestyle", emoji: "🌟", label: "Lifestyle" },
    { id: "travel", emoji: "✈️", label: "Travel" },
  ];

  const filteredMemories =
    activeFilter === "all"
      ? memories
      : memories.filter((m) => m.category === activeFilter);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % memories.length);
    setSelectedImage(memories[(selectedIndex + 1) % memories.length]);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + memories.length) % memories.length);
    setSelectedImage(
      memories[(selectedIndex - 1 + memories.length) % memories.length]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-7xl md:mx-auto">
      {/* Hero Section with 3D Parallax */}
      <div className="relative w-[95%] md:w-full h-[60vh] md:mx-auto rounded-xl overflow-hidden perspective-1000">
        <motion.div
          initial={{ scale: 1.2, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 transform-style-3d"
        >
          <div className="absolute inset-0  bg-gradient-to-b from-purple-900/30 via-black/50 to-black" />
          <img
            src="/6.jpg"
            alt="Hero"
            className="w-full h-full object-cover opacity-40 transform translate-z-0"
          />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.h1
              className="text-7xl md:text-8xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Memories
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
              <p className="relative text-sm md:text-2xl text-gray-300 font-light px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                capturing life&apos;s aesthetic moments ✨ 💙
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>

      {/* Modern Filter Section */}
      <div className="container mx-auto  -mt-5 md:-mt-10 relative z-20">
        <motion.div
          className="flex gap-3 overflow-x-auto pb-6 px-2 md:px-0 hide-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.id)}
              className={`relative group px-2 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm  whitespace-nowrap snap-start transition-all 
          ${
            activeFilter === category.id
              ? "bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9]   text-white font-bold"
              : "bg-white/10 text-gray-200 hover:bg-white/20 backdrop-blur-md transition-all"
          }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.emoji}</span>
                <span>{category.label}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with Masonry-like Layout */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-8"
        >
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedImage(memory);
                setSelectedIndex(index);
              }}
            >
              <div className="relative aspect-square  md:aspect-auto md:h-full rounded-2xl overflow-hidden">
                <img
                  src={memory.src}
                  alt={memory.caption}
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.div
                    className={`bg-gradient-to-r ${memory.color} px-3 py-1.5 rounded-full self-start`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-medium">
                      {memory.shortTitle}
                    </span>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium leading-tight">
                      {memory.caption}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {memory.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal with advanced animations */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center p-4"
            >
              <div className="relative max-w-5xl w-full">
                <motion.div
                  className="relative aspect-video rounded-3xl overflow-hidden"
                  layoutId={`image-${selectedIndex}`}
                >
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.caption}
                    className="w-full h-full object-contain"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                  >
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedImage.shortTitle}
                    </h3>
                    <p className="text-gray-300">{selectedImage.caption}</p>
                  </motion.div>
                </motion.div>

                {/* Navigation buttons with hover effects */}
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 p-3 rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 p-3 rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoriesPage;