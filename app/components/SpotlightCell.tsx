"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCellProps extends React.HTMLAttributes<HTMLDivElement> {}

const SpotlightCell: React.FC<SpotlightCellProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,116,56,0.55), rgba(255,255,255,0.05) 65%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(["rounded-xl", className])}
      style={{ padding: "1px", background: "rgba(255,255,255,0.05)" }}
    >
      <div className="bg-box rounded-[11px] h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCell;
