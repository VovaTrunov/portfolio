import Image from "next/image";
import { TECH_STACK } from "@/config";
import AnimatedCard from "./AnimatedCard";
import TiltCard from "./TiltCard";

const TechStack: React.FC = () => {
  const techStackDom = TECH_STACK.map((tech) => (
    <TiltCard
      key={tech.name}
      className="card p-3 grid place-content-center grow"
    >
      <Image
        className="w-10 h-10"
        src={tech.icon}
        width={40}
        height={40}
        alt={`${tech.name} Logo`}
      />
    </TiltCard>
  ));

  return (
    <AnimatedCard
      id="techstack"
      className="bg-transparent border-0 grid grid-rows-2 grid-cols-3 gap-3 h-full"
    >
      {techStackDom}
    </AnimatedCard>
  );
};

export default TechStack;
