import Image from "next/image";
import { Button } from "./ui/button";
import AnimatedCard from "./AnimatedCard";

const Social: React.FC = () => {
  return (
    <AnimatedCard id="social" className="flex flex-col">
      <div className="grid place-items-center grow">
        <Button
          size="icon"
          variant="link"
          className="w-10 h-10 opacity-30 transition-[opacity] duration-500 hover:opacity-100"
        >
          <Image
            src="/logos/github.svg"
            width={30}
            height={30}
            alt="GitHub Logo"
          />
        </Button>
      </div>
      <div className="grid place-items-center grow">
        <Button
          size="icon"
          variant="link"
          className="w-10 h-10 opacity-30 transition-[opacity] duration-500 hover:opacity-100"
        >
          <Image
            src="/logos/linkedin.svg"
            width={30}
            height={30}
            alt="LinkedIn Logo"
          />
        </Button>
      </div>
    </AnimatedCard>
  );
};

export default Social;
