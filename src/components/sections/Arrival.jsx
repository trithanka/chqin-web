import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRGlyph from "@/components/QRGlyph";

const MIDDLE = ["", "PAY", "PURPOSE", "VERIFY", "VALIDATE"];

// Thin gradient arrow: line fades in from the left into a rounded chevron
const Arrow = () => (
  <svg viewBox="0 0 40 12" className="inline-block w-[1.5em] h-[0.6em] mx-[0.35em] align-middle -translate-y-[0.05em]" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="arrow-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#7ee8fa" stopOpacity="0" />
        <stop offset="0.6" stopColor="#5cc8f5" />
        <stop offset="1" stopColor="#3b7ff0" />
      </linearGradient>
    </defs>
    <path d="M2 6h34M31 1.5 36 6l-5 4.5" stroke="url(#arrow-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.14 },
  }),
};
//
export default function Arrival() {
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(false);
  const [ack, setAck] = useState(false);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % MIDDLE.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleActivate = () => {
    setAck(true);
    setTimeout(() => {
      window.location.href = "https://business.chqin.in/";
    }, 300);
  };

  return (
    <section
      id="top"
      data-testid="section-arrival"
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Ambient emerald wash behind QR */}
      <div
        className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[70vw] max-h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--brand-rgb) / 0.18), rgb(var(--brand-rgb) / 0.06) 40%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] w-full min-h-screen md:h-screen px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8 py-16 md:py-0 md:pb-[4vh]">
        {/* LEFT — poster command */}
        <div className="md:col-span-6 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Huge poster command */}
          <div className="md:pl-[4vw]">
            <div className="overflow-hidden">
              <motion.h1
                variants={line}
                custom={1}
                initial="hidden"
                animate="show"
                className="font-display font-extrabold text-[clamp(2.2rem,11vw,168px)] leading-[0.92] md:leading-[0.9] tracking-[-0.03em] whitespace-nowrap text-center md:text-left"
              >
                <span className="text-white">SCAN </span>
                <span className="text-brand-gradient">IN</span>
              </motion.h1>
            </div>
            {/* Cycling tagline — fixed height so the headline and QR never move */}
            <div className="relative h-[1.2em] [clip-path:inset(0_-100vw)] font-display font-extrabold text-[clamp(0.9rem,2.4vw,32px)] tracking-[-0.02em] whitespace-nowrap mt-3">
              <AnimatePresence initial={false}>
                <motion.p
                  key={word}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 text-center md:text-left"
                >
                  <span className="text-white">SCAN</span>
                  <Arrow />
                  {MIDDLE[word] && (
                    <>
                      <span className="text-white">{MIDDLE[word]}</span>
                      <Arrow />
                    </>
                  )}
                  <span className="text-brand-gradient">IN</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT — hero QR */}
        <div className="md:col-span-6 relative z-10 flex justify-center md:justify-end md:pr-[4vw]">
          <div
            className={`relative reveal ${revealed ? "in" : ""}`}
            style={{ transitionDuration: "1.6s" }}
          >
            {/* interactive QR */}
            <motion.button
              type="button"
              data-testid="hero-qr"
              onClick={handleActivate}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
              animate={{ scale: hover ? 1.03 : 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Scan or click to open ChqIn PWA"
              className={`relative outline-none group cursor-pointer bg-transparent ${
                ack ? "qr-ack" : ""
              }`}
            >
              <div className="qr-alive relative w-[64vw] max-w-[380px] md:w-[30vw] md:max-w-[420px] aspect-square">
                <QRGlyph color="#ffffff" value="https://business.chqin.in/" className="w-full h-full" />

                {/* Corner brackets — animate outward on hover */}
                {[
                  { pos: "top-0 left-0 border-t-2 border-l-2", tx: -1, ty: -1 },
                  { pos: "top-0 right-0 border-t-2 border-r-2", tx: 1, ty: -1 },
                  { pos: "bottom-0 left-0 border-b-2 border-l-2", tx: -1, ty: 1 },
                  { pos: "bottom-0 right-0 border-b-2 border-r-2", tx: 1, ty: 1 },
                ].map((c, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      x: (hover ? 10 : 0) * c.tx,
                      y: (hover ? 10 : 0) * c.ty,
                      opacity: hover ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute w-10 h-10 border-[color:var(--brand)] ${c.pos}`}
                    style={{ margin: "-18px" }}
                  />
                ))}

                {/* Scanning light — only when hover */}
                {hover && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                    <div
                      className="qr-scan-line absolute left-0 right-0 h-[3px]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--brand) 50%, transparent)",
                        boxShadow: "0 0 24px 4px var(--brand)",
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
