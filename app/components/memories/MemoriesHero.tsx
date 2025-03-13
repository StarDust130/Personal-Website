import { motion } from "framer-motion";
import Image from "next/image";
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

        <div className="relative h-20 w-20 md:h-40 md:w-40  mx-auto mt-1 mb-8 group">
          <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 filter blur-xl" />
          <Image
            src={"/d.gif"}
            alt="anime-girl"
            width={300}
            height={300}
            className="mx-auto rounded-full w-72 sm:w-80 md:w-[30vw] animate-float transition-transform duration-300 hover:scale-110 cursor-pointer z-10 relative"
          />
        </div>

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
                    "My camera roll? Just food pics & accidental screenshots! 📸",
                    "Memories so good… I stole them from my friends! 🤷‍♂️",
                    "If 'saving storage' was a lifestyle, I'd be its CEO! 🚀",
                    "All these photos prove I was there... or just REALLY good at Photoshop! 🤔",
                    "My friends take all the photos… I just exist in them! 📷",
                    "These pics are historic artifacts. Mostly of me looking lost. 🏛️",
                    "Every pic has a story. Most of them involve me not knowing where I am. 😂",
                    "Imagine taking your own photos. Couldn't be me! 😎",
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
