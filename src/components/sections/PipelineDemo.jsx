import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QrCode, Scan, ShieldCheck, UserCheck } from "lucide-react";

const PIPELINE_STEPS = [
  {
    step: "01",
    label: "Arrive",
    icon: UserCheck,
    desc: "Guest walks into hotel lobby or entrance",
  },
  {
    step: "02",
    label: "Scan QR",
    icon: QrCode,
    desc: "Instant lightweight web check-in session",
  },
  {
    step: "03",
    label: "Face Scan",
    icon: Scan,
    desc: "Camera captures biometric verification",
  },
  {
    step: "04",
    label: "Verified",
    icon: ShieldCheck,
    desc: "Identity matched & check-in complete",
  },
];

export default function PipelineDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="pipeline"
      data-testid="section-pipeline"
      className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
              02 — How it works
            </span>
            <h2 className="mt-4 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,6vw,84px)]">
              Seconds, <span className="text-green">not minutes.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md font-sans text-base leading-relaxed">
            The story of arrival reimagined. No waiting at the front desk, no paper forms, no manual passport checks.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PIPELINE_STEPS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;
            const isPassed = activeStep > index;

            return (
              <motion.div
                key={item.step}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[240px] ${
                  isActive
                    ? "border-green bg-green/10 shadow-[0_0_30px_rgba(0,255,102,0.15)]"
                    : isPassed
                    ? "border-white/20 bg-white/5"
                    : "border-white/10 bg-zinc-950/60"
                }`}
              >
                {/* Active glow top bar */}
                {isActive && (
                  <motion.div
                    layoutId="activePipelineBar"
                    className="absolute top-0 left-0 right-0 h-1 bg-green shadow-[0_0_12px_#00ff66]"
                  />
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono-chq text-xs tracking-widest ${
                      isActive ? "text-green font-bold" : "text-white/40"
                    }`}
                  >
                    {item.step}
                  </span>
                  <div
                    className={`p-3 rounded-2xl transition-colors ${
                      isActive ? "bg-green text-black" : "bg-white/10 text-white/80"
                    }`}
                  >
                    <Icon size={24} strokeWidth={2} />
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-display font-bold text-2xl tracking-tight ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>

                {/* Connection line indicator */}
                {index < PIPELINE_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span
                      className={`block w-6 h-0.5 ${
                        isPassed || isActive ? "bg-green" : "bg-white/20"
                      }`}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Interactive Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-green animate-ping shrink-0" />
            <p className="text-white/80 font-display text-lg">
              Active Step: <span className="text-green font-bold">{PIPELINE_STEPS[activeStep].label}</span> — {PIPELINE_STEPS[activeStep].desc}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {PIPELINE_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                aria-label={`Jump to step ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeStep ? "w-8 bg-green" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
