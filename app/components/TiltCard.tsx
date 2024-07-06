import { Tilt } from "react-tilt";
import { PropsWithChildren } from "react";

const DEFAULT_OPTIONS = { perspective: 800, speed: 1000, transition: true };

const TiltCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & PropsWithChildren
> = ({ children, className }) => {
  return (
    <Tilt options={DEFAULT_OPTIONS} className={className}>
      {children}
    </Tilt>
  );
};

export default TiltCard;
