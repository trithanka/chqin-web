// Lenis hijacks wheel scrolling, so native anchor jumps and scrollIntoView
// fight with it. Route every in-page navigation through here instead.

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (prefersReducedMotion()) {
    el.scrollIntoView({ behavior: "auto" });
    return;
  }

  // Lenis is absent when reduced motion is on, or before its dynamic import
  // resolves; fall back to the platform in both cases.
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}
