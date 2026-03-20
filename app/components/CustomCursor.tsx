"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPencil, setIsPencil] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setIsVisible(true);

      // Snap dot and pencil directly to cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (pencilRef.current) {
        pencilRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Detect pencil-cursor zone
      const el = e.target as Element | null;
      setIsPencil(!!el?.closest('[data-cursor="pencil"]'));
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    const attachHoverListeners = () => {
      document.querySelectorAll<Element>("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onHoverStart);
        el.addEventListener("mouseleave", onHoverEnd);
      });
    };

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
      {/* Dot — snaps to cursor, hidden in pencil mode */}
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
          opacity: isVisible && !isPencil ? 1 : 0,
          transition: "background 0.25s, opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Ring — lags behind, hidden in pencil mode */}
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
          opacity: isVisible && !isPencil ? 1 : 0,
          transition:
            "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), margin 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s, opacity 0.2s",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />

      {/* Pencil — snaps directly, shown only in pencil mode */}
      <div
        ref={pencilRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 99999,
          // Offset so the pencil tip aligns with the cursor hotspot
          marginLeft: "-3px",
          marginTop: "-19px",
          opacity: isVisible && isPencil ? 1 : 0,
          transition: "opacity 0.15s",
          willChange: "transform",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Pencil body */}
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          {/* Pencil tip line */}
          <path d="m15 5 4 4" />
        </svg>
      </div>
    </>
  );
}
