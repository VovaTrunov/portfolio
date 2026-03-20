"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import useBreakpoint from "@/hooks/useBreakpoint";

const EASE = [0.16, 1, 0.3, 1] as const;

const GRADIENT_STYLE: React.CSSProperties = {
  backgroundImage: "linear-gradient(to top, rgba(255,255,255,0.55) 0%, #ffffff 65%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  display: "inline-block",
  lineHeight: 1,
};

const NAME_LINES     = ["VOLODYMYR", "TRUNOV"];
const SUBTITLE_WORDS = "Software Engineer & Creative Thinker".split(" ");

const LETTER_DUR   = 1.5;
const LETTER_STAG  = 0.04;
const TRUNOV_SHIFT = 0.1;

const WORD_DUR      = 1.25;
const WORD_STAG     = 0.08;
// Start subtitle while name letters are still decelerating into place —
// at ease-out, they're visually ~80% settled by 30% of their duration
const subtitleStart = (NAME_LINES[0].length - 1) * LETTER_STAG + LETTER_DUR * 0.1;
const subtitleDone  = subtitleStart + (SUBTITLE_WORDS.length - 1) * WORD_STAG + WORD_DUR;

const BG_START = subtitleStart;

// AnimatedCard constants — used to sync bg fade to last card's finish time
const CARD_BASE_DELAY  = 1.5;
const CARD_STAGGER     = 0.1;
const CARD_DUR         = 1.0;
const LAST_CARD_INDEX  = 9; // lg ANIMATION_QUEUE has 10 entries
const lastCardDone     = CARD_BASE_DELAY + LAST_CARD_INDEX * CARD_STAGGER + CARD_DUR; // 4.7s

const Hero: React.FC = () => {
  const breakpoint   = useBreakpoint();
  const borderRef    = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = borderRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.background = `radial-gradient(200px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,116,56,0.55), rgba(255,255,255,0.05) 65%)`;
    };

    // Don't activate until bg-box has fully faded in — prevents orange bleed-through
    const base       = breakpoint === "lg" ? 0.4 : 0.1;
    const bgFadeDur  = breakpoint === "lg" ? lastCardDone - base - BG_START : 0.5;
    const delay      = (base + BG_START + bgFadeDur + 0.05) * 1000;
    const timer = setTimeout(() => {
      // Reveal the subtle border glow at the same moment we allow the spotlight
      if (borderRef.current) {
        borderRef.current.style.background = "rgba(255,255,255,0.05)";
      }
      window.addEventListener("mousemove", onMove);
      spotlightRef.current = () => window.removeEventListener("mousemove", onMove);
    }, delay);

    return () => {
      clearTimeout(timer);
      spotlightRef.current?.();
    };
  }, [breakpoint]);

  if (!breakpoint) return null;

  const base      = breakpoint === "lg" ? 0.4 : 0.1;
  const bgFadeDur = breakpoint === "lg" ? lastCardDone - base - BG_START : 0.5;

  const nameFontSize = breakpoint === "lg"
    ? "clamp(5vw, 5.75vw, 6vw)"
    : "clamp(max(40px, 2vw), 7.25vw, 7.5vw)";

  return (
    <div
      ref={borderRef}
      id="hero"
      className="rounded-xl"
      style={{ gridArea: "hero", padding: "1px", background: "transparent" }}
    >
      {/* relative container — bg layer sits behind, content sits above */}
      <div className="relative rounded-[11px] overflow-hidden h-full">

        {/* ── Card background — fades in as subtitle animates ── */}
        <motion.div
          className="absolute inset-0 bg-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: base + BG_START, duration: bgFadeDur, ease: "easeOut" }}
        />

        {/* ── Content — sits above the animated bg ── */}
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full">

          {/* ── Name — letter-by-letter clip reveal ── */}
          <h1 className="font-semibold uppercase mb-3" style={{ lineHeight: 1 }}>
            {NAME_LINES.map((word, lineIdx) => {
              const lineShift = lineIdx === 0 ? 0 : TRUNOV_SHIFT;
              return (
                <div key={word} style={{ display: "block", overflow: "hidden", lineHeight: 1 }}>
                  <div style={{ display: "flex", justifyContent: "center", fontSize: nameFontSize, lineHeight: 1 }}>
                    {word.split("").map((char, i) => (
                      <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1 }}>
                        <motion.span
                          style={{ ...GRADIENT_STYLE, fontSize: "inherit" }}
                          initial={{ y: "105%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: LETTER_DUR,
                            ease: EASE,
                            delay: base + lineShift + i * LETTER_STAG,
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </h1>

          {/* ── Subtitle — word-by-word clip reveal ── */}
          <h4
            className="font-medium"
            style={{ fontSize: "clamp(19px, 1.5vw, 2vw)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.32em" }}
          >
            {SUBTITLE_WORDS.map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  className="text-textGray"
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: WORD_DUR,
                    ease: EASE,
                    delay: base + subtitleStart + i * WORD_STAG,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h4>

          {/* Mobile buttons */}
          <motion.div
            className="flex justify-center items-center gap-3 mt-5 sm:hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: base + subtitleDone + 0.15 }}
          >
            <Button asChild variant="primary">
              <a href="mailto:iamvladimirtrunov@gmail.com" target="_blank">Contact</a>
            </Button>
            <Button asChild>
              <a href="https://s3.us-west-1.amazonaws.com/vtrunov.com/Volodymyr+Trunov+-+CV.pdf" target="_blank">
                Resumé
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
