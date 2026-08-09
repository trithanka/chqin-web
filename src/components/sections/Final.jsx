import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const easing = [0.22, 1, 0.36, 1];

export default function Final() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { email });
      setDone(true);
      toast.success("You're on the list.");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

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
            "radial-gradient(circle at center, rgba(16,224,134,0.10), rgba(16,224,134,0.03) 45%, transparent 70%)",
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
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setDone(false); }}>
          <DialogTrigger asChild>
            <motion.button
              type="button"
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
                  "0 0 0 1px rgba(16,224,134,0.5), 0 0 60px 4px rgba(16,224,134,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 40px -10px rgba(255,255,255,0.15)";
              }}
            >
              Try ChqIn
              <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-500 group-hover:translate-x-1" />
            </motion.button>
          </DialogTrigger>

          <DialogContent className="bg-black border border-white/10 text-white sm:max-w-md p-8 rounded-2xl [&>button]:hidden">
            <DialogClose
              data-testid="waitlist-close"
              className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </DialogClose>

            {!done ? (
              <>
                <p className="font-mono-chq text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
                  Get early access
                </p>
                <h3 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight leading-tight mb-8">
                  Try ChqIn at your <span className="text-green">business.</span>
                </h3>
                <form onSubmit={submit} data-testid="waitlist-form">
                  <div className="flex items-center gap-3 border-b-2 border-white/25 pb-3 focus-within:border-[color:var(--chq-green)] transition-colors">
                    <input
                      type="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      data-testid="waitlist-email-input"
                      className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/25 font-medium"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="waitlist-submit"
                      className="shrink-0 w-11 h-11 rounded-full bg-green text-black flex items-center justify-center transition-transform duration-300 hover:scale-105 disabled:opacity-50"
                    >
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                  <p className="mt-4 text-white/40 text-xs">
                    We&apos;ll reach out within one business day.
                  </p>
                </form>
              </>
            ) : (
              <div
                data-testid="waitlist-success"
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center">
                  <Check size={30} className="text-black" strokeWidth={3} />
                </div>
                <p className="mt-6 font-display text-2xl tracking-tight text-white">
                  You&apos;re in.
                </p>
                <p className="mt-2 text-white/50 text-sm">
                  We&apos;ll be in touch shortly.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
