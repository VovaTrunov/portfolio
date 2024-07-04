import Image from "next/image";
import Box from "./Box";
import { Button } from "./ui/button";

const ProjectTwo: React.FC = () => {
  return (
    <Box
      id="project-2"
      className="group flex flex-col justify-between"
      style={{ gridArea: "project2" }}
    >
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
        <Button variant="link" size="sm" className="mt-3 px-0">
          Learn More
        </Button>
      </div>
      <Image
        className="w-full sm:grayscale sm:translate-y-0 -translate-y-12 group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700"
        src="/project-2.png"
        width={3000}
        height={2250}
        alt=""
      />
    </Box>
  );
};

export default ProjectTwo;
