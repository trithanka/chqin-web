import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Cpu, Layers } from "lucide-react";

const SECURITY_ITEMS = [
  {
    title: "Encrypted Biometric Templates",
    icon: Lock,
    desc: "Your face is converted into an encrypted biometric template. We don't store raw images on servers.",
  },
  {
    title: "3D Liveness Detection",
    icon: Cpu,
    desc: "Advanced anti-spoofing technology ensures verification only triggers for live physical guests, preventing photo or video replays.",
  },
  {
    title: "Explicit Consent Based",
    icon: EyeOff,
    desc: "Guests maintain complete control. Biometrics are processed strictly upon explicit opt-in for check-in verification.",
  },
  {
    title: "Built for Modern PMS Integrations",
    icon: Layers,
    desc: "Designed to interface cleanly with property management systems to automate room assignment and digital key issuance.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      data-testid="section-security"
      className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
            06 — Trust & Privacy
          </span>
          <h2 className="mt-4 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,6vw,84px)]">
            Privacy first. <span className="text-green">Enterprise ready.</span>
          </h2>
          <p className="mt-6 text-white/60 font-sans text-lg leading-relaxed">
            Biometrics demand unwavering security. ChqIn is built from the ground up to protect guest identity and guarantee compliance.
          </p>
        </div>

        {/* Security Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECURITY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-green/40 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/30 text-green flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 font-mono-chq text-xs text-green/80 uppercase tracking-widest">
                  <ShieldCheck size={14} /> Security Verified
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security Commitment Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green text-black flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="font-display font-bold text-lg text-white">
                Zero Document Storage Policy
              </p>
              <p className="text-white/50 text-sm">
                We never store physical ID document images after verification is complete.
              </p>
            </div>
          </div>

          <span className="font-mono-chq text-xs tracking-widest uppercase text-green bg-green/10 px-4 py-2 rounded-full border border-green/20">
            Encrypted & Private
          </span>
        </motion.div>
      </div>
    </section>
  );
}
