import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRGlyph from "@/components/QRGlyph";

const ENVIRONMENTS = [
  {
    name: "Apartments",
    url: "https://images.pexels.com/photos/18153132/pexels-photo-18153132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
  {
    name: "Hotels",
    url: "https://images.unsplash.com/photo-1660557989695-14fac79c086d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800",
  },
  {
    name: "Offices",
    url: "https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
  {
    name: "Hospitals",
    url: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "Campuses",
    url: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800",
  },
  {
    name: "Events",
    url: "https://images.pexels.com/photos/26447525/pexels-photo-26447525.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600",
  },
  {
    name: "Coworking",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
  },
];

const CYCLE_MS = 3600;

export default function OneQR() {
  const [idx, setIdx] = useState(0);
  const [pingKey, setPingKey] = useState(0);

  useEffect(() => {
    // Preload all environment images for zero latency, flicker-free background slides
    ENVIRONMENTS.forEach((e) => {
      const img = new Image();
      img.src = e.url;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % ENVIRONMENTS.length);
      setPingKey((k) => k + 1);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const env = ENVIRONMENTS[idx];

  return (
    <section
      data-testid="section-oneqr"
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Cinematic environment — camera pushes forward */}
      <AnimatePresence>
        <motion.div
          key={env.name}
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: CYCLE_MS / 1000 + 1.5, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <img
            src={env.url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Deep cinematic overlay */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Center composition — QR is the constant */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full">
        {/* Grouped headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-14"
        >
          <h2 className="font-display font-extrabold text-white leading-[0.92] md:leading-[0.9] tracking-[-0.03em] text-[clamp(2.1rem,8.5vw,138px)]">
            One Scan
          </h2>
          <h2 className="font-display font-extrabold text-white leading-[0.92] md:leading-[0.9] tracking-[-0.03em] text-[clamp(2.1rem,8.5vw,138px)]">
            Every Entrance
          </h2>
        </motion.div>

        {/* Big floating QR — the constant */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Ambient emerald light */}
          <div
            className="absolute -inset-20 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(16,224,134,0.35), rgba(16,224,134,0.08) 45%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="qr-alive relative w-[70vw] max-w-[360px] md:w-[26vw] md:max-w-[380px] aspect-square rounded-2xl bg-white p-4"
          >
            <QRGlyph color="#000000" seed={424242} className="w-full h-full" />
          </motion.div>

          {/* Tiny "You're in" ping — pulses briefly on each env change */}
          <AnimatePresence>
            <motion.div
              key={pingKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, -4] }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], times: [0, 0.15, 0.75, 1] }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:-right-8 md:translate-x-full md:-translate-y-1/2 flex items-center gap-2 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              <span className="font-mono-chq text-[10px] tracking-[0.28em] uppercase text-green">
                You&apos;re in
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Softly-fading contextual word */}
        <div className="mt-10 md:mt-12 h-8 relative w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={env.name}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 font-display font-medium text-white/70 text-[clamp(1.1rem,1.6vw,22px)] tracking-tight"
            >
              {env.name}.
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
