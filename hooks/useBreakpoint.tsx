import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | null;

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(null);

  const updateBreakpoint = () => {
    const width = window.innerWidth;

    if (width <= 639) setBreakpoint("sm");
    if (width >= 640) setBreakpoint("md");
    if (width >= 1024) setBreakpoint("lg");
  };

  useEffect(() => {
    updateBreakpoint();

    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
