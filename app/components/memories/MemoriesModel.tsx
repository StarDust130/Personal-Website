import { Memory } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";


interface MemoriesModelProps {
    selectedImage: Memory | null;
    setSelectedImage: (image: Memory | null) => void;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleNext: () => void;
    handlePrev: () => void;
}

const MemoriesModel = ({
  selectedImage,
  setSelectedImage,
  handleTouchStart,
  handleTouchEnd,
  handleTouchMove,
  handleNext,
  handlePrev,
}: MemoriesModelProps) => {
  return (
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
  );
};
export default MemoriesModel;
