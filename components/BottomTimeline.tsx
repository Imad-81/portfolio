"use client";

import React from "react";

export interface TimelineMarker {
  id: string;
  marker: string; // Short code, e.g. "E", "SC", "AIRC" or "01", "02"
  label: string;  // Full name, e.g. "E-Cell", "Student Council"
  number: string; // "01", "02"
}

interface BottomTimelineProps {
  markers: TimelineMarker[];
  progress: number; // 0 to 1
  activeIndex: number;
  onMarkerClick: (index: number) => void;
  sectionLabel: string;
}

export default function BottomTimeline({
  markers,
  progress,
  activeIndex,
  onMarkerClick,
  sectionLabel,
}: BottomTimelineProps) {
  const count = markers.length;

  return (
    <nav
      aria-label={`${sectionLabel} Timeline Navigation`}
      className="w-full select-none"
    >
      {/* Top row: Section title & current index */}
      <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-3 md:mb-4 font-mono">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-none inline-block" />
          <span>{sectionLabel}</span>
        </span>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Markers row */}
      <div className="relative w-full">
        {/* The progression track line */}
        <div className="relative w-full h-[1px] bg-black/15 my-3">
          {/* Active progress indicator line */}
          <div
            className="absolute top-0 left-0 h-full bg-black transition-[width] duration-75 ease-out"
            style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
          />

          {/* Traveling dot indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black transition-[left] duration-75 ease-out pointer-events-none"
            style={{ left: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
          />
        </div>

        {/* Marker buttons spaced along the line */}
        <div className="flex items-center justify-between w-full pt-1">
          {markers.map((item, index) => {
            const isActive = activeIndex === index;
            // Target progress for this marker
            const markerProgress = count > 1 ? index / (count - 1) : 0;
            // Distance from current progress
            const diff = Math.abs(progress - markerProgress);
            const isNear = diff < 0.2;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onMarkerClick(index)}
                className={`group flex flex-col text-left transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-black py-1 ${
                  index === 0
                    ? "items-start"
                    : index === count - 1
                    ? "items-end text-right"
                    : "items-center text-center"
                }`}
                aria-label={`Jump to chapter ${item.number}: ${item.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Marker code/label */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[11px] md:text-xs tracking-wider transition-colors duration-200 ${
                      isActive
                        ? "font-semibold text-black"
                        : isNear
                        ? "text-black/75"
                        : "text-black/35 group-hover:text-black"
                    }`}
                  >
                    [{item.marker}]
                  </span>
                  <span
                    className={`hidden sm:inline text-[11px] md:text-xs tracking-tight uppercase transition-colors duration-200 max-w-[90px] md:max-w-[130px] lg:max-w-[180px] truncate ${
                      isActive
                        ? "font-medium text-black"
                        : "text-black/35 group-hover:text-black/70"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
