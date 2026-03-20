"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import styled from "styled-components";
import { motion } from "framer-motion";
import useBreakpoint from "@/hooks/useBreakpoint";

const CSSName = styled.h1`
  line-height: 1;

  @media (max-width: 1023px) {
    font-size: clamp(max(40px, 2vw), 7.25vw, 7.5vw);
  }

  @media (min-width: 1024px) {
    font-size: clamp(5vw, 5.75vw, 6vw);
  }
`;

const Hero: React.FC = () => {
  const breakpoint = useBreakpoint();
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = borderRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(255,116,56,0.55), rgba(255,255,255,0.05) 65%)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const transition = {
    heading: { duration: 1, ease: [0, 0.55, 0.45, 1] },
    subheading: {
      duration: 1,
      ease: [0, 0.55, 0.45, 1],
      delay: breakpoint === "lg" ? 0.5 : 0,
    },
    bg: {
      duration: 1,
      ease: [0, 0.55, 0.45, 1],
      delay: breakpoint === "lg" ? 1.5 : 0,
    },
  };

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 5 },
  };

  if (!breakpoint) return null;

  return (
    <div
      ref={borderRef}
      id="hero"
      className="rounded-xl"
      style={{
        gridArea: "hero",
        padding: "1px",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-[11px] overflow-hidden bg-box h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={transition.heading}
          className="z-10"
        >
          <CSSName className="font-semibold uppercase mb-3 z-10 text-gradient-white">
            Volodymyr
            <br />
            Trunov
          </CSSName>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={transition.subheading}
          className="z-10"
        >
          <h4
            className="text-textGray font-medium"
            style={{ fontSize: "clamp(19px, 1.5vw, 2vw)" }}
          >
            Software Engineer & Creative Thinker
          </h4>
          <div className="flex justify-center items-center gap-3 mt-5 sm:hidden">
            <Button asChild variant="primary">
              <a href="mailto:iamvladimirtrunov@gmail.com" target="_blank">
                Contact
              </a>
            </Button>
            <Button asChild>
              <a
                href="https://s3.us-west-1.amazonaws.com/vtrunov.com/Volodymyr+Trunov+-+CV.pdf"
                target="_blank"
              >
                Resumé
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
