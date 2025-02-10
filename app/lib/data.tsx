import { Code, Server, Database, Cloud, Bot, ServerCog } from "lucide-react";
import {
  Puzzle,
  BotMessageSquare,
  Globe,
  Bug,
  Coffee,
  PartyPopper,
} from "lucide-react";
import { Memory } from "@/types";

export const projects = [
  {
    title: "Meme Machine",
    icon: PartyPopper,
    description: "Because the internet needs more laughs 😂",
    tech: ["React", "Canvas", "AWS Lambda"],
  },
  {
    title: "AI Chef",
    icon: Puzzle,
    description: "Bot that creates recipes from fridge leftovers 🥦🤖",
    tech: ["Python", "GPT-4", "Next.js"],
  },
  {
    title: "Bug Zapper",
    icon: Bug,
    description: "Catching bugs faster than a frog's tongue 🐸",
    tech: ["TypeScript", "Jest", "Cypress"],
  },
  {
    title: "Cloud Commander",
    icon: Globe,
    description: "Managing cloud stuff without crying ☁️😭",
    tech: ["AWS", "Terraform", "K8s"],
  },
  {
    title: "Code Café",
    icon: Coffee,
    description: "Where code meets caffeine addiction ☕💻",
    tech: ["Next.js", "Strapi", "Stripe"],
  },
  {
    title: "AI DJ",
    icon: Bot,
    description: "Mixing beats worse than your uncle at weddings 🎧🤖",
    tech: ["Python", "Spotify API", "ML"],
  },
];

// Update the techStack descriptions to be more fun
export const techStack = [
  {
    name: "React & Next.js 15",
    icon: Code,
    description: "Where components come to party 🎉 (and sometimes crash)",
  },
  {
    name: "AI/ML & Python",
    icon: BotMessageSquare,
    description: "Teaching robots to be smarter than me 🤖🧠",
  },
  {
    name: "Django & FastAPI",
    icon: Server,
    description: "Backend magic that even Dumbledore would approve 🧙♂️",
  },
  {
    name: "Node.js & MongoDB",
    icon: Database,
    description: "Crafting APIs that never sleep 🦉",
  },
  {
    name: "DevOps & Cloud",
    icon: ServerCog,
    description: "Herding cloud cats ☁️🐈⬛",
  },
  {
    name: "Git & Vercel",
    icon: Cloud,
    description: "Time baby for code ⏳ & magic deployments ✨",
  },
];

// Quiz
export const questions = [
  {
    question: "What’s my biggest talent?",
    emoji: "😎🔥",
    options: [
      "Laughing at my own jokes before I even tell them 😂🎤",
      "Finding new ways to waste time like an artist ⏳🎨",
      "Winning fake arguments in my head 🥊🧠",
      "Finding memes that describe my entire life 😂📸",
    ],
    correct: 0,
  },
  {
    question: "If I could eat one thing forever, what would it be?",
    emoji: "🍕🍔",
    options: [
      "Toothpaste, because I'm always late for breakfast 🪥😂",
      "Maa ke haath ka khana (Meri aur mera bacho ki) 🍲👩‍🍳",
      "Ice cubes, because AC is expensive 🧊💸",
      "Air, because I'm broke sometimes 💸😭",
    ],
    correct: 3,
  },
  {
    question: "Perfect date idea?",
    emoji: "💗🐼",
    options: [
      "Roast each other until therapy 🖤🛋️",
      "Movie, Explore Each Other, Time Spend (Sunsets 🌅💫🌸)",
      "Go to OYO (Don't Waste time in Build up 🏨)",
      "Argue over pizza toppings 🍕👊",
    ],
    correct: 1,
  },
  {
    question: "How do I react when my crush texts first?",
    emoji: "🥵💬",
    options: [
      "Start thinking wedding venue, guest list, and baby names 💍🤔",
      "Act cool but internally screaming 🤯💘",
      "Reply in 0.2 seconds like a government job form ⚡😂",
      "Throw phone away, then pick it up like nothing happened 🎉📲",
    ],
    correct: 0,
  },
  {
    question: "What’s my biggest fear?",
    emoji: "😨💀",
    options: [
      "Opening Google Meet and realizing the camera is ON 😱🎥",
      "Sending a risky text and getting ‘Seen’ but no reply 👀💔",
      "Going to a function and getting ‘Shaadi kab karega?’ questions 💍🙄",
      "Getting a call instead of a text—who even does that? 📞😨",
    ],
    correct: 1,
  },
  {
    question: "If I was a millionaire, what’s the first thing I’d do?",
    emoji: "💰😎",
    options: [
      "Listen to ‘I am a millionaire’ song (Yo Yo Honey Singh) 🎵😂",
      "Buy  Bitcoin 😆🔥 ",
      "Still ask my sister ‘Please paisa de do’ 💸🤣",
      "Plan a Goa trip that will never happen 🏖️😂",
    ],
    correct: 2,
  },
  {
    question: "What’s my bad habit?",
    emoji: "🚩😢",
    options: [
      "Saying ‘Bas ek aur episode’ and finishing the whole season 📱😂",
      "Not bathing for weeks and calling it ‘natural fragrance’ 🚿❌🤢",
      "Eating at midnight like a secret agent in the fridge 🍕🌙",
      "All of the above, and proud of it 💀🔥",
    ],
    correct: 3,
  },

  {
    question: "What’s my ultimate dream?",
    emoji: "🌎💭",
    options: [
      "Travel the world with my future hot wife 🧳💸",
      "Go on a date with Mitsuri Kanroji and make other weebs jealous 💖🍜😂",
      "Open a Dhaba in Goa but still call it a startup 🍛🏖️🚀",
      "All of the above, because why choose? 💰🔥",
    ],
    correct: 1,
  },
];

export const memories: Memory[] = [
  {
    id: 1,
    src: "/19.jpg",
    caption: "Too cute to handle, too smart to ignore. 😎✨",
    shortTitle: "Little Me",
    category: "baby",
    year: "2023",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 2,
    src: "/4.jpg",
    caption: "Boss moves start early. 😎🍼",
    shortTitle: "Chairman Baby",
    category: "baby",
    year: "2023",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    src: "/5.jpg",
    caption: "Every great journey starts with a small step.",
    shortTitle: "Tiny Explorer",
    category: "baby",
    year: "2023",
    color: "from-green-400 to-teal-500",
  },
  {
    id: 4,
    src: "/9.jpg",
    caption: "Mastering the art of doing nothing.",
    shortTitle: "Relax Mode",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 5,
    src: "/14.jpg",
    caption: "First best friend, first enemy—same person.",
    shortTitle: "Sibling Life",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 6,
    src: "/18.2.jpg",
    caption: "18 and still figuring things out.",
    shortTitle: "Officially an Adult",
    category: "birthday",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 7,
    src: "/24.jpg",
    caption: "My first Insta pic. I shot it, then I deleted my a/c.",
    shortTitle: "First Click",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 8,
    src: "/me-16.jpg",
    caption: "16 candles, still no license.",
    shortTitle: "Sweet 16",
    category: "birthday",
    year: "2022",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 9,
    src: "/me-19.jpg",
    caption: "Level 19 unlocked. Where are my rewards?",
    shortTitle: "Birthday Mode",
    category: "birthday",
    year: "2024",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 10,
    src: "/29.jpg",
    caption: "Cousins by chance, troublemakers by choice. 😆🔥",
    shortTitle: "Brother from Another",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 11,
    src: "/30.jpg",
    caption: "Sisters: built-in best friends (most of the time).",
    shortTitle: "Sister Squad",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 12,
    src: "/31.jpg",
    caption: "Rakhi day: The one day we pretend to be nice.",
    shortTitle: "Sibling Tradition",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 13,
    src: "/25.jpg",
    caption: "Taj Mahal came to visit me...",
    shortTitle: "Monument Day",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 14,
    src: "/28.jpg",
    caption: "Waterpark trip: 10/10, would splash again.",
    shortTitle: "Water Fun",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 15,
    src: "/dance-6.jpg",
    caption: "Class 6 legends take over the inter-school dance floor! 🕺💃",
    shortTitle: "Dance Mafia",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 16,
    src: "/water.jpg",
    caption: "Me, the sea… and an uninvited extra. 🌊😂",
    shortTitle: "Beach Time",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 17,
    src: "/40.jpg",
    caption: "Living in the moment even if it's slightly offbeat.",
    shortTitle: "Thagda Vibes",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },

  {
    id: 18,
    src: "/me-17.2.jpg",
    caption: "Smiling through the awkwardness.",
    shortTitle: "17th Birthday",
    category: "birthday",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 19,
    src: "/32.jpg",
    caption: "House party? More like a war zone. 😂🔥",
    shortTitle: "House Party",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 20,
    src: "/dance-6.2.jpg",
    caption: "Dance Mafia Iconic Pose: Level 1000.",
    shortTitle: "Dance Legends",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 21,
    src: "/dance-7.jpg",
    caption: "Find me… if you can. 👀👻",
    shortTitle: "Ghost Dance",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 22,
    src: "/15.jpg",
    caption: "Age is just a number, but my smile is timeless.",
    shortTitle: "Killer Smile",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 23,
    src: "/school.jpg",
    caption: "Classmates thought I was on mute IRL. 🎤❌🤣",
    shortTitle: "School Days",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
];

export const j = [
  { src: "/j-1.PNG" },
  { src: "/j-2.PNG" },
  { src: "/j-3.PNG" },
  { src: "/j-4.png" },
];

export const categories = [
  { id: "all", emoji: "✨", label: "All Vibes" },
  { id: "brosis", emoji: "💗", label: "BroSis" },
  { id: "birthday", emoji: "🌟", label: "Birthday" },
  { id: "baby", emoji: "🐤", label: "Baby Days" },
  { id: "fun", emoji: "😎", label: "Fun" },
];

// Likes 🍒

export const movies = [
  {
    id: 1,
    title: "Dead Poets Society",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDYwNGVlY2ItMWYxMS00YjZiLWE5MTAtYWM5NWQ2ZWJjY2Q3XkEyXkFqcGc@._V1_FMjpg_UX1016_.jpg",
    link: "https://www.imdb.com/title/tt0097165/",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg",
    link: "https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0_tt_7_nm_0_in_0_q_The%2520Shawshank%2520Redemption",
  },
  {
    id: 3,
    title: "Tamasha",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjA1MTc0Mjc4Ml5BMl5BanBnXkFtZTgwNjU5Nzk4NjE@._V1_QL75_UX226.5_.jpg",
    link: "https://www.imdb.com/title/tt3148502/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_Tamasha",
  },
  {
    id: 4,
    title: "The Lunchbox",
    poster:
      "https://m.media-amazon.com/images/M/MV5BODkyM2FkZmQtYTQyNC00MGVlLTgxNjctNWRjMjQ5ZDZjZDQ3XkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
    link: "https://www.imdb.com/title/tt2350496/?ref_=nv_sr_srsg_1_tt_7_nm_0_in_0_q_The%2520Lunchbox",
  },
  {
    id: 5,
    title: "Rang De Basanti",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTJhZTdmODctZWY3Zi00MGI3LThiZDMtZWQ5ZjNkYzQyMTI3XkEyXkFqcGc@._V1_FMjpg_UX414_.jpg",
    link: "https://www.imdb.com/title/tt0405508/?ref_=nv_sr_srsg_0_tt_2_nm_1_in_0_q_Rang%2520De%2520Basanti",
  },
  {
    id: 6,
    title: "The Perfect Days",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGVmODFkM2MtOTEzMy00MjFjLThjZmYtODMxZmI1MzcyNDkyXkEyXkFqcGc@._V1_FMjpg_UY728_.jpg",
    link: "https://www.imdb.com/title/tt27503384/?ref_=fn_all_ttl_1",
  },
];

// Anime: Existing items + new additions (Naruto, Spy x Family)
export const anime = [
  {
    id: 1,
    title: "Grave of the Fireflies",
    cover: "https://cdn.myanimelist.net/images/anime/1485/141208.jpg",
    link: "https://myanimelist.net/anime/578/Hotaru_no_Haka/pics",
  },
  {
    id: 2,
    title: "Attack on Titan",
    cover: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    link: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin",
  },
  {
    id: 3,
    title: "Death Note",
    cover: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    link: "https://myanimelist.net/anime/1535/Death_Note",
  },
  {
    id: 4,
    title: "Deomon Slayer",
    cover: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    link: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba?q=demon%20slayer&cat=anime",
  },
  {
    id: 5,
    title: "Naruto",
    cover: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    link: "https://myanimelist.net/anime/20/Naruto",
  },
  {
    id: 6,
    title: "Spy x Family",
    cover: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    link: "https://myanimelist.net/anime/50265/Spy_x_Family?q=spy%20x&cat=anime",
  },
];

// Books: Existing items + new additions
export const books = [
  {
    id: 1,
    title: "Sapiens: A Brief History of Humankind",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg",
    link: "https://www.goodreads.com/book/show/23692271-sapiens?from_search=true&from_srp=true&qid=pD0OpndGhS&rank=1",
  },
  {
    id: 5,
    title: "The Almanack of Naval Ravikant",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598011736i/54898389.jpg",
    link: "https://www.goodreads.com/book/show/54898389-the-almanack-of-naval-ravikant?ref=nav_sb_ss_1_30",
  },
  {
    id: 6,
    title: "The Courage to be Disliked",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545421684i/43306206.jpg",
    link: "https://www.goodreads.com/book/show/43306206-the-courage-to-be-disliked?from_search=true&from_srp=true&qid=ZKwBVTxDnV&rank=1",
  },
];
