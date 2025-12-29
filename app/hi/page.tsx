"use client";
import { motion } from "framer-motion";
import { Phone, Copy, Plus } from "lucide-react";

// Official WhatsApp SVG Component
const WhatsAppIcon = ({ className }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const PortfolioHero = () => {
  const phoneNumber = "+91 93029 03537";
  const rawNumber = "19302903537";

  const handleWhatsApp = () =>
    window.open(`https://wa.me/${rawNumber}`, "_blank");
  const handleCall = () => (window.location.href = `tel:${rawNumber}`);
  const handleCopy = () => navigator.clipboard.writeText(phoneNumber);

  const floatingElements = Array.from({ length: 6 });

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* --- BACKGROUND --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BAFF00] rounded-full blur-[150px] opacity-5 pointer-events-none z-0" />

      {/* Floating Elements */}
      {floatingElements.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-neutral-700 opacity-40 z-0"
          initial={{ x: Math.random() * 1000, y: Math.random() * 800 }}
          animate={{
            y: [null, Math.random() * -50, Math.random() * 50],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Plus size={24} strokeWidth={1} />
        </motion.div>
      ))}

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center gap-10 max-w-4xl w-full">
        {/* Name Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="border border-[#BAFF00]/40 bg-[#BAFF00]/5 px-5 py-2 backdrop-blur-md rounded-sm">
            <p className="text-[#BAFF00] text-[11px] font-bold tracking-[0.3em] uppercase">
              Available for Talk
            </p>
          </div>
          <h1 className="flex flex-col leading-[0.85] tracking-tighter select-none">
            <span className="text-6xl md:text-9xl font-black text-white">
              CHANDRA
            </span>
            <span
              className="text-6xl md:text-9xl font-black text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
            >
              SHEKHAR
            </span>
          </h1>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl relative group"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                Mobile Connection
              </p>
              <p className="text-3xl font-mono text-white tracking-wider">
                {phoneNumber}
              </p>
            </div>
            <div className="w-2 h-2 bg-[#BAFF00] rounded-full animate-pulse shadow-[0_0_10px_#BAFF00]" />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="col-span-1 h-14 bg-[#151515] hover:bg-[#202020] border border-white/5 rounded-lg flex items-center justify-center transition-all active:scale-95 group/btn"
            >
              <Copy
                size={18}
                className="text-neutral-400 group-hover/btn:text-white transition-colors"
              />
            </button>

            {/* WhatsApp Button (Updated) */}
            <button
              onClick={handleWhatsApp}
              className="col-span-1 h-14 bg-[#151515] hover:bg-[#202020] border border-white/5 rounded-lg flex items-center justify-center transition-all active:scale-95 group/btn"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366] group-hover/btn:scale-110 transition-transform" />
            </button>

            {/* Call Button */}
            <button
              onClick={handleCall}
              className="col-span-2 h-14 bg-[#BAFF00] hover:bg-[#a3e600] text-black rounded-lg flex items-center justify-center gap-2 font-black text-sm uppercase tracking-wider transition-all active:scale-95 hover:shadow-[0_0_20px_rgba(186,255,0,0.3)]"
            >
              <Phone size={18} className="fill-current" />
              <span>Call Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioHero;