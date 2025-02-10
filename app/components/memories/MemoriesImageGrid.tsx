import { Memory } from "@/types";
import { motion } from "framer-motion";


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
    <div className="md:w-full md:max-w-screen-lg mx-auto md:overflow-hidden" suppressHydrationWarning>
      <motion.div
        layout
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 my-6 hide-scrollbar overflow-hidden"
      >
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            layout
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="group cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03 }}
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
                  className="bg-white/30 backdrop-blur-md px-2 py-1 rounded-lg text-xs self-start"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-medium">{memory.shortTitle}</span>
                </motion.div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-100 line-clamp-2">
                    {memory.caption}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-white/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
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
  );
};
export default MemoriesImageGrid;
