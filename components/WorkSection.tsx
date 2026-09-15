"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { WORK_EXPERIENCE } from "@/data/portfolio";
import BottomTimeline, { TimelineMarker } from "./BottomTimeline";
import { useSmoothScroll } from "./SmoothScroll";

export default function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollTo } = useSmoothScroll();

  const count = WORK_EXPERIENCE.length;

  const markers: TimelineMarker[] = WORK_EXPERIENCE.map((item) => ({
    id: item.id,
    marker: item.marker,
    label: item.company,
    number: item.number,
  }));

  const updateScroll = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const windowW = window.innerWidth;
    const scrollableDistance = rect.height - windowH;

    if (scrollableDistance <= 0) return;

    // Calculate normalized progress [0, 1] through the pinned section
    const rawProgress = -rect.top / scrollableDistance;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    // Calculate translation in pixels (exact match to viewport width)
    const maxTranslate = (count - 1) * windowW;
    const translateX = -clampedProgress * maxTranslate;

    // Apply GPU transform directly to avoid React re-render overhead
    trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;

    // Update progress state for the timeline indicator
    setProgress(clampedProgress);

    // Update discrete active index for markers
    const newActive = Math.min(Math.max(Math.round(clampedProgress * (count - 1)), 0), count - 1);
    setActiveIndex(newActive);
  }, [count]);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateScroll]);

  // Click handler to smoothly scroll directly to a chapter
  const handleMarkerClick = (targetIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const scrollableDistance = containerRef.current.clientHeight - window.innerHeight;
    const targetProgress = count > 1 ? targetIndex / (count - 1) : 0;
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    scrollTo(targetScrollY, { duration: 1.1 });
  };

  return (
    <section
      ref={containerRef}
      id="work"
      aria-label="Work Experience"
      // 300vh provides natural scroll pacing (100vh per chapter)
      className="relative w-full bg-[#F7F5F0]"
      style={{ height: `${count * 100}vh` }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7F5F0] flex flex-col justify-between">
        
        {/* Horizontal Scroll Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${count * 100}vw` }}
        >
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.id}
              className="w-screen h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-20 lg:px-32 pt-20 pb-28 relative"
            >
              {/* Asymmetric layout container */}
              <div
                className={`max-w-4xl ${
                  idx === 1 ? "md:ml-auto md:mr-16" : idx === 2 ? "md:mx-auto" : "md:ml-0"
                }`}
              >
                {/* Chapter Number & Period Meta */}
                <div className="flex items-baseline gap-4 md:gap-6 mb-2 md:mb-4">
                  <span className="font-mono text-4xl md:text-7xl lg:text-8xl font-light text-black/15 tracking-tighter select-none">
                    {exp.number}
                  </span>
                  <span className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-black/45 uppercase">
                    {exp.period}
                  </span>
                </div>

                {/* Company Name */}
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.92] text-[#0A0A0A] mb-3 md:mb-5">
                  {exp.company}
                </h2>

                {/* Role */}
                <h3 className="text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-[#0A0A0A] uppercase mb-6 md:mb-8">
                  {exp.role}
                </h3>

                {/* Structural Description Placeholder */}
                <p className="text-sm md:text-base lg:text-lg text-[#0A0A0A]/75 font-normal leading-relaxed max-w-2xl mb-8">
                  {exp.descriptionPlaceholder}
                </p>

                {/* Focus Areas / Responsibilities Placeholder */}
                {exp.details && exp.details.length > 0 && (
                  <ul className="space-y-2 max-w-xl text-xs md:text-sm text-black/60 font-mono">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span className="text-black/30 select-none">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Timeline Navigation: pinned within the sticky viewport */}
        <div className="absolute bottom-6 md:bottom-10 left-8 md:left-20 lg:left-32 right-8 md:right-20 lg:right-32 z-30">
          <BottomTimeline
            markers={markers}
            progress={progress}
            activeIndex={activeIndex}
            onMarkerClick={handleMarkerClick}
            sectionLabel="EXPERIENCE"
          />
        </div>
      </div>
    </section>
  );
}
