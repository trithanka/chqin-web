import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, ShieldCheck, UserCheck } from "lucide-react";

const ALIVE_STEPS = [
  {
    tag: "Face Scan",
    headline: "Looking for face...",
    sub: "Aligning camera & reticle",
  },
  {
    tag: "Biometrics",
    headline: "✓ Face Verified",
    sub: "Liveness anti-spoof confirmed",
  },
  {
    tag: "Identity",
    headline: "Matching identity...",
    sub: "Checking guest record",
  },
  {
    tag: "Check-In Verified",
    headline: "✓ Check-In Complete",
    sub: "Welcome back. Enjoy your stay.",
  },
];

function PhoneScreen({ step, reduce }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-between p-6 pt-10 text-black text-center"
      >
        {/* Step 0: Looking for face... */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-green p-1 flex items-center justify-center mb-6 overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Guest identity verification scan preview"
                className="w-full h-full object-cover rounded-full opacity-80"
              />
              <motion.div
                animate={{ y: ["-100%", "100%", "-100%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-x-0 h-1 bg-green shadow-[0_0_12px_#00ff66]"
              />
            </div>
            <p className="font-mono-chq text-xs tracking-[0.25em] uppercase text-black/50">
              Biometric Reticle
            </p>
            <p className="mt-2 font-display font-bold text-xl text-black">
              Looking for face...
            </p>
          </div>
        )}

        {/* Step 1: Face Verified */}
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 rounded-full bg-green text-black flex items-center justify-center mb-6 shadow-lg"
            >
              <Check size={44} strokeWidth={3.5} />
            </motion.div>
            <span className="font-mono-chq text-[11px] tracking-widest uppercase text-green bg-black px-3 py-1 rounded-full font-bold">
              ✓ Liveness Pass
            </span>
            <p className="mt-4 font-display font-black text-2xl text-black">
              Face Verified
            </p>
            <p className="mt-1 text-xs text-black/60">3D biometric template created</p>
          </div>
        )}

        {/* Step 2: Matching identity... */}
        {step === 2 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-black text-green flex items-center justify-center mb-6 shadow-md">
              <ShieldCheck size={36} />
            </div>
            <p className="font-mono-chq text-xs tracking-widest uppercase text-black/50">
              Database Lookup
            </p>
            <p className="mt-2 font-display font-bold text-xl text-black">
              Matching identity...
            </p>
            <div className="mt-4 w-32 h-1.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-green"
              />
            </div>
          </div>
        )}

        {/* Step 3: Check-In Complete */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-2xl bg-black text-green flex items-center justify-center mb-4 shadow-xl"
            >
              <UserCheck size={40} />
            </motion.div>
            <span className="font-mono-chq text-[11px] tracking-widest uppercase text-green bg-black px-3 py-1 rounded-full font-bold">
              ✓ Identity Confirmed
            </span>
            <p className="mt-4 font-display font-black text-2xl text-black">
              Check-In Complete
            </p>
            <p className="mt-2 font-display text-sm text-black/70 font-medium">
              Welcome back. Enjoy your stay.
            </p>
          </div>
        )}

        {/* Bottom indicator */}
        <div className="w-full pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-mono-chq text-black/50">
          <span>Hotel Arrival</span>
          <span className="text-green-700 font-bold">ChqIn AI</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="experience"
      data-testid="section-experience"
      className="relative min-h-screen w-full bg-black flex items-center overflow-hidden border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-24">
        <div>
          <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
            04 — Biometric Intelligence
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(3.5rem,7vw,96px)]"
          >
            The engine is <span className="text-green">AI.</span>
          </motion.h2>

          <p className="mt-6 text-white/60 font-sans text-lg max-w-md leading-relaxed">
            Watch the phone in action. Real-time liveness detection, encrypted identity matching, and instant check-in verification.
          </p>

          {/* step ticker */}
          <div className="mt-10 flex items-center gap-3 flex-wrap">
            {ALIVE_STEPS.map((s, i) => (
              <button
                key={s.tag}
                onClick={() => setStep(i)}
                className={`font-mono-chq text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  i === step
                    ? "border-[color:var(--chq-green)] text-green bg-green/10 font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                    : "border-white/15 text-white/40 hover:text-white/70"
                }`}
              >
                {s.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[280px] h-[580px] md:w-[320px] md:h-[640px] rounded-[3rem] bg-white p-3 shadow-[0_40px_120px_-20px_rgba(0,255,102,0.3)] border-[6px] border-zinc-800"
            style={{ perspective: 1000 }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-10" />
            <div className="relative w-full h-full rounded-[2.3rem] bg-white overflow-hidden">
              <PhoneScreen step={step} reduce={reduce} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
