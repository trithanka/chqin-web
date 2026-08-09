import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRGlyph from "@/components/QRGlyph";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.14 },
  }),
};

export default function Arrival() {
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(false);
  const [ack, setAck] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleActivate = () => {
    setAck(true);
    setTimeout(() => {
      const next = document.querySelector("[data-testid='section-experience']");
      if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setAck(false), 400);
    }, 260);
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
            "radial-gradient(circle at center, rgba(16,224,134,0.18), rgba(16,224,134,0.06) 40%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] w-full min-h-screen md:h-screen px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8 py-16 md:py-0">
        {/* LEFT — poster command */}
        <div className="md:col-span-6 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Huge poster command */}
          <div>
            <div className="overflow-hidden">
              <motion.h1
                variants={line}
                custom={1}
                initial="hidden"
                animate="show"
                className="font-display font-extrabold text-[clamp(2.2rem,11vw,168px)] leading-[0.92] md:leading-[0.9] tracking-[-0.03em] whitespace-nowrap text-center md:text-left"
              >
                <span className="text-white">SCAN </span>
                <span className="text-green">IN</span>
              </motion.h1>
            </div>
          </div>

          {/* Sub heading */}
          <div className={`mt-3 md:mt-4 text-center md:text-left reveal-fade ${revealed ? "in" : ""}`}>
            <p className="font-display font-medium text-white/60 text-[clamp(1.1rem,2.2vw,32px)] tracking-tight">
              Check in in 3 seconds.
            </p>
          </div>
        </div>

        {/* RIGHT — hero QR */}
        <div className="md:col-span-6 relative z-10 flex justify-center md:justify-end">
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
              aria-label="Scan to begin"
              className={`relative outline-none group cursor-pointer bg-transparent ${
                ack ? "qr-ack" : ""
              }`}
            >
              <div className="qr-alive relative w-[64vw] max-w-[380px] md:w-[30vw] md:max-w-[420px] aspect-square">
                <QRGlyph color="#ffffff" seed={424242} className="w-full h-full" />

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
                    className={`absolute w-10 h-10 border-[color:var(--chq-green)] ${c.pos}`}
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
                          "linear-gradient(90deg, transparent, var(--chq-green) 50%, transparent)",
                        boxShadow: "0 0 24px 4px var(--chq-green)",
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
