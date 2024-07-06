import Image from "next/image";
import { Button } from "./ui/button";
import AnimatedCard from "./AnimatedCard";

const ProjectTwo: React.FC = () => {
  return (
    <AnimatedCard id="project2" className="flex flex-col justify-between group">
      <div className="p-6 flex flex-col justify-center items-start">
        <p className="text-xs font-medium mb-1 text-textGray">Project</p>
        <h2 className="text-2xl font-semibold text-gradient-white">
          MySeat Media
        </h2>
        <h2 className="text-2xl font-semibold text-gradient-orange">
          Creator Portal
        </h2>
        <p className="text-textGray text-sm font-medium mt-3">
          Create a free, working trial of your app in minutes
        </p>
        <Button asChild variant="link" size="sm" className="mt-3 px-0">
          <a href="https://creators.myseat.com" target="_blank">
            Learn More
          </a>
        </Button>
      </div>
      <div className="relative pt-4 overflow-hidden rounded-xl">
        <Image
          className="w-full sm:grayscale group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700"
          src="/project-2.png"
          width={3000}
          height={2250}
          alt=""
        />
      </div>
    </AnimatedCard>
  );
};

export default ProjectTwo;
