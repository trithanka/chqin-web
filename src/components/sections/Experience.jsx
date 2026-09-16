import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Fingerprint, ScanFace } from "lucide-react";
import QRGlyph from "@/components/QRGlyph";

// Phases: 0 scan, 1 verify (fingerprint / face), 2 checked in
const PHASE_DURATIONS = [2400, 2400, 2600];

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
  "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
];

const CHECKIN_DETAILS = [
  ["Location", "Skyline Residency"],
  ["Gate", "Tower B"],
  ["Time", "9:41 AM"],
];

function ScreenTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h3 className="font-display text-xl font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-1.5 text-xs text-white/50">{subtitle}</p>
    </div>
  );
}

function PhoneScreen({ phase }) {
  return (
    <div
      className="absolute inset-0 flex flex-col text-white"
      style={{
        background:
          "radial-gradient(120% 70% at 50% 0%, #0b2a6b 0%, #06132e 45%, #02060f 100%)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-white/80">
        <span>9:41</span>
        <span className="relative w-5 h-2.5 rounded-[3px] border border-white/60">
          <span className="absolute inset-y-[1.5px] left-[1.5px] right-[5px] rounded-[1px] bg-white/80" />
        </span>
      </div>

      {/* App header + step progress */}
      <div className="mt-6 px-6 flex items-center justify-between">
        <span className="font-logo text-lg text-white">
          Chq<span className="text-brand-gradient">In</span><sup className="ml-[0.08em] align-super text-[0.35em] font-sans font-semibold tracking-normal">™</sup>
        </span>
        <span className="font-mono-chq text-[9px] tracking-[0.2em] uppercase text-white/40">
          Step {phase + 1}/{PHASE_DURATIONS.length}
        </span>
      </div>
      <div className="mt-3 px-6 grid grid-cols-3 gap-1.5">
        {PHASE_DURATIONS.map((_, i) => (
          <div key={i} className="h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-brand"
              initial={false}
              animate={{ width: i <= phase ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {phase === 0 && (
              <>
                <ScreenTitle title="Scan to check in" subtitle="Point your camera at the ChqIn QR" />
                <div className="relative mt-8 w-48 h-48 p-4">
                  {CORNERS.map((pos) => (
                    <span key={pos} className={`absolute w-9 h-9 border-[color:var(--brand)] ${pos}`} />
                  ))}
                  <div className="w-full h-full rounded-xl bg-white p-2">
                    <QRGlyph color="#06132e" className="w-full h-full" />
                  </div>
                  <motion.div
                    className="absolute left-3 right-3 h-[2px] rounded-full bg-brand"
                    style={{ boxShadow: "0 0 16px 3px var(--brand)" }}
                    animate={{ top: ["10%", "90%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                </div>
                <div className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] text-white/70">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-brand"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  Scanning…
                </div>
              </>
            )}

            {phase === 1 && (
              <>
                <ScreenTitle title="Verify it's you" subtitle="Use your fingerprint or face" />
                <div className="relative mt-10 w-36 h-36 flex items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, rgb(var(--brand-rgb) / 0.28), transparent 70%)" }}
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="absolute inset-2 rounded-full border border-white/10" />
                  <motion.span
                    className="absolute inset-2 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: "var(--brand)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative">
                    <Fingerprint size={64} strokeWidth={1.3} className="text-white/20" />
                    {/* Fingerprint "fills" from bottom to top as it reads */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    >
                      <Fingerprint size={64} strokeWidth={1.3} className="text-brand" />
                    </motion.div>
                  </div>
                </div>
                <div className="mt-10 w-full grid grid-cols-2 gap-2 text-[11px] font-semibold">
                  <div className="flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-black">
                    <Fingerprint size={14} strokeWidth={2.2} /> Fingerprint
                  </div>
                  <div className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-white/60">
                    <ScanFace size={14} strokeWidth={2.2} /> Face scan
                  </div>
                </div>
              </>
            )}

            {phase === 2 && (
              <>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-[color:var(--brand)]"
                    initial={{ scale: 0.6, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="w-20 h-20 rounded-full bg-brand flex items-center justify-center"
                    style={{ boxShadow: "0 0 40px rgb(var(--brand-rgb) / 0.5)" }}
                  >
                    <Check size={38} className="text-black" strokeWidth={3} />
                  </motion.div>
                </div>
                <div className="mt-7">
                  <ScreenTitle title="You're checked in" subtitle="Welcome! Have a great visit." />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-1"
                >
                  {CHECKIN_DETAILS.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0"
                    >
                      <span className="font-mono-chq text-[9px] tracking-[0.2em] uppercase text-white/40">{label}</span>
                      <span className="text-xs font-semibold text-white/90">{value}</span>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase]
    );
    return () => clearTimeout(id);
  }, [phase, inView]);

  const settled = false;

  return (
    <section
      ref={ref}
      data-testid="section-experience"
      className="relative min-h-screen w-full bg-black flex items-center overflow-hidden"
    >
      {/* Extremely subtle emerald ambient wash behind phone (left side) */}
      <div
        className="pointer-events-none absolute left-[-6%] top-1/2 -translate-y-1/2 w-[52vw] max-w-[720px] h-[52vw] max-h-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--brand-rgb) / 0.14), rgb(var(--brand-rgb) / 0.045) 45%, transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] w-full px-6 md:pl-32 lg:pl-48 md:pr-16 grid grid-cols-1 md:grid-cols-12 items-center gap-12">
        {/* LEFT — Floating phone / settled identity */}
        <div className="md:col-span-6 order-1 flex justify-center md:justify-start relative">
          {/* Floating phone */}
          <motion.div
            animate={{
              y: settled ? -14 : [0, -10, 0],
              opacity: settled ? 0 : 1,
              scale: settled ? 0.94 : 1,
              filter: settled ? "blur(10px)" : "blur(0px)",
            }}
            transition={{
              y: settled
                ? { duration: 1 }
                : { duration: 6, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
              filter: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            }}
            className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] rounded-[3rem] bg-[#0a0f1c] p-3"
            style={{
              boxShadow:
                "0 40px 120px -20px rgb(var(--brand-rgb) / 0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
            <div className="relative w-full h-full rounded-[2.3rem] bg-black overflow-hidden">
              <PhoneScreen phase={phase} />
            </div>
          </motion.div>

          {/* Settled identity — only the green mark remains */}
          <AnimatePresence>
            {settled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div
                    className="absolute -inset-16 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgb(var(--brand-rgb) / 0.35), transparent 65%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgb(var(--brand-rgb) / 0.35)",
                        "0 0 0 30px rgb(var(--brand-rgb) / 0)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    className="relative w-24 h-24 rounded-full bg-brand flex items-center justify-center"
                  >
                    <Check size={44} className="text-black" strokeWidth={3} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Story */}
        <div className="md:col-span-6 order-2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-white text-[clamp(2.5rem,10.5vw,180px)] leading-[0.88] tracking-[-0.03em] text-center md:text-left"
            >
              Once
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display font-extrabold text-brand-gradient text-[clamp(2.5rem,10.5vw,180px)] leading-[0.88] tracking-[-0.03em] text-center md:text-left"
            >
              Never Again
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
}
