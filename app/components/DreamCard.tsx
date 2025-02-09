import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [funnyMessage, setFunnyMessage] = useState("Enter your name to check!");
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
    confetti({ particleCount: 150, spread: 80 });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-3 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-4">🔮 Are You The One? 🔮</h2>
        <p className="text-lg mb-4">{funnyMessage}</p>
        {!showPerfect && (
          <input
            type="text"
            className="p-2 rounded-lg text-black"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {!showPerfect && (
          <button
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </motion.div>
      {showPerfect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-2xl font-bold text-green-400"
        >
          Just kidding! You&apos;re perfect! ❤️
        </motion.div>
      )}
      {showPerfect && (
        <motion.button
          className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition"
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
          <h3 className="text-4xl">🌟 Soulmate Unlocked! 🌟</h3>
          <Image
            src="https://media.tenor.com/vpe3tt10mf8AAAAd/love-cute.gif"
            alt="Love GIF"
            className="w-64 h-64 mt-4 rounded-lg"
            width={50}
            height={50}
          />
        </motion.div>
      )}
    </div>
  );
};

export default DreamCard;
