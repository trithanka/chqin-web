import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { INDIA_PATH, NODES } from "@/lib/indiaGeo";

const EDGES = [
  [0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [1, 5], [1, 6], [0, 6], [1, 7],
  [0, 8], [0, 9], [3, 9], [2, 10], [4, 10], [0, 11], [1, 12], [0, 13], [1, 13],
  [1, 14], [5, 14], [3, 15], [3, 16], [9, 16], [13, 17], [6, 17], [2, 18],
  [10, 18], [5, 19], [4, 19],
];

const STEP_MS = 620;
const HOLD_MS = 3500;

export default function Network() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (active >= NODES.length) {
      const id = setTimeout(() => setActive(0), HOLD_MS);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [active, inView]);

  const currentNode = active > 0 ? NODES[active - 1] : null;

  return (
    <section
      ref={ref}
      data-testid="section-network"
      className="relative h-screen w-full bg-black overflow-hidden flex items-center"
    >
      <div className="mx-auto max-w-[1600px] w-full h-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 items-center gap-10">
        {/* LEFT — 45% */}
        <div className="md:col-span-5 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-white leading-[0.88] tracking-[-0.045em] text-[clamp(3rem,7.5vw,132px)]"
          >
            Every new check-in
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="mt-1 font-display font-extrabold text-white leading-[0.88] tracking-[-0.045em] text-[clamp(3rem,7.5vw,132px)]"
          >
            makes{" "}
            <span className="font-devanagari text-green">भारत</span>{" "}
            smarter.
          </motion.h2>
        </div>

        {/* RIGHT — 55% living network */}
        <div className="md:col-span-7 relative z-10 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[680px] aspect-square">
            {/* Ambient wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(16,224,134,0.10), transparent 60%)",
                filter: "blur(30px)",
              }}
            />

            {/* Live category label — top-right */}
            <div className="absolute top-0 right-0 z-20 flex flex-col items-end gap-1">
              <span className="font-mono-chq text-[10px] tracking-[0.28em] uppercase text-white/40">
                Live check-in
              </span>
              <AnimatePresence mode="wait">
                {currentNode && (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green" />
                    <span className="font-display font-medium text-white text-sm tracking-tight">
                      {currentNode.name}
                    </span>
                    <span className="font-mono-chq text-[10px] tracking-[0.2em] uppercase text-green">
                      · {currentNode.cat}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Camera / network */}
            {/* The map holds a fixed size; only the network draws itself in. */}
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                aria-label="ChqIn live network"
              >
                {/* India's real border. The nodes are projected into this same
                    coordinate space, so every city sits where it actually is. */}
                <motion.path
                  d={INDIA_PATH}
                  fill="rgba(16,224,134,0.05)"
                  stroke="var(--chq-green)"
                  strokeWidth={0.22}
                  strokeOpacity={0.45}
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Edges */}
                {EDGES.map(([a, b], i) => {
                  const on = a < active && b < active;
                  return (
                    <motion.line
                      key={i}
                      x1={NODES[a].x}
                      y1={NODES[a].y}
                      x2={NODES[b].x}
                      y2={NODES[b].y}
                      stroke="var(--chq-green)"
                      strokeWidth={0.18}
                      strokeOpacity={on ? 0.55 : 0}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: on ? 1 : 0 }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  );
                })}

                {/* Nodes */}
                {NODES.map((n, i) => {
                  const on = i < active;
                  const isCurrent = i === active - 1;
                  return (
                    <g key={n.name}>
                      {/* Outer ping — only current one */}
                      {isCurrent && (
                        <motion.circle
                          cx={n.x}
                          cy={n.y}
                          r={0.9}
                          fill="none"
                          stroke="var(--chq-green)"
                          strokeWidth={0.18}
                          initial={{ r: 0.9, opacity: 0.9 }}
                          animate={{ r: 4, opacity: 0 }}
                          transition={{ duration: 1.6, ease: "easeOut", repeat: 1 }}
                        />
                      )}
                      <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r={on ? 0.85 : 0}
                        fill="var(--chq-green)"
                        initial={{ opacity: 0, r: 0 }}
                        animate={{
                          opacity: on ? 1 : 0,
                          r: isCurrent ? [1.4, 0.9] : on ? 0.9 : 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ filter: on ? "drop-shadow(0 0 1.4px var(--chq-green))" : "none" }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom whisper */}
            <div className="absolute -bottom-2 left-0 flex items-center gap-3 opacity-60">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="font-mono-chq text-[10px] tracking-[0.2em] uppercase text-white/50">
                {active} entrance{active === 1 ? "" : "s"} · online
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
