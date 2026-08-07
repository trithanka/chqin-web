import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Clock, Zap } from "lucide-react";

export default function Comparison() {
  return (
    <section
      id="comparison"
      data-testid="section-comparison"
      className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
              05 — ROI & Efficiency
            </span>
            <h2 className="mt-4 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,6vw,84px)]">
              Traditional vs <span className="text-green">ChqIn.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-base leading-relaxed">
            Eliminate front desk queues and operational overhead with autonomous biometric identity verification.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono-chq text-xs uppercase tracking-widest text-red-400/80 flex items-center gap-2">
                  <XCircle size={18} /> Traditional Reception
                </span>
                <span className="flex items-center gap-1.5 font-mono-chq text-xs text-white/40">
                  <Clock size={14} /> 4–7 Minutes per guest
                </span>
              </div>

              <h3 className="mt-8 font-display font-black text-3xl text-white tracking-tight">
                High Friction & Bottlenecks
              </h3>

              <ul className="mt-8 space-y-5">
                {[
                  "Long lobby queues during peak arrival hours",
                  "Manual passport/ID scanning and paper sign-in cards",
                  "Front desk staffing bottlenecks & high operational costs",
                  "Repetitive identity verification delays on every stay",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/60 text-sm md:text-base">
                    <XCircle size={18} className="text-red-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs font-mono-chq">
              Result: Frustrated guests & overworked front desk staff.
            </div>
          </motion.div>

          {/* ChqIn Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-green/10 via-zinc-950 to-zinc-950 border border-green/50 shadow-[0_0_50px_rgba(0,255,102,0.1)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-green/20">
                <span className="font-mono-chq text-xs uppercase tracking-widest text-green flex items-center gap-2 font-bold">
                  <CheckCircle2 size={18} /> ChqIn Autonomous
                </span>
                <span className="flex items-center gap-1.5 font-mono-chq text-xs text-green font-bold bg-green/20 px-3 py-1 rounded-full border border-green/30">
                  <Zap size={14} /> Seconds, not minutes
                </span>
              </div>

              <h3 className="mt-8 font-display font-black text-3xl text-white tracking-tight">
                Instant & Frictionless
              </h3>

              <ul className="mt-8 space-y-5">
                {[
                  "Zero reception queues — instant check-in verification",
                  "100% automated biometric & identity verification",
                  "Staff freed to focus on high-touch hospitality",
                  "Recognized instantly on returning visits",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white text-sm md:text-base">
                    <CheckCircle2 size={18} className="text-green shrink-0 mt-1" strokeWidth={2.5} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 p-4 rounded-xl bg-green/10 border border-green/30 text-green text-xs font-mono-chq font-bold flex items-center justify-between">
              <span>Outcome: Delighted guests & efficient operations.</span>
              <span className="text-white">✓</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
