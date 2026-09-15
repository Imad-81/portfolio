"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "./SmoothScroll";

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Geometric coordinates for continuous interpolation
  const [coords, setCoords] = useState({
    xCenter: 0,
    yCenter: 0,
    xTarget: 32, // 2rem
    yTarget: 28, // 1.75rem
    scaleTarget: 0.16,
    isReady: false,
  });

  // Calculate center and target positions based on viewport and text dimensions
  const updateMetrics = useCallback(() => {
    if (!nameRef.current) return;
    const isMobile = window.innerWidth < 768;
    const xTarget = isMobile ? 24 : 48; // 1.5rem vs 3rem
    const yTarget = isMobile ? 24 : 32;

    const rect = nameRef.current.getBoundingClientRect();
    // Element's unscaled natural size
    const naturalWidth = rect.width;
    const naturalHeight = rect.height;

    // We want the small persistent logo to have font-size ~ 18px-22px
    // Current font-size in px can be read from computed style
    const computedFontSize = parseFloat(window.getComputedStyle(nameRef.current).fontSize) || 120;
    const targetFontSize = isMobile ? 18 : 22;
    const scaleTarget = Math.max(targetFontSize / computedFontSize, 0.1);

    const xCenter = (window.innerWidth - naturalWidth) / 2;
    // Vertically centered or slightly below center as requested
    const yCenter = (window.innerHeight - naturalHeight) * 0.44;

    setCoords({
      xCenter,
      yCenter,
      xTarget,
      yTarget,
      scaleTarget,
      isReady: true,
    });
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics]);

  // Continuous RAF scroll sync
  useEffect(() => {
    if (!coords.isReady) return;

    let rafId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const heroDistance = windowH * 0.95; // distance over which hero transformation finishes

      // Continuous normalized progress [0, 1]
      const progress = Math.min(Math.max(scrollY / heroDistance, 0), 1);

      // Smooth cubic bezier easing: fast responsive start, soft arrival
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const easedProgress = ease(progress);

      // Interpolated position and scale
      const currentX = coords.xCenter + (coords.xTarget - coords.xCenter) * easedProgress;
      const currentY = coords.yCenter + (coords.yTarget - coords.yCenter) * easedProgress;
      const currentScale = 1.0 + (coords.scaleTarget - 1.0) * easedProgress;

      // Subtitle & links fade out quickly in the first 35% of scroll
      const subOpacity = Math.max(1 - progress * 2.8, 0);
      const subTranslateY = -progress * 40;

      // Contact fade out: when scrolling into Contact/Footer, fade out the small persistent logo
      let logoOpacity = 1;
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (contactRect.top < windowH * 0.4) {
          logoOpacity = Math.max(contactRect.top / (windowH * 0.4), 0);
        }
      }

      // Update styles directly via GPU transform
      if (nameRef.current) {
        nameRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
        nameRef.current.style.opacity = String(logoOpacity);
        // Enable pointer events when transformed to act as clickable back-to-top button
        nameRef.current.style.pointerEvents = progress > 0.8 ? "auto" : "none";
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = String(subOpacity);
        subtitleRef.current.style.transform = `translate3d(0, ${subTranslateY}px, 0)`;
        subtitleRef.current.style.pointerEvents = subOpacity > 0.2 ? "auto" : "none";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial position call

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [coords]);

  const handleLogoClick = () => {
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <>
      {/* Persistent Transforming Title "IMAD" (Fixed, continuously animated) */}
      <div
        ref={nameRef}
        onClick={handleLogoClick}
        role="banner"
        aria-label="Imad Portfolio Home"
        className="fixed top-0 left-0 z-40 origin-top-left will-change-transform select-none cursor-pointer transition-opacity duration-200"
        style={{
          // Default initial positioning before JS metrics kick in
          transform: coords.isReady
            ? `translate3d(${coords.xCenter}px, ${coords.yCenter}px, 0) scale(1)`
            : "translate3d(50vw, 44vh, 0)",
          opacity: coords.isReady ? 1 : 0,
        }}
      >
        <h1 className="text-[17vw] md:text-[14vw] lg:text-[12.5vw] font-black tracking-[-0.05em] leading-none text-[#0A0A0A] hover:opacity-80 transition-opacity">
          {PROFILE.name}
        </h1>
      </div>

      {/* Hero Outer Container: creates the physical scroll distance for transformation */}
      <section
        ref={heroRef}
        id="hero"
        aria-label="Introduction"
        className="relative w-full h-[185vh] bg-[#F7F5F0]"
      >
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none">
          {/* Supporting Text and Links (Below Name) */}
          <div
            ref={subtitleRef}
            className="flex flex-col items-center text-center mt-36 md:mt-48 lg:mt-56 max-w-xl will-change-transform"
          >
            {/* Roles */}
            <p className="font-mono text-xs md:text-sm tracking-[0.28em] text-[#0A0A0A]/70 uppercase font-medium mb-8 select-none">
              {PROFILE.bioLine}
            </p>

            {/* Typographic Links */}
            <nav aria-label="Social and Resume Links" className="flex items-center gap-8 md:gap-12 pointer-events-auto">
              {PROFILE.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.target}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs md:text-sm tracking-widest uppercase font-mono text-[#0A0A0A] hover:text-[#0A0A0A]/60 transition-colors py-1"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#0A0A0A] group-hover:w-full transition-[width] duration-200" />
                  </span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
