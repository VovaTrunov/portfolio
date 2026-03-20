"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ANIMATION_QUEUE } from "@/config";
import { cn } from "@/lib/utils";
import { TCard } from "@/types";
import useBreakpoint from "@/hooks/useBreakpoint";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  noSpotlight?: boolean;
}

const Card: React.FC<AnimatedCardProps> = ({
  children,
  className,
  id,
  style,
  noSpotlight,
}) => {
  const breakpoint = useBreakpoint();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noSpotlight) return;
    const onMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(255,116,56,0.55), rgba(255,255,255,0.05) 65%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [noSpotlight]);

  if (!breakpoint) return null;

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 5 },
  };

  const queuePosition = ANIMATION_QUEUE[
    breakpoint as keyof typeof ANIMATION_QUEUE
  ].indexOf(id as TCard);

  const transition = {
    duration: 1,
    ease: [0, 0.55, 0.45, 1],
    delay: breakpoint === "lg" ? queuePosition * 0.1 + 1.5 : 0,
  };

  if (noSpotlight) {
    return (
      <motion.div
        id={id}
        style={{ gridArea: id, ...style }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={transition}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      id={id}
      style={{
        gridArea: id,
        padding: "1px",
        background: "rgba(255,255,255,0.05)",
        ...style,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={transition}
      className="rounded-xl"
    >
      <div className={cn(["bg-box rounded-[11px] h-full overflow-hidden", className])}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
