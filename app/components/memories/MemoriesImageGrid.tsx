import { Memory } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

interface MemoriesImageGridProps {
  filteredMemories: {
    id: number;
    src: string;
    caption: string;
    shortTitle: string;
    category: string;
    year: string;
    color: string;
  }[];
  setSelectedImage: (memory: Memory) => void;
  setSelectedIndex: (index: number) => void;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MemoriesImageGrid = ({
  filteredMemories,
  setSelectedImage,
  setSelectedIndex,
}: MemoriesImageGridProps) => {
  return (
    <div className="md:w-full md:max-w-screen-lg mx-auto">
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 my-6 brightness-100 contrast-105"
      >
        {filteredMemories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            setSelectedImage={setSelectedImage}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
      </motion.div>
    </div>
  );
};

const MemoryCard = ({
  memory,
  index,
  setSelectedImage,
  setSelectedIndex,
}: {
  memory: Memory;
  index: number;
  setSelectedImage: (memory: Memory) => void;
  setSelectedIndex: (index: number) => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group cursor-pointer rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setSelectedImage(memory);
        setSelectedIndex(index);
      }}
    >
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <motion.img
          src={memory.src}
          alt={memory.caption}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-110 contrast-115"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onLoad={() => setLoaded(true)}
        />
        {/* Info Box */}
        <div className="absolute bottom-3 left-3 right-3 p-3 backdrop-blur-lg bg-black/50 rounded-xl shadow-xl opacity-0 translate-y-4 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500 ease-out">
          <motion.div
            className="text-white text-sm font-semibold"
            whileHover={{ scale: 1.1 }}
          >
            {memory.shortTitle}
          </motion.div>
          <p className="text-xs text-white/80 line-clamp-2">{memory.caption}</p>
          <span className="text-[10px] mt-1 bg-white/30 px-2 py-0.5 rounded-lg backdrop-blur-md text-white/80">
            {memory.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};


export default MemoriesImageGrid;
