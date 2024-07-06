import Box from "./AnimatedCard";
import Image from "next/image";

const LeetCode: React.FC = () => {
  return (
    <Box
      id="leet-code"
      className="p-3 flex flex-col justify-between gap-3"
      style={{ gridArea: "leetcode" }}
    >
      <Image
        src="/logos/leetcode.svg"
        width={40}
        height={40}
        alt="TypeScript Logo"
      />
      <div>
        <p className="text-textGray text-xs font-medium">Personal Goal</p>
        <p className="font-medium text-gradient-white">Top 5% LeetCode</p>
      </div>
      <div className="absolute right-4">
        <p className="font-medium text-xs text-textGray">
          <span
            className="text-gradient-orange text-8xl font-bold"
            style={{ fontSize: "clamp(3.75rem, 6vw, 6vw)" }}
          >
            48
          </span>{" "}
          / 3183
        </p>
      </div>
    </Box>
  );
};

export default LeetCode;
