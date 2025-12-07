import { motion } from "framer-motion";
import { ArrowRight, Star, GitFork } from "lucide-react";
import Image from "next/image";
const ProjectCard = ({
  title,
  category,
  description,
  color,
  index,
  stars,
  forks,
  image,
}: any) => (
  <motion.div
    className="relative h-full flex flex-col justify-between border-2 border-black bg-white group cursor-pointer hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    onClick={() => (window.location.href = "/projects")}
  >
    {/* Image Header */}
    <div className="h-48 w-full overflow-hidden border-b-2 border-black relative">
      <div
        className={`absolute top-0 left-0 w-full h-full ${color} opacity-20 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300`}
      ></div>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      <div className="absolute top-2 right-2 z-20">
        <span className="font-mono text-[10px] bg-black text-white px-2 py-1 font-bold uppercase tracking-widest border border-white">
          Vol. 0{index + 1}
        </span>
      </div>
    </div>

    <div className="p-6 flex-grow flex flex-col relative z-10">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl md:text-3xl font-black font-serif uppercase leading-none break-words">
          {title}
        </h3>
        <ArrowRight className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 flex-shrink-0 ml-2" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-mono border border-black/20 px-1 py-0.5 rounded text-gray-500 uppercase">
          {category}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
          <Star size={10} /> {stars}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
          <GitFork size={10} /> {forks}
        </div>
      </div>

      <p className="text-sm font-medium leading-relaxed line-clamp-3 text-gray-600 mb-4">
        {description}
      </p>

      <div className="mt-auto pt-4 border-t border-dashed border-gray-300">
        <span className="text-xs font-bold uppercase tracking-widest hover:underline decoration-red-600 underline-offset-4">
          View Details
        </span>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
