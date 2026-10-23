"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Calendar } from "lucide-react";
import { getTimelineTracks } from "@/data/timeline";
import DecorativeBackground from "./DecorativeBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function TimelineSection() {
  const { language, t } = useLanguage();
  const [activeTrackId, setActiveTrackId] = useState("track-a");

  const timelineTracks = useMemo(() => getTimelineTracks(language), [language]);

  const currentTrack =
    timelineTracks.find((tr) => tr.id === activeTrackId) || timelineTracks[0];

  const wrapRef = useRef<HTMLDivElement>(null);
  const topDotsRef = useRef<HTMLElement[]>([]);
  const bottomDotsRef = useRef<HTMLElement[]>([]);
  const [svgData, setSvgData] = useState<{
    width: number;
    height: number;
    d: string;
  }>({ width: 0, height: 0, d: "" });

  const calculatePath = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    if (wrapRect.width === 0 || wrapRect.height === 0) return;

    const topDots = topDotsRef.current.filter(Boolean);
    const bottomDots = bottomDotsRef.current.filter(Boolean);

    if (topDots.length < 2) {
      setSvgData({ width: wrapRect.width, height: wrapRect.height, d: "" });
      return;
    }

    const getCenter = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - wrapRect.left,
        y: r.top + r.height / 2 - wrapRect.top,
      };
    };

    const topCenters = topDots.map(getCenter);
    const bottomCenters = bottomDots.map(getCenter);

    const yTop = topCenters[0].y;
    const xTopStart = topCenters[0].x;
    const xTopEnd = topCenters[topCenters.length - 1].x;

    if (bottomCenters.length === 0) {
      setSvgData({
        width: wrapRect.width,
        height: wrapRect.height,
        d: `M ${xTopStart} ${yTop} L ${xTopEnd} ${yTop}`,
      });
      return;
    }

    const yBottom = bottomCenters[0].y;
    const xBottomStart = bottomCenters[0].x;
    const xBottomEnd = bottomCenters[bottomCenters.length - 1].x;

    // Delta for smooth U-turn hairpin
    const delta = Math.min(80, Math.max(40, (yBottom - yTop) * 0.45));

    // Construct path:
    // 1. Straight horizontal line through top row dots
    // 2. Smooth U-turn connecting top-right dot to bottom-right dot
    // 3. Straight horizontal line through bottom row dots
    const d = `M ${xTopStart} ${yTop} L ${xTopEnd} ${yTop} C ${xTopEnd + delta} ${yTop}, ${xBottomStart + delta} ${yBottom}, ${xBottomStart} ${yBottom} L ${xBottomEnd} ${yBottom}`;

    setSvgData({
      width: wrapRect.width,
      height: wrapRect.height,
      d,
    });
  }, []);

  useEffect(() => {
    topDotsRef.current = [];
    bottomDotsRef.current = [];

    const handleUpdate = () => {
      requestAnimationFrame(calculatePath);
    };

    const timer = setTimeout(handleUpdate, 60);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && wrapRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleUpdate();
      });
      resizeObserver.observe(wrapRef.current);
    }

    window.addEventListener("resize", handleUpdate);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(handleUpdate);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleUpdate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeTrackId, calculatePath]);

  const topItems = currentTrack.milestones.slice(0, 4);
  const remainingItems = currentTrack.milestones.slice(4);

  // Bottom row grid cells in DOM order (left to right: Col 0 -> Col 3)
  const bottomGridCells = [0, 1, 2, 3].map((colIdx) => {
    const reverseIndex = 3 - colIdx;
    if (reverseIndex < remainingItems.length) {
      return {
        item: remainingItems[reverseIndex],
        originalIndex: 4 + reverseIndex,
        reverseIndex,
      };
    }
    return null;
  });

  return (
    <section id="timeline" className="py-12 md:py-16 bg-navy-950/80 relative overflow-hidden">
      <DecorativeBackground variant="section-d" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
            {t.timeline.sectionBadge}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {t.timeline.sectionTitle}
          </h2>

          {/* Track Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3" role="tablist">
            {timelineTracks.map((track) => {
              const isActive = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`min-h-[44px] rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${isActive
                      ? "bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 shadow-md shadow-gold-500/20"
                      : "border border-gold-500/35 bg-transparent text-text-soft hover:border-gold-500/70 hover:text-white"
                    }`}
                >
                  {track.name}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs sm:text-sm text-text-dim">
            {currentTrack.targetDivisions}
          </p>
        </div>

        {/* Desktop View (>= 768px): U-shaped Timeline with Straight Line & U-Turn */}
        <div className="hidden md:block">
          <div ref={wrapRef} className="timeline-wrap relative mx-auto max-w-5xl px-4 lg:px-8 py-6">
            {/* Background SVG connecting line */}
            <svg
              className="tl-line-svg absolute inset-0 pointer-events-none z-0 overflow-visible"
              width={svgData.width || "100%"}
              height={svgData.height || "100%"}
              viewBox={`0 0 ${svgData.width || 100} ${svgData.height || 100}`}
              fill="none"
            >
              <defs>
                <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d9a94f" floodOpacity="0.45" />
                </filter>
              </defs>
              {svgData.d && (
                <path
                  className="tl-line-path"
                  d={svgData.d}
                  stroke="#d9a94f"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#gold-glow)"
                />
              )}
            </svg>

            {/* Top Row: Left to Right (Col 1 -> Col 4) */}
            <div className="grid grid-cols-4 gap-4 lg:gap-6 relative z-10">
              {topItems.map((item, idx) => (
                <div
                  key={`${activeTrackId}-top-${idx}`}
                  className="t-item flex flex-col items-center text-center"
                >
                  <div className="label-top mb-4 flex min-h-[52px] items-end justify-center px-1">
                    <span className="text-sm lg:text-base font-bold text-white leading-snug">
                      {item.title}
                    </span>
                  </div>

                  <div
                    ref={(el) => {
                      if (el) topDotsRef.current[idx] = el;
                    }}
                    className="t-dot relative z-10 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 cursor-default"
                    style={{
                      background: "conic-gradient(from 200deg, #d9a94f, #3f5fb5)",
                      boxShadow: "0 0 16px rgba(217, 169, 79, 0.45)",
                    }}
                  >
                    <span className="h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-navy-950 shadow-inner" />
                  </div>

                  <div className="label-bottom mt-4 flex min-h-[40px] items-start justify-center px-1">
                    <span className="text-xs lg:text-sm font-semibold text-text-soft leading-relaxed">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: Right to Left (U-turn from Col 4 -> Col 1 or Col 2) */}
            <div className="grid grid-cols-4 gap-4 lg:gap-6 relative z-10 mt-16 lg:mt-24">
              {bottomGridCells.map((cell, colIdx) => {
                if (!cell) {
                  return (
                    <div
                      key={`empty-${colIdx}`}
                      className="invisible pointer-events-none"
                    />
                  );
                }

                const { item, originalIndex, reverseIndex } = cell;

                return (
                  <div
                    key={`${activeTrackId}-bot-${originalIndex}`}
                    className="t-item flex flex-col items-center text-center"
                  >
                    <div className="label-top mb-4 flex min-h-[52px] items-end justify-center px-1">
                      <span className="text-sm lg:text-base font-bold text-white leading-snug">
                        {item.title}
                      </span>
                    </div>

                    <div
                      ref={(el) => {
                        if (el) bottomDotsRef.current[reverseIndex] = el;
                      }}
                      className="t-dot relative z-10 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 cursor-default"
                      style={{
                        background: "conic-gradient(from 200deg, #d9a94f, #3f5fb5)",
                        boxShadow: "0 0 16px rgba(217, 169, 79, 0.45)",
                      }}
                    >
                      <span className="h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-navy-950 shadow-inner" />
                    </div>

                    <div className="label-bottom mt-4 flex min-h-[40px] items-start justify-center px-1">
                      <span className="text-xs lg:text-sm font-semibold text-text-soft leading-relaxed">
                        {item.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View (< 768px): Responsive Clean Grid */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4">
            {currentTrack.milestones.map((item, idx) => {
              const isCompleted = item.status === "completed";
              const isActive = item.status === "active";
              const statusLabel = isCompleted
                ? t.timeline.statusCompleted
                : isActive
                  ? t.timeline.statusActive
                  : t.timeline.statusUpcoming;

              return (
                <div
                  key={`${activeTrackId}-m-${idx}`}
                  className={`flex flex-col justify-between rounded-xl border p-4 backdrop-blur-sm transition-all duration-200 ${isActive
                      ? "border-gold-500/60 bg-navy-900/90 shadow-lg shadow-gold-500/10 ring-1 ring-gold-500/30"
                      : "border-navy-800 bg-navy-900/60 hover:border-gold-500/30"
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-gold-500/15 border border-gold-500/30 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-400">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        {item.date}
                      </span>
                      <span className="text-[11px] font-semibold text-text-dim">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-navy-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-text-dim">{statusLabel}</span>
                    <div
                      className="h-3.5 w-3.5 rounded-full flex items-center justify-center"
                      style={{
                        background: "conic-gradient(from 200deg, #d9a94f, #3f5fb5)",
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-950" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
