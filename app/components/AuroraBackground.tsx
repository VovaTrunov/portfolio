"use client";

// Ambient animated gradient blobs behind the entire layout
export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Orange blob — top-left quadrant */}
      <div
        style={{
          position: "absolute",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,116,56,0.13) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          filter: "blur(70px)",
          animation: "auroraFloat1 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Purple blob — bottom-right */}
      <div
        style={{
          position: "absolute",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(125,56,255,0.09) 0%, transparent 70%)",
          bottom: "-5%",
          right: "-5%",
          filter: "blur(80px)",
          animation: "auroraFloat2 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Small orange accent — center-right */}
      <div
        style={{
          position: "absolute",
          width: "25vw",
          height: "25vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,116,56,0.07) 0%, transparent 70%)",
          top: "40%",
          right: "15%",
          filter: "blur(50px)",
          animation: "auroraFloat3 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
