import Box from "./Box";

import { TIMELINE } from "@/config";
import { cn } from "@/lib/utils";

const Timeline: React.FC = () => {
  const timelineDom = TIMELINE.map((timeline, index) => {
    const dotStyles = [
      "bg-orange top-4",
      "bg-orange top-0",
      "bg-box border-2 border-orange top-0",
    ];

    return (
      <div
        key={timeline.title}
        className="ml-10 pl-5 pb-4 first:pt-4 last:border-white/20 last:border-dashed border-l-2 relative grow"
      >
        <p className="text-[10px] font-medium text-textGray">
          {timeline.yearStart}
          {timeline.yearEnd ? `- ${timeline.yearEnd}` : ""}
        </p>
        <p className="font-medium text-gradient-white">{timeline.title}</p>
        <p className="text-[11px] text-textGray">{timeline.description}</p>
        <span
          className={cn([
            dotStyles[index],
            "w-[10px] h-[10px] absolute rounded-full -left-1 -translate-x-[2px]",
          ])}
        />
      </div>
    );
  });

  return (
    <Box
      id="timeline"
      className="flex flex-col"
      style={{ gridArea: "timeline" }}
    >
      {timelineDom}
    </Box>
  );
};

export default Timeline;
