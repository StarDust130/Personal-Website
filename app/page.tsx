import Hero from "./components/Hero";
import BgSvg from "./components/BgSvg";
import Explore from "./components/Explore";
import Age from "./components/Age";
import Facts from "./components/Facts";

const Page = () => {
  return (
    <div className="w-full z-10    flex flex-col  font-inter relative">
      <BgSvg />

      <Hero />
      <Explore />
      <Age />
      <Facts />
    </div>
  );
};

export default Page;
