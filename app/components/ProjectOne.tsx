import Image from "next/image";
import { Button } from "./ui/button";
import AnimatedCard from "./AnimatedCard";

const ProjectOne: React.FC = () => {
  return (
    <AnimatedCard
      id="project1"
      className="flex sm:flex-row flex-col justify-start group"
    >
      <div className="relative h-full sm:grayscale sm:group-hover:grayscale-0 transition-[filter] duration-500 sm:w-[40%] overflow-hidden rounded-l-xl">
        <Image
          className="group-hover:scale-105 transition-transform duration-700 object-cover object-top"
          src="/project-1.png"
          alt="Spatial Mastering Dashboard UI"
          fill
        />
      </div>
      <div className="p-6 flex flex-col justify-center items-start lg:order-2 order-1">
        <p className="text-xs font-medium mb-1 text-textGray">Project</p>
        <h2 className="text-2xl font-semibold text-gradient-white">
          Spatial Mastering
        </h2>
        <h2 className="text-2xl font-semibold text-gradient-orange">
          Mixing Dashboard
        </h2>
        <p className="text-textGray text-sm font-medium mt-3">
          Meet all your audio mixing needs in one place
        </p>
        <Button asChild variant="link" size="sm" className="mt-3 px-0">
          <a href="https://app.spatialmastering.com" target="_blank">
            Learn More
          </a>
        </Button>
      </div>
    </AnimatedCard>
  );
};

export default ProjectOne;
