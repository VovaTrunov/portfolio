import Image from "next/image";
import { PROGRAMMING_LANGUAGES } from "@/config";
import AnimatedCard from "./AnimatedCard";
import HoverCard from "./HoverCard";

const Languages: React.FC = () => {
  const languagesDom = PROGRAMMING_LANGUAGES.map((language) => (
    <HoverCard
      key={language.name}
      label={language.name}
      className="card p-3 grid place-content-center grow"
    >
      <Image
        src={language.icon}
        width={40}
        height={40}
        alt={`${language.name} Logo`}
      />
    </HoverCard>
  ));

  return (
    <AnimatedCard
      id="languages"
      className="bg-transparent border-0 flex justify-center items-stretch gap-3"
    >
      {languagesDom}
    </AnimatedCard>
  );
};

export default Languages;
