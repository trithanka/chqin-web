import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

// Phases: 0 mobile, 1 otp, 2 smile, 3 in
const PHASE_DURATIONS = [2000, 2000, 2000, 2400];

function PhoneScreen({ phase }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center px-10 text-black"
      >
        {phase === 0 && (
          <>
            <p className="font-mono-chq text-[10px] tracking-[0.28em] uppercase text-black/40 mb-10">
              Mobile
            </p>
            <div className="w-full border-b border-black/80 pb-3 font-display text-2xl tracking-tight text-center">
              +91 98107 •••••
            </div>
            <div className="mt-12 w-12 h-12 rounded-full bg-green flex items-center justify-center">
              <ArrowRight size={18} className="text-black" strokeWidth={2.5} />
            </div>
          </>
        )}
        {phase === 1 && (
          <>
            <p className="font-mono-chq text-[10px] tracking-[0.28em] uppercase text-black/40 mb-10">
              OTP
            </p>
            <div className="flex gap-2">
              {[6, 1, 4, 2, 8, 0].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-9 h-12 rounded-md border border-black/70 flex items-center justify-center font-display text-xl"
                >
                  {n}
                </motion.div>
              ))}
            </div>
          </>
        )}
        {phase === 2 && (
          <>
            <p className="font-mono-chq text-[10px] tracking-[0.28em] uppercase text-black/40 mb-10">
              Smile
            </p>
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.span
                className="absolute inset-0 rounded-full border border-[color:var(--chq-green)]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.9, 0.35, 0.9] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </>
        )}
        {phase === 3 && (
          <>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 rounded-full bg-green flex items-center justify-center"
            >
              <Check size={38} className="text-black" strokeWidth={3} />
            </motion.div>
            <p className="mt-8 font-display font-extrabold text-3xl tracking-tight text-black">
              IN
            </p>
          </>
        )}
      </motion.div>
    </AnimatePresence>
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
            "radial-gradient(circle at center, rgba(16,224,134,0.14), rgba(16,224,134,0.045) 45%, transparent 68%)",
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
            className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] rounded-[3rem] bg-white p-3"
            style={{
              boxShadow:
                "0 40px 120px -20px rgba(16,224,134,0.22), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-10" />
            <div className="relative w-full h-full rounded-[2.3rem] bg-white overflow-hidden">
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
                        "radial-gradient(circle, rgba(16,224,134,0.35), transparent 65%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(16,224,134,0.35)",
                        "0 0 0 30px rgba(16,224,134,0)",
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    className="relative w-24 h-24 rounded-full bg-green flex items-center justify-center"
                  >
                    <Check size={44} className="text-black" strokeWidth={3} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Story */}
        <div className="md:col-span-6 order-2 flex flex-col justify-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-white text-[clamp(4rem,10.5vw,180px)] leading-[0.86] tracking-[-0.045em]"
            >
              Once
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display font-extrabold text-green text-[clamp(4rem,10.5vw,180px)] leading-[0.86] tracking-[-0.045em]"
            >
              Never again
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
}
