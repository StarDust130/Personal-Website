import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import confetti from "canvas-confetti";

const funnyRejections = [
  "Nah, try again! 😂",
  "Close, but no cookie! 🍪",
  "You wish! 😜",
  "Maybe in another universe! 🌌",
  "Oops, not today! 😆",
];

const DreamCard = () => {
  const [name, setName] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [showPerfect, setShowPerfect] = useState(false);
  const [funnyMessage, setFunnyMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (attempts >= 3) {
      setTimeout(() => {
        router.push("https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif");
      }, 1500);
    }
  }, [attempts, router]);

  const handleSubmit = () => {
    if (name.toLowerCase() === "xyz" || name.toLowerCase() === "abc") {
      setFunnyMessage(
        funnyRejections[Math.floor(Math.random() * funnyRejections.length)]
      );
      setTimeout(() => {
        setShowPerfect(true);
      }, 3000);
    } else {
      setFunnyMessage(
        funnyRejections[Math.floor(Math.random() * funnyRejections.length)]
      );
      setAttempts(attempts + 1);
    }
  };

  const revealSecret = () => {
    setShowSecret(true);
    setShowPerfect(false);
    confetti({ particleCount: 150, spread: 80 });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 text-white font-bold text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="p-6 border-2 border-purple-500 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl mb-4 ">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            {" "}
            Are You The One?
          </span>{" "}
          😳
        </h2>
        <p className="text-lg text-red-400 mb-4">{funnyMessage}</p>
        {!showPerfect && (
          <input
            type="text"
            className="p-3 rounded-lg text-black border-2 border-purple-500 focus:outline-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {!showPerfect && (
          <button
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-all"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </motion.div>
      {showPerfect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-3xl font-bold text-pink-500"
        >
          <Typewriter
            words={["Just kidding! You're perfect! ❤️"]}
            loop={1}
            typeSpeed={50}
          />
        </motion.div>
      )}
      {showPerfect && (
        <motion.button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={revealSecret}
        >
          Reveal Secret
        </motion.button>
      )}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-center"
        >
          <h3 className="text-4xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            🌟 Soulmate Unlocked! 🌟
          </h3>
          <Image
            src="https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif"
            alt="Love GIF"
            className="w-64 h-64 mt-4 rounded-lg"
            width={256}
            height={256}
          />
        </motion.div>
      )}
    </div>
  );
};

export default DreamCard;


<h2 className="text-3xl mb-4 ">
  <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
    {" "}
    Are You The One?
  </span>{" "}
  😳
</h2>;