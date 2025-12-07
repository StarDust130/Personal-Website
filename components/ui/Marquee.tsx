import { motion } from "framer-motion";

const Marquee = ({ text, repeat = 4 }: { text: string; repeat?: number }) => (
  <div className="overflow-hidden whitespace-nowrap bg-black text-white border-y-2 border-black py-2 select-none relative z-20">
    <motion.div
      className="inline-block"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(repeat)].map((_, i) => (
        <span
          key={i}
          className="font-mono text-sm font-bold uppercase tracking-widest mx-4"
        >
          {text} <span className="text-red-600 mx-2">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

export default Marquee;
