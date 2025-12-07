import { motion } from "framer-motion";
const BentoCard = ({ children, className = "", delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white border-2 border-black p-4 md:p-6 relative overflow-hidden group ${className}`}
  >
    {children}
    {/* Corner Accents - Technical Detail */}
    <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-black opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export default BentoCard;
