import Image from "next/image";
import { PROGRAMMING_LANGUAGES } from "@/config";
import AnimatedCard from "./AnimatedCard";
import HoverCard from "./HoverCard";
import SpotlightCell from "./SpotlightCell";

const Languages: React.FC = () => {
  const languagesDom = PROGRAMMING_LANGUAGES.map((language) => (
    <SpotlightCell key={language.name} className="flex-1">
      <HoverCard label={language.name} className="p-3 grid place-content-center h-full">
        <Image
          src={language.icon}
          width={40}
          height={40}
          alt={`${language.name} Logo`}
        />
      </HoverCard>
    </SpotlightCell>
  ));

  return (
    <AnimatedCard
      id="languages"
      noSpotlight
      className="flex items-stretch gap-3 h-full"
    >
      {languagesDom}
    </AnimatedCard>
  );
};

export default Languages;
