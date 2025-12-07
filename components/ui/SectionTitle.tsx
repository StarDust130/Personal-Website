const SectionTitle = ({
  children,
  subtitle,
  japText,
  hindiText,
  align = "center",
  color = "text-black",
}: any) => (
  <div
    className={`flex flex-col ${
      align === "left"
        ? "items-start"
        : align === "right"
        ? "items-end"
        : "items-center"
    } mb-12 md:mb-16 relative z-10 px-4`}
  >
    {subtitle && (
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase text-gray-500 bg-white px-2 border border-black">
          {subtitle}
        </span>
        {japText && (
          <span className="font-serif text-gray-400 text-xs hidden sm:inline">
            {japText}
          </span>
        )}
        {hindiText && (
          <span className="font-serif text-red-600 text-xs font-bold">
            {hindiText}
          </span>
        )}
      </div>
    )}
    <h2
      className={`text-4xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter uppercase ${color} drop-shadow-sm relative text-center md:text-left leading-none`}
    >
      {children}
      <span className="absolute -top-6 -right-6 text-2xl md:text-4xl text-stroke-sm opacity-20 hidden md:block select-none pointer-events-none">
        {japText}
      </span>
    </h2>
    <div className="h-1 w-24 md:w-32 bg-black mt-6 flex">
      <div className="w-1/2 bg-red-600 h-full"></div>
    </div>
  </div>
);

export default SectionTitle;
