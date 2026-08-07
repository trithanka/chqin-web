import React from "react";
import { motion } from "framer-motion";

const CITY_URL =
  "https://images.unsplash.com/photo-1679212839469-fb16a48919ce?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";

const NODES = [
  { x: 18, y: 32, d: 0 },
  { x: 32, y: 55, d: 0.6 },
  { x: 44, y: 40, d: 1.2 },
  { x: 55, y: 62, d: 0.3 },
  { x: 63, y: 34, d: 1.6 },
  { x: 72, y: 52, d: 0.9 },
  { x: 82, y: 44, d: 2 },
  { x: 26, y: 70, d: 1.4 },
  { x: 48, y: 74, d: 2.2 },
  { x: 68, y: 72, d: 0.5 },
  { x: 88, y: 66, d: 1.1 },
  { x: 12, y: 52, d: 1.8 },
  { x: 38, y: 26, d: 2.4 },
  { x: 78, y: 24, d: 0.8 },
];

export default function Network() {
  return (
    <section
      id="network"
      data-testid="section-network"
      className="relative min-h-screen w-full bg-black flex items-center overflow-hidden border-b border-white/10"
    >
      {/* City */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={CITY_URL}
          alt="Global network of hotels background"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
      </motion.div>

      {/* Glowing Nodes */}
      <div className="absolute inset-0 z-10">
        {NODES.map((n, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full node-ring bg-green"
              style={{ animationDelay: `${n.d}s` }}
            />
            <span className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green shadow-[0_0_10px_var(--chq-green)]" />
          </div>
        ))}
      </div>

      {/* Headline & Clear Copy */}
      <div className="relative z-20 mx-auto max-w-[1600px] w-full px-6 md:px-12">
        <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/50">
          08 — Global Identity Network
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(3rem,7vw,100px)] max-w-4xl"
        >
          One identity.
          <br />
          <span className="text-green">Every hotel.</span>
        </motion.h2>

        <p className="mt-8 text-white/70 font-sans text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
          Verified once on ChqIn. Recognized everywhere. Your biometric check-in travels with you across every partner hotel.
        </p>

        <div className="mt-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono-chq text-xs tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-green" /> Verified once. Recognized everywhere.
        </div>
      </div>
    </section>
  );
}
