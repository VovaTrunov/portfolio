import Box from "./Box";

const Experience: React.FC = () => {
  return (
    <Box
      id="experience"
      className="flex items-center justify-center gap-3 p-3"
      style={{ gridArea: "experience" }}
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
    </Box>
  );
};

export default Experience;
