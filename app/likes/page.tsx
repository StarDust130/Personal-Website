"use client";


import { motion } from "framer-motion";
import { ChevronRight, Heart, Music, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
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
    <div className="min-h-screen  p-6 md:p-12 max-w-7xl md:mx-auto">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2  gap-6"
      >
        {/* Books Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <Sparkles className="text-yellow-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
            Book Picks
          </h2>
          <ul className="mt-4 space-y-3 text-zinc-300">
            {[
              "Sci-Fi Adventures",
              "Philosophy Deep Dives",
              "Mind-bending Thrillers",
              "Biographies",
            ].map((book) => (
              <li
                key={book}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <ChevronRight className="text-pink-400" size={16} />
                {book}
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-gradient-to-r from-green-400/20 to-blue-400/20 h-[2px] w-full" />
        </motion.div>

        {/* Anime Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 relative"
        >
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text">
            Anime Obsessions
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              "Attack on Titan",
              "Death Note",
              "Studio Ghibli",
              "Neon Genesis",
            ].map((anime) => (
              <div
                key={anime}
                className="p-3 bg-zinc-800/50 rounded-lg flex items-center justify-center text-center hover:bg-zinc-700/50 transition-colors"
              >
                <span className="text-zinc-300 text-sm">{anime}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 animate-pulse">🎌</div>
        </motion.div>

        {/* Type of Girl Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text">
            Ideal Partner Vibes
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "Creative Soul",
              "Dark Humor 😈",
              "Ambitious AF",
              "Curious Mind",
              "Empathetic 💞",
              "Loves Dogs",
            ].map((trait) => (
              <motion.div
                key={trait}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 bg-pink-500/20 rounded-full text-pink-200 text-sm flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                {trait}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Movies Card */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 relative"
        >
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
            Movie Moods
          </h2>
          <div className="mt-4 space-y-4">
            {[
              { genre: "Psychological Thrillers", emoji: "🧠" },
              { genre: "Surreal Arthouse", emoji: "🎭" },
              { genre: "90s Classics", emoji: "📼" },
            ].map((movie) => (
              <div
                key={movie.genre}
                className="flex items-center gap-4 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-colors"
              >
                <span className="text-2xl">{movie.emoji}</span>
                <span className="text-zinc-300">{movie.genre}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Spotify Playlist Section */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          className="bg-zinc-900/50 z-30 mt-3 cursor-pointer backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 ">
            <Music className="text-green-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
            My Playlist 🎶
          </h2>
          <p className="mt-2 text-zinc-300 text-sm">
            Vibes that keep me going 🚀
          </p>

          {/* Spotify Embed */}
          <div className="mt-4 rounded-xl overflow-hidden border border-zinc-700 shadow-lg transition-transform duration-300 ">
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