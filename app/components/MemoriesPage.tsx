"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";

interface Memory {
  id: number;
  src: string;
  caption: string;
  shortTitle: string;
  category: string;
  year: string;
  color: string;
}

const ModernMemoriesPage = () => {
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
      src: "/9.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 5,
      src: "/14.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 6,
      src: "/15.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 7,
      src: "/19.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 8,
      src: "/26.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 9,
      src: "/24.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 10,
      src: "/me-16.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 11,
      src: "/me-17.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 12,
      src: "/me-17.2.jpg",
      caption: "Mount Fuji Reflection 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 13,
      src: "/me-18.jpg",
      caption: "babu Birthday 🌊",
      shortTitle: "Japan Dreams",
      category: "travel",
      year: "2023",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 14,
      src: "/me-19.jpg",
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
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
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
    <div className="min-h-screen  bg-black text-white  max-w-6xl md:mx-auto ">
      {/* Hero Section */}
      <div className=" h-[40vh] relative  w-auto overflow-hidden md:h-[60vh] items-center ">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
                }}
                className="relative text-7xl   md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 drop-shadow-lg animate-pulse"
              >
                Memories
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm md:text-xl font-light text-white/80"
              >
                <Typewriter
                  words={[
                    "A collection of great memories… none of them taken by me! 📸",
                    "Proof I was there… or just really good at stealing pics! 🤷‍♂️",
                    "I found all these in my album… or someone else’s! 📂",
                    "If others didn’t take my photos, I might not exist! 🤷‍♂️",
                    "My camera roll? Just screenshots and regrets! 📂",
                    "My phone has 0 photos, but my friends’ phones have my whole life! 📷",
                    "Fun fact: If I had to show my own photos, I’d have nothing! 😭",
                    "These aren’t mine, but I’ll pretend they are for the clout! 😎",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                />
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Categories with Smooth Entrance */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(category.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
                ease: "easeOut",
                duration: 0.8,
              }}
              className={`relative group px-3 py-1.5 rounded-3xl text-xs md:text-sm font-medium whitespace-nowrap transition-all 
        ${
          activeFilter === category.id
            ? "bg-gradient-to-r from-[#007bff] to-[#00a6ff] text-white shadow-lg"
            : "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md"
        }`}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-base md:text-lg">{category.emoji}</span>
                <span>{category.label}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with Smooth Transitions */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 my-6"
        >
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedImage(memory);
                setSelectedIndex(index);
              }}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <motion.img
                  src={memory.src}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg text-xs self-start"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-medium">{memory.shortTitle}</span>
                  </motion.div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-white/90 line-clamp-2">
                      {memory.caption}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
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

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-lg bg-black/60"
            onClick={() => setSelectedImage(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Instruction for Mobile */}
            <p className="text-xs md:hidden absolute bottom-4 left-0 right-0 text-center text-white/80">
              Scroll left or right to see more images
            </p>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-50 bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <div className="relative max-w-4xl w-full rounded-3xl shadow-lg border border-black/40">
                {/* Image Container */}
                <motion.div
                  className="relative aspect-[4/3] md:aspect-[16/9] rounded-t-[2.5rem] overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.caption}
                    className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-102"
                    layout="fill"
                    priority
                  />
                </motion.div>

                {/* Caption & Details */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                  className="p-6 rounded-b-3xl bg-gradient-to-t from-black/90 to-transparent"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {selectedImage.shortTitle}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedImage.caption}
                  </p>
                </motion.div>

                {/* Desktop Navigation Buttons (Overlaid on Image) */}
                <div className="absolute top-1/2  left-0 right-0 hidden md:flex justify-between px-4 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Mobile Navigation Buttons (Placed below content) */}
              <div className="max-w-4xl w-full mt-4 flex justify-end gap-3 px-4 md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition-transform"
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

export default ModernMemoriesPage;
