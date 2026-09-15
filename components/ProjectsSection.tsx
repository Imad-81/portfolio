"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS } from "@/data/portfolio";
import BottomTimeline, { TimelineMarker } from "./BottomTimeline";
import { useSmoothScroll } from "./SmoothScroll";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollTo } = useSmoothScroll();

  const count = PROJECTS.length;

  const markers: TimelineMarker[] = PROJECTS.map((item) => ({
    id: item.id,
    marker: item.marker,
    label: item.title,
    number: item.number,
  }));

  const updateScroll = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const windowW = window.innerWidth;
    const scrollableDistance = rect.height - windowH;

    if (scrollableDistance <= 0) return;

    // Normalized progress [0, 1] through the pinned project section
    const rawProgress = -rect.top / scrollableDistance;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    const maxTranslate = (count - 1) * windowW;
    const translateX = -clampedProgress * maxTranslate;

    trackRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;

    setProgress(clampedProgress);
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
      id="projects"
      aria-label="Featured Projects"
      className="relative w-full bg-[#F7F5F0]"
      style={{ height: `${count * 100}vh` }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7F5F0] flex flex-col justify-between">
        
        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${count * 100}vw` }}
        >
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="w-screen h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-20 lg:px-32 pt-20 pb-28 relative"
            >
              {/* Project Chapter Grid */}
              <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Main Content Column */}
                <div className="lg:col-span-8 flex flex-col">
                  {/* Category & Year */}
                  <div className="flex items-center gap-4 text-xs font-mono tracking-[0.2em] text-black/50 uppercase mb-4 md:mb-6 select-none">
                    <span>{proj.category}</span>
                    <span className="text-black/25">/</span>
                    <span>{proj.year}</span>
                  </div>

                  {/* Project Title */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] uppercase leading-[0.95] text-[#0A0A0A] mb-4 md:mb-6">
                    {proj.title}
                  </h2>

                  {/* Tagline / Subtitle */}
                  <p className="text-base md:text-xl font-medium tracking-tight text-[#0A0A0A]/85 mb-4 max-w-xl">
                    {proj.tagline}
                  </p>

                  {/* Structural Description */}
                  <p className="text-sm md:text-base text-black/65 font-normal leading-relaxed max-w-xl mb-8">
                    {proj.descriptionPlaceholder}
                  </p>

                  {/* Link */}
                  {proj.link && (
                    <div>
                      <a
                        href={proj.link}
                        className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest uppercase font-semibold text-[#0A0A0A] hover:text-black/60 transition-colors py-1"
                      >
                        <span className="relative">
                          {proj.linkLabel || "VIEW PROJECT →"}
                          <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-[#0A0A0A] group-hover:w-full transition-[width] duration-200" />
                        </span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Secondary Meta Column (Editorial Restraint) */}
                <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-black/10 pt-6 lg:pt-0 lg:pl-10 space-y-6">
                  {/* Tech Stack List */}
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.25em] text-black/40 uppercase mb-3 select-none">
                      TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-black/75 px-2 py-1 bg-black/[0.04] border border-black/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture / Media Slot (Ready for real visual assets) */}
                  <div className="pt-2">
                    <span className="block font-mono text-[10px] tracking-[0.25em] text-black/40 uppercase mb-2 select-none">
                      CHAPTER REF
                    </span>
                    <span className="font-mono text-xs text-black/60">
                      INDEX #{proj.number} {"//"} {proj.year}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Timeline Navigation */}
        <div className="absolute bottom-6 md:bottom-10 left-8 md:left-20 lg:left-32 right-8 md:right-20 lg:right-32 z-30">
          <BottomTimeline
            markers={markers}
            progress={progress}
            activeIndex={activeIndex}
            onMarkerClick={handleMarkerClick}
            sectionLabel="PROJECTS"
          />
        </div>
      </div>
    </section>
  );
}
