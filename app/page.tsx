import { TimelineUI } from "./components/Timeline";
import { AppleCardsCarousel } from "./components/AppleStyleCards";
import Hero from "./components/Hero";
import BgSvg from "./components/BgSvg";

const Page = () => {
  return (
    <div className="w-full  md:h-screen  flex flex-col  font-inter relative">
   <BgSvg />

      <Hero />

      <AppleCardsCarousel />
      <TimelineUI />
    </div>
  );
};

export default Page;
