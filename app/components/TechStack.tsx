import Image from "next/image";
import { TECH_STACK } from "@/config";
import AnimatedCard from "./AnimatedCard";
import HoverCard from "./HoverCard";
import SpotlightCell from "./SpotlightCell";

const TechStack: React.FC = () => {
  const techStackDom = TECH_STACK.map((tech) => (
    <SpotlightCell key={tech.name}>
      <HoverCard label={tech.name} className="p-3 grid place-content-center h-full">
        <Image
          className="w-10 h-10"
          src={tech.icon}
          width={40}
          height={40}
          alt={`${tech.name} Logo`}
        />
      </HoverCard>
    </SpotlightCell>
  ));

  return (
    <AnimatedCard
      id="techstack"
      noSpotlight
      className="grid grid-rows-2 grid-cols-3 gap-3 h-full"
    >
      {techStackDom}
    </AnimatedCard>
  );
};

export default TechStack;
