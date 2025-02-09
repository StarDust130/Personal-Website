import Image from "next/image";
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


export const data = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Built and launched Aceternity UI and Aceternity UI Pro from scratch
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="startup template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/templates/startup-2.webp"
            alt="startup template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/templates/startup-3.webp"
            alt="startup template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/templates/startup-4.webp"
            alt="startup template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          I usually run out of copy, but when I see content this big, I try to
          integrate lorem ipsum.
        </p>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Lorem ipsum is for people who are too lazy to write copy. But we are
          not. Here are some more example of beautiful designs I built.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Deployed 5 new components on Aceternity today
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Card grid component
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Startup template Aceternity
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Random file upload lol
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Himesh Reshammiya Music CD
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Salman Bhai Fan Club registrations open
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
];

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

export const questions = [
  {
    question: "My go-to snack?",
    emoji: "🍕🍟",
    options: [
      "Spicy stuff (Sweet inside 🌶️)",
      "Pocky (Anime hero vibes 🎌)",
      "Trail Mix (Pretending to be healthy 😴)",
      "Eat air because I'm just that dramatic 🥲",
    ],
    correct: 0,
  },
  {
    question: "Netflix &...?",
    emoji: "📺🍿",
    options: [
      "Chill (😵‍💫)",
      "Start a fight over movie choices 🍿👊",
      "Meme (Laugh 'til it hurts 🐸)",
      "Sleep (Next episode? Who cares 💤)",
    ],
    correct: 2,
  },
  {
    question: "Perfect date idea?",
    emoji: "💗🐼",
    options: [
      "Roast each other until therapy 🖤🛋️",
      "Movie , baby , Time Spend (Sunsets 🌅💫🌸)",
      "Argue over pizza toppings 🍕👊",
      "Go to OYO (Don't Waste time in Build up 🏨)",
    ],
    correct: 1,
  },
  {
    question: "What’s my superpower?",
    emoji: "🦸‍♂️💥",
    options: [
      "Binge-watching pro 👀",
      "Making awkward silences a comedy show 😂",
      "Food delivery arrives in 10 minutes, always 🍔",
      "Ignoring texts like a pro 💌",
    ],
    correct: 0,
  },
  {
    question: "If I were an animal...?",
    emoji: "🐒🐯",
    options: [
      "Sloth (Laziness on another level 😌)",
      "Cheetah (Fast but constantly lost 🏃‍♂️)",
      "Penguin (Cute & clumsy 🐧)",
      "Elephant (Big heart, forgetful brain 🐘)",
    ],
    correct: 4,
  },
  {
    question: "Dream vacation?",
    emoji: "✈️🏖️",
    options: [
      "Beach with Wi-Fi (Work & tan 🤯)",
      "Anywhere with my loved ones 🏞️",
      "Space baby (Beam me up, Elon 🚀)",
      "Anime theme parks in Japan (Shut up, take my money 🎢)",
    ],
    correct: 1,
  },
  {
    question: "How do I deal with stress?",
    emoji: "💆‍♂️🧘‍♂️",
    options: [
      "Eat ALL the snacks (Yes, even the weird ones 🍫)",
      "Watch anime & cry (Embrace the feels 📺😭)",
      "Channel zen monk vibes (Peaceful vibes only 🧘‍♂️)",
      "Nap like the world is ending (Goodnight, world 😴)",
    ],
    correct: 3,
  },
];

export const memories: Memory[] = [
  {
    id: 1,
    src: "/19.jpg",
    caption: "Little ME 🌟",
    shortTitle: "Summer '23",
    category: "baby",
    year: "2023",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 2,
    src: "/4.jpg",
    caption: "Midnight coding sessions ☕",
    shortTitle: "Code Night",
    category: "lifestyle",
    year: "2023",
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    src: "/5.jpg",
    caption: "Mountain baby 🏔️",
    shortTitle: "Peak Views",
    category: "baby",
    year: "2023",
    color: "from-green-400 to-teal-500",
  },
  {
    id: 4,
    src: "/9.jpg",
    caption: "Mount Fuji Reflection 🌊",
    shortTitle: "Japan Dreams",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 5,
    src: "/14.jpg",
    caption: "Me and my older sisters 🌟",
    shortTitle: "Japan Dreams",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 6,
    src: "/15.jpg",
    caption: "Mount Fuji Reflection 🌊",
    shortTitle: "Japan Dreams",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 7,
    src: "/3.jpg",
    caption: "Mount Fuji Reflection 🌊",
    shortTitle: "Japan Dreams",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 8,
    src: "/18.2.jpg",
    caption: "18 years of life 🥳",
    shortTitle: "18th Birthday",
    category: "birthday",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 9,
    src: "/24.jpg",
    caption: "My 1st insta post 📸",
    shortTitle: "Life 1st photo shot after pubity",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 10,
    src: "/me-16.jpg",
    caption: "16th birthday 🥳",
    shortTitle: "Younger Me",
    category: "birthday",
    year: "2022",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 11,
    src: "/me-16.2.jpg",
    caption: "16th birthday 🥳",
    shortTitle: "Younger Me",
    category: "birthday",
    year: "2021",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 12,
    src: "/me-17.jpg",
    caption: "17th birthday 🥳",
    shortTitle: "Younger Me",
    category: "birthday",
    year: "2021",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 13,
    src: "/me-18.jpg",
    caption: "18th birthday 🥳",
    shortTitle: "Younger Me",
    category: "birthday",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 14,
    src: "/me-19.jpg",
    caption: "19th birthday 🥳",
    shortTitle: "Younger Me",
    category: "birthday",
    year: "2024",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 15,
    src: "/29.jpg",
    caption: "Brother From Another Mother 🌟",
    shortTitle: "Brothers",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 16,
    src: "/30.jpg",
    caption: "Sister From Another Mister 🌟", // make ir more cool and fuuny
    shortTitle: "Sisters",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 17,
    src: "/31.jpg",
    caption: "Rakhi Vibes 🌟",
    shortTitle: "Sisters",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 18,
    src: "/32.jpg",
    caption: "House Party Vibes 🌟",
    shortTitle: "Bro and sister",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 19,
    src: "/35.jpg",
    caption: "Yoga Practice",
    shortTitle: "Sisters",
    category: "brosis",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 20,
    src: "/25.jpg",
    caption: "Taj mahal vibes 🌟",
    shortTitle: "Travel Vibes",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 21,
    src: "/28.jpg",
    caption: "Water park vibes 🌟",
    shortTitle: "Enooy in water",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 22,
    src: "/2.jpg",
    caption: "Look so in gril outfit too 🌟",
    shortTitle: "photo shoot",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 23,
    src: "/11.jpg",
    caption: "me and my sister ",
    shortTitle: "i am in left side",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 24,
    src: "/12.jpg",
    caption: "Life 1st Cost play",
    shortTitle: "Fancy Dress Competition",
    category: "baby",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 25,
    src: "/dance-6.jpg",
    caption: "Win Dance Competition",
    shortTitle: "I was in Class 6",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 26,
    src: "/dance-6.2.jpg",
    caption: "Win Dance Competition",
    shortTitle: "I was in Class 6",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 27,
    src: "/dance-7.jpg",
    caption: "Win Dance Competition",
    shortTitle: "I was in Class 7th",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 28,
    src: "/water.jpg",
    caption: "daman beach",
    shortTitle: "I was fat at time 😂",
    category: "fun",
    year: "2023",
    color: "from-purple-400 to-pink-500",
  },
];

export const j = [
  { src: "/j-1.PNG" },
  { src: "/j-2.PNG" },
  { src: "/j-3.PNG" },
  { src: "/j-4.PNG" },
];

export const categories = [
  { id: "all", emoji: "✨", label: "All Vibes" },
  { id: "brosis", emoji: "💗", label: "BroSis" },
  { id: "birthday", emoji: "🌟", label: "Birthday" },
  { id: "baby", emoji: "🐤", label: "Baby Days" },
  { id: "fun", emoji: "😎", label: "Fun" },
];