import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono-chq text-[11px] tracking-[0.3em] uppercase text-white/40">
        404 — Not found
      </span>
      <h1 className="mt-6 font-display font-black tracking-tighter leading-[0.9] text-white text-[clamp(3rem,8vw,110px)]">
        No entry
        <br />
        <span className="text-green">here.</span>
      </h1>
      <Link
        to="/"
        className="mt-10 rounded-full bg-green text-black font-semibold text-sm px-7 py-2.5 tracking-tight transition-transform duration-300 hover:scale-[1.03]"
      >
        Back to ChqIn
      </Link>
    </main>
  );
}
