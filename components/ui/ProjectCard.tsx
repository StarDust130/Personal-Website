import { motion } from "framer-motion";
import { ArrowRight, Star, GitFork } from "lucide-react";
import Image from "next/image";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  color: string;
  index: number;
  stars: number;
  forks: number;
  image: string;
};

const ProjectCard = ({
  title,
  category,
  description,
  color,
  index,
  stars,
  forks,
  image,
}: ProjectCardProps) => (
  <motion.div
    whileHover={{
      y: -12,
      scale: 1.01,
      rotateX: 3,
      rotateY: -2,
      boxShadow: "18px 18px 0px 0px rgba(0,0,0,1)",
    }}
    transition={{ type: "spring", stiffness: 240, damping: 18 }}
    className="group relative h-full flex flex-col justify-between border-2 border-black bg-white overflow-hidden rounded-3xl cursor-pointer"
    onClick={() => (window.location.href = "/projects")}
  >
    {/* Gradient glow on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(0,128,255,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,200,0,0.12),transparent_30%)]" />
    </div>

    {/* Image Header */}
    <div className="relative w-full pb-[70%] overflow-hidden border-b-2 border-black bg-gray-100">
      <div
        className={`absolute inset-0 ${color} opacity-25 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300`}
      />
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        className="object-cover scale-105 group-hover:scale-115 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
      <div className="absolute top-4 right-4 z-20">
        <span className="font-mono text-[10px] bg-black text-white px-2 py-1 font-bold uppercase tracking-widest border border-white shadow">
          Vol. 0{index + 1}
        </span>
      </div>
    </div>

    <div className="p-6 flex-grow flex flex-col relative z-10 bg-white/70 backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl md:text-3xl font-black font-serif uppercase leading-none break-words">
          {title}
        </h3>
        <ArrowRight className="transform -rotate-45 group-hover:rotate-0 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 ml-2" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-mono border border-black/20 px-1 py-0.5 rounded text-gray-600 uppercase bg-white/80">
          {category}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 bg-white/80 px-1.5 py-0.5 rounded">
          <Star size={10} /> {stars}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 bg-white/80 px-1.5 py-0.5 rounded">
          <GitFork size={10} /> {forks}
        </div>
      </div>

      <p className="text-sm font-medium leading-relaxed line-clamp-3 text-gray-700 mb-5">
        {description}
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-gray-300 flex items-center justify-between">
        <div className="relative overflow-hidden rounded-full border border-black px-4 py-1.5 transition-all duration-300 group-hover:bg-black group-hover:text-white">
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            View Details
            <ArrowRight className="w-3 h-3 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </div>
        <div className="h-2 w-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform duration-300" />
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
