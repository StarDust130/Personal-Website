import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import confetti from "canvas-confetti";
import Link from "next/link";

const funnyRejections = [
  "Even AI knows this ain't it. 🤡😂",
  "Bro, reality check? ❌💀",
  "You're not the one. 😂🚫",
  "My code is laughing at you. 💻🤣",
  "You're not the one. 😂🚫",
  "Are you really thinking that? 😂🤦‍♂️",
  "Have you ever heard of self-respect? 😂🤦‍♂️",
];

const DreamCard = () => {
  const [name, setName] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [showPerfect, setShowPerfect] = useState(false);
  const [funnyMessage, setFunnyMessage] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Show Easter Egg for 3 seconds
    setTimeout(() => {
      setShowEasterEgg(false);
    }, 3000);

    if (attempts >= 3) {
      setTimeout(() => {
        router.push("https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif");
      }, 1500);
    }
  }, [attempts, router]);

  //! Function to Submit
  const handleSubmit = () => {
    if (
      name
        .toLowerCase()
        .includes(process.env.NEXT_PUBLIC_NAME_1?.toLowerCase() || "") ||
      name
        .toLowerCase()
        .includes(process.env.NEXT_PUBLIC_NAME_2?.toLowerCase() || "") // Added second variable
    ) {
      setFunnyMessage(
        funnyRejections[Math.floor(Math.random() * funnyRejections.length)]
      );

      setTimeout(() => {
        setShowQuestions(false); // Hide questions
        setShowPerfect(true); // Show perfect message
      }, 3000);
    } else {
      setFunnyMessage(
        funnyRejections[Math.floor(Math.random() * funnyRejections.length)]
      );
      setAttempts((prev) => prev + 1);
    }
  };

  const revealSecret = () => {
    setShowSecret(true);
    setShowPerfect(false);
    confetti({ particleCount: 150, spread: 80 });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 text-white font-bold text-center space-y-4">
      {/* Easter Egg Message */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-center mb-6 tracking-tight text-gradient">
            🎉
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              You found the Easter Egg!
            </span>
            😎
          </h2>
          <p className="text-sm text-gray-300 mb-6 text-center font-medium tracking-wide">
            Enjoy the hidden surprise. 💥
          </p>
        </motion.div>
      )}

      {/* Main UI */}
      {!showEasterEgg && showQuestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 tracking-tight text-gradient">
            😳
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Are You The One?
            </span>{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
              className="inline-block"
            >
              💘
            </motion.span>
            <p className="text-sm ">Let&apos;s see... 😏</p>
          </h2>

          <p className="text-xs text-red-500 mb-6 text-center font-medium tracking-wide">
            {funnyMessage}
          </p>

          {showQuestions && (
            <input
              type="text"
              className="p-4 w-full rounded-xl bg-white/10 text-white border-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition-all placeholder:text-gray-500 text-center"
              placeholder="Your Name, maybe? 👀"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {showQuestions && (
            <button
              className="mt-6 w-full px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium tracking-wide transform hover:opacity-90 active:scale-95 transition-all"
              onClick={handleSubmit}
            >
              Submit 😨
            </button>
          )}
        </motion.div>
      )}

      {showPerfect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-xl font-bold text-pink-500"
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
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={revealSecret}
        >
          Reveal Secret 🤫
        </motion.button>
      )}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-center"
        >
          <h3 className="text-xl font-semibold text-center">
            <span className=" text-pink-500 bg-clip-text font-extrabold drop-shadow-lg">
              <Typewriter
                words={["Alert! Naughty girl detected..."]}
                loop={1}
                typeSpeed={50}
              />
            </span>
            😉
            <br />
            <span className="text-xs text-gray-300 italic">
              Relax, Gorgeous. Great things take time 😏🔥
            </span>
          </h3>

          <Image
            src="https://c.tenor.com/7fzWR4STioAAAAAC/tenor.gif"
            alt="Love GIF"
            className="w-64 h-64 mt-4 rounded-lg"
            width={256}
            height={256}
          />
          <h1 className="mt-3 text-xl font-semibold text-center text-gray-200">
            But for now,{" "}
            <span className="underline decoration-wavy decoration-pink-500">
              focus here
            </span>
            . ☝🏻
          </h1>

          <Link
            href={
              "https://wa.me/919302903537?text=I%20love%20your%20website%20as%20much%20as%20I%20love%20you...%20and%20that’s%20A%20LOT!%20😂💖"
            }
            target="_blank"
          >
            <button className="relative px-4 py-1.5 mt-4 mx-auto text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-full shadow-lg transition-all flex items-center gap-3 border-2 border-transparent     before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rounded-full before:opacity-0 before:transition-opacity before:hover:opacity-100">
              🚀 Thanks, ME! 💖
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default DreamCard;
