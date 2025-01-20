import Hero from "./components/Hero";
import BgSvg from "./components/BgSvg";

const Page = () => {
  return (
    <div className="w-full   md:h-screen  flex flex-col  font-inter relative">
      <BgSvg />

      <Hero />
    </div>
  );
};

export default Page;
