import Image from "next/image";
import Box from "./Box";
import { PROGRAMMING_LANGUAGES } from "@/config";

const Languages: React.FC = () => {
  const languagesDom = PROGRAMMING_LANGUAGES.map((language) => (
    <Box
      key={language.name}
      className="p-3 grid place-content-center grow"
    >
      <Image
        src={language.icon}
        width={40}
        height={40}
        alt={`${language.name} Logo`}
      />
    </Box>
  ));

  return (
    <Box
      id="language"
      className="bg-transparent border-0 col-span-3 flex justify-center items-stretch"
      style={{ gridArea: "languages" }}
    >
      <div className="flex justify-between grow gap-3">{languagesDom}</div>
    </Box>
  );
};

export default Languages;
