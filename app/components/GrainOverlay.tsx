"use client";

// Film grain overlay — cinematic noise texture over the entire page
export default function GrainOverlay() {
  return (
    <>
      <svg
        className="fixed pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 9990,
          animation: "grainShift 8s steps(1) infinite",
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            filter: "url(#grain-filter)",
            opacity: 0.028,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </>
  );
}
