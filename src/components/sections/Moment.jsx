import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

const PARTICLE_COLORS = ["var(--brand-light)", "var(--brand)", "var(--brand-dark)", "#0a0f1c"];

// One confetti burst fired from the centre when "YOU'RE IN" appears
function Celebration() {
  const particles = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 180 + Math.random() * 480;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance * 0.7;
        return {
          id: i,
          x,
          y,
          fall: y + 160 + Math.random() * 220, // drift down after the burst
          size: 6 + Math.random() * 8,
          round: Math.random() < 0.35,
          rotate: (Math.random() - 0.5) * 720,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          delay: 0.5 + Math.random() * 0.15, // wait for the last number to exit so the burst lands with the text

          duration: 1.6 + Math.random() * 0.9,
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            borderRadius: p.round ? "9999px" : "2px",
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
          animate={{
            x: [0, p.x, p.x * 1.08],
            y: [0, p.y, p.fall],
            opacity: [1, 1, 0],
            rotate: [0, p.rotate * 0.6, p.rotate],
            scale: [0.4, 1, 0.9],
          }}
          transition={{ duration: p.duration, delay: p.delay, times: [0, 0.35, 1], ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Moment() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [count, setCount] = useState(3);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    setCount(3);
    setDone(false);
    let n = 3;
    const id = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(id);
        setFlash(true);
        setTimeout(() => setFlash(false), 260);
        setDone(true);
      } else {
        setCount(n);
      }
    }, 750);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      data-testid="section-moment"
      className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-black tabular-nums leading-none text-[clamp(6rem,28vw,420px)]"
          >
            {count}
          </motion.div>
        ) : (
          <motion.h2
            key="youre-in"
            initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "-0.03em" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-black text-center leading-[0.85] text-[clamp(2.8rem,14vw,240px)] px-4"
            data-testid="youre-in-text"
          >
            YOU&apos;RE <span className="text-brand-gradient">IN</span>
          </motion.h2>
        )}
      </AnimatePresence>

      {done && !reduceMotion && <Celebration />}

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
