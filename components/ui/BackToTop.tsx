
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={scrollToTop}
            className="bg-black text-white p-3 md:p-4 border-2 border-white shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
          >
            <ArrowUp
              size={24}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;