"use client";

import { useEffect } from "react";

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor") as HTMLDivElement;

    let mouseX = 0,
      mouseY = 0,
      cursorX = 0,
      cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="w-8 h-8 border border-black rounded-full fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-[0ms] ease-out z-10"
    />
  );
};

export default CustomCursor;
