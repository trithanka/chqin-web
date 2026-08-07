import { useEffect } from "react";
import "@/App.css";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary";
import { setLenis } from "@/lib/scroll";

function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let lenis;
    let rafId;
    let mounted = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!mounted) return;
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      setLenis(lenis);
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });
    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      setLenis(null);
    };
  }, []);
}

function App() {
  useLenis();
  return (
    // reducedMotion="user" makes every motion component drop transform and
    // layout animations when the OS asks for reduced motion, while leaving
    // opacity fades intact.
    <MotionConfig reducedMotion="user">
      <div className="App">
        <div className="grain-overlay" aria-hidden="true" />
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    </MotionConfig>
  );
}

export default App;
