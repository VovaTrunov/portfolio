import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const HoverCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & PropsWithChildren & { label: string }
> = ({ children, className, label }) => {
  return (
    <div className={cn([className, "group relative"])}>
      <div className="group-hover:-translate-y-1/3 translate-0 transition-all duration-500">
        {children}
      </div>
      <div className="group-hover:opacity-100 opacity-0 absolute font-medium text-textGray top-[65%] text-sm w-full text-center transition-opacity duration-500">
        {label}
      </div>
    </div>
  );
};

export default HoverCard;
