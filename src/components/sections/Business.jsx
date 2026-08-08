import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 12 unique standee-in-environment photos generated with Nano Banana
const IMAGES = Array.from({ length: 12 }, (_, i) => `/mosaic/env-${String(i + 1).padStart(2, "0")}.png`);

const COLS = 14;
const ROWS = 10;

// Deterministic "shuffled" fill so it feels like every tile is a different place.
function buildTiles() {
  const total = COLS * ROWS;
  const arr = [];
  let seed = 987654321;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < total; i++) {
    const imgIdx = Math.floor(rand() * IMAGES.length);
    // subtle per-tile variation for a "hand-shot" feel
    const brightness = 0.78 + rand() * 0.42; // 0.78–1.20
    const rotate = (rand() - 0.5) * 0.4; // -0.2..0.2 deg
    arr.push({ imgIdx, brightness, rotate });
  }
  return arr;
}

export default function Business() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Camera zoom out: close-up on ONE entrance → wall of hundreds
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [7, 1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.78], [30, 0]);
  const vignette = useTransform(scrollYProgress, [0, 0.6, 1], [0.35, 0.15, 0.45]);

  const tiles = useMemo(buildTiles, []);

  return (
    <section
      ref={ref}
      data-testid="section-business"
      className="relative w-full bg-black"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Mosaic — scroll-linked zoom */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              width: "min(160vh, 130vw)",
              aspectRatio: `${COLS}/${ROWS}`,
              gap: "2px",
            }}
          >
            {tiles.map((t, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  transform: `rotate(${t.rotate}deg)`,
                }}
              >
                <img
                  src={IMAGES[t.imgIdx]}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: `brightness(${t.brightness})` }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cinematic vignette / darkening overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 90%)",
            opacity: vignette,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Headline — reveals as camera pulls out */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-16 md:bottom-24 left-0 right-0 z-10 px-6 md:px-16"
        >
          <div className="mx-auto max-w-[1600px] w-full">
            <h2 className="font-display font-extrabold text-white leading-[0.88] tracking-[-0.045em] text-[clamp(2.8rem,7.5vw,140px)] max-w-[18ch]">
              The new standard
              <br />
              of <span className="text-green">arrival.</span>
            </h2>
          </div>
        </motion.div>

        {/* Tiny scroll cue at top for the arrival close-up */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono-chq text-[10px] tracking-[0.3em] uppercase text-white/45">
            Scroll · Zoom out
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-white/40"
          />
        </motion.div>
      </div>
    </section>
  );
}
