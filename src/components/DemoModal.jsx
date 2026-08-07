import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, RefreshCw, ShieldCheck, UserCheck, ScanLine } from "lucide-react";
import QRGlyph from "@/components/QRGlyph";

const DEMO_STEPS = [
  { id: 0, title: "Scan QR", subtitle: "Scan QR code on arrival" },
  { id: 1, title: "Face Alignment", subtitle: "Position face inside reticle" },
  { id: 2, title: "Biometric Verification", subtitle: "Liveness & identity match" },
  { id: 3, title: "Check-In Verified", subtitle: "Identity confirmed instantly" },
];

export default function DemoModal({ isOpen, onClose, onJoinWaitlist }) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const restart = () => setStep(0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close demo"
          >
            <X size={20} />
          </button>

          {/* Left panel: Info & Stepper controls */}
          <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <div className="flex items-center gap-2 text-green font-mono-chq text-xs tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                Interactive Check-In Simulator
              </div>
              <h3 className="mt-4 font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-tight">
                Experience ChqIn Live
              </h3>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">
                Test the end-to-end autonomous check-in flow in your browser. Fast, biometric, and frictionless.
              </p>

              {/* Step indicator list */}
              <div className="mt-8 space-y-3">
                {DEMO_STEPS.map((s, i) => (
                  <div
                    key={s.id}
                    onClick={() => setStep(i)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      step === i
                        ? "border-green bg-green/10 text-white"
                        : step > i
                        ? "border-white/20 bg-white/5 text-white/80"
                        : "border-white/5 bg-transparent text-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-mono-chq font-bold flex items-center justify-center ${
                          step === i
                            ? "bg-green text-black"
                            : step > i
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {step > i ? <Check size={14} strokeWidth={3} /> : i + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-sm">{s.title}</p>
                        <p className="text-[11px] text-white/50">{s.subtitle}</p>
                      </div>
                    </div>
                    {step === i && <span className="w-1.5 h-1.5 rounded-full bg-green" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-white/10">
              <button
                onClick={restart}
                className="flex items-center gap-2 font-mono-chq text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider"
              >
                <RefreshCw size={14} /> Restart
              </button>
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-green text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform"
                >
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onJoinWaitlist?.();
                  }}
                  className="flex items-center gap-2 bg-green text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform"
                >
                  Join Waitlist <Check size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right panel: Phone Frame simulator */}
          <div className="md:col-span-6 bg-black p-8 flex items-center justify-center min-h-[460px]">
            <div className="relative w-[280px] h-[520px] rounded-[2.5rem] border-[6px] border-zinc-800 bg-white shadow-[0_0_50px_rgba(0,255,102,0.2)] overflow-hidden flex flex-col justify-between text-black">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-20" />

              {/* Status bar */}
              <div className="pt-6 px-6 flex justify-between items-center text-[10px] font-mono-chq text-black/50 z-10">
                <span>ChqIn Mobile</span>
                <span>9:41 AM</span>
              </div>

              {/* Dynamic Screen Contents */}
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-36 h-36 bg-black rounded-2xl p-3 relative mb-6 shadow-lg">
                      <QRGlyph color="#ffffff" seed={424242} className="w-full h-full" />
                      <div className="absolute inset-0 border-2 border-green rounded-2xl animate-pulse" />
                    </div>
                    <span className="font-mono-chq text-xs tracking-widest text-green bg-black px-3 py-1 rounded-full uppercase">
                      Tap QR Code
                    </span>
                    <p className="mt-4 font-display font-bold text-lg">Hotel Arrival</p>
                    <p className="mt-1 text-xs text-black/60">Scan to initiate instant check-in</p>

                    <button
                      onClick={nextStep}
                      className="mt-6 w-full py-3 bg-black text-white font-semibold text-xs tracking-wider rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <ScanLine size={16} className="text-green" /> Tap to Scan
                    </button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="relative w-40 h-40 rounded-full border-4 border-dashed border-green p-1 flex items-center justify-center mb-6 overflow-hidden bg-black/5">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                        alt="Guest face"
                        className="w-full h-full object-cover rounded-full"
                      />
                      {/* Scanning HUD grid overlay */}
                      <div className="absolute inset-0 bg-green/10 flex items-center justify-center">
                        <div className="w-full h-1 bg-green shadow-[0_0_12px_#00ff66] animate-bounce" />
                      </div>
                    </div>
                    <p className="font-mono-chq text-xs text-black/60 uppercase tracking-widest">
                      Looking for face...
                    </p>
                    <p className="mt-2 font-display font-bold text-base text-black">
                      Align face in camera
                    </p>
                    <button
                      onClick={nextStep}
                      className="mt-6 px-6 py-2.5 bg-green text-black font-bold text-xs rounded-full shadow hover:scale-105 transition-transform"
                    >
                      Verify Face
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green text-black flex items-center justify-center mb-4 shadow-lg animate-bounce">
                      <ShieldCheck size={36} strokeWidth={2.5} />
                    </div>
                    <span className="font-mono-chq text-xs tracking-widest text-green bg-black px-3 py-1 rounded-full uppercase">
                      ✓ Biometric Verified
                    </span>
                    <p className="mt-4 font-display font-bold text-xl text-black">Identity Confirmed</p>
                    <p className="mt-1 text-xs text-black/60">Encrypted template matched</p>

                    <button
                      onClick={nextStep}
                      className="mt-6 px-6 py-2.5 bg-black text-white font-bold text-xs rounded-full shadow hover:bg-zinc-800 transition-colors"
                    >
                      Complete Check-in
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="w-16 h-16 rounded-full bg-green/20 text-green flex items-center justify-center mb-4 border border-green">
                      <UserCheck size={32} />
                    </div>
                    <span className="font-mono-chq text-xs tracking-widest text-green bg-black px-3 py-1 rounded-full uppercase">
                      ✓ Checked In
                    </span>
                    <p className="mt-3 font-display font-black text-3xl text-black tracking-tight">
                      You&apos;re In
                    </p>
                    <p className="mt-2 font-display text-sm font-medium text-black/70">
                      Welcome back. Enjoy your stay.
                    </p>

                    <div className="mt-6 p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-left w-full text-[11px] space-y-1">
                      <div className="flex justify-between text-black/70">
                        <span>Check-in speed:</span>
                        <span className="font-mono-chq font-bold text-green-700">Seconds, not minutes</span>
                      </div>
                      <div className="flex justify-between text-black/70">
                        <span>Status:</span>
                        <span className="font-medium text-black">Identity Verified</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Home indicator */}
              <div className="pb-3 flex justify-center">
                <div className="w-28 h-1 bg-black/30 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
