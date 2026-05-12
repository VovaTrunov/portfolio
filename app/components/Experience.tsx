import AnimatedCard from "./AnimatedCard";

const Experience: React.FC = () => {
  const yearsOfExperience = () => {
    const startDate = new Date("2018-01-01");
    const currentDate = new Date();
    const diff = currentDate.getTime() - startDate.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    return years;
  };

  return (
    <AnimatedCard
      id="experience"
      className="flex items-center justify-center gap-3 p-4"
    >
      <p
        className="text-gradient-orange text-8xl font-bold"
        style={{ fontSize: "clamp(3.75rem, 6vw, 6vw)" }}
      >
        {yearsOfExperience()}+
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
