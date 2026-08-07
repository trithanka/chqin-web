import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import QRGlyph from "@/components/QRGlyph";

const ENVIRONMENTS = [
  {
    name: "Luxury Hotel",
    url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Boutique Resort",
    url: "https://images.pexels.com/photos/18153132/pexels-photo-18153132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
  {
    name: "Business Suite",
    url: "https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
  {
    name: "VIP Venue",
    url: "https://images.pexels.com/photos/26447525/pexels-photo-26447525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
];

export default function OneQR() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ENVIRONMENTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const next = ENVIRONMENTS[(idx + 1) % ENVIRONMENTS.length];
    const img = new Image();
    img.src = next.url;
  }, [idx]);

  const env = ENVIRONMENTS[idx];

  return (
    <section
      data-testid="section-oneqr"
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden border-b border-white/10"
    >
      {/* Crossfading environment */}
      <AnimatePresence>
        <motion.div
          key={env.name}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={env.url}
            alt="Hotel entrance background environment"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Header */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/50">
          07 — One Entry Point
        </span>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(3rem,7vw,96px)] mb-12"
        >
          Same Scan.
          <br />
          <span className="text-green">Every Entrance.</span>
        </motion.div>

        {/* 3D Tilted Floating Glowing QR */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-8 rounded-3xl bg-[radial-gradient(circle,rgba(0,255,102,0.45),transparent_70%)] blur-2xl group-hover:blur-3xl transition-all" />
          <div
            className="relative w-52 h-52 md:w-64 md:h-64 rounded-3xl bg-white p-5 shadow-[0_0_60px_rgba(0,255,102,0.3)] transition-transform duration-500 hover:rotate-0"
            style={{ transform: "perspective(1000px) rotateY(-14deg) rotateX(10deg) rotateZ(-3deg)" }}
          >
            <QRGlyph color="#000000" seed={424242} className="w-full h-full" />
            
            {/* Soft Scanning Beam Laser */}
            <motion.div
              animate={{ y: ["0%", "88%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-3 right-3 h-1 bg-green shadow-[0_0_12px_#00ff66]"
            />
          </div>
        </motion.div>

        {/* Environment label */}
        <div className="mt-12 h-10 flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={env.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <span className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
                {env.name}
              </span>
              <span className="font-mono-chq text-xs tracking-[0.2em] uppercase text-green font-bold bg-green/10 px-3 py-1 rounded-full border border-green/30">
                · Ready for arrival
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex gap-2">
          {ENVIRONMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Select environment ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-green" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
