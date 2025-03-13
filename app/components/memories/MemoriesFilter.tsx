import { motion } from "framer-motion";

interface MemoriesFilterProps {
  categories: {
    id: string;
    label: string;
    emoji: string;
  }[];
  setActiveFilter: (id: string) => void;
  activeFilter: string;
}

const MemoriesFilter = ({
  categories,
  setActiveFilter,
  activeFilter,
}: MemoriesFilterProps) => {
  return (
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
        ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border border-gray-700 text-white shadow-lg shadow-gray-900/50"
        : "bg-white/5 text-white/70 hover:bg-white/15 backdrop-blur-lg"
    }

      `}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-base md:text-lg">{category.emoji}</span>
            <span>{category.label}</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
export default MemoriesFilter;
