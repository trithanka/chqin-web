import React from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const RECEPTION_URL =
  "https://images.unsplash.com/photo-1660557989695-14fac79c086d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

const MARQUEE = [
  "Boutique Hotels",
  "Luxury Resorts",
  "Apartments",
  "Executive Suites",
  "Co-living",
  "Private Clubs",
];

export default function Business() {
  return (
    <section
      id="business"
      data-testid="section-business"
      className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden py-24 border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
            09 — For Hotel Operations
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(3rem,6vw,90px)]"
          >
            Built for
            <br />
            every <span className="text-green">entrance.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-white/60 text-lg max-w-md leading-relaxed"
          >
            Guest walks in. Scans QR. Face verified in seconds. Your front desk staff focus on creating warm, personalized hospitality rather than manual data entry.
          </motion.p>
        </div>

        {/* Enlarged Reception Visual with Floating Live Event Toast UI */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 relative"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <img
              src={RECEPTION_URL}
              alt="A guest checking in seamlessly at a hotel reception desk"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating Live Check-In Event Toast UI */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-green/40 shadow-2xl flex items-center gap-4 text-white"
            >
              <div className="w-12 h-12 rounded-xl bg-green text-black flex items-center justify-center shrink-0 shadow-lg">
                <Check size={26} strokeWidth={3} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-mono-chq text-white/50">
                  <span className="text-green font-bold flex items-center gap-1">
                    <Zap size={12} /> Autonomous Check-in
                  </span>
                  <span>Just now</span>
                </div>
                <p className="font-display font-bold text-base text-white truncate mt-0.5">
                  ✓ Guest Identity Verified
                </p>
                <p className="text-xs text-white/70 truncate">
                  Check-in confirmed in seconds
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-white/10 py-6">
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span
              key={i}
              className="font-display font-extrabold tracking-tight text-[clamp(2rem,4vw,56px)] text-white/15 flex items-center gap-10"
            >
              {w}
              <span className="text-green text-2xl">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
