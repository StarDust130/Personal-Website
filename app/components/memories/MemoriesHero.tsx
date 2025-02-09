import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const MemoriesHero = () => {
  return (
    <div>
      <div className=" h-[40vh] relative  w-auto overflow-hidden md:h-[60vh] items-center ">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
                }}
                className="relative text-7xl   md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 drop-shadow-lg animate-pulse"
              >
                Memories
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm md:text-xl font-light text-white/80"
              >
                <Typewriter
                  words={[
                    "A collection of great memories… none of them taken by me! 📸",
                    "Proof I was there… or just really good at stealing pics! 🤷‍♂️",
                    "I found all these in my album… or someone else’s! 📂",
                    "If others didn’t take my photos, I might not exist! 🤷‍♂️",
                    "My camera roll? Just screenshots and regrets! 📂",
                    "My phone has 0 photos, but my friends’ phones have my whole life! 📷",
                    "Fun fact: If I had to show my own photos, I’d have nothing! 😭",
                    "These aren’t mine, but I’ll pretend they are for the clout! 😎",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                />
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default MemoriesHero;
