import { AppleCardsCarousel } from "../components/AppleStyleCards";
import { TimelineUI } from "../components/Timeline";

const About = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <AppleCardsCarousel />
      <TimelineUI />
    </div>
  );
};
export default About;
