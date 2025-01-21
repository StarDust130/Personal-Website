import Hero from "./components/Hero";
import BgSvg from "./components/BgSvg";
import Explore from "./components/Explore";

const Page = () => {
  return (
    <div className="w-full     flex flex-col  font-inter relative">
      <BgSvg />

      <Hero />
      <Explore />
    </div>
  );
};

export default Page;
