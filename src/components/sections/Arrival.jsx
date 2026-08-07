import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Play, Sparkles } from "lucide-react";
import QRGlyph from "@/components/QRGlyph";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.15 },
  }),
};

export default function Arrival({ onOpenDemo }) {
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      data-testid="section-arrival"
      className="relative min-h-screen w-full bg-black flex items-center overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-24">
        {/* Wordmark & Outcome Messaging */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-green font-mono-chq text-xs tracking-widest uppercase mb-6">
            <Sparkles size={14} /> Reception is now optional
          </div>

          <div className="overflow-hidden">
            <motion.h1
              custom={0}
              variants={line}
              initial="hidden"
              animate="show"
              className="font-display font-extrabold tracking-tighter leading-[0.85] text-white text-[clamp(4rem,10vw,120px)]"
            >
              Skip the <span className="text-green">desk.</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.p
              custom={1}
              variants={line}
              initial="hidden"
              animate="show"
              className="font-display font-medium tracking-tight text-white/90 text-[clamp(1.8rem,4vw,52px)]"
            >
              Check in. In seconds.
            </motion.p>
          </div>

          <p className="mt-6 text-white/60 font-sans text-lg max-w-lg leading-relaxed">
            Autonomous biometric check-in for modern hotels. No lobby queues, no paper forms—just scan and step into your room.
          </p>

          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <button
              onClick={onOpenDemo}
              data-testid="hero-try-demo"
              className="group relative overflow-hidden rounded-full bg-green text-black font-bold text-base px-8 py-4 tracking-tight transition-all duration-300 hover:scale-[1.04] shadow-[0_0_30px_rgba(0,255,102,0.3)] flex items-center gap-3"
            >
              <Play size={18} fill="currentColor" /> Try Live Demo
            </button>

            <a
              href="#pipeline"
              className="font-mono-chq text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors px-6 py-4 rounded-full border border-white/15 hover:border-white/40"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Glowing 3D QR Hero Visual */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className={`relative reveal ${revealed ? "in" : ""}`}>
            <div className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(0,255,102,0.35),transparent_65%)] blur-3xl animate-pulse" />
            <div
              className="qr-alive relative w-[62vw] max-w-[380px] md:w-[32vw] md:max-w-[400px] aspect-square rounded-3xl p-4 bg-zinc-950/80 border border-green/40 shadow-[0_0_50px_rgba(0,255,102,0.2)]"
              style={{ transform: "perspective(1000px) rotateY(-8deg) rotateX(6deg)" }}
            >
              <QRGlyph color="#ffffff" seed={424242} className="w-full h-full" />
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((c, i) => (
                <span
                  key={i}
                  className={`absolute w-8 h-8 border-[color:var(--chq-green)] ${c}`}
                  style={{ margin: "-16px" }}
                />
              ))}

              {/* Scanning Laser Sweep */}
              <motion.div
                animate={{ y: ["0%", "92%", "0%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-2 right-2 h-1 bg-green shadow-[0_0_15px_#00ff66]"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={
                revealed
                  ? { opacity: reduce ? 1 : [0.6, 1, 0.6] }
                  : { opacity: 0 }
              }
              transition={
                reduce
                  ? { duration: 0.4 }
                  : { duration: 2.4, repeat: Infinity, repeatType: "reverse" }
              }
              className="mt-8 text-center font-mono-chq text-xs tracking-[0.3em] uppercase text-green font-bold"
            >
              Scan to begin arrival
            </motion.p>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 reveal-fade ${
          revealed ? "in" : ""
        }`}
        data-testid="scroll-cue"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={reduce ? undefined : { duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
