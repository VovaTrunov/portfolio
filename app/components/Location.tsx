import Image from "next/image";
import AnimatedCard from "./AnimatedCard";

const Location: React.FC = () => {
  return (
    <AnimatedCard
      id="location"
      className="flex items-center justify-center gap-3"
    >
      <Image src="/icons/geo.svg" width={25} height={25} alt="Clock Icon" />
      <div>
        <p className="font-medium text-xs text-textGray">GMT-6</p>
        <p className="font-medium text-lg text-gradient-white">
          Calgary, Canada
        </p>
      </div>
    </AnimatedCard>
  );
};

export default Location;
