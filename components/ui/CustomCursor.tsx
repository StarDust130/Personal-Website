import { useSpring, motion } from "framer-motion";
import { useEffect } from "react";

/* --------------------------------------------------------------------------
   FILE: components/CustomCursor.jsx
   --------------------------------------------------------------------------
*/
const CustomCursor = () => {
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () =>
      window.removeEventListener("mousemove", moveCursor as EventListener);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <div className="w-1 h-1 bg-red-600 rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;
