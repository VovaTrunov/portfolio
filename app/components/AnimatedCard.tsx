"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import { ANIMATION_QUEUE } from "@/config";
import { cn } from "@/lib/utils";
import { TCard } from "@/types";
import useBreakpoint from "@/hooks/useBreakpoint";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

const Card: React.FC<AnimatedCardProps> = ({
  children,
  className,
  id,
  style,
}) => {
  const breakpoint = useBreakpoint();

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
    delay: breakpoint === "lg" ? queuePosition * 0.1 + 1 : 0,
  };

  return (
    <motion.div
      id={id}
      style={{ gridArea: id, ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={transition}
      className={cn(["card", className])}
    >
      {children}
    </motion.div>
  );
};

export default Card;
