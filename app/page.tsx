import Hero from "./components/Hero";
import Explore from "./components/Explore";
import Age from "./components/Age";
import Facts from "./components/Facts";

const Page = () => {
  return (
    <div className="w-full z-30    flex flex-col  font-inter relative">
      <Hero />
      <Explore />
      <Age />
      <Facts />
    </div>
  );
};

export default Page;
