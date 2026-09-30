import React from "react";
import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

export default function Final({ onTry }) {
  return (
    <section
      id="final"
      data-testid="section-final"
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center px-6"
    >
      {/* Almost invisible ambient light behind the logo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[65%] w-[80vw] max-w-[720px] h-[60vw] max-h-[540px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--brand-rgb) / 0.10), rgb(var(--brand-rgb) / 0.03) 45%, transparent 70%)",
          filter: "blur(38px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1200px]">
        {/* Massive editorial headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: easing, delay: 0.15 }}
          className="font-display font-extrabold text-white leading-[0.92] md:leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,6.5vw,120px)] max-w-[16ch]"
        >
          Join the next
          <br />
          generation of arrivals.
        </motion.h2>

        {/* Supporting sentence */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easing, delay: 0.65 }}
          className="mt-8 md:mt-10 text-white/55 text-base md:text-lg leading-relaxed max-w-xl"
        >
          Bring ChqIn to your business and create a faster, simpler arrival experience.
        </motion.p>

        {/* Primary CTA — one button only */}
        <motion.button
          type="button"
          onClick={onTry}
          data-testid="final-cta"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easing, delay: 0.95 }}
          className="btn-try mt-12 md:mt-16 rounded-3xl text-xl md:text-2xl px-9 md:px-12 py-3.5 md:py-4"
        >
          Try Chq<span className="text-brand-gradient">In</span>
        </motion.button>
      </div>
    </section>
  );
}
