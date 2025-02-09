import { motion } from "framer-motion";
import { Memory } from "../MemoriesPage";

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

const MemoriesImageGrid = ({
  filteredMemories,
  setSelectedImage,
  setSelectedIndex,
}: MemoriesImageGridProps) => {
  return (
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
  );
};
export default MemoriesImageGrid;
