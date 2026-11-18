"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PROFILE } from "@/data/portfolio";
import { useSmoothScroll } from "./SmoothScroll";

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Geometric coordinates for continuous interpolation
  const [coords, setCoords] = useState({
    xCenter: 0,
    yCenter: 0,
    xTarget: 32,
    yTarget: 28,
    scaleTarget: 0.1,
    isReady: false,
  });

  // Calculate center and target positions based on natural DOM layout
  const updateMetrics = useCallback(() => {
    if (!nameRef.current || !placeholderRef.current || !heroRef.current) return;
    const headingEl = nameRef.current.querySelector("h1");
    if (!headingEl) return;

    const isMobile = window.innerWidth < 768;
    const xTarget = isMobile ? 20 : 32;
    const yTarget = isMobile ? 20 : 28;

    // Anchor precisely to the placeholder in the document flow
    const pRect = placeholderRef.current.getBoundingClientRect();
    const heroRect = heroRef.current.getBoundingClientRect();
    const xCenter = pRect.left;
    const yCenter = pRect.top - heroRect.top;

    // Read the actual font-size from the h1 heading
    const computedFontSize = parseFloat(window.getComputedStyle(headingEl).fontSize) || 120;
    // Compact persistent corner wordmark: 13px on mobile, 15px on desktop
    const targetFontSize = isMobile ? 13 : 15;
    const scaleTarget = Math.max(Math.min(targetFontSize / computedFontSize, 0.2), 0.04);

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
      // Natural transition distance seamlessly handing off to the next section
      const heroDistance = windowH * 0.75;

      // Continuous normalized progress [0, 1]
      const progress = Math.min(Math.max(scrollY / heroDistance, 0), 1);

      // Smooth cubic bezier easing
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const easedProgress = ease(progress);

      // Interpolated position and scale
      const currentX = coords.xCenter + (coords.xTarget - coords.xCenter) * easedProgress;
      const currentY = coords.yCenter + (coords.yTarget - coords.yCenter) * easedProgress;
      const currentScale = 1.0 + (coords.scaleTarget - 1.0) * easedProgress;

      // Supporting text moves up with scroll and fades gracefully
      const subOpacity = Math.max(1 - progress * 1.3, 0);
      const subTranslateY = -progress * 60;

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

      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = String(subOpacity);
        eyebrowRef.current.style.transform = `translate3d(0, ${subTranslateY}px, 0)`;
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
        aria-label={`${PROFILE.fullName} Portfolio Home`}
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

      {/* Hero Outer Container: paced naturally with no dead scroll zone */}
      <section
        ref={heroRef}
        id="hero"
        aria-label="Introduction"
        className="relative w-full h-[120vh] bg-[#F7F5F0]"
      >
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none">
          <div className="flex flex-col items-center text-center max-w-2xl w-full">
            {/* Full Name Eyebrow */}
            <span
              ref={eyebrowRef}
              className="font-mono text-xs md:text-sm tracking-[0.32em] text-[#0A0A0A]/55 uppercase font-semibold mb-4 md:mb-6 select-none will-change-transform"
            >
              {PROFILE.fullName}
            </span>

            {/* Natural Layout Placeholder for IMAD (Anchors initial geometry perfectly) */}
            <div
              ref={placeholderRef}
              className="invisible select-none leading-none mb-5 md:mb-7"
              aria-hidden="true"
            >
              <h1 className="text-[17vw] md:text-[14vw] lg:text-[12.5vw] font-black tracking-[-0.05em] leading-none">
                {PROFILE.name}
              </h1>
            </div>

            {/* Supporting Text and Links (Below Name) */}
            <div
              ref={subtitleRef}
              className="flex flex-col items-center text-center will-change-transform"
            >
              {/* Roles */}
              <p className="font-mono text-xs md:text-sm tracking-[0.28em] text-[#0A0A0A]/70 uppercase font-medium mb-6 md:mb-8 select-none">
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
        </div>
      </section>
    </>
  );
}
