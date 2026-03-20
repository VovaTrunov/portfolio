"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Eraser,
  GalleryHorizontal,
  Maximize2,
  RefreshCw,
  RotateCcw,
  Trash2,
} from "lucide-react";
import getStroke from "perfect-freehand";
import AnimatedCard from "./AnimatedCard";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type RecordedStroke = {
  points: number[][];
  color: string;
  size: number;
  isEraser?: boolean;
  startT: number; // ms from session start
  endT: number;
};

type DrawingRecord = {
  id: string;
  strokes: RecordedStroke[];
  aspect: number | null; // width / height of the canvas at recording time
  from_name: string | null;
  at_location: string | null;
  created_at: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = [
  "#FF7438", "#7D38FF", "#38B2FF", "#4ADE80",
  "#F472B6", "#FACC15", "#FB923C", "#818CF8",
];
const SIZES = [3, 7, 14];
const LOOP_PAUSE = 1800; // ms gap before looping

const ADJECTIVES = [
  "Sleepy", "Caffeinated", "Grumpy", "Wobbly", "Fuzzy",
  "Sneaky", "Bouncy", "Dizzy", "Snazzy", "Fluffy",
  "Tiny", "Cosmic", "Jumpy", "Sassy", "Reckless",
  "Dramatic", "Soggy", "Anxious", "Legendary", "Feral",
];
const ANIMALS = [
  "Penguin", "Llama", "Narwhal", "Capybara", "Axolotl",
  "Platypus", "Meerkat", "Quokka", "Wombat", "Pangolin",
  "Blobfish", "Tardigrade", "Binturong", "Kakapo", "Tapir",
  "Numbat", "Saiga", "Hagfish", "Fossa", "Aye-aye",
];

const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const randomNickname = () =>
  `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]}`;

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function toSvgPath(pts: number[][]): string {
  if (!pts.length) return "";
  const d: (string | number)[] = ["M", pts[0][0], pts[0][1], "Q"];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    d.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
  }
  return d.concat("Z").join(" ");
}

function paintStroke(
  ctx: CanvasRenderingContext2D,
  stroke: { points: number[][]; color: string; size: number; isEraser?: boolean },
  w: number,
  h: number
) {
  if (stroke.points.length < 2) return;
  const scaled = stroke.points.map(([x, y, p = 0.5]) => [x * w, y * h, p]);
  const outline = getStroke(scaled, {
    size: stroke.size,
    thinning: 0.4,
    smoothing: 0.5,
    streamline: 0.4,
  });
  if (!outline.length) return;
  ctx.globalCompositeOperation = stroke.isEraser ? "destination-out" : "source-over";
  ctx.fillStyle = stroke.isEraser ? "rgba(0,0,0,1)" : stroke.color;
  ctx.fill(new Path2D(toSvgPath(outline)));
  ctx.globalCompositeOperation = "source-over";
}

// Renders all strokes animated up to `currentTime`.
// If `aspect` (originalWidth/originalHeight) is provided, the drawing is letterboxed
// so it always appears in its original proportions regardless of the canvas size.
function renderAtTime(
  canvas: HTMLCanvasElement,
  strokes: RecordedStroke[],
  currentTime: number,
  aspect?: number | null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: cw, height: ch } = canvas;
  ctx.clearRect(0, 0, cw, ch);

  // Compute a viewport that preserves the original aspect ratio
  let w = cw, h = ch, tx = 0, ty = 0;
  if (aspect) {
    const canvasAspect = cw / ch;
    if (canvasAspect > aspect) {
      // Canvas wider than drawing — constrain by height, centre horizontally
      h = ch;
      w = ch * aspect;
      tx = (cw - w) / 2;
    } else {
      // Canvas taller than drawing — constrain by width, centre vertically
      w = cw;
      h = cw / aspect;
      ty = (ch - h) / 2;
    }
    ctx.save();
    ctx.translate(tx, ty);
  }

  for (const stroke of strokes) {
    if (stroke.startT > currentTime) break;
    if (stroke.endT <= currentTime) {
      paintStroke(ctx, stroke, w, h);
    } else {
      const progress = (currentTime - stroke.startT) / Math.max(stroke.endT - stroke.startT, 1);
      const count = Math.max(2, Math.floor(stroke.points.length * progress));
      paintStroke(ctx, { ...stroke, points: stroke.points.slice(0, count) }, w, h);
    }
  }

  if (aspect) ctx.restore();
}

function syncCanvasSize(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

// ─── CardPreview — loops the latest saved drawing ────────────────────────────

function CardPreview({ drawing }: { drawing: DrawingRecord | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const strokes = drawing?.strokes;
    if (!strokes?.length) return;

    const totalTime = strokes[strokes.length - 1].endT;
    const loopDuration = totalTime + LOOP_PAUSE;
    const aspect = drawing.aspect;
    startRef.current = null;

    const loop = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) % loopDuration;
      const el = canvasRef.current;
      if (el) {
        syncCanvasSize(el);
        renderAtTime(el, strokes, t, aspect);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [drawing]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── DrawingModal ─────────────────────────────────────────────────────────────

type Phase = "drawing" | "preview" | "sign" | "saving";

function DrawingModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (d: DrawingRecord) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const ptsRef = useRef<number[][]>([]);
  const strokeWallStartRef = useRef<number>(0); // wall-clock ms when current stroke began
  const drawingTimeRef = useRef<number>(0);     // accumulated drawing-only ms (no idle gaps)
  const recordedRef = useRef<RecordedStroke[]>([]);
  const activeStrokeRef = useRef<{ points: number[][]; color: string; size: number; isEraser?: boolean } | null>(null);
  const rafRef = useRef(0);
  const previewStartRef = useRef<number | null>(null);

  // Reactive state only where UI needs it
  const [hasStrokes, setHasStrokes] = useState(false);
  const [color, setColor] = useState(randomColor);
  const [size, setSize] = useState(SIZES[1]);
  const [isEraser, setIsEraser] = useState(false);
  const [phase, setPhase] = useState<Phase>("drawing");
  const [fromName, setFromName] = useState("");
  const [nickname, setNickname] = useState(() => randomNickname());
  const [atLocation, setAtLocation] = useState("");

  // Canvas resize observer
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => syncCanvasSize(el));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Drawing RAF loop
  useEffect(() => {
    if (phase !== "drawing") return;
    const loop = () => {
      const el = canvasRef.current;
      if (el) {
        const ctx = el.getContext("2d");
        if (ctx) {
          const { width: w, height: h } = el;
          ctx.clearRect(0, 0, w, h);
          recordedRef.current.forEach((s) => paintStroke(ctx, s, w, h));
          const active = activeStrokeRef.current;
          if (active && active.points.length > 1) paintStroke(ctx, active, w, h);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Preview playback loop
  useEffect(() => {
    if (phase !== "preview") return;
    const strokes = recordedRef.current;
    if (!strokes.length) return;
    const totalTime = strokes[strokes.length - 1].endT;
    const loopDuration = totalTime + LOOP_PAUSE;
    previewStartRef.current = null;

    const loop = (now: number) => {
      if (previewStartRef.current === null) previewStartRef.current = now;
      const t = (now - previewStartRef.current) % loopDuration;
      const el = canvasRef.current;
      if (el) renderAtTime(el, strokes, t);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Sign mode: render final static state
  useEffect(() => {
    if (phase !== "sign") return;
    const el = canvasRef.current;
    if (!el) return;
    const strokes = recordedRef.current;
    if (!strokes.length) return;
    renderAtTime(el, strokes, strokes[strokes.length - 1].endT + 1);
  }, [phase]);

  const getPoint = (e: React.PointerEvent): [number, number, number] => {
    const r = canvasRef.current!.getBoundingClientRect();
    return [
      (e.clientX - r.left) / r.width,
      (e.clientY - r.top) / r.height,
      e.pressure || 0.5,
    ];
  };

  const onDown = (e: React.PointerEvent) => {
    if (phase !== "drawing") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    strokeWallStartRef.current = Date.now();
    drawingRef.current = true;
    ptsRef.current = [getPoint(e)];
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || phase !== "drawing") return;
    ptsRef.current = [...ptsRef.current, getPoint(e)];
    activeStrokeRef.current = { points: ptsRef.current, color, size, isEraser };
  };

  const onUp = () => {
    if (!drawingRef.current || ptsRef.current.length < 2) return;
    drawingRef.current = false;
    const strokeDuration = Date.now() - strokeWallStartRef.current;
    const startT = drawingTimeRef.current;
    const endT = startT + strokeDuration;
    drawingTimeRef.current = endT; // advance by stroke duration only — idle gaps excluded
    recordedRef.current = [
      ...recordedRef.current,
      {
        points: ptsRef.current,
        color,
        size,
        isEraser,
        startT,
        endT,
      },
    ];
    activeStrokeRef.current = null;
    ptsRef.current = [];
    setHasStrokes(true);
  };

  const handleReset = () => {
    recordedRef.current = [];
    activeStrokeRef.current = null;
    ptsRef.current = [];
    drawingTimeRef.current = 0;
    drawingRef.current = false;
    setHasStrokes(false);
    setPhase("drawing");
    const el = canvasRef.current;
    if (el) el.getContext("2d")?.clearRect(0, 0, el.width, el.height);
  };

  const handleSave = async () => {
    if (!hasStrokes) return;
    setPhase("saving");
    const name = fromName.trim() || null;
    const el = canvasRef.current;
    const aspect = el && el.height > 0 ? el.width / el.height : null;
    const { data, error } = await supabase
      .from("drawings")
      .insert({
        strokes: recordedRef.current,
        aspect,
        from_name: name,
        at_location: atLocation.trim() || null,
      })
      .select()
      .single();

    if (!error && data) {
      onSaved(data as DrawingRecord);
    } else {
      setPhase("sign");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex flex-col w-full max-w-4xl h-[80vh] rounded-xl border border-white/10 overflow-hidden"
        style={{ background: "#141414" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
          <div>
            {phase === "drawing" && (
              <>
                <p className="text-white font-semibold text-sm">Leave your mark</p>
                <p className="text-textGray text-xs mt-0.5">
                  {hasStrokes ? "Draw more, or save when you're happy" : "Start drawing — your session is being recorded"}
                </p>
              </>
            )}
            {phase === "preview" && (
              <>
                <p className="text-white font-semibold text-sm">Your recording</p>
                <p className="text-textGray text-xs mt-0.5">Playing back in a loop — happy with it?</p>
              </>
            )}
            {(phase === "sign" || phase === "saving") && (
              <>
                <p className="text-white font-semibold text-sm">One last thing</p>
                <p className="text-textGray text-xs mt-0.5">Sign your drawing — totally optional</p>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-textGray hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{ cursor: "none" }}
          data-cursor="pencil"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
          />
        </div>

        {/* ── Drawing toolbar ── */}
        {phase === "drawing" && (
          <div className="flex items-center gap-2 px-5 py-4 border-t border-white/5 shrink-0">
            {/* Colors */}
            <div className="flex gap-1.5 items-center">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => { setColor(c); setIsEraser(false); }}
                  className="w-5 h-5 rounded-full transition-all hover:scale-110 shrink-0"
                  style={{
                    background: c,
                    boxShadow: !isEraser && color === c ? `0 0 0 2px #141414, 0 0 0 3px ${c}` : "none",
                  }}
                />
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 shrink-0 mx-0.5" />

            {/* Sizes */}
            <div className="flex gap-1 items-center">
              {SIZES.map((s, i) => {
                const displaySize = [7, 12, 18][i];
                return (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setIsEraser(false); }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all shrink-0 hover:bg-white/10"
                    style={{
                      background: !isEraser && size === s ? "rgba(255,255,255,0.1)" : "transparent",
                      border: !isEraser && size === s ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{
                        width: displaySize,
                        height: displaySize,
                        background: !isEraser && size === s ? color : "rgba(255,255,255,0.3)",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right-side actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsEraser((v) => !v)}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                style={{
                  background: isEraser ? "rgba(255,255,255,0.12)" : "transparent",
                  color: "#ffffff",
                  border: isEraser ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.12)",
                }}
                title="Eraser"
              >
                <Eraser size={15} />
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.12)" }}
                title="Reset"
              >
                <Trash2 size={15} />
              </button>

              <div className="w-px h-6 bg-white/10 shrink-0" />

              <button
                onClick={() => setPhase("preview")}
                disabled={!hasStrokes}
                className="h-8 px-3 rounded-lg transition-all text-xs font-medium border border-white/12 hover:bg-white/10 disabled:opacity-30"
                style={{ color: "#ffffff" }}
              >
                Preview
              </button>

              <button
                onClick={() => setPhase("sign")}
                disabled={!hasStrokes}
                className="h-8 px-4 rounded-lg transition-all text-xs font-medium disabled:opacity-30"
                style={{ background: "#FF7438", color: "#ffffff" }}
              >
                Save →
              </button>
            </div>
          </div>
        )}

        {/* ── Preview toolbar ── */}
        {phase === "preview" && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5 shrink-0">
            <button
              onClick={() => setPhase("drawing")}
              className="h-8 px-3 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/12 hover:bg-white/10 transition-all"
            >
              ← Back to drawing
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/12 hover:bg-white/10 transition-all"
              >
                <RotateCcw size={13} />
                Start over
              </button>
              <button
                onClick={() => setPhase("sign")}
                className="h-8 px-4 rounded-lg text-xs font-medium transition-all"
                style={{ background: "#FF7438", color: "#ffffff" }}
              >
                Looks good — Save →
              </button>
            </div>
          </div>
        )}

        {/* ── Sign toolbar ── */}
        {(phase === "sign" || phase === "saving") && (
          <div className="px-5 py-4 border-t border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPhase("preview")}
                className="h-8 px-3 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/12 hover:bg-white/10 transition-all shrink-0"
              >
                ← Back
              </button>

              {/* From field with random nickname button */}
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <input
                  autoFocus
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  placeholder={`From… e.g. "${nickname}"`}
                  className="flex-1 h-8 px-3 rounded-lg text-xs text-white bg-white/5 border border-white/10 outline-none focus:border-white/25 transition-colors placeholder:text-white/25 min-w-0"
                />
                <button
                  onClick={() => setNickname(randomNickname())}
                  className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg hover:bg-white/10 transition-all text-white/50 hover:text-white border border-white/10"
                  title="Suggest a nickname"
                >
                  <RefreshCw size={13} />
                </button>
              </div>

              {/* At field */}
              <input
                value={atLocation}
                onChange={(e) => setAtLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="At… city, country"
                className="w-36 h-8 px-3 shrink-0 rounded-lg text-xs text-white bg-white/5 border border-white/10 outline-none focus:border-white/25 transition-colors placeholder:text-white/25"
              />

              <button
                onClick={handleSave}
                disabled={phase === "saving"}
                className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium shrink-0 disabled:opacity-60 transition-all"
                style={{ background: "#FF7438", color: "#ffffff" }}
              >
                {phase === "saving" ? (
                  "Saving…"
                ) : (
                  <><Check size={13} /> Submit</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GalleryModal ─────────────────────────────────────────────────────────────

function GalleryModal({ onClose }: { onClose: () => void }) {
  const [drawings, setDrawings] = useState<DrawingRecord[]>([]);
  const [selected, setSelected] = useState<DrawingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    supabase
      .from("drawings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        const records = (data as DrawingRecord[]) ?? [];
        setDrawings(records);
        if (records.length) setSelected(records[0]);
        setLoading(false);
      });
  }, []);

  // Playback loop for selected drawing
  useEffect(() => {
    if (!selected?.strokes?.length) return;
    const strokes = selected.strokes;
    const totalTime = strokes[strokes.length - 1].endT;
    const loopDuration = totalTime + LOOP_PAUSE;
    startRef.current = null;
    cancelAnimationFrame(rafRef.current);

    const loop = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) % loopDuration;
      const el = canvasRef.current;
      if (el) {
        syncCanvasSize(el);
        renderAtTime(el, strokes, t, selected?.aspect);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); startRef.current = null; };
  }, [selected]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  return (
    <div
      className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex w-full max-w-5xl h-[85vh] rounded-xl border border-white/10 overflow-hidden"
        style={{ background: "#141414" }}
      >
        {/* Sidebar */}
        <div className="w-56 border-r border-white/5 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
            <p className="text-white font-semibold text-sm">All drawings</p>
            <button
              onClick={onClose}
              className="text-textGray hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded text-sm"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {loading && <p className="text-textGray text-xs p-4">Loading…</p>}
            {!loading && !drawings.length && (
              <p className="text-textGray text-xs p-4">No drawings yet. Be the first!</p>
            )}
            {drawings.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(d)}
                className="w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all"
                style={{ background: selected?.id === d.id ? "rgba(255,255,255,0.06)" : "transparent" }}
              >
                <p className="text-white text-xs font-medium truncate">
                  {d.from_name ?? "Anonymous"}
                </p>
                {d.at_location && (
                  <p className="text-textGray text-[11px] truncate">{d.at_location}</p>
                )}
                <p className="text-white/25 text-[10px] mt-0.5">{fmt(d.created_at)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Playback panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-textGray text-sm">Select a drawing to watch it</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {selected.from_name ?? "Anonymous"}
                    {selected.at_location && (
                      <span className="text-textGray font-normal"> · {selected.at_location}</span>
                    )}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">{fmt(selected.created_at)}</p>
                </div>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CollaborativeCanvas() {
  const [latestDrawing, setLatestDrawing] = useState<DrawingRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    supabase
      .from("drawings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setLatestDrawing(data as DrawingRecord);
      });
  }, []);

  return (
    <AnimatedCard id="testimonials" className="relative cursor-pointer">
      <div
        className="group relative w-full h-full"
        onClick={() => setIsModalOpen(true)}
      >
        <CardPreview drawing={latestDrawing} />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(20,20,20,0.92) 0%, rgba(20,20,20,0) 55%)",
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
                className="flex items-center justify-center w-7 h-7 rounded-lg text-[#6b7280] hover:text-white transition-colors"
                title="View all drawings"
              >
                <GalleryHorizontal size={20} />
              </button>
            </div>
            <div
              className="text-[#6b7280] group-hover:text-[#FF7438] group-hover:scale-125 transition-[color,transform] duration-700"
              style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <Maximize2 size={20} />
            </div>
          </div>

          {/* Bottom row: CTA left, signature right */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-semibold text-sm text-white">Leave your mark</p>
              <p className="text-textGray text-xs mt-0.5">
                Draw something for the next visitor
              </p>
            </div>
            {latestDrawing?.from_name && (
              <p className="text-white/40 text-xs text-right shrink-0 ml-4 whitespace-nowrap">
                by{" "}
                <span className="text-white">{latestDrawing.from_name}</span>
                {latestDrawing.at_location && (
                  <> at <span className="text-white">{latestDrawing.at_location}</span></>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <DrawingModal
          onClose={() => setIsModalOpen(false)}
          onSaved={(d) => {
            setLatestDrawing(d);
            setIsModalOpen(false);
          }}
        />
      )}

      {isGalleryOpen && (
        <GalleryModal onClose={() => setIsGalleryOpen(false)} />
      )}
    </AnimatedCard>
  );
}
