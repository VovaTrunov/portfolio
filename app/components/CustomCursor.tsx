"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only enable on pointer-fine devices (non-touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll<Element>(
        "a, button, [data-cursor]"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onHoverStart);
        el.addEventListener("mouseleave", onHoverEnd);
      });
    };

    // Use MutationObserver to re-attach when DOM changes
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverListeners();

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const ringSize = isHovering ? 44 : 30;

  return (
    <>
      {/* Dot — snaps to exact cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "5px",
          height: "5px",
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          borderRadius: "50%",
          background: isHovering ? "#FF7438" : "#ffffff",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "background 0.25s, opacity 0.3s",
          willChange: "transform",
        }}
      />

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
          border: `1px solid ${isHovering ? "rgba(255,116,56,0.8)" : "rgba(255,255,255,0.35)"}`,
          borderRadius: "50%",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition:
            "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), margin 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s, opacity 0.3s",
          willChange: "transform",
          backdropFilter: isHovering ? "none" : "none",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
