import React from "react";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const Box: React.FC<BoxProps> = ({ children, className, id, style }) => {
  return (
    <div
      id={id}
      style={style}
      className={`border bg-box border-white/5 rounded-xl relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
