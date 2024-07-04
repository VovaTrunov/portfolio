import Image from "next/image";
import Box from "./Box";
import { Button } from "./ui/button";

const Social: React.FC = () => {
  return (
    <Box id="social" className="flex flex-col" style={{ gridArea: "social" }}>
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
    </Box>
  );
};

export default Social;
