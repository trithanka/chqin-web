import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import { Play } from "lucide-react";

const LINKS = [
  { label: "Experience", id: "pipeline" },
  { label: "Hotels", id: "why" },
  { label: "Technology", id: "security" },
  { label: "Waitlist", id: "final" },
];

export default function Navigation({ visible, onOpenDemo }) {
  const go = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-black/60 border-b border-white/10"
          data-testid="main-nav"
        >
          <nav className="mx-auto max-w-[1600px] px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
            <a
              href="#top"
              onClick={(e) => go(e, "top")}
              data-testid="nav-logo"
              className="font-display text-2xl md:text-3xl font-black tracking-tight text-white select-none"
            >
              Chq<span className="text-green">In</span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {LINKS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  data-testid={`nav-link-${label.toLowerCase()}`}
                  className="font-mono-chq text-[11px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenDemo}
              data-testid="nav-cta"
              className="group relative overflow-hidden rounded-full bg-green text-black font-bold text-sm px-5 md:px-7 py-2.5 tracking-tight transition-transform duration-300 hover:scale-[1.04] flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" /> Try Demo
            </button>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
