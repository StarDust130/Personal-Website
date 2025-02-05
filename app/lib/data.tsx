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
    description: "Time travel for code ⏳ & magic deployments ✨",
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
      "Movie , Travel , Time Spend (Sunsets 🌅💫🌸)",
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
      "Space travel (Beam me up, Elon 🚀)",
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
