import Image from "next/image";
import Box from "./Box";
import { TECH_STACK } from "@/config";

const TechStack: React.FC = () => {
  const techStackDom = TECH_STACK.map((tech) => (
    <Box key={tech.name} className="p-3 grid place-content-center grow">
      <Image
        className="w-10 h-10"
        src={tech.icon}
        width={40}
        height={40}
        alt={`${tech.name} Logo`}
      />
    </Box>
  ));

  return (
    <Box
      id="tech-stack"
      className="bg-transparent border-0"
      style={{ gridArea: "techstack" }}
    >
      <div className="grid grid-rows-2 grid-cols-3 gap-3 h-full">
        {techStackDom}
      </div>
    </Box>
  );
};

export default TechStack;
