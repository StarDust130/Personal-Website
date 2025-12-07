import { ArrowRight } from "lucide-react";

const ServiceCard = ({ title, price, description, icon: Icon }: any) => (
  <div className="border-2 border-black bg-white p-6 relative hover:bg-black hover:text-white transition-all duration-300 group">
    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#00000011_1px,transparent_1px)] [background-size:8px_8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity text-red-600 group-hover:rotate-12 transform duration-300">
      <Icon size={48} strokeWidth={1} />
    </div>
    <div className="mb-4 relative z-10">
      <Icon
        size={32}
        className="mb-4 group-hover:text-red-500 transition-colors"
      />
      <h3 className="text-2xl font-black font-display mb-2">{title}</h3>
    </div>
    <div className="w-full h-[1px] bg-current opacity-20 my-4 relative z-10"></div>
    <p className="font-mono text-sm mb-6 opacity-80 leading-relaxed relative z-10">
      {description}
    </p>
    <div className="flex justify-between items-center relative z-10">
      <div className="inline-block border border-current px-3 py-1 font-mono text-xs font-bold uppercase group-hover:border-red-600 group-hover:text-red-500 bg-white group-hover:bg-black group-hover:text-white transition-colors">
        From {price}
      </div>
      <ArrowRight
        size={16}
        className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-500"
      />
    </div>
  </div>
);

export default ServiceCard;
