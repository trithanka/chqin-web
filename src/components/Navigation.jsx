import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [];

export default function Navigation({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl bg-black/50 border-b border-white/10"
          data-testid="main-nav"
        >
          <nav className="mx-auto max-w-[1600px] px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
            <a
              href="#top"
              data-testid="nav-logo"
              className="font-logo text-2xl md:text-3xl text-white select-none"
            >
              Chq<span className="text-brand-gradient">In</span><sup className="ml-[0.08em] align-super text-[0.35em] font-sans font-semibold tracking-normal">™</sup>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {LINKS.map((l) => (
                <a
                  key={l}
                  href="#top"
                  data-testid={`nav-link-${l.toLowerCase()}`}
                  className="font-mono-chq text-[11px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                >
                  {l}
                </a>
              ))}
            </div>

            <a
              href="https://business.chqin.in/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-cta"
              className="group relative overflow-hidden rounded-full bg-brand text-black font-semibold text-sm px-5 md:px-7 py-2.5 tracking-tight transition-transform duration-300 hover:scale-[1.03]"
            >
              Try ChqIn
            </a>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
