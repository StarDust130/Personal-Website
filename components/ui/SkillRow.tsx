import React from "react";

const SkillRow = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-black/10 hover:bg-black/5 px-2 transition-colors cursor-crosshair group">
    <div className="flex items-center gap-3">
      {Icon && (
        <Icon
          size={16}
          className="text-gray-500 group-hover:text-black transition-colors"
        />
      )}
      <span className="font-bold uppercase text-xs md:text-sm tracking-tight group-hover:translate-x-1 transition-transform">
        {label}
      </span>
    </div>
    <span className="font-mono text-[10px] md:text-xs bg-gray-100 px-2 py-1 rounded border border-transparent group-hover:border-black/20 transition-all font-bold">
      {value}
    </span>
  </div>
);

export default SkillRow;
