import React from "react";
import { PROFILE } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="w-full bg-[#F7F5F0] border-t border-black/10 pt-24 pb-16 md:pb-24 px-8 md:px-20 lg:px-32"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        
        {/* Top section: Brand & reserved signature animation container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.25em] text-black/40 uppercase mb-3 select-none">
              INDEX // IDENTIFIER
            </span>
            <span className="text-5xl md:text-8xl font-black tracking-[-0.05em] uppercase text-[#0A0A0A] select-none leading-none">
              {PROFILE.name}
            </span>
          </div>

          {/* Reserved slot for future signature animation (unobtrusive, zero-layout-shift) */}
          <div
            id="footer-signature-slot"
            data-signature-slot="true"
            aria-hidden="true"
            className="w-48 h-20 md:w-64 md:h-24 flex items-center justify-center opacity-0 pointer-events-none"
          >
            {/* Signature SVG/Canvas will mount here */}
          </div>
        </div>

        {/* Bottom row: Links & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-black/10 text-xs md:text-sm font-mono">
          {/* Navigation Links */}
          <nav aria-label="Footer Links" className="flex items-center gap-8 md:gap-10">
            {PROFILE.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.target}
                rel="noopener noreferrer"
                className="group relative text-black/60 hover:text-black uppercase tracking-wider transition-colors"
              >
                <span>{link.label}</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-black group-hover:w-full transition-[width] duration-200" />
              </a>
            ))}
          </nav>

          {/* Copyright notice */}
          <span className="text-black/40 tracking-widest uppercase">
            © 2026 {PROFILE.name}. ALL RIGHTS RESERVED.
          </span>
        </div>

      </div>
    </footer>
  );
}
