import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easing = [0.22, 1, 0.36, 1];

export default function Final() {
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
        <motion.a
          href="https://business.chqin.in/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="final-cta"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easing, delay: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="mt-12 md:mt-16 group relative inline-flex items-center gap-3 rounded-full bg-white text-black font-semibold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 tracking-tight transition-shadow duration-500"
          style={{ boxShadow: "0 10px 40px -10px rgba(255,255,255,0.15)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 0 1px rgb(var(--brand-rgb) / 0.5), 0 0 60px 4px rgb(var(--brand-rgb) / 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 10px 40px -10px rgba(255,255,255,0.15)";
          }}
        >
          Try ChqIn
          <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-500 group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
