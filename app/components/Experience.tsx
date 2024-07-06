import AnimatedCard from "./AnimatedCard";

const Experience: React.FC = () => {
  return (
    <AnimatedCard
      id="experience"
      className="flex items-center justify-center gap-3 p-4"
    >
      <p
        className="text-gradient-orange text-8xl font-bold"
        style={{ fontSize: "clamp(3.75rem, 6vw, 6vw)" }}
      >
        6+
      </p>
      <p
        className="text-2xl font-medium text-gradient-white leading-6"
        style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.5vw)" }}
      >
        Years of <br /> Experience
      </p>
    </AnimatedCard>
  );
};

export default Experience;
