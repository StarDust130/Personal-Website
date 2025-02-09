"use client";

import { motion } from "framer-motion";
import {
  Music,
  BookOpen,
  Film,
  VideoIcon, 
} from "lucide-react";
import { anime, books, movies } from "../lib/data";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const hoverEffect = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 300 },
};



export default function LikesPage() {
  return (
    <div className="min-h-screen  p-6 md:p-12 max-w-8xl md:mx-auto">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          My Vibes
        </h1>
        <p className="mt-4 text-zinc-200">Stuff that makes my heart go 💫</p>
      </motion.div>

      {/* Interests Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
      >
        {/* Movies Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 cursor-pointer relative backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Film className="text-yellow-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
            Movies I Love
          </h2>
          <p className="mt-2 text-zinc-300 text-sm">
            Click a poster for details
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-md"
                  width={100}
                  height={150}
                />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Anime Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 cursor-pointer relative backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <VideoIcon className="text-purple-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text">
            Anime Faves
          </h2>
          <p className="mt-2 text-zinc-300 text-sm">Tap a cover to see more</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {anime.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  className="rounded-md"
                  width={100}
                  height={100}
                />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Books Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 cursor-pointer relative backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <BookOpen className="text-blue-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">
            Books I Love
          </h2>
          <p className="mt-2 text-zinc-300 text-sm">
            Explore these great reads
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {books.map((book) => (
              <Link
                key={book.id}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  className="rounded-md"
                  width={100}
                  height={100}
                />
              </Link>
            ))}
          </div>
        </motion.div>
        {/* Spotify Playlist Card (Music) */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 cursor-pointer relative z-10 mt-6 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 overflow-hidden col-span-1 md:col-span-2"
        >
          <div className="absolute top-2 right-2">
            <Music className="text-green-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
            My Playlist 🎶
          </h2>
          <p className="mt-2 text-zinc-300 text-sm">
            Vibes that keep me going 🚀
          </p>
          <div className="mt-4 rounded-xl overflow-hidden border border-zinc-700 shadow-lg transition-transform duration-300 hover:scale-105">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/5oG3V9b5n5oseaQ5aGimBN?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full h-[380px]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
