import React from "react";
import { motion } from "framer-motion";
import { Clock, FileText, TrendingUp, CheckCircle2 } from "lucide-react";

const WHY_CARDS = [
  {
    title: "Guests hate waiting.",
    icon: Clock,
    desc: "Long lobby lines after travel ruin guest first impressions. ChqIn delivers zero-wait check-ins directly on arrival.",
  },
  {
    title: "Staff hate paperwork.",
    icon: FileText,
    desc: "Front desk agents waste hours manually typing passport numbers and printing registration cards. ChqIn automates verification completely.",
  },
  {
    title: "Managers hate bottlenecks.",
    icon: TrendingUp,
    desc: "Peak arrival times choke reception desks and limit hotel scalability. ChqIn processes hundreds of guests simultaneously.",
  },
];

export default function WhySection() {
  return (
    <section
      id="why"
      data-testid="section-why"
      className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden py-24 px-6 md:px-12 border-b border-white/10"
    >
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
            03 — The Problem & Solution
          </span>
          <h2 className="mt-4 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(2.5rem,6vw,84px)]">
            Why Hotels Choose <span className="text-green">ChqIn.</span>
          </h2>
          <p className="mt-6 text-white/60 font-sans text-lg">
            Traditional hotel check-in creates friction for everyone involved.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative p-8 md:p-10 rounded-3xl bg-zinc-950 border border-white/10 hover:border-green/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,102,0.1)] flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-green group-hover:text-black transition-colors duration-500 mb-8">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-white/60 text-base leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-green font-mono-chq text-xs tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 size={16} /> Automated by ChqIn
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Punchline Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-green/10 to-zinc-950 border border-green/30"
        >
          <p className="font-display font-black text-2xl md:text-4xl text-white tracking-tight">
            ChqIn removes <span className="text-green">all three.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
