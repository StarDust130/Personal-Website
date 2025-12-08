import { motion } from "framer-motion";
import { ArrowRight, Star, GitFork, Smartphone, Layout, Box } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  color: string;
  index: number;
  image: string;
  stack?: string[];
  link?: string;
  githubLink?: string;
};

const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block">
    <span className="absolute inset-0 text-red-600/70 blur-[1px] opacity-70 animate-[glitch1_2s_linear_infinite]">
      {text}
    </span>
    <span className="absolute inset-0 text-blue-600/70 translate-x-[1px] animate-[glitch2_2s_linear_infinite]">
      {text}
    </span>
    <span className="relative text-black">{text}</span>
  </span>
);

const ProjectCard = ({
  title,
  category,
  description,
  index,
  image,
  stack = [],
  link = "#",
  githubLink = "#",
}: ProjectCardProps) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="group relative bg-white border-2 border-black flex flex-col hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden cursor-pointer active:scale-[0.98] active:shadow-none active:translate-y-0 z-10"
  >
    <div className="bg-black text-white p-2.5 flex justify-between items-center border-b-2 border-black">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-700" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-red-500 transition-colors">
        PRJ-00{index + 1} // SECURE
      </span>
    </div>

    <div className="relative aspect-video overflow-hidden border-b-2 border-black bg-gray-200 group-hover:border-red-600 transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 blur-sm z-30 pointer-events-none animate-[scan_4s_linear_infinite]" />
      <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        quality={90}
        priority={false}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
      />

      <div className="absolute top-3 right-3 bg-white border-2 border-black px-2 py-1 z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <span className="text-[10px] font-black uppercase font-display flex items-center gap-1">
          {category === "Game" ? (
            <Smartphone size={10} />
          ) : category === "App" ? (
            <Layout size={10} />
          ) : (
            <Box size={10} />
          )}
          {category}
        </span>
      </div>
    </div>

    <div className="p-3 md:p-4 flex flex-col flex-grow relative bg-white">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 delay-75" />

      <h3 className="text-xl md:text-2xl font-black font-display uppercase mb-2 group-hover:text-red-600 transition-colors leading-tight tracking-tight">
        <GlitchText text={title} />
      </h3>

      <p className="font-serif text-xs md:text-sm text-gray-700 leading-relaxed mb-3 flex-grow border-l-2 border-red-500 pl-3 font-semibold">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-black text-white border border-black text-[9px] font-mono uppercase font-bold hover:bg-red-600 hover:border-red-600 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t-2 border-black/10">
        <div className="flex gap-2 font-mono text-[10px] font-bold text-gray-500">

        </div>

        <Link
          href={githubLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden rounded-full border border-black px-3 py-1 transition-all duration-300 group-hover:bg-black group-hover:text-white z-20"
        >
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            View Code
            <ArrowRight className="w-3 h-3 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </Link>
      </div>
    </div>
  </motion.a>
);

export default ProjectCard;
