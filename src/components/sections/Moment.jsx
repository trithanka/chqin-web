import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function Moment() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [count, setCount] = useState(3);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setCount(3);
    setDone(false);
    let n = 3;
    const id = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(id);
        setFlash(true);
        setTimeout(() => setFlash(false), 260);
        setDone(true);
      } else {
        setCount(n);
      }
    }, 750);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      data-testid="section-moment"
      className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-black tabular-nums leading-none text-[clamp(6rem,28vw,420px)]"
          >
            {count}
          </motion.div>
        ) : (
          <motion.h2
            key="youre-in"
            initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "-0.03em" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-black text-center leading-[0.85] text-[clamp(2.8rem,14vw,240px)] px-4"
            data-testid="youre-in-text"
          >
            YOU&apos;RE <span className="text-green">IN</span>
          </motion.h2>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
