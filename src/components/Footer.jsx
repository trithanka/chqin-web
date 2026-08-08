import React from "react";
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";

const NAV = ["Product", "Business", "Developers", "Pricing", "About", "Contact"];

const SOCIAL = [
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "X", Icon: Twitter, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "GitHub", Icon: Github, href: "#" },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative w-full bg-white text-black"
    >
      <div className="mx-auto max-w-[1200px] w-full px-6 py-24 md:py-32 flex flex-col items-center gap-16 md:gap-20 text-center">
        {/* Wordmark */}
        <div>
          <h3 className="font-display font-extrabold tracking-tighter leading-none text-black text-[clamp(3.2rem,8vw,120px)]">
            Chq<span className="text-green">In</span>
          </h3>
          <p className="mt-3 font-display font-medium tracking-tight text-black/60 text-[clamp(1.1rem,1.5vw,20px)]">
            Scan. In.
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-x-9 gap-y-3">
          {NAV.map((label) => (
            <a
              key={label}
              href="#"
              data-testid={`footer-link-${label.toLowerCase()}`}
              className="group relative font-mono-chq text-[11px] tracking-[0.22em] uppercase text-black/60 hover:text-black transition-colors duration-500"
            >
              {label}
              <span className="pointer-events-none absolute left-0 right-0 -bottom-1.5 h-px bg-[color:var(--chq-green)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-8">
          {SOCIAL.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
              className="text-black/55 hover:text-green transition-colors duration-500"
            >
              <Icon size={19} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="font-mono-chq text-[10px] tracking-[0.24em] uppercase text-black/45 leading-relaxed">
          <p>© 2026 ChqIn Technologies Pvt. Ltd.</p>
          <p className="mt-1">Built in India.</p>
        </div>
      </div>
    </footer>
  );
}
