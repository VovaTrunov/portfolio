import { TIMELINE } from "@/config";
import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";

const Timeline: React.FC = () => {
  const timelineDom = TIMELINE.map((timeline, index) => {
    const dotStyles = [
      "bg-orange top-4",
      "bg-orange top-0",
      "bg-box border-2 border-orange top-0",
    ];

    const titleContent = (
      <span className="inline-flex items-center gap-1 group/link">
        <span
          className={cn(
            "font-medium text-gradient-white transition-all duration-200",
            timeline.url &&
              "group-hover/link:opacity-80 group-hover/link:underline group-hover/link:decoration-white/40 group-hover/link:underline-offset-2"
          )}
        >
          {timeline.title}
        </span>
        {timeline.url && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3 opacity-0 -translate-y-px translate-x-0 group-hover/link:opacity-50 transition-all duration-200"
          >
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    );

    return (
      <div
        key={timeline.title}
        className="ml-10 pl-5 pb-4 first:pt-4 last:border-white/20 last:border-dashed border-l-2 relative grow"
      >
        <p className="text-[10px] font-medium text-textGray">
          {timeline.yearStart}
          {timeline.yearEnd ? `- ${timeline.yearEnd}` : ""}
        </p>
        {timeline.url ? (
          <a
            href={timeline.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit cursor-pointer"
          >
            {titleContent}
          </a>
        ) : (
          <p>{titleContent}</p>
        )}
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
    <AnimatedCard id="timeline" className="flex flex-col">
      {timelineDom}
    </AnimatedCard>
  );
};

export default Timeline;
